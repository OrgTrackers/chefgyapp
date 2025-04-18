import {Dimensions, StyleSheet} from 'react-native';

export const OtpScreenStyles = StyleSheet.create({
  Page_Background: {
    flex: 1,
    backgroundColor: '#ffff',
  },

  //Header
  Header_Container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15
  },

  //Image
  Otp_Image_Container:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  OtpImage:{
    width:300,
    height:300
  },

  //Content
  Otp_Input_Container:{
    margin:15,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'15%'
  },
  OtpScreen_PageHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  OtpScreen_PageHeaderTagLine: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FA3B3D',
  },

  //Inputs
  Otp_Inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: '10%',
  },
  Otp_Input: {
    backgroundColor: '#ffff',
    width: 45,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#000',
    textAlign:'center'
  },
  Otp_Btn: {
    backgroundColor: '#FA3B3D',
    width: '80%',
    padding: 15,
    // position:'absolute',
    //bottom:0,
    margin:'10%',
    borderRadius:10
  },
  Otp_Btn_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f7f7f7',
    textAlign:'center'
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
