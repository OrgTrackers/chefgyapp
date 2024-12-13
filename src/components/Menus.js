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

import {Card, Title, Switch, Checkbox} from 'react-native-paper';
import {Image} from 'react-native';
import {globalStyle} from '../assets/styles/GlobalStyles';
import Header from './Header';

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
        ItemImage: require('../assets/Updated/images/MenuItems/Item_1.png'),
        ItemName: 'Idly',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_2.png'),
        ItemName: 'Dosa',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_3.png'),
        ItemName: 'Sambar Rice',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_4.png'),
        ItemName: 'Noodles',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_5.png'),
        ItemName: 'Soup',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
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
        ItemImage: require('../assets/Updated/images/MenuItems/Item_1.png'),
        ItemName: 'Idly',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_2.png'),
        ItemName: 'Dosa',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_3.png'),
        ItemName: 'Sambar Rice',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_4.png'),
        ItemName: 'Noodles',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_5.png'),
        ItemName: 'Soup',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
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
        ItemImage: require('../assets/Updated/images/MenuItems/Item_1.png'),
        ItemName: 'Idly',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_2.png'),
        ItemName: 'Dosa',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_3.png'),
        ItemName: 'Sambar Rice',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_4.png'),
        ItemName: 'Noodles',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_5.png'),
        ItemName: 'Soup',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
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
        ItemImage: require('../assets/Updated/images/MenuItems/Item_1.png'),
        ItemName: 'Idly',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_2.png'),
        ItemName: 'Dosa',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_3.png'),
        ItemName: 'Sambar Rice',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_4.png'),
        ItemName: 'Noodles',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        ItemImage: require('../assets/Updated/images/MenuItems/Item_5.png'),
        ItemName: 'Soup',
        Rating: '4.5',
        Decscription: 'A genuine fine-dining experience awaits.',
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
const menuType = [
  {
    Id: 1,
    Name: 'Veg',
  },
  {
    Id: 2,
    Name: 'Non-Veg',
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
  const [isVeg, setIsVeg] = useState(true);
  const [isAdded, setIsAdded] = useState(null);
  const [isMenuTypeOn, setIsMenuTypeOn] = React.useState(null);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onToggleMenuTypes = id => {
    if (isMenuTypeOn === id) {
      setIsMenuTypeOn(null); // Deselect if clicked again
    } else {
      setIsMenuTypeOn(id); // Set the clicked switch as active
    }
  };

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id);
  };

  const handleAddRemove = id => {
    setIsAdded(isAdded === id ? null : id);
  };
  const handleItemPress = item => {
    setActiveFilter(item.Name);
  };

  const handleShowDates = () => {
    setShowMenus(false);
    setShowCategories(true);
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
      navigation.navigate('CaterSelection');
    }
  };
  return (
    <View style={styles.Menus_Container}>
      <ImageBackground
        blurRadius={1}
        style={styles.M_Header_Img}
        source={require('../assets/Updated/images/MenuBanner-2.png')}>
        <View style={styles.overlay} />
        <View style={[globalStyle.g_appPageHeaderContainer]}>
          <Header onBackPress={handleBackBtn} />
          <Text style={styles.M_Header_Text}>
            Sri Venkata Ramana Kanaka Durga Deluxe Caterers
          </Text>
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
                <Text
                  style={[
                    styles.selectCategories_Header_Tag,
                    globalStyle.g_appTextBlack,
                  ]}>
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
                  <Card style={styles.ApplyForAllDates_Card}>
                    <View style={styles.ApplyForAllDates_CardBody}>
                      <Text style={[globalStyle.g_appTextBlack]}>
                        Apply For All Dates
                      </Text>
                      <Switch
                        color={globalStyle.g_appDefaultTextColor.color}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                  </Card>
                  <Card style={styles.Veg_NonVeg_Container}>
                    <Text style={styles.Select_Type_Text}>
                      Select Your Type :
                    </Text>
                    <View style={styles.container}>
                      <TouchableOpacity
                        style={[
                          styles.toggleButton,
                          isVeg ? styles.activeVeg : styles.inactive,
                        ]}
                        onPress={() => setIsVeg(true)}>
                        <Ionicons
                          name="ellipse"
                          size={15}
                          color={isVeg ? 'green' : 'gray'}
                        />
                        <Text style={[styles.text, isVeg && styles.activeText]}>
                          Veg
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.toggleButton,
                          !isVeg ? styles.activeNonVeg : styles.inactive,
                        ]}
                        onPress={() => setIsVeg(false)}>
                        <Ionicons
                          name="triangle"
                          size={15}
                          color={!isVeg ? 'red' : 'gray'}
                        />
                        <Text
                          style={[styles.text, !isVeg && styles.activeText]}>
                          Non-Veg
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                  {MenuTypes.map(mType_Item => (
                    <Card key={mType_Item.Id} style={styles.Menu_Types_Card}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text
                            style={[
                              styles.MenuType_Header,
                              globalStyle.g_appDefaultTextColor,
                            ]}
                            onPress={() => handleAccordions(mType_Item.Id)}>
                            {mType_Item.Name}
                          </Text>
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
                      <View style={styles.Crowed_Cost_Container}>
                        <View style={styles.Cost_Container}>
                          <Text style={[globalStyle.g_appDefaultTextColor]}>
                            Attendees : 20000
                          </Text>
                        </View>
                        <View style={styles.Cost_Container}>
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
                      {expanded === mType_Item.Id && (
                        <View>
                          <Card style={styles.Veg_NonVeg_Container}>
                            <Text style={styles.Select_Type_Text}>
                              Select Your Type :
                            </Text>
                            <View style={styles.container}>
                              <TouchableOpacity
                                style={[
                                  styles.toggleButton,
                                  isVeg ? styles.activeVeg : styles.inactive,
                                ]}
                                onPress={() => setIsVeg(true)}>
                                <Ionicons
                                  name="ellipse"
                                  size={15}
                                  color={isVeg ? 'green' : 'gray'}
                                />
                                <Text
                                  style={[
                                    styles.text,
                                    isVeg && styles.activeText,
                                  ]}>
                                  Veg
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.toggleButton,
                                  !isVeg
                                    ? styles.activeNonVeg
                                    : styles.inactive,
                                ]}
                                onPress={() => setIsVeg(false)}>
                                <Ionicons
                                  name="triangle"
                                  size={15}
                                  color={!isVeg ? 'red' : 'gray'}
                                />
                                <Text
                                  style={[
                                    styles.text,
                                    !isVeg && styles.activeText,
                                  ]}>
                                  Non-Veg
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </Card>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <View style={styles.Menu_List_Header_Container}>
                                  <Text
                                    style={[
                                      styles.Menu_List_Header,
                                      globalStyle.g_appMainContentActiveBgColors,
                                    ]}>
                                    {mBItem.Title}
                                  </Text>
                                  <Text style={styles.Menu_List_Selected_Count}>
                                    3 Of {mBItem.Items.length}
                                  </Text>
                                </View>
                                <View style={styles.Menu_Items_List}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    {mBItem.Items.map(item => (
                                      <View key={item.Id}>
                                        <Card
                                          style={styles.Menu_Item_List_Card}>
                                          <View
                                            style={
                                              styles.Menu_Item_List_CardBody
                                            }>
                                            <Image
                                              source={item.ItemImage}
                                              style={styles.Menu_Item_Image}
                                            />
                                          </View>
                                          <Text style={[styles.Menu_Item_Name]}>
                                            {item.ItemName}
                                          </Text>
                                          <Text
                                            style={[
                                              styles.Menu_Item_Desc,
                                              globalStyle.g_appTextBlack,
                                            ]}
                                            numberOfLines={2}
                                            textBreakStrategy="simple">
                                            {item.Decscription}
                                          </Text>
                                          <View
                                            style={
                                              styles.Menu_Item_Rating_AddBtn
                                            }>
                                            <View
                                              style={styles.Menu_Item_Rating}>
                                              <Text
                                                style={
                                                  styles.Menu_Item_Rating_Text
                                                }>
                                                {item.Rating}
                                              </Text>
                                              <AntIcons
                                                name="star"
                                                size={14}
                                                color="#f1c40f"
                                              />
                                            </View>
                                            <MaIcons
                                              name={
                                                isAdded === item.Id
                                                  ? 'minus-box'
                                                  : 'plus-box'
                                              }
                                              onPress={() =>
                                                handleAddRemove(item.Id)
                                              }
                                              size={20}
                                              color={
                                                isAdded === item.Id
                                                  ? '#FF6666'
                                                  : '#389590'
                                              }
                                            />
                                          </View>
                                        </Card>
                                      </View>
                                    ))}
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ))}
                        </View>
                      )}
                    </Card>
                  ))}
                </ScrollView>
              </View>
            )}
            {activeFilter === 'Second Menu' && (
              <View style={styles.Menu_Types_Content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Card style={styles.ApplyForAllDates_Card}>
                    <View style={styles.ApplyForAllDates_CardBody}>
                      <Text>Apply For All Dates</Text>
                      <Switch
                        color={globalStyle.g_appDefaultTextColor.color}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                  </Card>
                  <View style={styles.Veg_NonVeg_Container}>
                    {menuType.map(Menu_Item => (
                      <View key={Menu_Item.Id}>
                        <Card style={styles.Veg_NonVeg_Card}>
                          <View style={styles.Veg_NonVeg_Card_Content}>
                            <Text
                              style={[
                                styles.Veg_NonVeg_Text,
                                globalStyle.g_appDefaultTextColor,
                              ]}>
                              {Menu_Item.Name}
                            </Text>
                            <Switch
                              value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                              onValueChange={() =>
                                onToggleMenuTypes(Menu_Item.Id)
                              }
                              color={globalStyle.g_appMainContentColors.color}
                            />
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  {MenuTypes.map(mType_Item => (
                    <Card
                      key={mType_Item.Id}
                      style={styles.Menu_Types_Card}
                      onPress={() => handleAccordions(mType_Item.Id)}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text
                            style={[
                              styles.MenuType_Header,
                              globalStyle.g_appDefaultTextColor,
                            ]}
                            onPress={() => handleAccordions(mType_Item.Id)}>
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
                          <View style={styles.Veg_NonVeg_Container}>
                            {menuType.map(Menu_Item => (
                              <View key={Menu_Item.Id}>
                                <Card style={styles.Veg_NonVeg_Card}>
                                  <View style={styles.Veg_NonVeg_Card_Content}>
                                    <Text
                                      style={[
                                        styles.Veg_NonVeg_Text,
                                        globalStyle.g_appDefaultTextColor,
                                      ]}>
                                      {Menu_Item.Name}
                                    </Text>
                                    <Switch
                                      value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                                      onValueChange={() =>
                                        onToggleMenuTypes(Menu_Item.Id)
                                      }
                                      color={
                                        globalStyle.g_appMainContentColors.color
                                      }
                                    />
                                  </View>
                                </Card>
                              </View>
                            ))}
                          </View>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <Text
                                  style={[
                                    styles.Menu_List_Header,
                                    globalStyle.g_appMainContentActiveBgColors,
                                  ]}>
                                  {mBItem.Title}
                                </Text>
                                <Text>{mBItem.Items.length} Of</Text>
                                <View style={styles.Menu_Items_List}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    {mBItem.Items.map(item => (
                                      <View key={item.Id}>
                                        <Card
                                          style={styles.Menu_Item_List_Card}>
                                          <View
                                            style={
                                              styles.Menu_Item_List_CardBody
                                            }>
                                            <Image
                                              source={item.ItemImage}
                                              style={styles.Menu_Item_Image}
                                            />
                                          </View>
                                          <Text style={[styles.Menu_Item_Name]}>
                                            {item.ItemName}
                                          </Text>
                                          <Text
                                            style={styles.Menu_Item_Desc}
                                            numberOfLines={2}
                                            textBreakStrategy="simple">
                                            {item.Decscription}
                                          </Text>
                                          <View
                                            style={
                                              styles.Menu_Item_Rating_AddBtn
                                            }>
                                            <View
                                              style={styles.Menu_Item_Rating}>
                                              <Text
                                                style={
                                                  styles.Menu_Item_Rating_Text
                                                }>
                                                {item.Rating}
                                              </Text>
                                              <AntIcons
                                                name="star"
                                                size={14}
                                                color="#f1c40f"
                                              />
                                            </View>
                                            <MaIcons
                                              name={
                                                isAdded === item.Id
                                                  ? 'minus-box'
                                                  : 'plus-box'
                                              }
                                              onPress={() =>
                                                handleAddRemove(item.Id)
                                              }
                                              size={20}
                                              color={
                                                isAdded === item.Id
                                                  ? '#FF6666'
                                                  : '#389590'
                                              }
                                            />
                                          </View>
                                        </Card>
                                      </View>
                                    ))}
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ))}
                          <TouchableOpacity style={[globalStyle.g_Button]}>
                            <Text style={[globalStyle.g_ButtonText]}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[globalStyle.g_Button]}
                            onPress={() => navigation.navigate('OrderSummary')}>
                            <Text style={[globalStyle.g_ButtonText]}>Next</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Card>
                  ))}
                </ScrollView>
              </View>
            )}
            {activeFilter === 'Third Menu' && (
              <View style={styles.Menu_Types_Content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Card style={styles.ApplyForAllDates_Card}>
                    <View style={styles.ApplyForAllDates_CardBody}>
                      <Text>Apply For All Dates</Text>
                      <Switch
                        color={globalStyle.g_appDefaultTextColor.color}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                  </Card>
                  <View style={styles.Veg_NonVeg_Container}>
                    {menuType.map(Menu_Item => (
                      <View key={Menu_Item.Id}>
                        <Card style={styles.Veg_NonVeg_Card}>
                          <View style={styles.Veg_NonVeg_Card_Content}>
                            <Text
                              style={[
                                styles.Veg_NonVeg_Text,
                                globalStyle.g_appDefaultTextColor,
                              ]}>
                              {Menu_Item.Name}
                            </Text>
                            <Switch
                              value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                              onValueChange={() =>
                                onToggleMenuTypes(Menu_Item.Id)
                              }
                              color={globalStyle.g_appMainContentColors.color}
                            />
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  {MenuTypes.map(mType_Item => (
                    <Card
                      key={mType_Item.Id}
                      style={styles.Menu_Types_Card}
                      onPress={() => handleAccordions(mType_Item.Id)}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text
                            style={[
                              styles.MenuType_Header,
                              globalStyle.g_appDefaultTextColor,
                            ]}
                            onPress={() => handleAccordions(mType_Item.Id)}>
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
                          <View style={styles.Veg_NonVeg_Container}>
                            {menuType.map(Menu_Item => (
                              <View key={Menu_Item.Id}>
                                <Card style={styles.Veg_NonVeg_Card}>
                                  <View style={styles.Veg_NonVeg_Card_Content}>
                                    <Text
                                      style={[
                                        styles.Veg_NonVeg_Text,
                                        globalStyle.g_appDefaultTextColor,
                                      ]}>
                                      {Menu_Item.Name}
                                    </Text>
                                    <Switch
                                      value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                                      onValueChange={() =>
                                        onToggleMenuTypes(Menu_Item.Id)
                                      }
                                      color={
                                        globalStyle.g_appMainContentColors.color
                                      }
                                    />
                                  </View>
                                </Card>
                              </View>
                            ))}
                          </View>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <Text
                                  style={[
                                    styles.Menu_List_Header,
                                    globalStyle.g_appMainContentActiveBgColors,
                                  ]}>
                                  {mBItem.Title}
                                </Text>
                                <Text>{mBItem.Items.length} Of</Text>
                                <View style={styles.Menu_Items_List}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    {mBItem.Items.map(item => (
                                      <View key={item.Id}>
                                        <Card
                                          style={styles.Menu_Item_List_Card}>
                                          <View
                                            style={
                                              styles.Menu_Item_List_CardBody
                                            }>
                                            <Image
                                              source={item.ItemImage}
                                              style={styles.Menu_Item_Image}
                                            />
                                          </View>
                                          <Text style={[styles.Menu_Item_Name]}>
                                            {item.ItemName}
                                          </Text>
                                          <Text
                                            style={styles.Menu_Item_Desc}
                                            numberOfLines={2}
                                            textBreakStrategy="simple">
                                            {item.Decscription}
                                          </Text>
                                          <View
                                            style={
                                              styles.Menu_Item_Rating_AddBtn
                                            }>
                                            <View
                                              style={styles.Menu_Item_Rating}>
                                              <Text
                                                style={
                                                  styles.Menu_Item_Rating_Text
                                                }>
                                                {item.Rating}
                                              </Text>
                                              <AntIcons
                                                name="star"
                                                size={14}
                                                color="#f1c40f"
                                              />
                                            </View>
                                            <MaIcons
                                              name={
                                                isAdded === item.Id
                                                  ? 'minus-box'
                                                  : 'plus-box'
                                              }
                                              onPress={() =>
                                                handleAddRemove(item.Id)
                                              }
                                              size={20}
                                              color={
                                                isAdded === item.Id
                                                  ? '#FF6666'
                                                  : '#389590'
                                              }
                                            />
                                          </View>
                                        </Card>
                                      </View>
                                    ))}
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ))}
                          <TouchableOpacity style={[globalStyle.g_Button]}>
                            <Text style={[globalStyle.g_ButtonText]}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[globalStyle.g_Button]}
                            onPress={() => navigation.navigate('OrderSummary')}>
                            <Text style={[globalStyle.g_ButtonText]}>Next</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Card>
                  ))}
                </ScrollView>
              </View>
            )}
            {activeFilter === 'Fourth Menu' && (
              <View style={styles.Menu_Types_Content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Card style={styles.ApplyForAllDates_Card}>
                    <View style={styles.ApplyForAllDates_CardBody}>
                      <Text>Apply For All Dates</Text>
                      <Switch
                        color={globalStyle.g_appDefaultTextColor.color}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                  </Card>
                  <View style={styles.Veg_NonVeg_Container}>
                    {menuType.map(Menu_Item => (
                      <View key={Menu_Item.Id}>
                        <Card style={styles.Veg_NonVeg_Card}>
                          <View style={styles.Veg_NonVeg_Card_Content}>
                            <Text
                              style={[
                                styles.Veg_NonVeg_Text,
                                globalStyle.g_appDefaultTextColor,
                              ]}>
                              {Menu_Item.Name}
                            </Text>
                            <Switch
                              value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                              onValueChange={() =>
                                onToggleMenuTypes(Menu_Item.Id)
                              }
                              color={globalStyle.g_appMainContentColors.color}
                            />
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  {MenuTypes.map(mType_Item => (
                    <Card
                      key={mType_Item.Id}
                      style={styles.Menu_Types_Card}
                      onPress={() => handleAccordions(mType_Item.Id)}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text
                            style={[
                              styles.MenuType_Header,
                              globalStyle.g_appDefaultTextColor,
                            ]}
                            onPress={() => handleAccordions(mType_Item.Id)}>
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
                          <View style={styles.Veg_NonVeg_Container}>
                            {menuType.map(Menu_Item => (
                              <View key={Menu_Item.Id}>
                                <Card style={styles.Veg_NonVeg_Card}>
                                  <View style={styles.Veg_NonVeg_Card_Content}>
                                    <Text
                                      style={[
                                        styles.Veg_NonVeg_Text,
                                        globalStyle.g_appDefaultTextColor,
                                      ]}>
                                      {Menu_Item.Name}
                                    </Text>
                                    <Switch
                                      value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                                      onValueChange={() =>
                                        onToggleMenuTypes(Menu_Item.Id)
                                      }
                                      color={
                                        globalStyle.g_appMainContentColors.color
                                      }
                                    />
                                  </View>
                                </Card>
                              </View>
                            ))}
                          </View>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <Text
                                  style={[
                                    styles.Menu_List_Header,
                                    globalStyle.g_appMainContentActiveBgColors,
                                  ]}>
                                  {mBItem.Title}
                                </Text>
                                <Text>{mBItem.Items.length} Of</Text>
                                <View style={styles.Menu_Items_List}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    {mBItem.Items.map(item => (
                                      <View key={item.Id}>
                                        <Card
                                          style={styles.Menu_Item_List_Card}>
                                          <View
                                            style={
                                              styles.Menu_Item_List_CardBody
                                            }>
                                            <Image
                                              source={item.ItemImage}
                                              style={styles.Menu_Item_Image}
                                            />
                                          </View>
                                          <Text style={[styles.Menu_Item_Name]}>
                                            {item.ItemName}
                                          </Text>
                                          <Text
                                            style={styles.Menu_Item_Desc}
                                            numberOfLines={2}
                                            textBreakStrategy="simple">
                                            {item.Decscription}
                                          </Text>
                                          <View
                                            style={
                                              styles.Menu_Item_Rating_AddBtn
                                            }>
                                            <View
                                              style={styles.Menu_Item_Rating}>
                                              <Text
                                                style={
                                                  styles.Menu_Item_Rating_Text
                                                }>
                                                {item.Rating}
                                              </Text>
                                              <AntIcons
                                                name="star"
                                                size={14}
                                                color="#f1c40f"
                                              />
                                            </View>
                                            <MaIcons
                                              name={
                                                isAdded === item.Id
                                                  ? 'minus-box'
                                                  : 'plus-box'
                                              }
                                              onPress={() =>
                                                handleAddRemove(item.Id)
                                              }
                                              size={20}
                                              color={
                                                isAdded === item.Id
                                                  ? '#FF6666'
                                                  : '#389590'
                                              }
                                            />
                                          </View>
                                        </Card>
                                      </View>
                                    ))}
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ))}
                          <TouchableOpacity style={[globalStyle.g_Button]}>
                            <Text style={[globalStyle.g_ButtonText]}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[globalStyle.g_Button]}
                            onPress={() => navigation.navigate('OrderSummary')}>
                            <Text style={[globalStyle.g_ButtonText]}>Next</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </Card>
                  ))}
                </ScrollView>
              </View>
            )}
            {activeFilter === 'Fifth Menu' && (
              <View style={styles.Menu_Types_Content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Card style={styles.ApplyForAllDates_Card}>
                    <View style={styles.ApplyForAllDates_CardBody}>
                      <Text>Apply For All Dates</Text>
                      <Switch
                        color={globalStyle.g_appDefaultTextColor.color}
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                      />
                    </View>
                  </Card>
                  <View style={styles.Veg_NonVeg_Container}>
                    {menuType.map(Menu_Item => (
                      <View key={Menu_Item.Id}>
                        <Card style={styles.Veg_NonVeg_Card}>
                          <View style={styles.Veg_NonVeg_Card_Content}>
                            <Text
                              style={[
                                styles.Veg_NonVeg_Text,
                                globalStyle.g_appDefaultTextColor,
                              ]}>
                              {Menu_Item.Name}
                            </Text>
                            <Switch
                              value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                              onValueChange={() =>
                                onToggleMenuTypes(Menu_Item.Id)
                              }
                              color={globalStyle.g_appMainContentColors.color}
                            />
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  {MenuTypes.map(mType_Item => (
                    <Card key={mType_Item.Id} style={styles.Menu_Types_Card}>
                      <View style={styles.Menu_Types_Card_Header}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                          }}>
                          <Text
                            style={[
                              styles.MenuType_Header,
                              globalStyle.g_appDefaultTextColor,
                            ]}
                            onPress={() => handleAccordions(mType_Item.Id)}>
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
                          <View style={styles.Veg_NonVeg_Container}>
                            {menuType.map(Menu_Item => (
                              <View key={Menu_Item.Id}>
                                <Card style={styles.Veg_NonVeg_Card}>
                                  <View style={styles.Veg_NonVeg_Card_Content}>
                                    <Text
                                      style={[
                                        styles.Veg_NonVeg_Text,
                                        globalStyle.g_appDefaultTextColor,
                                      ]}>
                                      {Menu_Item.Name}
                                    </Text>
                                    <Switch
                                      value={isMenuTypeOn === Menu_Item.Id} // Check if the switch is active
                                      onValueChange={() =>
                                        onToggleMenuTypes(Menu_Item.Id)
                                      }
                                      color={
                                        globalStyle.g_appMainContentColors.color
                                      }
                                    />
                                  </View>
                                </Card>
                              </View>
                            ))}
                          </View>
                          {BreakfastMenus.map(mBItem => (
                            <>
                              <View
                                key={mBItem.Id}
                                style={styles.Menu_List_Content}>
                                <Text
                                  style={[
                                    styles.Menu_List_Header,
                                    globalStyle.g_appMainContentActiveBgColors,
                                  ]}>
                                  {mBItem.Title}
                                </Text>
                                <Text>{mBItem.Items.length} Of</Text>
                                <View style={styles.Menu_Items_List}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    {mBItem.Items.map(item => (
                                      <View key={item.Id}>
                                        <Card
                                          style={styles.Menu_Item_List_Card}>
                                          <View
                                            style={
                                              styles.Menu_Item_List_CardBody
                                            }>
                                            <Image
                                              source={item.ItemImage}
                                              style={styles.Menu_Item_Image}
                                            />
                                          </View>
                                          <Text style={[styles.Menu_Item_Name]}>
                                            {item.ItemName}
                                          </Text>
                                          <Text
                                            style={styles.Menu_Item_Desc}
                                            numberOfLines={2}
                                            textBreakStrategy="simple">
                                            {item.Decscription}
                                          </Text>
                                          <View
                                            style={
                                              styles.Menu_Item_Rating_AddBtn
                                            }>
                                            <View
                                              style={styles.Menu_Item_Rating}>
                                              <Text
                                                style={
                                                  styles.Menu_Item_Rating_Text
                                                }>
                                                {item.Rating}
                                              </Text>
                                              <AntIcons
                                                name="star"
                                                size={14}
                                                color="#f1c40f"
                                              />
                                            </View>
                                            <MaIcons
                                              name={
                                                isAdded === item.Id
                                                  ? 'minus-box'
                                                  : 'plus-box'
                                              }
                                              onPress={() =>
                                                handleAddRemove(item.Id)
                                              }
                                              size={20}
                                              color={
                                                isAdded === item.Id
                                                  ? '#FF6666'
                                                  : '#389590'
                                              }
                                            />
                                          </View>
                                        </Card>
                                      </View>
                                    ))}
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ))}
                          <TouchableOpacity style={[globalStyle.g_Button]}>
                            <Text style={[globalStyle.g_ButtonText]}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[globalStyle.g_Button]}
                            onPress={() => navigation.navigate('OrderSummary')}>
                            <Text style={[globalStyle.g_ButtonText]}>Next</Text>
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
      {showCategories && <Footer />}
      {showMenus && (
        <TouchableOpacity
          style={styles.Pay_Buttons}
          // handleShowDates
          onPress={() => navigation.navigate('OrderSummary')}>
          <Text
            style={[
              styles.Pay_Buttons_Text,
              globalStyle.g_appDefaultTextColor,
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
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
    marginBottom: 20,
  },
  Menu_Types_Card_Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MenuType_Header: {
    fontWeight: 'bold',
  },

  //Menu Type Selection
  Veg_NonVeg_Container: {
    marginTop: 5,
    marginBottom: 10,
  },
  Veg_NonVeg_Card: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 5,
  },
  Veg_NonVeg_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  Veg_NonVeg_Text: {
    fontSize: 10,
    fontWeight: 'bold',
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
  Menu_List_Header_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  Menu_List_Selected_Count: {
    marginTop: '10%',
    backgroundColor: '#d5f5e3',
    padding: 5,
    width: 70,
    textAlign: 'center',
    borderRadius: 10,
    color: '#27ae60',
    fontWeight: '900',
  },
  Menu_List_Header: {
    color: '#ffff',
    fontWeight: 'bold',
    borderRadius: 50,
    fontSize: 15,
    marginTop: '10%',
    backgroundColor: '',
    width: 120,
    textAlign: 'center',
    padding: 5,
  },
  Menu_List_Header_Tag: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  Menu_Items_List: {
    marginTop: 10,
  },
  Menu_Item_List_Card: {
    padding: 10,
    marginLeft: 2,
    marginTop: 2,
    marginRight: 10,
    marginBottom: 10,
    width: 140,
    backgroundColor: '#ffff',
    borderRadius: 10,
    borderColor: '#cccc',
    borderWidth: 0.5,
  },
  Menu_Item_List_CardBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Menu_Item_Image: {
    width: 130,
    height: 120,
  },
  Menu_Item_Name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#292929',
  },
  Menu_Item_Rating_AddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Menu_Item_Rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  Menu_Item_Rating_Text: {
    fontWeight: 'bold',
    color: '#272727',
  },
  Menu_Item_Desc: {
    marginTop: 5,
    fontWeight: 'bold',
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

  //Card
  ApplyForAllDates_Card: {
    margin: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffff',
    marginBottom: 0,
  },
  ApplyForAllDates_CardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

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

  Crowed_Cost_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  Cost_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  
  //Buttons
  Veg_NonVeg_Container: {
    margin: 5,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  Select_Type_Text: {
    fontSize: 15,
    margin: 15,
    marginBottom: 0,
    color:'#000'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginHorizontal: 5,
  },
  activeVeg: {
    backgroundColor: '#ffff',
    borderColor: 'green',
  },
  activeNonVeg: {
    backgroundColor: '#ffff',
    borderColor: 'red',
  },
  inactive: {
    backgroundColor: '#f2f2f2',
  },
  text: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 12,
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
export default Menus;
