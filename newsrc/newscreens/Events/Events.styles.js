import {StyleSheet,Dimensions} from 'react-native';

export const EventsScreenStyles = StyleSheet.create({
  Page_Background: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Bottom_Wave_Container: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
  },
  Bottom_Wave_Box: {
    backgroundColor: '#E8841C',
    height: 80,
  },
  Bottom_Wave: {
    position: 'absolute',
    bottom: 20,
  },

  //Headers
  Header_Content:{
    padding:10
  },
  PageHeader:{
    fontSize:30,
    margin:15,
    color:'#272727',
    fontWeight:'bold'
  },
  Bottom_Buttons:{
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    height: 40, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    borderRadius:10
  },
  Bottom_Button_Text:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    color:'#272727'
  },


  // Main Img
  EventChefImg:{
    width: Dimensions.get('screen').width,
    height:260
  },

  //Slider
  Our_Specials_Header:{
    fontSize:20,
    margin:15,
    marginBottom:0,
    fontWeight:'bold',
    color:'#272727'
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: '#fdf2e9',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    margin:10,
    // borderColor:'#000',
    // borderWidth:1
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color:'#000'
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
});
