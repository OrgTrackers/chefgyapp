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
    backgroundColor: '#006701',
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
    borderColor: '#006701',
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
    borderColor: '#006701',
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
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#ccc',
    marginBottom:20
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
    backgroundColor: '#006701',
    width: 400,
    borderRadius: 10,
  },
  menuTypeButton: {
    padding: 8,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    gap: 5,
    paddingTop: 5,
    borderBottomWidth:1,
    borderBottomColor:'#006701',
    width: 400,
    borderRadius: 10,
  },
  Add_Menu_Button:{
    backgroundColor:'#006701',
    borderRadius:5
  },
  Add_Menu_Button_Text:{
    color:'#ffff',
    fontSize:10,
    padding:5,
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
  Accordion_Menu_Item_Text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#006701',
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


    //additional services

    servicesTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
    },
    serviceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    serviceLabel: {
      fontSize: 16,
      color: '#444',
    },
    selectedVendorsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
      marginBottom: 12,
    },
    selectedVendorChip: {
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      margin: 3,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    selectedVendorText: {
      fontSize: 12,
      color: '#333',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    vendorList: {
      maxHeight: 300,
    },
    vendorItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    vendorInfo: {
      flex: 1,
    },
    vendorName: {
      fontSize: 16,
      color: '#333',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    ratingText: {
      fontSize: 12,
      color: '#666',
      marginLeft: 5,
    },
    modalButton: {
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 15,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
     couponButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
             
        backgroundColor: '#006701',
        marginRight: 10,
        flex: 1,
      },
      couponButtonText: {
        marginLeft: 8,
        color: '#ffff',
        fontWeight: '600',
        fontSize: 14,
      },
      selectedCouponContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 12,
        padding: 14,
        backgroundColor: '#F0F8FF',
        borderRadius: 12,
        borderLeftWidth: 4,
        
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        flexGrow: 0,
        minHeight: 70,
      },
      selectedCouponTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
      },
      selectedCouponContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
      },
      selectedCouponText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#444',
        flex: 1,
        paddingRight: 8,
      },
      removeButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});
