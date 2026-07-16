import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { mapDatabaseToUI, formatAddressDisplay } from './addressMapper';
import { AddAddressScreen } from './AddAddressScreen'
import services from '../../../src/services/api/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==================== API CONFIGURATION ====================
// Set to true when you have a Google Maps API key
const USE_GOOGLE_API = false;
const GOOGLE_MAPS_API_KEY = '';

// Simple search input without Google Places API
const SimpleSearchInput = ({ placeholder, onSelect, containerStyle }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim().length > 3) {
      onSelect({
        formattedAddress: query,
        latitude: 17.4065,
        longitude: 78.4772,
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        areaName: query,
        pincode: '',
      });
    }
  };

  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={styles.searchInputContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor="#999"
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
      </View>
      {!USE_GOOGLE_API && (
        <Text style={styles.apiNotice}>
          ⚠️ Manual search mode - no API key
        </Text>
      )}
    </View>
  );
};

const SelectLocationScreen = ({ navigation, route }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resolvedUserId, setResolvedUserId] = useState(route.params?.userId || null);
  const newAddressFromSave = route.params?.newAddress;

  // Refresh addresses when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSavedAddresses();
    }, [resolvedUserId])
  );

  useEffect(() => {
    // If a new address was saved, add it to the list
    if (newAddressFromSave) {
      setSavedAddresses(prev => [newAddressFromSave, ...prev]);
      // Clear the param after processing
      navigation.setParams({ newAddress: undefined });
    }
  }, [newAddressFromSave]);

  const loadSavedAddresses = async () => {
    try {
      let uid = resolvedUserId;
      if (!uid) {
        const stored = await AsyncStorage.getItem('userId');
        if (stored) {
          uid = parseInt(stored, 10);
          setResolvedUserId(uid);
        }
      }

      if (!uid) {
        console.warn('No user id available to load addresses');
        setSavedAddresses([]);
        return;
      }

      const response = await services.GetAllAddressesById(uid);
      console.log('GetAllAddressesById response:', response);

      // Support multiple response shapes: array, { data: [...] }, { data: { data: [...] } }
      let apiAddresses = [];
      if (Array.isArray(response)) apiAddresses = response;
      else if (Array.isArray(response?.data)) apiAddresses = response.data;
      else if (Array.isArray(response?.data?.data)) apiAddresses = response.data.data;
      else if (Array.isArray(response?.addresses)) apiAddresses = response.addresses;

      const normalizedAddresses = apiAddresses
        .filter((address) => !address.is_deleted)
        .map((address) => ({
          ...address,
          id: address.id,
          label: address.label || address.custom_label || address.address_type_name || 'Address',
          address_line1: address.address_line1 || '',
          address_line2: [address.address_line2, address.landmark].filter(Boolean).join(', '),
          city: address.city || '',
          state: address.state || '',
          pincode: address.pincode || '',
          latitude: address.latitude,
          longitude: address.longitude,
          is_primary: Boolean(address.is_primary),
          distance: address.distance || null,
        }));

      setSavedAddresses(normalizedAddresses);
    } catch (error) {
      console.error('Failed to fetch addresses', error);
      setSavedAddresses([]);
      Alert.alert('Error', 'Unable to load saved addresses right now.');
    }
  };

  const requestLocationPermission = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permissions in settings for accurate delivery.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Mock navigation without reverse geocoding
        navigation.navigate('AddAddressScreen', {
          locationData: {
            latitude,
            longitude,
            formattedAddress: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            city: '',
            state: '',
            country: 'India',
            areaName: 'Current Location',
            pincode: '',
          },
          userId: resolvedUserId,
        });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
        Alert.alert('Error', 'Unable to get current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleAddressSelect = (address) => {
    navigation.navigate('Home', { selectedAddress: address });
  };

  const handleEditAddress = (address) => {
    const uiData = mapDatabaseToUI(address);
    navigation.navigate('AddAddressScreen', {
      editData: uiData,
      userId: resolvedUserId,
      addressId: address.id
    });
  };

  const deleteAddress = async (address) => {
    if (!address?.id) {
      Alert.alert('Error', 'Address id is missing');
      return;
    }

    if (address.is_primary) {
      Alert.alert('Action not allowed', 'Primary address cannot be deleted.');
      return;
    }

    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await services.DeleteAddress(address.id);
              setSavedAddresses((prev) => prev.filter((item) => item.id !== address.id));
              Alert.alert('Success', 'Address deleted successfully');
            } catch (error) {
              console.error('Delete address failed:', error);
              Alert.alert('Error', 'Unable to delete address right now.');
            }
          },
        },
      ]
    );
  };

  const renderSavedAddress = ({ item }) => {
    const displayLabel = item.label || item.custom_label || item.address_type_name || 'Address';
    const addressLines = [
      item.address_line1,
      item.address_line2,
      item.landmark,
      [item.city, item.state, item.pincode].filter(Boolean).join(' '),
    ].filter(Boolean);

    return (
      <TouchableOpacity
        style={styles.addressCard}
        onPress={() => handleAddressSelect(item)}
      >
        <View style={styles.addressIconContainer}>
          <Text style={styles.addressIcon}>
            {displayLabel === 'Home' ? '🏠' : displayLabel === 'Work' ? '🏢' : '📍'}
          </Text>
          {item.distance && (
            <Text style={styles.distance}>{item.distance}</Text>
          )}
        </View>

        <View style={styles.addressContent}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressLabel}>{displayLabel}</Text>
            {item.is_primary && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedText}>Selected</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText} numberOfLines={3}>
            {addressLines.join(', ')}
          </Text>
        </View>

        <View style={styles.addressActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditAddress(item)}
          >
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              item.is_primary ? styles.actionButtonDisabled : null,
            ]}
            onPress={() => deleteAddress(item)}
            disabled={item.is_primary}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Location</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SimpleSearchInput
          placeholder="Search an area or address"
          onSelect={(data) => navigation.navigate('AddAddressScreen', {
            locationData: data,
            userId: resolvedUserId
          })}
          containerStyle={{ marginBottom: 16 }}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={requestLocationPermission}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FFF0F5' }]}>
            <Text style={{ fontSize: 24 }}>📍</Text>
          </View>
          <Text style={styles.actionText}>Use Current{'\n'}Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('AddAddressScreen', { userId: resolvedUserId })}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FFF5F0' }]}>
            <Text style={{ fontSize: 24 }}>➕</Text>
          </View>
          <Text style={styles.actionText}>Add New{'\n'}Address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: '#F0FFF5' }]}>
            <Text style={{ fontSize: 24 }}>💬</Text>
          </View>
          <Text style={styles.actionText}>Request{'\n'}Address</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Addresses */}
      <View style={styles.savedSection}>
        <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>

        {savedAddresses.length === 0 ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: '#999' }}>No saved addresses found.</Text>
            <TouchableOpacity
              style={{ marginTop: 12 }}
              onPress={() => navigation.navigate('AddAddressScreen', { userId: resolvedUserId })}
            >
              <Text style={{ color: '#FF6B00', fontWeight: '600' }}>Add an address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={savedAddresses}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={renderSavedAddress}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      {savedAddresses.length > 2 && (
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Text style={styles.viewAllIcon}>▼</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  apiNotice: {
    fontSize: 11,
    color: '#FF6B00',
    marginTop: 6,
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
  },
  savedSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  listContainer: {
    gap: 12,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  addressIconContainer: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 50,
  },
  addressIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  distance: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  addressContent: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  selectedBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionIcon: {
    fontSize: 18,
    color: '#999',
  },
  deleteText: {
    marginLeft: 4,
    color: '#D32F2F',
    fontSize: 13,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  viewAllText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  viewAllIcon: {
    color: '#FF6B00',
    fontSize: 12,
  },
});

export default SelectLocationScreen;