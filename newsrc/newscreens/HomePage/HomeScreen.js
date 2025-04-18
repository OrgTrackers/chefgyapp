import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import MTIcons from 'react-native-vector-icons/MaterialIcons';
import {HomeScreenStyles} from './HomeScreen.styles';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {Card} from 'react-native-paper';

const HomeCategory = [
  {
    Id: 1,
    Name: 'Cater',
    Image: require('../../newassets/images/Home/HCate-1.webp'),
    Rating: 4,
  },
  {
    Id: 2,
    Name: 'Chef',
    Image: require('../../newassets/images/Home/HCate-2.webp'),
    Rating: 5,
  },
  {
    Id: 3,
    Name: 'Home Food',
    Image: require('../../newassets/images/Home/HCate-3.webp'),
    Rating: 3,
  },
  {
    Id: 4,
    Name: 'Food Truck',
    Image: require('../../newassets/images/Home/HCate-4.webp'),
    Rating: 5,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleNavigation = categoryName => {
    switch (categoryName) {
      case 'Cater':
        navigation.navigate('EventsScreen');
        break;
      case 'Chef':
        navigation.navigate('ChefEventsScreen');
        break;
      case 'Home Food':
        navigation.navigate('HomeFoodEventsScreen');
        break;
      case 'Food Truck':
        navigation.navigate('FoodTruckEventsScreen');
        break;
      default:
        console.warn('No screen found for this category!');
    }
  };
  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <View style={HomeScreenStyles.HeaderContent}>
          <TouchableOpacity style={HomeScreenStyles.AddressContainer}>
            <Text style={HomeScreenStyles.AddressHeader}>Your Location</Text>
            <View style={HomeScreenStyles.AddressLine}>
              <MTIcons
                name="location-on"
                size={20}
                color={GlobalCss.ThemeColor.color}
              />
              <Text style={HomeScreenStyles.AddressText} numberOfLines={1}>
                5-74,Arunodaya Street,Madhapur,Hyderabad,Telangana
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={HomeScreenStyles.UserContainer}>
            <FaIcons name="bell" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={HomeScreenStyles.UserDetailsCotainer}>
          <View style={HomeScreenStyles.UserImgNameContainer}>
            <Image
              source={require('../../newassets/images/user.webp')}
              style={HomeScreenStyles.UserImg}
            />
            <View>
              <Text style={HomeScreenStyles.UserName}>Charan Vadlamanu</Text>
              <Text style={HomeScreenStyles.UserTagLine}>Rated New Outlet</Text>
            </View>
          </View>
          <View style={HomeScreenStyles.UserRatingContainer}>
            <View style={HomeScreenStyles.UserRatingTextContainer}>
              <Text style={HomeScreenStyles.UserRatingText}>5</Text>
              <MCIcons
                name="star"
                size={12}
                color={GlobalCss.ThemeColor.color}
              />
            </View>
            <Text style={HomeScreenStyles.UserRatingTagLine}>
              Outstanding !
            </Text>
          </View>
        </TouchableOpacity>
        <View style={HomeScreenStyles.HomeUpdatesContainer}>
          <Image
            source={require('../../newassets/images/Home/HomeMiddle.webp')}
            style={HomeScreenStyles.HomeUpdateImage}
          />
          <TouchableOpacity
            style={[
              GlobalCss.ThemeBackgroundColor,
              HomeScreenStyles.GotoButton,
            ]}>
            <Text style={HomeScreenStyles.GotoButtonText}>Go to</Text>
          </TouchableOpacity>
        </View>
        <View style={HomeScreenStyles.HomeCateContainer}>
          {HomeCategory.map(HomeCateItem => (
            <View key={HomeCateItem.Id} style={HomeScreenStyles.gridItem}>
              <Card style={HomeScreenStyles.HomeCateCard}>
                <View style={HomeScreenStyles.HomeCateImgRatingContainer}>
                  <Image
                    source={HomeCateItem.Image}
                    style={HomeScreenStyles.HomeCateImg}
                  />
                  <View style={[HomeScreenStyles.HomeCateRatingContainer]}>
                    <Text style={[HomeScreenStyles.RatingText]}>
                      {HomeCateItem.Rating}
                    </Text>
                    <MCIcons
                      name="star"
                      size={12}
                      color={GlobalCss.ThemeColor.color}
                    />
                  </View>
                </View>
                <Text style={HomeScreenStyles.HomeCateName}>
                  {HomeCateItem.Name}
                </Text>
                <TouchableOpacity
                  style={[
                    GlobalCss.ThemeBackgroundColor,
                    HomeScreenStyles.BookButton,
                  ]} onPress={() => handleNavigation(HomeCateItem.Name)} >
                  <Text style={HomeScreenStyles.BookButtonText}>Book Now</Text>
                  {/* <MCIcons name='arrow-right-thin' size={15} color="#fff"/> */}
                </TouchableOpacity>
              </Card>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <FooterComponent />
      </View>
    </View>
  );
};

export default HomeScreen;
