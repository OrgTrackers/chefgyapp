import { Image, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';

import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const App_Footer=[
    {
      Id:1,
      Icon:'home-outline',
      Lable:'Home',
    },
    {
      Id:2,
      Icon:'account-multiple',
      Lable:'Caters',
    },
    {
      Id:3,
      Icon:'account',
      Lable:'Chef',
    },
    {
      Id:4,
      Icon:'truck-outline',
      Lable:'On Wheels',
    },
    {
      Id:5,
      Icon:'home-outline',
      Lable:'Home',
    },
    {
      Id:6,
      Icon:'account-multiple',
      Lable:'Caters',
    },
    {
      Id:7,
      Icon:'account',
      Lable:'Chef',
    },
    {
      Id:8,
      Icon:'truck-outline',
      Lable:'On Wheels',
    },
]

const Footer = () => {
  return (
    <View style={styles.footer}>
      <ScrollView  horizontal showsHorizontalScrollIndicator={false} style={styles.Footer_Container}>
        {App_Footer.map((Footer_Item)=>(
            <TouchableOpacity key={Footer_Item.Id} style={styles.Footer_Content}>
               <MCIcons name={Footer_Item.Icon} size={24} color='#FF9800'/>
                <Text style={styles.Footer_Text}>{Footer_Item.Lable}</Text>
            </TouchableOpacity>
        ))}
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
  Footer_Content:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginRight:25,
    padding:5,
    marginLeft:15
  },
  Footer_Text:{
    fontSize:12,
    fontWeight:'bold'
  }
});
