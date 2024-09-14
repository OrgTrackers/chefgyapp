import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';

import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FaIcons from 'react-native-vector-icons/FontAwesome';

import {Card, Title, Switch} from 'react-native-paper';
import {Image} from 'react-native';
import {globalStyle} from '../assets/styles/GlobalStyles';

const MenuFilters = [
  {
    Id: 1,
    Name: 'First Menu',
  },
  {
    Id: 2,
    Name: 'Second Menu',
  },
  {
    Id: 3,
    Name: 'Third Menu',
  },
  {
    Id: 4,
    Name: 'Fourth Menu',
  },
  {
    Id: 5,
    Name: 'Fifth Menu',
  },
];

const BreakfastMenus = [
  {
    Id: 1,
    Title: 'Tiffins',
    TagLine: 'Cost Per Person',
    Items: [
      {
        Id: 1,
        ItemImage: require('../assets/images/homeCaters/Home_Img_1.png'),
        ItemName: 'Idly',
        Price: '200 /-',
      },
      {
        Id: 2,
        ItemImage: require('../assets/images/homeCaters/Home_Img_2.jpg'),
        ItemName: 'Dosa',
        Price: '150 /-',
      },
      {
        Id: 3,
        ItemImage: require('../assets/images/homeCaters/Home_Img_3.jpg'),
        ItemName: 'Masala Dosa',
        Price: '180 /-',
      },
      {
        Id: 4,
        ItemImage: require('../assets/images/homeCaters/Home_Img_4.jpg'),
        ItemName: 'Upma Dosa',
        Price: '170 /-',
      },
      {
        Id: 5,
        ItemImage: require('../assets/images/homeCaters/Home_Img_5.jpg'),
        ItemName: 'Uthapa',
        Price: '160 /-',
      },
    ],
  },
  {
    Id: 2,
    Title: 'Salads',
    TagLine: 'Cost Per Person',
    Items: [
      {
        Id: 1,
        ItemImage: require('../assets/images/homeCaters/Home_Img_1.png'),
        ItemName: 'Salads',
        Price: '120 /-',
      },
      {
        Id: 2,
        ItemImage: require('../assets/images/homeCaters/Home_Img_2.jpg'),
        ItemName: 'Salads',
        Price: '130 /-',
      },
      {
        Id: 3,
        ItemImage: require('../assets/images/homeCaters/Home_Img_3.jpg'),
        ItemName: 'Salads',
        Price: '140 /-',
      },
      {
        Id: 4,
        ItemImage: require('../assets/images/homeCaters/Home_Img_4.jpg'),
        ItemName: 'Salads',
        Price: '150 /-',
      },
      {
        Id: 5,
        ItemImage: require('../assets/images/homeCaters/Home_Img_5.jpg'),
        ItemName: 'Salads',
        Price: '160 /-',
      },
    ],
  },
  {
    Id: 3,
    Title: 'Tea/Coffee',
    TagLine: 'Cost Per Person',
    Items: [
      {
        Id: 1,
        ItemImage: require('../assets/images/homeCaters/Home_Img_1.png'),
        ItemName: 'Tea',
        Price: '50 /-',
      },
      {
        Id: 2,
        ItemImage: require('../assets/images/homeCaters/Home_Img_2.jpg'),
        ItemName: 'Cold Coffee',
        Price: '100 /-',
      },
      {
        Id: 3,
        ItemImage: require('../assets/images/homeCaters/Home_Img_3.jpg'),
        ItemName: 'Masala Tea',
        Price: '60 /-',
      },
      {
        Id: 4,
        ItemImage: require('../assets/images/homeCaters/Home_Img_4.jpg'),
        ItemName: 'Filter Coffee',
        Price: '80 /-',
      },
      {
        Id: 5,
        ItemImage: require('../assets/images/homeCaters/Home_Img_5.jpg'),
        ItemName: 'Cake',
        Price: '150 /-',
      },
    ],
  },
  {
    Id: 4,
    Title: 'Snacks',
    TagLine: 'Cost Per Person',
    Items: [
      {
        Id: 1,
        ItemImage: require('../assets/images/homeCaters/Home_Img_1.png'),
        ItemName: 'Cakes',
        Price: '120 /-',
      },
      {
        Id: 2,
        ItemImage: require('../assets/images/homeCaters/Home_Img_2.jpg'),
        ItemName: 'Cup Cakes',
        Price: '80 /-',
      },
      {
        Id: 3,
        ItemImage: require('../assets/images/homeCaters/Home_Img_3.jpg'),
        ItemName: 'Samosa',
        Price: '30 /-',
      },
      {
        Id: 4,
        ItemImage: require('../assets/images/homeCaters/Home_Img_4.jpg'),
        ItemName: 'Mirchi Baji',
        Price: '40 /-',
      },
      {
        Id: 5,
        ItemImage: require('../assets/images/homeCaters/Home_Img_5.jpg'),
        ItemName: 'Pakoda',
        Price: '50 /-',
      },
    ],
  },
];

