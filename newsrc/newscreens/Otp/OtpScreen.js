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
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    <View style={OtpScreenStyles.Page_Background}>
      <View style={OtpScreenStyles.Bottom_Wave_Container}>
        <View style={OtpScreenStyles.Bottom_Wave_Box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={OtpScreenStyles.Bottom_Wave}>
            <Path
              fill="#ffd700"
              d="M0,192L26.7,202.7C53.3,213,107,235,160,218.7C213.3,203,267,149,320,128C373.3,107,427,117,480,138.7C533.3,160,587,192,640,192C693.3,192,747,160,800,144C853.3,128,907,128,960,128C1013.3,128,1067,128,1120,133.3C1173.3,139,1227,149,1280,133.3C1333.3,117,1387,75,1413,53.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            />
          </Svg>
        </View>
      </View>
      <View style={OtpScreenStyles.OtpScreen_Container}>
        <View style={OtpScreenStyles.Header_Content}>
          <MCIcons
            name="chevron-left"
            size={45}
            color="#000"
            onPress={() => navigation.navigate('LoginScreen')}></MCIcons>
        </View>
        <View style={OtpScreenStyles.OtpScreen_Content}>
          <Text style={OtpScreenStyles.OtpScreen_PageHeader}>
            Verification Code
          </Text>
          <Text style={OtpScreenStyles.OtpScreen_PageHeaderTagLine}>
            We have sent verification code to your mobile number..!
          </Text>
          <View style={OtpScreenStyles.OtpInput_Container}>
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
          <TouchableOpacity style={OtpScreenStyles.Otp_Btn}>
            <Text style={OtpScreenStyles.Otp_Btn_Text}>Let's Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
