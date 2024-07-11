import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import userService from '../services/api/userService';


const Signup = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignUp = async () => {
        const objUser =
        {
            "username": fullName,
            "mobileNumber": phoneNumber,
            "email": email,
            "type": 18
        }
        console.log(objUser)
        try {
            const response = await userService.AddUser(objUser);
            console.log(response)
            const { data } = response;
            if (data && data.token) {
                navigation.navigate('OtpContent', { userId: data.user.userid, token: data.token });
            } else {
                console.error('Signup failed: Unexpected response structure');
                Alert.alert('Signup Failed', 'Unexpected response from server. Please try again later.');
            }
        } catch (error) {
            //console.error('Login failed: Please check your phone number and try again', error.message);
            Alert.alert('Signup Failed', 'Please check your data and try again.');
        }

    }

    return (
        <ImageBackground style={styles.Signup_Container} source={require('../assets/images/Signup_banner_2.jpg')}>
            <View style={styles.Signup_Header}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Login_Icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.Signup_Card}>
                <Text style={styles.Signup_Card_Header}>Sign Up</Text>
                <Text style={styles.Signup_Card_TagLine}>Please type your information below</Text>
                <View style={styles.Signup_Form_Content}>
                    <TextInput keyboardType='name-phone-pad' placeholder='Enter full name' style={styles.Signup_Form_Input}
                        value={fullName} onChangeText={setFullName}></TextInput>
                    <TextInput keyboardType='email-address' placeholder='Enter email' style={styles.Signup_Form_Input}
                        value={email} onChangeText={setEmail}></TextInput>
                    <TextInput keyboardType='number-pad' placeholder='Enter phone number' style={styles.Signup_Form_Input}
                        value={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
                    <TouchableOpacity style={styles.Send_Otp_Btn} onPress={handleSignUp}>
                        <Text style={styles.Send_Otp_Text}>Send OTP</Text>
                    </TouchableOpacity>
                    <View style={styles.Already_Have_Accout}>
                        <Text style={styles.Already_Have_Accout_Text}>You have an acoount ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.To_Signin_Text}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.App_Version_Content}>
                <Text style={styles.App_Version_Text}>App Version 003</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    Signup_Container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffff',
    },
    Signup_Header: {
        padding: 20
    },
    Back_To_Login_Icon: {
        width: 20,
        height: 20
    },
    Signup_Card: {
        padding: 20,
        margin: 20,
        marginTop: 150,
        backgroundColor: '#ffff',
        borderRadius: 5
    },
    Signup_Card_Header: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#272727'
    },
    Signup_Card_TagLine: {
        textAlign: 'center',
    },
    Signup_Form_Content: {
        marginTop: 40,
    },
    Signup_Form_Input: {
        borderWidth: 1,
        borderColor: '#cccc',
        borderRadius: 5,
        marginBottom: 20,
        height: 40,
        paddingLeft: 10,
        fontSize: 12
    },
    Send_Otp_Btn: {
        backgroundColor: '#F7B52D',
        padding: 10,
        borderRadius: 5
    },
    Send_Otp_Text: {
        color: '#ffff',
        textAlign: 'center'
    },
    Already_Have_Accout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    Already_Have_Accout_Text: {
        color: '#272727'
    },
    To_Signin_Text: {
        color: '#F7B52D'
    },
    App_Version_Content: {
        padding: 40
    },
    App_Version_Text: {
        textAlign: 'center'
    }
})

export default Signup

