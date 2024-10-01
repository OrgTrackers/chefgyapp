import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyle} from '../../assets/styles/GlobalStyles';
import {Card} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PickDishData = [
  {
    Id: 1,
    Name: 'Indian',
    Items: [
      {Id: 1, IName: 'Veg Biryani'},
      {Id: 2, IName: 'Paneer Tikka'},
      {Id: 3, IName: 'Butter Chicken'},
      {Id: 4, IName: 'Dal Makhani'},
      {Id: 5, IName: 'Chole Bhature'},
      {Id: 6, IName: 'Palak Paneer'},
      {Id: 7, IName: 'Aloo Gobi'},
      {Id: 8, IName: 'Samosa'},
      {Id: 9, IName: 'Rogan Josh'},
      {Id: 10, IName: 'Pav Bhaji'},
    ],
  },
  {
    Id: 2,
    Name: 'Chinese',
    Items: [
      {Id: 1, IName: 'Fried Rice'},
      {Id: 2, IName: 'Kung Pao Chicken'},
      {Id: 3, IName: 'Sweet and Sour Pork'},
      {Id: 4, IName: 'Chow Mein'},
      {Id: 5, IName: 'Spring Rolls'},
      {Id: 6, IName: 'Dumplings'},
      {Id: 7, IName: 'Mapo Tofu'},
      {Id: 8, IName: 'Peking Duck'},
      {Id: 9, IName: 'Hot Pot'},
      {Id: 10, IName: 'Wonton Soup'},
    ],
  },
  {
    Id: 3,
    Name: 'Japanese',
    Items: [
      {Id: 1, IName: 'Sushi'},
      {Id: 2, IName: 'Ramen'},
      {Id: 3, IName: 'Tempura'},
      {Id: 4, IName: 'Sashimi'},
      {Id: 5, IName: 'Udon'},
      {Id: 6, IName: 'Okonomiyaki'},
      {Id: 7, IName: 'Takoyaki'},
      {Id: 8, IName: 'Miso Soup'},
      {Id: 9, IName: 'Teriyaki Chicken'},
      {Id: 10, IName: 'Onigiri'},
    ],
  },
];
const Dates = [
  {
    Id: 1,
    Date: 27,
    Month: 'Sep',
  },
  {
    Id: 2,
    Date: 28,
    Month: 'Sep',
  },
  {
    Id: 3,
    Date: 29,
    Month: 'Sep',
  },
  {
    Id: 4,
    Date: 30,
    Month: 'Sep',
  },
  {
    Id: 5,
    Date: 1,
    Month: 'Oct',
  },
];

const BgColors = ['#f4d03f', '#FF2200', '#FA5F0F'];

const HomeFoodPickDish = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(1);
  const [checked, setChecked] = React.useState([]);

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  const handleCheck = itemId => {
    if (checked.includes(itemId)) {
      // If item is already selected, uncheck it
      setChecked(checked.filter(id => id !== itemId));
    } else {
      // If item is not selected, add it to the array
      setChecked([...checked, itemId]);
    }
  };

  const unCheck = itemId => {
    // Uncheck only the specific item
    setChecked(checked.filter(id => id !== itemId));
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeFoodFilters')}>
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
        <Text style={[globalStyle.g_appPageHeaderText]}>Pick Your Dish</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {PickDishData.map((selectedItem, index) => (
            <View key={selectedItem.Id}>
              <View
                style={[
                  styles.selectedFS_Card,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: BgColors[index % BgColors.length],
                  },
                ]}>
                <View style={styles.selectedFS_CardBody}>
                  <TouchableOpacity
                    onPress={() => handleAccordions(selectedItem.Id)}>
                    <Text
                      style={[
                        styles.selectedName,
                        {color: BgColors[index % BgColors.length]},
                      ]}>
                      {selectedItem.Name}
                    </Text>
                  </TouchableOpacity>
                  <Ionicons
                    size={15}
                    color={BgColors[index % BgColors.length]}
                    name={
                      expanded === selectedItem.Id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    onPress={() => handleAccordions(selectedItem.Id)}
                  />
                </View>
              </View>
              {expanded === selectedItem.Id && (
                <View style={styles.SelectedFS_Item_Content}>
                  <View style={styles.selectDates_Container}>
                    {Dates.map(dateItem => (
                      <View key={dateItem.Id}>
                        <Card style={styles.Date_Card}>
                          <View style={styles.Date_CardBody}>
                            <Text style={styles.Date_Text}>
                              {dateItem.Date}
                            </Text>
                            <Text style={styles.Month_Text}>
                              {dateItem.Month}
                            </Text>
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  <View style={styles.selectedItems_Data}>
                    {selectedItem.Items.map(Items => (
                      <View key={Items.Id}>
                        <View style={styles.Items_Data_Container}>
                          <View style={styles.Items_Data}>
                            <BouncyCheckbox
                              isChecked={checked.includes(Items.Id)}
                              onPress={() => handleCheck(Items.Id)}
                              fillColor={
                                globalStyle.g_appMainContentColors.color
                              }
                              size={
                                globalStyle.g_appMainContentChexBoxSize.fontSize
                              }
                              style={[globalStyle.g_appMainContentChexBoxSize]}
                            />
                            <Text style={styles.ItemName}>{Items.IName}</Text>
                          </View>
                          {checked.includes(Items.Id) && (
                            <Ionicons
                              name="close"
                              size={20}
                              color="#D9D9D9"
                              onPress={() => unCheck(Items.Id)}
                            />
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[styles.Btn_As_Footer, globalStyle.g_appDefaultContentBgColor]}
        onPress={() => navigation.navigate('HomeFoodList')}>
        <Text style={styles.Btn_As_Footer_Text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn_As_Footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
  },
  Btn_As_Footer_Text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedFS_Card: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedFS_CardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffff',
  },

  //Dates
  selectDates_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  Date_Card: {
    padding: 5,
    borderRadius: 5,
  },
  Date_CardBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Date_Text: {
    fontSize: 10,
  },
  Month_Text: {
    fontSize: 10,
  },

  // Inner content
  SelectedFS_Item_Content: {
    margin: 10,
  },
  selectedItems_Data: {
    marginTop: 10,
  },
  Items_Data_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Items_Data: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  ItemName:{
    color:'#000'
  }
});

export default HomeFoodPickDish;