const MenuTypes = [
  {
    Id: 1,
    Name: 'Royal Menu',
    TotalCost: '30,000',
  },
  {
    Id: 2,
    Name: 'Deluxe',
    TotalCost: '10,000',
  },
  {
    Id: 3,
    Name: 'Standerd Menu',
    TotalCost: '7,000',
  },
  {
    Id: 4,
    Name: 'Add-Ons',
    TotalCost: null,
  },
];

const selectCategories = [
  {
    Id: 1,
    Title: 'Breakfast',
    Icons: 'food-apple',
    Decscription: 'Rise and shine! Time to pick your perfect breakfast',
    Dates: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '1 Sep 2024',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '2 Sep 2024',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '3 Sep 2024',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '4 Sep 2024',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '5 Sep 2024',
      },
      {
        Id: 6,
        Day: 'Day 6',
        Date: '6 Sep 2024',
      },
      {
        Id: 7,
        Day: 'Day 7',
        Date: '7 Sep 2024',
      },
      {
        Id: 8,
        Day: 'Day 8',
        Date: '8 Sep 2024',
      },
      {
        Id: 9,
        Day: 'Day 9',
        Date: '9 Sep 2024',
      },
    ],
  },
  {
    Id: 2,
    Title: 'Lunch',
    Icons: 'food',
    Decscription: 'Midday cravings? Choose your delicious lunch delight!',
    Dates: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '1 Sep 2024',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '2 Sep 2024',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '3 Sep 2024',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '4 Sep 2024',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '5 Sep 2024',
      },
      {
        Id: 6,
        Day: 'Day 6',
        Date: '6 Sep 2024',
      },
      {
        Id: 7,
        Day: 'Day 7',
        Date: '7 Sep 2024',
      },
      {
        Id: 8,
        Day: 'Day 8',
        Date: '8 Sep 2024',
      },
      {
        Id: 9,
        Day: 'Day 9',
        Date: '9 Sep 2024',
      },
    ],
  },
  {
    Id: 3,
    Title: 'Dinner',
    Icons: 'food-turkey',
    Decscription: 'Unwind and dine! Select your perfect dinner treat',
    Dates: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '1 Sep 2024',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '2 Sep 2024',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '3 Sep 2024',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '4 Sep 2024',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '5 Sep 2024',
      },
      {
        Id: 6,
        Day: 'Day 6',
        Date: '6 Sep 2024',
      },
      {
        Id: 7,
        Day: 'Day 7',
        Date: '7 Sep 2024',
      },
      {
        Id: 8,
        Day: 'Day 8',
        Date: '8 Sep 2024',
      },
      {
        Id: 9,
        Day: 'Day 9',
        Date: '9 Sep 2024',
      },
    ],
  },
];

