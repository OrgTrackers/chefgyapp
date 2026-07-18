import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
  PanResponder,
} from "react-native";
import {
  ArrowLeft,
  Search,
  X,
  Star,
  ChevronRight,
  MapPin,
  BadgeCheck,
  SlidersHorizontal,
  Minus,
  Plus,
} from "lucide-react-native";

// ── Colors (matches SearchServicesScreen / Chefgy brand) ────────────────────

const COLORS = {
  // orange: "#FF4D4D",
  // orangeDark: "#E63946",
    primary: "#FA5726",
  orange: "#FA5726",
  orangeDark: "#E84A1A",
  gray900: "#111111",
  gray800: "#1f2937",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  gray50: "#f9fafb",
  green600: "#16a34a",
  red400: "#f87171",
  white: "#ffffff",
};

// ── Per-service meta (title, subtitle, accent, empty-state copy) ────────────

const SERVICE_META = {
  Chef: {
    subtitle: "Personal chefs for every occasion",
    accent: "#FA5726",
    searchPlaceholder: "Search chefs by name or cuisine",
  },
  Caterer: {
    subtitle: "Catering companies for events big & small",
    accent: "#FF9F43",
    searchPlaceholder: "Search caterers by name or cuisine",
  },
  "Home Food": {
    subtitle: "Home-cooked meals from local kitchens",
    accent: "#34C759",
    searchPlaceholder: "Search home kitchens",
  },
  "Cloud Kitchen": {
    subtitle: "Restaurant-quality food, delivered fast",
    accent: "#2196F3",
    searchPlaceholder: "Search cloud kitchens",
  },
  "Food Truck": {
    subtitle: "Street food & live counters near you",
    accent: "#FFD166",
    searchPlaceholder: "Search food trucks",
  },
  Bakery: {
    subtitle: "Cakes, pastries & fresh bakes",
    accent: "#E91E63",
    searchPlaceholder: "Search bakeries",
  },
  "Live Counter": {
    subtitle: "Live cooking counters for events",
    accent: "#9C27B0",
    searchPlaceholder: "Search live counter vendors",
  },
  "Event Food": {
    subtitle: "Full-service food for weddings & events",
    accent: "#00BCD4",
    searchPlaceholder: "Search event food specialists",
  },
};

const DEFAULT_META = {
  subtitle: "Find the right vendor for you",
  accent: COLORS.orange,
  searchPlaceholder: "Search vendors",
};

// ── Sample vendor data, grouped by service label ─────────────────────────────
// Each entry intentionally mirrors the shape used in SearchServicesScreen.js
// so both screens can share the same VendorDetailScreen-style layout.

