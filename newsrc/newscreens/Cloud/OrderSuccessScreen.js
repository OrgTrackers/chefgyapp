// ─── OrderSuccessScreen ───────────────────────────────────────────────────────
import React, { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing } from '../../newscreens/Cloud/index';

export default function OrderSuccessScreen({ navigation, route }) {
  const { orderId, amount, estimatedTime } = route?.params || {};
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={successStyles.container}>
      <Animated.View style={[successStyles.content, { opacity: fadeAnim }]}>
        {/* Success Circle */}
        <View style={successStyles.successCircle}>
          <Text style={successStyles.checkmark}>✓</Text>
        </View>

        <Text style={successStyles.title}>Order Placed!</Text>
        <Text style={successStyles.subtitle}>
          Your order <Text style={successStyles.highlight}>#{orderId}</Text> has been confirmed.{'\n'}
          Estimated delivery in <Text style={successStyles.greenHighlight}>{estimatedTime}</Text>.
        </Text>

        {/* Live Tracker */}
        <View style={successStyles.trackerCard}>
          <Text style={successStyles.trackerTitle}>Live Order Status</Text>
          
          <View style={successStyles.step}>
            <View style={successStyles.stepIconDone}>
              <Text style={successStyles.stepIconText}>✓</Text>
            </View>
            <View style={successStyles.stepLine} />
            <View style={successStyles.stepContent}>
              <Text style={successStyles.stepTitle}>Order Confirmed</Text>
              <Text style={successStyles.stepSub}>Payment received · Just now</Text>
            </View>
          </View>

          <View style={successStyles.step}>
            <View style={successStyles.stepIconActive}>
              <Text style={successStyles.stepIconTextActive}>⏳</Text>
            </View>
            <View style={successStyles.stepLinePending} />
            <View style={successStyles.stepContent}>
              <Text style={successStyles.stepTitleActive}>Preparing your food</Text>
              <Text style={successStyles.stepSub}>Kitchen is working on your order</Text>
            </View>
          </View>

          <View style={successStyles.stepLast}>
            <View style={successStyles.stepIconPending}>
              <Text style={successStyles.stepIconTextPending}>→</Text>
            </View>
            <View style={successStyles.stepContent}>
              <Text style={successStyles.stepTitlePending}>Out for delivery</Text>
              <Text style={successStyles.stepSubPending}>Estimated soon</Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={successStyles.summaryChip}>
          <Text style={successStyles.summaryLabel}>Amount paid</Text>
          <Text style={successStyles.summaryAmount}>₹{amount}</Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('MenuScreen')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.spice, '#FF8C42']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={successStyles.btn}
          >
            <Text style={successStyles.btnText}>Order More Food</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const successStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(76,175,80,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(76,175,80,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 32,
    color: '#6fcf7a',
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bodyXB,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  highlight: {
    color: Colors.gold,
    fontFamily: Fonts.bodyBold,
  },
  greenHighlight: {
    color: '#6fcf7a',
    fontFamily: Fonts.bodyBold,
  },

  // Tracker
  trackerCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 14,
    marginBottom: 16,
  },
  trackerTitle: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.muted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepLast: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIconDone: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: 'rgba(76,175,80,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconText: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: '#6fcf7a',
  },
  stepLine: {
    position: 'absolute',
    left: 11,
    top: 24,
    width: 2,
    height: 24,
    backgroundColor: 'rgba(76,175,80,0.3)',
  },
  stepContent: {
    marginLeft: 10,
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  stepSub: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },
  stepIconActive: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Colors.spice,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconTextActive: {
    fontSize: 11,
    color: '#fff',
  },
  stepLinePending: {
    position: 'absolute',
    left: 11,
    top: 24,
    width: 2,
    height: 24,
    backgroundColor: 'rgba(255,76,41,0.2)',
  },
  stepTitleActive: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.spice,
  },
  stepIconPending: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#22223a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconTextPending: {
    fontSize: 11,
    color: Colors.muted,
  },
  stepTitlePending: {
    fontSize: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.muted,
  },
  stepSubPending: {
    fontSize: 11,
    color: '#5a5a70',
    marginTop: 2,
  },

  // Summary
  summaryChip: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.muted,
  },
  summaryAmount: {
    fontSize: 18,
    fontFamily: Fonts.bodyXB,
    color: Colors.gold,
  },

  // Button
  btn: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },
}); 