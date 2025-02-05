import {Dimensions, StyleSheet} from 'react-native';

export const FoodSessionStyles = StyleSheet.create({
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
  DateFromTo:{
    padding:15,
    // paddingTop:20
  },
  DateFromToText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000'
  },

  //Food Item Card
  FoodDateCard:{
    backgroundColor:'#ffff',
    margin:10,
    borderRadius:5,
    padding:10,
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:25
  },
  FoodDateText:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000'
  },
  FoodTypeConatiner:{
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    marginTop:30,
    marginBottom:10
  },
  FoodTypeTextIcon:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    borderRadius:10,
    borderWidth:0.8,
    borderColor:'#FA3B3D',
    padding:10
  }
});
