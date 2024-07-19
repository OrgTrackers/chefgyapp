import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const App_Footer=[
    {
      Id:1,
      Icon:require('../assets/icon/appFooter/Footer_Img_1.png'),
      Lable:'Home',
    },
    {
      Id:2,
      Icon:require('../assets/icon/appFooter/Footer_Img_2.png'),
      Lable:'Caters',
    },
    {
      Id:3,
      Icon:require('../assets/icon/appFooter/Footer_Img_3.png'),
      Lable:'Chef',
    },
    {
      Id:4,
      Icon:require('../assets/icon/appFooter/Footer_Img_4.png'),
      Lable:'Wish Dish',
    },
    {
      Id:5,
      Icon:require('../assets/icon/appFooter/Footer_Img_5.png'),
      Lable:'On Wheels',
    },
]

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.Footer_Container}>
        {App_Footer.map((Footer_Item)=>(
            <View key={Footer_Item.Id} style={styles.Footer_Content}>
                <Image source={Footer_Item.Icon} style={styles.Footer_Img}/>
                <Text style={styles.Footer_Text}>{Footer_Item.Lable}</Text>
            </View>
        ))}
      </View>
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
    backgroundColor: '#f8f8f8', // Adjust background color as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Footer_Container:{
    display:'flex',
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-around'
  },
  Footer_Content:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  Footer_Img:{
    width:20,
    height:20
  }
});
