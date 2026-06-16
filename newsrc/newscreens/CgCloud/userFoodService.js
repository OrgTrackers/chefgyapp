// ─────────────────────────────────────────────────────────────────────────────
// UserApp / services / userFoodService.js
//
// All network calls needed by the User App.
// Follows the same service pattern used by vendorFoodDishesService in the
// Vendor App (AsyncStorage for IDs, try/catch per-call, structured returns).
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// UserApp / services / userFoodService.js
//
// Static vendor and serving data for offline User App mode.
// No network requests are performed.
// ─────────────────────────────────────────────────────────────────────────────

// ── Static data helpers ──────────────────────────────────────────────────────

// ── Re-usable dish flattener (mirrors Vendor App's helper) ──────────────────
/**
 * Flattens the nested specialities → dishTypes → dishes tree that the
 * Vendor App API returns, deduplicating by dishId.
 */
export function flattenDishesFromSpecialities(specialities = []) {
  const list = [];
  specialities.forEach((spec) => {
    (spec?.dishTypes ?? spec?.dish_types ?? []).forEach((dt) => {
      (dt?.dishes ?? []).forEach((dish) => {
        const id = dish?.dishId ?? dish?.id;
        const name = dish?.dishName ?? dish?.name ?? '';
        const imageUrl = dish?.imageUrl ?? dish?.imageUri ?? null;
        const price = dish?.price ?? dish?.dishPrice ?? 0;
        if (id != null && name !== '') {
          list.push({ id: Number(id), name: String(name), imageUrl, price });
        }
      });
    });
  });
  const byId = {};
  list.forEach((d) => { byId[d.id] = d; });
  return Object.values(byId);
}

// ── API calls ────────────────────────────────────────────────────────────────

/**
 * Returns the full list of registered, active vendors.
 * @returns {Promise<import('../models').Vendor[]>}
 */
export async function getAllVendors() {
  return FALLBACK_VENDORS;
}

/**
 * Returns all servings for a given vendor.
 * A serving can be a standalone item, a combo, or a mixed offering.
 * @param {number|string} vendorId
 * @param {number|string} serviceId
 * @returns {Promise<import('../models').Serving[]>}
 */
export async function getServingsByVendor(vendorId, serviceId) {
  return SERVINGS_BY_VENDOR[String(vendorId)] ?? FALLBACK_SERVINGS(String(vendorId));
}


// ── Normalisers ──────────────────────────────────────────────────────────────

function normalizeSingleServings(data, vendorId) {
  const dishes = flattenDishesFromSpecialities(data?.specialities ?? []);
  return dishes.map((dish) => ({
    servingId:      `item-${vendorId}-${dish.id}`,
    type:           'item',
    name:           dish.name,
    description:    dish.description ?? '',
    imageUrl:       dish.imageUrl,
    price:          dish.price ?? 0,
    standaloneItem: dish,
    combo:          null,
  }));
}

function normalizeComboServings(data, vendorId) {
  const raw = data?.combos ?? data?.data ?? [];
  return raw.map((c) => ({
    servingId:      `combo-${vendorId}-${c.comboId ?? c.id}`,
    type:           'combo',
    name:           c.comboName ?? c.name,
    description:    c.comboDescription ?? c.description ?? '',
    imageUrl:       c.comboImageUri ?? c.imageUrl ?? null,
    price:          Number(c.comboPrice ?? c.price ?? 0),
    standaloneItem: null,
    combo: {
      comboId:        String(c.comboId ?? c.id),
      comboName:      c.comboName ?? c.name,
      comboDescription: c.comboDescription ?? '',
      comboImageUri:  c.comboImageUri ?? null,
      comboPrice:     Number(c.comboPrice ?? c.price ?? 0),
      groups:         (c.groups ?? []).map(normalizeGroup),
      optionalItems:  (c.optionalItems ?? []).map(normalizeDish),
    },
  }));
}

function normalizeGroup(g) {
  return {
    groupId:     String(g.groupId ?? g.id ?? Math.random()),
    groupName:   g.groupName ?? g.name ?? 'Group',
    description: g.description ?? '',
    selectCount: Number(g.selectCount ?? g.selectionLimit ?? 1),
    dishes:      (g.dishes ?? []).map(normalizeDish),
  };
}

function normalizeDish(d) {
  return {
    id:       Number(d.dishId ?? d.id),
    name:     String(d.dishName ?? d.name ?? ''),
    imageUrl: d.imageUrl ?? d.imageUri ?? null,
    price:    Number(d.price ?? 0),
  };
}

// ── Fallback data (mirrors TEST_DISHES pattern from Vendor App) ──────────────

const FALLBACK_VENDORS = [
  { vendorId: 1, name: 'Spice Garden',      description: 'Authentic South Indian cuisine', logoUrl: null, cuisineType: 'South Indian',  isOpen: true,  rating: 4.5, serviceId: 101 },
  { vendorId: 2, name: 'Mughal Darbar',     description: 'Rich North Indian flavours',      logoUrl: null, cuisineType: 'North Indian',  isOpen: true,  rating: 4.2, serviceId: 102 },
  { vendorId: 3, name: 'Green Leaf Kitchen', description: 'Wholesome vegetarian meals',    logoUrl: null, cuisineType: 'Multi-cuisine', isOpen: false, rating: 4.0, serviceId: 103 },
];

