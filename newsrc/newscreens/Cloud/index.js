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
  spice:     ['#FF4C29', '#FF8C42'],
  spiceDeep: ['#C93E0A', '#FF4C29'],
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