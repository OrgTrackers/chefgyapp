import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View, Text, Image, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions, Animated, Platform, StatusBar, SafeAreaView,
  Modal, FlatList,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import SearchServicesScreen from "../../newsrc/newscreens/SearchServicesScreen";
import ServiceVendorsScreen from "../../newsrc/newscreens/ServiceVendorsScreen";
import {
  MapPin, Bell, Search, Mic, SlidersHorizontal, ChevronRight,
  Star, Clock, Heart, Home, Compass, BookOpen, User,
  ChevronLeft, BadgeCheck, Zap, Shield, Headphones, CreditCard,
  Navigation2, CalendarCheck, ArrowRight, Award, TrendingUp,
  ShieldCheck, Leaf, ChevronDown, ChevronUp, X, Bookmark, Share2,
  CheckCircle2, Sparkles, Filter,
} from "lucide-react-native";

const { width: SCREEN_W } = Dimensions.get("window");
const PRIMARY = "#FF4D4D";
const ACCENT = "#FFD166";
const SUCCESS = "#34C759";
const DARK = "#1A1A1A";
const MUTED = "#8A7D79";
const BG = "#FAFAFA";
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#FFF8E7";
const GREEN_TRUST = "#2D7A4F";
const GREEN_LIGHT = "#E8F5EE";

// ─── DATA ───────────────────────────────────────────────────────────────────

const bannerSlides = [
  { title: "Royal Wedding Catering", sub: "Make your big day unforgettable", cta: "Book Now",
    img: "https://images.unsplash.com/photo-1719786625035-71f46082e385?w=800&h=500&fit=crop&auto=format",
    badge: "Top Rated", colors: ["rgba(136,19,55,0.85)", "rgba(136,19,55,0.3)"] },
  { title: "Live BBQ Chef Experience", sub: "Sizzling flavors at your doorstep", cta: "Hire Chef",
    img: "https://images.unsplash.com/photo-1503453776591-b4548af666a2?w=800&h=500&fit=crop&auto=format",
    badge: "Trending", colors: ["rgba(154,52,18,0.85)", "rgba(154,52,18,0.3)"] },
  { title: "Home Cooked Goodness", sub: "Wholesome meals from home kitchens", cta: "Order Now",
    img: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=800&h=500&fit=crop&auto=format",
    badge: "Healthy", colors: ["rgba(20,83,45,0.85)", "rgba(20,83,45,0.3)"] },
  { title: "Corporate Catering", sub: "Impress your team every meeting", cta: "Get Quote",
    img: "https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=800&h=500&fit=crop&auto=format",
    badge: "Corporate", colors: ["rgba(30,41,59,0.85)", "rgba(30,41,59,0.3)"] },
  { title: "Cloud Kitchen Specials", sub: "Restaurant quality, delivered fast", cta: "Order Now",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=500&fit=crop&auto=format",
    badge: "Fast", colors: ["rgba(88,28,135,0.85)", "rgba(88,28,135,0.3)"] },
];

