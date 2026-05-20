import React, { useState,useRef  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Modal, 
  TextInput, 
  Alert,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';


const { width } = Dimensions.get('window');
const resolveVendorProfilePhotoMime = (image) => {
  const mime = image?.mime || image?.type || '';
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'image/jpeg';
  if (mime.includes('png')) return 'image/png';
  if (mime.includes('webp')) return 'image/webp';
  // Fallback based on extension
  const path = image?.path || '';
  if (path.match(/\.jpe?g$/i)) return 'image/jpeg';
  if (path.match(/\.png$/i)) return 'image/png';
  if (path.match(/\.webp$/i)) return 'image/webp';
  return null;
};

const getVendorProfilePhotoMaxSizeBytes = () => 2 * 1024 * 1024; // 2MB default

// Mock Data
const USER = {
  name: 'Virat Kohili',
  phone: '+91 - 98765 43210',
  email: 'virat@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
};

const ChefGy_ONE = {
  saved: 48,
  days: 9,
  active: true,
};

const QUICK_ACTIONS = [
  { id: 1, icon: 'location-pin', label: 'Saved\nAddress' },
  { id: 2, icon: 'account-balance-wallet', label: 'Payment\nModes' },
  { id: 3, icon: 'refresh', label: 'My\nRefunds' },
  { id: 4, icon: 'payments', label: 'ChefGy\nMoney' },
];

const MENU_ITEMS = [
  { id: 1, icon: 'credit-card', label: 'ChefGy HDFC Bank Credit Card' },
  { id: 2, icon: 'confirmation-number', label: 'My Vouchers' },
  { id: 3, icon: 'description', label: 'Account Statements' },
  { id: 4, icon: 'train', label: 'Order Food on Train' },
  { id: 5, icon: 'business-center', label: 'Corporate Rewards' },
  { id: 6, icon: 'school', label: 'Student Rewards' },
  { id: 7, icon: 'bookmark', label: 'My Instamart Wishlist' },
  { id: 8, icon: 'favorite-border', label: 'Favourites' },
  { id: 9, icon: 'emoji-events', label: 'Partner Rewards' },
  { id: 10, icon: 'chat', label: 'Allow restaurants to contact you' },
];

const PAST_ORDERS = [
  {
    id: 1,
    restaurant: "Vasista's Srilakshmi",
    location: 'Gachibowli',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop',
    status: 'Delivered',
    items: [{ qty: 1, name: 'Egg Biryani' }],
    foodRating: 0,
    deliveryRating: 0,
    date: 'May 5, 7:28 PM',
    total: 310,
  },
  {
    id: 2,
    restaurant: 'Keshav Reddy Sweets',
    location: 'Madhapur',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop',
    status: 'Delivered',
    items: [{ qty: 1, name: 'Special Laddu (Motichur)' }],
    foodRating: 0,
    deliveryRating: 5,
    date: 'April 13, 3:38 PM',
    total: 522,
  },
];

const MORE_OPTIONS = [
  { id: 1, label: 'Edit Profile', icon: 'person' },
  { id: 2, label: 'Settings', icon: 'settings' },
  { id: 3, label: 'Logout', icon: 'logout' },
];

const handleGoBack = (navigation) => {
  if (navigation && typeof navigation.goBack === 'function') {
    navigation.goBack();
  } else {
    console.warn('Navigation not available');
    // Optional: Add fallback behavior
    // navigation.navigate('Home'); 
  }
};

// Star Rating Component
const StarRating = ({ rating, onRate, interactive = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!interactive}
          onPress={() => onRate && onRate(star)}
          onPressIn={() => interactive && setHoverRating(star)}
          onPressOut={() => interactive && setHoverRating(0)}
          style={styles.starButton}
        >
          <MaterialIcons
            name={star <= (hoverRating || rating) ? 'star' : 'star-border'}
            size={20}
            color={star <= (hoverRating || rating) ? '#FFA500' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Header Component
const ProfileHeader = ({ onMenuPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="arrow-back" size={24}  color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>MY ACCOUNT</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Swiggy One Banner
const ChefGyOneBanner = ({ expanded, onToggle }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onToggle}
    style={styles.oneBanner}
  >
    <View style={styles.oneBannerTop}>
      <View style={styles.oneLogoRow}>
        <Text style={styles.oneLogo}>one</Text>
        {ChefGy_ONE.active && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>ACTIVE</Text>
          </View>
        )}
      </View>
      <MaterialIcons
        name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        size={20}
        color="#999"
      />
    </View>
    <Text style={styles.savedText}>₹{ChefGy_ONE.saved} saved in {ChefGy_ONE.days} days</Text>
    <Text style={styles.exploreText}>Explore all ChefGy One benefits</Text>
    {expanded && (
      <View style={styles.expandedContent}>
        <Text style={styles.benefitText}>✓ Free delivery on all orders</Text>
        <Text style={styles.benefitText}>✓ Extra discounts on restaurants</Text>
        <Text style={styles.benefitText}>✓ Priority customer support</Text>
      </View>
    )}
  </TouchableOpacity>
);

// Quick Actions Grid
const QuickActions = () => (
  <View style={styles.quickActionsContainer}>
    {QUICK_ACTIONS.map((action) => (
      <TouchableOpacity key={action.id} style={styles.actionButton} activeOpacity={0.7}>
        <View style={styles.actionIconContainer}>
          <MaterialIcons name={action.icon} size={24} color="#333" />
        </View>
        <Text style={styles.actionLabel}>{action.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Menu List
const MenuList = () => (
  <View style={styles.menuContainer}>
    {MENU_ITEMS.map((item, index) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          index === MENU_ITEMS.length - 1 && styles.menuItemLast,
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.menuIconContainer}>
          <MaterialIcons name={item.icon} size={22} color="#333" />
        </View>
        <Text style={styles.menuLabel}>{item.label}</Text>
        <MaterialIcons name="chevron-right" size={20} color="#ccc" />
      </TouchableOpacity>
    ))}
  </View>
);

// Past Orders Section
const PastOrders = ({ orders, orderType, onTypeChange, onRateFood, onRateDelivery, onReorder }) => (
  <View style={styles.ordersSection}>
    <Text style={styles.sectionTitle}>PAST ORDERS</Text>

    {/* Toggle */}
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, orderType === 'food' && styles.toggleActive]}
        onPress={() => onTypeChange('food')}
      >
        <Text style={[styles.toggleText, orderType === 'food' && styles.toggleTextActive]}>
          Food
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, orderType === 'instamart' && styles.toggleActive]}
        onPress={() => onTypeChange('instamart')}
      >
        <Text style={[styles.toggleText, orderType === 'instamart' && styles.toggleTextActive]}>
          Instamart
        </Text>
      </TouchableOpacity>
    </View>

    {/* Order Cards */}
    {orderType === 'food' &&
      orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          {/* Restaurant Header */}
          <View style={styles.orderHeader}>
            <Image source={{ uri: order.image }} style={styles.orderImage} />
            <View style={styles.orderHeaderInfo}>
              <Text style={styles.restaurantName}>{order.restaurant}</Text>
              <Text style={styles.restaurantLocation}>{order.location}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{order.status}</Text>
              <MaterialIcons name="check-circle" size={18} color="#00C853" />
            </View>
          </View>

          {/* Items */}
          {order.items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>{item.qty}x</Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Ratings */}
          <View style={styles.ratingsRow}>
            <View style={styles.ratingColumn}>
              <Text style={styles.ratingLabel}>Your Food Rating</Text>
              <StarRating
                rating={order.foodRating}
                interactive
                onRate={(rating) => onRateFood(order.id, rating)}
              />
            </View>
            <View style={styles.ratingDivider} />
            <View style={styles.ratingColumn}>
              <Text style={styles.ratingLabel}>Delivery Rating</Text>
              <StarRating
                rating={order.deliveryRating}
                interactive
                onRate={(rating) => onRateDelivery(order.id, rating)}
              />
            </View>
          </View>

          {/* Reorder Button */}
          <TouchableOpacity
            style={styles.reorderButton}
            onPress={() => onReorder(order.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.reorderText}>REORDER</Text>
            <MaterialIcons name="chevron-right" size={18} color="#FF6B00" />
          </TouchableOpacity>

          {/* Order Footer */}
          <View style={styles.orderFooter}>
            <Text style={styles.orderMeta}>Ordered: {order.date}</Text>
            <Text style={styles.orderMeta}>•</Text>
            <Text style={styles.orderMeta}>Bill Total: ₹{order.total}</Text>
          </View>
        </View>
      ))}

    {orderType === 'instamart' && (
      <View style={styles.emptyState}>
        <MaterialIcons name="shopping-basket" size={48} color="#ccc" />
        <Text style={styles.emptyText}>No Instamart orders yet</Text>
      </View>
    )}
  </View>
);

// Floating Browse Button
const BrowseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.browseButton} onPress={onPress} activeOpacity={0.9}>
    <Text style={styles.browseText}>BROWSE PAST ORDERS</Text>
  </TouchableOpacity>
);

