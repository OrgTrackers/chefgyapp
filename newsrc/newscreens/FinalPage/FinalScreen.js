import React from 'react';
import {View, ImageBackground} from 'react-native';
import {FinalScreenStyles} from './FinalScreen.styles';
import {useNavigation} from '@react-navigation/native';

import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';

const FinalScreen = () => {
  return (
    <ImageBackground
      source={require('../../newassets/images/login_banner.jpg')}
      style={FinalScreenStyles.MainPageLayout}>
      <View style={FinalScreenStyles.BlurOverlay} />
      <View style={FinalScreenStyles.PageHeader}>
        <MCIcons
          name="chevron-left"
          size={40}
          color="#272727"
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
      <View style={FinalScreenStyles.PageContent}>
        <Ionicons name="checkmark-circle" size={80} color="#22B14C" />
        <Text style={FinalScreenStyles.Text_One}>Your Order Has Been Accepted</Text>
        <Text style={FinalScreenStyles.Text_Second}>
          Your Items Has Been Accepted And Our Representative Will Contactr You
          Soon
        </Text>
      </View>
    </ImageBackground>
  );
};

export default FinalScreen;
