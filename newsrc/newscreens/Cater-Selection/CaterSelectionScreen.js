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
import {CaterSelectionStyles} from './CaterSelection.styles';
import {Card} from 'react-native-paper';

const CatersData = [
  {
    Id: 1,
    Name: 'Hotel Guntur Subhani',
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
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
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'star',
    Type: 'Contemporary',
    Time: '50 min',
    Price: '150',
    Description:
      'A restaurant is a place where delicious flavors and great memories come together.',
  },
];

const CaterSelection = () => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState({}); // State to track liked items

  const toggleLike = (id) => {
    setLikedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the liked state
    }));
  };
  return (
    <View style={CaterSelectionStyles.MainPageLayout}>
      <View style={CaterSelectionStyles.PageContent}>
        <View style={CaterSelectionStyles.PageHeader}>
          <MCIcons
            name="chevron-left"
            size={40}
            color="#272727"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Text style={CaterSelectionStyles.PageName}>Cater Selection</Text>
        </View>
        <View style={CaterSelectionStyles.PageMainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {CatersData.map(CaterItem => (
              <View key={CaterItem.Id}>
                <Card style={CaterSelectionStyles.CaterCard}>
                  <View style={CaterSelectionStyles.CaterCardBody}>
                    <View style={CaterSelectionStyles.RestroImgContent}>
                      <Image
                        source={CaterItem.Img}
                        style={CaterSelectionStyles.RestroImg}
                      />
                    </View>
                    <View
                      style={CaterSelectionStyles.CaterRestroDetailsContainer}>
                      <Text style={CaterSelectionStyles.CaterRestroName}>
                        {CaterItem.Name}
                      </Text>
                      <TouchableOpacity
                    onPress={() => toggleLike(CaterItem.Id)}
                    style={CaterSelectionStyles.LikeUnLikeButton}>
                    <MCIcons
                      name={likedItems[CaterItem.Id] ? "cards-heart" : "cards-heart-outline"}
                      size={20}
                      color={likedItems[CaterItem.Id] ? "#FFB20B" : "#FFB20B"}
                    />
                  </TouchableOpacity>
                      <Text
                        style={CaterSelectionStyles.CaterRestroDescription}
                        numberOfLines={2}>
                        {CaterItem.Description}
                      </Text>
                      <View style={CaterSelectionStyles.CaterPriceContainer}>
                        <FaIcons name="rupee" size={15} color="#000" />
                        <Text style={CaterSelectionStyles.CaterPrice}>
                          {CaterItem.Price}
                        </Text>
                      </View>
                      <View
                        style={
                          CaterSelectionStyles.CaterRatingTimeAddContainer
                        }>
                        <View
                          style={
                            CaterSelectionStyles.CaterRatingTimeConatainer
                          }>
                          <View
                            style={CaterSelectionStyles.CaterRatingContainer}>
                            <MCIcons name="star" size={15} color="#FFB20B" />
                            <Text style={CaterSelectionStyles.CaterRating}>
                              4.5
                            </Text>
                          </View>
                          <View style={CaterSelectionStyles.CaterTimeContainer}>
                            <MCIcons
                              name="progress-clock"
                              size={15}
                              color="#FFB20B"
                            />
                            <Text style={CaterSelectionStyles.CaterTime}>
                              {CaterItem.Time}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={CaterSelectionStyles.CaterAddButtons}>
                          <MCIcons
                            name="plus-circle-outline"
                            size={15}
                            color="#FFB20B"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={CaterSelectionStyles.PageFooter}>
        <View style={CaterSelectionStyles.FooterButtonContainer}>
          <TouchableOpacity style={CaterSelectionStyles.SaveButton}>
            <Text style={CaterSelectionStyles.SaveButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CaterSelection;