const VENDORS_BY_SERVICE = {
  Chef: [
    { id: "chef-1", name: "Chef Priya Sharma", tag: "South Indian • Continental", image: "https://images.unsplash.com/photo-1640583342012-4622f31b650d?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "1.4K", distance: "1.8 km", price: "₹₹₹", available: true, badge: "Wedding Specialist" },
    { id: "chef-2", name: "Chef Rahul Mehra", tag: "Mughlai • Tandoor", image: "https://images.unsplash.com/photo-1503453776591-b4548af666a2?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "980", distance: "3.1 km", price: "₹₹", available: false, badge: "Kebab Master" },
    { id: "chef-3", name: "Chef Anjali Nair", tag: "Kerala • Fusion", image: "https://images.unsplash.com/photo-1731156679850-e73fbc21564c?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "612", distance: "2.6 km", price: "₹₹", available: true, badge: "Seafood Expert" },
    { id: "chef-4", name: "Chef Arjun — BBQ Master", tag: "BBQ • Grill", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "736", distance: "3.3 km", price: "₹₹", available: true, badge: "BBQ Chef" },
    { id: "chef-5", name: "Chef Meera Iyer", tag: "Vegan • Healthy Bowls", image: "https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "504", distance: "1.5 km", price: "₹₹", available: true, badge: "Healthy Food" },
    { id: "chef-6", name: "Chef Karthik Rao", tag: "Chettinad • Andhra", image: "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "349", distance: "4.0 km", price: "₹₹", available: false, badge: "Spice Specialist" },
    { id: "chef-7", name: "Chef Fatima Sheikh", tag: "Mughlai • Biryani", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "1.1K", distance: "2.2 km", price: "₹₹₹", available: true, badge: "Biryani Expert" },
    { id: "chef-8", name: "Chef Daniel Fernandes", tag: "Continental • Italian", image: "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "421", distance: "3.7 km", price: "₹₹₹", available: true, badge: "Pasta Specialist" },
  ],
  Caterer: [
    { id: "cat-1", name: "Royal Caterers", tag: "Premium Catering", image: "https://images.unsplash.com/photo-1680342630889-b475e612a058?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "2.3K", distance: "2.1 km", price: "₹₹₹", available: true, badge: "Top Choice" },
    { id: "cat-2", name: "Cheers Catering Co.", tag: "Multi-cuisine Buffets", image: "https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=300&h=300&fit=crop&auto=format", rating: 4.3, reviews: "1.5K", distance: "3.8 km", price: "₹₹", available: true, badge: "Popular" },
    { id: "cat-3", name: "Spice Route Caterers", tag: "North Indian • Mughlai", image: "https://images.unsplash.com/photo-1653233797467-1a528819fd4f?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "890", distance: "4.4 km", price: "₹₹", available: true, badge: "Family Favourite" },
    { id: "cat-4", name: "Golden Feast Catering", tag: "South Indian • Traditional", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "670", distance: "1.9 km", price: "₹₹", available: false, badge: "Traditional" },
    { id: "cat-5", name: "Urban Plate Caterers", tag: "Contemporary • Fusion", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=300&fit=crop&auto=format", rating: 4.4, reviews: "512", distance: "5.0 km", price: "₹₹₹", available: true, badge: "Trending" },
    { id: "cat-6", name: "Heritage Banquet Caterers", tag: "Weddings • Large Events", image: "https://images.unsplash.com/photo-1583338917496-7ea264c374ce?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "1.8K", distance: "6.2 km", price: "₹₹₹", available: true, badge: "500+ Events" },
    { id: "cat-7", name: "GreenLeaf Vegetarian Caterers", tag: "Pure Veg • Jain Food", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "735", distance: "2.7 km", price: "₹₹", available: true, badge: "Pure Veg" },
    { id: "cat-8", name: "Chefgy Corporate Meals", tag: "Corporate Lunches", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&auto=format", rating: 4.4, reviews: "189", distance: "2.8 km", price: "₹₹", available: true, badge: "Corporate" },
  ],
  "Home Food": [
    { id: "hf-1", name: "Amma's Kitchen", tag: "Veg • South Indian", image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "1.2K", distance: "0.9 km", price: "₹120/meal", available: true, badge: "Home Chef" },
    { id: "hf-2", name: "Nani's Tiffin", tag: "Non-Veg • North Indian", image: "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "845", distance: "1.4 km", price: "₹180/meal", available: true, badge: "Diet Friendly" },
    { id: "hf-3", name: "Chef Ramesh's Home Kitchen", tag: "Home Food • Andhra", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "643", distance: "2.4 km", price: "₹150/meal", available: true, badge: "Spicy" },
    { id: "hf-4", name: "Ghar Ka Khana", tag: "Veg & Non-Veg • Punjabi", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "410", distance: "3.0 km", price: "₹160/meal", available: false, badge: "Home Style" },
    { id: "hf-5", name: "Maa's Meals", tag: "Bengali • Fish Curry", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "358", distance: "2.1 km", price: "₹170/meal", available: true, badge: "Authentic" },
    { id: "hf-6", name: "Grandma's Recipes", tag: "Multi-cuisine Home Food", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "920", distance: "1.1 km", price: "₹140/meal", available: true, badge: "Bestseller" },
    { id: "hf-7", name: "Home Bites by Kavya", tag: "Vegan • Millet Meals", image: "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "276", distance: "1.7 km", price: "₹150/meal", available: true, badge: "Healthy" },
    { id: "hf-8", name: "Sundari's Tiffin Service", tag: "Tiffin Service • Daily Meals", image: "https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "388", distance: "1.7 km", price: "₹110/meal", available: false, badge: "Subscription" },
  ],
  "Cloud Kitchen": [
    { id: "ck-1", name: "Biryani Bros", tag: "Hyderabadi Dum Biryani", image: "https://images.unsplash.com/photo-1676826579382-2ab5b56a5dc1?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "3.1K", distance: "1.0 km", price: "₹₹", available: true, badge: "Bestseller" },
    { id: "ck-2", name: "Bowl & Co.", tag: "Superfood Buddha Bowls", image: "https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "1.6K", distance: "1.6 km", price: "₹₹", available: true, badge: "Healthy" },
    { id: "ck-3", name: "Pizza Republic", tag: "Wood-fired Pizza", image: "https://images.unsplash.com/photo-1661163081367-d4c17da3e259?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "2.0K", distance: "2.2 km", price: "₹₹", available: true, badge: "Trending" },
    { id: "ck-4", name: "Chef's Cloud Kitchen", tag: "Multi-cuisine Delivery", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=300&fit=crop&auto=format", rating: 4.1, reviews: "512", distance: "0.9 km", price: "₹₹", available: true, badge: "Fast Delivery" },
    { id: "ck-5", name: "Wrap Street", tag: "Rolls • Wraps • Shawarma", image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "740", distance: "1.3 km", price: "₹", available: true, badge: "Quick Bites" },
    { id: "ck-6", name: "Noodle House", tag: "Pan-Asian • Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop&auto=format", rating: 4.4, reviews: "605", distance: "2.9 km", price: "₹₹", available: false, badge: "Popular" },
    { id: "ck-7", name: "Curry Cloud", tag: "North Indian Curries", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "889", distance: "1.8 km", price: "₹₹", available: true, badge: "Chef's Pick" },
    { id: "ck-8", name: "Green Bowl Kitchen", tag: "Salads • Vegan", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "412", distance: "2.4 km", price: "₹₹", available: true, badge: "Diet Friendly" },
  ],
  "Food Truck": [
    { id: "ft-1", name: "Spice Street Truck", tag: "Street Food • Live Counters", image: "https://images.unsplash.com/photo-1765478006672-463264014e78?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "1.1K", distance: "4.0 km", price: "₹", available: true, badge: "Trending" },
    { id: "ft-2", name: "Cheerful Food Truck", tag: "Burgers • Fries", image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=300&h=300&fit=crop&auto=format", rating: 4.0, reviews: "214", distance: "4.5 km", price: "₹", available: true, badge: "Fast Bites" },
    { id: "ft-3", name: "Taco Wheels", tag: "Mexican • Tacos", image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "398", distance: "3.6 km", price: "₹", available: true, badge: "Crowd Favourite" },
    { id: "ft-4", name: "Chaat On Wheels", tag: "Indian Chaat • Golgappa", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "670", distance: "1.9 km", price: "₹", available: true, badge: "Local Favourite" },
    { id: "ft-5", name: "Grill & Go", tag: "BBQ • Grilled Sandwiches", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=300&h=300&fit=crop&auto=format", rating: 4.4, reviews: "312", distance: "5.1 km", price: "₹₹", available: false, badge: "BBQ" },
    { id: "ft-6", name: "Wok This Way", tag: "Asian Stir Fry", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300&h=300&fit=crop&auto=format", rating: 4.3, reviews: "245", distance: "3.3 km", price: "₹₹", available: true, badge: "Popular" },
    { id: "ft-7", name: "The Waffle Truck", tag: "Desserts • Waffles", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "560", distance: "2.5 km", price: "₹", available: true, badge: "Sweet Tooth" },
    { id: "ft-8", name: "Coastal Curry Truck", tag: "Seafood • Coastal", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "301", distance: "4.8 km", price: "₹₹", available: true, badge: "Seafood" },
  ],
  Bakery: [
    { id: "bk-1", name: "Cheeni Bake Studio", tag: "Cakes • Pastries", image: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "920", distance: "2.1 km", price: "₹₹", available: true, badge: "Custom Cakes" },
    { id: "bk-2", name: "Sugar & Slice", tag: "Designer Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "615", distance: "1.5 km", price: "₹₹₹", available: true, badge: "Designer" },
    { id: "bk-3", name: "The Bread Basket", tag: "Artisan Breads", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "430", distance: "3.2 km", price: "₹", available: true, badge: "Fresh Daily" },
    { id: "bk-4", name: "Choco Craft Bakery", tag: "Chocolates • Brownies", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "812", distance: "1.8 km", price: "₹₹", available: false, badge: "Chocolate Lover" },
    { id: "bk-5", name: "Petit Four Patisserie", tag: "French Pastries", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "356", distance: "4.1 km", price: "₹₹₹", available: true, badge: "Premium" },
    { id: "bk-6", name: "Wedding Cake Co.", tag: "Wedding & Event Cakes", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "289", distance: "5.0 km", price: "₹₹₹", available: true, badge: "Event Specialist" },
    { id: "bk-7", name: "Muffin Mansion", tag: "Cupcakes • Muffins", image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "198", distance: "2.6 km", price: "₹", available: true, badge: "Kids' Favourite" },
    { id: "bk-8", name: "GlutenFree Bakes", tag: "Gluten-Free • Vegan Bakes", image: "https://images.unsplash.com/photo-1587736318898-9df97a37cd0e?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "142", distance: "3.4 km", price: "₹₹", available: true, badge: "Diet Friendly" },
  ],
  "Live Counter": [
    { id: "lc-1", name: "Dosa Live Counter Co.", tag: "Live Dosa • South Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "540", distance: "2.0 km", price: "₹₹", available: true, badge: "Crowd Favourite" },
    { id: "lc-2", name: "Chaat Live Station", tag: "Live Chaat Counter", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "410", distance: "1.6 km", price: "₹", available: true, badge: "Popular" },
    { id: "lc-3", name: "Pasta Live Kitchen", tag: "Live Pasta Counter", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "268", distance: "3.5 km", price: "₹₹₹", available: true, badge: "Event Favourite" },
    { id: "lc-4", name: "Tandoor Live Grill", tag: "Live Tandoor Counter", image: "https://images.unsplash.com/photo-1621996659490-3403f0d743c2?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "612", distance: "2.8 km", price: "₹₹", available: false, badge: "Wedding Favourite" },
    { id: "lc-5", name: "Ice Cream Live Rolls", tag: "Live Ice Cream Counter", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "355", distance: "1.9 km", price: "₹₹", available: true, badge: "Dessert Live" },
    { id: "lc-6", name: "Momo Live Counter", tag: "Live Momos • Asian", image: "https://images.unsplash.com/photo-1626804475297-411d6b8b2762?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "289", distance: "3.0 km", price: "₹", available: true, badge: "Trending" },
    { id: "lc-7", name: "Sushi Live Rolls", tag: "Live Sushi Counter", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "203", distance: "4.2 km", price: "₹₹₹", available: true, badge: "Premium" },
    { id: "lc-8", name: "Live Pancake Bar", tag: "Live Pancake • Waffle Bar", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "175", distance: "2.3 km", price: "₹₹", available: true, badge: "Brunch Favourite" },
  ],
  "Event Food": [
    { id: "ef-1", name: "Chefs for Events", tag: "Event Catering", image: "https://images.unsplash.com/photo-1536392706976-e486e2ba97af?w=300&h=300&fit=crop&auto=format", rating: 4.4, reviews: "1.2K", distance: "5.2 km", price: "₹₹₹", available: false, badge: "500+ Events" },
    { id: "ef-2", name: "Chef's Wedding Catering", tag: "Wedding Catering", image: "https://images.unsplash.com/photo-1583338917496-7ea264c374ce?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "301", distance: "6.1 km", price: "₹₹₹", available: true, badge: "Wedding Specialist" },
    { id: "ef-3", name: "Gala Event Caterers", tag: "Corporate Galas", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "480", distance: "4.7 km", price: "₹₹₹", available: true, badge: "Corporate" },
    { id: "ef-4", name: "Festive Feast Catering", tag: "Festival & Cultural Events", image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=300&h=300&fit=crop&auto=format", rating: 4.7, reviews: "356", distance: "3.9 km", price: "₹₹", available: true, badge: "Festive Special" },
    { id: "ef-5", name: "Birthday Bash Caterers", tag: "Birthdays • Kids Parties", image: "https://images.unsplash.com/photo-1545696563-af8f6ec2295a?w=300&h=300&fit=crop&auto=format", rating: 4.8, reviews: "410", distance: "2.5 km", price: "₹₹", available: true, badge: "Family Friendly" },
    { id: "ef-6", name: "Grand Banquet Catering", tag: "Large Scale Events", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop&auto=format", rating: 4.6, reviews: "690", distance: "7.0 km", price: "₹₹₹", available: true, badge: "1000+ Guests" },
    { id: "ef-7", name: "Garden Party Caterers", tag: "Outdoor • Garden Events", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop&auto=format", rating: 4.5, reviews: "220", distance: "3.3 km", price: "₹₹", available: false, badge: "Outdoor Specialist" },
    { id: "ef-8", name: "Anniversary Elite Catering", tag: "Anniversaries • Intimate Events", image: "https://images.unsplash.com/photo-1529516222410-a269d812f320?w=300&h=300&fit=crop&auto=format", rating: 4.9, reviews: "312", distance: "2.9 km", price: "₹₹₹", available: true, badge: "Premium" },
  ],
};

// ── Filter modal config ──────────────────────────────────────────────────────
// Note: this filter UI is purely presentational/local state for now — it does
// not change which vendors are shown, so the existing list/search behaviour
// stays exactly as it was.

const FILTER_CATEGORIES = ["Fast food", "European", "Italian", "Mexican", "Japanese", "French"];
const RATING_OPTIONS = [1, 2, 3, 4, 5];
const DISTANCE_MIN = 1;
const DISTANCE_MAX = 20;
const PRICE_MIN = 70;
const PRICE_MAX = 125;

const PAX_MIN = 1;
const PAX_MAX = 1000;

function getDefaultFilters() {
  return {
    categories: ["Italian"],
    distance: 2,
    ratings: [3, 4],
    minPax: 10,
    maxPax: 100,
    priceFraction: 0.55,
  };
}

function getMeta(label) {
  return SERVICE_META[label] ?? DEFAULT_META;
}

function getVendors(label) {
  return VENDORS_BY_SERVICE[label] ?? [];
}

// ── Vendor detail screen ─────────────────────────────────────────────────────

function VendorDetailScreen({ vendor, service, onBack }) {
  const meta = getMeta(service.label);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton} hitSlop={8}>
          <ArrowLeft size={20} color={COLORS.gray900} strokeWidth={2.5} />
        </TouchableOpacity>
        <View>
          <Text style={styles.detailEyebrow}>{service.label}</Text>
          <Text style={styles.detailTitle} numberOfLines={1}>{vendor.name}</Text>
        </View>
      </View>

      <View style={styles.detailBody}>
        <View style={styles.detailAvatarWrap}>
          <Image source={{ uri: vendor.image }} style={styles.detailAvatar} />
        </View>

        <Text style={styles.detailName}>{vendor.name}</Text>
        <Text style={styles.detailTag}>{vendor.tag}</Text>

        <View style={[styles.detailBadgePill, { borderColor: meta.accent }]}>
          <BadgeCheck size={12} color={meta.accent} />
          <Text style={[styles.detailBadgeText, { color: meta.accent }]}>{vendor.badge}</Text>
        </View>

        <View style={styles.detailMetaRow}>
          <View style={styles.starBadgeLg}>
            <Star size={10} color={COLORS.white} fill={COLORS.white} />
          </View>
          <Text style={styles.detailRating}>{vendor.rating}</Text>
          <Text style={styles.detailMetaDim}>({vendor.reviews})</Text>
          <Text style={styles.detailDot}>·</Text>
          <MapPin size={12} color={COLORS.gray400} />
          <Text style={styles.detailMetaText}>{vendor.distance}</Text>
          <Text style={styles.detailDot}>·</Text>
          <Text style={styles.detailMetaText}>{vendor.price}</Text>
        </View>

        <Text
          style={[
            styles.detailAvailability,
            { color: vendor.available ? COLORS.green600 : COLORS.red400 },
          ]}
        >
          {vendor.available ? "● Available Now" : "● Currently Unavailable"}
        </Text>

        <TouchableOpacity style={[styles.detailCtaButton, { backgroundColor: meta.accent }]}>
          <Text style={styles.detailCtaButtonText}>Book {vendor.name.split(" ")[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailBackButton} onPress={onBack}>
          <Text style={styles.detailBackButtonText}>← Back to {service.label} list</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Vendor row ────────────────────────────────────────────────────────────────

function VendorRow({ vendor, accent, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.row}>
      <View style={styles.rowThumbWrap}>
        <Image source={{ uri: vendor.image }} style={styles.rowThumb} />
      </View>

      <View style={styles.rowTextWrap}>
        <Text style={styles.itemTitleBold} numberOfLines={1}>{vendor.name}</Text>
        <Text style={styles.rowSubtitle} numberOfLines={1}>{vendor.tag}</Text>

        <View style={styles.rowMetaRow}>
          <View style={styles.starBadgeSm}>
            <Star size={8} color={COLORS.white} fill={COLORS.white} />
          </View>
          <Text style={styles.rowRating}>{vendor.rating}</Text>
          <Text style={styles.rowMetaDim}>({vendor.reviews})</Text>
          <Text style={styles.rowDot}>·</Text>
          <Text style={styles.rowMetaDim}>{vendor.distance}</Text>
          <Text style={styles.rowDot}>·</Text>
          <Text
            style={[
              styles.rowAvailability,
              { color: vendor.available ? COLORS.green600 : COLORS.red400 },
            ]}
          >
            {vendor.available ? "Available" : "Unavailable"}
          </Text>
        </View>
      </View>

      <View style={[styles.badge, { borderColor: accent }]}>
        <Text style={[styles.badgeText, { color: accent }]} numberOfLines={1}>
          {vendor.badge}
        </Text>
      </View>

      <ChevronRight size={14} color={COLORS.gray300} style={styles.rowChevron} />
    </TouchableOpacity>
  );
}

// ── Filter modal ──────────────────────────────────────────────────────────────

function FilterModal({ visible, accent, filters, onChange, onReset, onClose, onShowResults, resultCount }) {
  const trackWidthRef = useRef(0);
  const [trackWidth, setTrackWidth] = useState(0);

  // Keep a ref to the latest filters/onChange so the PanResponder (created once)
  // never reads a stale value from an earlier render.
  const latestRef = useRef({ filters, onChange });
  latestRef.current = { filters, onChange };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt) => {
        const width = trackWidthRef.current;
        if (!width) return;
        const localX = Math.max(0, Math.min(width, evt.nativeEvent.locationX));
        const { filters: f, onChange: change } = latestRef.current;
        change({ ...f, priceFraction: localX / width });
      },
    })
  ).current;

  const toggleCategory = (cat) => {
    const has = filters.categories.includes(cat);
    onChange({
      ...filters,
      categories: has ? filters.categories.filter((c) => c !== cat) : [...filters.categories, cat],
    });
  };

  const toggleRating = (r) => {
    const has = filters.ratings.includes(r);
    onChange({
      ...filters,
      ratings: has ? filters.ratings.filter((x) => x !== r) : [...filters.ratings, r],
    });
  };

  const adjustDistance = (delta) => {
    const next = Math.min(DISTANCE_MAX, Math.max(DISTANCE_MIN, filters.distance + delta));
    onChange({ ...filters, distance: next });
  };

const adjustMinPax = (delta) => {
  const next = Math.max(PAX_MIN, Math.min(filters.minPax + delta, filters.maxPax));
  onChange({
    ...filters,
    minPax: next,
  });
};

const adjustMaxPax = (delta) => {
  const next = Math.min(PAX_MAX, Math.max(filters.maxPax + delta, filters.minPax));
  onChange({
    ...filters,
    maxPax: next,
  });
};




  const priceValue = Math.round(PRICE_MIN + filters.priceFraction * (PRICE_MAX - PRICE_MIN));

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <TouchableOpacity style={modalStyles.overlayTouchable} activeOpacity={1} onPress={onClose} />

        <View style={modalStyles.sheet}>
          <View style={modalStyles.grabberWrap}>
            <View style={modalStyles.grabber} />
          </View>

          {/* Header */}
          <View style={modalStyles.headerRow}>
            <Text style={modalStyles.title}>Filter</Text>
            <TouchableOpacity onPress={onReset} hitSlop={8} style={modalStyles.resetButton}>
              <Text style={[modalStyles.resetText, { color: accent }]}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <Text style={modalStyles.sectionLabel}>Categories</Text>
          <View style={modalStyles.categoryGrid}>
            {FILTER_CATEGORIES.map((cat) => {
              const selected = filters.categories.includes(cat);
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => toggleCategory(cat)}
                  style={[
                    modalStyles.categoryChip,
                    selected && { backgroundColor: accent, borderColor: accent },
                  ]}
                >
                  <Text style={[modalStyles.categoryChipText, selected && modalStyles.categoryChipTextSelected]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={modalStyles.sectionDivider} />

          {/* Distance */}
          <Text style={modalStyles.sectionLabel}>Distance to me</Text>
          <View style={modalStyles.distanceRow}>
            <TouchableOpacity
              onPress={() => adjustDistance(-1)}
              style={modalStyles.stepperButton}
              hitSlop={8}
            >
              <Minus size={16} color={COLORS.gray700 || COLORS.gray800} />
            </TouchableOpacity>
            <Text style={[modalStyles.distanceValue, { color: accent }]}>{filters.distance} km</Text>
            <TouchableOpacity
              onPress={() => adjustDistance(1)}
              style={modalStyles.stepperButton}
              hitSlop={8}
            >
              <Plus size={16} color={COLORS.gray700 || COLORS.gray800} />
            </TouchableOpacity>
          </View>

          <View style={modalStyles.sectionDivider} />

          <Text style={modalStyles.sectionLabel}>Number of Pax</Text>

              <View style={modalStyles.paxContainer}>

            <View style={modalStyles.paxBox}>
              <Text style={modalStyles.paxLabel}>Min</Text>

          <View style={modalStyles.distanceRow}>
            <TouchableOpacity
              onPress={() => adjustMinPax(-1)}
              style={modalStyles.stepperButton}
            >
              <Minus size={16} color={COLORS.gray800} />
            </TouchableOpacity>

            <Text style={[modalStyles.distanceValue, { color: accent }]}>
              {filters.minPax}
            </Text>

            <TouchableOpacity
              onPress={() => adjustMinPax(1)}
              style={modalStyles.stepperButton}
            >
              <Plus size={16} color={COLORS.gray800} />
            </TouchableOpacity>
          </View>
        </View>

                  <View style={modalStyles.paxBox}>
                    <Text style={modalStyles.paxLabel}>Max</Text>
              <View style={modalStyles.distanceRow}>
                <TouchableOpacity
                  onPress={() => adjustMaxPax(-1)}
                  style={modalStyles.stepperButton}
                >
                  <Minus size={16} color={COLORS.gray800} />
                </TouchableOpacity>

                <Text style={[modalStyles.distanceValue, { color: accent }]}>
                  {filters.maxPax}
                </Text>

                <TouchableOpacity
                  onPress={() => adjustMaxPax(1)}
                  style={modalStyles.stepperButton}
                >
                  <Plus size={16} color={COLORS.gray800} />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={modalStyles.sectionDivider} />

          {/* Rating */}
          <Text style={modalStyles.sectionLabel}>Rating</Text>
          <View style={modalStyles.ratingRow}>
            {RATING_OPTIONS.map((r) => {
              const selected = filters.ratings.includes(r);
              return (
                <TouchableOpacity
                  key={r}
                  onPress={() => toggleRating(r)}
                  style={[
                    modalStyles.ratingChip,
                    selected && { backgroundColor: accent, borderColor: accent },
                  ]}
                >
                  <Text style={[modalStyles.ratingChipText, selected && modalStyles.ratingChipTextSelected]}>
                    {r}★
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={modalStyles.sectionDivider} />

          {/* Price */}
          <Text style={modalStyles.sectionLabel}>Price</Text>
          <View style={modalStyles.priceRow}>
            <View
              style={modalStyles.priceTrack}
              onLayout={(e) => {
                const w = e.nativeEvent.layout.width;
                trackWidthRef.current = w;
                setTrackWidth(w);
              }}
              {...panResponder.panHandlers}
            >
              <View style={modalStyles.priceTrackBase} />
              <View style={[modalStyles.priceTrackFill, { width: `${filters.priceFraction * 100}%`, backgroundColor: accent }]} />
              <View
                style={[
                  modalStyles.priceHandle,
                  { left: Math.max(0, filters.priceFraction * trackWidth - 9), backgroundColor: accent },
                ]}
              />
            </View>
            <Text style={[modalStyles.priceLabel, { color: accent }]}>₹{PRICE_MIN}-₹{priceValue}</Text>
          </View>

          {/* Show results */}
          <TouchableOpacity
            style={[modalStyles.showResultsButton, { backgroundColor: accent }]}
            onPress={onShowResults}
          >
            <Text style={modalStyles.showResultsText}>Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ServiceVendorsScreen({ navigation, route }) {
  // `service` is expected to be the object from Home.js's `services` array,
  // e.g. { label: "Chef", img: "...", accent: "#FF4D4D" }
  const rawService = route?.params?.service;
  const service =
    rawService && typeof rawService === "object" && rawService.label
      ? rawService
      : { label: "Chef" };
  const meta = getMeta(service.label);
  const accent = service.accent || meta.accent;

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState(getDefaultFilters());

  const vendors = getVendors(service.label);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vendors;
    return vendors.filter(
      (v) => v.name.toLowerCase().includes(q) || v.tag.toLowerCase().includes(q)
    );
  }, [query, vendors]);

  if (selectedId !== null) {
    const vendor = vendors.find((v) => v.id === selectedId);
    return (
      <VendorDetailScreen
        vendor={vendor}
        service={service}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          hitSlop={8}
          onPress={() => navigation?.goBack?.()}
        >
          <ArrowLeft size={20} color={COLORS.gray900} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>{service.label}s Near You</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>{meta.subtitle}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search / filter bar */}
      <View style={styles.searchBarWrap}>
        <View style={styles.searchFilterRow}>
          <View style={styles.searchBar}>
            <Search size={18} color={COLORS.gray400} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={meta.searchPlaceholder}
              placeholderTextColor={COLORS.gray400}
              style={styles.searchInput}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")} hitSlop={6}>
                <X size={16} color={COLORS.gray500} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: accent }]}
            onPress={() => setFilterVisible(true)}
            hitSlop={6}
          >
            <SlidersHorizontal size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.hairline} />

      {/* Vendor list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        renderItem={({ item }) => (
          <VendorRow vendor={item} accent={accent} onPress={() => setSelectedId(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Search size={56} color={COLORS.gray300} style={{ opacity: 0.5 }} />
            <Text style={styles.emptyStateTextStrong}>No {service.label.toLowerCase()}s found</Text>
            <Text style={styles.emptyStateTextDim}>Try a different keyword</Text>
          </View>
        }
        ListFooterComponent={
          filtered.length > 0 ? (
            <Text style={styles.resultCount}>
              {filtered.length} {service.label.toLowerCase()}{filtered.length === 1 ? "" : "s"} available
            </Text>
          ) : null
        }
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by</Text>
        <Text style={styles.footerBrand}>Chefgy</Text>
      </View>

      <FilterModal
        visible={filterVisible}
        accent={accent}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(getDefaultFilters())}
        onClose={() => setFilterVisible(false)}
        onShowResults={() => setFilterVisible(false)}
        resultCount={filtered.length}
      />
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.gray400,
    marginTop: 2,
  },
  headerSpacer: {
    width: 32,
  },
  iconButton: {
    padding: 6,
    borderRadius: 999,
  },

  // Search bar
  searchBarWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray900,
    paddingVertical: 0,
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.gray100,
  },

  // List
  list: {
    flex: 1,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.gray100,
  },
  resultCount: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.gray400,
    paddingVertical: 16,
  },

  // Empty states
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 96,
    gap: 10,
  },
  emptyStateTextStrong: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.gray400,
  },
  emptyStateTextDim: {
    fontSize: 12,
    color: COLORS.gray300,
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowThumbWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: "hidden",
    backgroundColor: COLORS.gray100,
  },
  rowThumb: {
    width: "100%",
    height: "100%",
  },
  rowTextWrap: {
    flex: 1,
    paddingRight: 84,
    justifyContent: "center",
  },
  itemTitleBold: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  rowSubtitle: {
    fontSize: 13,
    color: COLORS.gray400,
    marginTop: 3,
  },
  rowMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 5,
  },
  starBadgeSm: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.green600,
    alignItems: "center",
    justifyContent: "center",
  },
  starBadgeLg: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.green600,
    alignItems: "center",
    justifyContent: "center",
  },
  rowRating: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gray800,
  },
  rowMetaDim: {
    fontSize: 12,
    color: COLORS.gray400,
  },
  rowDot: {
    fontSize: 12,
    color: COLORS.gray300,
  },
  rowAvailability: {
    fontSize: 12,
    fontWeight: "500",
  },

  // Badge
  badge: {
    position: "absolute",
    top: 14,
    right: 16,
    maxWidth: 96,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  rowChevron: {
    position: "absolute",
    bottom: 14,
    right: 16,
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray100,
  },
  footerText: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.gray300,
    letterSpacing: 0.3,
  },
  footerBrand: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.orange,
  },

  // Detail screen
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray100,
  },
  detailEyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.gray400,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.gray900,
    maxWidth: 260,
  },
  detailBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  detailAvatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: "hidden",
    backgroundColor: COLORS.gray100,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  detailAvatar: {
    width: "100%",
    height: "100%",
  },
  detailName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.gray900,
    textAlign: "center",
    marginTop: 4,
  },
  detailTag: {
    fontSize: 14,
    color: COLORS.gray500,
    textAlign: "center",
  },
  detailBadgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  detailBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  detailMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  detailRating: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray800,
  },
  detailMetaDim: {
    fontSize: 13,
    color: COLORS.gray400,
  },
  detailDot: {
    fontSize: 14,
    color: COLORS.gray400,
  },
  detailMetaText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  detailAvailability: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },
  detailCtaButton: {
    marginTop: 20,
    paddingHorizontal: 32,
    paddingVertical: 13,
    borderRadius: 16,
  },
  detailCtaButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  detailBackButton: {
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  detailBackButtonText: {
    color: COLORS.gray500,
    fontWeight: "600",
    fontSize: 13,
  },
});

// ── Filter modal styles ─────────────────────────────────────────────────────

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(17, 17, 17, 0.45)",
  },
  overlayTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 32 : 24,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  grabberWrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
  },
  headerRow: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    minHeight: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.gray900,
    textAlign: "center",
  },
  resetButton: {
    position: "absolute",
    right: 0,
    top: 2,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray900,
    marginBottom: 10,
    marginTop: 2,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.gray200,
    marginVertical: 14,
  },

  // Categories
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    width: "47%",
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray800,
  },
  categoryChipTextSelected: {
    color: COLORS.white,
  },

  // Distance
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  distanceValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.gray900,
    minWidth: 48,
    textAlign: "center",
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    gap: 8,
  },
  ratingChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  ratingChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gray800,
  },
  ratingChipTextSelected: {
    color: COLORS.white,
  },

  // Price
  priceRow: {
    marginBottom: 20,
  },
  priceTrack: {
    height: 32,
    justifyContent: "center",
  },
  priceTrackBase: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
  },
  priceTrackFill: {
    position: "absolute",
    left: 0,
    height: 4,
    borderRadius: 2,
  },
  priceHandle: {
    position: "absolute",
    top: 7,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  // Show results button
  showResultsButton: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  showResultsText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },


  paxContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 16,
},

paxBox: {
  flex: 1,
},

paxLabel: {
  fontSize: 13,
  fontWeight: "600",
  color: COLORS.gray500,
  marginBottom: 8,
  textAlign: "center",
},
});