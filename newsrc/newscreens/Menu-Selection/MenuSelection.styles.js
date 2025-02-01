import {Dimensions, StyleSheet} from 'react-native';

export const MenuSelectionStyles = StyleSheet.create({
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
    fontSize: 15,
    padding: 10,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#FFB20B',
  },
  RestaurantName: {
    fontSize: 15,
    paddingLeft: 10,
    marginTop: -10,
    fontWeight: 'bold',
    color: '#000',
  },

  //Menu Type Card
  MenuTypeCard: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  MenuTypeCardBody: {
    padding: 10,
    paddingTop: 0,
  },
  MenuTypeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B7973',
    marginTop: 10,
  },
  YearName: {
    fontSize: 10,
    color: '#FFB20B',
    fontWeight: 'bold',
  },

  //Add Button
  AddDayContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#E8F8F5',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  AddDayName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0B7973',
  },

  // Day date cards
  DatesContainer: {
    marginTop: 10,
  },
  DayDateCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderWidth: 2,
    borderColor: '#0B7973',
  },
  DayDateCardBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  DayText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  DateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  //Menu selection
  MenuSelectionContainer: {
    padding: 10,
  },
  MenuName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B7973',
  },

  //accordion
  DayAccordionCard: {
    backgroundColor: '#ffff',
    marginTop: 10,
    borderBottomWidth: 1,
  },
  DayAccordionCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 0,
    alignItems: 'center',
  },
  DayAccordionTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  FoodCategoryHeader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10
  },
  FoodCategoryHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  ViewAllButtonText:{
    fontSize:12,
    fontWeight:'bold',
    color:'#FFB20B'
  },
  FoodItemCard:{
    backgroundColor:'#ffff',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#cccc',
    marginTop:10,
    position:'relative',

  },
  FoodItemCardBody:{
    flexDirection:'row',
    padding:10,
    gap:10
  },
  FoodItemImg:{
    width:100,
    height:110,
    borderRadius:10
  },
  FoodItemName:{
    fontSize:15,
    color:'#000',
    fontWeight:'bold'
  },
  FoodItemDescription:{
    fontSize:10,
    width:'90%',
    marginTop:5
  },
  LikeButton:{
    position:'absolute',
    right:50
  },

  ItemPriceContent:{
    flexDirection:'row',
    alignItems:'center',
    gap:2,
    marginTop:5
  },
  FoodItemPrice:{
    color:'#000',
    fontSize:15,
    fontWeight:'bold'
  },

  FoodItemTimeAddButtonContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'80%',
    marginTop:10
  },
  WeightTimeContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    gap:10
  },
  WeightContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  TimeContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  Weight:{
    fontSize:10,
    fontWeight:'bold',
    color:'#000'
  },
  Time:{
    fontSize:10,
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
  SaveButton:{
    backgroundColor:'#FFB20B',
    margin:10,
    padding:10,
    width:'80%',
    borderRadius:10
  },
  SaveButtonText:{
    textAlign:'center',
    color:'#f7f7f7',
    fontWeight:'bold',
    fontSize:15
  },

  SectionDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10, // Adjust spacing
    width: '100%',
    marginTop:30
  },
  
});
