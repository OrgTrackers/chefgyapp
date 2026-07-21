import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../services/api/userService';



const OtpContent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, token, fullName } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

  const onOTPInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Ensures only one character is entered
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }

    const txtOtp = newOtp.join('');
    console.log(txtOtp);
  };

  const handleComplete = async () => {
    const objOTP = {
      userId: userId,
      otpCode: otp.join('')
    };
    console.log(objOTP)
    try {
      const response = await userService.ValidateUserOTP(objOTP);
      const { data } = response;
      if (response.status == 200) {
        await AsyncStorage.setItem('userToken', token.toString());
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('fullName', fullName.toString());
        navigation.navigate('Home', { showLocationPrompt: true });
      } else {
        Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      //console.error('OTP validation failed:', error.message);
      Alert.alert('Verification Failed', 'An error occurred during OTP validation. Please try again.');
    }
  }

  return (
    <View style={styles.Otp_Container}>
      <View style={styles.Otp_Header}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Signup_Icon} />
        </TouchableOpacity>
        <View style={styles.Otp_Image_Content}>
          <Image source={require('../assets/images/Otp.jpg')} style={styles.Otp_Image} />
        </View>
      </View>
      <View style={styles.Otp_Content}>
        <Text style={styles.Otp_Content_Header}>Verification</Text>
        <View style={styles.Otp_Input_Content}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(input) => (otpInputs.current[index] = input)}
              keyboardType="number-pad"
              style={styles.Otp_Input}
              maxLength={1}
              onChangeText={(text) => onOTPInputChange(text, index)}
              value={value}
            />
          ))}
        </View>
        <View style={styles.ResendTime_Content}>
          <Text style={styles.Resend_Text}>Resend on : 0:15</Text>
        </View>
        <View style={styles.Verify_Btn_Content}>
          <TouchableOpacity style={styles.Verify_Btn} onPress={handleComplete}>
            <Text style={styles.Verify_Btn_Text}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.App_Version_Content}>
        <Text style={styles.App_Version_Text}>App Version 003</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Otp_Container: {
    backgroundColor: '#ffff',
    width: '100%',
    height: '100%'
  },
  Otp_Header: {
    padding: 20
  },
  Back_To_Signup_Icon: {
    width: 20,
    height: 20
  },
  Otp_Image: {
    width: '100%',
    height: 200
  },
  Otp_Content: {
    margin: 20
  },
  Otp_Content_Header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#272727'
  },
  Otp_Input_Content: {
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  Otp_Input: {
    borderWidth: 1,
    borderColor: '#cccc',
    width: 50,
    textAlign: 'center',
    borderRadius: 5
  },
  ResendTime_Content: {
    marginTop: 20
  },
  Resend_Text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F7B52D'
  },
  Verify_Btn_Content: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  Verify_Btn: {
    backgroundColor: '#F7B52D',
    padding: 10,
    borderRadius: 5,
    marginLeft: '15%',
    marginRight: '15%'
  },
  Verify_Btn_Text: {
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'center'
  },
  App_Version_Content: {
    padding: 40
  },
  App_Version_Text: {
    textAlign: 'center'
  }
})

export default OtpContent
