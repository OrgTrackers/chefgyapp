import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    Title: 'Distance',
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
        Rating: '0 To 1',
        Icon: 'star',
      },
      {
        Id: 3,
        Rating: '1 To 2',
        Icon: 'star',
      },
      {
        Id: 4,
        Rating: '2 To 3',
        Icon: 'star',
      },
      {
        Id: 5,
        Rating: '3 To 4',
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
  const [isVeg, setIsVeg] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    1: 1, // Initially select 'All' for Price
    2: 1, // Initially select 'All' for Distance
    3: 1, // Initially select 'All' for Rating
  });
  const [isSwitchOn, setIsSwitchOn] = React.useState(null);
  const [isMenuTypeOn, setIsMenuTypeOn] = React.useState(null);

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
                Pick Dates
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
              Choose Types
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
          <View style={styles.BC_MenuType_Container}>
            <Text style={[globalStyle.g_appMainContentHeaders]}>
              Select Menu Type
            </Text>
            <View style={styles.Veg_NonVeg_Container}>
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
                  <Text style={[styles.text, !isVeg && styles.activeText]}>
                    Non-Veg
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.BC_Filter_Container}>
            {Filters.map(fItem => (
              <View key={fItem.Id} style={{marginBottom: 20}}>
                <Text style={[globalStyle.g_appMainContentHeaders]}>
                  {fItem.Title}
                </Text>
                <View style={styles.BC_Filter_List}>
                  {fItem.FilterBy.map(filter => {
                    const isSelected = selectedFilters[fItem.Id] === filter.Id;
                    return (
                      <TouchableOpacity
                        key={filter.Id}
                        style={[
                          styles.BC_Filter_List_Content,
                          isSelected &&
                            globalStyle.g_appMainContentActiveBgColors, // Apply selected style if it's selected
                        ]}
                        onPress={() => handleFilterSelect(filter.Id, fItem.Id)} // Handle filter selection
                      >
                        <Text
                          style={[
                            globalStyle.g_appMainContentColors,
                            styles.BC_Filter_List_Name,
                            isSelected &&
                              globalStyle.g_appMainContentActiveColors,
                          ]}>
                          {filter.Name || filter.Rating || filter.Distance}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={[globalStyle.g_Button]}
              onPress={() => navigation.navigate('FoodSession')}>
              <Text style={[globalStyle.g_ButtonText]}>Next</Text>
            </TouchableOpacity>
          </View>
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
    marginLeft:-10
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
});

export default BookCateres;
