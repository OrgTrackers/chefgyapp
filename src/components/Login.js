import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Image,TouchableOpacity } from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <ImageBackground style={styles.Login_Container} source={require('../assets/images/login_banner.jpg')}>
      <View style={styles.Login_Card}>
        <Text style={styles.Welcome_Text}>Welcome back</Text>
        <Text style={styles.Login_Text}>Sign in to continue</Text>
        <View>
          <TextInput keyboardType='numeric' placeholder='Enter Phone Number' style={styles.Login_Card_Input} />
        </View>
        <View style={styles.Button_Container}>
          <TouchableOpacity style={styles.SignIn_Button} onPress={() => { /* Handle button press here */ }}>
            <Text style={styles.SignIn_Button_Text}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Horizontal_Line_Container}>
          <View style={styles.Horizontal_Line} />
          <Text style={styles.Or_Text}>Or</Text>
          <View style={styles.Horizontal_Line} />
        </View>
        <View style={styles.Social_Links}>
            <Image source={require('../assets/icon/facebook.png')} style={styles.Social_Links_Image}/>
            <Image source={require('../assets/icon/google.png')} style={styles.Social_Links_Image}/>
            <Image source={require('../assets/icon/twitter.png')} style={styles.Social_Links_Image}/>
        </View>
        <View style={styles.Or_Signup_Container}>
            <Text style={styles.Or_Signup_Container_Text}>You don't have account ?  
                <Text style={styles.Or_Signup_Container_To_Signup}> Sign up</Text>
            </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Login_Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  Login_Card: {
    backgroundColor: '#ffff',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
    paddingTop: '5%',
  },
  Welcome_Text: {
    fontSize: 25,
    color: '#272727',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  Login_Text: {
    textAlign: 'center',
  },
  Login_Card_Input: {
    borderWidth: 1,
    borderColor: '#cccc',
    borderRadius: 5,
    margin: 20,
    padding: 10,
  },
  Button_Container: {
    margin: 20, // Adjust margin to fit your design needs
  },
  SignIn_Button: {
    backgroundColor: '#F7B52D',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  SignIn_Button_Text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Horizontal_Line_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20, // Adjust margin for spacing
  },
  Horizontal_Line: {
    flex: 1,
    height: 1,
    backgroundColor: '#cccc',
  },
  Or_Text: {
    marginHorizontal: 10,
    color: '#272727',
  },
  Social_Links:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
    cursor:'pointer',
    padding:20
  },
  Social_Links_Image:{
    width:30,
    height:30,
    objectFit:'cover'
  },
  Or_Signup_Container:{
    textAlign:'center',
    margin:30
  },
  Or_Signup_Container_Text:{
     textAlign:'center'
  },
  Or_Signup_Container_To_Signup:{
    color:'#F7B52D',
    marginLeft:10,
    cursor:'pointer',
    fontWeight:'bold'
  }
});

export default Login;
