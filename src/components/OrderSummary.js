import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
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
import {Card, Modal, Portal} from 'react-native-paper';

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

export default function OrderSummary() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = React.useState(1);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('Menus')}>
            <Ionicons
              name="chevron-back"
              size={globalStyle.g_appPageHeaderIconsSize.fontSize}
              color={globalStyle.g_appPageHeaderIconsColors.color}
            />
          </TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={globalStyle.g_appPageHeaderIconsSize.fontSize}
            color={globalStyle.g_appPageHeaderIconsColors.color}
          />
        </View>
        <Text style={[globalStyle.g_appPageHeaderText]}>Order Summary</Text>
        <Text style={styles.OS_Header_Tag}>Final Review Before Checkout</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderSummaryData.map(OS_DateItem => (
            <View key={OS_DateItem.Id}>
              <View
                style={styles.Date_Day_Container}
                onPress={() => handleAccordions(OS_DateItem.Id)}>
                <View style={styles.Date_Container}>
                  <Text
                    style={[
                      globalStyle.g_appDefaultTextColor,
                      styles.OS_Date_Text,
                    ]}>
                    {OS_DateItem.Date}
                  </Text>
                  <Text style={styles.OS_Month_Text}>{OS_DateItem.Month}</Text>
                </View>
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
                          <Text>Attendees: {OS_MTypeItem.People}</Text>
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
                                  <Text>Price : 2000 /-</Text>
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
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text style={[styles.modal_Header,globalStyle.g_appMainContentHeaders]}>Royal Menu</Text>
          <View style={styles.modal_Header_Details}>
            <View style={styles.modal_Details}>
              <MaIcons name='account-supervisor' size={20} color={globalStyle.g_appDefaultTextColor.color}/>
              <Text>2000</Text>
            </View>
            <View style={styles.modal_Details}>
              <MaIcons name='food-apple' size={20} color={globalStyle.g_appDefaultTextColor.color}/>
              <Text>20</Text>
            </View>
            <View style={styles.modal_Details}>
              <FaIcons name='indian-rupee-sign' size={15} color={globalStyle.g_appDefaultTextColor.color}/>
              <Text>30,000 /-</Text>
            </View>
          </View>
        </Modal>
      </Portal>
      <Footer />
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
    height: 400,
  },
  modal_Header:{
    fontSize:20
  },
  modal_Header_Details:{
    flexDirection:'row',
    alignItems:'center',
    gap:20
  },
  modal_Details:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  }
});
