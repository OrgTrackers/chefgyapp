// ─── CartScreen ───────────────────────────────────────────────────────────────
import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing } from '../../newscreens/Cloud/index';
import { BackButton } from '../../newscreens/Cloud/Shared';
import { useCart } from './Usecart';

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 300;
const GST_RATE = 0.05;
const PLATFORM_FEE = 5;

export default function CartScreen({ navigation }) {
  // CRITICAL FIX: Use cartItems directly from context instead of Object.values(cart)
  const { cartItems, itemCount, clearCart, changeQty } = useCart();
  
  const [isDelivery, setIsDelivery] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [note, setNote] = useState('');

  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      const itemPrice = item?.price || 0;
      const itemQty = item?.qty || 0;
      const addons = item?.selectedAddons || [];
      const addonTotal = addons.reduce((a, add) => a + (add?.p || 0), 0);
      return sum + (itemPrice + addonTotal) * itemQty;
    }, 0);

    const comboSavings = cartItems.reduce((sum, item) => {
      return sum + ((item?.savings || 0) * (item?.qty || 0));
    }, 0);

    const promoDiscount = promoApplied ? Math.round(subtotal * 0.2) : 0;
    const deliveryFee = isDelivery && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
    const gst = Math.round(subtotal * GST_RATE);
    const total = Math.max(0, subtotal - promoDiscount - comboSavings + deliveryFee + gst + PLATFORM_FEE);
    const saved = promoDiscount + comboSavings + (deliveryFee === 0 && isDelivery ? DELIVERY_FEE : 0);

    return { 
      subtotal, 
      comboSavings, 
      promoDiscount, 
      deliveryFee, 
      gst, 
      total, 
      saved,
    };
  }, [cartItems, isDelivery, promoApplied]);

  const applyPromo = useCallback(() => {
    if (promoCode.trim().toUpperCase() === 'RASA20') {
      setPromoApplied(true);
      setPromoCode('');
    }
  }, [promoCode]);

  const removePromo = useCallback(() => {
    setPromoApplied(false);
  }, []);

  // ─── Empty State ────────────────────────────────────────────────────────────
  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
          <Text style={styles.headerTitle}>Your Cart</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add some delicious dishes to get started</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('MenuScreen')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.spice, '#FF8C42']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.browseBtn}
            >
              <Text style={styles.browseBtnText}>Browse Menu</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─── Main Cart View ─────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <Text style={styles.headerSub}>{itemCount} items</Text>
        </View>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* Delivery Toggle */}
        <View style={styles.deliveryRow}>
          <TouchableOpacity
            onPress={() => setIsDelivery(true)}
            style={[styles.pill, isDelivery && styles.pillActive]}
          >
            <Text style={[styles.pillText, isDelivery && styles.pillTextActive]}>
              🛵 Delivery
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setIsDelivery(false)}
            style={[styles.pill, !isDelivery && styles.pillActive]}
          >
            <Text style={[styles.pillText, !isDelivery && styles.pillTextActive]}>
              🏪 Pickup
            </Text>
          </TouchableOpacity>

         <TouchableOpacity 
          onPress={() => navigation.navigate('MenuScreen')}
          activeOpacity={0.85}
          style={[styles.pill, !isDelivery && styles.pillActive]}
         >         
        <Text style={[styles.pillText, !isDelivery && styles.pillTextActive]}>
        🎁 Add More Items
        </Text>
        
        </TouchableOpacity>



        </View>

        {/* Cart Items - Use cartItems directly from context */}
        <View style={styles.itemsSection}>
          {cartItems.map((item) => {
            if (!item || !item.id) return null;
            
            const addonNames = (item.selectedAddons || [])
              .filter(a => a && a.n)
              .map(a => a.n)
              .join(', ');
            
            return (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <View style={styles.itemImage}>
                    <Text style={styles.itemEmoji}>{item.emoji || '🍽️'}</Text>
                  </View>
                  
                  <View style={styles.itemBody}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name || 'Unknown Item'}
                    </Text>
                    <View style={styles.itemTags}>
                      <View style={[styles.tag, item.veg ? styles.tagVeg : styles.tagNveg]}>
                        <Text style={[styles.tagText, item.veg ? styles.tagVegText : styles.tagNvegText]}>
                          {item.veg ? 'VEG' : 'NON-VEG'}
                        </Text>
                      </View>
                      {(item.savings || 0) > 0 && (
                        <Text style={styles.saveBadge}>Save ₹{item.savings}</Text>
                      )}
                    </View>
                    {addonNames ? (
                      <Text style={styles.addonText}>+ {addonNames}</Text>
                    ) : null}
                    
                    <View style={styles.itemFooter}>
                      <Text style={styles.itemPrice}>₹{item.price || 0}</Text>
                      <View style={styles.qtyRow}>
                        <TouchableOpacity 
                          style={[styles.qtyBtn, styles.qtyMinus]}
                          onPress={() => changeQty(item.id, -1)}
                        >
                          <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyNum}>{item.qty || 0}</Text>
                        <TouchableOpacity 
                          style={[styles.qtyBtn, styles.qtyPlus]}
                          onPress={() => changeQty(item.id, 1)}
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <View style={styles.offerStrip}>
            <Text style={styles.offerIcon}>🏷</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>Have a promo code?</Text>
              <Text style={styles.offerSub}>Use RASA20 to save 20% on first order</Text>
            </View>
          </View>
          
          {!promoApplied ? (
            <View style={styles.promoInputRow}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter promo code"
                placeholderTextColor={Colors.muted}
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity onPress={applyPromo} activeOpacity={0.85}>
                <LinearGradient
                  colors={[Colors.spice, '#FF8C42']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.applyBtn}
                >
                  <Text style={styles.applyBtnText}>Apply</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.promoApplied}>
              <View>
                <Text style={styles.promoAppliedTitle}>RASA20 applied!</Text>
                <Text style={styles.promoAppliedSub}>20% discount added</Text>
              </View>
              <TouchableOpacity onPress={removePromo}>
                <Text style={styles.promoRemove}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Order Note */}
        <View style={styles.noteSection}>
          <View style={styles.noteCard}>
            <Text style={styles.noteLabel}>Add a note</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="E.g. less spice, no onion..."
              placeholderTextColor={Colors.muted}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={2}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFoot}>
        <View style={styles.footRow}>
          <View>
            <Text style={styles.footLabel}>
              Total ({itemCount} item{itemCount !== 1 ? 's' : ''})
            </Text>
            <View style={styles.footPriceRow}>
              <Text style={styles.footPrice}>₹{calculations.total}</Text>
              {calculations.saved > 0 && (
                <Text style={styles.footSaved}>saved ₹{calculations.saved}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('BillSummaryScreen', { 
              calculations, 
              cartItems, 
              isDelivery,
              note,
            })}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.spice, '#FF8C42']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.proceedBtn}
            >
              <Text style={styles.proceedText}>Proceed →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.footSub}>
          Estimated {isDelivery ? 'delivery: 30–40 min' : 'pickup: 15–20 min'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: Spacing.lg, paddingTop: 52,
  },
  headerTitle: { fontSize: 18, fontFamily: Fonts.bodyBold, color: Colors.text },
  headerSub: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  clearText: { fontSize: 11, color: Colors.muted },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 15, fontFamily: Fonts.bodyBold, color: Colors.text, marginBottom: 6 },
  emptySub: { fontSize: 12, color: Colors.muted, marginBottom: 20 },
  browseBtn: { borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
  browseBtnText: { color: '#fff', fontSize: 14, fontFamily: Fonts.bodyBold },
  deliveryRow: { flexDirection: 'row', gap: 8, paddingHorizontal: Spacing.lg, paddingBottom: 12 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'transparent' },
  pillActive: { borderColor: Colors.spice, backgroundColor: 'rgba(255,76,41,0.1)' },
  pillText: { fontSize: 12, fontFamily: Fonts.bodySemi, color: Colors.muted },
  pillTextActive: { color: Colors.spice },
  itemsSection: { paddingHorizontal: Spacing.lg },
  itemCard: { backgroundColor: Colors.card, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 14, marginBottom: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemImage: { width: 56, height: 56, borderRadius: 12, backgroundColor: '#22223a', alignItems: 'center', justifyContent: 'center' },
  itemEmoji: { fontSize: 28 },
  itemBody: { flex: 1, minWidth: 0 },
  itemName: { fontSize: 13, fontFamily: Fonts.bodyBold, color: Colors.text, marginBottom: 4 },
  itemTags: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  tag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1 },
  tagVeg: { backgroundColor: 'rgba(76,175,80,.15)', borderColor: 'rgba(76,175,80,.25)' },
  tagNveg: { backgroundColor: 'rgba(255,107,53,.15)', borderColor: 'rgba(255,107,53,.25)' },
  tagText: { fontSize: 9, fontFamily: Fonts.bodyBold },
  tagVegText: { color: '#6fcf7a' },
  tagNvegText: { color: '#ff8c65' },
  saveBadge: { fontSize: 10, color: '#6fcf7a', fontFamily: Fonts.bodyBold },
  addonText: { fontSize: 11, color: Colors.muted, marginBottom: 6 },
  itemFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemPrice: { fontSize: 16, fontFamily: Fonts.bodyXB, color: Colors.gold },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  qtyMinus: { backgroundColor: '#22223a' },
  qtyPlus: { backgroundColor: Colors.spice },
  qtyBtnText: { fontSize: 14, fontFamily: Fonts.bodyBold, color: '#fff' },
  qtyNum: { fontSize: 14, fontFamily: Fonts.bodyXB, color: Colors.gold, minWidth: 20, textAlign: 'center' },
  promoSection: { paddingHorizontal: Spacing.lg, paddingBottom: 12 },
  offerStrip: { backgroundColor: 'rgba(255,76,41,0.1)', borderWidth: 1, borderColor: 'rgba(255,76,41,0.2)', borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  offerIcon: { fontSize: 14 },
  offerTitle: { fontSize: 12, fontFamily: Fonts.bodyBold, color: Colors.text },
  offerSub: { fontSize: 11, color: Colors.muted },
  promoInputRow: { flexDirection: 'row', gap: 8 },
  promoInput: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 14, paddingVertical: 10, color: Colors.text, fontFamily: Fonts.body, fontSize: 13 },
  applyBtn: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, justifyContent: 'center' },
  applyBtnText: { color: '#fff', fontSize: 12, fontFamily: Fonts.bodyBold },
  promoApplied: { backgroundColor: 'rgba(76,175,80,0.1)', borderWidth: 1, borderColor: 'rgba(76,175,80,0.25)', borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  promoAppliedTitle: { fontSize: 12, fontFamily: Fonts.bodyBold, color: '#6fcf7a' },
  promoAppliedSub: { fontSize: 11, color: Colors.muted },
  promoRemove: { fontSize: 18, color: Colors.muted },
  noteSection: { paddingHorizontal: Spacing.lg, paddingBottom: 12 },
  noteCard: { backgroundColor: Colors.card, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 14 },
  noteLabel: { fontSize: 12, fontFamily: Fonts.bodyBold, color: Colors.muted, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 },
  noteInput: { backgroundColor: '#22223a', borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 14, paddingVertical: 10, color: Colors.text, fontFamily: Fonts.body, fontSize: 13, height: 60, textAlignVertical: 'top' },
  stickyFoot: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.dark, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', padding: 12, paddingHorizontal: 16, paddingBottom: 24 },
  footRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  footLabel: { fontSize: 11, color: Colors.muted },
  footPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  footPrice: { fontSize: 22, fontFamily: Fonts.bodyXB, color: Colors.gold },
  footSaved: { fontSize: 11, color: '#6fcf7a' },
  proceedBtn: { borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20 },
  proceedText: { color: '#fff', fontSize: 14, fontFamily: Fonts.bodyBold },
  footSub: { fontSize: 10, color: Colors.muted, textAlign: 'center' },
});