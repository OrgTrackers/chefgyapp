import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  optional = false,
  multiline = false,
  keyboardType = 'default',
  containerStyle,
  maxLength,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
        {optional && <Text style={styles.optional}>(Optional)</Text>}
      </View>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  required: {
    color: '#FF6600',
    marginLeft: 2,
    fontSize: 13,
  },
  optional: {
    color: '#999',
    marginLeft: 4,
    fontSize: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default FormInput;