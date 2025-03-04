
import {Dimensions, StyleSheet} from 'react-native';

export const OrderSummaryStyles = StyleSheet.create({
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
  YearText:{
    padding:10,
    fontSize:30,
    paddingBottom:0,
    fontWeight:'bold',
    color:'#000'
  },





  //Days List
  DaysContainer: {
    marginTop:10
  },
  DayCard:{
    margin:10,
    borderRadius:5,
    borderWidth:2,
    borderColor:'#FA3B3D',
    padding:10,
    backgroundColor:'#fff'
  },
  DayDate:{
    color:'#000',
    fontWeight:'bold'
  },
  DayName:{
    color:'#000',
    fontWeight:'bold'
  },
  DayActiveTab:{
    backgroundColor:'#F59E00'
  },
  DayDateActiveText:{
    color:'#ffff'
  },
  DayNameActiveText:{
     color:'#ffff'
  },
  //Cate card list
  CategoryContainer:{
    flex:1
  },
  CateCard:{
    margin:10,
    borderRadius:5,
    backgroundColor:'#ffff',
    borderWidth:1,
    borderColor:'#ccc',
    marginBottom:30
  },
  CateCardBody:{
    padding:10
  },
  MenuTypeName:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000',
  },
  CateDetailsContainer:{
    display:'flex',
    flexDirection:'row',
    gap:20,
    alignItems:'center',
    marginTop:5
  },
  CateDetailsContent:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  CateDetailsText:{
    fontSize:10,
    color:'#000',
    fontWeight:'bold'
  },
  CategoriesContainer:{
    marginTop:10
  },    
  CategoryCard:{
    backgroundColor:'#ffff',
    margin:5,
    marginLeft:0,
    borderRadius:5
  },
  CategoryCardBody:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10
  },
  CateNameIconContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  CategoriesDetailsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'90%'
  },
  CategoryName:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000'
  },
  CategoryCost:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000'
  },

  //Dish List
  DishItemCard:{
    backgroundColor:'#fff',
    margin:10,
    position:'relative'
  },
  DishItemCardbody:{
    padding:10,
    flexDirection:'row',
    gap:10
  },
  DishImage:{
    width:100,
    height:100,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'gray',
  },
  DishName:{
    fontSize:15,
    color:'#000',
    fontWeight:'bold'
  },
  DishDescription:{
    fontSize:10,
    width:150,
    marginTop:5,
    color:'gray'
  },

  MenuTypeButton:{
    backgroundColor:'#FA3B3D',
    width:'50%',
    padding:5,
    borderRadius:10,
    marginBottom:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  MenuTypeButtonText:{
    textAlign:'left',
    color:'#fff',
    fontSize:12,
    fontWeight:'bold'
  },
  // Add minus buttons
  AddRemoveButtons:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    position:'absolute',
    right:10,
    bottom:10
  },
  Count:{
    fontSize:12,
    color:'#000',
    fontWeight:'bold'
  },

  //Submit
  FooterButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BookCaterButton: {
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:15
  },
  BookCaterText: {
    color: '#ffff',
    textAlign: 'center',
  },

});
