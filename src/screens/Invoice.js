import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Footer from '../components/Footer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FaIcons from 'react-native-vector-icons/FontAwesome';

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import {Card} from 'react-native-paper';

const InvoiceData = [
  {
    Id: 1,
    Date: '21',
    Month:'Sep',
    TotalData: [
      {
        Id: 1,
        EventType: 'Breakfast',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 2,
        EventType: 'Lunch',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 3,
        EventType: 'Dinner',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
    ],
  },
  {
    Id: 2,
    Date: '22',
    Month:'Sep',
    TotalData: [
      {
        Id: 1,
        EventType: 'Breakfast',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 2,
        EventType: 'Lunch',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 3,
        EventType: 'Dinner',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
    ],
  },
  {
    Id: 3,
    Date: '23',
    Month:'Sep',
    TotalData: [
      {
        Id: 1,
        EventType: 'Breakfast',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 2,
        EventType: 'Lunch',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
      {
        Id: 3,
        EventType: 'Dinner',
        Attendees: 10000,
        TotalCost: 30000,
        Items: [
          {
            Id: 1,
            Name: 'Idly',
          },
          {
            Id: 2,
            Name: 'Dosa',
          },
          {
            Id: 3,
            Name: 'Sambar',
          },
          {
            Id: 4,
            Name: 'Vada',
          },
          {
            Id: 5,
            Name: 'Pongal',
          },
          {
            Id: 6,
            Name: 'Uttapam',
          },
          {
            Id: 7,
            Name: 'Rasam',
          },
          {
            Id: 8,
            Name: 'Puri',
          },
          {
            Id: 9,
            Name: 'Chutney',
          },
          {
            Id: 10,
            Name: 'Biryani',
          },
        ],
      },
    ],
  },
];

const Invoice = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(1);

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('OrderSummary')}>
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
        <Text style={[globalStyle.g_appPageHeaderText]}> Order Quotation</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {InvoiceData.map(InvoiceItem => (
            <View key={InvoiceItem.Id}>
              <Card style={styles.Invoice_Accordian_Card}>
                <View style={styles.Invoice_Accordian_CardBody}>
                  <TouchableOpacity style={styles.Invoice_Accordian_Card_Date} onPress={() => handleAccordions(InvoiceItem.Id)}>
                    <Text style={[styles.Invoice_Date,globalStyle.g_appDefaultTextColor]}>{InvoiceItem.Date}</Text>
                    <Text style={[styles.Invoice_Date,globalStyle.g_appDefaultTextColor]}>{InvoiceItem.Month}</Text>
                  </TouchableOpacity>
                  <Ionicons
                    size={15}
                    color={globalStyle.g_appMainContentColors.color}
                    name={
                      expanded === InvoiceItem.Id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    onPress={() => handleAccordions(InvoiceItem.Id)}
                  />
                </View>
              </Card>
              {expanded === InvoiceItem.Id && (
                <View style={styles.EventType_Content}>
                  {InvoiceItem.TotalData.map(EventItem => (
                    <>
                      <View key={EventItem.Id}>
                        <View style={styles.EventType_Header}>
                          <Text style={styles.EventType_Name}>
                            {EventItem.EventType}
                          </Text>
                          <View style={styles.EventType_Attendees_Content}>
                            <FaIcons name="users" size={15} />
                            <Text>{EventItem.Attendees}</Text>
                          </View>
                        </View>
                        {EventItem.Items.map(selectedItems => (
                          <View key={selectedItems.Id}>
                            <Text
                              style={[
                                styles.Item_Name,
                                globalStyle.g_appDefaultTextColor,
                              ]}>
                              {selectedItems.Name}
                            </Text>
                          </View>
                        ))}
                        <View style={styles.TotalCost_Content}>
                            <Text style={styles.TotalCost_Text}>Total = Rs {EventItem.TotalCost}.00</Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.Pay_Buttons}>
        <Text
          style={[styles.Pay_Buttons_Text, globalStyle.g_appDefaultTextColor]}>
          Confirm
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
  },

  //Accordian
  Invoice_Accordian_Card: {
    margin: 5,
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 5,
  },
  Invoice_Accordian_CardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Invoice_Date:{
    fontSize:12,
    fontWeight:'bold'
  },
  Invoice_Accordian_Card_Date:{
    backgroundColor:'#f4f4f4',
    padding:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  //Content
  EventType_Content: {
    margin: 10,
  },
  EventType_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  EventType_Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  EventType_Attendees_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  Item_Name: {
    fontWeight: 'bold',
    paddingTop: 10,
  },

  //Total cost
  TotalCost_Content:{
    marginTop:10,
    marginBottom:5,
    paddingTop:5,
    paddingBottom:5,
    borderTopColor:'#ccc',
    borderTopWidth:1,
    borderBottomColor:'#ccc',
    borderBottomWidth:1
  },
  TotalCost_Text:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000',
    textAlign:'right'
  }
});

export default Invoice;
