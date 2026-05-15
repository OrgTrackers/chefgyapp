import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import FormInput from './FormInput';
import { formatAddressDisplay } from './addressMapper';

const EditProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: null,
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    loadProfile();
    loadAddresses();
    
    // Handle address selection from SelectLocation screen
    if (route.params?.selectedAddress) {
      setSelectedAddress(route.params.selectedAddress);
    }
  }, [route.params?.selectedAddress]);

  const loadProfile = async () => {
    // API call to get profile
    // const data = await api.get('/profile');
    setProfile({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      avatar: null,
    });
  };

  const loadAddresses = async () => {
    // API call to get addresses
    // const data = await api.get(`/users/${userId}/addresses`);
    const mockAddresses = [
      {
        id: 1,
        label: 'Home',
        address_line1: 'Flat #101',
        address_line2: 'Block C, VR colony',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500072',
        is_primary: true,
      },
    ];
    setAddresses(mockAddresses);
    setSelectedAddress(mockAddresses.find(a => a.is_primary) || mockAddresses[0]);
  };

  const updateProfileField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    // API call to update profile
    Alert.alert('Success', 'Profile updated successfully');
  };

  const navigateToAddresses = () => {
    navigation.navigate('SelectLocation', { 
      userId: 1, // Get from auth context
      onSelect: (address) => setSelectedAddress(address),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveProfile}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <FormInput
            label="Full Name"
            value={profile.name}
            onChangeText={(text) => updateProfileField('name', text)}
            placeholder="Enter your name"
            required
          />

          <FormInput
            label="Email"
            value={profile.email}
            onChangeText={(text) => updateProfileField('email', text)}
            placeholder="email@example.com"
            keyboardType="email-address"
            required
          />

          <FormInput
            label="Phone Number"
            value={profile.phone}
            onChangeText={(text) => updateProfileField('phone', text)}
            placeholder="+91 9876543210"
            keyboardType="phone-pad"
            required
          />
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Addresses</Text>
            <TouchableOpacity onPress={navigateToAddresses}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>

          {selectedAddress ? (
            <TouchableOpacity 
              style={styles.selectedAddressCard}
              onPress={navigateToAddresses}
            >
              <View style={styles.addressIconContainer}>
                <Text style={styles.addressIcon}>
                  {selectedAddress.label === 'Home' ? '🏠' : 
                   selectedAddress.label === 'Work' ? '🏢' : '📍'}
                </Text>
              </View>
              <View style={styles.addressInfo}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
                  {selectedAddress.is_primary && (
                    <View style={styles.primaryBadge}>
                      <Text style={styles.primaryText}>Primary</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressText} numberOfLines={2}>
                  {formatAddressDisplay(selectedAddress)}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.addAddressCard}
              onPress={navigateToAddresses}
            >
              <Text style={styles.addIcon}>+</Text>
              <Text style={styles.addText}>Add New Address</Text>
            </TouchableOpacity>
          )}

          {/* Quick address list */}
          {addresses.length > 1 && (
            <View style={styles.addressList}>
              {addresses.filter(a => a.id !== selectedAddress?.id).map(address => (
                <TouchableOpacity 
                  key={address.id}
                  style={styles.addressItem}
                  onPress={() => setSelectedAddress(address)}
                >
                  <Text style={styles.itemIcon}>
                    {address.label === 'Home' ? '🏠' : 
                     address.label === 'Work' ? '🏢' : '📍'}
                  </Text>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemLabel}>{address.label}</Text>
                    <Text style={styles.itemText} numberOfLines={1}>
                      {formatAddressDisplay(address)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Hidden DB Fields Info (for debugging/admin) */}
        <View style={styles.dbInfoSection}>
          <Text style={styles.dbInfoTitle}>Storage Information</Text>
          <Text style={styles.dbInfoText}>
            Addresses are stored with: id (serial), user_id, label, address_line1, 
            address_line2, city, state, country, pincode, latitude, longitude, 
            is_primary, is_enabled, timestamps, and geographic location data.
          </Text>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  saveText: {
    fontSize: 16,
    color: '#FF6600',
    fontWeight: '600',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    color: '#FF6600',
    fontSize: 14,
    fontWeight: '600',
  },
  addressSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  manageText: {
    color: '#FF6600',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FF6600',
  },
  addressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressIcon: {
    fontSize: 24,
  },
  addressInfo: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  primaryBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  primaryText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: '#999',
    marginLeft: 8,
  },
  addAddressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
  },
  addIcon: {
    fontSize: 24,
    color: '#FF6600',
    marginRight: 8,
  },
  addText: {
    fontSize: 16,
    color: '#FF6600',
    fontWeight: '600',
  },
  addressList: {
    marginTop: 12,
    gap: 8,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemText: {
    fontSize: 12,
    color: '#666',
  },
  dbInfoSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
  },
  dbInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  dbInfoText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
  },
});

export default EditProfileScreen;