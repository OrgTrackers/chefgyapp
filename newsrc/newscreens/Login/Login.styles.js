import {Dimensions, StyleSheet} from 'react-native';

export const LoginScreenStyles = StyleSheet.create({
  Page_Background: {
    flex: 1,
    backgroundColor: '#ffff',
    position:'relative',
    justifyContent: 'center',
  },

  //Logo Container
  Logo_Container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:'10%'
  },
  Logo: {
    width: 300,
    height: 300,
  },

  //Input
  Login_Input_Container: {
    margin: '5%',
  },
  Lable: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 10,
  },
  MobileNumber_Input: {
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  Login_Tag_Line: {
    fontSize: 10,
    fontWeight: 'gray',
    color: '#000',
    paddingLeft: 10,
  },

  //Button
  GetOtp_Btn: {
    backgroundColor: '#FA3B3D',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'5%',
    gap: 10,
    bottom: 0,
    width: '90%',
    borderRadius:10
  },
  GetOtp_Btn_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },

  Copy_Right_Text:{
    position:'absolute',
    bottom:15,
    left:'25%',
    fontSize:12,
    fontWeight:'bold',
    color:'gray'
  }
});
