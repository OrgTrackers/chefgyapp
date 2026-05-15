// ─── MenuScreen ───────────────────────────────────────────────────────────────
import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Animated,
  Modal, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing, Radius, Shadow } from '../../newscreens/Cloud/index';
import { CATEGORIES, MENU_ITEMS } from '../../newscreens/Cloud/Menudata';
import { Tag, SpiceDots, QtyControl, AddButton, BackButton } from '../../newscreens/Cloud/Shared';
import { useCart } from './Usecart';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'veg', label: '🌿 Veg' },
  { key: 'nveg', label: '🍗 Non-Veg' },
  { key: 'pop', label: '⭐ Popular' },
];

// ─── Category Tab ─────────────────────────────────────────────────────────────
function CategoryTab({ category, active, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      {active ? (
        <LinearGradient
          colors={[Colors.spice, '#FF8C42']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={tabStyles.wrap}
        >
          <Text style={[tabStyles.label, { color: '#fff' }]}>
            {category.icon} {category.label}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[tabStyles.wrap, tabStyles.inactive]}>
          <Text style={[tabStyles.label, { color: Colors.muted }]}>
            {category.icon} {category.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const tabStyles = StyleSheet.create({
  wrap: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
});

// ─── Menu Item Card ───────────────────────────────────────────────────────────
function MenuItemCard({ item, qty, onAdd, onIncrement, onDecrement, onPress, onEdit, onDelete }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[micStyles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}
        activeOpacity={1}
      >
        <View style={micStyles.inner}>
          {/* Food image placeholder */}
          <View style={micStyles.imgWrap}>
            <Text style={micStyles.emoji}>{item.emoji}</Text>
            {item.special && (
              <View style={micStyles.specialBadge}>
                <Tag type="special" />
              </View>
            )}
          </View>

          <View style={micStyles.body}>
            <Text style={micStyles.name} numberOfLines={2}>{item.name}</Text>

            {/* Tags row */}
            <View style={{ flexDirection: 'row', marginBottom: 5, flexWrap: 'wrap' }}>
              <Tag type={item.veg ? 'veg' : 'nveg'} style={{ marginRight: 6, marginBottom: 4 }} />
              {item.pop   && <Tag type="hot"   style={{ marginRight: 6, marginBottom: 4 }} />}
              {item.combo && <Tag type="combo" style={{ marginRight: 6, marginBottom: 4 }} />}
            </View>

            <Text style={micStyles.desc} numberOfLines={2}>{item.desc}</Text>

            {/* Spice + cal row */}
            <View style={micStyles.meta}>
              <SpiceDots level={item.spice} />
              <Text style={[micStyles.cal, { marginLeft: 6 }]}>{item.cal} kcal</Text>
              {item.savings && (
                <Text style={[micStyles.save, { marginLeft: 6 }]}>· Save ₹{item.savings}</Text>
              )}
            </View>

            {/* Footer: price + qty control + edit/delete */}
            <View style={micStyles.footer}>
              <Text style={micStyles.price}>₹{item.price}</Text>
              <View style={micStyles.actions}>
                {qty === 0 ? (
                  <AddButton onPress={onAdd} />
                ) : (
                  <QtyControl qty={qty} onDecrement={onDecrement} onIncrement={onIncrement} size="sm" />
                )}
                <TouchableOpacity onPress={onEdit} style={micStyles.editBtn}>
                  <Text style={micStyles.editText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={micStyles.deleteBtn}>
                  <Text style={micStyles.deleteText}>🗑️</Text>
                </TouchableOpacity>
              </View>
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
      </TouchableOpacity>
    </Animated.View>
  );
}
const micStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20, marginHorizontal: Spacing.lg, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.cardBorder, overflow: 'hidden',
    ...Shadow.card,
  },
  inner:  { flexDirection: 'row', padding: 14 },
  imgWrap:{
    width: 90, height: 90, borderRadius: 14,
    backgroundColor: '#FFD8B8',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    marginRight: 12,
  },
  emoji:  { fontSize: 48 },
  specialBadge: { position: 'absolute', bottom: 4, left: 4 },
  body:   { flex: 1 },
  name:   { fontSize: 14, fontFamily: Fonts.bodyBold, color: Colors.text, marginBottom: 4 },
  desc:   { fontSize: 11, color: Colors.muted, lineHeight: 15, marginBottom: 5 },
  meta:   { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cal:    { fontSize: 10, color: Colors.muted, fontFamily: Fonts.body },
  save:   { fontSize: 10, color: Colors.save, fontFamily: Fonts.bodySemi },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price:  { fontSize: 18, fontFamily: Fonts.bodyXB, color: Colors.gold },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  editBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: 'rgba(245,166,35,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(245,166,35,0.3)',
  },
  editText: { fontSize: 14 },
  deleteBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: 'rgba(255,76,41,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,76,41,0.3)',
  },
  deleteText: { fontSize: 14 },
  addonsRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 14, paddingBottom: 12,
  },
  addonChip: {
    flexDirection: 'row', backgroundColor: Colors.card2,
    borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 4,
    marginRight: 6, marginBottom: 6,
  },
  addonText:  { fontSize: 10, color: Colors.muted, fontFamily: Fonts.body },
  addonPrice: { fontSize: 10, color: Colors.gold, fontFamily: Fonts.bodySemi },
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
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>{isEdit ? 'Edit Item' : 'Add New Item'}</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeBtn}>
              <Text style={{ color: Colors.muted, fontSize: 20 }}>✕</Text>
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
                  placeholderTextColor={Colors.muted}
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
                      placeholderTextColor={Colors.muted}
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
                      placeholderTextColor={Colors.muted}
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
                  placeholderTextColor={Colors.muted}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Emoji</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.emoji}
                      onChangeText={(t) => updateField('emoji', t)}
                      placeholder="🍽️"
                      placeholderTextColor={Colors.muted}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={modalStyles.label}>Spice Level (1-5)</Text>
                    <TextInput
                      style={modalStyles.input}
                      value={form.spice.toString()}
                      onChangeText={(t) => updateField('spice', Math.min(5, Math.max(1, parseInt(t) || 1)))}
                      keyboardType="numeric"
                      placeholderTextColor={Colors.muted}
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
                      placeholderTextColor={Colors.muted}
                    />
                  </View>
                </View>

                {/* Toggles */}
                <View style={modalStyles.toggles}>
                  {[
                    { key: 'veg', label: '🌿 Vegetarian', activeColor: '#6fcf7a' },
                    { key: 'pop', label: '⭐ Popular', activeColor: Colors.spice },
                    { key: 'combo', label: '💪 Combo', activeColor: Colors.gold },
                    { key: 'special', label: '🔥 Special', activeColor: '#FF4C29' },
                  ].map(toggle => (
                    <TouchableOpacity
                      key={toggle.key}
                      onPress={() => updateField(toggle.key, !form[toggle.key])}
                      style={[
                        modalStyles.toggle,
                        form[toggle.key] && { 
                          borderColor: toggle.activeColor, 
                          backgroundColor: toggle.activeColor + '20' 
                        }
                      ]}
                    >
                      <Text style={[
                        modalStyles.toggleText,
                        form[toggle.key] && { color: toggle.activeColor }
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
              <LinearGradient
                colors={[Colors.spice, '#FF8C42']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={modalStyles.grad}
              >
                <Text style={modalStyles.saveText}>{isEdit ? 'Update Item' : 'Add Item'}</Text>
              </LinearGradient>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.dark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingHorizontal: Spacing.lg,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.text,
  },
  closeBtn: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: Colors.muted,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.text,
    fontFamily: Fonts.body,
    fontSize: 13,
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
    borderColor: Colors.cardBorder,
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontSize: 12,
    fontFamily: Fonts.bodySemi,
    color: Colors.muted,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  btn: { flex: 1, borderRadius: 14, overflow: 'hidden' },
  deleteBtnModal: {
    backgroundColor: 'rgba(255,76,41,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,76,41,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: '#FF4C29',
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
  },
  saveBtn: { flex: 2 },
  grad: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontFamily: Fonts.bodyBold,
    fontSize: 14,
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

  const handleAddToCart = (item) => {
    if (item.addons && item.addons.length > 0) {
    navigation.navigate('CustomizeScreen', { item });
  } else {
    addItem(item, []); // This must call the context's addItem
  }
  };

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} style={{ marginRight: 12 }} />
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes..."
            placeholderTextColor={Colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity onPress={openAddModal} style={styles.addBtn}>
          <LinearGradient
            colors={[Colors.spice, '#FF8C42']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.addBtnGrad}
          >
            <Text style={styles.addBtnText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* ── Category Tabs ── */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={c => c.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        ListHeaderComponent={() => <View style={{ width: Spacing.lg }} />}
        ListFooterComponent={() => <View style={{ width: Spacing.lg }} />}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <CategoryTab
            category={item}
            active={activeCategory === item.id}
            onPress={() => { setActiveCategory(item.id); setSearch(''); }}
            style={{ marginRight: 2 }}
          />
        )}
      />

      {/* ── Filter Chips ── */}
      <FlatList
       data={FILTERS}
  keyExtractor={f => f.key}
  horizontal
  showsHorizontalScrollIndicator={false}
  style={{ marginBottom: 10 }}
  contentContainerStyle={{
    paddingLeft: Spacing.lg,      // ← use explicit paddingLeft
    paddingRight: Spacing.lg,     // ← and paddingRight
    paddingBottom: 8,
    alignItems: 'center',
  }}
        
        
        renderItem={({ item: f }) => (
          <TouchableOpacity
            onPress={() => setFilter(f.key)}
            style={[filterStyles.chip, filter === f.key && filterStyles.chipActive, { marginRight: 2 }]}
            activeOpacity={0.75}
          >
            <Text style={[filterStyles.label, filter === f.key && { color: Colors.spice }]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ── Section info bar ── */}
      <View style={styles.sectionBar}>
        <Text style={styles.sectionTitle}>
          {CATEGORIES.find(c => c.id === activeCategory)?.icon}{' '}
          {CATEGORIES.find(c => c.id === activeCategory)?.label}
        </Text>
        <Text style={styles.itemCount}>{items.length} dishes</Text>
      </View>

      {/* ── Item List ── */}
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={{ fontSize: 48 }}>😶</Text>
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
              onPress={() => navigation.navigate('Customize', { item })}
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
    height: 36,
    marginTop:8,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { borderColor: Colors.spice, backgroundColor: 'rgba(255,199,44,0.18)' },
  label: { fontSize: 12, fontFamily: Fonts.bodySemi, color: Colors.text },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: Spacing.lg, paddingTop: 52,
  },
  searchWrap: {
    flex: 1, position: 'relative',
    backgroundColor: Colors.card,
    borderRadius: 14, flexDirection: 'row',
    alignItems: 'center', paddingLeft: 36,
    borderWidth: 1, borderColor: Colors.cardBorder,
  },
  searchIcon:  { position: 'absolute', left: 12, fontSize: 13, zIndex: 1 },
  searchInput: {
    flex: 1, paddingVertical: 10, paddingRight: 14,
    color: Colors.text, fontFamily: Fonts.body, fontSize: 13,
  },
  addBtn: {
    width: 40, height: 40,
    borderRadius: 14,
    marginLeft: 10,
    overflow: 'hidden',
  },
  addBtnGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: Fonts.bodyBold,
  },
  sectionBar:  { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: Spacing.lg, 
    marginBottom: 10 
  },
  sectionTitle:{ fontSize: 15, fontFamily: Fonts.bodyBold, color: Colors.text },
  itemCount:   { fontSize: 12, color: Colors.muted },
  emptyWrap:   { alignItems: 'center', paddingTop: 80 },
  emptyText:   { fontSize: 14, color: Colors.muted, fontFamily: Fonts.body, marginTop: 10 },
  emptyAddBtn: {
    marginTop: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.spice,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyAddText: {
    color: Colors.spice,
    fontFamily: Fonts.bodyBold,
    fontSize: 13,
  },
});