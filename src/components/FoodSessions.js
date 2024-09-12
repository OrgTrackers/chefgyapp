import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from './Footer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';

import {Switch, Card} from 'react-native-paper';

import Slider from '@react-native-community/slider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RangeSlider from 'react-native-range-slider';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

//Global Styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import {Fonts} from '../assets/styles/Fonts';

const FsDates = [
  {
    Id: 1,
    Dates: '24 Aug 2024',
  },
  {
    Id: 2,
    Dates: '25 Aug 2024',
  },
  {
    Id: 3,
    Dates: '26 Aug 2024',
  },
  {
    Id: 4,
    Dates: '27 Aug 2024',
  },
  {
    Id: 5,
    Dates: '28 Aug 2024',
  },
  {
    Id: 6,
    Dates: '29 Aug 2024',
  },
  {
    Id: 7,
    Dates: '30 Aug 2024',
  },
];

const FsAccordions = [
  {
    Id: 1,
    name: 'Breakfast',
    Items: [
      {Id: 1, BType: 'Pancakes'},
      {Id: 2, BType: 'Omelette'},
      {Id: 3, BType: 'French Toast'},
      {Id: 4, BType: 'Waffles'},
      {Id: 5, BType: 'Cereal'},
      {Id: 6, BType: 'Bagel'},
      {Id: 7, BType: 'Smoothie'},
      {Id: 8, BType: 'Muffin'},
      {Id: 9, BType: 'Yogurt'},
      {Id: 10, BType: 'Fruit Salad'},
    ],
  },
  {
    Id: 2,
    name: 'Lunch',
    Items: [
      {Id: 1, BType: 'Pancakes'},
      {Id: 2, BType: 'Omelette'},
      {Id: 3, BType: 'French Toast'},
      {Id: 4, BType: 'Waffles'},
      {Id: 5, BType: 'Cereal'},
      {Id: 6, BType: 'Bagel'},
      {Id: 7, BType: 'Smoothie'},
      {Id: 8, BType: 'Muffin'},
      {Id: 9, BType: 'Yogurt'},
      {Id: 10, BType: 'Fruit Salad'},
    ],
  },
  {
    Id: 3,
    name: 'Dinner',
    Items: [
      {Id: 1, BType: 'Pancakes'},
      {Id: 2, BType: 'Omelette'},
      {Id: 3, BType: 'French Toast'},
      {Id: 4, BType: 'Waffles'},
      {Id: 5, BType: 'Cereal'},
      {Id: 6, BType: 'Bagel'},
      {Id: 7, BType: 'Smoothie'},
      {Id: 8, BType: 'Muffin'},
      {Id: 9, BType: 'Yogurt'},
      {Id: 10, BType: 'Fruit Salad'},
    ],
  },
];

