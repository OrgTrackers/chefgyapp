// ─── CustomizeScreen ──────────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Shadow } from '../../newscreens/Cloud/index';
import { Tag, SpiceDots, BackButton } from '../../newscreens/Cloud/Shared';
import { useCart } from '../../newscreens/Cloud/Usecart';
import{CartScreen}from '../../newscreens/Cloud/Shared';

export default function CustomizeScreen({ navigation, route }) {
  const { item } = route?.params || {};
  const { addItem, getQty, changeQty, updateItem } = useCart();
  
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={{ color: Colors.text }}>No item selected</Text>
      </View>
    );
  }

  const existingQty = getQty(item.id);
  const isInCart = existingQty > 0;

  const toggleAddon = useCallback((addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.n === addon.n);
      if (exists) {
        return prev.filter(a => a.n !== addon.n);
      }
      return [...prev, addon];
    });
  }, []);

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.p, 0);
  const itemTotal = (item.price + addonTotal) * quantity;

  const handleAddToCart = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    if (isInCart) {
      updateItem(item, selectedAddons, quantity);
    } else {
      addItem(item, selectedAddons, quantity);
    }

    navigation.navigate('CartScreen');
  }, [item, selectedAddons, quantity, addItem, updateItem, isInCart, navigation, scaleAnim]);

  const handleUpdateCart = useCallback(() => {
    updateItem(item, selectedAddons, quantity);
    navigation.goBack();
  }, [item, selectedAddons, quantity, updateItem, navigation]);

  const incrementQty = () => setQuantity(q => Math.min(q + 1, 10));
  const decrementQty = () => setQuantity(q => Math.max(q - 1, 1));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <Text style={styles.headerTitle}>Customize</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Item Image Card */}
        <View style={styles.imageCard}>
          <View style={styles.imageWrap}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          {item.special && (
            <View style={styles.specialBadge}>
              <Tag type="special" />
            </View>
          )}
        </View>

        {/* Item Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>

          <View style={styles.tagsRow}>
            <Tag type={item.veg ? 'veg' : 'nveg'} style={{ marginRight: 8 }} />
            {item.pop && <Tag type="hot" style={{ marginRight: 8 }} />}
            {item.combo && <Tag type="combo" />}
          </View>

          <Text style={styles.desc}>{item.desc}</Text>

          <View style={styles.metaRow}>
            <SpiceDots level={item.spice} />
            <Text style={styles.cal}>{item.cal} kcal</Text>
            {item.savings > 0 && (
              <Text style={styles.save}>· Save ₹{item.savings}</Text>
            )}
          </View>
        </View>

        {/* Add-ons Section */}
        {item.addons && item.addons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add-ons</Text>
            <Text style={styles.sectionSub}>Enhance your order</Text>
            
            {item.addons.map((addon, index) => {
              const isSelected = selectedAddons.find(a => a.n === addon.n);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleAddon(addon)}
                  style={[
                    styles.addonCard,
                    isSelected && styles.addonCardSelected,
                  ]}
                  activeOpacity={0.8}
                >
                  <View style={styles.addonLeft}>
                    <View style={[
                      styles.addonRadio,
                      isSelected && styles.addonRadioSelected,
                    ]}>
                      {isSelected && <View style={styles.addonRadioDot} />}
                    </View>
                    <Text style={styles.addonName}>{addon.n}</Text>
                  </View>
                  <Text style={styles.addonPrice}>+₹{addon.p}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Quantity Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity 
              onPress={decrementQty}
              style={[styles.qtyBtn, styles.qtyBtnMinus]}
              disabled={quantity <= 1}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNum}>{quantity}</Text>
            <TouchableOpacity 
              onPress={incrementQty}
              style={[styles.qtyBtn, styles.qtyBtnPlus]}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Summary */}
        {selectedAddons.length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Selection</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryItem}>{item.name} × {quantity}</Text>
              <Text style={styles.summaryPrice}>₹{item.price * quantity}</Text>
            </View>
            {selectedAddons.map((addon, idx) => (
              <View key={idx} style={styles.summaryRow}>
                <Text style={styles.summaryAddon}>+ {addon.n}</Text>
                <Text style={styles.summaryPrice}>₹{addon.p * quantity}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotal}>Item Total</Text>
              <Text style={styles.summaryTotalPrice}>₹{itemTotal}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Footer */}
      <Animated.View style={[
        styles.stickyFoot,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.footRow}>
          <View>
            <Text style={styles.footLabel}>Total Amount</Text>
            <Text style={styles.footPrice}>₹{itemTotal}</Text>
          </View>
          <TouchableOpacity onPress={handleAddToCart} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.spice, '#FF8C42']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.addBtn}
            >
              <Text style={styles.addBtnText}>
                {isInCart ? 'Update Cart' : 'Add to Cart'}
              </Text>
              <Text style={styles.addBtnIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 52,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },

  // Image
  imageCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageWrap: {
    width: 140,
    height: 140,
    borderRadius: 24,
    backgroundColor: '#FFD8B8',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  emoji: {
    fontSize: 72,
  },
  specialBadge: {
    position: 'absolute',
    bottom: 20,
    right: '30%',
  },

  // Info
  infoSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
    flex: 1,
    marginRight: 12,
  },
  price: {
    fontSize: 22,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  desc: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cal: {
    fontSize: 12,
    color: Colors.muted,
    marginLeft: 10,
  },
  save: {
    fontSize: 12,
    color: Colors.save || '#6fcf7a',
    marginLeft: 10,
    fontFamily: Fonts.bodySemi,
  },

  // Section
  section: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 12,
  },

  // Add-ons
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    padding: 14,
    marginBottom: 8,
  },
  addonCardSelected: {
    borderColor: Colors.spice,
    backgroundColor: 'rgba(255,76,41,0.08)',
  },
  addonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addonRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addonRadioSelected: {
    borderColor: Colors.spice,
    backgroundColor: Colors.spice,
  },
  addonRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  addonName: {
    fontSize: 14,
    fontFamily: Fonts.bodySemi,
    color: Colors.text,
  },
  addonPrice: {
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
    color: Colors.gold,
  },

  // Quantity
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnMinus: {
    backgroundColor: '#22223a',
  },
  qtyBtnPlus: {
    backgroundColor: Colors.spice,
  },
  qtyBtnText: {
    fontSize: 20,
    fontFamily: Fonts.bodyBold,
    color: '#fff',
  },
  qtyNum: {
    fontSize: 18,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
    minWidth: 30,
    textAlign: 'center',
  },

  // Summary
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    marginHorizontal: Spacing.lg,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItem: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: Fonts.bodySemi,
  },
  summaryAddon: {
    fontSize: 13,
    color: Colors.muted,
  },
  summaryPrice: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: Fonts.bodySemi,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 10,
  },
  summaryTotal: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  summaryTotalPrice: {
    fontSize: 18,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },

  // Sticky Footer
  stickyFoot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    padding: 16,
    paddingBottom: 28,
  },
  footRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footLabel: {
    fontSize: 11,
    color: Colors.muted,
    marginBottom: 2,
  },
  footPrice: {
    fontSize: 24,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },
  addBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },
  addBtnIcon: {
    color: '#fff',
    fontSize: 16,
  },
});