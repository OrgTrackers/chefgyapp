import {Dimensions, StyleSheet} from 'react-native';

export const BookFoodTruckStyles = StyleSheet.create({
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
  //Calendar and Dates
  BC_Content_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  BC_Date_Inputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BC_Date_Input: {
    width: '48%',
    marginTop: '2%',
    marginRight: '2%',
  },

  //types
  BC_Types_Container: {
    // marginTop: 20,
  },
  BC_Type_Cards_Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1%',
  },
  BC_Type_Cards: {
    padding: 10,
    width: 100,
    backgroundColor: '#ffff',
    marginRight: 20,
  },
  BC_Type_Name: {
    marginTop: '10%',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: '#FA3B3D',
  },
  selectedText: {
    color: '#FA3B3D',
  },

  //Menu Type Selection
  BC_MenuType_Container: {
    marginTop: 20,
  },
  BC_MenuType_Card: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 5,
  },
  BC_MenuType_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },

  //Filter
  BC_Filter_Container: {
    marginTop: 20,
  },
  Filter_Type_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  BC_Filter_List: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BC_Filter_List_Content: {},
  BC_Filter_List_Name: {
    margin: '3%',
    borderColor: '#cccc',
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },

  //Veg and Non veg
  Veg_NonVeg_Btns: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: '5%',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    gap: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#FA3B3D',
    borderRadius: 10,
  },
  toggleVegButtonActive: {
    backgroundColor: '#48c9b0',
    borderRadius: 10,
  },
  toggleNonVegButtonActive: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#ffff',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sortOption: {
    width: '100%',
  },
  sortHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FA3B3D',
  },
  sortButtonActive: {
    backgroundColor: '#FA3B3D',
    borderColor: '#FA3B3D',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#ffff',
  },
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 400,
  },

  //Footer
  FooterButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FooterButton: {
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  FooterButtonText: {
    color: '#ffff',
    textAlign: 'center',
  },

  //Distance Container

  BC_Distance_Container: {
    marginTop: 10,
  },
  Distance_Text: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },

  //Rating Container
  Bc_Rating_Container: {
    marginTop: 20,
  },
  BC_Rating_Stars: {
    flexDirection: 'row',
    gap: 30,
  },

  //Sorting
  BC_Sorting_Container: {
    marginTop: 20,
  },
  BC_Sorting_Buttons: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 10,
  },
  Sort_Botton: {
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  Sort_Botton_Active: {
    backgroundColor: '#FA3B3D',
    borderWidth: 1,
    borderColor: '#FA3B3D',
  },
  Sort_Botton_Text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  Sort_Botton_Active_Text: {
    color: '#ffff',
  },
});
