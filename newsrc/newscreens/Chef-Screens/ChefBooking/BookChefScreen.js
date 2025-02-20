import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import { BookChefStyles } from './BookChefScreen.styles';
import { GlobalCss } from '../../../newassets/GlobalStyles/GlobalCss.styles';
import {Card, Modal, Portal, Button, Switch} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Slider from '@react-native-community/slider';

import {
  Leaf,
  Beef,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Star,
  List,
} from 'lucide-react-native';

const Cater_Type = [
  {
    Id: 1,
    Icon: 'food-apple',
    name: 'Breakfast',
  },
  {
    Id: 2,
    Icon: 'food',
    name: 'Lunch',
  },
  {
    Id: 3,
    Icon: 'food-turkey',
    name: 'Dinner',
  },
];

const Filters = [
  {
    Id: 1,
    Title: 'Price',
    FilterBy: [
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
    ],
  },
  {
    Id: 2,
    Title: 'Caterer distance under?',
    FilterBy: [
      {
        Id: 1,
        Distance: 'All',
      },
      {
        Id: 2,
        Distance: '<5 KM',
      },
      {
        Id: 3,
        Distance: '<30 KM',
      },
      {
        Id: 4,
        Distance: 'City Limits',
      },
    ],
  },
  {
    Id: 3,
    Title: 'Rating',
    FilterBy: [
      {
        Id: 1,
        Rating: 'All',
      },
      {
        Id: 2,
        Rating: '1',
        Icon: 'star',
      },
      {
        Id: 3,
        Rating: '2',
        Icon: 'star',
      },
      {
        Id: 4,
        Rating: '3',
        Icon: 'star',
      },
      {
        Id: 5,
        Rating: '4',
        Icon: 'star',
      },
    ],
  },
];

const menuType = [
  {
    Id: 1,
    Name: 'All',
  },
  {
    Id: 2,
    Name: 'Veg',
  },
  {
    Id: 3,
    Name: 'Non-Veg',
  },
];

