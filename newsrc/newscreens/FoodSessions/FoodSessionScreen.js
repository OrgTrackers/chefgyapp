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
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import {FoodSessionStyles} from './FoodSession.styles';
import {Card} from 'react-native-paper';

const FoodDates = [
  {
    Id: 1,
    Date: '05 Feb 2025',
    Items: [
      {
        Id: 1,
        Icon: 'food-apple',
        name: 'Breakfast',
      },
      {
        Id: 2,
        Icon: 'food',
        name: 'Lunch',
      },
      {
        Id: 3,
        Icon: 'food-turkey',
        name: 'Dinner',
      },
    ],
  },
  {
    Id: 2,
    Date: '06 Feb 2025',
    Items: [
      {
        Id: 1,
        Icon: 'food-apple',
        name: 'Breakfast',
      },
      {
        Id: 2,
        Icon: 'food',
        name: 'Lunch',
      },
      {
        Id: 3,
        Icon: 'food-turkey',
        name: 'Dinner',
      },
    ],
  },
  {
    Id: 3,
    Date: '07 Feb 2025',
    Items: [
      {
        Id: 1,
        Icon: 'food-apple',
        name: 'Breakfast',
      },
      {
        Id: 2,
        Icon: 'food',
        name: 'Lunch',
      },
      {
        Id: 3,
        Icon: 'food-turkey',
        name: 'Dinner',
      },
    ],
  },
  {
    Id: 4,
    Date: '08 Feb 2025',
    Items: [
      {
        Id: 1,
        Icon: 'food-apple',
        name: 'Breakfast',
      },
      {
        Id: 2,
        Icon: 'food',
        name: 'Lunch',
      },
      {
        Id: 3,
        Icon: 'food-turkey',
        name: 'Dinner',
      },
    ],
  },
  {
    Id: 5,
    Date: '09 Feb 2025',
    Items: [
      {
        Id: 1,
        Icon: 'food-apple',
        name: 'Breakfast',
      },
      {
        Id: 2,
        Icon: 'food',
        name: 'Lunch',
      },
      {
        Id: 3,
        Icon: 'food-turkey',
        name: 'Dinner',
      },
    ],
  },
];

const FoodSessionScreen = () => {
  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity style={FoodSessionStyles.HeaderContent}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={FoodSessionStyles.PageName}>Food Session</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={GlobalCss.MainContainer} showsVerticalScrollIndicator={false}>
      <View style={FoodSessionStyles.DateFromTo}>
        <Text style={FoodSessionStyles.DateFromToText}>
          05 Feb 2025 To 08 Feb 2025
        </Text>
      </View>
        {FoodDates.map(FoodItemData => (
          <View key={FoodItemData.Id}>
            <Card style={FoodSessionStyles.FoodDateCard}>
              <View style={FoodSessionStyles.FoodDateCardbody}>
                <Text style={FoodSessionStyles.FoodDateText}>
                  {FoodItemData.Date}
                </Text>
                <View style={FoodSessionStyles.FoodTypeConatiner}>
                  {FoodItemData.Items.map(FoodTypeItem => (
                    <TouchableOpacity style={FoodSessionStyles.FoodTypeTextIcon}>
                      <MCIcons
                        name={FoodTypeItem.Icon}
                        size={15}
                        color="#FA3B3D"
                      />
                      <Text style={FoodSessionStyles.FoodTypeName}>
                        {FoodTypeItem.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <FooterComponent />
      </View>
    </View>
  );
};

export default FoodSessionScreen;
