// ─── Rasa Kitchen Design System ───────────────────────────────────────────────

export const Colors = {
  // Brand
  spice:     '#D80027',
  spiceDeep: '#A80020',
  gold:      '#FFC72C',
  goldLight: '#FFE458',

  // Backgrounds
  dark:      '#FFFFFF',
  card:      '#FFFFFF',
  card2:     '#FFF7D6',
  cardBorder:'rgba(255,199,44,0.25)',

  // Text
  text:      '#1E1E1E',
  cream:     '#FFF8E1',
  muted:     '#6F6F6F',
  hint:      '#8A8A8A',

  // Semantic
  veg:       '#4CAF50',
  vegBg:     'rgba(76,175,80,0.12)',
  vegBorder: 'rgba(76,175,80,0.25)',
  vegText:   '#4CAF50',

  nveg:      '#D80027',
  nvegBg:    'rgba(216,0,39,0.12)',
  nvegBorder:'rgba(216,0,39,0.25)',
  nvegText:  '#D80027',

  hotBg:     'rgba(216,0,39,0.12)',
  hotText:   '#D80027',
  hotBorder: 'rgba(216,0,39,0.25)',

  comboBg:   'rgba(255,199,44,0.2)',
  comboText: '#FFC72C',
  comboBorder:'rgba(255,199,44,0.25)',

  save:      '#4CAF50',
  saveBg:    'rgba(76,175,80,0.12)',

  // Overlays
  overlay:   'rgba(0,0,0,0.15)',
  heroOverlay:'rgba(0,0,0,0.12)',
};

// ─── Light Theme Colors (for DoughnutBox, etc.) ──────────────────────────────
export const LightColors = {
  // Brand
  primary:      '#3D9B6D',       // Swiggy green (veg icon, ADD button border, rating)
  primaryDark:  '#2E7D56',
  accent:       '#FC8019',       // Swiggy orange (ADD button text, bestseller, offers)
  accentLight:  'rgba(252,128,25,0.1)',

  // Backgrounds
  bg:           '#FFFFFF',       // pure white page bg
  surface:      '#FFFFFF',
  surface2:     '#F8F8F8',
  divider:      '#E9E9EB',
  border:       'rgba(0,0,0,0.08)',

  // Text
  text:         '#1C1C1C',       // section headers, item names
  textSecondary:'#686B78',       // muted body copy, serves/description
  textMuted:    '#93959F',       // strikethrough price, hints
  textDisabled: '#BABABF',

  // Semantic
  veg:          '#3D9B6D',       // green square veg dot
  vegBg:        'rgba(61,155,109,0.08)',
  vegBorder:    'rgba(61,155,109,0.25)',

  unavailable:  '#FC8019',
  unavailableBg:'rgba(252,128,25,0.08)',

  // Offer pill (e.g. ₹539 | Order above ₹900)
  offerBg:      '#FFF3EA',
  offerText:    '#FC8019',

  // Rating
  ratingBg:     '#3D9B6D',
  ratingText:   '#FFFFFF',

  // Overlays
  overlay:      'rgba(0,0,0,0.5)',
  backdrop:     'rgba(0,0,0,0.4)',
};

export const Fonts = {
  // Use react-native-google-fonts or expo-font to load these
  display:  'PlayfairDisplay-Bold',       // Playfair Display 700
  displayXB:'PlayfairDisplay-ExtraBold',  // Playfair Display 900
  body:     'DMSans-Regular',             // DM Sans 400
  bodyMed:  'DMSans-Medium',              // DM Sans 500
  bodySemi: 'DMSans-SemiBold',            // DM Sans 600
  bodyBold: 'DMSans-Bold',               // DM Sans 700
  bodyXB:   'DMSans-ExtraBold',          // DM Sans 800
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 28,
  xxxl:40,
};

export const Radius = {
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  full:999,
};

export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heavy: {
    shadowColor: '#FF4C29',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 16,
  },
};

export const GradientColors = {
  spice:     ['#FF8C42', '#FF8C42'],
  spiceDeep: ['#FF8C42', '#FF8C42'],
  heroVeg:   ['#0A1A0A', '#0F2D0F'],
  heroNveg:  ['#1A0A00', '#2D1200'],
  hero:      ['#1A0A00', '#2D1200', '#1A0A18'],
  card:      ['#1A1A26', '#22223A'],
  darkFade:  ['rgba(15,15,22,0)', 'rgba(15,15,22,1)'],
  sc:        ['#3D1C00', '#7A3800'],
  fry:       ['#1A0030', '#4A0080'],
  hp:        ['#1A1200', '#4A3400'],
  bir:       ['#003320', '#006640'],
  cmb:       ['#001A40', '#003A80'],
};