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
import Svg, {Path} from 'react-native-svg';
import {CaterSelectionStyles} from './CaterSelection.styles';
import {Card} from 'react-native-paper';
const CatersData = [
  {
    Id: 1,
    Name: 'Hotel Guntur Subhani',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Vegan',
    Time: '45 min',
  },
  {
    Id: 2,
    Name: 'Royal Spice Diner',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Indian',
    Time: '30 min',
  },
  {
    Id: 3,
    Name: 'The Green Plate',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Organic',
    Time: '40 min',
  },
  {
    Id: 4,
    Name: 'Sunrise Bakery & Cafe',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Bakery',
    Time: '25 min',
  },
  {
    Id: 5,
    Name: 'Mediterranean Feast',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Mediterranean',
    Time: '35 min',
  },
  {
    Id: 6,
    Name: 'Fusion Delight',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Fusion',
    Time: '50 min',
  },
  {
    Id: 7,
    Name: 'Classic Comfort Foods',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'American',
    Time: '20 min',
  },
  {
    Id: 8,
    Name: 'Spice Garden',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Asian',
    Time: '30 min',
  },
  {
    Id: 9,
    Name: 'Tropical Treats',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Tropical',
    Time: '45 min',
  },
  {
    Id: 10,
    Name: 'Urban Eats',
    Img: require('../../newassets/images/CaterSelection.jpg'),
    RatingIcon: 'cards-heart',
    Type: 'Contemporary',
    Time: '50 min',
  },
];

const CaterSelection = () => {
  const navigation = useNavigation();
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
          <ScrollView>
            {CatersData.map(item => (
              <View key={item.Id}>
                <Card style={CaterSelectionStyles.CaterCard}>
                  <View style={CaterSelectionStyles.CaterCardBody}>
                    <Card style={CaterSelectionStyles.ImageCard}>
                      <Image
                        source={item.Img}
                        style={CaterSelectionStyles.RestroImg}
                      />
                    </Card>
                    <View style={CaterSelectionStyles.RestroInfo}>
                      <Text style={CaterSelectionStyles.RestroName}>{item.Name}</Text>
                      <View style={{flexDirection: 'row', marginTop: 5}}>
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <MCIcons
                              key={index}
                              name={item.RatingIcon}
                              size={15}
                              color="#0B7672"
                              style={{marginRight: index < 4 ? 5 : 0}} // Add gap only between icons
                            />
                          ))}
                      </View>
                      <View style={CaterSelectionStyles.RestroDetails}>
                          <View style={CaterSelectionStyles.TypeSection}>
                            <MCIcons name='leaf' size={15} color="#0B7672"/>
                            <Text style={CaterSelectionStyles.TypeName}>{item.Type}</Text>
                          </View>
                          <View style={CaterSelectionStyles.TimeSection}>
                            <MCIcons name='progress-clock' size={15} color="#0B7672"/>
                            <Text style={CaterSelectionStyles.TimeDuration}>{item.Time}</Text>
                          </View>
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
        <TouchableOpacity>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CaterSelection;
