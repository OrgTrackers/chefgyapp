import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import { ADDRESS_LABELS } from './addressConstants';


const AddressLabelSelector = ({ selected, onSelect, onCustomLabelChange }) => {
  const [customLabel, setCustomLabel] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const labels = [
    { key: ADDRESS_LABELS.HOME, icon: '🏠' },
    { key: ADDRESS_LABELS.WORK, icon: '🏢' },
    { key: ADDRESS_LABELS.OTHER, icon: '📍' },
  ];

  useEffect(() => {
    // Check if selected label is not one of the predefined ones
    const isPredefined = Object.values(ADDRESS_LABELS).includes(selected);
    if (!isPredefined && selected) {
      setShowCustomInput(true);
      setCustomLabel(selected);
    }
  }, [selected]);

  const handleCustomLabelChange = (text) => {
    setCustomLabel(text);
    if (onCustomLabelChange) {
      onCustomLabelChange(text);
    }
    onSelect(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add address label</Text>
      <View style={styles.row}>
        {labels.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.labelButton,
              selected === item.key && styles.selectedLabel,
            ]}
            onPress={() => {
              onSelect(item.key);
              setShowCustomInput(false);
              setCustomLabel('');
            }}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[
                styles.labelText,
                selected === item.key && styles.selectedText,
              ]}
            >
              {item.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Label Input */}
      <View style={styles.customLabelSection}>
        <TouchableOpacity
          style={[
            styles.customLabelButton,
            showCustomInput && styles.customLabelButtonActive,
          ]}
          onPress={() => setShowCustomInput(!showCustomInput)}
        >
          <Text style={styles.icon}>✏️</Text>
          <Text style={[styles.labelText, showCustomInput && styles.selectedText]}>
            Custom Label
          </Text>
        </TouchableOpacity>

        {showCustomInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter custom label name"
              placeholderTextColor="#999"
              value={customLabel}
              onChangeText={handleCustomLabelChange}
              maxLength={30}
              returnKeyType="done"
            />
            <Text style={styles.charCount}>{customLabel.length}/30</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  selectedLabel: {
    borderColor: '#FF6600',
    backgroundColor: '#FFF0F5',
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  labelText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FF6600',
    fontWeight: '600',
  },
  customLabelSection: {
    marginTop: 12,
  },
  customLabelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  customLabelButtonActive: {
    borderColor: '#FF6600',
    backgroundColor: '#FFF0F5',
  },
  inputContainer: {
    marginTop: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  customInput: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 8,
    fontWeight: '500',
  },
  charCount: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default AddressLabelSelector;