const services = [
  { label: "Chef", img: "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=200&h=200&fit=crop&auto=format", accent: PRIMARY },
  { label: "Caterer", img: "https://images.unsplash.com/photo-1660120447916-123439b05c40?w=200&h=200&fit=crop&auto=format", accent: "#FF9F43" },
  { label: "Home Food", img: "https://images.unsplash.com/photo-1671970922492-4d2a4c7a2ffe?w=200&h=200&fit=crop&auto=format", accent: SUCCESS },
  { label: "Cloud Kitchen", img: "https://images.unsplash.com/photo-1652862729869-2f4e80c1849d?w=200&h=200&fit=crop&auto=format", accent: "#2196F3" },
  { label: "Food Truck", img: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=200&h=200&fit=crop&auto=format", accent: ACCENT },
  { label: "Bakery", img: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=200&h=200&fit=crop&auto=format", accent: "#E91E63" },
  { label: "Live Counter", img: "https://images.unsplash.com/photo-1778687192857-9178a574d49f?w=200&h=200&fit=crop&auto=format", accent: "#9C27B0" },
  { label: "Event Food", img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&fit=crop&auto=format", accent: "#00BCD4" },
];

const occasions = [
  { label: "Birthday", img: "https://images.unsplash.com/photo-1545696563-af8f6ec2295a?w=200&h=200&fit=crop&auto=format", tint: "rgba(251,113,133,0.65)" },
  { label: "Wedding", img: "https://images.unsplash.com/photo-1562050344-f7ad946cee35?w=200&h=200&fit=crop&auto=format", tint: "rgba(244,114,182,0.65)" },
  { label: "Corporate", img: "https://images.unsplash.com/photo-1672826979217-7156a305acf5?w=200&h=200&fit=crop&auto=format", tint: "rgba(59,130,246,0.65)" },
  { label: "House Party", img: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=200&h=200&fit=crop&auto=format", tint: "rgba(251,146,60,0.65)" },
  { label: "Festival", img: "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029?w=200&h=200&fit=crop&auto=format", tint: "rgba(234,179,8,0.65)" },
  { label: "Graduation", img: "https://images.unsplash.com/photo-1526781480235-d79b4866aa9c?w=200&h=200&fit=crop&auto=format", tint: "rgba(34,197,94,0.65)" },
  { label: "Baby Shower", img: "https://images.unsplash.com/photo-1761296152332-88ada22be48a?w=200&h=200&fit=crop&auto=format", tint: "rgba(167,139,250,0.65)" },
  { label: "Anniversary", img: "https://images.unsplash.com/photo-1529516222410-a269d812f320?w=200&h=200&fit=crop&auto=format", tint: "rgba(248,113,113,0.65)" },
];

const vendors = [
  { name: "Royal Caterers", tag: "Premium Catering", rating: 4.9, events: "500+ Events", dist: "2.1 km", price: "₹₹₹",
    img: "https://images.unsplash.com/photo-1680342630889-b475e612a058?w=400&h=260&fit=crop&auto=format", logo: "👑", verified: true, badge: "Top Choice" },
  { name: "Chef Arjun", tag: "Italian • BBQ • North Indian", rating: 4.8, events: "320+ Bookings", dist: "3.4 km", price: "₹₹",
    img: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?w=400&h=260&fit=crop&auto=format", logo: "🧑‍🍳", verified: true, badge: "Chef's Pick" },
  { name: "Cloud Bowl Kitchen", tag: "Fast Delivery • Multi-cuisine", rating: 4.9, events: "1200+ Orders", dist: "1.2 km", price: "₹₹",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=260&fit=crop&auto=format", logo: "☁️", verified: true, badge: "Fast Delivery" },
  { name: "Spice Street Truck", tag: "Street Food • Live Counters", rating: 4.7, events: "200+ Events", dist: "4.0 km", price: "₹",
    img: "https://images.unsplash.com/photo-1765478006672-463264014e78?w=400&h=260&fit=crop&auto=format", logo: "🚚", verified: true, badge: "Trending" },
];

const chefs = [
  { name: "Chef Priya Sharma", cuisine: "South Indian • Continental", exp: "12 yrs", rating: 4.9, avail: "Available Today",
    img: "https://images.unsplash.com/photo-1640583342012-4622f31b650d?w=300&h=300&fit=crop&auto=format", speciality: "Wedding Specialist" },
  { name: "Chef Rahul Mehra", cuisine: "Mughlai • Tandoor", exp: "8 yrs", rating: 4.8, avail: "Booked Till Fri",
    img: "https://images.unsplash.com/photo-1503453776591-b4548af666a2?w=300&h=300&fit=crop&auto=format", speciality: "Kebab Master" },
  { name: "Chef Anjali Nair", cuisine: "Kerala • Fusion", exp: "6 yrs", rating: 4.7, avail: "Available Tomorrow",
    img: "https://images.unsplash.com/photo-1731156679850-e73fbc21564c?w=300&h=300&fit=crop&auto=format", speciality: "Seafood Expert" },
];

const homeFoodProviders = [
  { name: "Amma's Kitchen", tag: "Veg • South Indian", items: ["Sambar Rice", "Rasam", "Curd Rice"], rating: 4.9,
    img: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&h=240&fit=crop&auto=format", badge: "Home Chef", price: "₹120/meal" },
  { name: "Nani's Tiffin", tag: "Non-Veg • North Indian", items: ["Dal Makhani", "Butter Chicken", "Roti"], rating: 4.8,
    img: "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=400&h=240&fit=crop&auto=format", badge: "Diet Friendly", price: "₹180/meal" },
];

const cloudKitchens = [
  { name: "Biryani Bros", dish: "Hyderabadi Dum Biryani", time: "25 min", offer: "20% OFF", rating: 4.9,
    img: "https://images.unsplash.com/photo-1676826579382-2ab5b56a5dc1?w=360&h=240&fit=crop&auto=format", tag: "Bestseller" },
  { name: "Bowl & Co.", dish: "Superfood Buddha Bowl", time: "20 min", offer: "Free Delivery", rating: 4.7,
    img: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=360&h=240&fit=crop&auto=format", tag: "Healthy" },
  { name: "Pizza Republic", dish: "Wood-fired Truffle Pizza", time: "30 min", offer: "Buy 2 Get 1", rating: 4.6,
    img: "https://images.unsplash.com/photo-1661163081367-d4c17da3e259?w=360&h=240&fit=crop&auto=format", tag: "Trending" },
];

const offers = [
  { title: "20% OFF", sub: "On all catering orders above ₹5000", code: "CHEF20", colors: ["#FF4D4D", "#FF8C69"], icon: "🍽️" },
  { title: "Free Consultation", sub: "Book a chef consultation at ₹0", code: "FREECHEF", colors: ["#FFD166", "#FF9F43"], icon: "👨‍🍳" },
  { title: "Wedding Special", sub: "Save ₹15,000 on wedding packages", code: "WEDBLISS", colors: ["#C471ED", "#F64F59"], icon: "💍" },
  { title: "Corp Lunch Deal", sub: "₹99/person for 20+ pax orders", code: "CORP99", colors: ["#2196F3", "#00BCD4"], icon: "🏢" },
];

const whyUs = [
  { icon: "badge-check", title: "Verified Pros", sub: "All providers background-checked", color: "#FFE8E8" },
  { icon: "award", title: "Quality Assured", sub: "Ratings & reviews verified", color: "#FFF8E1" },
  { icon: "headphones", title: "24/7 Support", sub: "Real humans, always ready", color: "#E8F5E9" },
  { icon: "credit-card", title: "Secure Payment", sub: "256-bit encrypted checkout", color: "#E3F2FD" },
  { icon: "navigation-2", title: "Live Tracking", sub: "Track chefs & deliveries live", color: "#F3E5F5" },
  { icon: "calendar-check", title: "Instant Book", sub: "Confirm in under 60 seconds", color: "#E0F7FA" },
];

const testimonials = [
  { name: "Aisha Kapoor", role: "Wedding Planner", review: "Chefgy made our 400-pax wedding a dream. Royal Caterers went above and beyond every expectation!", rating: 5, avatar: "AK", avatarBg: "#FF4D4D" },
  { name: "Vikram Reddy", role: "Corporate Manager", review: "We use Chefgy for every office event. Delivery is always on time and the food quality is restaurant-grade.", rating: 5, avatar: "VR", avatarBg: "#2196F3" },
  { name: "Sneha Patel", role: "Home Cook Enthusiast", review: "Ordered a personal chef for my anniversary dinner. Chef Priya created a magical 7-course experience!", rating: 5, avatar: "SP", avatarBg: "#9C27B0" },
];

const stats = [
  { value: "1,000+", label: "Verified Chefs", icon: "👨‍🍳" },
  { value: "500+", label: "Caterers", icon: "🍽️" },
  { value: "100+", label: "Cloud Kitchens", icon: "☁️" },
  { value: "50K+", label: "Happy Customers", icon: "❤️" },
];

const navItems = [
  { icon: "home", label: "Home" },
  { icon: "compass", label: "Explore" },
  { icon: "book-open", label: "Bookings" },
  { icon: "heart", label: "Wishlist" },
  { icon: "user", label: "Profile" },
];

// ─── RECOMMENDED PRODUCTS DATA ───────────────────────────────────────────────

const filterChips = ["All", "Organic", "Premium", "Vegetarian", "Vegan", "Gluten-Free", "Halal"];

const productCategories = [
  {
    id: "rice", icon: "🌾", label: "Rice & Grains", color: "#FFF8E7", accent: GOLD,
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "India Gate Basmati Rice", desc: "Long-grain, aged 2 years. Used in biryani & pulao.", tags: ["Premium", "Vegetarian"], badge: "Chef's Top Pick" },
      { name: "24 Mantra Organic Millets", desc: "100% organic, protein-rich, multi-grain blend.", tags: ["Organic", "Vegan"], badge: "Organic Certified" },
      { name: "Daawat Rozana Gold", desc: "Everyday cooking rice, consistent quality.", tags: ["Vegetarian"], badge: "Best Value" },
    ],
  },
  {
    id: "spices", icon: "🌶️", label: "Spices", color: "#FFF0EC", accent: "#E05A2B",
    img: "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Everest Garam Masala", desc: "Authentic spice blend, used by 5-star kitchens.", tags: ["Vegetarian", "Halal"], badge: "Professional Grade" },
      { name: "MDH Turmeric Powder", desc: "High-curcumin turmeric, vibrant colour & aroma.", tags: ["Organic", "Vegan"], badge: "Ayurvedic Certified" },
      { name: "Catch Red Chilli Powder", desc: "Balanced heat, deep red colour, natural flavour.", tags: ["Vegetarian"], badge: "Chef Approved" },
    ],
  },
  {
    id: "oils", icon: "🫒", label: "Cooking Oils", color: "#FFFBEC", accent: "#B8860B",
    img: "https://images.unsplash.com/photo-1682989132884-d769f70b6f89?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Fortune Sunflower Oil", desc: "Light, neutral oil, zero trans-fat, heart healthy.", tags: ["Vegan", "Gluten-Free"], badge: "Heart Certified" },
      { name: "Patanjali Cow Ghee", desc: "A2 milk ghee, naturally clarified, aromatic.", tags: ["Vegetarian"], badge: "Premium Grade" },
      { name: "Idhayam Sesame Oil", desc: "Cold-pressed gingelly oil, traditional flavour.", tags: ["Organic", "Vegan"], badge: "Cold-Pressed" },
    ],
  },
  {
    id: "vegetables", icon: "🥬", label: "Vegetables", color: "#E8F5EE", accent: GREEN_TRUST,
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Farm Fresh Seasonal Veggies", desc: "Direct from farms, harvested within 24 hrs.", tags: ["Organic", "Vegan"], badge: "Farm Direct" },
      { name: "Organic Certified Greens", desc: "Pesticide-free leafy greens, certified organic.", tags: ["Organic", "Gluten-Free"], badge: "Zero Pesticide" },
      { name: "Premium Cut Vegetables", desc: "Pre-washed, chef-cut, ready to cook.", tags: ["Vegetarian"], badge: "Time Saver" },
    ],
  },
  {
    id: "meat", icon: "🍗", label: "Meat & Seafood", color: "#FFF0F3", accent: "#C0392B",
    img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Licious Fresh Chicken", desc: "Antibiotic-free, air-chilled, cleaned & cut.", tags: ["Halal", "Gluten-Free"], badge: "Antibiotic-Free" },
      { name: "FreshToHome Prawns", desc: "Ocean-fresh, deveined & cleaned within hours.", tags: ["Halal"], badge: "Ocean-Fresh" },
      { name: "Zappfresh Mutton", desc: "100% natural mutton, no preservatives.", tags: ["Halal", "Gluten-Free"], badge: "Natural" },
    ],
  },
  {
    id: "dairy", icon: "🥛", label: "Dairy", color: "#F0F6FF", accent: "#2980B9",
    img: "https://images.unsplash.com/photo-1661349008073-136bed6e6788?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Amul Taaza Milk", desc: "Double-toned, homogenised, pasteurised daily.", tags: ["Vegetarian"], badge: "Pasteurised Daily" },
      { name: "Amul Paneer", desc: "Soft, fresh paneer, made from pure cow milk.", tags: ["Vegetarian", "Gluten-Free"], badge: "Chef's Choice" },
      { name: "Britannia Cheese Slices", desc: "Consistent melt, ideal for professional kitchens.", tags: ["Vegetarian"], badge: "Professional" },
    ],
  },
  {
    id: "bakery", icon: "🍞", label: "Bakery", color: "#FFF5EC", accent: "#E67E22",
    img: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Britannia Whole Wheat Bread", desc: "Zero maida, high fibre, baked fresh daily.", tags: ["Vegetarian"], badge: "Whole Grain" },
      { name: "Modern Burger Buns", desc: "Soft, uniform buns trusted by QSR chains.", tags: ["Vegetarian"], badge: "QSR Grade" },
      { name: "Pillsbury Pizza Base", desc: "Pre-proved, consistent bake every time.", tags: ["Vegetarian"], badge: "Professional" },
    ],
  },
  {
    id: "pantry", icon: "🍯", label: "Pantry Essentials", color: "#F5F0FF", accent: "#7D3C98",
    img: "https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Aashirvaad Whole Wheat Flour", desc: "Stone-ground atta, high protein, consistent dough.", tags: ["Vegetarian", "Vegan"], badge: "Quality Tested" },
      { name: "Tata Salt Lite", desc: "Low-sodium iodised salt, consistent granules.", tags: ["Vegan", "Gluten-Free"], badge: "Health Grade" },
      { name: "Tata Sampann Chana Dal", desc: "Double-polished, pesticide-free pulses.", tags: ["Organic", "Vegan"], badge: "Pesticide-Free" },
    ],
  },
  {
    id: "beverages", icon: "🧃", label: "Beverages", color: "#E8F8F5", accent: "#1ABC9C",
    img: "https://images.unsplash.com/photo-1521012012373-6a85bade18da?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Tata Tea Premium", desc: "Strong, aromatic CTC tea, preferred by chai vendors.", tags: ["Vegan"], badge: "Chai Approved" },
      { name: "Nescafé Classic", desc: "Instant premium coffee, consistent brew every time.", tags: ["Vegan", "Gluten-Free"], badge: "Barista Grade" },
      { name: "Tropicana 100% Juice", desc: "No added sugar, direct-pressed fruit juice.", tags: ["Vegan", "Organic"], badge: "No Sugar Added" },
    ],
  },
  {
    id: "desserts", icon: "🍰", label: "Desserts", color: "#FDF0F8", accent: "#E91E8C",
    img: "https://images.unsplash.com/photo-1514953808247-5d4b1cc19835?w=120&h=120&fit=crop&auto=format",
    products: [
      { name: "Morde Dark Chocolate", desc: "70% cocoa couverture, used by professional pastry chefs.", tags: ["Vegetarian", "Gluten-Free"], badge: "Pastry Grade" },
      { name: "Borges Mixed Dry Fruits", desc: "Premium walnuts, almonds, pistachios — imported.", tags: ["Vegan", "Premium"], badge: "Import Quality" },
      { name: "Vadilal Ice Cream Base", desc: "Commercial grade base, smooth texture guarantee.", tags: ["Vegetarian"], badge: "Commercial Grade" },
    ],
  },
];

