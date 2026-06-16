// ─── Rasa Kitchen — Menu Data ─────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'dnb', label: 'Customize',  icon: '🍩', gradientKey: 'dnb', dot: '#FF6B00' },
  { id: 'sc',  label: 'South Curries', icon: '🍛', gradientKey: 'sc',  dot: '#FF8C42' },
  { id: 'fry', label: 'Fry Curries',   icon: '🥘', gradientKey: 'fry', dot: '#B86FFF' },
  { id: 'hp',  label: 'Hand Picked',   icon: '⭐', gradientKey: 'hp',  dot: '#F5C84A' },
  { id: 'bir', label: 'Rice & Biryani',icon: '🍚', gradientKey: 'bir', dot: '#42B883' },
  { id: 'cmb', label: 'Combo Deals',   icon: '🎁', gradientKey: 'cmb', dot: '#4A9FFF' },
  
];

export const MENU_ITEMS = {
  sc: [
    {
      id: 's1', name: 'Chettinad Chicken Kuzhambu',
      emoji: '🍛', price: 180, veg: false, spice: 3,
      desc: 'Aromatic kalpasi & marathi mokku slow-cooked masala with bone-in chicken',
      addons: [{ n: 'Extra Gravy', p: 20 }, { n: 'Boiled Egg', p: 25 }],
      cal: 380, pop: true,
    },
    {
      id: 's2', name: 'Mutton Kuzhambu',
      emoji: '🫕', price: 220, veg: false, spice: 3,
      desc: 'Stone-ground paste with tender bone-in mutton, slow-simmered for 2 hours',
      addons: [{ n: 'Extra Mutton +50g', p: 50 }],
      cal: 420,
    },
    {
      id: 's3', name: 'Arachuvitta Sambar',
      emoji: '🍲', price: 80, veg: true, spice: 2,
      desc: 'Freshly ground coconut & toor dal curry with seasonal vegetables',
      addons: [{ n: 'Extra Sambar', p: 15 }],
      cal: 160, pop: true,
    },
    {
      id: 's4', name: 'Meen Kuzhambu',
      emoji: '🐟', price: 200, veg: false, spice: 3,
      desc: 'Tangy tamarind fish curry with vadagam tempering',
      addons: [{ n: 'Extra Fish Piece', p: 40 }],
      cal: 290,
    },
    {
      id: 's5', name: 'Ennai Kathirikkai',
      emoji: '🍆', price: 120, veg: true, spice: 2,
      desc: 'Stuffed brinjal cooked in rich peanut-sesame gravy',
      addons: [],
      cal: 210,
    },
  ],
  fry: [
    {
      id: 'f1', name: 'Chicken 65',
      emoji: '🍗', price: 160, veg: false, spice: 3,
      desc: 'Crispy deep-fried chicken with curry leaves, green chilli & yogurt marinade',
      addons: [{ n: 'Mint Chutney', p: 15 }, { n: 'Extra Portion', p: 80 }],
      cal: 340, pop: true,
    },
    {
      id: 'f2', name: 'Mutton Chukka Varuval',
      emoji: '🥩', price: 240, veg: false, spice: 3,
      desc: 'Dry-roasted mutton with pearl onions, fresh coconut & whole spices',
      addons: [{ n: 'Extra 50g', p: 60 }],
      cal: 450, pop: true,
    },
    {
      id: 'f3', name: 'Cauliflower 65',
      emoji: '🥦', price: 110, veg: true, spice: 2,
      desc: 'Crispy masala-coated gobi tossed with pepper & curry leaves',
      addons: [],
      cal: 220,
    },
    {
      id: 'f4', name: 'Fish Fry',
      emoji: '🐠', price: 180, veg: false, spice: 2,
      desc: 'Marinated in red chilli & fennel, shallow-fried to perfection',
      addons: [{ n: 'Lemon Wedge', p: 5 }],
      cal: 270,
    },
    {
      id: 'f5', name: 'Prawn Pepper Fry',
      emoji: '🦐', price: 260, veg: false, spice: 3,
      desc: 'Tiger prawns with crushed pepper, garlic & coconut oil',
      addons: [{ n: 'Extra Prawns', p: 80 }],
      cal: 310, pop: true,
    },
  ],
  hp: [
    {
      id: 'h1', name: "Chef's Biryani Pot",
      emoji: '🫕', price: 350, veg: false, spice: 2,
      desc: 'Dum-cooked in sealed handi, rose water & saffron infused basmati',
      addons: [{ n: 'Raita', p: 30 }, { n: 'Salan', p: 25 }],
      cal: 680, pop: true, special: true,
    },
    {
      id: 'h2', name: 'Crab Masala',
      emoji: '🦀', price: 380, veg: false, spice: 3,
      desc: 'Country crab in thick tomato-coconut masala, village-style recipe',
      addons: [{ n: 'Extra Gravy', p: 30 }],
      cal: 390, pop: true,
    },
    {
      id: 'h3', name: 'Paneer Lababdar',
      emoji: '🧀', price: 180, veg: true, spice: 1,
      desc: 'Soft cottage cheese in rich cashew-tomato gravy with kasuri methi',
      addons: [{ n: 'Extra Paneer +50g', p: 40 }],
      cal: 460,
    },
    {
      id: 'h4', name: 'Chettinad Thali',
      emoji: '🍱', price: 280, veg: false, spice: 2,
      desc: 'Full thali: rice + 2 curries + fry + raita + pickle + papad',
      addons: [{ n: 'Add Dessert', p: 40 }],
      cal: 820, special: true, pop: true,
    },
  ],
  bir: [
    {
      id: 'b1', name: 'Chicken Dum Biryani',
      emoji: '🍚', price: 200, veg: false, spice: 2,
      desc: 'Basmati with whole spices, mint, fried onion & bone-in chicken',
      addons: [{ n: 'Raita', p: 25 }, { n: 'Salan', p: 25 }, { n: 'Extra Rice', p: 40 }],
      cal: 620, pop: true,
    },
    {
      id: 'b2', name: 'Mutton Dum Biryani',
      emoji: '🍛', price: 260, veg: false, spice: 2,
      desc: '2-hour dum-cooked bone-in mutton pieces in aged basmati',
      addons: [{ n: 'Salan', p: 25 }, { n: 'Raita', p: 25 }],
      cal: 710, pop: true,
    },
    {
      id: 'b3', name: 'Prawn Biryani',
      emoji: '🦐', price: 300, veg: false, spice: 2,
      desc: 'Juicy tiger prawns dum-cooked in fragrant basmati with coastal spices',
      addons: [{ n: 'Raita', p: 25 }],
      cal: 580,
    },
    {
      id: 'b4', name: 'Baraga Rice Combo',
      emoji: '🌾', price: 130, veg: true, spice: 1,
      desc: 'Traditional red rice with sesame & curry leaf tempering, served with sambar',
      addons: [{ n: 'Papad', p: 10 }, { n: 'Pickle', p: 10 }],
      cal: 380,
    },
    {
      id: 'b5', name: 'Veg Biryani',
      emoji: '🌽', price: 150, veg: true, spice: 2,
      desc: 'Mixed seasonal vegetables dum-cooked in aromatic basmati rice',
      addons: [{ n: 'Raita', p: 25 }, { n: 'Salan', p: 25 }],
      cal: 490,
    },
    {
      id: 'b6', name: 'Jeera Ghee Rice',
      emoji: '🍙', price: 90, veg: true, spice: 1,
      desc: 'Fluffy basmati tempered with cumin seeds & pure desi ghee',
      addons: [],
      cal: 310,
    },
  ],
  cmb: [
    {
      id: 'c1', name: 'Veg Feast Combo',
      emoji: '🌿', price: 299, veg: true, spice: 2,
      desc: 'Baraga Rice + Arachuvitta Sambar + Paneer Lababdar + Cauliflower 65',
      addons: [{ n: 'Buttermilk', p: 30 }, { n: 'Papad ×2', p: 15 }],
      cal: 960, savings: 81, combo: true,
    },
    {
      id: 'c2', name: 'Non-Veg Power Combo',
      emoji: '💪', price: 399, veg: false, spice: 3,
      desc: 'Chicken Biryani + Chicken 65 + Chettinad Kuzhambu + Raita',
      addons: [{ n: 'Extra Rice', p: 40 }, { n: 'Salan', p: 25 }],
      cal: 1340, savings: 141, combo: true, pop: true,
    },
    {
      id: 'c3', name: 'Family Pack (4 Pax)',
      emoji: '👨‍👩‍👧', price: 899, veg: false, spice: 2,
      desc: '2 Biryani portions + 2 South Curries + 2 Fry dishes + 4 Rotis',
      addons: [{ n: '4× Raita', p: 80 }, { n: '4× Dessert', p: 120 }],
      cal: 3200, savings: 301, combo: true, pop: true,
    },
    {
      id: 'c4', name: 'Biryani Duo',
      emoji: '🍚', price: 380, veg: false, spice: 2,
      desc: 'Chicken Biryani + Mutton Biryani + 2 Raita + Salan',
      addons: [],
      cal: 1330, savings: 105, combo: true,
    },
    {
      id: 'c5', name: 'South Thali Combo',
      emoji: '🍱', price: 249, veg: true, spice: 2,
      desc: 'Baraga Rice + 2 South Curries + 1 Fry + Pickle + Papad',
      addons: [{ n: 'Buttermilk', p: 30 }],
      cal: 1020, savings: 91, combo: true,
    },
  ],
  // ─── Doughnut Box Category ───────────────────────────────────────────────
  dnb: [
    {
      id: 'dn1',
      name: 'Premium Mix Doughnuts (Box of 6)',
      emoji: '🍩',
      price: 596,
      veg: true,
      spice: 0,
      desc: 'Choose any 6 premium doughnuts from our selection. Includes dips!',
      addons: [],
      cal: 1800,
      pop: true,
      special: true,
      isDoughnutBox: true,  // ← Flag to trigger DoughnutBoxScreen
      boxSize: 6,
      basePrice: 596,
    },
    {
      id: 'dn2',
      name: 'Chocolate Glazed Doughnuts - Box of 3',
      emoji: '🍫',
      price: 249,
      veg: true,
      spice: 0,
      desc: 'Classic chocolate glazed doughnuts, freshly made daily',
      addons: [],
      cal: 850,
      pop: false,
    },
    {
      id: 'dn3',
      name: 'Hersheys Chocomania Doughnut (6)',
      emoji: '🍩',
      price: 599,
      veg: true,
      spice: 0,
      desc: 'Hersheys chocolate craving special edition box',
      addons: [],
      cal: 1950,
      pop: true,
      special: true,
    },
  ],
};

