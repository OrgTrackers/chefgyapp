import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';

const App_Footer = [
  {
    Id: 1,
    Icon: 'home-outline',
    Label: 'Home',
  },
  {
    Id: 2,
    Icon: 'account-multiple',
    Label: 'Caterer',
  },
  {
    Id: 3,
    Icon: 'account',
    Label: 'Chef',
  },
  {
    Id: 4,
    Icon: 'truck-outline',
    Label: 'On Wheels',
  },
  {
    Id: 5,
    Icon: 'apple-icloud',
    Label: 'Cloud Kitchen',
  },
  // {
  //   Id:5,
  //   Icon:'home-outline',
  //   Label:'Home',
  // },
  // {
  //   Id:6,
  //   Icon:'account-multiple',
  //   Label:'Caters',
  // },
  // {
  //   Id:7,
  //   Icon:'account',
  //   Label:'Chef',
  // },
  // {
  //   Id:8,
  //   Icon:'truck-outline',
  //   Label:'On Wheels',
  // },
];

const Footer = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  const handleNavigation = label => {
    setActiveTab(label);
    switch (label) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Caterer':
        navigation.navigate('EventPage');
        break
      default:
        break;
    }
  };

  return (
    <View style={styles.footer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.Footer_Container}>
        {App_Footer.map((Footer_Item) => {
          const isActive = activeTab === Footer_Item.Label;
          return (
            <TouchableOpacity
              key={Footer_Item.Id}
              style={styles.Footer_Content}
              onPress={() => handleNavigation(Footer_Item.Label)}
            >
              <MCIcons
                name={Footer_Item.Icon}
                size={24}
                color={isActive ? globalStyle.g_appMainContentActiveIconText.color : globalStyle.g_appMainContentIconColors.color} // Change icon color based on active state
              />
              <Text style={[styles.Footer_Text, { color: isActive ? globalStyle.g_appMainContentActiveIconText.color : globalStyle.g_appMainContentIconColors.color}]}>
                {Footer_Item.Label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Footer_Content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    padding: 5,
    marginLeft: 15,
  },
  Footer_Text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
