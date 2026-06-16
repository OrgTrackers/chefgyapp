// ─────────────────────────────────────────────────────────────────────────────
// UserApp / screens / VendorMenuScreen.js
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, FlatList, RefreshControl,
  ActivityIndicator, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { useVendorMenuVM } from '../viewmodels/useVendorMenuVM';
import { useVendorMenuVM } from './useVendorMenuVM';

import {  ServingCard, ComboDetailSheet,
  CartBar, FilterTabs,} from '../../newscreens/CgCloud/index'

/**
 * Second screen: a vendor's full menu.
 * Passed `cart` and `setCart` from the root navigator so cart persists.
 *
 * @param {{
 *   cart:      import('../models').CartLine[],
 *   setCart:   Function,
 *   onViewCart: Function,
 * }} props
 */
export default function VendorMenuScreen({ cart = [], setCart = () => {}, onViewCart = () => {} }) {
  const navigation = useNavigation();
  const route      = useRoute();
  const vendor     = route.params?.vendor;

  const vm = useVendorMenuVM(vendor, cart, setCart);

  if (!vendor) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#EF4444' }}>Vendor not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.navTitle}>{vendor.name}</Text>
          {vendor.cuisineType ? (
            <Text style={styles.navSub}>{vendor.cuisineType}</Text>
          ) : null}
        </View>
        {!vendor.isOpen && (
          <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}>
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Closed</Text>
          </View>
        )}
      </View>

      {/* Filter tabs */}
      <FilterTabs active={vm.filter} onChange={vm.setFilter} />

      {/* Body */}
      {vm.loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F65D34" />
          <Text style={styles.loadingText}>Loading menu…</Text>
        </View>
      ) : vm.error ? (
        <View style={styles.center}>
          <Icon name="wifi-off" size={40} color="#9CA3AF" />
          <Text style={styles.errorText}>{vm.error}</Text>
        </View>
      ) : (
        <FlatList
          data={vm.servings}
          keyExtractor={(s) => s.servingId}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={vm.refresh} tintColor="#F65D34" />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ fontSize: 36 }}>🍽️</Text>
              <Text style={styles.emptyText}>No items in this category.</Text>
            </View>
          }
          ListHeaderComponent={
            // Validation errors (incomplete combo selections)
            vm.cartErrors.length > 0 ? (
              <View style={styles.errorBanner}>
                <Icon name="warning" size={16} color="#92400E" />
                <Text style={styles.errorBannerText}>
                  {vm.cartErrors[0]}
                  {vm.cartErrors.length > 1
                    ? ` (+${vm.cartErrors.length - 1} more)`
                    : ''}
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item: serving }) => (
            <ServingCard
              serving={serving}
              quantity={vm.quantityFor(serving.servingId)}
              vendorOpen={vendor.isOpen}
              onAdd={() => vm.onAdd(serving)}
              onRemove={() => vm.onRemove(serving.servingId)}
              onViewCombo={() => vm.setActiveCombo(serving.servingId)}
            />
          )}
        />
      )}

      {/* Combo customisation sheet */}
      {vm.activeCombo && (() => {
        const activeSrv = vm.servings.find((s) => s.servingId === vm.activeCombo);
        if (!activeSrv) return null;
        return (
          <ComboDetailSheet
            visible
            serving={activeSrv}
            quantity={vm.quantityFor(activeSrv.servingId)}
            groupSelections={vm.groupSelectionsFor(activeSrv.servingId)}
            optionalSelections={vm.optionalSelectionsFor(activeSrv.servingId)}
            onGroupSelect={(groupId, dishes) =>
              vm.onGroupSelect(activeSrv.servingId, groupId, dishes)
            }
            onToggleOptional={(dish) => vm.onToggleOptional(activeSrv.servingId, dish)}
            onAdd={() => vm.onAdd(activeSrv)}
            onRemove={() => vm.onRemove(activeSrv.servingId)}
            onClose={() => vm.setActiveCombo(null)}
          />
        );
      })()}

      {/* Sticky cart bar */}
      <CartBar
        count={vm.totalCount}
        total={vm.totalPrice}
        onPress={onViewCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },

  navbar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 50, paddingBottom: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  navSub:   { fontSize: 12, color: '#F65D34', fontWeight: '600' },

  badge:     { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '700' },

  list:        { padding: 16, paddingBottom: 110 },
  loadingText: { marginTop: 12, color: '#6B7280', fontSize: 14 },
  errorText:   { marginTop: 12, color: '#EF4444', fontSize: 14, textAlign: 'center' },
  emptyText:   { marginTop: 10, color: '#6B7280', fontSize: 14 },

  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FEF3C7', borderRadius: 10,
    padding: 12, marginBottom: 12,
  },
  errorBannerText: { flex: 1, fontSize: 13, color: '#92400E' },
});