// ─── Doughnut Box Configuration Data ──────────────────────────────────────────
export const DOUGHNUT_BOX_CONFIG = {
  boxSize: 6,
  basePrice: 596,
  dipPrice: 40,
  maxDips: 3,
  sections: [
    {
      step: 1,
      title: 'Choose your 1st Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd1_1', name: 'Chocolate Iced Glazed Sprinkle Doughnut', emoji: '🍩' },
        { id: 'd1_2', name: 'Double Chocolate Cake', emoji: '🍫' },
        { id: 'd1_3', name: 'Chocolate Iced Glazed Doughnut', emoji: '🍩' },
        { id: 'd1_4', name: 'Tiramisu', emoji: '☕' },
        { id: 'd1_5', name: 'Mango Masti Doughnut', emoji: '🥭' },
      ],
    },
    {
      step: 2,
      title: 'Choose your 2nd Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd2_1', name: 'CHOCOLATE CHEESECAKE DOUGHNUT', emoji: '🧀' },
        { id: 'd2_2', name: 'Chocolate Iced Glazed Sprinkle Doughnut', emoji: '🍩' },
        { id: 'd2_3', name: 'Mango Masti Doughnut', emoji: '🥭' },
        { id: 'd2_4', name: 'Double Chocolate Cake', emoji: '🍫' },
        { id: 'd2_5', name: 'Powdered Strawberry Doughnut', emoji: '🍓' },
      ],
    },
    {
      step: 3,
      title: 'Choose your 3rd Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd3_1', name: 'Tiramisu', emoji: '☕' },
        { id: 'd3_2', name: 'Mango Masti Doughnut', emoji: '🥭' },
        { id: 'd3_3', name: 'CHOCOLATE COOKIE AND CREAM DOUGHNUT', emoji: '🍪' },
        { id: 'd3_4', name: 'Chocolate Dream Cake', emoji: '🍰' },
        { id: 'd3_5', name: 'Chocolate Iced Glazed Doughnut', emoji: '🍩' },
      ],
    },
    {
      step: 4,
      title: 'Choose your 4th Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd4_1', name: 'Candy Krumbs', emoji: '🍬' },
        { id: 'd4_2', name: 'Powdered Strawberry Doughnut', emoji: '🍓' },
        { id: 'd4_3', name: 'Chocolate Dream Cake', emoji: '🍰' },
        { id: 'd4_4', name: 'Choco Krunch Made with KitKat', emoji: '🍫' },
        { id: 'd4_5', name: 'CHOCOLATE CHEESECAKE DOUGHNUT', emoji: '🧀' },
      ],
    },
    {
      step: 5,
      title: 'Choose your 5th Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd5_1', name: 'Double Chocolate Cake', emoji: '🍫' },
        { id: 'd5_2', name: 'Chocolate Iced Glazed Doughnut', emoji: '🍩' },
        { id: 'd5_3', name: 'CHOCOLATE COOKIE AND CREAM DOUGHNUT', emoji: '🍪' },
        { id: 'd5_4', name: 'Powdered Strawberry Doughnut', emoji: '🍓' },
        { id: 'd5_5', name: 'Choco Krunch Made with KitKat', emoji: '🍫' },
      ],
    },
    {
      step: 6,
      title: 'Choose your 6th Doughnut',
      subtitle: 'Select any 1',
      choices: [
        { id: 'd6_1', name: 'Surprise Me!', emoji: '🎁', available: false, unavailableText: 'Unavailable at the moment' },
        { id: 'd6_2', name: 'Original Glazed Doughnut', emoji: '🍩' },
      ],
    },
  ],
  dips: [
    { id: 'dip_1', name: 'Chocolate Dip', price: 40 },
    { id: 'dip_2', name: 'Caramel Dip', price: 40 },
    { id: 'dip_3', name: 'Strawberry Dip', price: 40 },
  ],
};

