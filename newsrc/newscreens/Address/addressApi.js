import { Platform } from 'react-native';

// ==================== CONFIGURATION ====================
// Set to false when you're ready to connect to real API
const USE_MOCK_DATA = true;

const API_BASE_URL = 'https://your-api.com/api/v1'; // Replace with your API when ready

// Mock data for testing
const MOCK_ADDRESSES = [
  {
    id: 1,
    user_id: 1,
    label: 'Home',
    address_line1: 'Flat #501',
    address_line2: 'Garudadri block B, venkataramana colony, Gokul plots',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    pincode: '500072',
    latitude: 17.4065,
    longitude: 78.4772,
    is_primary: true,
    is_enabled: true,
    is_deleted: false,
    inserted_by: 'system',
    inserted_date: '2024-01-15T10:30:00Z',
    modified_date: '2024-05-10T08:20:00Z',
  },
  {
    id: 2,
    user_id: 1,
    label: 'Work',
    address_line1: 'Phoenix Hitec City',
    address_line2: 'Kondapur, Hitec City',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    pincode: '500084',
    latitude: 17.4504,
    longitude: 78.3810,
    is_primary: false,
    is_enabled: true,
    is_deleted: false,
    inserted_by: 'system',
    inserted_date: '2024-02-20T14:00:00Z',
    modified_date: '2024-04-05T11:15:00Z',
  },
  {
    id: 3,
    user_id: 1,
    label: 'Other',
    address_line1: 'Plot 42, Floor 3',
    address_line2: 'Near Metro Station, Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    pincode: '500081',
    latitude: 17.4483,
    longitude: 78.3915,
    is_primary: false,
    is_enabled: true,
    is_deleted: false,
    inserted_by: 'system',
    inserted_date: '2024-03-10T09:45:00Z',
    modified_date: '2024-03-10T09:45:00Z',
  },
];

// ==================== MOCK API SERVICE ====================
class MockAddressApiService {
  constructor() {
    this.addresses = [...MOCK_ADDRESSES];
    this.nextId = 4;
  }

  // Simulate network delay
  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getToken() {
    return 'mock-token';
  }

  // Get all addresses for user
  async getUserAddresses(userId) {
    await this.delay();
    return {
      success: true,
      data: this.addresses.filter(a => a.user_id === userId && !a.is_deleted),
      message: 'Addresses fetched successfully'
    };
  }

  // Get single address
  async getAddress(addressId) {
    await this.delay();
    const address = this.addresses.find(a => a.id === addressId && !a.is_deleted);
    if (!address) throw new Error('Address not found');
    return { success: true, data: address };
  }

  // Create new address
  async createAddress(addressData) {
    await this.delay(500);
    const newAddress = {
      ...addressData,
      id: this.nextId++,
      inserted_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
    };
    this.addresses.push(newAddress);
    
    // If it's primary, unset others
    if (newAddress.is_primary) {
      this.addresses.forEach(a => {
        if (a.id !== newAddress.id) a.is_primary = false;
      });
    }
    
    return { success: true, data: newAddress, message: 'Address created successfully' };
  }

  // Update address
  async updateAddress(addressId, addressData) {
    await this.delay(500);
    const index = this.addresses.findIndex(a => a.id === addressId);
    if (index === -1) throw new Error('Address not found');
    
    this.addresses[index] = {
      ...this.addresses[index],
      ...addressData,
      id: addressId,
      modified_date: new Date().toISOString(),
    };
    
    // If it's primary, unset others
    if (addressData.is_primary) {
      this.addresses.forEach(a => {
        if (a.id !== addressId) a.is_primary = false;
      });
    }
    
    return { success: true, data: this.addresses[index], message: 'Address updated successfully' };
  }

  // Soft delete
  async deleteAddress(addressId) {
    await this.delay();
    const index = this.addresses.findIndex(a => a.id === addressId);
    if (index === -1) throw new Error('Address not found');
    
    this.addresses[index].is_deleted = true;
    this.addresses[index].is_enabled = false;
    
    return { success: true, message: 'Address deleted successfully' };
  }

  // Set primary address
  async setPrimaryAddress(userId, addressId) {
    await this.delay();
    this.addresses.forEach(a => {
      if (a.user_id === userId) {
        a.is_primary = (a.id === addressId);
        a.modified_date = new Date().toISOString();
      }
    });
    return { success: true, message: 'Primary address set successfully' };
  }

  // Search nearby (mock - returns all for now)
  async searchNearby(latitude, longitude, radius = 5000) {
    await this.delay();
    return {
      success: true,
      data: this.addresses.filter(a => !a.is_deleted),
      message: 'Nearby addresses fetched'
    };
  }
}

// ==================== REAL API SERVICE (for later) ====================
class RealAddressApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await this.getToken()}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }

  async getToken() {
    // TODO: Replace with secure storage token retrieval
    // Example: return await AsyncStorage.getItem('authToken');
    return 'your-auth-token';
  }

  async getUserAddresses(userId) {
    return this.request(`/users/${userId}/addresses`);
  }

  async getAddress(addressId) {
    return this.request(`/addresses/${addressId}`);
  }

  async createAddress(addressData) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateAddress(addressId, addressData) {
    return this.request(`/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...addressData,
        modified_date: new Date().toISOString(),
      }),
    });
  }

  async deleteAddress(addressId) {
    return this.request(`/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }

  async setPrimaryAddress(userId, addressId) {
    return this.request(`/users/${userId}/addresses/${addressId}/primary`, {
      method: 'PATCH',
    });
  }

  async searchNearby(latitude, longitude, radius = 5000) {
    return this.request(`/addresses/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
  }
}

// ==================== EXPORT ====================
// Toggle between mock and real API by changing USE_MOCK_DATA at top
export const addressApi = USE_MOCK_DATA ? new MockAddressApiService() : new RealAddressApiService();

// Also export the flag so components can check if in mock mode
export { USE_MOCK_DATA };