const trustPoints = [
  "Quality Checked",
  "Authentic Brands",
  "Fresh Ingredients",
  "Hygienic Supply Chain",
  "Chef Approved",
  "Food Safety Standards",
];

// ─── ICON RENDERER ──────────────────────────────────────────────────────────

function renderIcon(name, size, color, fill) {
  const p = { size, color, fill: fill || "transparent" };
  switch (name) {
    case "home": return <Home {...p} />;
    case "compass": return <Compass {...p} />;
    case "book-open": return <BookOpen {...p} />;
    case "heart": return <Heart {...p} />;
    case "user": return <User {...p} />;
    case "badge-check": return <BadgeCheck {...p} />;
    case "award": return <Award {...p} />;
    case "headphones": return <Headphones {...p} />;
    case "credit-card": return <CreditCard {...p} />;
    case "navigation-2": return <Navigation2 {...p} />;
    case "calendar-check": return <CalendarCheck {...p} />;
    case "shield": return <Shield {...p} />;
    case "zap": return <Zap {...p} />;
    case "trending-up": return <TrendingUp {...p} />;
    default: return null;
  }
}

// ─── STAR ROW ───────────────────────────────────────────────────────────────

function StarRow({ rating }) {
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? ACCENT : "transparent"} stroke={i <= Math.round(rating) ? ACCENT : "#ccc"} />
      ))}
      <Text style={styles.starRating}>{rating}</Text>
    </View>
  );
}

// ─── SECTION HEADER ─────────────────────────────────────────────────────────

function SectionHeader({ title, sub, action, onPress }) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {sub && <Text style={styles.sectionSub}>{sub}</Text>}
      </View>
      {action && (
        <TouchableOpacity style={styles.sectionAction} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.sectionActionText}>{action}</Text>
          <ChevronRight size={13} color={PRIMARY} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── BANNER CAROUSEL ────────────────────────────────────────────────────────

function BannerCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(p => (p + 1) % bannerSlides.length), 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.7, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [active]);

  const slide = bannerSlides[active];
  const goPrev = () => setActive(p => (p - 1 + bannerSlides.length) % bannerSlides.length);
  const goNext = () => setActive(p => (p + 1) % bannerSlides.length);

  return (
    <View style={styles.bannerContainer}>
      <Animated.View style={[styles.bannerWrapper, { opacity: fadeAnim }]}>
        <Image source={{ uri: slide.img }} style={styles.bannerImage} resizeMode="cover" />
        <LinearGradient colors={slide.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bannerGradient} />
        <View style={styles.bannerContent}>
          <View style={styles.bannerBadge}><Text style={styles.bannerBadgeText}>{slide.badge}</Text></View>
          <Text style={styles.bannerTitle}>{slide.title}</Text>
          <Text style={styles.bannerSub}>{slide.sub}</Text>
          <TouchableOpacity style={styles.bannerCta} activeOpacity={0.8}>
            <Text style={styles.bannerCtaText}>{slide.cta}</Text>
            <ArrowRight size={12} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.bannerArrow, { left: 12 }]} onPress={goPrev} activeOpacity={0.7}>
          <ChevronLeft size={14} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bannerArrow, { right: 12 }]} onPress={goNext} activeOpacity={0.7}>
          <ChevronRight size={14} color="#fff" />
        </TouchableOpacity>
        <View style={styles.bannerDots}>
          {bannerSlides.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setActive(i)} style={[styles.bannerDot, i === active && styles.bannerDotActive]} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

// ─── VENDOR CARD ────────────────────────────────────────────────────────────

function VendorCard({ v }) {
  const [liked, setLiked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.vendorCard} onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.vendorImageWrap}>
          <Image source={{ uri: v.img }} style={styles.vendorImage} resizeMode="cover" />
          <TouchableOpacity style={styles.vendorHeartBtn} onPress={() => setLiked(p => !p)} activeOpacity={0.7}>
            <Heart size={13} fill={liked ? PRIMARY : "transparent"} stroke={liked ? PRIMARY : "#666"} />
          </TouchableOpacity>
          <View style={styles.vendorBadge}><Text style={styles.vendorBadgeText}>{v.badge}</Text></View>
          <View style={styles.vendorLogo}><Text style={styles.vendorLogoText}>{v.logo}</Text></View>
        </View>
        <View style={styles.vendorInfo}>
          <View style={styles.vendorNameRow}>
            <Text style={styles.vendorName}>{v.name}</Text>
            {v.verified && <BadgeCheck size={13} fill={SUCCESS} stroke="#fff" />}
          </View>
          <Text style={styles.vendorTag} numberOfLines={1}>{v.tag}</Text>
          <View style={styles.vendorMetaRow}>
            <StarRow rating={v.rating} />
            <Text style={styles.vendorPrice}>{v.price}</Text>
          </View>
          <View style={styles.vendorBottomRow}>
            <View style={styles.vendorDist}>
              <MapPin size={9} color={MUTED} />
              <Text style={styles.vendorDistText}>{v.dist}</Text>
            </View>
            <Text style={styles.vendorEvents}>• {v.events}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── CHEF CARD ───────────────────────────────────────────────────────────────

function ChefCard({ c }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.chefCard} onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.chefImageWrap}>
          <Image source={{ uri: c.img }} style={styles.chefImage} resizeMode="cover" />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.5)"]} style={styles.chefImageOverlay} />
          <View style={styles.chefSpeciality}><Text style={styles.chefSpecialityText}>{c.speciality}</Text></View>
          <View style={styles.chefStarOverlay}><StarRow rating={c.rating} /></View>
        </View>
        <View style={styles.chefInfo}>
          <Text style={styles.chefName} numberOfLines={1}>{c.name}</Text>
          <Text style={styles.chefCuisine} numberOfLines={1}>{c.cuisine}</Text>
          <View style={styles.chefTags}>
            <View style={styles.chefExpBadge}><Text style={styles.chefExpText}>{c.exp}</Text></View>
            <View style={[styles.chefAvailBadge, { backgroundColor: c.avail.startsWith("Available") ? "#E8F5E9" : "#FFF8E1" }]}>
              <Text style={[styles.chefAvailText, { color: c.avail.startsWith("Available") ? SUCCESS : "#FF9F43" }]}>
                {c.avail.startsWith("Available") ? "● " : "○ "}{c.avail}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.chefBookBtn} activeOpacity={0.8}>
            <Text style={styles.chefBookText}>Book Consultation</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── RECOMMENDED: PRODUCT CARD ───────────────────────────────────────────────

