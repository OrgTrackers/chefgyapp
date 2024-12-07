import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {globalStyle} from '../assets/styles/GlobalStyles';

import Header from './Header';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome6';

//Paper
import {Button, Card, Modal, Portal, Tooltip} from 'react-native-paper';

const OrderAccepted = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Main_Content}>
      <Ionicons name="checkmark-circle-sharp" color="#00AB6B" size={60} />
      <Text style={styles.Text_One}>Your Order Has Been Accepted</Text>
      <Text style={styles.Text_Second}>
        Your Items Has Been Accepted And Our Representative Will Contactr You
        Soon
      </Text>
      <Button
        style={[styles.Pay_Buttons, globalStyle.g_appDefaultContentBgColor]}
        onPress={() => navigation.navigate('OrderSummary')}>
        <View style={styles.Pay_Button_Content}>
          <Text style={[styles.Pay_Buttons_Text]}>Back</Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Content: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text_One: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: '5%',
    width: '60%',
    marginBottom: '5%',
  },
  Text_Second: {
    textAlign: 'center',
    // width:'90%',
    fontSize: 12,
    width: '80%',
  },

  
  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    // borderTopWidth: 1,
    borderRadius: 0,
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color: '#fff',
  },
  Pay_Button_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

});

export default OrderAccepted;
