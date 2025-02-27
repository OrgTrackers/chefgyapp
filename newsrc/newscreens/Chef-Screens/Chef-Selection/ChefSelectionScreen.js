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
import { ChefSelectionScreenStyles } from './ChefSelectionScreen.styles';
import {Card} from 'react-native-paper';
import { GlobalCss } from '../../../newassets/GlobalStyles/GlobalCss.styles';

const ChefData = [
    {
      Id: 1,
      Name: 'Andrew Doraz',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Vegan',
      Time: '45 min',
      Price: '150',
      Description: 'The best chef turns simple ingredients into pure magic',
    },
    {
      Id: 2,
      Name: 'Bella Martinez',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Italian',
      Time: '30 min',
      Price: '200',
      Description: 'Creating flavors that dance on your taste buds',
    },
    {
      Id: 3,
      Name: 'Carlos Vance',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Mexican',
      Time: '50 min',
      Price: '180',
      Description: 'A chef who blends tradition with innovation',
    },
    {
      Id: 4,
      Name: 'Diana Lee',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Chinese',
      Time: '40 min',
      Price: '160',
      Description: 'Turning fresh ingredients into soulful dishes',
    },
    {
      Id: 5,
      Name: 'Ethan Cooper',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Indian',
      Time: '55 min',
      Price: '220',
      Description: 'Crafting rich flavors with a passion for spices',
    },
    {
      Id: 6,
      Name: 'Fiona Bell',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'French',
      Time: '35 min',
      Price: '250',
      Description: 'Where elegance meets delicious in every bite',
    },
    {
      Id: 7,
      Name: 'George Hill',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Mediterranean',
      Time: '25 min',
      Price: '190',
      Description: 'Bringing the warmth of the Mediterranean to you',
    },
    {
      Id: 8,
      Name: 'Hannah Singh',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Thai',
      Time: '45 min',
      Price: '210',
      Description: 'Balancing bold flavors with a delicate touch',
    },
    {
      Id: 9,
      Name: 'Ian Torres',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Japanese',
      Time: '60 min',
      Price: '300',
      Description: 'Precision and freshness in every sushi roll',
    },
    {
      Id: 10,
      Name: 'Julia Kim',
      Img: require('../../../newassets/images/chefProfile.jpg'),
      RatingIcon: 'star',
      Type: 'Korean',
      Time: '50 min',
      Price: '230',
      Description: 'Infusing tradition with a modern culinary twist',
    },
  ];
  

const ChefSelectionScreen = () => {
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
        <TouchableOpacity style={ChefSelectionScreenStyles.HeaderContent} onPress={()=>navigation.navigate('ChefFoodSessionScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={ChefSelectionScreenStyles.PageName}>
            Chef Selection
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        {ChefData.map(ChefItem => (
          <View key={ChefItem.Id}>
            <Card style={ChefSelectionScreenStyles.CaterCard}>
              <View style={ChefSelectionScreenStyles.CaterCardBody}>
                <View style={ChefSelectionScreenStyles.RestroImgContent}>
                  <Image
                    source={ChefItem.Img}
                    style={ChefSelectionScreenStyles.RestroImg}
                  />
                </View>
                <View style={ChefSelectionScreenStyles.CaterRestroDetailsContainer}>
                  <Text style={ChefSelectionScreenStyles.CaterRestroName}>
                    {ChefItem.Name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleLike(ChefItem.Id)}
                    style={ChefSelectionScreenStyles.LikeUnLikeButton}>
                    <MCIcons
                      name={
                        likedItems[ChefItem.Id]
                          ? 'cards-heart'
                          : 'cards-heart-outline'
                      }
                      size={20}
                      color={likedItems[ChefItem.Id] ? '#FA3B3D' : '#FA3B3D'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={ChefSelectionScreenStyles.CaterRestroDescription}
                    numberOfLines={2}>
                    {ChefItem.Description}
                  </Text>
                  <View style={ChefSelectionScreenStyles.CaterPriceContainer}>
                    <FaIcons name="rupee" size={15} color="#000" />
                    <Text style={ChefSelectionScreenStyles.CaterPrice}>
                      {ChefItem.Price}
                    </Text>
                  </View>
                  <View
                    style={ChefSelectionScreenStyles.CaterRatingTimeAddContainer}>
                    <View
                      style={ChefSelectionScreenStyles.CaterRatingTimeConatainer}>
                      <View style={ChefSelectionScreenStyles.CaterRatingContainer}>
                        <MCIcons name="star" size={15} color="#FA3B3D" />
                        <Text style={ChefSelectionScreenStyles.CaterRating}>
                          4.5
                        </Text>
                      </View>
                      <View style={ChefSelectionScreenStyles.CaterTimeContainer}>
                        <MCIcons
                          name="progress-clock"
                          size={15}
                          color="#FA3B3D"
                        />
                        <Text style={ChefSelectionScreenStyles.CaterTime}>
                          {ChefItem.Time}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={ChefSelectionScreenStyles.CaterAddButtons}>
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
        <View style={ChefSelectionScreenStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
                ChefSelectionScreenStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]} onPress={()=>navigation.navigate('ChefMenuSelectionScreen')}>
            <Text style={ChefSelectionScreenStyles.FooterButtonText}>Select Menus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChefSelectionScreen;