function ProductCard({ product, catAccent }) {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <View style={styles.productCard}>
      <View style={[styles.productIconBox, { backgroundColor: `${catAccent}18` }]}>
        <Text style={styles.productIconText}>🛒</Text>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.productTopRow}>
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
          <TouchableOpacity onPress={() => setBookmarked(p => !p)} style={styles.bookmarkBtn}>
            <Bookmark size={14} fill={bookmarked ? GOLD : "transparent"} stroke={bookmarked ? GOLD : "#aaa"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productDesc} numberOfLines={2}>{product.desc}</Text>
        <View style={styles.productTagsRow}>
          <View style={styles.productBadgePill}>
            <Text style={styles.productBadgeText}>★ {product.badge}</Text>
          </View>
          {product.tags.slice(0, 2).map(t => (
            <View key={t} style={styles.productTagPill}>
              <Text style={styles.productTagText}>{t}</Text>
            </View>
          ))}
        </View>
        <View style={styles.productCertRow}>
          <View style={styles.productCertItem}>
            <ShieldCheck size={9} color={GREEN_TRUST} />
            <Text style={styles.productCertText}>Quality Certified</Text>
          </View>
          <View style={styles.productCertItem}>
            <Leaf size={9} color={GREEN_TRUST} />
            <Text style={styles.productCertText}>Authentic Source</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── RECOMMENDED: CATEGORY BLOCK ─────────────────────────────────────────────

