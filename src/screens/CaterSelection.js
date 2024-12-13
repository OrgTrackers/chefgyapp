import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Footer from '../components/Footer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto'

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import {Rating} from 'react-native-elements';
import {Card} from 'react-native-paper';

const CatersList = [
  {
    Id: 1,
    Name: 'Hotel Guntur Subani',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 20,
    Rating: 4.5,
  },
  {
    Id: 2,
    Name: 'Spicy Bites',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 15,
    Rating: 4.2,
  },
  {
    Id: 3,
    Name: 'Veg Delight',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 10,
    Rating: 4.8,
  },
  {
    Id: 5,
    Name: 'Royal Feast',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 30,
    Rating: 4.7,
  },
  {
    Id: 6,
    Name: 'Taste of India',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 12,
    Rating: 4.6,
  },
  {
    Id: 7,
    Name: 'The Seafood Shack',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 18,
    Rating: 4.9,
  },
  {
    Id: 8,
    Name: 'Garden Fresh',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 22,
    Rating: 4.3,
  },
  {
    Id: 9,
    Name: 'Meat Lovers',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 14,
    Rating: 4.1,
  },
];

const CaterSelection = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('FoodSession')}>
            <Ionicons
              name="chevron-back"
              size={globalStyle.g_appPageHeaderIconsSize.fontSize}
              color={globalStyle.g_appPageHeaderIconsColors.color}
            />
          </TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={globalStyle.g_appPageHeaderIconsSize.fontSize}
            color={globalStyle.g_appPageHeaderIconsColors.color}
          />
        </View>
        <Text style={[globalStyle.g_appPageHeaderText]}>Cater Selection</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {CatersList.map(CaterItem => (
            <View key={CaterItem.Id}>
              <Card style={styles.Cater_List_Card}>
                <View style={styles.Cater_List_CardBody}>
                  <View>
                    <Fontisto name='shopping-store' size={25}/>
                  </View>
                  <View style={styles.Cater_List_Content}>
                    <Text
                      style={[
                        styles.Cater_Name,
                        globalStyle.g_appDefaultTextColor,
                      ]} numberOfLines={1}>
                      {CaterItem.Name}
                    </Text>
                    <View style={styles.Cater_Filter_Content}>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name="checkbox-intermediate"
                          size={12}
                          color={CaterItem.MenuType === 'Veg' ? 'green' : 'red'}
                        />
                        <Text style={styles.Fliters_Text}>
                          {CaterItem.MenuType}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name={
                            CaterItem.Price === 'Low'
                              ? 'arrow-down'
                              : 'arrow-up'
                          }
                          size={12}
                          color="black"
                        />
                        <Text style={styles.Fliters_Text}>
                          {CaterItem.Price}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <AntIcons name="star" size={12} color="#f1c40f" />
                        <Text style={styles.Fliters_Text}>
                          {CaterItem.Rating}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <Ionicons
                          name="location-sharp"
                          size={12}
                          color="blue"
                        />
                        <Text style={styles.Fliters_Text}>
                          {CaterItem.Distance}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <Footer /> */}
      <TouchableOpacity
          style={styles.Pay_Buttons}
          onPress={() => navigation.navigate('Menus')}>
          <Text
            style={[
              styles.Pay_Buttons_Text,
            ]}>
            Next
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Cater_List_Card: {
    margin: 5,
    padding: 15,
    backgroundColor: '#ffff',
  },
  Cater_List_CardBody:{
    flexDirection:'row',
    alignItems:'center',
    gap:20
  },
  Cater_Name: {
    fontWeight: 'bold',
  },
  Cater_Filter_Content: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  Fliters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  Fliters_Text: {
    fontSize: 10,
    fontWeight: 'bold',
    color:'#000'
  },

  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#002744', // Adjust background color as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color:'#fff'
  },
});

export default CaterSelection;
