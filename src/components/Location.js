import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Location = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.Location_Container}>
     <View style={styles.Location_Header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Back_TO_Home}/>
        </TouchableOpacity>
        <Text style={styles.Location_Header_Text}>Enter your area or apartment name</Text>
     </View>
     <View style={styles.Location_Search}>
        <Image source={require('../assets/images/search_Img.png')} style={styles.Location_Search_Icon}/>
        <TextInput keyboardType='default' textContentType='addressCityAndState' placeholder='Ex:Arunodaya Coloney,Madhapur,500018' style={styles.Location_Search_Input}></TextInput>
     </View>
     <View style={styles.Location_Options_Content}>
        <TouchableOpacity style={styles.Location_Current_Content}>
          <Image source={require('../assets/icon/location/Loca_Icon.png')} style={styles.Current_Loc_Icon}/>
          <Text style={styles.Location_Current_Text}>Use my current location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Location_Add_New_Content}>
          
        </TouchableOpacity>
     </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  Location_Container:{
    backgroundColor:'#ffff',
    width:'100%',
    height:'100%'
  },
  Location_Header:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20
  },
  Back_TO_Home:{
    width:20,
    height:20
  },
  Location_Header_Text:{
    fontSize:20,
    fontWeight:'900',
    color:'#272727'
  },

  //search content
  Location_Search:{
    margin:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  Location_Search_Icon:{
    width:20,
    height:20,
    position:'absolute',
    left:10
  },
  Location_Search_Input:{
    borderColor:'#D5DBDB',
    borderWidth:1,
    borderRadius:10,
    width:'100%',
    paddingLeft:40,
    fontSize:12
  },

  //options
  Location_Current_Content:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center',
    marginLeft:20,
    marginRight:20,
    borderBottomColor:'#f4f4f4',
    borderBottomWidth:1,
    paddingBottom:5
  },
  Current_Loc_Icon:{
    width:15,
    height:15
  },
  Location_Current_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#FFC107'
  }
})

export default Location
