import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const VegIngredients = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.V_I_Content}>
      <View style={styles.V_I_Header}>
        <TouchableOpacity onPress={()=>navigation.navigate('CaterMenu')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Menu}/>
        </TouchableOpacity>
        <Text style={styles.V_I_Header_Text}>Ingredients</Text>
        <TouchableOpacity style={styles.V_I_Fev_Content}>
          <Image source={require('../assets/icon/fevr.png')} style={styles.V_I_Fev_Icon}/>
          <Text style={styles.V_I_Fev_Count}>250k</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default VegIngredients

const styles = StyleSheet.create({
  V_I_Content:{
    backgroundColor:'#ffff'
  },
  V_I_Header:{
    padding:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  Back_To_Menu:{
    width:20,
    height:20
  },
  V_I_Header_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#272727'
  },
  V_I_Fev_Content:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  V_I_Fev_Icon:{
    width:20,
    height:20
  }
})