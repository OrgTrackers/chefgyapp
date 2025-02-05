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
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {BookCatererStyles} from './BookCater.styles';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import {Card, Modal, Portal, Button, Switch} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {
  Leaf,
  Beef,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Star,
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

const caterAllowcation = [
  {
    Id: 1,
    Name: 'Auto Asign',
  },
  {
    Id: 2,
    Name: 'Let Me Do It My Self',
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

const BookCaterScreen = () => {
  const navigation = useNavigation();
  const [selectedTypeId, setSelectedTypeId] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFromDate, setIsFromDate] = useState(true);
  const [menuType, setMenuType] = useState({veg: true, nonVeg: true});
  const [selectedFilters, setSelectedFilters] = useState({
    1: 1, // Initially select 'All' for Price
    2: 1, // Initially select 'All' for Distance
    3: 1, // Initially select 'All' for Rating
  });
  const [isSwitchOn, setIsSwitchOn] = React.useState(null);
  const [isMenuTypeOn, setIsMenuTypeOn] = React.useState(null);

  const [filterVeg, setFilterVeg] = useState(null);
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

  const onToggleSwitch = id => {
    if (isSwitchOn === id) {
      setIsSwitchOn(null); // Deselect if clicked again
    } else {
      setIsSwitchOn(id); // Set the clicked switch as active
    }
  };

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
        <TouchableOpacity style={BookCatererStyles.HeaderContent}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={BookCatererStyles.PageName}>Book Caterer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={BookCatererStyles.BC_Date_Calendar_Container}>
          <View style={BookCatererStyles.BC_Dates_Content}>
            <Text style={[GlobalCss.g_SideHeaders]}>
              When do you want this service ?
            </Text>
            <View style={BookCatererStyles.BC_Date_Inputs}>
              <TouchableOpacity
                onPress={() => {
                  setIsFromDate(true);
                  setShowModal(true);
                }}
                style={[BookCatererStyles.BC_Date_Input, GlobalCss.g_Inputs]}>
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
                style={[BookCatererStyles.BC_Date_Input, GlobalCss.g_Inputs]}>
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
        <View style={BookCatererStyles.BC_MenuType_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Select Menu Type</Text>
          <View style={BookCatererStyles.Veg_NonVeg_Btns}>
            <TouchableOpacity
              style={[
                BookCatererStyles.toggleButton,
                filterVeg === true && BookCatererStyles.toggleButtonActiveVeg,
              ]}
              onPress={() => setFilterVeg(filterVeg === true ? null : true)}>
              <Leaf size={16} color={filterVeg === true ? 'green' : 'gray'} />
              <Text
                style={
                  filterVeg === true
                    ? BookCatererStyles.toggleTextActiveVeg
                    : BookCatererStyles.toggleText
                }>
                Veg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                BookCatererStyles.toggleButton,
                filterVeg === false &&
                  BookCatererStyles.toggleButtonActiveNonVeg,
              ]}
              onPress={() => setFilterVeg(filterVeg === false ? null : false)}>
              <Beef size={16} color={filterVeg === false ? 'red' : 'gray'} />
              <Text
                style={
                  filterVeg === false
                    ? BookCatererStyles.toggleTextActiveNonVeg
                    : BookCatererStyles.toggleText
                }>
                Non-Veg
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={BookCatererStyles.BC_Types_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Type of Meals</Text>
          <View style={BookCatererStyles.BC_Type_Cards_Container}>
            {Cater_Type.map(ItemType => (
              <Card
                key={ItemType.Id}
                style={[
                  BookCatererStyles.BC_Type_Cards,
                  selectedTypeId.includes(ItemType.Id) &&
                    BookCatererStyles.selectedCard, // Apply styles if selected
                ]}
                onPress={() => selectTypes(ItemType.Id)}>
                <MCIcons
                  name={ItemType.Icon}
                  size={20}
                  color={
                    selectedTypeId.includes(ItemType.Id) ? '#FA3B3D' : '#FA3B3D'
                  }
                />
                <Text
                  style={[
                    BookCatererStyles.BC_Type_Name,
                    GlobalCss.ThemeColor.color,
                    selectedTypeId.includes(ItemType.Id) &&
                      BookCatererStyles.selectedText,
                  ]}>
                  {ItemType.name}
                </Text>
              </Card>
            ))}
          </View>
        </View>
        <View style={BookCatererStyles.section}>
          <Text style={[GlobalCss.g_SideHeaders]}>
            Sort List Using Below Filters
          </Text>
          <View style={BookCatererStyles.sortContainer}>
            {SORT_OPTIONS.map(sortOption => (
              <View key={sortOption.id} style={BookCatererStyles.sortOption}>
                <View style={BookCatererStyles.sortOptions}>
                  {sortOption.options.map(option => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        BookCatererStyles.sortButton,
                        activeSort[sortOption.id] === option &&
                          BookCatererStyles.sortButtonActive,
                      ]}
                      onPress={() =>
                        setActiveSort(prev => ({
                          ...prev,
                          [sortOption.id]:
                            prev[sortOption.id] === option ? undefined : option,
                        }))
                      }>
                      <Text
                        style={
                          activeSort[sortOption.id] === option
                            ? BookCatererStyles.sortButtonTextActive
                            : BookCatererStyles.sortButtonText
                        }>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={BookCatererStyles.BC_Cater_Allowcation_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Cater Allocation</Text>
          {caterAllowcation.map(CA_Item => (
            <View key={CA_Item.Id}>
              <Card style={BookCatererStyles.BC_Cater_Allowcation_Card}>
                <View
                  style={BookCatererStyles.BC_Cater_Allowcation_Card_Content}>
                  <Text
                    style={[
                      BookCatererStyles.BC_CA_Allocation_Text,
                      GlobalCss.ThemeColor.color,
                    ]}>
                    {CA_Item.Name}
                  </Text>
                  <Switch
                    value={isSwitchOn === CA_Item.Id} // Check if the switch is active
                    onValueChange={() => onToggleSwitch(CA_Item.Id)}
                    color={GlobalCss.ThemeColor.color}
                  />
                </View>
              </Card>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* React Native Paper Modal */}
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={BookCatererStyles.modalContainer}>
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
        <View style={BookCatererStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              BookCatererStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}>
            <Text style={BookCatererStyles.FooterButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookCaterScreen;