// More Options Modal
const MoreOptionsModal = ({ visible, onClose, onSelect }) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
      <View style={styles.modalContent}>
        {MORE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.modalItem}
            onPress={() => {
              onSelect(option.label);
              onClose();
            }}
          >
            <MaterialIcons name={option.icon} size={20} color="#fff" style={styles.modalIcon} />
            <Text style={styles.modalText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);


// Validation helpers
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  // Supports formats: +91-98765 43210, +919876543210, 9876543210, etc.
  const re = /^[+]?[\d\s-]{10,15}$/;
  return re.test(String(phone).replace(/\s/g, ''));
};

const formatPhone = (phone) => {
  // Simple formatting: +91 - 98765 43210
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 - ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length > 10 && cleaned.startsWith('91')) {
    return `+91 - ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

// Editable Profile Card Component
const ProfileCard = ({ 
  profileData, 
  profileImage, 
  uploadingProfileImage, 
  onSelectImage,
  onSaveProfile 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: profileData?.name || '',
    phone: profileData?.phone || '',
    email: profileData?.email || '',
  });
  const [errors, setErrors] = useState({});
  
  // Animation for edit mode transition
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateTransition = (editing) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: editing ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset data
      setEditData({
        name: profileData?.name || '',
        phone: profileData?.phone || '',
        email: profileData?.email || '',
      });
      setErrors({});
      setIsEditing(false);
      animateTransition(false);
    } else {
      // Enter edit mode
      setEditData({
        name: profileData?.name || '',
        phone: profileData?.phone || '',
        email: profileData?.email || '',
      });
      setIsEditing(true);
      animateTransition(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!editData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (editData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!editData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(editData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!editData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(editData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      // Shake animation for error feedback
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }

    setSaving(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Format phone before saving
      const formattedData = {
        ...editData,
        phone: formatPhone(editData.phone),
      };

      // Call parent save handler
      if (onSaveProfile) {
        await onSaveProfile(formattedData);
      }

      setIsEditing(false);
      setErrors({});
      animateTransition(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <View style={styles.profileCard}>
      {/* Left Section - Info/Inputs */}
      <Animated.View style={[styles.profileInfoContainer, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
        {isEditing ? (
          // Edit Mode
          <View style={styles.editContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={16} color="#FF6B6B" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={editData.name}
                onChangeText={(text) => updateField('name', text)}
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.5)"
                autoCapitalize="words"
                maxLength={50}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <View style={styles.inputWrapper}>
              <MaterialIcons name="phone" size={16} color="#FF6B6B" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={editData.phone}
                onChangeText={(text) => updateField('phone', text)}
                placeholder="Mobile Number"
                placeholderTextColor="rgba(255,255,255,0.5)"
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={16} color="#FF6B6B" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={editData.email}
                onChangeText={(text) => updateField('email', text)}
                placeholder="Email Address"
                placeholderTextColor="rgba(255,255,255,0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
        ) : (
          // View Mode
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{profileData?.name || 'User Name'}</Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="phone" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.userPhone}>{profileData?.phone || '+91 - 00000 00000'}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.userEmail}>{profileData?.email || 'user@email.com'}</Text>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Right Section - Image & Actions */}
      <View style={styles.profileRightSection}>
        {/* Edit/Save Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : handleEditToggle}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FF6B6B" />
          ) : (
            <MaterialIcons 
              name={isEditing ? "check" : "edit"} 
              size={20} 
              color="#FF6B6B" 
            />
          )}
        </TouchableOpacity>

        {/* Profile Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={
              profileImage
                ? profileImage
                : profileData?.profile_photo
                  ? { uri: profileData.profile_photo }
                  : { uri: USER.avatar }
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={onSelectImage}
            disabled={uploadingProfileImage || isEditing}
            activeOpacity={0.7}
          >
            {uploadingProfileImage ? (
              <ActivityIndicator size="small" color="#FF6600" />
            ) : (
              <MaterialIcons name="camera-alt" size={16} color="#FF6600" />
            )}
          </TouchableOpacity>
        </View>

        {/* Cancel Button (only in edit mode) */}
        {isEditing && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleEditToggle}
            activeOpacity={0.8}
          >
            <MaterialIcons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Main Component
export default function UserProfile() {
  const navigation = useNavigation();
  const [oneExpanded, setOneExpanded] = useState(false);
  const [orderType, setOrderType] = useState('food');
  const [orders, setOrders] = useState(PAST_ORDERS);
  const [menuVisible, setMenuVisible] = useState(false);

   const [profileImage, setProfileImage] = useState(null);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [profileData, setProfileData] = useState({
    name: USER.name,
    phone: USER.phone,
    email: USER.email,
    profile_photo: USER.avatar,
    profilePercentage: '75%',
    currentMembershipName: 'Gold'
  });

    const handleSaveProfile = async (updatedData) => {
    // Replace with actual API call
    // await userProfileService.UpdateProfile(updatedData);
    
    setProfileData(prev => ({
      ...prev,
      ...updatedData,
    }));   

    // Toast.show('Profile updated successfully');
  };
  const handleRateFood = (orderId, rating) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, foodRating: rating } : o))
    );
  };

  const handleRateDelivery = (orderId, rating) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, deliveryRating: rating } : o))
    );
  };

  const handleReorder = (orderId) => {
    alert(`Reordering from order #${orderId}`);
  };

  const handleMenuSelect = (option) => {
    alert(`${option} selected`);
  };

   const getPickedImageSizeBytes = async (image) => {
    if (typeof image.size === 'number' && image.size > 0) return image.size;
    const rawPath = image?.path;
    if (!rawPath || typeof rawPath !== 'string') return null;
    const path = rawPath.replace(/^file:\/\//, '');
    try {
      const st = await RNFS.stat(path);
      return typeof st.size === 'number' ? st.size : null;
    } catch {
      return null;
    }
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: false,
      mediaType: 'photo',
    })
      .then(async (image) => {
        // Validation
        const resolvedMime = resolveVendorProfilePhotoMime(image);
        if (!resolvedMime) {
          Alert.alert('Profile photo', 'Please choose a JPG, JPEG, PNG, or WebP image only.');
          return;
        }
        
        const maxBytes = getVendorProfilePhotoMaxSizeBytes();
        const sizeBytes = await getPickedImageSizeBytes(image);
        if (sizeBytes != null && sizeBytes > maxBytes) {
          Alert.alert('Profile photo', 'Image must be 2MB or smaller.');
          return;
        }

        setUploadingProfileImage(true);
        
        try {
          // Simulate upload - replace with your actual API call
          // await userProfileService.UploadVendorProfileImage(vid, { ...image, mime: resolvedMime });
          
          // Update local state
          setProfileImage({ uri: image.path });
          setProfileData(prev => ({ ...prev, profile_photo: image.path }));
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (err) {
          Alert.alert('Profile photo', 'Upload failed. Please try again.');
        } finally {
          setUploadingProfileImage(false);
        }
      })
      .catch((error) => {
        if (error?.code !== 'E_PICKER_CANCELLED') {
          console.log('ImagePicker Error: ', error);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ProfileHeader
        onMenuPress={() => setMenuVisible(true)}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Gradient Header Background */}
        <View style={styles.gradientHeader}>
           <ProfileCard 
            profileData={profileData}
            profileImage={profileImage}
            uploadingProfileImage={uploadingProfileImage}
            onSelectImage={selectImage}
             onSaveProfile={handleSaveProfile}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ChefGyOneBanner
            expanded={oneExpanded}
            onToggle={() => setOneExpanded(!oneExpanded)}
          />

          <QuickActions />

          <MenuList />

          <PastOrders
            orders={orders}
            orderType={orderType}
            onTypeChange={setOrderType}
            onRateFood={handleRateFood}
            onRateDelivery={handleRateDelivery}
            onReorder={handleReorder}
          />

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* Floating Button */}
      {/* <BrowseButton onPress={() => alert('Browse all past orders')} /> */}

      {/* More Options Modal */}
      <MoreOptionsModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelect={handleMenuSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpButton: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  helpText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '600',
  },
  menuButton: {
    padding: 4,
  },

  // Gradient Header
  gradientHeader: {
    backgroundColor: '#FF6B6B',
    paddingTop: 20,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  // Profile Card
  profileCard: {
    marginTop: 10,
  },
  profileInfo: {
    paddingLeft: 10,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  // Content
  content: {
    paddingHorizontal: 16,
    marginTop: -40,
  },

  // Swiggy One Banner
  ChefGyOneBanner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  oneBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  oneLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oneLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginRight: 10,
  },
  activeBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  savedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exploreText: {
    fontSize: 13,
    color: '#666',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },

  // Quick Actions
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    width: (width - 48) / 4,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
  },

  // Menu List
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },

  // Orders Section
  ordersSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  // Toggle
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  toggleActive: {
    backgroundColor: '#000',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  toggleTextActive: {
    color: '#fff',
  },

  // Order Card
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  orderHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantLocation: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00C853',
    marginRight: 4,
  },

  // Items
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qtyBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  itemName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },

  // Ratings
  ratingsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  ratingColumn: {
    flex: 1,
    alignItems: 'center',
  },
  ratingDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 8,
  },
  ratingLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    padding: 2,
  },

  // Reorder
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  reorderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginRight: 4,
  },

  // Order Footer
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderMeta: {
    fontSize: 12,
    color: '#999',
    marginRight: 6,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },

  // Floating Button
  browseButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  browseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingRight: 16,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  modalIcon: {
    marginRight: 12,
  },
  modalText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  profileCard: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    paddingLeft: 10,
    flex: 1,
  },
  
  // Profile Image Section
  profileImageSection: {
    marginLeft: 16,
  },
  imageWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: '#f0f0f0',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF6600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cameraIcon: {
    
  },
  profileCard: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },

  // Left Section
  profileInfoContainer: {
    flex: 1,
    marginRight: 12,
  },
  profileInfo: {
    paddingLeft: 6,
    paddingTop: 8,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.2,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.2,
  },

  // Edit Mode Inputs
  editContainer: {
    paddingTop: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputIcon: {
    marginRight: 10,
    opacity: 0.9,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    paddingVertical: 4,
  },
  inputError: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255,68,68,0.1)',
  },
  errorText: {
    fontSize: 11,
    color: '#FFCCCC',
    marginLeft: 8,
    marginTop: -4,
    marginBottom: 8,
    fontWeight: '500',
  },

  // Right Section
  profileRightSection: {
    alignItems: 'center',
    gap: 10,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  imageWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#f0f0f0',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF6600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },

});