import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from "react-native";
import { ArrowLeft, Search, X, Mic, Star, ChevronRight } from "lucide-react-native";
import services from "../../src/services/api/services";
import { UploadsBaseUrl } from "../../src/services/api/ServiceConstants";

// NOTE on blur: a real native blur (e.g. @react-native-community/blur) needs
// its own native module linked at build time, so it can't be required
// conditionally at runtime — Metro still tries to resolve it statically and
// will crash the bundle if it isn't installed. We use a plain dim overlay
// instead, which needs no native dependency. If you do install the blur
// package yourself, swap BACKDROP below for a <BlurView> and re-add it to
// package.json/pod install first.

const { height: SCREEN_H } = Dimensions.get("window");
// How tall the "hanging from the top" card is before the user has typed
// enough characters to trigger a real search.
const HALF_CARD_HEIGHT = Math.round(SCREEN_H * 0.6);

// Hardcoded for now — later swap for the user's selected delivery location.
const SEARCH_LATITUDE = 17.385044;
const SEARCH_LONGITUDE = 78.486671;

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=160&h=160&fit=crop&auto=format";

// ── Colors ───────────────────────────────────────────────────────────────────

const COLORS = {
  orange: "#FF4D4D", // aligned with Chefgy PRIMARY
  orangeDark: "#E63946",
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

// ── Badge colour map ─────────────────────────────────────────────────────────

const BADGE_COLORS = {
  Chef: { border: "#5eead4", text: "#0d9488" },
  Caterer: { border: "#93c5fd", text: "#2563eb" },
  "Home Food": { border: "#86efac", text: "#16a34a" },
  "Food Truck": { border: "#fca5a5", text: "#dc2626" },
  "Cloud Kitchen": { border: "#d8b4fe", text: "#9333ea" },
  Vendor: { border: COLORS.gray300, text: COLORS.gray500 },
};

function badgeColors(tag) {
  return BADGE_COLORS[tag] ?? { border: COLORS.gray300, text: COLORS.gray500 };
}

function resolveImageUrl(path) {
  if (!path || typeof path !== "string") return PLACEHOLDER_IMAGE;
  const cleaned = path.trim();
  if (!cleaned) return PLACEHOLDER_IMAGE;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  return `${UploadsBaseUrl}${cleaned.replace(/^\//, "")}`;
}

function formatReviews(count) {
  const n = Number(count) || 0;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

/**
 * Expand each vendor into one suggestion per service.
 * Typing "Uda" matches vendor "Uday" and yields:
 *   Uday Caterer, Uday Home Food, Uday Food Truck, Uday Chef
 */
function flattenVendorsToSuggestions(vendors = []) {
  const suggestions = [];

  vendors.forEach((vendor) => {
    const vendorName = vendor.vendor_name || vendor.business_title || "Vendor";
    const vendorImage = resolveImageUrl(vendor.profile_image_path);
    const rating = Number(vendor.rating) || 0;
    const reviews = formatReviews(vendor.review_count);
    const distance = vendor.distance_km != null ? `${vendor.distance_km} km` : "";
    const available = !!vendor.is_open;
    const services = Array.isArray(vendor.services) ? vendor.services : [];

    if (services.length === 0) {
      suggestions.push({
        id: `v-${vendor.vendor_id}`,
        kind: "vendor",
        name: vendorName,
        vendorName,
        serviceTag: vendor.business_title || "Vendor",
        image: vendorImage,
        rating,
        reviews,
        distance,
        available,
        vendorId: vendor.vendor_id,
        serviceId: null,
      });
      return;
    }

    services.forEach((service) => {
      const serviceName = service.service_name || "Service";
      suggestions.push({
        id: `v-${vendor.vendor_id}-s-${service.service_id}`,
        kind: "vendor",
        name: `${vendorName} ${serviceName}`,
        vendorName,
        serviceTag: serviceName,
        image: resolveImageUrl(service.image) || vendorImage,
        rating,
        reviews,
        distance,
        available,
        vendorId: vendor.vendor_id,
        serviceId: service.service_id,
        offerText: service.offer_text || null,
      });
    });
  });

  return suggestions;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function HighlightedText({ text, query }) {
  const lower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  const idx = lower.indexOf(queryLower);

  if (idx === -1) {
    return (
      <Text style={styles.itemTitleBold} numberOfLines={1}>
        {text}
      </Text>
    );
  }

  return (
    <Text numberOfLines={1} style={styles.itemTitleBase}>
      {idx > 0 && <Text style={styles.itemTitleDim}>{text.slice(0, idx)}</Text>}
      <Text style={styles.itemTitleHighlight}>
        {text.slice(idx, idx + query.length)}
      </Text>
      <Text style={styles.itemTitleDim}>{text.slice(idx + query.length)}</Text>
    </Text>
  );
}

// ── Vendor detail screen ─────────────────────────────────────────────────────

function VendorDetailScreen({ vendor, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton} hitSlop={8}>
          <ArrowLeft size={20} color={COLORS.gray900} strokeWidth={2.5} />
        </TouchableOpacity>
        <View>
          <Text style={styles.detailEyebrow}>{vendor.serviceTag}</Text>
          <Text style={styles.detailTitle}>{vendor.name}</Text>
        </View>
      </View>

      <View style={styles.detailBody}>
        <View style={styles.detailAvatarWrap}>
          <Image source={{ uri: vendor.image }} style={styles.detailAvatar} />
        </View>

        <Text style={styles.detailName}>{vendor.name}</Text>
        <Text style={styles.detailTag}>{vendor.serviceTag}</Text>

        {vendor.kind === "vendor" && (
          <View style={styles.detailMetaRow}>
            <View style={styles.starBadgeLg}>
              <Star size={10} color={COLORS.white} fill={COLORS.white} />
            </View>
            <Text style={styles.detailRating}>{vendor.rating}</Text>
            <Text style={styles.detailDot}>·</Text>
            <Text style={styles.detailMetaText}>{vendor.distance}</Text>
            <Text style={styles.detailDot}>·</Text>
            <Text
              style={[
                styles.detailAvailability,
                { color: vendor.available ? COLORS.green600 : COLORS.red400 },
              ]}
            >
              {vendor.available ? "Open Now" : "Closed"}
            </Text>
          </View>
        )}

        <Text style={styles.detailFootnote}>
          Vendor listing screen — filtered by{" "}
          <Text style={styles.detailFootnoteHighlight}>{vendor.serviceTag}</Text>
        </Text>

        <TouchableOpacity style={styles.detailBackButton} onPress={onBack}>
          <Text style={styles.detailBackButtonText}>← Back to Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Suggestion row ───────────────────────────────────────────────────────────

function SuggestionRow({ item, query, onPress }) {
  const badge = badgeColors(item.serviceTag);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.row}
    >
      <View style={styles.rowThumbWrap}>
        <Image source={{ uri: item.image }} style={styles.rowThumb} />
      </View>

      <View style={styles.rowTextWrap}>
        <HighlightedText text={item.name} query={query.trim()} />
        <Text style={styles.rowSubtitle}>{item.serviceTag}</Text>

        {item.kind === "vendor" && (
          <View style={styles.rowMetaRow}>
            <View style={styles.starBadgeSm}>
              <Star size={8} color={COLORS.white} fill={COLORS.white} />
            </View>
            <Text style={styles.rowRating}>{item.rating}</Text>
            <Text style={styles.rowMetaDim}>({item.reviews})</Text>
            <Text style={styles.rowDot}>·</Text>
            <Text style={styles.rowMetaDim}>{item.distance}</Text>
            <Text style={styles.rowDot}>·</Text>
            <Text
              style={[
                styles.rowAvailability,
                { color: item.available ? COLORS.green600 : COLORS.red400 },
              ]}
            >
              {item.available ? "Open Now" : "Closed"}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.badge,
          { borderColor: badge.border },
        ]}
      >
        <Text style={[styles.badgeText, { color: badge.text }]}>
          {item.serviceTag}
        </Text>
      </View>

      <ChevronRight
        size={14}
        color={COLORS.gray300}
        style={styles.rowChevron}
      />
    </TouchableOpacity>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
//
// Rendered as an overlay Modal on top of whatever screen opened it (e.g. Home).
// Props:
//   visible  – controls the Modal, same as any RN Modal
//   onClose  – called when the user backs out / taps the blurred backdrop
//   navigation, route – optional, kept for compatibility with existing callers
//
// Behaviour:
//   • query.length < 3  → "collapsed" state: a rounded-bottom card hangs from
//     the top of the screen (≈60% height) showing recent searches, with the
//     rest of the screen (Home) dimmed + blurred behind it.
//   • query.length >= 3 → "expanded" state: the card animates to fill the
//     whole screen and shows matching results, like a normal search page.
//   • Clearing the search box (X button) drops the query back to "" which
//     animates the card back down to the half-hanging state automatically.

export default function SearchServicesScreen({ visible, onClose, navigation, route }) {
  const initialQuery = route?.params?.initialQuery ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedId, setSelectedId] = useState(null);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const inputRef = useRef(null);
  const expandAnim = useRef(new Animated.Value(0)).current;

  const isExpanded = query.trim().length >= 3 || selectedId !== null;

  // Fetch vendors once when the overlay opens.
  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    setLoadingVendors(true);

    services
      .SearchVendors(SEARCH_LATITUDE, SEARCH_LONGITUDE)
      .then((response) => {
        if (cancelled) return;
        const vendors = response?.data?.data || [];
        setAllSuggestions(flattenVendorsToSuggestions(vendors));
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to fetch vendors for search", error);
        setAllSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingVendors(false);
      });

    return () => {
      cancelled = true;
    };
  }, [visible]);

  // Animate the card between the half-hanging and full-screen states any
  // time the "expanded" condition flips.
  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // height / borderRadius aren't native-driver friendly
    }).start();
  }, [isExpanded, expandAnim]);

  // Reset to a clean, collapsed state every time the overlay is reopened.
  useEffect(() => {
    if (visible) {
      setQuery(initialQuery);
      setSelectedId(null);
      expandAnim.setValue(initialQuery.trim().length >= 3 ? 1 : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const filtered =
    query.trim().length >= 3
      ? allSuggestions.filter((s) => {
          const q = query.trim().toLowerCase();
          // Match vendor name first (e.g. "Uda" → all of Uday's services),
          // then also allow matching the combined label / service tag.
          return (
            (s.vendorName || "").toLowerCase().includes(q) ||
            (s.name || "").toLowerCase().includes(q) ||
            (s.serviceTag || "").toLowerCase().includes(q)
          );
        })
      : [];

  const selectedVendor =
    selectedId != null
      ? allSuggestions.find((s) => s.id === selectedId)
      : null;

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
    onClose?.();
  }, [onClose]);

  const cardHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [HALF_CARD_HEIGHT, SCREEN_H],
  });
  const cardRadius = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 0],
  });

  return (
    <Modal
      visible={!!visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop — dims whatever screen is behind (e.g. Home). Tapping it
            closes the overlay, same as tapping outside a sheet. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
          <View style={[StyleSheet.absoluteFill, styles.backdropDim]} />
        </Pressable>

        {/* The card itself: hangs from the top, animates height + corner
            radius between the "half" and "full screen" states. */}
        <Animated.View
          style={[
            styles.card,
            {
              height: cardHeight,
              borderBottomLeftRadius: cardRadius,
              borderBottomRightRadius: cardRadius,
            },
          ]}
        >
          <StatusBar barStyle="dark-content" />

          {selectedVendor ? (
            <VendorDetailScreen
              vendor={selectedVendor}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <View style={{ flex: 1 }}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} hitSlop={8} onPress={handleClose}>
                  <ArrowLeft size={20} color={COLORS.gray900} strokeWidth={2.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  Search for dishes & restaurants
                </Text>
                <View style={styles.headerSpacer} />
              </View>

              {/* Search bar */}
              <View style={styles.searchBarWrap}>
                <View style={styles.searchBar}>
                  <Search size={18} color={COLORS.gray400} />
                  <TextInput
                    ref={inputRef}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search chefs, caterers, home food, cloud kitchens..."
                    placeholderTextColor={COLORS.gray400}
                    style={styles.searchInput}
                    autoFocus={!!visible}
                  />
                  {query.length > 0 && (
                    <TouchableOpacity onPress={handleClear} hitSlop={6}>
                      <X size={16} color={COLORS.gray500} />
                    </TouchableOpacity>
                  )}
                  <View style={styles.searchDivider} />
                  <TouchableOpacity hitSlop={6}>
                    <Mic size={18} color={COLORS.orange} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.hairline} />

              {isExpanded ? (
                // ── Expanded: full-screen result list ──────────────────────
                <FlatList
                  data={filtered}
                  keyExtractor={(item) => String(item.id)}
                  style={styles.list}
                  keyboardShouldPersistTaps="handled"
                  ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                  renderItem={({ item }) => (
                    <SuggestionRow
                      item={item}
                      query={query}
                      onPress={() => setSelectedId(item.id)}
                    />
                  )}
                  ListEmptyComponent={
                    loadingVendors ? (
                      <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>Searching nearby vendors...</Text>
                      </View>
                    ) : query.trim().length < 3 ? (
                      <View style={styles.emptyState}>
                        <Search size={56} color={COLORS.gray300} style={{ opacity: 0.5 }} />
                        <Text style={styles.emptyStateText}>
                          Type at least 3 characters to see suggestions
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.emptyState}>
                        <Text style={styles.emptyStateTextStrong}>
                          No results for "{query}"
                        </Text>
                        <Text style={styles.emptyStateTextDim}>Try a different keyword</Text>
                      </View>
                    )
                  }
                />
              ) : (
                <View style={styles.emptyState}>
                  <Search size={56} color={COLORS.gray300} style={{ opacity: 0.5 }} />
                  <Text style={styles.emptyStateText}>
                    Type at least 3 characters to see suggestions
                  </Text>
                </View>
              )}

              {isExpanded && (
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Powered by</Text>
                  <Text style={styles.footerBrand}>Chefgy</Text>
                </View>
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  // Backdrop shown behind the hanging card (blurred/dimmed Home screen)
  backdropDim: {
    backgroundColor: "rgba(15,15,20,0.55)",
  },

  // The animated card itself — hangs from the very top of the screen and
  // grows to fill it as the search becomes "expanded".
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 16,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.gray900,
    marginRight: 24,
  },
  headerSpacer: {
    width: 0,
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
  searchBar: {
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
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray900,
    paddingVertical: 0,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.gray200,
    marginHorizontal: 2,
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

  // Empty states
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 96,
    gap: 10,
  },
  emptyStateText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.gray300,
    textAlign: "center",
    paddingHorizontal: 32,
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
    paddingRight: 72,
    justifyContent: "center",
  },
  itemTitleBase: {
    fontSize: 15,
    lineHeight: 20,
  },
  itemTitleBold: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  itemTitleDim: {
    fontSize: 15,
    fontWeight: "400",
    color: COLORS.gray500,
  },
  itemTitleHighlight: {
    fontSize: 15,
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
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
  },
  detailBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 64,
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
  },
  detailTag: {
    fontSize: 14,
    color: COLORS.gray500,
    marginTop: 4,
    textAlign: "center",
  },
  detailMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  detailRating: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray800,
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
    fontSize: 14,
    fontWeight: "500",
  },
  detailFootnote: {
    fontSize: 13,
    color: COLORS.gray400,
    marginTop: 8,
    maxWidth: 240,
    textAlign: "center",
  },
  detailFootnoteHighlight: {
    fontWeight: "700",
    color: COLORS.orange,
  },
  detailBackButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: COLORS.orange,
  },
  detailBackButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});