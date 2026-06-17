// ─────────────────────────────────────────────────────────────────────────────
// UserApp / screens / VendorListScreen.js
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, TextInput, FlatList,
  RefreshControl, ActivityIndicator, StyleSheet,TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { useVendorListVM } from '../viewmodels/useVendorListVM';
import { useVendorListVM } from './useVendorListVM';

import {VendorCard, CartBar} from '../../newscreens/CgCloud/index'

/**
 * Entry screen for the User App.
 * Displays all enrolled vendors; tapping one navigates to their menu.
 *
 * @param {{ cart: import('../models').CartLine[], onViewCart: Function }} props
 */
export default function VendorListScreen({ cart = [], onViewCart }) {
  const navigation = useNavigation();
  const { vendors, loading, error, search, setSearch, refresh } = useVendorListVM();

  const totalCount = cart.reduce((s, l) => s + l.quantity, 0);
  const totalPrice = cart.reduce((s, l) => s + l.serving.price * l.quantity, 0);

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                  <Icon name="arrow-back" size={22} color="#111827" />
                </TouchableOpacity>
        <Text style={styles.heading}>Order Your Food</Text>
        <Text style={styles.subheading}>Choose a vendor to browse their menu</Text>

        {/* Search */}
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors or cuisine…"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Icon name="close" size={18} color="#9CA3AF" onPress={() => setSearch('')} />
          )}
        </View>
      </View>

      {/* Body */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F65D34" />
          <Text style={styles.loadingText}>Finding vendors…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Icon name="wifi-off" size={40} color="#9CA3AF" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={vendors}
          keyExtractor={(v) => String(v.vendorId)}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={false} onRefresh={refresh} tintColor="#F65D34" />}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ fontSize: 36 }}>🔍</Text>
              <Text style={styles.emptyText}>No vendors match "{search}"</Text>
            </View>
          }
          renderItem={({ item }) => (
            <VendorCard
              vendor={item}
              onPress={() =>
                navigation.navigate('VendorMenuScreen', { vendor: item })
              }
            />
          )}
        />
      )}

      {/* Cart sticky bar */}
      <CartBar count={totalCount} total={totalPrice} onPress={onViewCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9FAFB' },

  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  heading:    { fontSize: 26, fontWeight: '800', color: '#111827' },
  subheading: { fontSize: 14, color: '#6B7280', marginTop: 4, marginBottom: 14 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#F3F4F6', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  searchInput: { flex: 1, fontSize: 15, color: '#111827', padding: 0 },

  list:        { padding: 16, paddingBottom: 100 },
  center:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  loadingText: { marginTop: 12, color: '#6B7280', fontSize: 14 },
  errorText:   { marginTop: 12, color: '#EF4444', fontSize: 14, textAlign: 'center' },
  emptyText:   { marginTop: 10, color: '#6B7280', fontSize: 14 },
});