const BookChefScreen = () => {
  const navigation = useNavigation();
  const [selectedTypeId, setSelectedTypeId] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFromDate, setIsFromDate] = useState(true);
  const [minValue, setMinValue] = useState(10);
  const [rating, setRating] = useState(null);
  const [activeSortButton, setActiveSortButton] = useState('lowToHigh');
  const [selectedFilters, setSelectedFilters] = useState({
    1: 1, // Initially select 'All' for Price
    2: 1, // Initially select 'All' for Distance
    3: 1, // Initially select 'All' for Rating
  });

  const [isMenuTypeOn, setIsMenuTypeOn] = React.useState(null);

  const [filterVeg, setFilterVeg] = useState(null);
  const [menuType, setMenuType] = useState({
    all: true,
    veg: false,
    nonVeg: false,
  });

  const [activeSort, setActiveSort] = useState({});

  const SORT_OPTIONS = [
    {
      id: 'price',
      label: 'Price',
      icon: DollarSign,
      color: '#FEC6A1',
      options: ['Low to High', 'High to Low'],
    },
    {
      id: 'distance',
      label: 'Distance',
      icon: MapPin,
      color: '#D3E4FD',
      options: ['Nearest', '< 5km', '< 10km'],
    },
    {
      id: 'rating',
      label: 'Rating',
      icon: Star,
      color: '#FEF7CD',
      options: ['4+ Stars', '3+ Stars', 'All'],
    },
  ];

  const onToggleMenuTypes = id => {
    if (isMenuTypeOn === id) {
      setIsMenuTypeOn(null); // Deselect if clicked again
    } else {
      setIsMenuTypeOn(id); // Set the clicked switch as active
    }
  };

  const handleDateChange = day => {
    const FormatDate = day.dateString;
    if (isFromDate) {
      setStartDate(FormatDate);
    } else {
      setEndDate(FormatDate);
    }
    setShowModal(false);
  };

  const openModal = inputType => {
    setActiveInput(inputType);
    setShowModal(true);
  };

  const handleMenuSelection = type => {
    if (type === 'all') {
      setMenuType({all: true, veg: false, nonVeg: false});
      setFilterVeg(null);
    } else if (type === 'veg') {
      setMenuType({all: false, veg: true, nonVeg: false});
      setFilterVeg(true);
    } else if (type === 'nonVeg') {
      setMenuType({all: false, veg: false, nonVeg: true});
      setFilterVeg(false);
    }
  };

  const selectTypes = typeId => {
    if (selectedTypeId.includes(typeId)) {
      // If the card is already selected, unselect it
      setSelectedTypeId(
        selectedTypeId.filter(selectedId => selectedId !== typeId),
      );
    } else {
      // Otherwise, add it to the selected list
      setSelectedTypeId([...selectedTypeId, typeId]);
    }
  };

  // Function to handle filter selection
  const handleFilterSelect = (filterId, categoryId) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [categoryId]: filterId, // Update the selected filter for the category
    }));
  };

  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity
          style={BookChefStyles.HeaderContent}
          onPress={() => navigation.navigate('ChefEventsScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={BookChefStyles.PageName}>Book Chef</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={GlobalCss.MainContainer} showsVerticalScrollIndicator={false}>
        <View style={BookChefStyles.BC_Date_Calendar_Container}>
          <View style={BookChefStyles.BC_Dates_Content}>
            <Text style={[GlobalCss.g_SideHeaders]}>
              When do you want this service ?
            </Text>
            <View style={BookChefStyles.BC_Date_Inputs}>
              <TouchableOpacity
                onPress={() => {
                  setIsFromDate(true);
                  setShowModal(true);
                }}
                style={[BookChefStyles.BC_Date_Input, GlobalCss.g_Inputs]}>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholderTextColor="#d9d9d9"
                  placeholder="From Date"
                  value={startDate}
                  style={{color: startDate ? '#000000' : '#d9d9d9'}} // Black text when date is entered
                  editable={false} // Prevent manual editing
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsFromDate(false);
                  setShowModal(true);
                }}
                style={[BookChefStyles.BC_Date_Input, GlobalCss.g_Inputs]}>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholderTextColor="#d9d9d9"
                  placeholder="To Date"
                  value={endDate}
                  style={{color: endDate ? '#000000' : '#d9d9d9'}} // Black text when date is entered
                  editable={false} // Prevent manual editing
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={BookChefStyles.BC_MenuType_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Menu Type</Text>
          <View style={BookChefStyles.Veg_NonVeg_Btns}>
            {/* All Button */}
            <TouchableOpacity
              style={[
                BookChefStyles.toggleButton,
                menuType.all && BookChefStyles.toggleButtonActive,
              ]}
              onPress={() => handleMenuSelection('all')}>
              <List size={16} color={menuType.all ? '#fff' : '#000'} />
              <Text
                style={
                  menuType.all
                    ? BookChefStyles.toggleTextActive
                    : BookChefStyles.toggleText
                }>
                All
              </Text>
            </TouchableOpacity>

            {/* Veg Button */}
            <TouchableOpacity
              style={[
                BookChefStyles.toggleButton,
                menuType.veg && BookChefStyles.toggleVegButtonActive,
              ]}
              onPress={() => handleMenuSelection('veg')}>
              <Leaf size={16} color={menuType.veg ? '#fff' : '#000'} />
              <Text
                style={
                  menuType.veg
                    ? BookChefStyles.toggleTextActive
                    : BookChefStyles.toggleText
                }>
                Veg
              </Text>
            </TouchableOpacity>

            {/* Non-Veg Button */}
            <TouchableOpacity
              style={[
                BookChefStyles.toggleButton,
                menuType.nonVeg && BookChefStyles.toggleNonVegButtonActive,
              ]}
              onPress={() => handleMenuSelection('nonVeg')}>
              <Beef size={16} color={menuType.nonVeg ? '#fff' : '#000'} />
              <Text
                style={
                  menuType.nonVeg
                    ? BookChefStyles.toggleTextActive
                    : BookChefStyles.toggleText
                }>
                Non-Veg
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={BookChefStyles.BC_Types_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Type of Meals</Text>
          <View style={BookChefStyles.BC_Type_Cards_Container}>
            {Cater_Type.map(ItemType => (
              <Card
                key={ItemType.Id}
                style={[
                  BookChefStyles.BC_Type_Cards,
                  selectedTypeId.includes(ItemType.Id) &&
                  BookChefStyles.selectedCard,
                ]}
                onPress={() => selectTypes(ItemType.Id)}>
                <MCIcons
                  name={ItemType.Icon}
                  size={20}
                  color={
                    selectedTypeId.includes(ItemType.Id) ? '#FA3B3D' : '#000'
                  }
                />
                <Text
                  style={[
                    BookChefStyles.BC_Type_Name,
                    GlobalCss.ThemeColor.color,
                    selectedTypeId.includes(ItemType.Id) &&
                    BookChefStyles.selectedText,
                  ]}>
                  {ItemType.name}
                </Text>
              </Card>
            ))}
          </View>
        </View>
        <View style={BookChefStyles.BC_Distance_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Distance</Text>
          <View style={BookChefStyles.SliderContainer}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={10}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="green"
              maximumTrackTintColor={GlobalCss.ThemeColor.color}
              value={minValue}
              onValueChange={value => setMinValue(value)}
            />
          </View>
          <Text style={BookChefStyles.Distance_Text}>
            Selected Distance: {minValue} km
          </Text>
        </View>
        <View style={BookChefStyles.Bc_Rating_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Rating</Text>
          <View style={BookChefStyles.BC_Rating_Stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() =>
                  setRating(prev => (prev === star ? null : star))
                }>
                <MCIcons
                  name={rating >= star ? 'star' : 'star-outline'}
                  size={25}
                  color={rating >= star ? 'gold' : '#ddd'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={BookChefStyles.BC_Sorting_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Sort by </Text>
          <View style={BookChefStyles.BC_Sorting_Buttons}>
            <TouchableOpacity
              style={[
                BookChefStyles.Sort_Botton,
                activeSortButton === 'lowToHigh' &&
                BookChefStyles.Sort_Botton_Active,
              ]}
              onPress={() => setActiveSortButton('lowToHigh')}>
              <Text
                style={[
                  BookChefStyles.Sort_Botton_Text,
                  activeSortButton === 'lowToHigh' &&
                  BookChefStyles.Sort_Botton_Active_Text,
                ]}>
                Price: Low To High
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                BookChefStyles.Sort_Botton,
                activeSortButton === 'highToLow' &&
                BookChefStyles.Sort_Botton_Active,
              ]}
              onPress={() => setActiveSortButton('highToLow')}>
              <Text
                style={[
                  BookChefStyles.Sort_Botton_Text,
                  activeSortButton === 'highToLow' &&
                  BookChefStyles.Sort_Botton_Active_Text,
                ]}>
                Price: High To Low
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* React Native Paper Modal */}
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={BookChefStyles.modalContainer}>
          <View style={{height: 350}}>
            <Calendar
              onDayPress={handleDateChange}
              minDate={new Date().toISOString().split('T')[0]}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: 'blue', // Background color for the selected date
                  textColor: 'white', // Text color for the selected date
                  customStyles: {
                    container: {
                      backgroundColor: 'blue', // Blue rounded background
                      borderRadius: 50, // Ensure the shape is circular
                    },
                    text: {
                      color: 'white', // Text color
                      fontWeight: 'bold',
                    },
                  },
                },
              }}
              theme={{
                todayTextColor: 'blue',
                arrowColor: 'blue',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
        </Modal>
      </Portal>
      <View style={GlobalCss.FooterContainer}>
        <View style={BookChefStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              BookChefStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => navigation.navigate('ChefFoodSessionScreen')}>
            <Text style={BookChefStyles.FooterButtonText}>
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookChefScreen;
