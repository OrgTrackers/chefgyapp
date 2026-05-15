// ─── Shared UI Components ─────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Fonts, Spacing, Radius, Shadow } from '../../newscreens/Cloud/index';


// ─── Badge / Tag ──────────────────────────────────────────────────────────────
export function Tag({ type, label, style }) {
  const styles = TAG_STYLES[type] || TAG_STYLES.default;
  return (
    <View style={[tagBase.wrap, styles.wrap, style]}>
      <Text style={[tagBase.text, styles.text]}>{label || TAG_LABELS[type]}</Text>
    </View>
  );
}
const TAG_LABELS = {
  veg: 'VEG', nveg: 'NON-VEG', hot: '🔥 POPULAR',
  combo: 'COMBO', special: "CHEF'S", new: 'NEW',
};
const TAG_STYLES = {
  veg:    { wrap: { backgroundColor: Colors.vegBg,   borderColor: Colors.vegBorder },  text: { color: Colors.vegText }  },
  nveg:   { wrap: { backgroundColor: Colors.nvegBg,  borderColor: Colors.nvegBorder }, text: { color: Colors.nvegText } },
  hot:    { wrap: { backgroundColor: Colors.hotBg,   borderColor: Colors.hotBorder },  text: { color: Colors.hotText }  },
  combo:  { wrap: { backgroundColor: Colors.comboBg, borderColor: Colors.comboBorder}, text: { color: Colors.comboText }},
  special:{ wrap: { backgroundColor: 'rgba(138,43,226,0.25)', borderColor: 'rgba(138,43,226,0.3)' }, text: { color: '#C084FC' } },
};
const tagBase = StyleSheet.create({
  wrap: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: Radius.sm, borderWidth: 1, alignSelf: 'flex-start' },
  text: { fontSize: 10, fontFamily: Fonts.bodyBold, letterSpacing: 0.4 },
});

// ─── Spice Level Dots ─────────────────────────────────────────────────────────
export function SpiceDots({ level, max = 3, size = 6 }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: max }, (_, i) => (
        <View key={i} style={{
          width: size, height: size, borderRadius: size / 2,
          backgroundColor: i < level ? Colors.spice : 'rgba(255,255,255,0.15)',
          marginRight: i < max - 1 ? 3 : 0,
        }} />
      ))}
    </View>
  );
}

// ─── Quantity Controller ──────────────────────────────────────────────────────
export function QtyControl({ qty, onDecrement, onIncrement, size = 'md' }) {
  const s = size === 'sm' ? 26 : 32;
  const fs = size === 'sm' ? 14 : 16;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={onDecrement}
        style={[qtyStyles.btn, { width: s, height: s, backgroundColor: Colors.card2, borderRadius: Radius.sm, marginRight: Spacing.sm }]}
        activeOpacity={0.7}
      >
        <Text style={[qtyStyles.btnText, { fontSize: fs }]}>−</Text>
      </TouchableOpacity>

      <Text style={[qtyStyles.qty, { fontSize: fs + 2 }]}>{qty}</Text>

      <LinearGradient
        colors={[Colors.spice, '#FF8C42']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[qtyStyles.btn, { width: s, height: s, borderRadius: Radius.sm, marginLeft: Spacing.sm }]}
      >
        <TouchableOpacity onPress={onIncrement} style={qtyStyles.btnInner} activeOpacity={0.7}>
          <Text style={[qtyStyles.btnText, { fontSize: fs }]}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
const qtyStyles = StyleSheet.create({
  btn:     { alignItems: 'center', justifyContent: 'center' },
  btnInner:{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: Colors.text, fontFamily: Fonts.bodyBold },
  qty:     { color: Colors.gold, fontFamily: Fonts.bodyXB, minWidth: 24, textAlign: 'center' },
});

// ─── Primary CTA Button ───────────────────────────────────────────────────────
export function CTAButton({ label, sublabel, price, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={disabled ? undefined : onPress} activeOpacity={disabled ? 1 : 0.85}>
      <LinearGradient
        colors={disabled ? ['#3a3a4a', '#3a3a4a'] : [Colors.spice, '#FF8C42']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={ctaStyles.wrap}
      >
        <View style={ctaStyles.left}>
          <Text style={ctaStyles.label}>{label}</Text>
          {sublabel ? <Text style={ctaStyles.sub}>{sublabel}</Text> : null}
        </View>
        {price != null && <Text style={ctaStyles.price}>₹{price}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}
const ctaStyles = StyleSheet.create({
  wrap:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 18, paddingHorizontal: Spacing.xl, paddingVertical: 14 },
  left:  { flex: 1 },
  label: { fontSize: 15, fontFamily: Fonts.bodyBold, color: '#fff', letterSpacing: 0.3 },
  sub:   { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: Fonts.body, marginTop: 2 },
  price: { fontSize: 20, fontFamily: Fonts.bodyXB, color: '#fff' },
});

// ─── Back Button ──────────────────────────────────────────────────────────────
export function BackButton({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[backStyles.btn, style]} activeOpacity={0.7}>
      <Text style={backStyles.icon}>←</Text>
    </TouchableOpacity>
  );
}
const backStyles = StyleSheet.create({
  btn: {
    width: 38, height: 38, borderRadius: Radius.md,
    backgroundColor: Colors.card,
    borderWidth: 1, borderColor: Colors.cardBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 16, color: Colors.text },
});

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <View style={shStyles.row}>
      <Text style={shStyles.title}>{title}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onAction}>
          <Text style={shStyles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const shStyles = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  title:  { fontSize: 15, fontFamily: Fonts.bodyBold, color: Colors.text },
  action: { fontSize: 12, fontFamily: Fonts.bodySemi, color: Colors.gold },
});

// ─── Offer Banner ─────────────────────────────────────────────────────────────
export function OfferBanner({ icon, text, badgeText }) {
  return (
    <View style={offerStyles.wrap}>
      <Text style={offerStyles.icon}>{icon}</Text>
      <Text style={offerStyles.text}>{text}</Text>
      {badgeText && (
        <View style={offerStyles.badge}>
          <Text style={offerStyles.badgeText}>{badgeText}</Text>
        </View>
      )}
    </View>
  );
}
const offerStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,76,41,0.12)',
    borderWidth: 1, borderColor: 'rgba(255,140,60,0.2)',
    borderRadius: 14, padding: Spacing.md,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
  },
  icon:      { fontSize: 20 },
  text:      { flex: 1, fontSize: 12, fontFamily: Fonts.bodyMed, color: Colors.cream },
  badge:     { backgroundColor: Colors.spice, borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 10, fontFamily: Fonts.bodyXB, color: '#fff' },
});

// ─── Add Button (small round +) ───────────────────────────────────────────────
export function AddButton({ onPress }) {
  return (
    <LinearGradient
      colors={[Colors.spice, '#FF8C42']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={addBtnStyles.wrap}
    >
      <TouchableOpacity onPress={onPress} style={addBtnStyles.inner} activeOpacity={0.7}>
        <Text style={addBtnStyles.icon}>+</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const addBtnStyles = StyleSheet.create({
  wrap:  { width: 34, height: 34, borderRadius: Radius.md, overflow: 'hidden' },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon:  { fontSize: 20, color: '#fff', fontFamily: Fonts.bodyBold },
});

// ─── Sticky CTA Container ─────────────────────────────────────────────────────
export function StickyFooter({ children }) {
  return (
    <View style={sfStyles.wrap}>
      {children}
    </View>
  );
}
const sfStyles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.dark,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
});