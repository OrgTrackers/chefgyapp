import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { GOOGLE_MAPS_API_KEY } from './addressConstants';


const GooglePlacesInput = ({ 
  placeholder = 'Search Address',
  onSelect,
  value,
  style,
  containerStyle 
}) => {
  const [query, setQuery] = useState(value || '');
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const searchPlaces = async (text) => {
    setQuery(text);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (text.length < 3) {
      setPredictions([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_MAPS_API_KEY}&components=country:in`
        );
        const data = await response.json();
        setPredictions(data.predictions || []);
      } catch (error) {
        console.error('Places API error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}&fields=geometry,address_component,formatted_address`
      );
      const data = await response.json();
      
      if (data.result) {
        const { geometry, address_components, formatted_address } = data.result;
        const lat = geometry.location.lat;
        const lng = geometry.location.lng;

        // Extract address components
        const getComponent = (type) => {
          const comp = address_components.find(c => c.types.includes(type));
          return comp ? comp.long_name : '';
        };

        const addressData = {
          formattedAddress: formatted_address,
          latitude: lat,
          longitude: lng,
          city: getComponent('locality') || getComponent('administrative_area_level_2'),
          state: getComponent('administrative_area_level_1'),
          country: getComponent('country'),
          pincode: getComponent('postal_code'),
          areaName: getComponent('sublocality') || getComponent('neighborhood'),
          landmark: '',
        };

        onSelect(addressData);
        setQuery(formatted_address);
        setPredictions([]);
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, style]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={searchPlaces}
          placeholder={placeholder}
          placeholderTextColor="#999"
        />
        {loading && <ActivityIndicator size="small" color="#FF6600" />}
      </View>

      {predictions.length > 0 && (
        <View style={styles.predictionsContainer}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.predictionItem}
                onPress={() => getPlaceDetails(item.place_id)}
              >
                <Text style={styles.predictionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  inputContainer: {
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
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  predictionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  predictionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  predictionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default GooglePlacesInput;