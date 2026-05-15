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
import {AddAddressScreen} from './AddAddressScreen'

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
  const userId = route.params?.userId || 1;
  const newAddressFromSave = route.params?.newAddress;

  // Refresh addresses when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSavedAddresses();
    }, [])
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
    // Mock data for demonstration
    const mockAddresses = [
      {
        id: 1,
        label: 'Home',
        address_line1: 'Flat #101',
        address_line2: 'Vishwa block B, VR colony, Gokul plots',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500072',
        latitude: 17.4065,
        longitude: 78.4772,
        is_primary: true,
      },
      {
        id: 2,
        label: 'Work',
        address_line1: 'Phoenix Hitec City',
        address_line2: 'Kondapur, Hitec City',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500084',
        latitude: 17.4504,
        longitude: 78.3810,
        is_primary: false,
      },
    ];
    setSavedAddresses(mockAddresses);
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
          userId,
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
    navigation.navigate('EditProfile', { selectedAddress: address });
  };

  const handleEditAddress = (address) => {
    const uiData = mapDatabaseToUI(address);
    navigation.navigate('AddAddressScreen', { 
      editData: uiData, 
      userId,
      addressId: address.id 
    });
  };

  const renderSavedAddress = ({ item }) => (
    <TouchableOpacity 
      style={styles.addressCard}
      onPress={() => handleAddressSelect(item)}
    >
      <View style={styles.addressIconContainer}>
        <Text style={styles.addressIcon}>
          {item.label === 'Home' ? '🏠' : item.label === 'Work' ? '🏢' : '📍'}
        </Text>
        {item.distance && (
          <Text style={styles.distance}>{item.distance}</Text>
        )}
      </View>
      
      <View style={styles.addressContent}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressLabel}>{item.label}</Text>
          {item.is_primary && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedText}>Selected</Text>
            </View>
          )}
        </View>
        <Text style={styles.addressText} numberOfLines={2}>
          {formatAddressDisplay(item)}
        </Text>
      </View>

      <View style={styles.addressActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditAddress(item)}
        >
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
            userId 
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
          onPress={() => navigation.navigate('AddAddressScreen', { userId })}
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
        
        <FlatList
          data={savedAddresses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSavedAddress}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
    padding: 4,
  },
  actionIcon: {
    fontSize: 18,
    color: '#999',
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