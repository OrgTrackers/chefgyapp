import {Dimensions, StyleSheet} from 'react-native';

export const MenuSelectionStyles = StyleSheet.create({
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

  //Restro Info
  Restaurant_Info_Container: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  Best_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  Best_Text: {
    color: '#000',
    fontWeight: '500',
  },
  Restaurant_Name_Rating_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Restaurant_Name_Container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  Restaurant_Name_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  Distance_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  Distance_Text: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '400',
  },
  Distance_Separater: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  Restaurant_Rating_Container: {
    backgroundColor: '#FA3B3D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    gap: 3,
    borderRadius: 10,
  },
  Rating_Text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffff',
  },

  //Days List
  DaysContainer: {
    marginTop: 10,
  },
  DayCard: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FA3B3D',
    padding: 10,
    backgroundColor: '#fff',
  },
  DayDate: {
    color: '#000',
    fontWeight: 'bold',
  },
  DayName: {
    color: '#000',
    fontWeight: 'bold',
  },
  DayActiveTab: {
    backgroundColor: '#F59E00',
  },
  DayDateActiveText: {
    color: '#ffff',
  },
  DayNameActiveText: {
    color: '#ffff',
  },

  //Mail Containers
  Menu_Details_Container:{
    padding:10,
    backgroundColor:'#ffff',
    margin:2
  },
  Menu_Details_Header:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000',
    marginBottom:5
  },
  Details_Content:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  Label:{
    fontSize:12,
    fontWeight:'500',
    color:'#000'
  },
  Details_Text:{
    fontSize:12,
    fontWeight:'bold',
    color:'gray'
  },
  menuButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#FA3B3D',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor:'#F8F9FA',
    borderRadius:10
  },
  itemCategoryButton: {
    padding: 8,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    gap: 5,
    paddingTop: 5,
    backgroundColor: '#FA3B3D',
    width: '30%',
    borderRadius: 10,
  },
  Accordion_Header_Text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  Accordion_Category_Header_Text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  Accordion_Item_Category_Text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffff',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 60,
    marginVertical: 3,
  },

  // Accordion_Separator
  Accordion_Separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },

  //Dish List
  DishItemCard: {
    backgroundColor: '#fff',
    margin: 10,
    position: 'relative',
  },
  DishItemCardbody: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  DishImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  DishName: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  DishDescription: {
    fontSize: 10,
    width: 150,
    marginTop: 5,
    color: 'gray',
  },

  // Add minus buttons
  AddRemoveButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  Count: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
});
