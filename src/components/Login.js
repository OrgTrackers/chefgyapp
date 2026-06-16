import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import userService from '../services/api/userService';

const Login = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignIn = async () => {
    const userObj = { mobilenumber: phoneNumber };
    try {
      const response = await userService.LoginUserOTP(userObj);
      console.log(response)
      const { data } = response;
      if (data && data.token) {
        navigation.navigate('OtpContent', { userId: data.user.userid, token: data.token });
      } else {
        console.error('Login failed: Unexpected response structure');
        Alert.alert('Login Failed', 'Unexpected response from server. Please try again later.');
      }
    } catch (error) {
      //console.error('Login failed: Please check your phone number and try again', error.message);
      Alert.alert('Login Failed', 'Please check your phone number and try again.');
    }
  };


  return (
    <ImageBackground style={styles.Login_Container} source={require('../assets/images/login_banner.jpg')}>
      {/* <View style={styles.Back_To_Home}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Home_Icon} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.Login_Card}>
        <Text style={styles.Welcome_Text}>Welcome back</Text>
        <Text style={styles.Login_Text}>Sign in to continue</Text>
        <View>
          <TextInput keyboardType='numeric' placeholder='Enter Phone Number' style={styles.Login_Card_Input}
            value={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <View style={styles.Button_Container}>
          <TouchableOpacity style={styles.SignIn_Button} onPress={handleSignIn}>
            <Text style={styles.SignIn_Button_Text}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Horizontal_Line_Container}>
          <View style={styles.Horizontal_Line} />
          <Text style={styles.Or_Text}>Or</Text>
          <View style={styles.Horizontal_Line} />
        </View>
        <View style={styles.Social_Links}>
          <Image source={require('../assets/icon/facebook.png')} style={styles.Social_Links_Image} />
          <Image source={require('../assets/icon/google.png')} style={styles.Social_Links_Image} />
          <Image source={require('../assets/icon/twitter.png')} style={styles.Social_Links_Image} />
        </View>
        <View style={styles.Or_Signup_Container}>
          <Text style={styles.Or_Signup_Container_Text}>You don't have account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.Or_Signup_Container_To_Signup}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Login_Container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  Back_To_Home: {
    padding: 20
  },
  Back_To_Home_Icon: {
    width: 20,
    height: 20
  },
  Login_Card: {
    backgroundColor: '#ffff',
    width: '90%',
    marginTop: '30%',
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
  Social_Links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    cursor: 'pointer',
    padding: 20
  },
  Social_Links_Image: {
    width: 30,
    height: 30,
    objectFit: 'cover'
  },
  Or_Signup_Container: {
    textAlign: 'center',
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Or_Signup_Container_Text: {
    textAlign: 'center'
  },
  Or_Signup_Container_To_Signup: {
    color: '#F7B52D',
    marginLeft: 10,
    cursor: 'pointer',
    fontWeight: 'bold'
  }
});

export default Login;
