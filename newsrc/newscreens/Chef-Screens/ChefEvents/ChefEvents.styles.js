import {StyleSheet, Dimensions} from 'react-native';

// Extract width at the top
const {width} = Dimensions.get('window');

export const ChefEventsScreenStyles = StyleSheet.create({
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

  Event_Content_Header: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    color: '#000',
  },

  // carousel content
  image: {
    width: width - 10, // Ensure width is defined
    height: 220,
    marginHorizontal: 10,
    objectFit: 'cover',
    // borderRadius:10
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#389590',
  },
  Home_Carousel: {
    marginTop: 20,
  },

  //Footer
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

  //Food Spec
  Best_Food_Container: {
    marginTop: 20,
  },
  Section_Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
  },
  FoodItem_Card: {
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    marginLeft: 10,
    textAlign: 'center',
  },
  FoodItem_Img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  FoodItem_Name: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    width: 80,
    textAlign: 'center',
  },

  Best_Caters_Container:{
    marginBottom:20
  },
  Best_Caterers_Img: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  Best_Caters_Card: {
    margin: 10,
    backgroundColor: '#ffff',
  },
  Cater_Name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    margin: 5,
  },
});
