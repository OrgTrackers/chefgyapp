import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import Footer from './Footer';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome6';

//Paper
import {Button, Card, Modal, Portal, Tooltip} from 'react-native-paper';
import Header from './Header';

const orderSummaryData = [
  {
    Id: 1,
    Date: 12,
    Month: 'Sep',
    Day: 'Today',
    MenuTypes: [
      {
        Id: 1,
        Type: 'Breakfast',
        FromTime: '8:00 AM',
        ToTime: '11:00 AM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 2,
        Type: 'Lunch',
        FromTime: '12:00 AM',
        ToTime: '2:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 3,
        Type: 'Dinner',
        FromTime: '8:00 PM',
        ToTime: '10:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
    ],
  },
  {
    Id: 2,
    Date: 13,
    Month: 'Sep',
    Day: 'Next Day',
    MenuTypes: [
      {
        Id: 1,
        Type: 'Breakfast',
        FromTime: '8:00 AM',
        ToTime: '11:00 AM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 2,
        Type: 'Lunch',
        FromTime: '12:00 AM',
        ToTime: '2:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 3,
        Type: 'Dinner',
        FromTime: '8:00 PM',
        ToTime: '10:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
    ],
  },
  {
    Id: 3,
    Date: 14,
    Month: 'Sep',
    Day: 'Next Day',
    MenuTypes: [
      {
        Id: 1,
        Type: 'Breakfast',
        FromTime: '8:00 AM',
        ToTime: '11:00 AM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 2,
        Type: 'Lunch',
        FromTime: '12:00 AM',
        ToTime: '2:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
      {
        Id: 3,
        Type: 'Dinner',
        FromTime: '8:00 PM',
        ToTime: '10:00 PM',
        People: 2000,
        Menus: [
          {
            Id: 1,
            MenuName: 'Royal Menu',
          },
          {
            Id: 2,
            MenuName: 'Deluxe Menu',
          },
          {
            Id: 3,
            MenuName: 'Standerd Menu',
          },
          {
            Id: 4,
            MenuName: 'Add-Ons',
          },
        ],
      },
    ],
  },
];
const DishItems = [
  {Id: 1, DishName: 'Masala Dosa'},
  {Id: 2, DishName: 'Paneer Tikka'},
  {Id: 3, DishName: 'Chicken Biryani'},
  {Id: 4, DishName: 'Palak Paneer'},
  {Id: 5, DishName: 'Butter Chicken'},
  {Id: 6, DishName: 'Chole Bhature'},
  {Id: 7, DishName: 'Aloo Paratha'},
  {Id: 8, DishName: 'Rogan Josh'},
  {Id: 9, DishName: 'Mutton Curry'},
  {Id: 10, DishName: 'Pav Bhaji'},
  {Id: 11, DishName: 'Fish Curry'},
  {Id: 12, DishName: 'Vada Pav'},
  {Id: 13, DishName: 'Dhokla'},
  {Id: 14, DishName: 'Samosa'},
  {Id: 15, DishName: 'Bhel Puri'},
];

export default function OrderSummary() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  // setTimeout (()=>{
  //   handleTooltip();
  // },4000)

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={()=>navigation.navigate('Menus')}/>
        <Text style={[globalStyle.g_appPageHeaderText]}>Order Summary</Text>
        <Text style={styles.OS_Header_Tag}>Final Review Before Checkout</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderSummaryData.map(OS_DateItem => (
            <View key={OS_DateItem.Id}>
              <View style={styles.Date_Day_Container}>
                <TouchableOpacity
                  style={styles.Date_Container}
                  onPress={() => handleAccordions(OS_DateItem.Id)}>
                  <Text
                    style={[
                      globalStyle.g_appDefaultTextColor,
                      styles.OS_Date_Text,
                    ]}>
                    {OS_DateItem.Date}
                  </Text>
                  <Text style={styles.OS_Month_Text}>{OS_DateItem.Month}</Text>
                </TouchableOpacity>
                <Text
                  style={[
                    globalStyle.g_appDefaultTextColor,
                    styles.OS_Day_Text,
                  ]}>
                  {OS_DateItem.Day}
                </Text>
                <Ionicons
                  size={15}
                  color={globalStyle.g_appMainContentColors.color}
                  name={
                    expanded === OS_DateItem.Id ? 'chevron-up' : 'chevron-down'
                  }
                  onPress={() => handleAccordions(OS_DateItem.Id)}
                />
              </View>
              {expanded === OS_DateItem.Id && (
                <>
                  {OS_DateItem.MenuTypes.map(OS_MTypeItem => (
                    <View key={OS_MTypeItem.Id}>
                      <View
                        style={[
                          styles.Menu_Time_Type_Container,
                          OS_MTypeItem.Type === 'Breakfast'
                            ? {backgroundColor: '#F8FBFC'}
                            : OS_MTypeItem.Type === 'Lunch'
                            ? {backgroundColor: '#FFFAF6'}
                            : OS_MTypeItem.Type === 'Dinner'
                            ? {backgroundColor: '#FFF7F3'}
                            : {backgroundColor: 'gray'},
                        ]}>
                        <View
                          style={[
                            styles.Menu_Time_Container,
                            OS_MTypeItem.Type === 'Breakfast'
                              ? {backgroundColor: '#69B5BD'}
                              : OS_MTypeItem.Type === 'Lunch'
                              ? {backgroundColor: '#F99746'}
                              : OS_MTypeItem.Type === 'Dinner'
                              ? {backgroundColor: '#FB5607'}
                              : {backgroundColor: 'gray'},
                          ]}>
                          <Text style={styles.OS_Type_Time_Text}>
                            {OS_MTypeItem.FromTime}
                          </Text>
                          <Text>To</Text>
                          <Text style={styles.OS_Type_Time_Text}>
                            {OS_MTypeItem.ToTime}
                          </Text>
                        </View>
                        <View style={styles.Menu_Type_Container}>
                          <Text style={[styles.OS_MenuType_Text]}>
                            {OS_MTypeItem.Type}
                          </Text>
                          <Text style={globalStyle.g_appTextBlack}>Attendees: {OS_MTypeItem.People}</Text>
                          <View style={styles.OS_Menu_Range_Container}>
                            {OS_MTypeItem.Menus.map(M_RangeItem => (
                              <View key={M_RangeItem.Id}>
                                <Card
                                  style={styles.OS_Menu_Rnage_Card}
                                  onPress={showModal}>
                                  <Text
                                    style={[
                                      styles.M_Range_Type,
                                      globalStyle.g_appMainContentColors,
                                    ]}>
                                    {M_RangeItem.MenuName}
                                  </Text>
                                  <Text style={globalStyle.g_appTextBlack}>Price : 2000 /-</Text>
                                </Card>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          ))}
          <View style={styles.GrandTotal_Container}>
            <Text style={styles.GrandTotal_Container_Header}>
              Billing Details
            </Text>
            <View style={styles.SubTotal_Content}>
              <Text style={[styles.SubTotal_Label,globalStyle.g_appTextBlack]}>Subtotal</Text>
              <View style={styles.TotalCost_Container}>
                <FaIcons name="indian-rupee-sign" size={12} color="#000" />
                <Text style={[styles.SubCost_Text,globalStyle.g_appTextBlack]}>38.06</Text>
              </View>
            </View>
            <View style={styles.Tax_Content}>
              <Text style={[globalStyle.g_appTextBlack]}>Estimated Tax</Text>
              <Text style={[globalStyle.g_appTextBlack]}>2.85</Text>
            </View>
            <View style={styles.Tax_Content}>
              <Text style={[globalStyle.g_appTextBlack]}>Platform Fee</Text>
              <View style={styles.TotalCost_Container}>
                <FaIcons name="indian-rupee-sign" size={12} color="#272727" />
                <Text style={[globalStyle.g_appTextBlack]}>6.00</Text>
              </View>
            </View>
            <View style={styles.Tax_Content}>
              <Text style={[globalStyle.g_appTextBlack]}>Delivery Fee</Text>
              <View style={styles.TotalCost_Container}>
                <FaIcons name="indian-rupee-sign" size={12} color="#272727" />
                <Text style={[globalStyle.g_appTextBlack]}>75.00</Text>
              </View>
            </View>
            <View style={styles.Overall_Content}>
              <Text style={[styles.Order_Label,globalStyle.g_appTextBlack]}>Order Total</Text>
              <View style={styles.TotalCost_Container}>
                <FaIcons name="indian-rupee-sign" size={15} color="#000" />
                <Text style={[styles.SubCost_Text,globalStyle.g_appTextBlack]}>40.91</Text>
              </View>
            </View>
          </View>
          <View style={styles.Coupons_Bidding_Section}>
            <Text style={styles.GrandTotal_Container_Header}>
             Choose :
            </Text>
            <TouchableOpacity style={styles.Coupons_Container} onPress={()=>navigation.navigate('Coupons')}>
              <Text style={styles.ChooseHeader}>Applay Coupons</Text>
              <Ionicons name='chevron-forward-sharp' color="#000" size={15}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Bidding_Container} onPress={()=>navigation.navigate('Bidding')}>
              <Text style={styles.ChooseHeader}>Go For Bidding</Text>
              <Ionicons name='chevron-forward-sharp' color="#000" size={15}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <View style={styles.Modal_Header_Container}>
            <Text
              style={[
                styles.modal_Header,
                globalStyle.g_appMainContentHeaders,
              ]}>
              Royal Menu
            </Text>
            <Ionicons
              onPress={hideModal}
              name="close"
              size={24}
              color={globalStyle.g_appMainContentIconColors.color}
            />
          </View>
          <View style={styles.modal_Header_Details}>
            <View style={styles.modal_Details}>
              <MaIcons
                name="account-supervisor"
                size={20}
                color={globalStyle.g_appDefaultTextColor.color}
              />
              <Text>2000</Text>
            </View>
            <View style={styles.modal_Details}>
              <MaIcons
                name="food-apple"
                size={20}
                color={globalStyle.g_appDefaultTextColor.color}
              />
              <Text>20</Text>
            </View>
            <View style={styles.modal_Details}>
              <FaIcons
                name="indian-rupee-sign"
                size={15}
                color={globalStyle.g_appDefaultTextColor.color}
              />
              <Text>30,000 /-</Text>
            </View>
          </View>
          <View style={styles.DishItem_Container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {DishItems.map(DItem => (
                <View key={DItem.Id}>
                  <View style={styles.DishItem_List}>
                    <Text
                      style={[
                        globalStyle.g_appDefaultTextColor,
                        styles.DishName_Text,
                      ]}>
                      {DItem.Id}. {DItem.DishName}
                    </Text>
                    <MaIcons
                      name="pencil-box"
                      size={20}
                      color={globalStyle.g_appMainContentIconColors}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
      <Button
        style={[styles.Pay_Buttons, globalStyle.g_appDefaultContentBgColor]} onPress={()=>navigation.navigate('Coupons')}>
        <View style={styles.Pay_Button_Content}>
          <Text style={[styles.Pay_Buttons_Text]}>Submit Order</Text>
          {/* <View style={styles.TotalCost_Container}>
            <FaIcons name="indian-rupee-sign" size={12} color="#fff" />
            <Text style={[styles.Pay_Buttons_Text]}>98.68</Text>
          </View> */}
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  OS_Header_Tag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffff',
  },
  OS_Dates_Text: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the two cards
    marginBottom: 15, // Add some spacing between rows
  },
  OSMenu_Card: {
    backgroundColor: '#ffff',
    padding: 15,
    width: '48%',
  },
  OSMenu_Card_Header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  OSMenu_Card_Body: {
    padding: 20,
  },

  //Date
  Date_Day_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F5F9FF',
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  Date_Container: {
    backgroundColor: '#ECF3FF',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  OS_Date_Text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  OS_Month_Text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  OS_Day_Text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  //Menu Type
  Menu_Time_Type_Container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  Menu_Time_Container: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  Menu_Type_Container: {
    padding: 20,
  },
  OS_Type_Time_Text: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  OS_MenuType_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#272727',
  },

  OS_Menu_Range_Container: {
    marginTop: 10,
  },
  OS_Menu_Rnage_Card: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 0,
    width: 200,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  M_Range_Type: {
    fontSize: 12,
  },

  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 500,
    justifyContent: 'flex-start',
  },
  Modal_Header_Container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  modal_Header: {
    fontSize: 20,
  },
  modal_Header_Details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  modal_Details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  DishItem_Container: {
    marginTop: 20,
    marginBottom: 50,
  },
  DishName_Text: {
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  DishItem_List: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    // borderTopWidth: 1,
    borderRadius: 0,
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color: '#fff',
  },
  Pay_Button_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  //Grand total
  GrandTotal_Container: {
    marginTop: 10,
  },
  SubTotal_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TotalCost_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  SubTotal_Label: {
    // fontWeight: 'bold',
    // color: '#000',
    // fontSize: 15,
  },
  SubCost_Text: {
    // fontSize: 15,
    // color: '#000',
    // fontWeight: 'bold',
  },
  Tax_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Overall_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    paddingTop: 5,
    borderTopColor: '#cccc',
    borderTopWidth: 1,
  },
  Order_Label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  GrandTotal_Container_Header: {
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },

  //Coupons_Bidding_Section
  Coupons_Bidding_Section:{
    marginTop:'5%'
  },
  Coupons_Container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  Bidding_Container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  ChooseHeader:{
    color:'#000',
    fontSize:15,
    fontWeight:'bold'
  }
});
