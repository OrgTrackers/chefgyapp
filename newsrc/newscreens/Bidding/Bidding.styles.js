import {StyleSheet} from 'react-native';

const biddingStyles = StyleSheet.create({
  HeaderContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  PageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 3,
  },

  Comments_Section: {
    width: '85%',
    marginTop: 10,
    textAlignVertical: 'top', // This aligns the text to the top
    borderRadius:5,
    borderWidth:1,
    borderColor:'#000'
  },
  Bidding_Inputs_Form_Container: {
    marginTop: 5,
    marginBottom: 10,
  },
  Form_Inputs: {
    marginTop: 10,
  },
  Bidding_Input_Label: {
    marginBottom: 5,
    color:'#000',
    fontSize:15,
    fontWeight:'bold'
  },

  Bidding_Input_Info: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
  },
  Bidding_Input: {
    width: '85%',
    borderColor:'#000',
    borderWidth:1,
    padding:5,
    borderRadius:5
  },

  //tooltip
  BiddingToolTip_Container: {
    backgroundColor: '#5d6d7e',
    position: 'absolute',
    right: 0,
    top:40,
    left: 0,
    padding: 15,
    borderRadius: 15,
    zIndex: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,

    // elevation: 15,
  },
  ToolTip_Header: {
    fontSize: 20,
    color: '#f7f7f7',
    fontWeight: 'bold',
  },
  ToolTip_Content_Text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ccc',
  },
  ToolTip_Triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#5d6d7e',
    position: 'absolute',
    transform: [{rotate: '360deg'}],
    right: 25,
    top: 25,
  },
  footerButton:{
    backgroundColor:'#FA3B3D',
    padding:10,
    margin:10,
    borderRadius:10
  },
  footerButtonText:{
    textAlign:'center',
    color:'#ffff',
    fontWeight:'bold',
    fontSize:15
  }
});

export default biddingStyles;