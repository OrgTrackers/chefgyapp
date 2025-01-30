import {Dimensions, StyleSheet} from 'react-native';

export const OrderSummaryStyles = StyleSheet.create({
  MainPageLayout: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ffff',
  },
  PageContent: {
    margin: 20,
    flex: 0.85,
  },
  PageName: {
    padding: 10,
    fontSize: 20,
    color: '#79CEFF',
    fontWeight: 'bold',
  },
  YearName: {
    padding: 10,
    paddingTop: 0,
    marginTop: -10,
    color: '#F59E00',
  },
  //Days List
  DaysContainer: {
    marginTop:10
  },
  DayCard:{
    margin:10,
    borderRadius:5,
    borderWidth:2,
    borderColor:'#F59E00',
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
    borderColor:'#ccc'
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

  PageFooter: {
    flex: 0.15,
    backgroundColor: '#FEF6E7',
  },
  FooterButtonContainer:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  SubmitButton:{
    backgroundColor:'#FFB20B',
    margin:10,
    padding:10,
    width:'80%',
    borderRadius:10
  },
  SubmitButtonText:{
    textAlign:'center',
    color:'#f7f7f7',
    fontWeight:'bold',
    fontSize:15
  },
});
