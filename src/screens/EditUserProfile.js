import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Edit_User_Data = [{

}]

const EditUserProfile = () => {
  const navigation = useNavigation(); 

  return (
    <ScrollView style={styles.Edit_User_Pro_Content}>
      <View style={styles.Edit_User_Header}>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Edit_User_Back_Icon} />
        </TouchableOpacity>        
        <Text style={styles.E_U_Header_Text}>Edit Profile</Text>
        <Image source={require('../assets/icon/ok.png')} style={styles.Edit_User_Ok_Icon} />
      </View>
      <View style={styles.Edit_User_Pic}>
        <Image source={require('../assets/images/user.jpg')} style={styles.User_Image} />
        <TouchableOpacity style={styles.Open_Cam} >
          <Image source={require('../assets/icon/camera.png')} style={styles.Open_Cam_Icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.Edit_User_Info}>
        <Text  style={styles.Edit_User_Info_HeadLine}>Your Infomation</Text>
        <View style={styles.E_U_Form}>
            <View style={styles.E_U_Form_Content}>
                <Text style={styles.E_U_Input_Lable}>First Name</Text>
                <TextInput keyboardType='text' placeholder='Ex: Saicharan' style={styles.E_U_Input}></TextInput>
            </View>
            <View style={styles.E_U_Form_Content}>
                <Text style={styles.E_U_Input_Lable}>Last Name</Text>
                <TextInput keyboardType='text' placeholder='Ex: Vadlamanu' style={styles.E_U_Input}></TextInput>
            </View>
            <View style={styles.E_U_Form_Content}>
                <Text style={styles.E_U_Input_Lable}>Phone Number</Text>
                <TextInput keyboardType='numeric' placeholder='Ex: 7893456947' style={styles.E_U_Input}></TextInput>
            </View>
            <View style={styles.E_U_Form_Content}>
                <Text style={styles.E_U_Input_Lable}>Email</Text>
                <TextInput keyboardType='email-address' placeholder='Ex: your@gmail.com' style={styles.E_U_Input}></TextInput>
            </View>
            <View style={styles.E_U_Form_Content}>
              <TouchableOpacity style={styles.E_U_From_Save}>
                <Text style={styles.E_U_Save_Text}>Save changes</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={styles.App_Version_Content}>
        <Text style={styles.App_Version_Text}>App Version 003</Text>
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Edit_User_Pro_Content: {
    backgroundColor: '#ffff',
    flex: 1
  },
  Edit_User_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  Edit_User_Back_Icon: {
    width: 20,
    height: 20
  },
  E_U_Header_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#272727'
  },
  Edit_User_Ok_Icon: {
    width: 25,
    height: 25
  },
  Edit_User_Pic: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 30
  },
  User_Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Open_Cam: {
    position: 'absolute',
    backgroundColor: '#ffff',
    padding: 3,
    borderRadius: 50,
    bottom: 0,
    right: '40%',
    borderWidth: 1,
    borderColor: '#F7B52D'
  },
  Open_Cam_Icon: {
    width: 17,
    height: 17
  },
  Edit_User_Info:{
    padding:20
  },
  Edit_User_Info_HeadLine:{
    fontSize:20,
    fontWeight:'bold',
    color:'#272727'
  },
  E_U_Form:{
    marginTop:20
  },
  E_U_Form_Content:{
    marginBottom:15
  },
  E_U_Input_Lable:{
    marginBottom:5
  },
  E_U_Input:{
    borderWidth:1,
    borderColor:'#cccc',
    borderRadius:5,
    paddingLeft:10,
    height:'auto'
  },
  E_U_From_Save:{
    backgroundColor:'#F7B52D',
    width:'100%',
    textAlign:'center',
    padding:10,
    borderRadius:5
  },
  E_U_Save_Text:{
    textAlign:'center',
    color:'#ffff',
    fontWeight:'bold'
  },
  App_Version_Text:{
    margin:30,
    textAlign:'center'
  }
})

export default EditUserProfile
