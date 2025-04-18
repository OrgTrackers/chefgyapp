import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path} from 'react-native-svg';
//Styles
import {OtpScreenStyles} from './Otp.styles';

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <ScrollView style={OtpScreenStyles.Page_Background}>
      <View style={OtpScreenStyles.Header_Container}>
        <Ionicons name="chevron-back" size={25} color="#000"  onPress={() => navigation.navigate('LoginScreen')}/>
        <Ionicons name="ellipsis-vertical" size={25} color="#000" />
      </View>
      <View style={OtpScreenStyles.Otp_Image_Container}>
        <Image
          source={require('../../newassets/images/logo-2.webp')}
          style={OtpScreenStyles.OtpImage}
        />
      </View>
      <View style={OtpScreenStyles.Otp_Input_Container}>
        <Text style={OtpScreenStyles.OtpScreen_PageHeader}>
          Verification Code
        </Text>
        <Text style={OtpScreenStyles.OtpScreen_PageHeaderTagLine}>
          We have sent verification code to your mobile number..!
        </Text>
        <View style={OtpScreenStyles.Otp_Inputs}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={OtpScreenStyles.Otp_Input}
              value={value}
              onChangeText={text => handleChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>
      </View>
      <TouchableOpacity style={OtpScreenStyles.Otp_Btn} onPress={()=>navigation.navigate('HomeScreen')}>
        <Text style={OtpScreenStyles.Otp_Btn_Text}>Let's Verify</Text>
      </TouchableOpacity>
      <Text style={OtpScreenStyles.Copy_Right_Text}>© 2025 Chefgy. All rights reserved.</Text>
    </ScrollView>
  );
};

export default OtpScreen;