const Menus = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('First Menu');
  const [showCategories, setShowCategories] = useState(true);
  const [showMenus, setShowMenus] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const [selectedDateId, setSelectedDateId] = useState(null);
  const [expanded, setExpanded] = useState(MenuTypes[0].Id);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id);
  };

  const handleItemPress = item => {
    setActiveFilter(item.Name);
  };

  const handleIncrease = () => {
    setInputValue(prevValue => prevValue + 1);
  };

  const handleDecrease = () => {
    setInputValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const handleDateSelection = selectedDate => {
    setSelectedDateId(selectedDate);
    setShowCategories(false);
    setShowMenus(true);
  };

  const handleBackBtn = () => {
    if (showMenus) {
      setShowMenus(false);
      setShowCategories(true);
    } else {
      navigation.navigate('FoodSession');
    }
  };
  return (
    <View style={styles.Menus_Container}>
      <ImageBackground
        blurRadius={1}
        style={styles.M_Header_Img}
        source={require('../assets/images/homeCaters/Home_Img_1.png')}>
        <View style={styles.overlay} />
        <View style={[globalStyle.g_appPageHeaderContainer]}>
          <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
            <TouchableOpacity onPress={handleBackBtn}>
              <Ionicons
                name="chevron-back"
                size={24}
                color={globalStyle.g_appPageHeaderIconsColors.color}
              />
            </TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={15}
              color={globalStyle.g_appPageHeaderIconsColors.color}
            />
          </View>
          <Text style={styles.M_Header_Text}>Saicharan Vadlamanu</Text>
          {showMenus && (
            <View>
              <Text style={styles.Show_Menu_Header}>
                Breakfast / 20 Aug 2024
              </Text>
            </View>
          )}
        </View>
        {showCategories}
        {showMenus && (
          <View style={styles.Menus_Filters}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {MenuFilters.map((mItem, mIndex) => (
                <TouchableOpacity
                  key={mIndex}
                  style={[
                    styles.Menu_Filter_Item,
                    activeFilter === mItem.Name &&
                      globalStyle.g_appMainContentActiveTabsBg,
                  ]}
                  onPress={() => handleItemPress(mItem)}>
                  <Text
                    style={[
                      styles.Menu_Filter_Text,
                      globalStyle.g_appMainContentActiveTabsText,
                    ]}>
                    {mItem.Name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ImageBackground>
      <View style={styles.Menus_Content}>
        {showCategories && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectCategories.map(cateItem => (
              <View key={cateItem.Id} style={styles.selectCategories}>
                <View style={styles.selectCategories_Header}>
                  <MaIcons
                    name={cateItem.Icons}
                    size={25}
                    style={[globalStyle.g_appMainContentIconColors]}
                  />
                  <Text
                    style={[
                      globalStyle.g_appDefaultTextColor,
                      styles.selectCategories_Header_Text,
                    ]}>
                    {cateItem.Title}
                  </Text>
                </View>
                <Text style={styles.selectCategories_Header_Tag}>
                  {cateItem.Decscription}
                </Text>
                <View style={styles.cateDate_Container}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cateItem.Dates.map(dateItem => (
                      <TouchableOpacity
                        key={dateItem.Id}
                        onPress={() => handleDateSelection(dateItem.Id)}
                        style={[
                          styles.dateItem,
                          selectedDateId === dateItem.Id &&
                            globalStyle.g_appMainContentActiveBgColors,
                        ]}>
                        <Text
                          style={[
                            globalStyle.g_appDefaultTextColor,
                            styles.dateText,
                            selectedDateId === dateItem.Id &&
                              styles.selectedDateText, // Conditional style for selected date text
                            selectedDateId === dateItem.Id &&
                              globalStyle.g_appMainContentActiveColors, // Conditional global style
                          ]}>
                          {dateItem.Date}
                        </Text>
                        <Text
                          style={[
                            globalStyle.g_appDefaultTextColor,
                            styles.dayText,
                            selectedDateId === dateItem.Id &&
                              styles.selectedDayText, // Conditional style for selected day text
                            selectedDateId === dateItem.Id &&
                              globalStyle.g_appMainContentActiveColors, // Conditional global style
                          ]}>
                          {dateItem.Day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        {showMenus && (
          <View style={styles.Menu_Types_Container}>
            {activeFilter === 'First Menu' && (
              <View style={styles.Menu_Types_Content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {MenuTypes.map(mType_Item => (
                    <Card key={mType_Item.Id} style={styles.Menu_Types_Card}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text style={[globalStyle.g_appDefaultTextColor]}>
                            {mType_Item.Name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                            }}>
                            <FaIcons
                              name="rupee"
                              size={12}
                              color={globalStyle.g_appMainContentColors.color}
                            />
                            <Text style={[globalStyle.g_appDefaultTextColor]}>
                              {mType_Item.TotalCost}
                            </Text>
                          </View>
                        </View>
                        <Ionicons
                          name={
                            expanded === mType_Item.Id
                              ? 'chevron-up'
                              : 'chevron-down'
                          }
                          onPress={() => handleAccordions(mType_Item.Id)}
                          size={15}
                          color="#399590"
                        />
                      </View>
                      {expanded === mType_Item.Id && (
                        <View>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <Text style={styles.Menu_List_Header}>
                                  {mBItem.Title}
                                </Text>
                                <Text style={styles.Menu_List_Header_Tag}>
                                  {mBItem.TagLine}
                                </Text>
                                <ScrollView
                                  horizontal
                                  showsHorizontalScrollIndicator={false}>
                                  {mBItem.Items.map(item => (
                                    <View
                                      key={item.Id}
                                      style={styles.Menu_List_Item}>
                                      <Image
                                        source={item.ItemImage}
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 10,
                                        }}
                                      />
                                      <Text
                                        style={{
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                          marginTop: '10%',
                                        }}>
                                        {item.ItemName}
                                      </Text>
                                      <Text style={styles.Item_Price}>
                                        Price:{item.Price}
                                      </Text>
                                      {mType_Item.Name === 'Add-Ons' && (
                                        <View style={styles.Menu_List_Inputs}>
                                          <AntIcons
                                            name="minussquare"
                                            size={20} // Adjust size to better suit the UI
                                            color={
                                              globalStyle.g_appDefaultTextColor
                                                .color
                                            }
                                            onPress={handleDecrease}
                                          />
                                          <TextInput
                                            style={styles.Menu_List_Input}
                                            value={String(inputValue)}
                                            keyboardType="numeric"
                                            editable={false} // Make input non-editable
                                            placeholderTextColor="#272727"
                                          />
                                          <AntIcons
                                            name="plussquare"
                                            size={20} // Adjust size to better suit the UI
                                            color={
                                              globalStyle.g_appDefaultTextColor
                                                .color
                                            }
                                            onPress={handleIncrease}
                                          />
                                        </View>
                                      )}
                                      <TouchableOpacity style={styles.Add_Btn}>
                                        <Text style={styles.Add_Btn_Text}>
                                          Add
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  ))}
                                </ScrollView>
                              </View>
                            </>
                          ))}
                          <TouchableOpacity
                            style={[globalStyle.g_Button]}
                            onPress={() => navigation.navigate('OrderSummary')}>
                            <Text style={[globalStyle.g_ButtonText]}>
                              View Cart (1)
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Card>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
  c;
};

const styles = StyleSheet.create({
  Menus_Container: {
    backgroundColor: '#ffff',
    width: '100%',
    height: '100%',
  },

  //Header
  M_Header_Img: {
    width: '100%',
    height: 250, // Adjust the height as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add black overlay
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay fill the entire ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
  M_Header_Text: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: '10%',
    textAlign: 'center',
  },

  // Filters
  Menus_Filters: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  Menu_Filter_Item: {
    marginLeft: 10,
    marginRight: 15,
    alignItems: 'baseline',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  Menu_Filter_Text: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  //Main Content
  Menus_Content: {
    flex: 1,
    padding: 10,
    marginBottom: '10%',
  },

  //Categories
  selectCategories: {
    margin: '2%',
    padding: 10,
    shadowColor: '#272727',
    shadowOffset: {width: 0, height: 3},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: '5%',
    borderRadius: 10,
  },
  selectCategories_Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: '2%',
  },
  selectCategories_Header_Text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectCategories_Header_Tag: {
    fontSize: 12,
  },

  // dates
  cateDate_Container: {
    marginTop: '10%',
    marginBottom: '5%',
  },
  dateItem: {
    margin: 10,
    padding: 10,
    shadowColor: '#272727',
    shadowOffset: {width: 0, height: 3},
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  dateText: {
    // color: '#399590',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    borderBottomColor: '#399590',
    borderBottomWidth: 1,
  },
  dayText: {
    // color: '#399590',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  selectedDateText: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
  },
  selectedDayText: {
    color: 'white', // Text color for selected date
  },

  //Menu
  Show_Menu_Header: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Menu_Types_Card: {
    margin: '2%',
    borderRadius: 0,
    padding: 10,
    backgroundColor: '#ffff',
  },
  Menu_Types_Card_Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  //Expanded Content
  M_List_Container: {
    backgroundColor: '#ffff',
    marginTop: '2%',
    borderRadius: 10,
    padding: 10,
    marginBottom: '5%',
    borderColor: '#cccc',
    borderWidth: 1,
  },
  Menu_List_Header: {
    color: '#292929',
    fontWeight: 'bold',
    borderRadius: 50,
    fontSize: 20,
    marginTop: '10%',
  },
  Menu_List_Header_Tag: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  Menu_List_Item: {
    marginRight: 30,
    marginTop: '3%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Item_Price: {
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
    fontWeight: '900',
  },
  Add_Btn: {
    backgroundColor: '#399590',
    paddingLeft: 10,
    paddingRight: 10,
  },
  Add_Btn_Text: {
    color: '#ffff',
    fontSize: 10,
  },

  Menu_List_Inputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  Menu_List_Input: {
    borderRadius: 5,
    borderColor: '#cccc',
    borderWidth: 1,
    width: 50,
    height: 20, // Increased height to ensure text is visible
    fontSize: 10, // Adjusted font size to match the height
    textAlign: 'center', // Center the text horizontally
    paddingVertical: 5, // Add some padding to center the text vertically
    fontWeight: 'bold',
    color: '#272727',
  },
});
export default Menus;
