// ─── DoughnutBoxScreen ────────────────────────────────────────────────────────
// Full-screen page for "Make Your Own Doughnut Box" selection
// Light-themed UI matching Swiggy/Krispy Kreme (white/green/orange)

import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, SafeAreaView,
} from 'react-native';
import { LightColors, Fonts, Spacing } from '../../newscreens/Cloud/index';
import { DOUGHNUT_BOX_CONFIG } from '../../newscreens/Cloud/Menudata';
import { useCart } from '../../newscreens/Cloud/Usecart';
import { BackButton } from '../../newscreens/Cloud/Shared';

// ==================== SUB-COMPONENTS ====================

const RadioButton = ({ selected, disabled }) => (
  <View style={[s.radioOuter, disabled && s.radioDisabled]}>
    {selected && <View style={[s.radioInner, disabled && s.radioInnerDisabled]} />}
  </View>
);

const Checkbox = ({ selected }) => (
  <View style={[s.checkbox, selected && s.checkboxSelected]}>
    {selected && <Text style={s.checkmark}>✓</Text>}
  </View>
);

const VegIcon = ({ disabled }) => (
  <View style={[s.vegCircle, disabled && s.vegCircleDisabled]}>
    <View style={[s.vegDot, disabled && s.vegDotDisabled]} />
  </View>
);

function getOrdinal(n) {
  const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th'];
  return ordinals[n] || `${n}th`;
}

