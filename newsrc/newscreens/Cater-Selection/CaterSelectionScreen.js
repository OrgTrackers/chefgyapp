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
import Svg, {Path} from 'react-native-svg';
import {CaterSelectionScreenStyles} from './CaterSelection.styles';
import {Card} from 'react-native-paper';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';

const CatersData = [
  {
    Id: 1,
    Name: 'Hotel Guntur Subhani',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Vegan',
    Time: '45 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 2,
    Name: 'Royal Spice Diner',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Indian',
    Time: '30 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 3,
    Name: 'The Green Plate',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Organic',
    Time: '40 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 4,
    Name: 'Sunrise Bakery & Cafe',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Bakery',
    Time: '25 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 5,
    Name: 'Mediterranean Feast',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Mediterranean',
    Time: '35 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 6,
    Name: 'Fusion Delight',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Fusion',
    Time: '50 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 7,
    Name: 'Classic Comfort Foods',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'American',
    Time: '20 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 8,
    Name: 'Spice Garden',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Asian',
    Time: '30 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 9,
    Name: 'Tropical Treats',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Tropical',
    Time: '45 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
  {
    Id: 10,
    Name: 'Urban Eats',
    Img: require('../../newassets/images/CaterSelection.webp'),
    RatingIcon: 'star',
    Type: 'Contemporary',
    Time: '50 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
];

const CaterSelectionScreen = () => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState({}); // State to track liked items

  const toggleLike = id => {
    setLikedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the liked state
    }));
  };
  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity style={CaterSelectionScreenStyles.HeaderContent} onPress={()=>navigation.navigate('FoodSessionScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={CaterSelectionScreenStyles.PageName}>
            Cater Selection
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        {CatersData.map(CaterItem => (
          <View key={CaterItem.Id}>
            <Card style={CaterSelectionScreenStyles.CaterCard}>
              <View style={CaterSelectionScreenStyles.CaterCardBody}>
                <View style={CaterSelectionScreenStyles.RestroImgContent}>
                  <Image
                    source={CaterItem.Img}
                    style={CaterSelectionScreenStyles.RestroImg}
                  />
                </View>
                <View style={CaterSelectionScreenStyles.CaterRestroDetailsContainer}>
                  <Text style={CaterSelectionScreenStyles.CaterRestroName}>
                    {CaterItem.Name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleLike(CaterItem.Id)}
                    style={CaterSelectionScreenStyles.LikeUnLikeButton}>
                    <MCIcons
                      name={
                        likedItems[CaterItem.Id]
                          ? 'cards-heart'
                          : 'cards-heart-outline'
                      }
                      size={20}
                      color={likedItems[CaterItem.Id] ? '#FA3B3D' : '#FA3B3D'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={CaterSelectionScreenStyles.CaterRestroDescription}
                    numberOfLines={2}>
                    {CaterItem.Description}
                  </Text>
                  <View style={CaterSelectionScreenStyles.CaterPriceContainer}>
                    <FaIcons name="rupee" size={15} color="#000" />
                    <Text style={CaterSelectionScreenStyles.CaterPrice}>
                      {CaterItem.Price}
                    </Text>
                  </View>
                  <View
                    style={CaterSelectionScreenStyles.CaterRatingTimeAddContainer}>
                    <View
                      style={CaterSelectionScreenStyles.CaterRatingTimeConatainer}>
                      <View style={CaterSelectionScreenStyles.CaterRatingContainer}>
                        <MCIcons name="star" size={15} color="#FA3B3D" />
                        <Text style={CaterSelectionScreenStyles.CaterRating}>
                          4.5
                        </Text>
                      </View>
                      <View style={CaterSelectionScreenStyles.CaterTimeContainer}>
                        <MCIcons
                          name="progress-clock"
                          size={15}
                          color="#FA3B3D"
                        />
                        <Text style={CaterSelectionScreenStyles.CaterTime}>
                          {CaterItem.Time}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={CaterSelectionScreenStyles.CaterAddButtons}>
                      <MCIcons
                        name="plus-circle-outline"
                        size={15}
                        color="#FA3B3De"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <View style={CaterSelectionScreenStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              CaterSelectionScreenStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]} onPress={()=>navigation.navigate('MenuSelection')}>
            <Text style={CaterSelectionScreenStyles.FooterButtonText}>Select Menus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CaterSelectionScreen;
