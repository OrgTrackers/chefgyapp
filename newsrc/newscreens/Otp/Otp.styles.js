import {Dimensions, StyleSheet} from 'react-native';

export const OtpScreenStyles = StyleSheet.create({
  Page_Background: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  Bottom_Wave_Container: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
  },
  Bottom_Wave_Box: {
    backgroundColor: '#ffd700',
    height: 80,
  },
  Bottom_Wave: {
    position: 'absolute',
    bottom: 20,
  },

  OtpScreen_Container: {
    padding: 10,
  },
  OtpScreen_Content: {
    marginTop: '50%',
    margin: '5%',
  },

  //Content
  OtpScreen_PageHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  OtpScreen_PageHeaderTagLine: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffd700',
  },

  //Inputs
  OtpInput_Container: {
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
    borderColor:'#000'
  },
  Otp_Btn: {
    backgroundColor: '#253E92',
    width: '30%',
    marginTop: '10%',
    padding: 10,
    borderRadius: 10,
  },
  Otp_Btn_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f7f7f7',
  },
});
