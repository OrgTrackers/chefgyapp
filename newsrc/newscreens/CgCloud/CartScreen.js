// ─────────────────────────────────────────────────────────────────────────────
// UserApp / screens / CartScreen.js
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { cartTotal, validateCart, addToCart, removeFromCart } from '../services/cartService';
import { cartTotal, validateCart, addToCart, removeFromCart } from './cartService';
import { QuantityControl } from '../../newscreens/CgCloud/index'



/**
 * @param {{
 *   cart:    import('../models').CartLine[],
 *   setCart: Function,
 * }} props
 */
export default function CartScreen({ cart, setCart }) {
  const navigation = useNavigation();
  const total      = cartTotal(cart);
  const errors     = validateCart(cart);

  // Group lines by vendorId for display
  const byVendor = {};
  cart.forEach((line) => {
    if (!byVendor[line.vendorId]) byVendor[line.vendorId] = [];
    byVendor[line.vendorId].push(line);
  });

  function handlePlaceOrder() {
    if (errors.length > 0) {
      Alert.alert(
        'Incomplete Selections',
        errors.join('\n'),
        [{ text: 'OK' }]
      );
      return;
    }
    Alert.alert('Order Placed!', 'Your order has been confirmed.', [
      { text: 'OK', onPress: () => { setCart([]); navigation.navigate('VendorListScreen'); } },
    ]);
  }

  return (
    <View style={styles.root}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Your Cart</Text>
        <Text style={styles.navCount}>{cart.reduce((s, l) => s + l.quantity, 0)} items</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 52 }}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items from a vendor's menu to get started.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('VendorListScreen')}>
            <Text style={styles.browseBtnText}>Browse Vendors</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.list}>
            {Object.entries(byVendor).map(([vendorId, lines]) => (
              <View key={vendorId} style={styles.vendorSection}>
                {/* Vendor name derived from the first line */}
                <Text style={styles.vendorName}>
                  {lines[0]?.serving?.name ? `From Vendor #${vendorId}` : `Vendor ${vendorId}`}
                </Text>

                {lines.map((line) => (
                  <View key={line.servingId} style={styles.lineCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.lineName}>{line.serving.name}</Text>

                      {/* Group selections summary */}
                      {line.serving.combo?.groups?.map((group) => {
                        const chosen = line.groupSelections[group.groupId] ?? [];
                        return (
                          <Text key={group.groupId} style={styles.lineDetail}>
                            {group.groupName}: {chosen.length > 0 ? chosen.map(d => d.name).join(', ') : '—'}
                          </Text>
                        );
                      })}

                      {/* Optional selections */}
                      {line.optionalSelections.length > 0 && (
                        <Text style={styles.lineDetail}>
                          Extras: {line.optionalSelections.map(d => d.name).join(', ')}
                        </Text>
                      )}

                      <Text style={styles.linePrice}>₹{line.serving.price} each</Text>
                    </View>

                    <View style={{ alignItems: 'flex-end', gap: 8 }}>
                      <QuantityControl
                        quantity={line.quantity}
                        onAdd={() =>
                          setCart((prev) => addToCart(prev, line.serving, vendorId))
                        }
                        onRemove={() =>
                          setCart((prev) => removeFromCart(prev, line.servingId, vendorId))
                        }
                      />
                      <Text style={styles.lineSubtotal}>
                        ₹{line.serving.price * line.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}

            {/* Validation warnings */}
            {errors.length > 0 && (
              <View style={styles.errorBox}>
                <Icon name="warning" size={18} color="#92400E" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.errorTitle}>Complete your selections</Text>
                  {errors.map((e, i) => (
                    <Text key={i} style={styles.errorItem}>• {e}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Bill summary */}
            <View style={styles.bill}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>₹{total}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Taxes & fees</Text>
                <Text style={styles.billValue}>₹{Math.round(total * 0.05)}</Text>
              </View>
              <View style={[styles.billRow, { marginTop: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#E5E7EB' }]}>
                <Text style={[styles.billLabel, { fontWeight: '800', color: '#111827' }]}>Total</Text>
                <Text style={[styles.billValue, { fontWeight: '800', color: '#111827', fontSize: 18 }]}>
                  ₹{total + Math.round(total * 0.05)}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Place order button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.orderBtn, errors.length > 0 && styles.orderBtnDisabled]}
              onPress={handlePlaceOrder}
              activeOpacity={0.85}
            >
              <Text style={styles.orderBtnText}>
                {errors.length > 0 ? 'Complete Selections First' : 'Place Order · ₹' + (total + Math.round(total * 0.05))}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9FAFB' },

  navbar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 52, paddingBottom: 14, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: '#111827', marginLeft: 12 },
  navCount: { fontSize: 13, color: '#6B7280' },

  list: { padding: 16, paddingBottom: 100 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  emptySub:   { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  browseBtn: {
    marginTop: 16, backgroundColor: '#F65D34',
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10,
  },
  browseBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },

  vendorSection: { marginBottom: 16 },
  vendorName: { fontSize: 13, fontWeight: '700', color: '#6B7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },

  lineCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: '#E5E7EB',
    gap: 12,
  },
  lineName:     { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  lineDetail:   { fontSize: 12, color: '#6B7280', marginTop: 2 },
  linePrice:    { fontSize: 13, color: '#F65D34', fontWeight: '600', marginTop: 6 },
  lineSubtotal: { fontSize: 15, fontWeight: '800', color: '#111827' },

  errorBox: {
    flexDirection: 'row', backgroundColor: '#FEF3C7',
    borderRadius: 12, padding: 14, marginBottom: 14,
  },
  errorTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginBottom: 6 },
  errorItem:  { fontSize: 13, color: '#92400E', marginTop: 2 },

  bill: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#E5E7EB',
  },
  billRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  billLabel: { fontSize: 14, color: '#6B7280' },
  billValue: { fontSize: 14, color: '#111827' },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  orderBtn: {
    backgroundColor: '#F65D34', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  orderBtnDisabled: { backgroundColor: '#9CA3AF' },
  orderBtnText: { fontSize: 16, fontWeight: '800', color: '#FFF' },
});
