import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from './Footer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  List,
  Checkbox,
  Switch,
  Card,
  Icon,
  RadioButton,
} from 'react-native-paper';

import Slider from '@react-native-community/slider';
import {Image} from 'react-native';

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

const FoodSession = () => {
  const navigation = useNavigation();
  //content
  const [showMainContent, setShowMainContent] = useState(true);
  const [showAllocation, setShowAllocation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [activeId, setActiveId] = useState(1);

  const [activeDate, setActiveDate] = useState('24 Aug 2024');
  const [expanded, setExpanded] = React.useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const [checked, setChecked] = React.useState(false);
  const [radioChecked, setRadioChecked] = React.useState('');
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const handleAccordions = () => setExpanded(!expanded);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const unCheck = () => {
    setChecked(false);
  };

  const handleItemPress = item => {
    setActiveDate(item.Dates);
  };

  const handleShowCaterAllocation = () => {
    setShowMainContent(false);
    setShowAllocation(true);
  };
  const handleRadioButtonPress = value => {
    setRadioChecked(value);
    setShowAllocation(false);
    setShowFilter(value === 'first'); // Show filter content only if 'second' is selected
  };

  const handleBackPress = () => {
    if (showFilter) {
      setShowFilter(false);
      setShowAllocation(true);
    } else if (showAllocation) {
      setShowAllocation(false);
      setShowMainContent(true);
    } else if (showMainContent) {
      navigation.navigate('BookCateres'); // Replace with your target page
    }
  };
  return (
    <View style={styles.FS_Container}>
      <View style={styles.FS_Header_Container}>
        <View style={styles.Fs_Header_Icons}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={24} color="#ffff" />
          </TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={15}
            color="#ffff"
            style={{
              backgroundColor: '#7DC67F',
              borderRadius: 100,
              padding: 5,
              width: 25,
            }}
          />
        </View>
        {showMainContent && (
          <Text style={styles.FS_Header_Text}>Food Session</Text>
        )}
        {showAllocation && (
          <Text style={styles.FS_Header_Text}>Cater Allocation</Text>
        )}
        {showFilter && (
          <Text style={styles.FS_Header_Text}>Selection Criteria </Text>
        )}
      </View>
      <View style={styles.FS_Content}>
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
                      activeDate === Fs_Item.Dates && {
                        borderBottomColor: '#5CB35E',
                        borderBottomWidth: 2,
                      },
                    ]}
                    onPress={() => handleItemPress(Fs_Item)}>
                    <Text style={styles.FS_DateItemText}>{Fs_Item.Dates}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.Fs_Items_Count}>
              {FsSelectedItems.map(FsCountItem => {
                let iconColor;
                let iconBgColor;
                switch (FsCountItem.Id) {
                  case 1:
                    iconColor = '#e74c3c';
                    iconBgColor = '#fdedec';
                    break;
                  case 2:
                    iconColor = '#1abc9c';
                    iconBgColor = '#e8f8f5';
                    break;
                  case 3:
                    iconColor = '#dc7633';
                    iconBgColor = '#fbeee6';
                    break;
                  default:
                    iconColor = 'black';
                }

                return (
                  <Card key={FsCountItem.Id} style={styles.Fs_CountCard}>
                    <MaIcons
                      name={FsCountItem.Icon}
                      size={15}
                      color={iconColor}
                      style={{
                        backgroundColor: iconBgColor,
                        width: 35,
                        padding: 10,
                        borderRadius: 100,
                      }}
                    />
                    <Text style={styles.Fs_Count_Num}>
                      {FsCountItem.noOfItems}
                    </Text>
                    <Text>{FsCountItem.name}</Text>
                  </Card>
                );
              })}
            </View>
            {activeDate === '24 Aug 2024' && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {FsAccordions.map(FsaItem => (
                  <View key={FsaItem.Id}>
                    <Card style={styles.FS_Accordion}>
                      <View style={styles.Fsa_Header_Content}>
                        <Text
                          style={styles.Fsa_Header_Text}
                          onPress={handleAccordions}>
                          {FsaItem.name}
                        </Text>
                        <View style={styles.Fsa_Header_Icons}>
                          <Ionicons
                            size={15}
                            color="#5CB35E"
                            name={expanded ? 'chevron-up' : 'chevron-down'}
                            onPress={handleAccordions}
                          />
                          <Switch
                            value={isSwitchOn}
                            onValueChange={onToggleSwitch}
                            color="#FF9800"
                          />
                        </View>
                      </View>
                    </Card>
                    {expanded && (
                      <View style={styles.Fsa_Content}>
                        <Text style={styles.Fsa_ValueText}>
                          Crowd Size: {sliderValue}
                        </Text>
                        <View style={styles.Fsa_Quantity}>
                          <Slider
                            style={{width: '100%', height: 40}}
                            minimumValue={0}
                            maximumValue={1000}
                            minimumTrackTintColor="#5CB35E"
                            maximumTrackTintColor="#FF9800"
                            value={sliderValue}
                            onValueChange={value => setSliderValue(value)}
                            step={1}
                          />
                        </View>
                        {FsaItem.Items.map(item => (
                          <View key={item.Id} style={styles.Fsa_Items_Content}>
                            <View style={styles.Fsa_Items}>
                              <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                  setChecked(!checked);
                                }}
                                color="#5CB35E"
                              />
                              <Text>{item.BType}</Text>
                            </View>
                            {checked && (
                              <Ionicons
                                name="close"
                                size={20}
                                color="#D9D9D9"
                                onPress={unCheck}
                              />
                            )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.Fs_Save_Btn}
                  onPress={handleShowCaterAllocation}>
                  <Text style={styles.Fs_Save_Btn_Text}>Save</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </>
        )}
        {showAllocation && (
          <View style={styles.Ca_Content}>
            <View style={styles.Ca_Image_Content}>
              <Image
                source={require('../assets/Updated/images/CaterAllocation.jpg')}
                style={styles.Ca_Image}
              />
            </View>
            <View style={{marginTop: '10%'}}>
              <Card style={styles.Ca_Card}>
                <View style={styles.Ca_Card_Content}>
                  <RadioButton
                    value="first"
                    status={radioChecked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('first')}
                  />
                  <Text style={styles.Ca_Card_Title}>Auto Assign</Text>
                </View>
              </Card>
              <Card style={styles.Ca_Card}>
                <View style={styles.Ca_Card_Content}>
                  <RadioButton
                    value="first"
                    status={radioChecked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setRadioChecked('first')}
                  />
                  <Text style={styles.Ca_Card_Title}>Let Me Select</Text>
                </View>
              </Card>
            </View>
          </View>
        )}
        {showFilter && (
          <View style={styles.FsFilterContent}>
            <View style={styles.FsFilter_Content}>
              <Text style={styles.FsFilterHeader}>Price</Text>
              <View style={styles.Fs_FilterItem_Content}>
                {FaSearchBy.map(Fs_SearchItem => (
                  <Card
                    key={Fs_SearchItem.Id}
                    style={[
                      styles.Fs_Search_Item,
                      activeId === Fs_SearchItem.Id && styles.activeItem,
                    ]}
                    onPress={() => setActiveId(Fs_SearchItem.Id)}>
                    <Text
                      style={[
                        styles.Fs_Filter_Text,
                        activeId === Fs_SearchItem.Id && styles.activeText,
                      ]}>
                      {Fs_SearchItem.Name}
                    </Text>
                  </Card>
                ))}
              </View>
            </View>
            <View style={styles.FsFilter_Content}>
              <Text style={styles.FsFilterHeader}>Rating</Text>
              <View style={styles.Fs_FilterItem_Content}>
                {FaRatingBy.map(Fs_RatingItem => (
                  <Card
                    key={Fs_RatingItem.Id}
                    style={[
                      styles.Fs_Rating_Item,
                      activeId === Fs_RatingItem.Id && styles.activeItem,
                    ]}
                    onPress={() => setActiveId(Fs_RatingItem.Id)}>
                    <Text
                      style={[
                        styles.Fs_Filter_Text,
                        activeId === Fs_RatingItem.Id && styles.activeText,
                      ]}>
                      {Fs_RatingItem.Rating}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      {Array(Fs_RatingItem.Rating)
                        .fill()
                        .map((_, i) => (
                          <Ionicons
                            key={i}
                            name={Fs_RatingItem.Icon}
                            size={10}
                            color="gold"
                          />
                        ))}
                    </View>
                  </Card>
                ))}
              </View>
            </View>
            <View style={styles.FsFilter_Content}>
              <Text style={styles.FsFilterHeader}>Distance</Text>
              <View style={styles.Fs_FilterItem_Content}>
                {FaDistanceBy.map(Fs_DistanceItem => (
                  <Card
                    key={Fs_DistanceItem.Id}
                    style={[
                      styles.Fs_Distance_Item,
                      activeId === Fs_DistanceItem.Id && styles.activeItem,
                    ]}
                    onPress={() => setActiveId(Fs_DistanceItem.Id)}>
                    <Text
                      style={[
                        styles.Fs_Filter_Text,
                        activeId === Fs_DistanceItem.Id && styles.activeText,
                      ]}>
                      {Fs_DistanceItem.Name}
                    </Text>
                  </Card>
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.Search_Btn}>
              <Text style={styles.Search_Btn_Text}>Search</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  FS_Container: {
    backgroundColor: '#5CB35E',
    width: '100%',
    height: '100%',
  },
  //header
  FS_Header_Container: {
    padding: 15,
  },
  FS_Header_Text: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: '5%',
  },
  Fs_Header_Icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //Main section
  FS_Content: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: '10%',
  },
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
    margin: 15,
  },
  FS_DateItemText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 3,
  },

  //Accordians
  FS_Accordion: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 10,
    padding: 15,
    marginTop: '5%',
  },
  Fsa_Header_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Fsa_Header_Text: {
    color: '#5CB35E',
    fontWeight: '900',
    fontSize: 12,
  },
  Fsa_Header_Icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // count
  Fs_Items_Count: {
    display: 'flex',
    flexDirection: 'row',
    margin: '3%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Fs_CountCard: {
    padding: 10,
    width: 100,
    backgroundColor: '#ffff',
  },
  Fs_Count_Num: {
    fontSize: 15,
    marginTop: '3%',
    fontWeight: 'bold',
    color: '#272727',
  },
  //Fsa_Content
  Fsa_Content: {
    margin: '5%',
  },
  Fsa_Items_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  //Save Btn
  Fs_Save_Btn: {
    backgroundColor: '#fcf3cf',
    padding: 10,
    margin: '2%',
    borderRadius: 10,
  },
  Fs_Save_Btn_Text: {
    fontSize: 15,
    color: '#FF9800',
    fontWeight: '900',
    textAlign: 'center',
  },

  // Cater Allocation
  Ca_Content: {},
  Ca_Image_Content: {
    width: '100%',
    height: '50%',
  },
  Ca_Image: {
    width: '100%',
    height: '100%',
  },
  Ca_Card: {
    margin: '3%',
  },
  Ca_Card_Content: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  Ca_Card_Title: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  //Filters
  FsFilter_Content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15%',
  },
  Fs_FilterItem_Content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  FsFilterHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: '5%',
  },
  Fs_Search_Item: {
    backgroundColor: '#ffff',
    borderRadius: 0,
    padding: 10,
    width: '30%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 0.1,
  },
  Fs_Rating_Item: {
    backgroundColor: '#ffff',
    borderRadius: 0,
    padding: 10,
    width: '25%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 0.1,
    verticalAlign: 'middle',
    flexDirection: 'column',
  },
  Fs_Distance_Item: {
    backgroundColor: '#ffff',
    borderRadius: 0,
    padding: 10,
    width: '25%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 0.1,
  },
  Fs_Filter_Text: {
    fontWeight: 'bold',
    color: '#272727',
    textAlign: 'center',
  },
  Search_Btn: {
    backgroundColor: '#fcf3cf',
    padding: 10,
    margin: '2%',
    borderRadius: 10,
  },
  Search_Btn_Text: {
    fontSize: 15,
    color: '#FF9800',
    fontWeight: '900',
    textAlign: 'center',
  },

  //Acitve
  activeItem: {
    backgroundColor: '#5CB35D',
  },
  activeText: {
    color: '#ffff',
  },
});

export default FoodSession;
