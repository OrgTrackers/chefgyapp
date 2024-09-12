import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import Footer from './Footer';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Paper
import {Card} from 'react-native-paper';

const orderSummaryData = [
  {
    Id: 1,
    Title: 'Breakfast',
    Icon: 'food-apple',
    Items: [
      {Id: 1, Name: 'Idly'},
      {Id: 2, Name: 'Dosa'},
      {Id: 3, Name: 'Masala Dosa'},
      {Id: 4, Name: 'Upma Dosa'},
      {Id: 5, Name: 'Egg Dosa'},
    ],
  },
  {
    Id: 2,
    Title: 'Lunch',
    Icon: 'food',
    Items: [
      {Id: 1, Name: 'Idly'},
      {Id: 2, Name: 'Dosa'},
      {Id: 3, Name: 'Masala Dosa'},
      {Id: 4, Name: 'Upma Dosa'},
      {Id: 5, Name: 'Egg Dosa'},
    ],
  },
  {
    Id: 3,
    Title: 'Dinner',
    Icon: 'food-turkey',
    Items: [
      {Id: 1, Name: 'Idly'},
      {Id: 2, Name: 'Dosa'},
      {Id: 3, Name: 'Masala Dosa'},
      {Id: 4, Name: 'Upma Dosa'},
      {Id: 5, Name: 'Egg Dosa'},
    ],
  },
];

export default function OrderSummary() {
  const navigation = useNavigation();

  // Helper function to group data into pairs
  const groupIntoRows = (data, itemsPerRow) => {
    return data.reduce((rows, item, index) => {
      if (index % itemsPerRow === 0) {
        rows.push([item]);
      } else {
        rows[rows.length - 1].push(item);
      }
      return rows;
    }, []);
  };

  const groupedData = groupIntoRows(orderSummaryData, 2); // Group data into pairs of 2

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
        <Text
          style={[globalStyle.g_appMainContentHeaders, styles.OS_Dates_Text]}>
          Sep 11 - Sep 12
        </Text>
        <View style={styles.OS_Details_Content}>
          {groupedData.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map(OSMenuItem => (
                <Card style={styles.OSMenu_Card} key={OSMenuItem.Id}>
                  <View style={styles.OSMenu_Card_Header}>
                    <MaIcons
                      name={OSMenuItem.Icon}
                      size={globalStyle.g_g_appMainContentHeadersIcon.fontSize}
                      color={globalStyle.g_appMainContentIconColors.color}
                    />
                    <Text>{OSMenuItem.Title}</Text>
                  </View>
                  <View style={styles.OSMenu_Card_Body}>
                    {OSMenuItem.Items.map(Items => (
                      <Text
                        key={Items.Id}
                        lineBreakMode="tail"
                        numberOfLines={1}>
                        {'• ' + Items.Name} {/* Add a dot before each item */}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.OSTotal_Content}>
                    <Text></Text>
                  </View>
                  <Text style={[globalStyle.g_ButtonText]}>More</Text>
                </Card>
              ))}
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[globalStyle.g_Button]}
          onPress={() => navigation.navigate('')}>
          <Text style={[globalStyle.g_ButtonText]}>All Set</Text>
        </TouchableOpacity>
      </View>
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
});
