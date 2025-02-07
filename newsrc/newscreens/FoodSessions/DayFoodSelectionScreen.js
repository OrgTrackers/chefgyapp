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
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import { DayFoodSelectionStyles } from './DayFoodSelection.styles';

const TypesData =[
  {
    Id:1,
    Name:'Breakfast',
    Items:[
      {
        Id:1,
        Name:'Italian',
        // Image:require('')
      }
    ]
  }
]

const DayFoodSelectionScreen = () => {
  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity style={DayFoodSelectionStyles.HeaderContent}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={DayFoodSelectionStyles.PageName}>Food Session</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={GlobalCss.MainContainer} showsVerticalScrollIndicator={false}>


      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <FooterComponent />
      </View>
    </View>
  );
};

export default DayFoodSelectionScreen;
