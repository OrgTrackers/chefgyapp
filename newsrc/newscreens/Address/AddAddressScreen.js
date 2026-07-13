import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FormInput from './FormInput';
import AddressLabelSelector from './AddressLabelSelector';
// import GooglePlacesInput from './GooglePlacesInput'; // Commented out - uses API key
import { mapUIToDatabase, mapDatabaseToUI } from './addressMapper';
import { ADDRESS_LABELS } from './addressConstants';
import services from '../../../src/services/api/services';

import { useNavigation } from '@react-navigation/native';


// ==================== API KEY CONFIGURATION ====================
// Set to true when you have a valid Google Maps API key
const USE_GOOGLE_API = false;

// Placeholder for API key - replace with actual key when ready
const GOOGLE_MAPS_API_KEY = USE_GOOGLE_API ? 'YOUR_GOOGLE_MAPS_API_KEY' : '';

// Simple search input without Google Places API
const SimpleSearchInput = ({ placeholder, onSelect, value, containerStyle }) => {
  const [query, setQuery] = useState(value || '');


  const handleSubmit = () => {
    // Mock search - just return the query as a manual location
    if (query.trim().length > 3) {
      onSelect({
        formattedAddress: query,
        latitude: 17.4065,  // Default Hyderabad coordinates
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
      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const AddAddressScreen = ({ route }) => {
  const navigation = useNavigation();
  const editData = route.params?.editData;
  const locationData = route.params?.locationData;
  const userId = route.params?.userId || route.params?.resolvedUserId;
  const addressId = route.params?.addressId;

  const [formData, setFormData] = useState({
    label: ADDRESS_LABELS.HOME,
    flatNumber: '',
    buildingBlock: '',
    landmark: '',
    areaName: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    latitude: '',
    longitude: '',
    receiverName: '',
    receiverPhone: '',
    isPrimary: false,
  });

  const [region, setRegion] = useState({
    latitude: 17.4065,
    longitude: 78.4772,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      if (editData.latitude && editData.longitude) {
        setRegion({
          latitude: parseFloat(editData.latitude),
          longitude: parseFloat(editData.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    } else if (locationData) {
      const newRegion = {
        latitude: locationData.latitude || 17.4065,
        longitude: locationData.longitude || 78.4772,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(newRegion);
      setFormData(prev => ({
        ...prev,
        latitude: locationData.latitude?.toString() || '',
        longitude: locationData.longitude?.toString() || '',
        city: locationData.city || '',
        state: locationData.state || '',
        country: locationData.country || 'India',
        areaName: locationData.areaName || '',
        landmark: locationData.landmark || '',
        pincode: locationData.pincode || '',
      }));
    }
  }, [editData, locationData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
    updateField('latitude', latitude.toString());
    updateField('longitude', longitude.toString());

    // Reverse geocode - only if API key is available
    if (USE_GOOGLE_API) {
      reverseGeocode(latitude, longitude);
    } else {
      // Mock reverse geocode - just use coordinates
      updateField('areaName', `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    if (!USE_GOOGLE_API) return; // Suppressed when no API key

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const components = data.results[0].address_components;
        const getComp = (type) => components.find(c => c.types.includes(type))?.long_name || '';

        updateField('city', getComp('locality') || getComp('administrative_area_level_2'));
        updateField('state', getComp('administrative_area_level_1'));
        updateField('pincode', getComp('postal_code'));
        updateField('areaName', getComp('sublocality') || getComp('neighborhood'));
      }
    } catch (error) {
      console.error('Reverse geocode error:', error);
    }
  };

  const handlePlaceSelect = (placeData) => {
    const newRegion = {
      latitude: placeData.latitude,
      longitude: placeData.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);

    setFormData(prev => ({
      ...prev,
      latitude: placeData.latitude.toString(),
      longitude: placeData.longitude.toString(),
      city: placeData.city || '',
      state: placeData.state || '',
      country: placeData.country || 'India',
      areaName: placeData.areaName || '',
      pincode: placeData.pincode || '',
    }));
  };

  const validateForm = () => {
    if (!formData.flatNumber.trim()) {
      Alert.alert('Error', 'House No. & Floor is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    console.log('AddAddressScreen route params:', route.params);
    if (!userId) {
      console.error('Missing userId for address save', route.params);
      Alert.alert('Error', 'Unable to save address: missing user session.');
      return;
    }

    try {
      if (!formData.flatNumber.trim()) {
        Alert.alert('Error', 'House No. & Floor is required');
        return;
      }

      if (!userId) {
        console.error('Missing userId for address save', route.params);
        Alert.alert('Error', 'Unable to save address: missing user session.');
        return;
      }

      if (addressId) {
        const payload = {
          id: addressId,
          user_id: userId,
          address_type_id: editData?.address_type_id || 39,
          custom_label: formData.areaName || '',
          label: formData.label,
          address_line1: formData.flatNumber,
          address_line2: formData.buildingBlock || '',
          landmark: formData.landmark || '',
          delivery_instructions: '',
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          modified_by: userId,
        };

        console.log('UpdateAddress payload:', payload);
        const response = await services.UpdateAddress(payload);
        console.log('UpdateAddress response:', response?.data || response);
        Alert.alert('Success', 'Address updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SelectLocationScreen'),
          },
        ]);
        return;
      }

      const payload = {
        user_id: userId,
        address_type_id: 39,
        custom_label: formData.areaName || '',
        label: formData.label,
        address_line1: formData.flatNumber,
        address_line2: formData.buildingBlock || '',
        landmark: formData.landmark || '',
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        inserted_by: userId,
      };

      console.log('CreateAddress payload:', payload);
      const response = await services.CreateAddress(payload);
      console.log('CreateAddress response:', response?.data || response);
      Alert.alert('Success', 'Address added successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SelectLocationScreen'),
        },
      ]);
    } catch (error) {
      console.error('Address save failed:', error);
      Alert.alert('Error', 'Failed to save address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {addressId ? 'Edit Address' : 'Add Address Details'}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search Input - Simple version without Google Places API */}
          <View style={styles.searchSection}>
            <SimpleSearchInput
              placeholder="Search location (manual entry)"
              onSelect={handlePlaceSelect}
              containerStyle={{ marginBottom: 16 }}
            />
            {!USE_GOOGLE_API && (
              <Text style={styles.apiNotice}>
                ⚠️ Google Places API disabled. Tap on map to select location or type manually.
              </Text>
            )}
          </View>

          {/* Map View */}
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              region={region}
              onPress={handleMapPress}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(formData.latitude) || region.latitude,
                  longitude: parseFloat(formData.longitude) || region.longitude,
                }}
                pinColor="#FF6600"
              />
            </MapView>

            {/* Location Name Overlay */}
            <View style={styles.locationOverlay}>
              <Text style={styles.locationName}>
                📍 {formData.areaName || 'Tap map to select location'}
              </Text>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => {
                  // Reset to default region when no API
                  if (!USE_GOOGLE_API) {
                    setRegion({
                      latitude: 17.4065,
                      longitude: 78.4772,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    });
                  }
                }}
              >
                <Text style={styles.changeText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <FormInput
              label="House No. & Floor"
              value={formData.flatNumber}
              onChangeText={(text) => updateField('flatNumber', text)}
              placeholder="Flat #"
              required
            />

            <FormInput
              label="Building & Block No."
              value={formData.buildingBlock}
              onChangeText={(text) => updateField('buildingBlock', text)}
              placeholder="Building name, Block"
              optional
            />

            <FormInput
              label="Landmark & Area Name"
              value={formData.landmark}
              onChangeText={(text) => updateField('landmark', text)}
              placeholder="Near landmark, Area"
              optional
            />

            {/* Hidden fields that map to DB but shown for verification */}
            <View style={styles.hiddenSection}>
              <Text style={styles.sectionLabel}>Location Details (Auto-filled or Manual)</Text>
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="City"
                    value={formData.city}
                    onChangeText={(text) => updateField('city', text)}
                    placeholder="City"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="State"
                    value={formData.state}
                    onChangeText={(text) => updateField('state', text)}
                    placeholder="State"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="Pincode"
                    value={formData.pincode}
                    onChangeText={(text) => updateField('pincode', text)}
                    placeholder="500001"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
                <View style={styles.halfWidth}>
                  <FormInput
                    label="Country"
                    value={formData.country}
                    onChangeText={(text) => updateField('country', text)}
                    placeholder="Country"
                  />
                </View>
              </View>

              {/* Coordinates display (read-only, stored in DB) */}
              <View style={styles.coordinatesContainer}>
                <Text style={styles.coordLabel}>Coordinates (DB Storage)</Text>
                <Text style={styles.coordText}>
                  Lat: {formData.latitude || 'Not set'}, Lng: {formData.longitude || 'Not set'}
                </Text>
              </View>
            </View>

            {/* Address Label */}
            <AddressLabelSelector
              selected={formData.label}
              onSelect={(label) => updateField('label', label)}
            />

            {/* Receiver Details */}
            <View style={styles.receiverSection}>
              <Text style={styles.sectionTitle}>Receiver details</Text>

              <FormInput
                label="Receiver's Name"
                value={formData.receiverName}
                onChangeText={(text) => updateField('receiverName', text)}
                placeholder="Full name"
              />

              <View style={styles.phoneContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <View style={styles.phoneInput}>
                  <FormInput
                    label="Receiver's Phone Number"
                    value={formData.receiverPhone}
                    onChangeText={(text) => updateField('receiverPhone', text)}
                    placeholder="10-digit number"
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {addressId ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
  searchButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  apiNotice: {
    fontSize: 12,
    color: '#FF6B00',
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  mapContainer: {
    height: height * 0.30,
    position: 'relative',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  changeText: {
    color: '#FF6600',
    fontSize: 12,
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
  },
  hiddenSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  coordinatesContainer: {
    backgroundColor: '#FFF0F5',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  coordLabel: {
    fontSize: 11,
    color: '#FF6600',
    fontWeight: '600',
    marginBottom: 4,
  },
  coordText: {
    fontSize: 12,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  receiverSection: {
    marginTop: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  countryCode: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#FF6600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default AddAddressScreen;