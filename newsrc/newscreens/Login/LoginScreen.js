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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenStyles} from './Login.styles';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path} from 'react-native-svg';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={LoginScreenStyles.Page_Background}>
      <View style={LoginScreenStyles.Bottom_Wave_Container}>
        <View style={LoginScreenStyles.Bottom_Wave_Box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={LoginScreenStyles.Bottom_Wave}>
            <Path
              fill="#FFB20B"
              d="M0,192L26.7,202.7C53.3,213,107,235,160,218.7C213.3,203,267,149,320,128C373.3,107,427,117,480,138.7C533.3,160,587,192,640,192C693.3,192,747,160,800,144C853.3,128,907,128,960,128C1013.3,128,1067,128,1120,133.3C1173.3,139,1227,149,1280,133.3C1333.3,117,1387,75,1413,53.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            />
          </Svg>
        </View>
      </View>
      <View style={LoginScreenStyles.Login_Content}>
        <Text style={LoginScreenStyles.LoginScreen_PageHeader}>Login</Text>
        <Text style={LoginScreenStyles.LoginScreen_PageHeaderTagLine}>
          Eat Well, Live Better,Login In to Begin!
        </Text>
        <TextInput
          style={LoginScreenStyles.MobileNumber_Input}
          keyboardType="name-phone-pad"
          placeholder="Enter Mobile Number"></TextInput>
        <TouchableOpacity
          style={LoginScreenStyles.GetOtp_Btn}
          onPress={() => navigation.navigate('OtpScreen')}>
          <Text style={LoginScreenStyles.GetOtp_Btn_Text}>Get Otp</Text>
          <MCIcons name="arrow-right" size={20} color="#ffff"></MCIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
