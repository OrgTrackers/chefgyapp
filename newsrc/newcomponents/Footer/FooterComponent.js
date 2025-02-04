import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FooterComponentStyles } from './Footer.styles';
import { GlobalCss } from '../../newassets/GlobalStyles/GlobalCss.styles';

const FooterItems = [
  {
    Id: 1,
    Name: 'Home',
    InActiveIcon: 'home-outline',
    ActiveIcon: 'home',
  },
  {
    Id: 2,
    Name: 'Caters',
    InActiveIcon: 'account-group-outline',
    ActiveIcon: 'account-group',
  },
  {
    Id: 3,
    Name: 'Chef',
    InActiveIcon: 'chef-hat',
    ActiveIcon: 'chef-hat',
  },
  {
    Id: 4,
    Name: 'Home Food',
    InActiveIcon: 'food-outline',
    ActiveIcon: 'food',
  },
  {
    Id: 5,
    Name: 'Food Truck',
    InActiveIcon: 'truck-fast-outline',
    ActiveIcon: 'truck-fast',
  },
];

const FooterComponent = () => {
  // Initialize state to track the active item
  const [activeId, setActiveId] = useState(1);

  // Handle item press
  const handlePress = (id) => {
    setActiveId(id);
  };

  return (
    <View style={FooterComponentStyles.footerContainer}>
      {FooterItems.map(item => (
        <TouchableOpacity
          key={item.Id}
          style={FooterComponentStyles.footerItem}
          onPress={() => handlePress(item.Id)}
        >
          <MCIcons
            name={activeId === item.Id ? item.ActiveIcon : item.InActiveIcon}
            size={20}
            color={activeId === item.Id ? '#FFB20B' : '#808080'}
          />
          <Text
            style={{
              color: activeId === item.Id ? '#FFB20B' : '#808080',
              fontSize: 12,
            }}
          >
            {item.Name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterComponent;
