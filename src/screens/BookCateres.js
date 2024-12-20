import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import Calendar from 'react-native-calendar-range-picker';
import Footer from '../components/Footer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Modal, Portal, Button, Switch} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

//styles
import {globalStyle} from '../assets/styles/GlobalStyles';
import Header from '../components/Header';

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

const BookCateres = () => {
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
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('EventPage')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Book Caterer</Text>
      </View>
      <View style={globalStyle.g_appMainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.BC_Date_Calendar_Container}>
            <View style={styles.BC_Dates_Content}>
              <Text style={[globalStyle.g_appMainContentHeaders]}>
                When do you want this service ?
              </Text>
              <View style={styles.BC_Date_Inputs}>
                <TouchableOpacity
                  onPress={() => {
                    setIsFromDate(true);
                    setShowModal(true);
                  }}
                  style={[
                    styles.BC_Date_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}>
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
                  style={[
                    styles.BC_Date_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}>
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
          <View style={styles.BC_Types_Container}>
            <Text style={[globalStyle.g_appMainContentHeaders]}>
              Type of Meals
            </Text>
            <View style={styles.BC_Type_Cards_Container}>
              {Cater_Type.map(ItemType => (
                <Card
                  key={ItemType.Id}
                  style={[
                    styles.BC_Type_Cards,
                    selectedTypeId.includes(ItemType.Id) && styles.selectedCard, // Apply styles if selected
                  ]}
                  onPress={() => selectTypes(ItemType.Id)}>
                  <MaIcons
                    name={ItemType.Icon}
                    size={20}
                    color={
                      selectedTypeId.includes(ItemType.Id)
                        ? '#ffffff'
                        : globalStyle.g_appMainContentIconColors.color
                    }
                  />
                  <Text
                    style={[
                      styles.BC_Type_Name,
                      globalStyle.g_appDefaultTextColor,
                      selectedTypeId.includes(ItemType.Id) &&
                        styles.selectedText,
                    ]}>
                    {ItemType.name}
                  </Text>
                </Card>
              ))}
            </View>
          </View>
          <View style={styles.BC_MenuType_Container}>
            <Text style={[globalStyle.g_appMainContentHeaders]}>
              Select Menu Type
            </Text>
          </View>
          <View style={styles.BC_Filter_Container}>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                  <View style={styles.toggleContainer}>
                    <TouchableOpacity
                      style={[
                        styles.toggleButton,
                        filterVeg === true && styles.toggleButtonActiveVeg,
                      ]}
                      onPress={() =>
                        setFilterVeg(filterVeg === true ? null : true)
                      }>
                      <Leaf
                        size={16}
                        color={filterVeg === true ? 'green' : 'gray'}
                      />
                      <Text
                        style={
                          filterVeg === true
                            ? styles.toggleTextActiveVeg
                            : styles.toggleText
                        }>
                        Veg
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.toggleButton,
                        filterVeg === false && styles.toggleButtonActiveNonVeg,
                      ]}
                      onPress={() =>
                        setFilterVeg(filterVeg === false ? null : false)
                      }>
                      <Beef
                        size={16}
                        color={filterVeg === false ? 'red' : 'gray'}
                      />
                      <Text
                        style={
                          filterVeg === false
                            ? styles.toggleTextActiveNonVeg
                            : styles.toggleText
                        }>
                        Non-Veg
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Sort & Filter</Text>
                  <View style={styles.sortContainer}>
                    {SORT_OPTIONS.map(sortOption => (
                      <View key={sortOption.id} style={styles.sortOption}>
                        <View style={styles.sortHeader}>
                          <sortOption.icon size={16} color={sortOption.color} />
                          <Text style={styles.sortLabel}>
                            {sortOption.label}
                          </Text>
                        </View>
                        <View style={styles.sortOptions}>
                          {sortOption.options.map(option => (
                            <TouchableOpacity
                              key={option}
                              style={[
                                styles.sortButton,
                                activeSort[sortOption.id] === option &&
                                  styles.sortButtonActive,
                              ]}
                              onPress={() =>
                                setActiveSort(prev => ({
                                  ...prev,
                                  [sortOption.id]:
                                    prev[sortOption.id] === option
                                      ? undefined
                                      : option,
                                }))
                              }>
                              <Text
                                style={
                                  activeSort[sortOption.id] === option
                                    ? styles.sortButtonTextActive
                                    : styles.sortButtonText
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

                {/* Add RecipeCard components for Recently Viewed and Recommended Sections */}
              </ScrollView>
            </View>
          </View>
          <View style={styles.BC_Cater_Allowcation_Container}>
            <Text style={[globalStyle.g_appMainContentHeaders]}>
              Cater Allocation
            </Text>
            {caterAllowcation.map(CA_Item => (
              <View key={CA_Item.Id}>
                <Card style={styles.BC_Cater_Allowcation_Card}>
                  <View style={styles.BC_Cater_Allowcation_Card_Content}>
                    <Text
                      style={[
                        styles.BC_CA_Allocation_Text,
                        globalStyle.g_appDefaultTextColor,
                      ]}>
                      {CA_Item.Name}
                    </Text>
                    <Switch
                      value={isSwitchOn === CA_Item.Id} // Check if the switch is active
                      onValueChange={() => onToggleSwitch(CA_Item.Id)}
                      color={globalStyle.g_appMainContentColors.color}
                    />
                  </View>
                </Card>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[globalStyle.g_Button]}
            onPress={() => navigation.navigate('FoodSession')}>
            <Text style={[globalStyle.g_ButtonText]}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* React Native Paper Modal */}
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={styles.modalContainer}>
          <View style={{height: 350}}>
            <Calendar
              onDayPress={handleDateChange}
              // onChange={handleDateChange}
              minDate={new Date().toISOString().split('T')[0]}
              markedDates={{
                [selectedDate]: {selected: true, selectedDotColor: '#389590'},
              }}
            />
          </View>
        </Modal>
      </Portal>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  //Calendar and Dates
  BC_Content_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  BC_Date_Inputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BC_Date_Input: {
    width: '48%',
    marginTop: '2%',
    marginRight: '2%',
  },

  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 400,
  },

  //types
  BC_Types_Container: {
    marginTop: 20,
  },
  BC_Type_Cards_Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1%',
  },
  BC_Type_Cards: {
    padding: 10,
    width: 100,
    backgroundColor: '#ffff',
    marginRight: 20,
  },
  BC_Type_Name: {
    marginTop: '10%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectedCard: {
    backgroundColor: '#389590', // Blue background when selected
  },
  selectedText: {
    color: '#ffffff', // White text when selected
  },

  //cater alloctation
  BC_Cater_Allowcation_Container: {
    marginTop: 20,
  },
  BC_Cater_Allowcation_Card: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 5,
  },
  BC_Cater_Allowcation_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  BC_CA_Allocation_Text: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  //Menu Type Selection
  BC_MenuType_Container: {
    marginTop: 20,
  },
  BC_MenuType_Card: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 5,
  },
  BC_MenuType_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  BC_CA_Allocation_Text: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  //Filter
  BC_Filter_Container: {
    marginTop: 20,
  },
  Filter_Type_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  BC_Filter_List: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BC_Filter_List_Content: {},
  BC_Filter_List_Name: {
    margin: '3%',
    borderColor: '#cccc',
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },

  //Buttons
  Veg_NonVeg_Container: {
    margin: 5,
    marginTop: 5,
    backgroundColor: '#fff',
    marginLeft: -10,
  },
  Select_Type_Text: {
    fontSize: 15,
    margin: 15,
    marginBottom: 0,
    color: '#000',
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
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    transition: 'all 0.3s',
  },
  vegButton: {
    backgroundColor: '',
    borderColor: '#AED581',
    fontWeight: 100,
  },
  nonVegButton: {
    backgroundColor: '',
    borderColor: '#E57373',
    fontWeight: 100,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#757575',
  },
  vegText: {
    color: '#2E7D32',
  },
  nonVegText: {
    color: '#C62828',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  toggleButtonActiveVeg: {
    backgroundColor: '#E5FFE5',
    borderColor: '#A8E6A8',
  },
  toggleButtonActiveNonVeg: {
    backgroundColor: '#FFE5E5',
    borderColor: '#F5A8A8',
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  toggleTextActiveVeg: {
    color: 'green',
  },
  toggleTextActiveNonVeg: {
    color: 'red',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sortOption: {
    width: '100%',
  },
  sortHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  sortButtonActive: {
    backgroundColor: '#D3E4FD',
    borderColor: '#A8C5F5',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#333',
  },
});

export default BookCateres;
