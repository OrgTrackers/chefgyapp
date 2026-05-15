// ─── PaymentScreen ────────────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
  Animated, ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Shadow } from '../../newscreens/Cloud/index';
import { BackButton } from '../../newscreens/Cloud/Shared';

const PAYMENT_METHODS = [
  {
    id: 'gpay',
    type: 'upi',
    title: 'Google Pay',
    subtitle: 'Linked: user@okicici',
    icon: 'G',
    isDefault: true,
  },
  {
    id: 'phonepe',
    type: 'upi',
    title: 'PhonePe',
    subtitle: 'Tap to add UPI ID',
    icon: 'P',
  },
  {
    id: 'upi',
    type: 'upi',
    title: 'Other UPI',
    subtitle: 'Enter UPI ID manually',
    icon: '↗',
  },
  {
    id: 'card',
    type: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
    icon: '💳',
  },
  {
    id: 'wallet',
    type: 'wallet',
    title: 'Rasa Wallet',
    subtitle: 'Balance: ₹150',
    icon: '👝',
  },
  {
    id: 'cod',
    type: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay when food arrives',
    icon: '💵',
  },
];

const TIP_OPTIONS = [
  { value: 0, label: 'No tip' },
  { value: 10, label: '₹10' },
  { value: 20, label: '₹20' },
  { value: 30, label: '₹30' },
];