const SERVINGS_BY_VENDOR = {
  '1': [
    {
      servingId: 'item-1-1',
      type: 'item',
      name: 'Chettinad Chicken',
      description: 'Fiery and aromatic chicken curry from Chettinad region.',
      imageUrl: null,
      price: 180,
      standaloneItem: { id: 1, name: 'Chettinad Chicken', imageUrl: null, price: 180 },
      combo: null,
    },
    {
      servingId: 'item-1-2',
      type: 'item',
      name: 'Paneer Butter Masala',
      description: 'Creamy tomato-based curry with soft paneer cubes.',
      imageUrl: null,
      price: 160,
      standaloneItem: { id: 2, name: 'Paneer Butter Masala', imageUrl: null, price: 160 },
      combo: null,
    },
    {
      servingId: 'item-1-3',
      type: 'item',
      name: 'Masala Dosa',
      description: 'Crispy dosa filled with spiced potato masala.',
      imageUrl: null,
      price: 120,
      standaloneItem: { id: 3, name: 'Masala Dosa', imageUrl: null, price: 120 },
      combo: null,
    },
    {
      servingId: 'combo-1-10',
      type: 'combo',
      name: 'Thali Special Combo',
      description: 'A complete South Indian meal with your choice of curry, rice, and sides.',
      imageUrl: null,
      price: 249,
      standaloneItem: null,
      combo: {
        comboId: '10',
        comboName: 'Thali Special Combo',
        comboDescription: 'Pick your favourites from each group.',
        comboImageUri: null,
        comboPrice: 249,
        groups: [
          {
            groupId: 'g1',
            groupName: 'Choose a Curry',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 1, name: 'Chettinad Chicken', imageUrl: null, price: 0 },
              { id: 4, name: 'Pepper Chicken',   imageUrl: null, price: 0 },
              { id: 5, name: 'Paneer Kurma',     imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g2',
            groupName: 'Choose Rice or Bread',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 10, name: 'Basmati Rice', imageUrl: null, price: 0 },
              { id: 11, name: 'Ghee Rice',    imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g3',
            groupName: 'Choose 2 Sides',
            description: '',
            selectCount: 2,
            dishes: [
              { id: 12, name: 'Sambar',   imageUrl: null, price: 0 },
              { id: 13, name: 'Rasam',    imageUrl: null, price: 0 },
              { id: 14, name: 'Coconut Chutney', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 15, name: 'Boiled Egg', imageUrl: null, price: 30 },
        ],
      },
    },
    {
      servingId: 'mixed-1-20',
      type: 'mixed',
      name: 'Mini Thali + Extra Curry',
      description: 'Mini thali plus an extra standalone curry of your choice.',
      imageUrl: null,
      price: 220,
      standaloneItem: { id: 20, name: 'Extra Vegetable Curry', imageUrl: null, price: 70 },
      combo: {
        comboId: '20',
        comboName: 'Mini Thali Combo',
        comboDescription: 'Rice, dal, and one curry option.',
        comboImageUri: null,
        comboPrice: 150,
        groups: [
          {
            groupId: 'g6',
            groupName: 'Choose one curry',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 21, name: 'Dal Fry', imageUrl: null, price: 0 },
              { id: 22, name: 'Veg Kurma', imageUrl: null, price: 0 },
              { id: 23, name: 'Chana Masala', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 24, name: 'Papad', imageUrl: null, price: 15 },
        ],
      },
    },
  ],
  '2': [
    {
      servingId: 'item-2-1',
      type: 'item',
      name: 'Butter Chicken',
      description: 'Rich and creamy tomato-based chicken curry.',
      imageUrl: null,
      price: 220,
      standaloneItem: { id: 31, name: 'Butter Chicken', imageUrl: null, price: 220 },
      combo: null,
    },
    {
      servingId: 'item-2-2',
      type: 'item',
      name: 'Rogan Josh',
      description: 'Slow-cooked lamb curry with warm spices.',
      imageUrl: null,
      price: 260,
      standaloneItem: { id: 32, name: 'Rogan Josh', imageUrl: null, price: 260 },
      combo: null,
    },
    {
      servingId: 'item-2-3',
      type: 'item',
      name: 'Garlic Naan',
      description: 'Soft flatbread brushed with garlic butter.',
      imageUrl: null,
      price: 40,
      standaloneItem: { id: 33, name: 'Garlic Naan', imageUrl: null, price: 40 },
      combo: null,
    },
    {
      servingId: 'combo-2-12',
      type: 'combo',
      name: 'Kebab Platter',
      description: 'A selection of grilled kebabs with chutney and naan.',
      imageUrl: null,
      price: 349,
      standaloneItem: null,
      combo: {
        comboId: '12',
        comboName: 'Kebab Platter',
        comboDescription: 'Choose your favourite kebab style.',
        comboImageUri: null,
        comboPrice: 349,
        groups: [
          {
            groupId: 'g7',
            groupName: 'Choose One Kebab',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 34, name: 'Chicken Tikka', imageUrl: null, price: 0 },
              { id: 35, name: 'Seekh Kebab', imageUrl: null, price: 0 },
              { id: 36, name: 'Paneer Tikka', imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g8',
            groupName: 'Choose One Bread',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 37, name: 'Butter Naan', imageUrl: null, price: 0 },
              { id: 38, name: 'Roomali Roti', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 39, name: 'Mint Chutney', imageUrl: null, price: 20 },
          { id: 40, name: 'Salad', imageUrl: null, price: 30 },
        ],
      },
    },
    {
      servingId: 'mixed-2-21',
      type: 'mixed',
      name: 'Mughlai Feast Mix',
      description: 'A mix of biryani and one kebab choice.',
      imageUrl: null,
      price: 399,
      standaloneItem: { id: 41, name: 'Steam Basmati Rice', imageUrl: null, price: 70 },
      combo: {
        comboId: '21',
        comboName: 'Mughlai Feast',
        comboDescription: 'Pick one kebab and one side.',
        comboImageUri: null,
        comboPrice: 329,
        groups: [
          {
            groupId: 'g9',
            groupName: 'Choose one kebab',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 42, name: 'Murgh Malai Tikka', imageUrl: null, price: 0 },
              { id: 43, name: 'Galouti Kebab', imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g10',
            groupName: 'Choose one side',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 44, name: 'Dal Makhani', imageUrl: null, price: 0 },
              { id: 45, name: 'Shahi Paneer', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 46, name: 'Raita', imageUrl: null, price: 35 },
        ],
      },
    },
  ],
  '3': [
    {
      servingId: 'item-3-1',
      type: 'item',
      name: 'Veg Biryani',
      description: 'Aromatic mixed vegetable biryani with saffron.',
      imageUrl: null,
      price: 190,
      standaloneItem: { id: 51, name: 'Veg Biryani', imageUrl: null, price: 190 },
      combo: null,
    },
    {
      servingId: 'item-3-2',
      type: 'item',
      name: 'Palak Paneer',
      description: 'Creamed spinach with soft paneer cubes.',
      imageUrl: null,
      price: 170,
      standaloneItem: { id: 52, name: 'Palak Paneer', imageUrl: null, price: 170 },
      combo: null,
    },
    {
      servingId: 'item-3-3',
      type: 'item',
      name: 'Falafel Wrap',
      description: 'Spiced falafel wrapped in flatbread with greens.',
      imageUrl: null,
      price: 140,
      standaloneItem: { id: 53, name: 'Falafel Wrap', imageUrl: null, price: 140 },
      combo: null,
    },
    {
      servingId: 'combo-3-15',
      type: 'combo',
      name: 'Green Feast Combo',
      description: 'Healthy veggie platter with rice, curry and salad.',
      imageUrl: null,
      price: 269,
      standaloneItem: null,
      combo: {
        comboId: '15',
        comboName: 'Green Feast Combo',
        comboDescription: 'A balanced vegetarian combo with choices.',
        comboImageUri: null,
        comboPrice: 269,
        groups: [
          {
            groupId: 'g11',
            groupName: 'Choose one curry',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 54, name: 'Paneer Lababdar', imageUrl: null, price: 0 },
              { id: 55, name: 'Mushroom Masala', imageUrl: null, price: 0 },
              { id: 56, name: 'Mixed Veg Curry', imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g12',
            groupName: 'Choose one grain',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 57, name: 'Quinoa Pilaf', imageUrl: null, price: 0 },
              { id: 58, name: 'Jeera Rice', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 59, name: 'Hummus Dip', imageUrl: null, price: 35 },
        ],
      },
    },
    {
      servingId: 'mixed-3-25',
      type: 'mixed',
      name: 'Veg Lunch Combo + Dessert',
      description: 'Veg lunch plate plus your choice of dessert.',
      imageUrl: null,
      price: 279,
      standaloneItem: { id: 60, name: 'Mango Lassi', imageUrl: null, price: 50 },
      combo: {
        comboId: '25',
        comboName: 'Veg Lunch Combo',
        comboDescription: 'Pick your main curry and one side.',
        comboImageUri: null,
        comboPrice: 229,
        groups: [
          {
            groupId: 'g13',
            groupName: 'Choose one main',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 61, name: 'Dal Tadka', imageUrl: null, price: 0 },
              { id: 62, name: 'Kadai Paneer', imageUrl: null, price: 0 },
            ],
          },
          {
            groupId: 'g14',
            groupName: 'Choose one side',
            description: '',
            selectCount: 1,
            dishes: [
              { id: 63, name: 'Bhindi Masala', imageUrl: null, price: 0 },
              { id: 64, name: 'Aloo Gobi', imageUrl: null, price: 0 },
            ],
          },
        ],
        optionalItems: [
          { id: 65, name: 'Naan Basket', imageUrl: null, price: 30 },
        ],
      },
    },
  ],
};

const FALLBACK_SERVINGS = (vendorId) => SERVINGS_BY_VENDOR[String(vendorId)] ?? SERVINGS_BY_VENDOR['1'];
