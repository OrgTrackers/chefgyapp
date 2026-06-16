// ─────────────────────────────────────────────────────────────────────────────
// UserApp / components / index.js
//
// All reusable UI primitives for the User App.
// Palette mirrors the Vendor App's brand (#F65D34 primary, #22B14C accent).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image,
  ScrollView, TextInput, Modal, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ── Colour tokens (aligned with Vendor App) ──────────────────────────────────
const C = {
  primary:    '#F65D34',
  accent:     '#22B14C',
  bg:         '#F9FAFB',
  card:       '#FFFFFF',
  border:     '#E5E7EB',
  text:       '#111827',
  sub:        '#6B7280',
  muted:      '#9CA3AF',
  tagBg:      '#FFF3EF',
  tagText:    '#F65D34',
  comboBg:    '#F0FDF4',
  comboText:  '#166534',
  comboBorder:'#DCFCE7',
  danger:     '#EF4444',
};

// ── Emoji helper (reused from Vendor App) ────────────────────────────────────
export function getGroupIcon(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('chicken')) return '🍗';
  if (n.includes('veg') || n.includes('curry')) return '🥬';
  if (n.includes('sambar') || n.includes('dal')) return '🍲';
  if (n.includes('curd') || n.includes('yogurt')) return '🥛';
  if (n.includes('rice')) return '🍚';
  if (n.includes('bread') || n.includes('roti') || n.includes('naan')) return '🫓';
  if (n.includes('sweet') || n.includes('dessert')) return '🍮';
  if (n.includes('drink') || n.includes('beverage')) return '🥤';
  return '🍽️';
}

// ════════════════════════════════════════════════════════════════════════════
// VendorCard
// ════════════════════════════════════════════════════════════════════════════
/**
 * @param {{ vendor: import('../models').Vendor, onPress: Function }} props
 */
