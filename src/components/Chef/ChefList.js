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
import Header from '../Header';

import {Card} from 'react-native-paper';

const ChefData = [
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

const ChefList = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={()=>navigation.navigate('ChefFilters')}/>
        <Text style={[globalStyle.g_appPageHeaderText]}>Chef Selection</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ChefData.map(ChefItem => (
            <View key={ChefItem.Id}>
              <Card style={styles.Chef_List_Card}>
                <View style={styles.Chef_List_CardBody}>
                  <View>
                    <MaIcons name="chef-hat" size={25} color={globalStyle.g_ListMainIconColor.color}/>
                  </View>
                  <View style={styles.Chef_List_Content}>
                    <Text
                      style={[
                        styles.Chef_Name,
                        globalStyle.g_appDefaultTextColor,
                      ]}
                      numberOfLines={1}>
                      {ChefItem.Name}
                    </Text>
                    <View style={styles.Chef_Filter_Content}>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name="checkbox-intermediate"
                          size={12}
                          color={ChefItem.MenuType === 'Veg' ? 'green' : 'red'}
                        />
                        <Text style={styles.Fliters_Text}>
                          {ChefItem.MenuType}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <MaIcons
                          name={
                            ChefItem.Price === 'Low' ? 'arrow-down' : 'arrow-up'
                          }
                          size={12}
                          color="black"
                        />
                        <Text style={styles.Fliters_Text}>
                          {ChefItem.Price}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <AntIcons name="star" size={12} color="#f1c40f" />
                        <Text style={styles.Fliters_Text}>
                          {ChefItem.Rating}
                        </Text>
                      </View>
                      <View style={styles.Fliters}>
                        <Ionicons
                          name="location-sharp"
                          size={12}
                          color="blue"
                        />
                        <Text style={styles.Fliters_Text}>
                          {ChefItem.Distance}
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
      <TouchableOpacity style={[styles.Btn_As_Footer, globalStyle.g_appDefaultContentBgColor]} onPress={()=>navigation.navigate('ChefConformation')}>
        <Text style={styles.Btn_As_Footer_Text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    Chef_List_Card: {
      margin: 5,
      padding: 15,
      backgroundColor: '#ffff',
    },
    Chef_List_CardBody:{
      flexDirection:'row',
      alignItems:'center',
      gap:20
    },
    Chef_Name: {
      fontWeight: 'bold',
    },
    Chef_Filter_Content: {
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

export default ChefList;