const FsSelectedItems = [
  {
    Id: 1,
    Icon: 'food-apple',
    name: 'Breakfast',
    noOfItems: 10,
  },
  {
    Id: 2,
    Icon: 'food',
    name: 'Lunch',
    noOfItems: 20,
  },
  {
    Id: 3,
    Icon: 'food-turkey',
    name: 'Dinner',
    noOfItems: 30,
  },
];
const FaSearchBy = [
  {
    Id: 1,
    Name: 'All',
  },
  {
    Id: 2,
    Name: 'Lowest Price',
  },
  {
    Id: 3,
    Name: 'Highest Price',
  },
];
const FaRatingBy = [
  {
    Id: 1,
    Rating: 'All',
  },
  {
    Id: 2,
    Rating: 2,
    Icon: 'star',
  },
  {
    Id: 3,
    Rating: 3,
    Icon: 'star',
  },
  {
    Id: 4,
    Rating: 4,
    Icon: 'star',
  },
];
const FaDistanceBy = [
  {
    Id: 1,
    Name: 'All',
  },
  {
    Id: 2,
    Name: '<5 KM',
  },
  {
    Id: 3,
    Name: '<30 KM',
  },
  {
    Id: 4,
    Name: 'City Limits',
  },
];
const CatersList = [
  {
    Id: 1,
    cName: 'Cater-1',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 2,
    cName: 'Cater-2',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 3,
    cName: 'Cater-3',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 4,
    cName: 'Cater-4',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 5,
    cName: 'Cater-5',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 6,
    cName: 'Cater-6',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 7,
    cName: 'Cater-7',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 8,
    cName: 'Cater-8',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 9,
    cName: 'Cater-9',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
  {
    Id: 10,
    cName: 'Cater-10',
    cPrice: 'Low',
    cRating: '4',
    cIcon: 'star',
    cDistance: '<5km',
    Img: require('../assets/images/homeCaters/Home_Img_1.png'),
  },
];

const FoodSession = () => {
  const navigation = useNavigation();

  const [showMainContent, setShowMainContent] = useState(true);
  const [sliderValue, setSliderValue] = useState([0, 1000]);

  const [activeDate, setActiveDate] = useState('24 Aug 2024');
  const [expanded, setExpanded] = React.useState(1);

  const [checked, setChecked] = React.useState([]);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const [multiSliderValue, setMultiSliderValue] = useState([20, 80]);
  const [minValue, setMinValue] = useState(multiSliderValue[0].toString());
  const [maxValue, setMaxValue] = useState(multiSliderValue[1].toString());

  const multiSliderValuesChange = values => {
    setMultiSliderValue(values);
    setMinValue(values[0].toString());
    setMaxValue(values[1].toString());
  };

  const handleMinValueChange = value => {
    const min = parseInt(value) || 0;
    setMinValue(value);
    setMultiSliderValue([min, multiSliderValue[1]]);
  };

  const handleMaxValueChange = value => {
    const max = parseInt(value) || 100;
    setMaxValue(value);
    setMultiSliderValue([multiSliderValue[0], max]);
  };

  const handleSliderChange = values => {
    setSliderValue(values);
  };

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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

  const handleItemPress = item => {
    setActiveDate(item.Dates);
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={[globalStyle.g_appPageHeaderIconsContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate('BookCateres')}>
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
        {showMainContent && (
          <Text style={[globalStyle.g_appPageHeaderText]}>Food Session</Text>
        )}
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        {showMainContent && (
          <>
            <Text style={styles.FS_Selected_Dates}>
              24 Aug 2024
              <Text style={{color: '#292929'}}> To </Text>
              30 Aug 2024
            </Text>
            <View style={styles.FS_Filters}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {FsDates.map((Fs_Item, Fs_Index) => (
                  <TouchableOpacity
                    key={Fs_Index}
                    style={[
                      styles.FS_DateItem,
                      activeDate === Fs_Item.Dates &&
                        globalStyle.g_appMainContentActiveTabsBg,
                    ]}
                    onPress={() => handleItemPress(Fs_Item)}>
                    <Text
                      style={[
                        globalStyle.g_appMainContentTabs,
                        activeDate === Fs_Item.Dates &&
                          globalStyle.g_appMainContentActiveTabsText,
                      ]}>
                      {Fs_Item.Dates}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {activeDate === '24 Aug 2024' && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {FsAccordions.map(FsaItem => (
                  <View key={FsaItem.Id}>
                    <Card
                      style={[
                        globalStyle.g_appMainContentAccordion,
                        styles.FS_Accordion,
                      ]}>
                      <View
                        style={[globalStyle.g_appMainContentAccordionHeader]}>
                        <Text
                          style={[
                            globalStyle.g_appMainContentAccordionHeaderColorsSizes,
                          ]}
                          onPress={handleAccordions}>
                          {FsaItem.name}
                        </Text>

                        <Ionicons
                          size={15}
                          color={globalStyle.g_appMainContentColors.color}
                          name={
                            expanded === FsaItem.Id
                              ? 'chevron-up'
                              : 'chevron-down'
                          }
                          onPress={() => handleAccordions(FsaItem.Id)}
                        />
                      </View>
                    </Card>
                    {expanded === FsaItem.Id && (
                      <View style={styles.Fsa_Content}>
                        <View style={styles.Required_Switch}>
                          <Text style={styles.Required_Switch_Text}>
                            Needed ?
                          </Text>
                          <Switch
                            value={isSwitchOn}
                            onValueChange={onToggleSwitch}
                            color={globalStyle.g_appMainContentColors.color}
                          />
                        </View>
                        <Text style={styles.Fsa_ValueText}>
                          Price Range : {sliderValue[0]} - {sliderValue[1]}
                        </Text>
                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={minValue}
                            onChangeText={handleMinValueChange}
                          />
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={maxValue}
                            onChangeText={handleMaxValueChange}
                          />
                        </View>
                        <View style={styles.Fsa_Quantity}>
                          <MultiSlider
                            markerStyle={{
                              height: 60,
                              width: 60,
                              borderRadius: 30,
                              backgroundColor: 'transparent', // Transparent background to use images as markers
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            customMarker={() => (
                              <Image
                                source={require('../assets/Updated/images/OrderSummary.jpg')}
                                style={styles.attendeeImage}
                              />
                            )}
                            pressedMarkerStyle={{
                              ...Platform.select({
                                android: {
                                  height: 60,
                                  width: 60,
                                  borderRadius: 30,
                                  backgroundColor: 'transparent',
                                },
                              }),
                            }}
                            selectedStyle={{
                              backgroundColor: '#1792E8',
                            }}
                            trackStyle={{
                              backgroundColor: '#CECECE',
                            }}
                            touchDimensions={{
                              height: 60,
                              width: 60,
                              borderRadius: 30,
                              slipDisplacement: 60,
                            }}
                            values={[multiSliderValue[0], multiSliderValue[1]]}
                            sliderLength={280}
                            onValuesChange={multiSliderValuesChange}
                            min={0}
                            max={100}
                            allowOverlap={false}
                            minMarkerOverlapDistance={10}
                          />
                        </View>
                        {FsaItem.Items.map(item => (
                          <View key={item.Id} style={styles.Fsa_Items_Content}>
                            <View style={styles.Fsa_Items}>
                              <BouncyCheckbox
                                isChecked={checked.includes(item.Id)}
                                onPress={() => handleCheck(item.Id)}
                                fillColor={
                                  globalStyle.g_appMainContentColors.color
                                }
                                size={
                                  globalStyle.g_appMainContentChexBoxSize
                                    .fontSize
                                }
                                style={[
                                  globalStyle.g_appMainContentChexBoxSize,
                                ]}
                              />
                              <Text>{item.BType}</Text>
                            </View>
                            {checked.includes(item.Id) && (
                              <Ionicons
                                name="close"
                                size={20}
                                color="#D9D9D9"
                                onPress={() => unCheck(item.Id)}
                              />
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  style={[globalStyle.g_Button]}
                  onPress={() => navigation.navigate('Menus')}>
                  <Text style={[globalStyle.g_ButtonText]}>Search</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  FS_Selected_Dates: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#767676',
  },

  //filters
  FS_Filters: {
    borderTopColor: '#cccc',
    borderTopWidth: 0.5,
    borderBottomColor: '#cccc',
    borderBottomWidth: 0.5,
    marginTop: '5%',
    marginBottom: '5%',
  },
  FS_DateItem: {
    margin: 10,
  },
  FS_DateItemText: {
    paddingBottom: 3,
  },

  //Accordians
  FS_Accordion: {
    margin: '2%',
    marginTop: '5%',
  },

  //Fsa_Content
  Fsa_Content: {
    margin: '5%',
  },
  Fsa_Items_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  Fsa_Items: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  Fsa_ValueText: {
    textAlign: 'center',
    color: '#272727',
    fontWeight: 'bold',
  },

  //check box
  checkbox: {
    width: 24,
    height: 24,
  },

  Required_Switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 10,
  },
  Required_Switch_Text: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  attendeeImage: {
    height: 30,
    width: 30,
    borderRadius: 25, // Make the image round
    borderWidth: 2,
    borderColor: '#1792E8',
  },
});

export default FoodSession;