export const COMBO_STEPS = [
  {
    step: 1, title: 'Choose your Rice', sub: 'Pick 1 base — required',
    multi: false,
    choices: [
      { id: 'cr1', name: 'Chicken Biryani',    emoji: '🍚', price: 200 },
      { id: 'cr2', name: 'Mutton Biryani',     emoji: '🍛', price: 260 },
      { id: 'cr3', name: 'Baraga Rice',        emoji: '🌾', price: 130 },
      { id: 'cr4', name: 'Jeera Ghee Rice',    emoji: '🍙', price: 90  },
      { id: 'cr5', name: 'Veg Biryani',        emoji: '🌽', price: 150 },
    ],
  },
  {
    step: 2, title: 'Choose your Curry', sub: 'Pick 1 curry — required',
    multi: false,
    choices: [
      { id: 'cc1', name: 'Chettinad Curry',    emoji: '🍛', price: 180 },
      { id: 'cc2', name: 'Meen Kuzhambu',      emoji: '🐟', price: 200 },
      { id: 'cc3', name: 'Mutton Kuzhambu',    emoji: '🫕', price: 220 },
      { id: 'cc4', name: 'Arachuvitta Sambar', emoji: '🍲', price: 80  },
      { id: 'cc5', name: 'Paneer Lababdar',    emoji: '🧀', price: 180 },
    ],
  },
  {
    step: 3, title: 'Choose your Fry', sub: 'Pick 1 side — required',
    multi: false,
    choices: [
      { id: 'cf1', name: 'Chicken 65',         emoji: '🍗', price: 160 },
      { id: 'cf2', name: 'Mutton Chukka',      emoji: '🥩', price: 240 },
      { id: 'cf3', name: 'Cauliflower 65',     emoji: '🥦', price: 110 },
      { id: 'cf4', name: 'Prawn Pepper Fry',   emoji: '🦐', price: 260 },
      { id: 'cf5', name: 'Fish Fry',           emoji: '🐠', price: 180 },
    ],
  },
  {
    step: 4, title: 'Add Extras', sub: 'Pick any — optional',
    multi: true,
    choices: [
      { id: 'ce1', name: 'Raita',   emoji: '🥛', price: 25 },
      { id: 'ce2', name: 'Papad',   emoji: '🫓', price: 15 },
      { id: 'ce3', name: 'Pickle',  emoji: '🫙', price: 10 },
      { id: 'ce4', name: 'Salan',   emoji: '🍵', price: 25 },
      { id: 'ce5', name: 'Buttermilk', emoji: '🥤', price: 30 },
    ],
  },
];

export const COMBO_DISCOUNT_RATE = 0.18; // 18% discount on custom combos
export const FREE_DELIVERY_THRESHOLD = 300;
export const DELIVERY_FEE = 40;
export const GST_RATE = 0.05;