export function VendorCard({ vendor, onPress }) {
  return (
    <TouchableOpacity style={styles.vendorCard} onPress={onPress} activeOpacity={0.75}>
      {/* Logo / placeholder */}
      <View style={styles.vendorLogo}>
        {vendor.logoUrl ? (
          <Image source={{ uri: vendor.logoUrl }} style={{ width: 56, height: 56 }} resizeMode="cover" />
        ) : (
          <Text style={{ fontSize: 28 }}>{getGroupIcon(vendor.cuisineType)}</Text>
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1, marginLeft: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <View style={[
            styles.badge,
            { backgroundColor: vendor.isOpen ? '#DCFCE7' : '#FEE2E2' },
          ]}>
            <Text style={[
              styles.badgeText,
              { color: vendor.isOpen ? C.accent : C.danger },
            ]}>
              {vendor.isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>

        {vendor.cuisineType ? (
          <Text style={styles.vendorCuisine}>{vendor.cuisineType}</Text>
        ) : null}

        {vendor.description ? (
          <Text style={styles.vendorDesc} numberOfLines={2}>{vendor.description}</Text>
        ) : null}

        {vendor.rating != null && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <Icon name="star" size={14} color="#F59E0B" />
            <Text style={{ fontSize: 13, color: C.text, fontWeight: '600' }}>
              {vendor.rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <Icon name="chevron-right" size={22} color={C.muted} />
    </TouchableOpacity>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// QuantityControl  (reusable +/- stepper)
// ════════════════════════════════════════════════════════════════════════════
export function QuantityControl({ quantity, onAdd, onRemove, disabled }) {
  if (quantity === 0) {
    return (
      <TouchableOpacity
        style={[styles.addBtn, disabled && styles.addBtnDisabled]}
        onPress={onAdd}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.qtyRow}>
      <TouchableOpacity style={styles.qtyBtn} onPress={onRemove} activeOpacity={0.7}>
        <Icon name="remove" size={16} color={C.primary} />
      </TouchableOpacity>
      <Text style={styles.qtyNum}>{quantity}</Text>
      <TouchableOpacity style={styles.qtyBtn} onPress={onAdd} activeOpacity={0.7}>
        <Icon name="add" size={16} color={C.primary} />
      </TouchableOpacity>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ServingCard  – handles 'item', 'combo', and 'mixed' types
// ════════════════════════════════════════════════════════════════════════════
/**
 * @param {{
 *   serving:    import('../models').Serving,
 *   quantity:   number,
 *   onAdd:      Function,
 *   onRemove:   Function,
 *   onViewCombo: Function,   // opens ComboDetailSheet
 *   vendorOpen: boolean,
 * }} props
 */
export function ServingCard({ serving, quantity, onAdd, onRemove, onViewCombo, vendorOpen }) {
  const isCombo = serving.type === 'combo' || serving.type === 'mixed';

  return (
    <View style={styles.servingCard}>
      {/* Image */}
      <View style={styles.servingImage}>
        {serving.imageUrl ? (
          <Image source={{ uri: serving.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 32 }}>{isCombo ? '🍱' : getGroupIcon(serving.name)}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 12 }}>
        {/* Type badge */}
        <View style={[styles.badge, { backgroundColor: isCombo ? C.comboBg : C.tagBg, marginBottom: 6, alignSelf: 'flex-start' }]}>
          <Text style={[styles.badgeText, { color: isCombo ? C.comboText : C.tagText }]}>
            {isCombo ? '🍱 Combo' : '🍽️ Item'}
          </Text>
        </View>

        <Text style={styles.servingName}>{serving.name}</Text>

        {serving.description ? (
          <Text style={styles.servingDesc} numberOfLines={2}>{serving.description}</Text>
        ) : null}

        {/* Combo group summary */}
        {isCombo && serving.combo && (
          <TouchableOpacity onPress={onViewCombo} style={styles.comboPreview} activeOpacity={0.7}>
            <Icon name="view-list" size={14} color={C.accent} />
            <Text style={styles.comboPreviewText}>
              {serving.combo.groups.length} group{serving.combo.groups.length !== 1 ? 's' : ''} · Tap to customise
            </Text>
          </TouchableOpacity>
        )}

        {/* Price + quantity control */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={styles.price}>₹{serving.price}</Text>
          <QuantityControl
            quantity={quantity}
            onAdd={() => {
              if (isCombo && quantity === 0) {
                onViewCombo(); // force customisation before adding
              } else {
                onAdd();
              }
            }}
            onRemove={onRemove}
            disabled={!vendorOpen}
          />
        </View>
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ComboDetailSheet  – modal bottom-sheet for customising a combo
// ════════════════════════════════════════════════════════════════════════════
/**
 * @param {{
 *   visible: boolean,
 *   serving: import('../models').Serving | null,
 *   groupSelections: Record<string, import('../models').Dish[]>,
 *   optionalSelections: import('../models').Dish[],
 *   quantity: number,
 *   onGroupSelect: (groupId, dishes) => void,
 *   onToggleOptional: (dish) => void,
 *   onAdd: () => void,
 *   onRemove: () => void,
 *   onClose: () => void,
 * }} props
 */
export function ComboDetailSheet({
  visible, serving, groupSelections, optionalSelections,
  quantity, onGroupSelect, onToggleOptional, onAdd, onRemove, onClose,
}) {
  if (!serving?.combo) return null;
  const combo = serving.combo;

  function toggleDishInGroup(group, dish) {
    const current = groupSelections[group.groupId] ?? [];
    const alreadyIn = current.some((d) => d.id === dish.id);

    if (alreadyIn) {
      onGroupSelect(group.groupId, current.filter((d) => d.id !== dish.id));
    } else {
      if (current.length < group.selectCount) {
        onGroupSelect(group.groupId, [...current, dish]);
      } else if (group.selectCount === 1) {
        // Single-select: replace
        onGroupSelect(group.groupId, [dish]);
      }
      // If limit reached and multi-select, ignore (visual feedback via badge)
    }
  }

  function isGroupComplete(group) {
    return (groupSelections[group.groupId] ?? []).length >= group.selectCount;
  }

  const allGroupsComplete = combo.groups.every(isGroupComplete);

  // Auto-select groups with only one dish
  React.useEffect(() => {
    if (!visible) return;
    combo.groups.forEach((group) => {
      if (group.dishes.length === 1 && group.selectCount === 1) {
        const already = groupSelections[group.groupId] ?? [];
        if (already.length === 0) {
          onGroupSelect(group.groupId, [group.dishes[0]]);
        }
      }
    });
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.sheetOverlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sheetTitle}>{combo.comboName}</Text>
              {combo.comboDescription ? (
                <Text style={styles.sheetSubtitle}>{combo.comboDescription}</Text>
              ) : null}
            </View>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <Icon name="close" size={24} color={C.sub} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>

            {/* Groups */}
            {combo.groups.map((group) => {
              const chosen = groupSelections[group.groupId] ?? [];
              const complete = isGroupComplete(group);
              const isFixed = group.dishes.length === 1 && group.selectCount === 1;

              return (
                <View key={group.groupId} style={styles.groupBlock}>
                  {/* Group header */}
                  <View style={styles.groupHeaderRow}>
                    <Text style={styles.groupIcon}>{getGroupIcon(group.groupName)}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.groupName}>{group.groupName}</Text>
                      <Text style={styles.groupMeta}>
                        {isFixed
                          ? 'Auto-selected'
                          : `Choose ${group.selectCount} · ${chosen.length}/${group.selectCount} selected`}
                      </Text>
                    </View>
                    {complete && (
                      <View style={[styles.badge, { backgroundColor: C.comboBg }]}>
                        <Icon name="check-circle" size={14} color={C.accent} />
                        <Text style={[styles.badgeText, { color: C.comboText, marginLeft: 3 }]}>Done</Text>
                      </View>
                    )}
                  </View>

                  {/* Dish options */}
                  {group.dishes.map((dish) => {
                    const selected = chosen.some((d) => d.id === dish.id);
                    return (
                      <TouchableOpacity
                        key={dish.id}
                        style={[styles.dishRow, selected && styles.dishRowSelected]}
                        onPress={() => !isFixed && toggleDishInGroup(group, dish)}
                        activeOpacity={isFixed ? 1 : 0.7}
                      >
                        {/* Checkbox / radio */}
                        <View style={[
                          styles.checkbox,
                          group.selectCount === 1 ? styles.radio : null,
                          selected && styles.checkboxSelected,
                        ]}>
                          {selected && <Icon name="check" size={13} color="#FFF" />}
                        </View>

                        {/* Dish image */}
                        <View style={styles.dishThumb}>
                          {dish.imageUrl ? (
                            <Image source={{ uri: dish.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                          ) : (
                            <Icon name="restaurant" size={18} color={C.muted} />
                          )}
                        </View>

                        <Text style={[styles.dishName, selected && { fontWeight: '700', color: C.text }]}>
                          {dish.name}
                        </Text>

                        {isFixed && (
                          <View style={[styles.badge, { backgroundColor: '#FFF7ED' }]}>
                            <Text style={[styles.badgeText, { color: '#C2410C' }]}>Fixed</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}

            {/* Optional items */}
            {combo.optionalItems.length > 0 && (
              <View style={styles.groupBlock}>
                <View style={styles.groupHeaderRow}>
                  <Text style={styles.groupIcon}>➕</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.groupName}>Optional Add-ons</Text>
                    <Text style={styles.groupMeta}>Add extras to your combo</Text>
                  </View>
                </View>
                {combo.optionalItems.map((dish) => {
                  const selected = optionalSelections.some((d) => d.id === dish.id);
                  return (
                    <TouchableOpacity
                      key={dish.id}
                      style={[styles.dishRow, selected && styles.dishRowSelected]}
                      onPress={() => onToggleOptional(dish)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                        {selected && <Icon name="check" size={13} color="#FFF" />}
                      </View>
                      <View style={styles.dishThumb}>
                        {dish.imageUrl ? (
                          <Image source={{ uri: dish.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                        ) : (
                          <Icon name="restaurant" size={18} color={C.muted} />
                        )}
                      </View>
                      <Text style={[styles.dishName, selected && { fontWeight: '700' }]}>{dish.name}</Text>
                      {dish.price > 0 && (
                        <Text style={{ fontSize: 13, color: C.primary, fontWeight: '600' }}>+₹{dish.price}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>

          {/* Bottom action */}
          <View style={styles.sheetFooter}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: C.text }}>₹{combo.comboPrice}</Text>
              {!allGroupsComplete && (
                <Text style={{ fontSize: 12, color: C.danger, marginTop: 2 }}>
                  Complete all selections to add
                </Text>
              )}
            </View>
            <QuantityControl
              quantity={quantity}
              onAdd={() => { if (allGroupsComplete) onAdd(); }}
              onRemove={onRemove}
              disabled={!allGroupsComplete && quantity === 0}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CartBar  – sticky bottom bar showing cart total
// ════════════════════════════════════════════════════════════════════════════
export function CartBar({ count, total, onPress }) {
  if (count === 0) return null;
  return (
    <TouchableOpacity style={styles.cartBar} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{count}</Text>
      </View>
      <Text style={styles.cartBarLabel}>View Cart</Text>
      <Text style={styles.cartBarTotal}>₹{total}</Text>
    </TouchableOpacity>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// FilterTabs
// ════════════════════════════════════════════════════════════════════════════
export function FilterTabs({ active, onChange }) {
  const tabs = [
    { key: 'all',   label: 'All' },
    { key: 'item',  label: '🍽️ Items' },
    { key: 'combo', label: '🍱 Combos' },
  ];
  return (
    <View style={styles.filterRow}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.key}
          style={[styles.filterTab, active === t.key && styles.filterTabActive]}
          onPress={() => onChange(t.key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterTabText, active === t.key && styles.filterTabTextActive]}>
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// StyleSheet
// ════════════════════════════════════════════════════════════════════════════
const styles = StyleSheet.create({
  // Vendor card
  vendorCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.card, borderRadius: 14,
    padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: C.border,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  vendorLogo: {
    width: 56, height: 56, borderRadius: 12,
    backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  vendorName: { fontSize: 16, fontWeight: '700', color: C.text },
  vendorCuisine: { fontSize: 13, color: C.primary, fontWeight: '600', marginTop: 2 },
  vendorDesc:    { fontSize: 12, color: C.sub, marginTop: 4, lineHeight: 17 },

  // Serving card
  servingCard: {
    backgroundColor: C.card, borderRadius: 14,
    marginBottom: 12, borderWidth: 1, borderColor: C.border,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 5, shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  servingImage: {
    width: '100%', height: 140, backgroundColor: '#F3F4F6',
  },
  servingName: { fontSize: 15, fontWeight: '700', color: C.text, marginBottom: 4 },
  servingDesc: { fontSize: 13, color: C.sub, lineHeight: 18 },
  price: { fontSize: 17, fontWeight: '800', color: C.text },

  comboPreview: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    marginTop: 6, padding: 8, borderRadius: 8,
    backgroundColor: C.comboBg,
  },
  comboPreviewText: { fontSize: 12, color: C.comboText, fontWeight: '600' },

  // Badge
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700' },

  // Quantity control
  addBtn: {
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8,
    backgroundColor: C.primary,
  },
  addBtnDisabled: { backgroundColor: C.muted },
  addBtnText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 8, borderWidth: 1.5, borderColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: { fontSize: 15, fontWeight: '700', color: C.text, minWidth: 22, textAlign: 'center' },

  // Combo detail sheet
  sheetOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheetContainer: {
    backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: '90%', flex: 0,
  },
  sheetHeader: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 20, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  sheetTitle:    { fontSize: 18, fontWeight: '800', color: C.text },
  sheetSubtitle: { fontSize: 13, color: C.sub, marginTop: 4 },
  sheetFooter: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderTopWidth: 1, borderTopColor: C.border,
  },

  // Group block inside sheet
  groupBlock: {
    backgroundColor: '#F9FAFB', borderRadius: 12,
    padding: 14, marginBottom: 14,
    borderWidth: 1, borderColor: C.border,
  },
  groupHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  groupIcon: { fontSize: 22 },
  groupName: { fontSize: 14, fontWeight: '700', color: C.text },
  groupMeta: { fontSize: 12, color: C.sub, marginTop: 2 },

  // Dish row in sheet
  dishRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10,
    marginBottom: 4,
  },
  dishRowSelected: { backgroundColor: '#ECFDF5' },
  checkbox: {
    width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: C.border,
    backgroundColor: C.card, alignItems: 'center', justifyContent: 'center',
  },
  radio: { borderRadius: 11 },
  checkboxSelected: { backgroundColor: C.accent, borderColor: C.accent },
  dishThumb: {
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: '#F3F4F6', overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  dishName: { flex: 1, fontSize: 14, color: C.text },

  // Cart bar
  cartBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: C.primary,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  cartBadge: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  cartBadgeText: { fontSize: 13, fontWeight: '700', color: '#FFF' },
  cartBarLabel:  { flex: 1, fontSize: 16, fontWeight: '700', color: '#FFF' },
  cartBarTotal:  { fontSize: 16, fontWeight: '800', color: '#FFF' },

  // Filter tabs
  filterRow: {
    flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: C.card, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  filterTab: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterTabActive:     { backgroundColor: C.primary },
  filterTabText:       { fontSize: 13, fontWeight: '600', color: C.sub },
  filterTabTextActive: { color: '#FFF' },
});