import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper';
import {globalStyle} from '../assets/styles/GlobalStyles';

const User_Details_List = [
  {
    Id: 1,
    Title: 'Order Details',
    Items: [
      {
        Id: 1,
        Name: 'Current Order Status',
        Icon: 'checkbox',
      },
      {
        Id: 2,
        Name: 'Your Orders',
        Icon: 'bag-check',
      },
    ],
  },
  {
    Id: 2,
    Title: 'Accounts & Privacy',
    Items: [
      {
        Id: 1,
        Name: 'Passwords',
        Icon: 'eye-off',
      },
      {
        Id: 2,
        Name: 'Logout',
        Icon: 'log-out',
      },
    ],
  },
];

const UserProfile = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.error('Failed to clear AsyncStorage.', e);
    }
  };

  const handleNavigation = PageName => {
    switch (PageName) {
      case 'Current Order Status':
        navigation.navigate('OrderSummary');
        break;
      case 'Your Orders':
        navigation.navigate('OrderSummary');
        break;
      case 'Logout':
        navigation.navigate('Login');
        break;
      default:
        console.warn(`No action defined for ${PageName}`);
        break;
    }
  };

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
      </View>
      <View style={styles.User_Pro_Content}>
        <View style={styles.User_Pro_Pic}>
          <Image
            source={require('../assets/images/user.jpg')}
            style={styles.User_Image}
          />
        </View>
        <View style={styles.User_Pro_Data}>
          <Text style={styles.User_Pro_Name}>Saicharan Vadlamanu</Text>
          <Text style={styles.User_Pro_Mail}>Charan.vadlamanu@gmail.com</Text>
          <TouchableOpacity
            style={styles.Edit_Button}
            onPress={() => navigation.navigate('EditUserProfile')}>
            <Text style={styles.Edit_Button_Text}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {User_Details_List.map(ListTitle => (
            <View key={ListTitle.Id}>
              <Text style={styles.ListTitle_Name}>{ListTitle.Title}</Text>
              <Card style={styles.List_Content_Card}>
                {ListTitle.Items.map(ListItem => (
                  <View key={ListItem.Id}>
                    <TouchableOpacity
                      style={styles.ListItem}
                      onPress={() => handleNavigation(ListItem.Name)}>
                      <Ionicons
                        name={ListItem.Icon}
                        size={15}
                        color="#B5E61D"
                      />
                      <Text style={styles.ListItem_Name}>{ListItem.Name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.Pay_Buttons}>
        <Text style={[styles.Pay_Buttons_Text]}>App Version 003</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  User_Container: {
    backgroundColor: '#ffff',
  },
  User_Pro_Header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  U_P_Back_Icon: {
    width: 20,
    height: 20,
  },
  U_P_Header_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#272727',
  },
  U_P_Setting_Icon: {
    width: 20,
    height: 20,
  },
  User_Pro_Content: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    margin: 20,
  },
  User_Pro_Pic: {
    position: 'relative',
    width: 100,
  },
  User_Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Open_Cam: {
    position: 'absolute',
    backgroundColor: '#ffff',
    padding: 5,
    borderRadius: 50,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#F7B52D',
  },
  Open_Cam_Icon: {
    width: 20,
    height: 20,
  },
  User_Pro_Data: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  User_Pro_Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  User_Pro_Mail: {
    fontSize: 12,
    color: '#ffff',
  },
  Edit_Button: {
    backgroundColor: '#F7B52D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '70%',
    marginTop:10
  },
  Edit_Button_Text: {
    color: '#ffff',
  },

  //Details List
  ListTitle_Name: {
    backgroundColor: '#E5EAFF',
    color: '#002744',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
  },
  List_Content_Card: {
    backgroundColor: '#ffff',
    // margin:5,
    borderRadius: 0,
    marginTop: 0,
  },
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1.5,
    gap: 10,
  },
  ListItem_Name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#002744',
  },

  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#ffff', // Adjust background color as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color: '#abb2b9',
  },
});

export default UserProfile;
