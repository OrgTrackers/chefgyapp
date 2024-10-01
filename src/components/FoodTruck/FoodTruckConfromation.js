import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
//Global Styles
import {useNavigation} from '@react-navigation/native';
import {globalStyle} from '../../assets/styles/GlobalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Header from '../Header';

import {Card} from 'react-native-paper';

const FoodTruckConformation = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={()=>navigation.navigate('FoodTruckFilters')}/>
        <Text style={[globalStyle.g_appPageHeaderText]}>Summary</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={styles.Summary_Details_Section}>
            <Text
              style={[
                styles.Summary_Details_Header,
                globalStyle.g_appDefaultTextColor,
              ]}>
              Party Details
            </Text>
            <View style={styles.Summary_Details_Body}>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>Date</Text>
                <Text style={styles.Summary_Details_Data}>01 Oct 2024</Text>
              </View>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>Time</Text>
                <Text style={styles.Summary_Details_Data}>09:30 AM</Text>
              </View>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>No.of people</Text>
                <Text style={styles.Summary_Details_Data}>20</Text>
              </View>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>No.of dishes</Text>
                <Text style={styles.Summary_Details_Data}>15</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.Summary_Details_Section}>
            <Text
              style={[
                styles.Summary_Details_Header,
                globalStyle.g_appDefaultTextColor,
              ]}>
              Offers & Benefits
            </Text>
            <View style={styles.Summary_Details_Body}>
              <Card style={styles.Apply_Offers_Card}>
                <View style={styles.Apply_Offers_Cardbody}>
                  <View>
                    <Text style={styles.Summary_Details_Label}>
                      Apply Coupons
                    </Text>
                    <Text style={styles.Summary_Details_Label_Tag}>
                      Enjoy benefits with our exclusive offers
                    </Text>
                  </View>
                  <View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={15}
                      color="#000"
                    />
                  </View>
                </View>
              </Card>
            </View>
          </Card>
          <View style={styles.Bill_Summary_Content}>
            <View style={styles.Line} />
            <View>
              <Text style={styles.Bill_Summary_Text}>Bill Summary</Text>
            </View>
            <View style={styles.Line} />
          </View>
          <Card style={styles.Summary_Details_Section}>
            <Text
              style={[
                styles.Summary_Details_Header,
                globalStyle.g_appDefaultTextColor,
              ]}>
              Total Amount
            </Text>
            <View style={styles.Summary_Details_Body}>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>Bill</Text>
                <View style={styles.Money_Data}>
                  <FaIcons name="rupee" size={12} color="#000" />
                  <Text style={styles.Summary_Details_Data}>20000</Text>
                </View>
              </View>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Label}>Platform Fee</Text>
                <View style={styles.Money_Data}>
                  <FaIcons name="rupee" size={12} color="#000" />
                  <Text style={styles.Summary_Details_Data}>20.00</Text>
                </View>
              </View>
              <View style={styles.Summary_Details}>
                <Text style={styles.Summary_Details_Total_Label}>
                  Total Bill
                </Text>
                <View style={styles.Money_Data}>
                  <FaIcons name="rupee" size={18} color="#000" marginTop={3} />
                  <Text style={styles.Summary_Details_Total_Data}>20020</Text>
                </View>
              </View>
            </View>
          </Card>
          <TouchableOpacity style={[globalStyle.g_Button]} onPress={()=>navigation.navigate('Home')}>
            <Text style={[globalStyle.g_ButtonText]}>Back To Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <TouchableOpacity
        style={[styles.Btn_As_Footer, globalStyle.g_appDefaultContentBgColor]}>
        <Text style={styles.Btn_As_Footer_Text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn_As_Footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Btn_As_Footer_Text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },

  //Main Content
  Summary_Details_Section: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
  },
  Summary_Details_Body: {
    padding: 10,
    paddingTop: 0,
  },
  Summary_Details_Header: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
  },
  Summary_Details: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  Summary_Details_Label: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  Summary_Details_Label_Tag: {
    fontSize: 10,
    color: '#b2babb',
  },
  Summary_Details_Data: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },

  //Offers
  Apply_Offers_Card: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  Apply_Offers_Cardbody: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  Bill_Summary_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  Line: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'black',
  },
  Bill_Summary_Text: {
    width: 100,
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },

  //Money
  Summary_Details_Total_Label: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Summary_Details_Total_Data: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Money_Data: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});

export default FoodTruckConformation;