function CategoryBlock({ cat, activeFilter }) {
  const [open, setOpen] = useState(false);
  const filtered = activeFilter === "All"
    ? cat.products
    : cat.products.filter(p => p.tags.includes(activeFilter));

  if (filtered.length === 0) return null;

  return (
    <View style={styles.categoryBlock}>
      <TouchableOpacity
        style={[styles.categoryHeader, { backgroundColor: cat.color }]}
        onPress={() => setOpen(p => !p)}
        activeOpacity={0.85}
      >
        <Image source={{ uri: cat.img }} style={styles.categoryHeaderImg} resizeMode="cover" />
        <View style={styles.categoryHeaderText}>
          <Text style={styles.categoryHeaderTitle}>{cat.icon} {cat.label}</Text>
          <Text style={styles.categoryHeaderSub}>
            {filtered.length} recommended product{filtered.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <View style={[styles.categoryChevronBox, { backgroundColor: `${cat.accent}22` }]}>
          {open
            ? <ChevronUp size={14} color={cat.accent} />
            : <ChevronDown size={14} color={cat.accent} />}
        </View>
      </TouchableOpacity>

      {open && (
        <View style={styles.categoryProducts}>
          {filtered.map(p => (
            <ProductCard key={p.name} product={p} catAccent={cat.accent} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── RECOMMENDED: BOTTOM SHEET MODAL ─────────────────────────────────────────

function RecommendedSheet({ visible, onClose }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCatTab, setActiveCatTab] = useState("all");
  const WINDOW_H = Dimensions.get("window").height;
  const slideAnim = useRef(new Animated.Value(WINDOW_H)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
    } else {
      Animated.timing(slideAnim, { toValue: WINDOW_H, duration: 280, useNativeDriver: true }).start();
    }
  }, [visible, WINDOW_H]);

  const filteredCats = productCategories.filter(cat => {
    const matchesSearch = search === "" ||
      cat.label.toLowerCase().includes(search.toLowerCase()) ||
      cat.products.some(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = activeFilter === "All" || cat.products.some(p => p.tags.includes(activeFilter));
    const matchesTab = activeCatTab === "all" || cat.id === activeCatTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const sheetBadges = [
    { icon: <ShieldCheck size={11} color={GREEN_TRUST} />, label: "Quality Tested" },
    { icon: <Leaf size={11} color={GREEN_TRUST} />, label: "Fresh & Natural" },
    { icon: <Award size={11} color={GREEN_TRUST} />, label: "Chef Approved" },
    { icon: <Sparkles size={11} color={GREEN_TRUST} />, label: "Premium Picks" },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.sheetBackdrop}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[styles.sheetContainer, { transform: [{ translateY: slideAnim }] }]}>
          {/* Drag handle */}
          <View style={styles.sheetDragHandle} />

          {/* Sheet Header */}
          <LinearGradient colors={["#FFF8E7", "#E8F5EE"]} style={styles.sheetHeaderGrad}>
            <View style={styles.sheetHeaderRow}>
              <View style={styles.sheetHeaderLeft}>
                <View style={styles.sheetHeaderBadgeRow}>
                  <View style={styles.sheetHeaderBadgeIcon}>
                    <ShieldCheck size={15} color="#fff" />
                  </View>
                  <Text style={styles.sheetHeaderBadgeLabel}>Chefgy Certified</Text>
                </View>
                <Text style={styles.sheetHeaderTitle}>Recommended Products</Text>
                <Text style={styles.sheetHeaderSub}>Trusted by our chefs across every kitchen.</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.sheetCloseBtn}>
                <X size={16} color={DARK} />
              </TouchableOpacity>
            </View>

            {/* Trust badge row */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sheetBadgeScroll}>
              {sheetBadges.map(b => (
                <View key={b.label} style={styles.sheetTrustBadge}>
                  {b.icon}
                  <Text style={styles.sheetTrustBadgeText}>{b.label}</Text>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>

          {/* Search + Filter */}
          <View style={styles.sheetSearchWrap}>
            <View style={styles.sheetSearchBox}>
              <Search size={15} color={MUTED} />
              <TextInput
                style={styles.sheetSearchInput}
                placeholder="Search ingredients, brands..."
                placeholderTextColor={MUTED}
                value={search}
                onChangeText={setSearch}
              />
              {search !== "" && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <X size={13} color={MUTED} />
                </TouchableOpacity>
              )}
            </View>

            {/* Filter chips */}
            <View style={styles.sheetFilterRow}>
              <Filter size={13} color={MUTED} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filterChips.map(f => (
                  <TouchableOpacity
                    key={f}
                    onPress={() => setActiveFilter(f)}
                    style={[
                      styles.filterChip,
                      { backgroundColor: activeFilter === f ? GREEN_TRUST : "#F5F0EE" },
                    ]}
                  >
                    <Text style={[styles.filterChipText, { color: activeFilter === f ? "#fff" : MUTED }]}>
                      {f}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.catTabsScroll}
            contentContainerStyle={styles.catTabsContent}
          >
            <TouchableOpacity
              onPress={() => setActiveCatTab("all")}
              style={[styles.catTab, { backgroundColor: activeCatTab === "all" ? GOLD : GOLD_LIGHT }]}
            >
              <Text style={[styles.catTabText, { color: activeCatTab === "all" ? "#fff" : GOLD }]}>All</Text>
            </TouchableOpacity>
            {productCategories.map(c => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setActiveCatTab(c.id)}
                style={[styles.catTab, { backgroundColor: activeCatTab === c.id ? GOLD : GOLD_LIGHT }]}
              >
                <Text style={[styles.catTabText, { color: activeCatTab === c.id ? "#fff" : GOLD }]}>
                  {c.icon} {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Scrollable product list */}
          <ScrollView style={styles.sheetScrollBody} showsVerticalScrollIndicator={false}>
            {filteredCats.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🔍</Text>
                <Text style={styles.emptyTitle}>No products found</Text>
                <Text style={styles.emptySub}>Try a different search or filter</Text>
              </View>
            ) : (
              filteredCats.map(cat => (
                <CategoryBlock key={cat.id} cat={cat} activeFilter={activeFilter} />
              ))
            )}

            {/* Trust footer */}
            <LinearGradient colors={["#FFF8E7", "#E8F5EE"]} style={styles.trustFooter}>
              <Text style={styles.trustFooterTitle}>Why Chefgy Recommends These Products</Text>
              <View style={styles.trustPointsGrid}>
                {trustPoints.map(t => (
                  <View key={t} style={styles.trustPointItem}>
                    <CheckCircle2 size={13} color={GREEN_TRUST} />
                    <Text style={styles.trustPointText}>{t}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.trustFooterBottom}>
                <Text style={styles.trustFooterNote}>All products verified by Chefgy QA team</Text>
                <TouchableOpacity style={styles.trustShareBtn}>
                  <Share2 size={11} color={GOLD} />
                  <Text style={styles.trustShareText}>Share</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <View style={{ height: Platform.OS === "ios" ? 40 : 24 }} />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── RECOMMENDED SECTION (trigger card) ──────────────────────────────────────

function RecommendedSection() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const iconBlocks = [
    { icon: <ShieldCheck size={16} color={GOLD} />, label: "Verified", bg: GOLD_LIGHT },
    { icon: <Leaf size={16} color={GREEN_TRUST} />, label: "Organic", bg: GREEN_LIGHT },
    { icon: <Award size={16} color="#E05A2B" />, label: "Certified", bg: "#FFF0EC" },
    { icon: <Sparkles size={16} color="#7D3C98" />, label: "Premium", bg: "#F0F0FF" },
  ];

  return (
    <>
      <View style={styles.recSection}>
        <View style={styles.recCard}>
          {/* Top accent stripe */}
          <LinearGradient
            colors={[GOLD, GREEN_TRUST, GOLD]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.recAccentStripe}
          />

          <View style={styles.recCardInner}>
            {/* Header */}
            <View style={styles.recHeaderRow}>
              <LinearGradient colors={[GOLD, "#E6B93A"]} style={styles.recHeaderIcon}>
                <ShieldCheck size={20} color="#fff" />
              </LinearGradient>
              <View>
                <Text style={styles.recQualityLabel}>Quality Assured</Text>
                <Text style={styles.recTitle}>👨‍🍳 Recommended by Chefgy</Text>
              </View>
            </View>

            <Text style={styles.recDesc}>
              Every ingredient and food product used by our trusted chefs and vendors is carefully
              selected, quality tested, and recommended by Chefgy to ensure authentic taste,
              freshness, hygiene, and safety.
            </Text>

            {/* Icon blocks */}
            <View style={styles.recIconBlocksRow}>
              {iconBlocks.map(b => (
                <View key={b.label} style={[styles.recIconBlock, { backgroundColor: b.bg }]}>
                  {b.icon}
                  <Text style={styles.recIconBlockLabel}>{b.label}</Text>
                </View>
              ))}
            </View>

            {/* Highlight box */}
            <View style={styles.recHighlightBox}>
              <Text style={styles.recHighlightEmoji}>✨</Text>
              <Text style={styles.recHighlightText}>
                <Text style={styles.recHighlightBold}>Authentic Ingredients. Trusted Vendors. Guaranteed Quality. </Text>
                Every Chefgy partner follows our recommended ingredient standards using authentic brands,
                fresh produce, premium spices, hygienic oils, and quality-certified products.
              </Text>
            </View>

            {/* Category preview pills */}
            <View style={styles.recCatPills}>
              {productCategories.slice(0, 6).map(c => (
                <View key={c.id} style={[styles.recCatPill, { backgroundColor: c.color }]}>
                  <Text style={[styles.recCatPillText, { color: c.accent }]}>{c.icon} {c.label}</Text>
                </View>
              ))}
              <View style={[styles.recCatPill, { backgroundColor: "#F5F0EE" }]}>
                <Text style={[styles.recCatPillText, { color: MUTED }]}>+{productCategories.length - 6} more</Text>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity onPress={() => setSheetOpen(true)} activeOpacity={0.9}>
              <LinearGradient
                colors={[GOLD, "#E6A817", GREEN_TRUST]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.recCtaBtn}
              >
                <ShieldCheck size={16} color="#fff" />
                <Text style={styles.recCtaBtnText}>See What We Recommend</Text>
                <ArrowRight size={15} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <RecommendedSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeNav, setActiveNav] = useState(0);
  const [wishlistedOffers, setWishlistedOffers] = useState([]);

  const toggleWishlist = (index) => {
    setWishlistedOffers(p => p.includes(index) ? p.filter(x => x !== index) : [...p, index]);
  };

  // Tapping any card in "Explore Services" opens ServiceVendorsScreen as a
  // separate, full-screen page listing vendors for that specific service
  // (e.g. tapping "Chef" shows a list of chefs, tapping "Bakery" shows a
  // list of bakeries, etc). The whole service object (label/img/accent) is
  // passed along so the vendor screen can theme itself and look up the
  // right sample vendor list.
  const handleServiceNavigation = (svc) => {
    navigation.navigate("ServiceVendorsScreen", { service: svc });
  };

  // Tapping the search bar opens SearchServicesScreen as an overlay (a card
  // hanging from the top, blurring Home behind it) rather than navigating to
  // a separate full-screen route. It expands to full screen once the user
  // types 3+ characters, and collapses back down when the search box is
  // cleared — see SearchServicesScreen.js for that animation logic.
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const openSearch = () => setSearchOverlayOpen(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(250,250,250,0.85)" />
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.locationBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("SelectLocationScreen")}
            >
              <MapPin size={14} color={PRIMARY} />
              <Text style={styles.locationText}>Madhapur, Hyderabad</Text>
              <ChevronRight size={12} color={MUTED} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Bell size={16} color={DARK} />
                <View style={styles.notifDot} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("UserProfile")} activeOpacity={0.8}>
                <LinearGradient colors={[PRIMARY, "#FF8C69"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatar}>
                  <Text style={styles.avatarText}>PA</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingText}>Good Morning, Pavan 👋</Text>
            <Text style={styles.greetingTitle}>Book Amazing Food{"\n"}Experiences</Text>
            <Text style={styles.greetingSub}>Find chefs, caterers & home food near you</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          {/* Search — tapping anywhere on this bar opens SearchServicesScreen */}
          <View style={styles.searchWrap}>
            <TouchableOpacity
              style={styles.searchBox}
              activeOpacity={0.85}
              onPress={openSearch}
            >
              <Search size={18} color={MUTED} />
              <Text style={styles.searchPlaceholder} numberOfLines={1}>
                Search chefs, caterers, home food...
              </Text>
              <View style={styles.searchActions}>
                <TouchableOpacity style={styles.searchMic} activeOpacity={0.7} onPress={openSearch}>
                  <Mic size={15} color={PRIMARY} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchFilter} activeOpacity={0.7} onPress={openSearch}>
                  <SlidersHorizontal size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <BannerCarousel />

          {/* Explore Services */}
          <View style={styles.section}>
            <SectionHeader title="Explore Services" sub="Find the right food service" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {services.map((svc) => (
                <TouchableOpacity
                  key={svc.label}
                  style={styles.svcCard}
                  activeOpacity={0.88}
                  onPress={() => handleServiceNavigation(svc)}
                >
                  <Image source={{ uri: svc.img }} style={styles.svcImage} resizeMode="cover" />
                  <LinearGradient colors={["transparent", `${svc.accent}E6`]} style={styles.svcGradient} />
                  <View style={styles.svcLabelWrap}>
                    <Text style={styles.svcLabel}>{svc.label}</Text>
                  </View>
                  <View style={[styles.svcAccentDot, { backgroundColor: svc.accent }]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Book by Occasion */}
          <View style={styles.section}>
            <SectionHeader title="Book by Occasion" sub="Every moment deserves great food" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {occasions.map((o) => (
                <TouchableOpacity key={o.label} style={styles.occasionCard} activeOpacity={0.88}>
                  <Image source={{ uri: o.img }} style={styles.occasionImage} resizeMode="cover" />
                  <LinearGradient
                    colors={[o.tint, "rgba(0,0,0,0.55)"]}
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    style={styles.occasionGradient}
                  />
                  <Text style={styles.occasionLabel}>{o.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Trending Near You */}
          <View style={styles.section}>
            <SectionHeader title="Trending Near You" sub="Top-rated in Madhapur" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {vendors.map(v => <VendorCard key={v.name} v={v} />)}
            </ScrollView>
          </View>

          {/* Featured Chefs */}
          <View style={styles.section}>
            <SectionHeader title="Featured Chefs" sub="Award-winning culinary talent" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {chefs.map(c => <ChefCard key={c.name} c={c} />)}
            </ScrollView>
          </View>

          {/* Home Food Providers */}
          <View style={styles.section}>
            <SectionHeader title="Top Home Food Providers" sub="Wholesome meals, made with love" action="See all" />
            <View style={styles.homeFoodList}>
              {homeFoodProviders.map(h => (
                <TouchableOpacity key={h.name} style={styles.homeFoodCard} activeOpacity={0.9}>
                  <View style={styles.homeFoodImageWrap}>
                    <Image source={{ uri: h.img }} style={styles.homeFoodImage} resizeMode="cover" />
                  </View>
                  <View style={styles.homeFoodInfo}>
                    <View style={styles.homeFoodNameRow}>
                      <Text style={styles.homeFoodName}>{h.name}</Text>
                      <View style={styles.homeFoodBadge}><Text style={styles.homeFoodBadgeText}>{h.badge}</Text></View>
                    </View>
                    <Text style={styles.homeFoodTag}>{h.tag}</Text>
                    <View style={styles.homeFoodItems}>
                      {h.items.map(item => (
                        <View key={item} style={styles.homeFoodItemChip}>
                          <Text style={styles.homeFoodItemText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.homeFoodBottom}>
                      <StarRow rating={h.rating} />
                      <Text style={styles.homeFoodPrice}>{h.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cloud Kitchens */}
          <View style={styles.section}>
            <SectionHeader title="Popular Cloud Kitchens" sub="Restaurant quality, delivered fast" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {cloudKitchens.map(k => (
                <TouchableOpacity key={k.name} style={styles.cloudCard} activeOpacity={0.9}>
                  <View style={styles.cloudImageWrap}>
                    <Image source={{ uri: k.img }} style={styles.cloudImage} resizeMode="cover" />
                    <LinearGradient colors={["transparent", "rgba(0,0,0,0.3)"]} style={styles.cloudImageOverlay} />
                    <View style={styles.cloudTag}><Text style={styles.cloudTagText}>{k.tag}</Text></View>
                    <View style={styles.cloudOffer}><Text style={styles.cloudOfferText}>{k.offer}</Text></View>
                  </View>
                  <View style={styles.cloudInfo}>
                    <Text style={styles.cloudName}>{k.name}</Text>
                    <Text style={styles.cloudDish} numberOfLines={1}>{k.dish}</Text>
                    <View style={styles.cloudBottom}>
                      <StarRow rating={k.rating} />
                      <View style={styles.cloudTime}>
                        <Clock size={9} color={MUTED} />
                        <Text style={styles.cloudTimeText}>{k.time}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Offers */}
          <View style={styles.section}>
            <SectionHeader title="Today's Offers" sub="Limited-time deals, grab them fast" action="See all" />
            <View style={styles.offersGrid}>
              {offers.map((o, i) => (
                <TouchableOpacity key={o.code} style={styles.offerCard} onPress={() => toggleWishlist(i)} activeOpacity={0.9}>
                  <LinearGradient colors={o.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.offerGradient}>
                    <Text style={styles.offerIcon}>{o.icon}</Text>
                    <Text style={styles.offerTitle}>{o.title}</Text>
                    <Text style={styles.offerSub}>{o.sub}</Text>
                    <View style={styles.offerCode}><Text style={styles.offerCodeText}>Use {o.code}</Text></View>
                    <Heart size={14} style={styles.offerHeart} fill={wishlistedOffers.includes(i) ? "#fff" : "transparent"} stroke="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ─── RECOMMENDED BY CHEFGY ─── */}
          <RecommendedSection />

          {/* Why Choose Us */}
          <View style={styles.section}>
            <SectionHeader title="Why Choose Chefgy" sub="Built for food experiences you'll love" />
            <View style={styles.whyGrid}>
              {whyUs.map(w => (
                <View key={w.title} style={[styles.whyCard, { backgroundColor: w.color }]}>
                  <View style={styles.whyIconWrap}>{renderIcon(w.icon, 22, PRIMARY)}</View>
                  <Text style={styles.whyTitle}>{w.title}</Text>
                  <Text style={styles.whySub}>{w.sub}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Testimonials */}
          <View style={styles.section}>
            <SectionHeader title="Customer Stories" sub="10,000+ five-star experiences" action="See all" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {testimonials.map(t => (
                <View key={t.name} style={styles.testimonialCard}>
                  <View style={styles.testimonialHeader}>
                    <View style={[styles.testimonialAvatar, { backgroundColor: t.avatarBg }]}>
                      <Text style={styles.testimonialAvatarText}>{t.avatar}</Text>
                    </View>
                    <View style={styles.testimonialMeta}>
                      <Text style={styles.testimonialName}>{t.name}</Text>
                      <Text style={styles.testimonialRole}>{t.role}</Text>
                    </View>
                    <View style={styles.testimonialStars}>
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} fill={ACCENT} stroke={ACCENT} />)}
                    </View>
                  </View>
                  <Text style={styles.testimonialReview}>"{t.review}"</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <LinearGradient colors={[PRIMARY, "#FF8C69"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statsCard}>
              <Text style={styles.statsLabel}>OUR NUMBERS</Text>
              <Text style={styles.statsTitle}>India's Largest Food Services Marketplace</Text>
              <View style={styles.statsGrid}>
                {stats.map(st => (
                  <View key={st.label} style={styles.statItem}>
                    <Text style={styles.statIcon}>{st.icon}</Text>
                    <Text style={styles.statValue}>{st.value}</Text>
                    <Text style={styles.statLabel}>{st.label}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* CTA */}
          <View style={styles.section}>
            <View style={styles.ctaWrap}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1680342630889-b475e612a058?w=800&h=400&fit=crop&auto=format" }} style={styles.ctaImage} resizeMode="cover" />
              <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]} style={styles.ctaOverlay} />
              <View style={styles.ctaContent}>
                <Text style={styles.ctaTitle}>Bring Restaurant Quality Food Experiences Home</Text>
                <View style={styles.ctaButtons}>
                  <TouchableOpacity style={styles.ctaBtnPrimary} activeOpacity={0.8}><Text style={styles.ctaBtnPrimaryText}>Book a Chef</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.ctaBtnSecondary} activeOpacity={0.8}><Text style={styles.ctaBtnSecondaryText}>Explore Caterers</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Trust Strip */}
          <View style={styles.trustStrip}>
            {[{ icon: "shield", label: "Verified" }, { icon: "zap", label: "Instant" }, { icon: "trending-up", label: "Trusted" }].map(t => (
              <View key={t.label} style={styles.trustItem}>
                {renderIcon(t.icon, 14, PRIMARY)}
                <Text style={styles.trustLabel}>{t.label}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: Platform.OS === "ios" ? 140 : 120 }} />
        </ScrollView>

        {/* Bottom Nav */}
        <View style={styles.bottomNavWrap}>
          <View style={styles.bottomNav}>
            {navItems.map((item, i) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  setActiveNav(i);
                  if (item.label === "Profile")  navigation.navigate("UserProfile");
                  if (item.label === "Bookings") navigation.navigate("BookingsScreen");
                  if (item.label === "Explore")  navigation.navigate("EventsScreen");
                }}
                style={[styles.navItem, activeNav === i && styles.navItemActive]}
                activeOpacity={0.7}
              >
                {renderIcon(item.icon, 20, activeNav === i ? PRIMARY : MUTED)}
                <Text style={[styles.navLabel, activeNav === i && styles.navLabelActive]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>

      {/* Search overlay: half-hanging card that expands to full screen once
          the user types 3+ characters, blurring/dimming Home behind it. */}
      <SearchServicesScreen
        visible={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF5F2" },
  container: { flex: 1, backgroundColor: BG, maxWidth: 430, alignSelf: "center", width: "100%" },
  scrollContent: { paddingBottom: 20 },

  header: { backgroundColor: "rgba(250,250,250,0.92)", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "rgba(26,26,26,0.06)", zIndex: 40 },
  headerTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  locationBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  locationText: { fontSize: 12, fontWeight: "600", color: DARK },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  notifDot: { position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: PRIMARY },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  headerGreeting: { marginTop: 4 },
  greetingText: { fontSize: 13, color: MUTED, fontWeight: "500", marginBottom: 2 },
  greetingTitle: { fontSize: 22, fontWeight: "700", color: DARK, lineHeight: 28 },
  greetingSub: { fontSize: 12, color: MUTED, marginTop: 2 },

  searchWrap: { paddingHorizontal: 16, paddingVertical: 16 },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  searchPlaceholder: { flex: 1, fontSize: 14, color: MUTED },
  searchActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  searchMic: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#FFF5F2", alignItems: "center", justifyContent: "center" },
  searchFilter: { width: 32, height: 32, borderRadius: 16, backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center" },

  bannerContainer: { paddingHorizontal: 16, marginBottom: 24 },
  bannerWrapper: { borderRadius: 24, overflow: "hidden", height: 200, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 32, elevation: 8 },
  bannerImage: { position: "absolute", width: "100%", height: "100%" },
  bannerGradient: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  bannerContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 },
  bannerBadge: { alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 },
  bannerBadgeText: { fontSize: 10, fontWeight: "700", color: "#fff" },
  bannerTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 4 },
  bannerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 12 },
  bannerCta: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: PRIMARY, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  bannerCtaText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  bannerArrow: { position: "absolute", top: "50%", marginTop: -14, width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" },
  bannerDots: { position: "absolute", bottom: 12, right: 20, flexDirection: "row", gap: 6 },
  bannerDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.45)" },
  bannerDotActive: { width: 18, backgroundColor: "#fff" },

  section: { marginBottom: 28 },
  sectionHeader: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: DARK, lineHeight: 22 },
  sectionSub: { fontSize: 12, color: MUTED, marginTop: 2 },
  sectionAction: { flexDirection: "row", alignItems: "center", gap: 2 },
  sectionActionText: { fontSize: 12, fontWeight: "600", color: PRIMARY },

  svcCard: { width: 100, height: 120, borderRadius: 18, overflow: "hidden", backgroundColor: "#eee", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  svcImage: { position: "absolute", width: "100%", height: "100%" },
  svcGradient: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  svcLabelWrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 8, paddingBottom: 10, paddingTop: 20 },
  svcLabel: { fontSize: 11, fontWeight: "800", color: "#fff", textAlign: "center", lineHeight: 14 },
  svcAccentDot: { position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4 },

  occasionCard: { width: 90, height: 110, borderRadius: 18, overflow: "hidden", backgroundColor: "#eee", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  occasionImage: { position: "absolute", width: "100%", height: "100%" },
  occasionGradient: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  occasionLabel: { position: "absolute", bottom: 9, left: 0, right: 0, fontSize: 10, fontWeight: "800", color: "#fff", textAlign: "center" },

  hScroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },

  vendorCard: { width: 220, borderRadius: 20, overflow: "hidden", backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4 },
  vendorImageWrap: { height: 130, backgroundColor: "#FFEDD5", position: "relative" },
  vendorImage: { width: "100%", height: "100%" },
  vendorHeartBtn: { position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.9)", alignItems: "center", justifyContent: "center" },
  vendorBadge: { position: "absolute", top: 10, left: 10, backgroundColor: PRIMARY, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  vendorBadgeText: { fontSize: 10, fontWeight: "700", color: "#fff" },
  vendorLogo: { position: "absolute", bottom: 10, left: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.95)", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 3 },
  vendorLogoText: { fontSize: 16 },
  vendorInfo: { padding: 12 },
  vendorNameRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 2 },
  vendorName: { fontSize: 13, fontWeight: "700", color: DARK },
  vendorTag: { fontSize: 11, color: MUTED, marginBottom: 8 },
  vendorMetaRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  vendorPrice: { fontSize: 10, fontWeight: "600", color: PRIMARY },
  vendorBottomRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  vendorDist: { flexDirection: "row", alignItems: "center", gap: 2 },
  vendorDistText: { fontSize: 10, color: MUTED },
  vendorEvents: { fontSize: 10, color: MUTED },

  starRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  starRating: { marginLeft: 4, fontSize: 12, fontWeight: "600", color: DARK },

  chefCard: { width: 175, borderRadius: 20, overflow: "hidden", backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 20, elevation: 4 },
  chefImageWrap: { height: 155, backgroundColor: "#FFF7ED", position: "relative" },
  chefImage: { width: "100%", height: "100%" },
  chefImageOverlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  chefSpeciality: { position: "absolute", top: 8, left: 8, backgroundColor: "rgba(255,77,77,0.85)", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  chefSpecialityText: { fontSize: 9, fontWeight: "700", color: "#fff" },
  chefStarOverlay: { position: "absolute", bottom: 8, left: 8, right: 8 },
  chefInfo: { padding: 12 },
  chefName: { fontSize: 12, fontWeight: "700", color: DARK },
  chefCuisine: { fontSize: 10, color: MUTED, marginTop: 2, marginBottom: 4 },
  chefTags: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  chefExpBadge: { backgroundColor: "#F5F0EE", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  chefExpText: { fontSize: 10, fontWeight: "600", color: DARK },
  chefAvailBadge: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  chefAvailText: { fontSize: 9, fontWeight: "600" },
  chefBookBtn: { backgroundColor: "#FFF5F2", borderRadius: 12, paddingVertical: 8, alignItems: "center" },
  chefBookText: { fontSize: 11, fontWeight: "700", color: PRIMARY },

  homeFoodList: { paddingHorizontal: 16, gap: 12 },
  homeFoodCard: { flexDirection: "row", borderRadius: 20, overflow: "hidden", backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 4 },
  homeFoodImageWrap: { width: 112, height: 96, backgroundColor: "#FFF7ED" },
  homeFoodImage: { width: "100%", height: "100%" },
  homeFoodInfo: { flex: 1, paddingVertical: 12, paddingRight: 12, paddingLeft: 12 },
  homeFoodNameRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  homeFoodName: { fontSize: 13, fontWeight: "700", color: DARK },
  homeFoodBadge: { backgroundColor: SUCCESS, borderRadius: 20, paddingHorizontal: 6, paddingVertical: 1 },
  homeFoodBadgeText: { fontSize: 9, fontWeight: "700", color: "#fff" },
  homeFoodTag: { fontSize: 11, color: MUTED, marginBottom: 6 },
  homeFoodItems: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 6 },
  homeFoodItemChip: { backgroundColor: "#F5F0EE", borderRadius: 20, paddingHorizontal: 6, paddingVertical: 2 },
  homeFoodItemText: { fontSize: 9, color: DARK, fontWeight: "500" },
  homeFoodBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  homeFoodPrice: { fontSize: 11, fontWeight: "700", color: PRIMARY },

  cloudCard: { width: 185, borderRadius: 20, overflow: "hidden", backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 4 },
  cloudImageWrap: { height: 120, backgroundColor: "#FFF7ED", position: "relative" },
  cloudImage: { width: "100%", height: "100%" },
  cloudImageOverlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  cloudTag: { position: "absolute", top: 8, left: 8, backgroundColor: "rgba(255,209,102,0.9)", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  cloudTagText: { fontSize: 9, fontWeight: "700", color: DARK },
  cloudOffer: { position: "absolute", top: 8, right: 8, backgroundColor: PRIMARY, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  cloudOfferText: { fontSize: 9, fontWeight: "700", color: "#fff" },
  cloudInfo: { padding: 12 },
  cloudName: { fontSize: 12, fontWeight: "700", color: DARK },
  cloudDish: { fontSize: 10, color: MUTED, marginTop: 2, marginBottom: 8 },
  cloudBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cloudTime: { flexDirection: "row", alignItems: "center", gap: 2 },
  cloudTimeText: { fontSize: 10, color: MUTED },

  offersGrid: { paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  offerCard: { width: (SCREEN_W - 32 - 12) / 2, borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 5 },
  offerGradient: { padding: 16, minHeight: 150 },
  offerIcon: { fontSize: 24, marginBottom: 8 },
  offerTitle: { fontSize: 15, fontWeight: "900", color: "#fff", marginBottom: 4 },
  offerSub: { fontSize: 10, color: "rgba(255,255,255,0.8)", lineHeight: 14 },
  offerCode: { marginTop: 12, alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  offerCodeText: { fontSize: 10, fontWeight: "700", color: "#fff" },
  offerHeart: { position: "absolute", top: 12, right: 12 },

  // ─── Recommended Section ────────────────────────────────────────────────
  recSection: { marginBottom: 28, paddingHorizontal: 16 },
  recCard: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFDF5",
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: `${GOLD}44`,
  },
  recAccentStripe: { height: 4, width: "100%" },
  recCardInner: { padding: 20 },
  recHeaderRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  recHeaderIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  recQualityLabel: { fontSize: 10, fontWeight: "700", color: GOLD, letterSpacing: 1.5, textTransform: "uppercase" },
  recTitle: { fontSize: 17, fontWeight: "900", color: DARK, lineHeight: 22 },
  recDesc: { fontSize: 11, color: "#5A5550", lineHeight: 17, marginBottom: 16 },
  recIconBlocksRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  recIconBlock: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 14, gap: 6 },
  recIconBlockLabel: { fontSize: 9, fontWeight: "700", color: DARK },
  recHighlightBox: { flexDirection: "row", gap: 10, borderRadius: 16, padding: 12, marginBottom: 16, backgroundColor: `${GOLD}14`, borderWidth: 1, borderColor: `${GOLD}33` },
  recHighlightEmoji: { fontSize: 22 },
  recHighlightText: { flex: 1, fontSize: 11, color: "#5A5550", lineHeight: 16 },
  recHighlightBold: { fontWeight: "700", color: DARK },
  recCatPills: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 16 },
  recCatPill: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
  recCatPillText: { fontSize: 9, fontWeight: "700" },
  recCtaBtn: { borderRadius: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  recCtaBtnText: { fontSize: 13, fontWeight: "900", color: "#fff", letterSpacing: 0.2 },

  // ─── Recommended Sheet ──────────────────────────────────────────────────
  sheetBackdrop: { flex: 1, backgroundColor: "rgba(10,10,10,0.55)", justifyContent: "flex-end" },
  sheetContainer: {
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: Dimensions.get("window").height * 0.90,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.22,
    shadowRadius: 48,
    elevation: 20,
  },
  sheetDragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: "#D0C8C4", alignSelf: "center", marginTop: 12, marginBottom: 4 },

  sheetHeaderGrad: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.07)" },
  sheetHeaderRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 },
  sheetHeaderLeft: { flex: 1 },
  sheetHeaderBadgeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  sheetHeaderBadgeIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: GOLD, alignItems: "center", justifyContent: "center" },
  sheetHeaderBadgeLabel: { fontSize: 11, fontWeight: "700", color: GOLD, letterSpacing: 1.5, textTransform: "uppercase" },
  sheetHeaderTitle: { fontSize: 20, fontWeight: "900", color: DARK },
  sheetHeaderSub: { fontSize: 11, color: MUTED, marginTop: 2 },
  sheetCloseBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.08)", alignItems: "center", justifyContent: "center", marginLeft: 12 },
  sheetBadgeScroll: { flexGrow: 0 },
  sheetTrustBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  sheetTrustBadgeText: { fontSize: 10, fontWeight: "700", color: GREEN_TRUST },

  sheetSearchWrap: { backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.06)" },
  sheetSearchBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F5F0EE", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  sheetSearchInput: { flex: 1, fontSize: 13, color: DARK },
  sheetFilterRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  filterChip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  filterChipText: { fontSize: 10, fontWeight: "700" },

  catTabsScroll: { backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.05)", maxHeight: 44 },
  catTabsContent: { paddingHorizontal: 16, paddingVertical: 6, gap: 8 },
  catTab: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  catTabText: { fontSize: 10, fontWeight: "700" },

  sheetScrollBody: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },

  categoryBlock: { marginBottom: 12 },
  categoryHeader: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 18 },
  categoryHeaderImg: { width: 44, height: 44, borderRadius: 12 },
  categoryHeaderText: { flex: 1 },
  categoryHeaderTitle: { fontSize: 13, fontWeight: "700", color: DARK },
  categoryHeaderSub: { fontSize: 10, color: MUTED, marginTop: 2 },
  categoryChevronBox: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  categoryProducts: { marginTop: 8, gap: 8 },

  productCard: { backgroundColor: "#fff", borderRadius: 18, padding: 12, flexDirection: "row", gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 2, borderWidth: 1, borderColor: "rgba(0,0,0,0.05)" },
  productIconBox: { width: 56, height: 56, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  productIconText: { fontSize: 24 },
  productInfo: { flex: 1 },
  productTopRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 4 },
  productName: { flex: 1, fontSize: 12, fontWeight: "700", color: DARK, lineHeight: 16 },
  bookmarkBtn: { padding: 2 },
  productDesc: { fontSize: 10, color: MUTED, marginTop: 3, lineHeight: 14 },
  productTagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 },
  productBadgePill: { backgroundColor: GOLD_LIGHT, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  productBadgeText: { fontSize: 9, fontWeight: "700", color: GOLD },
  productTagPill: { backgroundColor: GREEN_LIGHT, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  productTagText: { fontSize: 9, fontWeight: "600", color: GREEN_TRUST },
  productCertRow: { flexDirection: "row", gap: 12, marginTop: 8 },
  productCertItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  productCertText: { fontSize: 9, color: MUTED },

  emptyState: { alignItems: "center", paddingVertical: 48 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 14, fontWeight: "700", color: DARK },
  emptySub: { fontSize: 11, color: MUTED, marginTop: 4 },

  trustFooter: { borderRadius: 20, padding: 16, marginTop: 16, borderWidth: 1, borderColor: `${GOLD}33` },
  trustFooterTitle: { fontSize: 12, fontWeight: "700", color: DARK, marginBottom: 12 },
  trustPointsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  trustPointItem: { width: "48%", flexDirection: "row", alignItems: "center", gap: 6 },
  trustPointText: { fontSize: 10, fontWeight: "600", color: DARK },
  trustFooterBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16 },
  trustFooterNote: { fontSize: 10, color: MUTED },
  trustShareBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  trustShareText: { fontSize: 10, fontWeight: "700", color: GOLD },

  whyGrid: { paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  whyCard: { width: (SCREEN_W - 32 - 12) / 2, borderRadius: 20, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  whyIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  whyTitle: { fontSize: 12, fontWeight: "700", color: DARK, marginBottom: 2 },
  whySub: { fontSize: 10, color: MUTED, lineHeight: 14 },

  testimonialCard: { width: 250, borderRadius: 20, padding: 16, backgroundColor: "rgba(255,255,255,0.75)", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.8)" },
  testimonialHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  testimonialAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  testimonialAvatarText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  testimonialMeta: { flex: 1 },
  testimonialName: { fontSize: 12, fontWeight: "700", color: DARK },
  testimonialRole: { fontSize: 10, color: MUTED },
  testimonialStars: { flexDirection: "row", gap: 2 },
  testimonialReview: { fontSize: 11, color: "#4A4A4A", lineHeight: 18, fontStyle: "italic" },

  statsCard: { marginHorizontal: 16, borderRadius: 24, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 32, elevation: 8 },
  statsLabel: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.8)", letterSpacing: 2, marginBottom: 4 },
  statsTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 16 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  statItem: { width: (SCREEN_W - 32 - 40 - 12) / 2, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.15)", padding: 12 },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: "900", color: "#fff" },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: "500", marginTop: 2 },

  ctaWrap: { marginHorizontal: 16, borderRadius: 24, overflow: "hidden", height: 220, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 32, elevation: 8 },
  ctaImage: { position: "absolute", width: "100%", height: "100%" },
  ctaOverlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  ctaContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 },
  ctaTitle: { fontSize: 18, fontWeight: "700", color: "#fff", lineHeight: 24, marginBottom: 12 },
  ctaButtons: { flexDirection: "row", gap: 8 },
  ctaBtnPrimary: { flex: 1, backgroundColor: PRIMARY, borderRadius: 12, paddingVertical: 10, alignItems: "center" },
  ctaBtnPrimaryText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  ctaBtnSecondary: { flex: 1, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, paddingVertical: 10, alignItems: "center" },
  ctaBtnSecondaryText: { fontSize: 12, fontWeight: "700", color: "#fff" },

  trustStrip: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 24, paddingHorizontal: 16, marginTop: 4, marginBottom: 8 },
  trustItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  trustLabel: { fontSize: 11, fontWeight: "600", color: MUTED },

  bottomNavWrap: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingBottom: Platform.OS === "ios" ? 36 : 20, paddingTop: 8, zIndex: 50, backgroundColor: "transparent" },
  bottomNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 24, paddingVertical: 12, paddingHorizontal: 8, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.10, shadowRadius: 24, elevation: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.8)" },
  navItem: { alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  navItemActive: { backgroundColor: "#FFF5F2" },
  navLabel: { fontSize: 9, fontWeight: "700", color: MUTED },
  navLabelActive: { color: PRIMARY },
});