export default function PaymentScreen({ navigation, route }) {
  const { amount, savedAmount = 0 } = route?.params || { amount: 0 };
  
  const [selectedMethod, setSelectedMethod] = useState('gpay');
  const [tip, setTip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const finalAmount = amount + tip;

  const handlePaymentSelect = useCallback((id) => {
    setSelectedMethod(id);
  }, []);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + ' / ' + cleaned.slice(2);
    }
    return cleaned;
  };

  const handlePlaceOrder = useCallback(() => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('OrderSuccessScreen', {
        orderId: 'RK' + Math.floor(2847 + Math.random() * 1000),
        amount: finalAmount,
        estimatedTime: '32 minutes',
      });
    }, 2200);
  }, [finalAmount, navigation]);

  const renderPaymentMethod = (method) => {
    const isSelected = selectedMethod === method.id;
    
    return (
      <TouchableOpacity
        key={method.id}
        onPress={() => handlePaymentSelect(method.id)}
        style={[
          payStyles.paymentOpt,
          isSelected && payStyles.paymentOptSelected,
        ]}
        activeOpacity={0.8}
      >
        <View style={[payStyles.radio, isSelected && payStyles.radioOn]}>
          {isSelected && <View style={payStyles.radioDot} />}
        </View>
        
        <View style={payStyles.methodIcon}>
          <Text style={payStyles.methodIconText}>{method.icon}</Text>
        </View>
        
        <View style={payStyles.methodInfo}>
          <Text style={payStyles.methodTitle}>{method.title}</Text>
          <Text style={payStyles.methodSubtitle}>{method.subtitle}</Text>
        </View>
        
        {method.isDefault && (
          <View style={payStyles.defaultBadge}>
            <Text style={payStyles.defaultText}>DEFAULT</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Processing overlay
  if (isProcessing) {
    return (
      <View style={payStyles.processingContainer}>
        <View style={payStyles.spinner} />
        <Text style={payStyles.processingTitle}>Processing Payment</Text>
        <Text style={payStyles.processingSub}>Please do not press back or close the app</Text>
      </View>
    );
  }

  return (
    <View style={payStyles.container}>
      {/* Header */}
      <View style={payStyles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View>
          <Text style={payStyles.headerTitle}>Payment</Text>
          <Text style={payStyles.headerSub}>Choose how to pay</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Amount Card */}
        <View style={payStyles.amountCard}>
          <LinearGradient
            colors={['rgba(255,76,41,0.15)', 'rgba(245,166,35,0.1)']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={payStyles.amountGradient}
          >
            <Text style={payStyles.amountLabel}>Amount to pay</Text>
            <Text style={payStyles.amountValue}>₹{finalAmount}</Text>
            {savedAmount > 0 && (
              <Text style={payStyles.savedText}>You saved ₹{savedAmount} on this order!</Text>
            )}
          </LinearGradient>
        </View>

        {/* UPI Section */}
        <View style={payStyles.section}>
          <Text style={payStyles.sectionTitle}>UPI</Text>
          {PAYMENT_METHODS.filter(m => m.type === 'upi').map(renderPaymentMethod)}
        </View>

        {/* Card Section */}
        <View style={payStyles.section}>
          <Text style={payStyles.sectionTitle}>Card</Text>
          {PAYMENT_METHODS.filter(m => m.type === 'card').map(renderPaymentMethod)}
          
          {/* Card Form */}
          {selectedMethod === 'card' && (
            <Animated.View style={payStyles.cardForm}>
              <TextInput
                style={payStyles.cardInput}
                placeholder="Card number"
                placeholderTextColor={Colors.muted}
                keyboardType="numeric"
                maxLength={19}
                value={cardForm.number}
                onChangeText={(t) => setCardForm(p => ({ ...p, number: formatCardNumber(t) }))}
              />
              <View style={payStyles.cardRow}>
                <TextInput
                  style={[payStyles.cardInput, { flex: 1 }]}
                  placeholder="MM / YY"
                  placeholderTextColor={Colors.muted}
                  keyboardType="numeric"
                  maxLength={7}
                  value={cardForm.expiry}
                  onChangeText={(t) => setCardForm(p => ({ ...p, expiry: formatExpiry(t) }))}
                />
                <TextInput
                  style={[payStyles.cardInput, { flex: 1 }]}
                  placeholder="CVV"
                  placeholderTextColor={Colors.muted}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  value={cardForm.cvv}
                  onChangeText={(t) => setCardForm(p => ({ ...p, cvv: t.replace(/\D/g, '') }))}
                />
              </View>
              <TextInput
                style={payStyles.cardInput}
                placeholder="Name on card"
                placeholderTextColor={Colors.muted}
                value={cardForm.name}
                onChangeText={(t) => setCardForm(p => ({ ...p, name: t }))}
              />
            </Animated.View>
          )}
        </View>

        {/* Other Section */}
        <View style={payStyles.section}>
          <Text style={payStyles.sectionTitle}>Other</Text>
          {PAYMENT_METHODS.filter(m => m.type === 'wallet' || m.type === 'cod').map(renderPaymentMethod)}
        </View>

        {/* Tip Section */}
        <View style={payStyles.section}>
          <Text style={payStyles.sectionTitle}>Tip your delivery partner</Text>
          <View style={payStyles.tipRow}>
            {TIP_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setTip(opt.value)}
                style={[
                  payStyles.tipPill,
                  tip === opt.value && payStyles.tipPillActive,
                ]}
              >
                <Text style={[
                  payStyles.tipText,
                  tip === opt.value && payStyles.tipTextActive,
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Note */}
        <View style={payStyles.securityRow}>
          <Text style={payStyles.securityIcon}>🔒</Text>
          <Text style={payStyles.securityText}>
            100% secure payments. Data encrypted with SSL.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={payStyles.stickyFoot}>
        <TouchableOpacity 
          onPress={handlePlaceOrder}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.spice, '#FF8C42']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnText}>Pay & Place Order</Text>
            <Text style={payStyles.payBtnAmount}>₹{finalAmount}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const payStyles = StyleSheet.create({
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
  
  // Amount Card
  amountCard: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 14,
  },
  amountGradient: {
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,76,41,0.2)',
  },
  amountLabel: {
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },
  savedText: {
    fontSize: 11,
    color: Colors.save || '#6fcf7a',
    marginTop: 4,
  },

  // Section
  section: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  // Payment Option
  paymentOpt: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptSelected: {
    borderColor: Colors.spice,
    backgroundColor: 'rgba(255,76,41,0.08)',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOn: {
    borderColor: Colors.spice,
    backgroundColor: Colors.spice,
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodIconText: {
    fontSize: 18,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  methodSubtitle: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  defaultText: {
    fontSize: 10,
    fontFamily: Fonts.bodyBold,
    color: '#6fcf7a',
  },

  // Card Form
  cardForm: {
    padding: 12,
    backgroundColor: '#22223a',
    borderRadius: 12,
    marginTop: -4,
    marginBottom: 10,
  },
  cardInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.text,
    fontFamily: Fonts.body,
    fontSize: 13,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
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

  // Security
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
  },
  securityIcon: {
    fontSize: 14,
  },
  securityText: {
    fontSize: 11,
    color: Colors.muted,
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

  // Processing
  processingContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  spinner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: Colors.spice,
    borderTopColor: 'transparent',
    marginBottom: 24,
  },
  processingTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
    marginBottom: 8,
  },
  processingSub: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
  },
});