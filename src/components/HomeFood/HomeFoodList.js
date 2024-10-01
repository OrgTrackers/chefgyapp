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
import { globalStyle } from '../../assets/styles/GlobalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto'

import {Card} from 'react-native-paper';

const HomeFoodData = [
  {
    Id: 1,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 20,
    Rating: 4.5,
  },
  {
    Id: 2,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 15,
    Rating: 4.2,
  },
  {
    Id: 3,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 10,
    Rating: 4.8,
  },
  {
    Id: 5,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 30,
    Rating: 4.7,
  },
  {
    Id: 6,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 12,
    Rating: 4.6,
  },
  {
    Id: 7,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 18,
    Rating: 4.9,
  },
  {
    Id: 8,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Veg',
    Price: 'Low',
    Distance: 22,
    Rating: 4.3,
  },
  {
    Id: 9,
    Name: 'Saicharan Vadlamanu',
    MenuType: 'Non-Veg',
    Price: 'High',
    Distance: 14,
    Rating: 4.1,
  },
];

const HomeFoodList = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeFoodFilters')}>
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
        <Text style={[globalStyle.g_appPageHeaderText]}>Home Food Selection</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {HomeFoodData.map(HomeFoodItem => (
            <View key={HomeFoodItem.Id}>
              <Card style={styles.HomeFood_List_Card}>
                <View style={styles.HomeFood_List_CardBody}>
                  <View>
                    <MaIcons name="chef-hat" size={25} />
                  </View>
                  <View style={styles.HomeFood_List_Content}>
                    <Text
                      style={[
                        styles.HomeFood_Name,
                        globalStyle.g_appDefaultTextColor,
                      ]}
                      numberOfLines={1}>
                      {HomeFoodItem.Name}
                    </Text>
                    <View style={styles.HomeFood_Filter_Content}>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name="checkbox-intermediate"
                          size={12}
                          color={HomeFoodItem.MenuType === 'Veg' ? 'green' : 'red'}
                        />
                        <Text style={styles.Fliters_Text}>
                          {HomeFoodItem.MenuType}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name={
                            HomeFoodItem.Price === 'Low' ? 'arrow-down' : 'arrow-up'
                          }
                          size={12}
                          color="black"
                        />
                        <Text style={styles.Fliters_Text}>
                          {HomeFoodItem.Price}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <AntIcons name="star" size={12} color="#f1c40f" />
                        <Text style={styles.Fliters_Text}>
                          {HomeFoodItem.Rating}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <Ionicons
                          name="location-sharp"
                          size={12}
                          color="blue"
                        />
                        <Text style={styles.Fliters_Text}>
                          {HomeFoodItem.Distance}
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
      <TouchableOpacity style={[styles.Btn_As_Footer, globalStyle.g_appDefaultContentBgColor]} onPress={()=>navigation.navigate('HomeFoodConformation')}>
        <Text style={styles.Btn_As_Footer_Text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    HomeFood_List_Card: {
      margin: 5,
      padding: 15,
      backgroundColor: '#ffff',
    },
    HomeFood_List_CardBody:{
      flexDirection:'row',
      alignItems:'center',
      gap:20
    },
    HomeFood_Name: {
      fontWeight: 'bold',
    },
    HomeFood_Filter_Content: {
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
  });

export default HomeFoodList;
