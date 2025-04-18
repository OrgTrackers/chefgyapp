import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenStyles} from './Login.styles';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // adjusts layout based on platform
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <View style={LoginScreenStyles.Page_Background}>
            <View style={LoginScreenStyles.Logo_Container}>
              <Image
                source={require('../../newassets/images/logo-2.webp')}
                style={LoginScreenStyles.Logo}
              />
            </View>

            <View style={LoginScreenStyles.Login_Input_Container}>
              <Text style={LoginScreenStyles.Lable}>Mobile Number</Text>
              <TextInput
                style={LoginScreenStyles.MobileNumber_Input}
                keyboardType="phone-pad"
                placeholder="Enter Mobile Number"
                placeholderTextColor="#ebedef"
              />
              <Text style={LoginScreenStyles.Login_Tag_Line}>
                Enter Valid Mobile Number
              </Text>
            </View>

            <TouchableOpacity
              style={LoginScreenStyles.GetOtp_Btn}
              onPress={() => navigation.navigate('OtpScreen')}
            >
              <Text style={LoginScreenStyles.GetOtp_Btn_Text}>Get Otp</Text>
              <MCIcons name="arrow-right" size={20} color="#ffff" />
            </TouchableOpacity>

            <Text style={LoginScreenStyles.Copy_Right_Text}>
              © 2025 Chefgy. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
