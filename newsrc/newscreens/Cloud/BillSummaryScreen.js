// ─── BillSummaryScreen ────────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing } from '../../newscreens/Cloud/index';
import { BackButton } from '../../newscreens/Cloud/Shared';

const TIP_OPTIONS = [
  { value: 0, label: 'No tip' },
  { value: 10, label: '₹10' },
  { value: 20, label: '₹20' },
  { value: 30, label: '₹30' },
];

export default function BillSummaryScreen({ navigation, route }) {
  const { calculations, cartItems, isDelivery, note } = route?.params || {};
  const [tip, setTip] = useState(0);

  const finalTotal = calculations.total + tip;

  const goToPayment = useCallback(() => {
    navigation.navigate('PaymentScreen', {
      amount: finalTotal,
      savedAmount: calculations.saved,
    });
  }, [finalTotal, calculations.saved, navigation]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.headerTitle}>Bill Summary</Text>
          <Text style={styles.headerSub}>Review your order</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Order Steps */}
        <View style={styles.stepsSection}>
          <View style={styles.step}>
            <View style={styles.stepIconDone}>
              <Text style={styles.stepIconTextDone}>✓</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Cart confirmed</Text>
              <Text style={styles.stepSub}>Items added</Text>
            </View>
          </View>
          
          <View style={styles.stepLast}>
            <View style={styles.stepIconActive}>
              <Text style={styles.stepIconTextActive}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitleActive}>Bill & Payment</Text>
              <Text style={styles.stepSub}>Review & pay</Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.card}>
            {cartItems.map((item, index) => {
              const addonTotal = (item.selectedAddons || []).reduce((a, add) => a + add.p, 0);
              const itemTotal = (item.price + addonTotal) * item.qty;
              
              return (
                <View 
                  key={item.id} 
                  style={[
                    styles.billItem,
                    index > 0 && styles.billItemBorder,
                  ]}
                >
                  <View style={styles.billItemLeft}>
                    <Text style={styles.billItemEmoji}>{item.emoji}</Text>
                    <View>
                      <Text style={styles.billItemName}>{item.name}</Text>
                      {item.selectedAddons?.length > 0 && (
                        <Text style={styles.billItemAddon}>
                          + {(item.selectedAddons || []).map(a => a.n).join(', ')}
                        </Text>
                      )}
                      <Text style={styles.billItemQty}>Qty: {item.qty}</Text>
                    </View>
                  </View>
                  <Text style={styles.billItemPrice}>₹{itemTotal}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Delivery Address */}
        {isDelivery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deliver to</Text>
            <View style={[styles.card, styles.addressCard]}>
              <Text style={styles.addressIcon}>📍</Text>
              <View style={styles.addressBody}>
                <Text style={styles.addressTitle}>Home</Text>
                <Text style={styles.addressText}>
                  42, Jubilee Hills Road No. 36{'\n'}
                  Hyderabad, Telangana 500033
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Bill Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <View style={styles.card}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{calculations.subtotal}</Text>
            </View>
            
            {calculations.promoDiscount > 0 && (
              <View style={styles.billRow}>
                <Text style={styles.billLabelGreen}>Promo (RASA20)</Text>
                <Text style={styles.billValueGreen}>−₹{calculations.promoDiscount}</Text>
              </View>
            )}
            
            {calculations.comboSavings > 0 && (
              <View style={styles.billRow}>
                <Text style={styles.billLabelGreen}>Combo Savings</Text>
                <Text style={styles.billValueGreen}>−₹{calculations.comboSavings}</Text>
              </View>
            )}
            
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={calculations.deliveryFee === 0 ? styles.billValueGreen : styles.billValue}>
                {calculations.deliveryFee === 0 ? 'FREE' : `₹${calculations.deliveryFee}`}
              </Text>
            </View>
            
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>GST (5%)</Text>
              <Text style={styles.billValue}>₹{calculations.gst}</Text>
            </View>
            
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Fee</Text>
              <Text style={styles.billValue}>₹5</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>To Pay</Text>
              <Text style={styles.totalValue}>₹{calculations.total}</Text>
            </View>
            
            {calculations.saved > 0 && (
              <Text style={styles.savedText}>
                You saved ₹{calculations.saved} on this order!
              </Text>
            )}
          </View>
        </View>

        {/* Tip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tip your delivery partner</Text>
          <View style={styles.tipRow}>
            {TIP_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setTip(opt.value)}
                style={[
                  styles.tipPill,
                  tip === opt.value && styles.tipPillActive,
                ]}
              >
                <Text style={[
                  styles.tipText,
                  tip === opt.value && styles.tipTextActive,
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFoot}>
        <TouchableOpacity onPress={goToPayment} activeOpacity={0.85}>
          <LinearGradient
            colors={[Colors.spice, '#FF8C42']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.payBtn}
          >
            <Text style={styles.payBtnText}>Choose Payment Method</Text>
            <Text style={styles.payBtnAmount}>₹{finalTotal}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    padding: Spacing.lg,
    paddingTop: 52,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },

  // Steps
  stepsSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 14,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIconDone: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(76,175,80,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconTextDone: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: '#6fcf7a',
  },
  stepLine: {
    position: 'absolute',
    left: 13,
    top: 28,
    width: 2,
    height: 28,
    backgroundColor: 'rgba(76,175,80,0.3)',
  },
  stepIconActive: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.spice,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconTextActive: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: '#fff',
  },
  stepContent: {
    marginLeft: 12,
    marginBottom: 28,
  },
  stepTitle: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  stepSub: {
    fontSize: 11,
    color: Colors.muted,
  },
  stepTitleActive: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.spice,
  },

  // Section
  section: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 14,
  },

  // Bill Items
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  billItemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  billItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  billItemEmoji: {
    fontSize: 22,
  },
  billItemName: {
    fontSize: 13,
    fontFamily: Fonts.bodySemi,
    color: Colors.text,
  },
  billItemAddon: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  billItemQty: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  billItemPrice: {
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
    color: Colors.gold,
  },

  // Address
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  addressIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  addressBody: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  addressText: {
    fontSize: 11,
    color: Colors.muted,
    lineHeight: 18,
    marginTop: 4,
  },
  changeText: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.spice,
  },

  // Bill Rows
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  billLabel: {
    fontSize: 13,
    color: Colors.muted,
  },
  billValue: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: Fonts.bodySemi,
  },
  billLabelGreen: {
    fontSize: 13,
    color: '#6fcf7a',
  },
  billValueGreen: {
    fontSize: 13,
    color: '#6fcf7a',
    fontFamily: Fonts.bodyBold,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  totalValue: {
    fontSize: 22,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },
  savedText: {
    textAlign: 'right',
    fontSize: 11,
    color: '#6fcf7a',
    marginTop: 4,
  },

  // Tip
  tipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  tipPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'transparent',
  },
  tipPillActive: {
    borderColor: Colors.spice,
    backgroundColor: 'rgba(255,76,41,0.1)',
  },
  tipText: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: Colors.muted,
  },
  tipTextActive: {
    color: Colors.spice,
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
    padding: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  payBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },
  payBtnAmount: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.bodyXB,
  },
});