


import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Animated,
  Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LightColors, Fonts, Spacing, Radius, Shadow } from '../../newscreens/Cloud/index';
import { CATEGORIES, MENU_ITEMS } from '../../newscreens/Cloud/Menudata';
import { Tag, SpiceDots, QtyControl, AddButton, BackButton } from '../../newscreens/Cloud/Shared';
import { useCart } from './Usecart';

// Use LightColors (Swiggy-style) as the active palette
const C = LightColors;

const FILTERS = [
  { key: 'all',  label: 'All' },
  { key: 'veg',  label: '🌿 Veg' },
  { key: 'nveg', label: '🍗 Non-Veg' },
  { key: 'pop',  label: '⭐ Popular' },
];

// ─── Category Tab ─────────────────────────────────────────────────────────────
function CategoryTab({ category, active, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={style}>
      <View style={[
        tabStyles.wrap,
        active ? tabStyles.wrapActive : tabStyles.wrapInactive,
      ]}>
        <Text style={[
          tabStyles.label,
          active ? tabStyles.labelActive : tabStyles.labelInactive,
        ]}>
          {category.icon} {category.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const tabStyles = StyleSheet.create({
  wrap: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  wrapActive: {
    backgroundColor: '#FFF3EA',
    borderColor: C.accent,
  },
  wrapInactive: {
    backgroundColor: C.bg,
    borderColor: C.divider,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.bodySemi,
  },
  labelActive: {
    color: C.accent,
  },
  labelInactive: {
    color: C.textSecondary,
  },
});

// ─── Menu Item Card ───────────────────────────────────────────────────────────
function MenuItemCard({ item, qty, onAdd, onIncrement, onDecrement, onPress, onEdit, onDelete }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(scale, { toValue: 0.99, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={[micStyles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}
        activeOpacity={1}
      >
        {/* ── Bestseller / Popular badge ── */}
        {item.pop && (
          <View style={micStyles.bestsellerBadge}>
            <Text style={micStyles.bestsellerText}>⚡ Bestseller</Text>
          </View>
        )}

        <View style={micStyles.inner}>
          {/* Left: info */}
          <View style={micStyles.body}>
            {/* Veg / Non-veg indicator */}
            <View style={micStyles.vegRow}>
              <View style={[
                micStyles.vegBox,
                item.veg ? micStyles.vegBoxGreen : micStyles.vegBoxRed,
              ]}>
                <View style={[
                  micStyles.vegDot,
                  item.veg ? micStyles.vegDotGreen : micStyles.vegDotRed,
                ]} />
              </View>
              {item.combo && (
                <View style={micStyles.comboBadge}>
                  <Text style={micStyles.comboText}>Combo</Text>
                </View>
              )}
            </View>

            <Text style={micStyles.name} numberOfLines={2}>{item.name}</Text>

            {/* Rating row */}
            {item.pop && (
              <View style={micStyles.ratingRow}>
                <View style={micStyles.ratingPill}>
                  <Text style={micStyles.ratingText}>★ 4.6</Text>
                </View>
                <Text style={micStyles.ratingCount}> (17)</Text>
              </View>
            )}

            {/* Serves / desc */}
            <Text style={micStyles.desc} numberOfLines={2}>
              {item.cal ? `Serves 1 | ` : ''}{item.desc}
            </Text>

            {/* Savings offer pill */}
            {item.savings > 0 && (
              <View style={micStyles.offerPill}>
                <Text style={micStyles.offerText}>🔒 ₹{Math.round(item.price * 0.9)} | Order above ₹900</Text>
              </View>
            )}

            {/* Price row */}
            <View style={micStyles.priceRow}>
              <Text style={micStyles.price}>₹{item.price}</Text>
              {item.savings > 0 && (
                <Text style={micStyles.strikePrice}>₹{item.price + item.savings}</Text>
              )}
            </View>
          </View>

          {/* Right: image + ADD button */}
          <View style={micStyles.rightCol}>
            <View style={micStyles.imgWrap}>
              <Text style={micStyles.emoji}>{item.emoji}</Text>
            </View>

            {/* ADD / Qty control */}
            <View style={micStyles.addWrap}>
              {qty === 0 ? (
                <TouchableOpacity
                  onPress={onAdd}
                  style={micStyles.addBtn}
                  activeOpacity={0.8}
                >
                  <Text style={micStyles.addBtnText}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={micStyles.qtyRow}>
                  <TouchableOpacity onPress={onDecrement} style={micStyles.qtyBtn}>
                    <Text style={micStyles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={micStyles.qtyNum}>{qty}</Text>
                  <TouchableOpacity onPress={onIncrement} style={micStyles.qtyBtn}>
                    <Text style={micStyles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Add-on chips */}
        {item.addons && item.addons.length > 0 && (
          <View style={micStyles.addonsRow}>
            {item.addons.map(a => (
              <View key={a.n} style={micStyles.addonChip}>
                <Text style={micStyles.addonText}>+{a.n} </Text>
                <Text style={micStyles.addonPrice}>₹{a.p}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Edit / Delete row */}
        <View style={micStyles.actionRow}>
          <TouchableOpacity onPress={onEdit} style={micStyles.editBtn}>
            <Text style={micStyles.editText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={micStyles.deleteBtn}>
            <Text style={micStyles.deleteText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const micStyles = StyleSheet.create({
  card: {
    backgroundColor: C.bg,
    marginHorizontal: Spacing.lg,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    paddingVertical: 16,
  },
  bestsellerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  bestsellerText: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: C.accent,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
    paddingRight: 12,
  },
  vegRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  vegBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegBoxGreen: {
    borderColor: C.veg,
  },
  vegBoxRed: {
    borderColor: '#E53935',
  },
  vegDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  vegDotGreen: {
    backgroundColor: C.veg,
  },
  vegDotRed: {
    backgroundColor: '#E53935',
  },
  comboBadge: {
    backgroundColor: '#FFF3EA',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  comboText: {
    fontSize: 10,
    fontFamily: Fonts.bodySemi,
    color: C.accent,
  },
  name: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    color: C.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingPill: {
    backgroundColor: C.veg,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: Fonts.bodySemi,
    color: '#fff',
  },
  ratingCount: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: Fonts.body,
  },
  desc: {
    fontSize: 12,
    color: C.textSecondary,
    lineHeight: 17,
    marginBottom: 6,
  },
  offerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.offerBg,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  offerText: {
    fontSize: 11,
    fontFamily: Fonts.bodySemi,
    color: C.offerText,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontFamily: Fonts.bodyBold,
    color: C.text,
  },
  strikePrice: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: C.textMuted,
    textDecorationLine: 'line-through',
  },
  rightCol: {
    alignItems: 'center',
    width: 110,
    flexShrink: 0,
  },
  imgWrap: {
    width: 110,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 0,
  },
  emoji: {
    fontSize: 52,
  },
  addWrap: {
    marginTop: -14,
    alignItems: 'center',
    width: '100%',
  },
  addBtn: {
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.primary,
    borderRadius: 8,
    paddingHorizontal: 26,
    paddingVertical: 7,
    alignItems: 'center',
    // subtle shadow under the ADD button like Swiggy
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  addBtnText: {
    color: C.accent,
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.5,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.primary,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: C.accent,
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
    lineHeight: 18,
  },
  qtyNum: {
    color: C.accent,
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    minWidth: 20,
    textAlign: 'center',
  },
  addonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8,
    gap: 6,
  },
  addonChip: {
    flexDirection: 'row',
    backgroundColor: C.surface2,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  addonText: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: Fonts.body,
  },
  addonPrice: {
    fontSize: 11,
    color: C.accent,
    fontFamily: Fonts.bodySemi,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: C.surface2,
    borderWidth: 1,
    borderColor: C.divider,
  },
  editText: {
    fontSize: 11,
    color: C.textSecondary,
    fontFamily: Fonts.bodySemi,
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: 'rgba(229,57,53,0.2)',
  },
  deleteText: {
    fontSize: 11,
    color: '#E53935',
    fontFamily: Fonts.bodySemi,
  },
});

// ─── Add/Edit Item Modal ──────────────────────────────────────────────────────
function ItemModal({ visible, onClose, onSave, onDelete, item, categoryId }) {
  const isEdit = !!item;
  const [form, setForm] = useState({
    name: item?.name || '',
    price: item?.price?.toString() || '',
    desc: item?.desc || '',
    emoji: item?.emoji || '🍽️',
    veg: item?.veg ?? true,
    cal: item?.cal?.toString() || '',
    spice: item?.spice || 1,
    pop: item?.pop || false,
    combo: item?.combo || false,
    special: item?.special || false,
    savings: item?.savings?.toString() || '0',
  });

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price.trim()) {
      Alert.alert('Error', 'Name and price are required');
      return;
    }
    onSave({
      id: item?.id || `${categoryId}_${Date.now()}`,
      ...form,
      price: parseInt(form.price),
      cal: parseInt(form.cal) || 0,
      spice: parseInt(form.spice) || 1,
      savings: parseInt(form.savings) || 0,
    });
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => { onDelete(item.id); onClose(); } }
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={modalStyles.overlay}
      >
        <View style={modalStyles.container}>
          <View style={modalStyles.handle} />
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>{isEdit ? 'Edit Item' : 'Add New Item'}</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeBtn}>
              <Text style={{ color: C.textSecondary, fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={[{ key: 'form' }]}
            renderItem={() => (
              <View>
                <Text style={modalStyles.label}>Item Name *</Text>
                <TextInput
                  style={modalStyles.input}
                  value={form.name}
                  onChangeText={(t) => updateField('name', t)}
                  placeholder="e.g. Chicken Dum Biryani"
                  placeholderTextColor={C.textMuted}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Price (₹) *</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.price}
                      onChangeText={(t) => updateField('price', t.replace(/[^0-9]/g, ''))}
                      placeholder="200"
                      keyboardType="numeric"
                      placeholderTextColor={C.textMuted}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Calories</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.cal}
                      onChangeText={(t) => updateField('cal', t.replace(/[^0-9]/g, ''))}
                      placeholder="500"
                      keyboardType="numeric"
                      placeholderTextColor={C.textMuted}
                    />
                  </View>
                </View>

                <Text style={modalStyles.label}>Description</Text>
                <TextInput
                  style={[modalStyles.input, { height: 60, textAlignVertical: 'top' }]}
                  value={form.desc}
                  onChangeText={(t) => updateField('desc', t)}
                  placeholder="Brief description..."
                  multiline
                  placeholderTextColor={C.textMuted}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Emoji</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.emoji}
                      onChangeText={(t) => updateField('emoji', t)}
                      placeholder="🍽️"
                      placeholderTextColor={C.textMuted}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Spice Level (1-5)</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.spice.toString()}
                      onChangeText={(t) => updateField('spice', Math.min(5, Math.max(1, parseInt(t) || 1)))}
                      keyboardType="numeric"
                      placeholderTextColor={C.textMuted}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Savings (₹)</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.savings}
                      onChangeText={(t) => updateField('savings', t.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      placeholderTextColor={C.textMuted}
                    />
                  </View>
                </View>

                {/* Toggles */}
                <View style={modalStyles.toggles}>
                  {[
                    { key: 'veg',     label: '🌿 Vegetarian', activeColor: C.veg },
                    { key: 'pop',     label: '⭐ Popular',    activeColor: C.accent },
                    { key: 'combo',   label: '💪 Combo',      activeColor: C.accent },
                    { key: 'special', label: '🔥 Special',    activeColor: '#E53935' },
                  ].map(toggle => (
                    <TouchableOpacity
                      key={toggle.key}
                      onPress={() => updateField(toggle.key, !form[toggle.key])}
                      style={[
                        modalStyles.toggle,
                        form[toggle.key] && {
                          borderColor: toggle.activeColor,
                          backgroundColor: toggle.activeColor + '18',
                        },
                      ]}
                    >
                      <Text style={[
                        modalStyles.toggleText,
                        form[toggle.key] && { color: toggle.activeColor },
                      ]}>
                        {toggle.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />

          <View style={modalStyles.footer}>
            {isEdit && (
              <TouchableOpacity onPress={handleDelete} style={[modalStyles.btn, modalStyles.deleteBtnModal]}>
                <Text style={modalStyles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSave} style={[modalStyles.btn, modalStyles.saveBtn]}>
              <Text style={modalStyles.saveText}>{isEdit ? 'Update Item' : 'Add Item'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: C.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingHorizontal: Spacing.lg,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.divider,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.bodyBold,
    color: C.text,
  },
  closeBtn: {
    width: 30, height: 30,
    borderRadius: 15,
    backgroundColor: C.surface2,
    alignItems: 'center', justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: C.textSecondary,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: C.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.divider,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: C.text,
    fontFamily: Fonts.body,
    fontSize: 14,
  },
  toggles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  toggle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.divider,
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: C.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  btn: { flex: 1, borderRadius: 10, overflow: 'hidden' },
  deleteBtnModal: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: 'rgba(229,57,53,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  deleteBtnText: {
    color: '#E53935',
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
  },
  saveBtn: {
    flex: 2,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
  },
});

// ─── Section Header (collapsible, like Swiggy) ───────────────────────────────
function SectionHeader({ label, count, expanded, onToggle }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={sectionStyles.row}
    >
      <Text style={sectionStyles.title}>{label} ({count})</Text>
      <Text style={sectionStyles.chevron}>{expanded ? '∧' : '∨'}</Text>
    </TouchableOpacity>
  );
}
const sectionStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
    color: C.text,
  },
  chevron: {
    fontSize: 14,
    color: C.textSecondary,
    fontFamily: Fonts.bodyBold,
  },
});

// ─── MenuScreen ───────────────────────────────────────────────────────────────
export default function MenuScreen({ navigation, route }) {
  const initCat = route?.params?.categoryId || 'sc';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Local menu state for CRUD operations
  const [menuData, setMenuData] = useState(MENU_ITEMS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { getQty, addItem, changeQty } = useCart();

  const items = useMemo(() => {
    let list = menuData[activeCategory] || [];
    if (filter === 'veg')  list = list.filter(i => i.veg);
    if (filter === 'nveg') list = list.filter(i => !i.veg);
    if (filter === 'pop')  list = list.filter(i => i.pop || i.special);
    if (search) list = list.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [activeCategory, filter, search, menuData]);

  // ─── CRUD Operations ────────────────────────────────────────────────────────

  const handleAddItem = useCallback((newItem) => {
    setMenuData(prev => ({
      ...prev,
      [activeCategory]: [...(prev[activeCategory] || []), newItem],
    }));
  }, [activeCategory]);

  const handleUpdateItem = useCallback((updatedItem) => {
    setMenuData(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].map(i =>
        i.id === updatedItem.id ? updatedItem : i
      ),
    }));
  }, [activeCategory]);

  const handleDeleteItem = useCallback((itemId) => {
    setMenuData(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory].filter(i => i.id !== itemId),
    }));
  }, [activeCategory]);

  const openAddModal = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      handleUpdateItem(itemData);
    } else {
      handleAddItem(itemData);
    }
  };

  // ─── Handle Add to Cart / Doughnut Box ──────────────────────────────────────
  const handleAddToCart = useCallback((item) => {
    if (item.isDoughnutBox) {
      navigation.navigate('DoughnutBoxScreen', {
        item,
        onAddToCart: (boxData) => {
          const cartItem = {
            ...item,
            selectedDoughnuts: boxData.selections,
            selectedDips: boxData.selectedDips,
            boxQuantity: boxData.quantity,
            finalPrice: boxData.totalPrice,
            isCustomBox: true,
          };
          addItem(cartItem, [], boxData.quantity);
        }
      });
      return;
    }

    if (item.addons && item.addons.length > 0) {
      navigation.navigate('CustomizeScreen', { item });
    } else {
      addItem(item, []);
    }
  }, [navigation, addItem]);

  const activeLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || '';

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${activeLabel || 'menu'}...`}
            placeholderTextColor={C.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={{ paddingRight: 10 }}>
              <Text style={{ color: C.textMuted, fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={openAddModal} style={styles.addBtn} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* ── Filter Pills (Pure Veg / Ratings / Popular) ── */}
      <FlatList
        data={FILTERS}
        keyExtractor={f => f.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            onPress={() => setFilter(f.key)}
            style={[filterStyles.chip, filter === f.key && filterStyles.chipActive]}
            activeOpacity={0.75}
          >
            {f.key === 'veg' && filter === f.key && (
              <View style={filterStyles.vegIcon}>
                <View style={filterStyles.vegDot} />
              </View>
            )}
            <Text style={[filterStyles.label, filter === f.key && filterStyles.labelActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ── Category Tabs ── */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={c => c.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabStrip}
        contentContainerStyle={styles.tabContent}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <CategoryTab
            category={item}
            active={activeCategory === item.id}
            onPress={() => { setActiveCategory(item.id); setSearch(''); }}
          />
        )}
      />

      {/* ── Section header ── */}
      <SectionHeader
        label={`${CATEGORIES.find(c => c.id === activeCategory)?.icon || ''} ${activeLabel}`}
        count={items.length}
        expanded={true}
        onToggle={() => {}}
      />

      {/* ── Item List ── */}
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, backgroundColor: C.bg }}
        style={{ backgroundColor: C.bg }}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={{ fontSize: 44 }}>😶</Text>
            <Text style={styles.emptyText}>No items found</Text>
            <TouchableOpacity onPress={openAddModal} style={styles.emptyAddBtn}>
              <Text style={styles.emptyAddText}>+ Add First Item</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          const qty = getQty(item.id);
          return (
            <MenuItemCard
              item={item}
              qty={qty}
              onPress={() => {
                if (item.isDoughnutBox) {
                  navigation.navigate('DoughnutBoxScreen', { item });
                } else {
                  navigation.navigate('CustomizeScreen', { item });
                }
              }}
              onAdd={() => handleAddToCart(item)}
              onIncrement={() => changeQty(item.id, 1)}
              onDecrement={() => changeQty(item.id, -1)}
              onEdit={() => openEditModal(item)}
              onDelete={() => handleDeleteItem(item.id)}
            />
          );
        }}
      />

      {/* ── Add/Edit Modal ── */}
      <ItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        item={editingItem}
        categoryId={activeCategory}
      />
    </View>
  );
}

const filterStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.divider,
    backgroundColor: C.bg,
    marginRight: 8,
    gap: 4,
  },
  chipActive: {
    borderColor: C.primary,
    backgroundColor: C.vegBg,
  },
  vegIcon: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: C.veg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.veg,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: C.textSecondary,
  },
  labelActive: {
    color: C.primary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: 52,
    paddingBottom: 12,
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.divider,
    paddingLeft: 10,
  },
  searchIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 9,
    paddingRight: 4,
    color: C.text,
    fontFamily: Fonts.body,
    fontSize: 13,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: Fonts.bodyBold,
    lineHeight: 26,
  },
  filterBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    backgroundColor: C.bg,
  },
  tabStrip: {
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  tabContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    alignItems: 'center',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 14,
    color: C.textSecondary,
    fontFamily: Fonts.body,
    marginTop: 10,
  },
  emptyAddBtn: {
    marginTop: 20,
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.accent,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyAddText: {
    color: C.accent,
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
  },
});