// ─── Doughnut Selection Section ─────────────────────────────────────────────
const DoughnutSection = ({
  sectionNumber,
  options,
  selectedId,
  onSelect,
  expanded,
  onToggleExpand,
}) => {
  const displayOptions = expanded ? options : options.slice(0, 5);
  const hasMore = options.length > 5 && !expanded;

  return (
    <View style={s.sectionContainer}>
      <Text style={s.sectionTitle}>Choose your {getOrdinal(sectionNumber)} Doughnut</Text>
      <Text style={s.sectionSubtitle}>Select any 1</Text>

      <View style={s.optionsCard}>
        {displayOptions.map((item, index) => {
          const isSelected = selectedId === item.id;
          const isDisabled = item.available === false;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                s.optionRow,
                index !== displayOptions.length - 1 && s.optionBorder,
                isDisabled && s.optionDisabled,
              ]}
              onPress={() => !isDisabled && onSelect(item.id)}
              activeOpacity={isDisabled ? 1 : 0.6}
            >
              <VegIcon disabled={isDisabled} />

              <View style={s.optionTextContainer}>
                <Text style={[s.optionText, isDisabled && s.textDisabled]}>
                  {item.emoji} {item.name}
                </Text>
                {item.unavailableText && (
                  <Text style={s.unavailableText}>{item.unavailableText}</Text>
                )}
              </View>

              <RadioButton selected={isSelected} disabled={isDisabled} />
            </TouchableOpacity>
          );
        })}

        {hasMore && (
          <TouchableOpacity style={s.moreButton} onPress={onToggleExpand}>
            <Text style={s.moreText}>+{options.length - 5} more</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ─── Dip Selection Section ──────────────────────────────────────────────────
const DipSection = ({ selectedDips, onToggleDip }) => {
  const { dips } = DOUGHNUT_BOX_CONFIG;

  return (
    <View style={s.sectionContainer}>
      <Text style={s.sectionTitle}>Choose your Dips</Text>
      <Text style={s.sectionSubtitle}>Select upto 3</Text>

      <View style={s.optionsCard}>
        {dips.map((dip, index) => {
          const isSelected = selectedDips.includes(dip.id);

          return (
            <TouchableOpacity
              key={dip.id}
              style={[
                s.optionRow,
                index !== dips.length - 1 && s.optionBorder,
              ]}
              onPress={() => onToggleDip(dip.id)}
              activeOpacity={0.6}
            >
              <VegIcon />
              <Text style={s.optionText}>{dip.name}</Text>

              <View style={s.dipPriceContainer}>
                <Text style={s.dipPrice}>+ ₹{dip.price}</Text>
                <Checkbox selected={isSelected} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ==================== MAIN SCREEN ====================

export default function DoughnutBoxScreen({ navigation, route }) {
  const { item } = route?.params || {};
  const { addItem } = useCart();

  const [selections, setSelections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedDips, setSelectedDips] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleSelectDoughnut = useCallback((sectionNum, itemId) => {
    setSelections(prev => ({ ...prev, [sectionNum]: itemId }));
  }, []);

  const handleToggleExpand = useCallback((sectionNum) => {
    setExpandedSections(prev => ({ ...prev, [sectionNum]: !prev[sectionNum] }));
  }, []);

  const handleToggleDip = useCallback((dipId) => {
    setSelectedDips(prev => {
      if (prev.includes(dipId)) return prev.filter(id => id !== dipId);
      if (prev.length >= 3) return prev;
      return [...prev, dipId];
    });
  }, []);

  const handleQuantityChange = useCallback((delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  }, []);

  // ─── Price Calculation ────────────────────────────────────────────────────────
  const { basePrice, dipPrice, boxSize } = DOUGHNUT_BOX_CONFIG;

  const dipsTotal = useMemo(() => {
    return selectedDips.reduce((sum, dipId) => {
      const dip = DOUGHNUT_BOX_CONFIG.dips.find(d => d.id === dipId);
      return sum + (dip ? dip.price : 0);
    }, 0);
  }, [selectedDips]);

  const totalPrice = (basePrice + dipsTotal) * quantity;
  const selectedCount = Object.keys(selections).length;
  const allSelected = selectedCount === boxSize;

  // ─── Add to Cart ────────────────────────────────────────────────────────────
  const handleAddToCart = useCallback(() => {
    if (!allSelected) return;

    // Build selected doughnut names for cart display
    const selectedDoughnuts = {};
    Object.entries(selections).forEach(([sectionNum, choiceId]) => {
      const section = DOUGHNUT_BOX_CONFIG.sections.find(s => s.step === parseInt(sectionNum));
      const choice = section?.choices.find(c => c.id === choiceId);
      if (choice) selectedDoughnuts[sectionNum] = choice;
    });

    const cartItem = {
      ...item,
      qty: quantity,
      selectedDoughnuts,
      selectedDips: selectedDips.map(dipId => 
        DOUGHNUT_BOX_CONFIG.dips.find(d => d.id === dipId)
      ).filter(Boolean),
      dipTotal: dipsTotal,
      finalPrice: totalPrice,
      isCustomBox: true,
      name: `${item?.name || 'Doughnut Box'} (Custom)`,
    };

    addItem(cartItem, [], quantity);
    navigation.navigate('CartScreen');
  }, [allSelected, selections, selectedDips, quantity, item, dipsTotal, totalPrice, addItem, navigation]);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor={LightColors.surface} />

      {/* Header */}
      <View style={s.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View style={s.headerInfo}>
          <Text style={s.headerTitle} numberOfLines={1}>
            {item?.name || 'Doughnut Box'}
          </Text>
          <Text style={s.headerSub}>Choose {boxSize} doughnuts + dips</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Selection Progress */}
      <View style={s.progressContainer}>
        <View style={s.progressHeader}>
          <Text style={s.progressText}>
            {selectedCount}/{boxSize} Doughnuts Selected
          </Text>
          <Text style={s.progressPrice}>₹{totalPrice}</Text>
        </View>
        <View style={s.progressBar}>
          <View style={[s.progressFill, { width: `${(selectedCount / boxSize) * 100}%` }]} />
        </View>
      </View>

      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Banner */}
        <View style={s.banner}>
          <View style={s.bannerImage}>
            <Text style={s.bannerEmoji}>🍩</Text>
          </View>
          <View style={s.bannerInfo}>
            <Text style={s.bannerTitle}>
              {item?.name || 'Premium Mix Doughnuts'}
            </Text>
            <Text style={s.bannerDesc}>
              {item?.desc || 'Choose any 6 premium doughnuts from our selection'}
            </Text>
            <View style={s.bannerMeta}>
              <Text style={s.bannerPrice}>₹{basePrice}</Text>
              <Text style={s.bannerCal}>• {item?.cal || 1800} kcal</Text>
            </View>
          </View>
        </View>

        {/* Doughnut Sections */}
        {DOUGHNUT_BOX_CONFIG.sections.map((section) => (
          <DoughnutSection
            key={section.step}
            sectionNumber={section.step}
            options={section.choices}
            selectedId={selections[section.step]}
            onSelect={(id) => handleSelectDoughnut(section.step, id)}
            expanded={expandedSections[section.step]}
            onToggleExpand={() => handleToggleExpand(section.step)}
          />
        ))}

        {/* Dips Section */}
        <DipSection selectedDips={selectedDips} onToggleDip={handleToggleDip} />

        {/* Bottom Spacer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={s.bottomBar}>
        <View style={s.quantityContainer}>
          <TouchableOpacity
            style={s.quantityButton}
            onPress={() => handleQuantityChange(-1)}
          >
            <Text style={s.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={s.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={s.quantityButton}
            onPress={() => handleQuantityChange(1)}
          >
            <Text style={s.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[s.addButton, !allSelected && s.addButtonDisabled]}
          onPress={handleAddToCart}
          activeOpacity={allSelected ? 0.8 : 1}
        >
          <Text style={s.addButtonText}>
            {allSelected 
              ? `Add Item | ₹${totalPrice}` 
              : `Select ${boxSize - selectedCount} more`
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==================== STYLES ====================

const s = StyleSheet.create({
  // ── Container ──
  container: {
    flex: 1,
    backgroundColor: LightColors.bg,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 52,
    paddingBottom: Spacing.md,
    backgroundColor: LightColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: LightColors.divider,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: LightColors.text,
  },
  headerSub: {
    fontSize: 13,
    color: LightColors.textSecondary,
    marginTop: 2,
  },

  // ── Progress ──
  progressContainer: {
    backgroundColor: LightColors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: LightColors.divider,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: LightColors.textSecondary,
    fontFamily: Fonts.bodyMed,
  },
  progressPrice: {
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
    color: LightColors.primary,
  },
  progressBar: {
    height: 4,
    backgroundColor: LightColors.divider,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: LightColors.primary,
    borderRadius: 2,
  },

  // ── Scroll ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },

  // ── Banner ──
  banner: {
    flexDirection: 'row',
    backgroundColor: LightColors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bannerEmoji: {
    fontSize: 40,
  },
  bannerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
    color: LightColors.text,
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 13,
    color: LightColors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  bannerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerPrice: {
    fontSize: 18,
    fontFamily: Fonts.bodyXB,
    color: LightColors.primary,
  },
  bannerCal: {
    fontSize: 12,
    color: LightColors.textMuted,
    marginLeft: 8,
  },

  // ── Section ──
  sectionContainer: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: LightColors.text,
    marginBottom: 4,
    paddingHorizontal: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: LightColors.textMuted,
    marginBottom: 10,
    paddingHorizontal: Spacing.xs,
  },

  // ── Options Card ──
  optionsCard: {
    backgroundColor: LightColors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: LightColors.divider,
  },
  optionDisabled: {
    opacity: 0.5,
  },

  // ── Veg Icon ──
  vegCircle: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: LightColors.veg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vegCircleDisabled: {
    borderColor: '#ccc',
  },
  vegDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: LightColors.veg,
  },
  vegDotDisabled: {
    backgroundColor: '#ccc',
  },

  // ── Option Text ──
  optionTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  optionText: {
    fontSize: 15,
    fontFamily: Fonts.bodySemi,
    color: LightColors.text,
    lineHeight: 22,
  },
  textDisabled: {
    color: LightColors.textDisabled,
  },
  unavailableText: {
    fontSize: 13,
    color: LightColors.unavailable,
    marginTop: 2,
  },

  // ── Radio ──
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDisabled: {
    borderColor: '#ddd',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LightColors.accent,
  },
  radioInnerDisabled: {
    backgroundColor: '#ccc',
  },

  // ── More Button ──
  moreButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: LightColors.divider,
  },
  moreText: {
    fontSize: 14,
    fontFamily: Fonts.bodySemi,
    color: LightColors.textSecondary,
  },

  // ── Dip ──
  dipPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dipPrice: {
    fontSize: 14,
    color: LightColors.textSecondary,
    marginRight: 10,
    fontFamily: Fonts.bodyMed,
  },

  // ── Checkbox ──
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: LightColors.primary,
    borderColor: LightColors.primary,
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.bodyBold,
  },

  // ── Bottom Bar ──
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    backgroundColor: LightColors.surface,
    borderTopWidth: 1,
    borderTopColor: LightColors.divider,
    paddingBottom: 28,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LightColors.divider,
    borderRadius: 10,
    marginRight: 12,
    height: 44,
  },
  quantityButton: {
    width: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 22,
    color: LightColors.primary,
    fontFamily: Fonts.bodyBold,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
    color: LightColors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: LightColors.primary,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: LightColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
  },
});