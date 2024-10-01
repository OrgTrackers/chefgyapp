import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FaIcons from 'react-native-vector-icons/FontAwesome6';
import {globalStyle} from '../../assets/styles/GlobalStyles';
import Footer from '../Footer';
import {Card, Switch, Modal, Portal} from 'react-native-paper';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Header from '../Header';

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
const FoodSpecialties = [
  {
    Id: 1,
    Name: 'Indian',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 2,
    Name: 'Chinese',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 3,
    Name: 'Japanese',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS3.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 4,
    Name: 'Thai',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS4.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 5,
    Name: 'Mexican',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS5.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 6,
    Name: 'Italian',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS6.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
  {
    Id: 7,
    Name: 'Korean',
    Img: require('../../assets/Updated/images/Chef/FoodSpec/FS7.jpeg'),
    Rating: 4.5,
    Decscription: 'A genuine fine-dining experience awaits.',
  },
];

const chefAllowcation = [
  {
    Id: 1,
    Name: 'Auto Asign',
  },
  {
    Id: 2,
    Name: 'Let Me Do It My Self',
  },
];
const FoodTruckFilters = () => {
  const navigation = useNavigation();
  const [selectedFilters, setSelectedFilters] = useState({
    1: 1, // Initially select 'All' for Price
    2: 1, // Initially select 'All' for Distance
    3: 1, // Initially select 'All' for Rating
  });
  const [isAdded, setIsAdded] = useState([]);
  const [showIngredients, setShowIngredients] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFromDate, setIsFromDate] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(null);

  const handleAddRemove = id => {
    setIsAdded(prevItems =>
      prevItems.includes(id)
        ? prevItems.filter(item => item !== id)
        : [...prevItems, id],
    );
  };
  const handleFilterSelect = (filterId, categoryId) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [categoryId]: filterId, // Update the selected filter for the category
    }));
  };
  const toggleIngredients = () => setShowIngredients(!showIngredients);

  const handleDateChange = day => {
    const FormatDate = day.dateString;
    if (isFromDate) {
      setStartDate(FormatDate);
    } else {
      setEndDate(FormatDate);
    }
    setShowModal(false);
  };
  const onToggleSwitch = id => {
    if (isSwitchOn === id) {
      setIsSwitchOn(null); // Deselect if clicked again
    } else {
      setIsSwitchOn(id); // Set the clicked switch as active
    }
  };
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={()=>navigation.navigate('Home')}/>
        <Text style={[globalStyle.g_appPageHeaderText]}>Food Truck Filters</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.Filter_Container}>
          <View style={styles.Date_Time_Container}>
            <View style={styles.Date_Container}>
              <Text style={globalStyle.g_appMainContentHeaders}>Date</Text>
              <View style={styles.Form_Inputs}>
                <TouchableOpacity
                  onPress={() => {
                    setIsFromDate(true);
                    setShowModal(true);
                  }}
                  style={[
                    styles.Form_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}>
                  <TextInput
                    placeholder="From Date"
                    placeholderTextColor="#ccc"
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsFromDate(true);
                    setShowModal(true);
                  }}
                  style={[
                    styles.Form_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}>
                  <TextInput
                    placeholder="To Date"
                    placeholderTextColor="#ccc"
                    onPress={() => {
                      setShowModal(true);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.Time_Container}>
              <Text style={globalStyle.g_appMainContentHeaders}>Time</Text>
              <View style={styles.Form_Inputs}>
                <TextInput
                  placeholder="From Time"
                  placeholderTextColor="#ccc"
                  style={[
                    styles.Form_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}
                />
                <TextInput
                  placeholder="To Time"
                  placeholderTextColor="#ccc"
                  style={[
                    styles.Form_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}
                />
              </View>
            </View>
          </View>
          <View style={styles.Filter_Container}>
            <View style={styles.FoodTruck_Allowcation_Container}>
              <Text style={[globalStyle.g_appMainContentHeaders]}>
                Cater Allocation
              </Text>
              {chefAllowcation.map(CA_Item => (
                <View key={CA_Item.Id}>
                  <Card style={styles.FoodTruck_Allowcation_Card}>
                    <View style={styles.FoodTruck_Allowcation_Card_Content}>
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
            <View style={styles.Enter_Crowd_Input_Container}>
              <Text style={globalStyle.g_appMainContentHeaders}>
                Number Of Attendees
              </Text>
              <View style={styles.Crowd_Input_Icons}>
                <TextInput
                  placeholder="Enter Number Of Attendees"
                  placeholderTextColor="#ccc"
                  style={[
                    styles.Crowd_Input,
                    globalStyle.g_appMainContentInputs,
                  ]}
                />
              </View>
            </View>
            <View style={styles.FoodTruck_Ingredients}>
              <Card style={styles.FoodTruck_Ingredients_Card}>
                <View style={styles.FoodTruck_Ingredients_CardBody}>
                  <Text style={[globalStyle.g_appDefaultTextColor]}>
                    FoodTruck Ingredients
                  </Text>
                  <Switch
                    value={showIngredients}
                    onValueChange={toggleIngredients}
                    color={globalStyle.g_appDefaultTextColor.color}
                  />
                </View>
              </Card>
            </View>
            <View style={styles.Fs_Container}>
              <Text style={globalStyle.g_appMainContentHeaders}>
                Food Specialties
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {FoodSpecialties.map(FsItem => (
                  <View key={FsItem.Id}>
                    <Card
                      style={styles.FS_Card}
                      onPress={() => handleAddRemove(FsItem.Id)}>
                      <Image source={FsItem.Img} style={styles.FS_Image} />
                      <Text style={styles.FS_Name}>{FsItem.Name}</Text>
                      <Text
                        style={styles.Fs_Item_Desc}
                        numberOfLines={2}
                        textBreakStrategy="simple">
                        {FsItem.Decscription}
                      </Text>
                      <View style={styles.Rating_Add_Remove_Container}>
                        <View style={styles.Rating_Container}>
                          <AntIcons name="star" size={14} color="#f1c40f" />
                          <Text style={styles.Rating_Text}>
                            {FsItem.Rating}
                          </Text>
                        </View>
                        <View style={styles.Add_Remove_Btn}>
                          <MaIcons
                            name={
                              isAdded.includes(FsItem.Id)
                                ? 'minus-box'
                                : 'plus-box'
                            }
                            onPress={() => handleAddRemove(FsItem.Id)}
                            size={20}
                            color={
                              isAdded.includes(FsItem.Id)
                                ? '#FF6666'
                                : '#389590'
                            }
                          />
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            </View>
            {Filters.map(fItem => (
              <View key={fItem.Id} style={{marginBottom: 20}}>
                <Text style={[globalStyle.g_appMainContentHeaders]}>
                  {fItem.Title}
                </Text>
                <View style={styles.Filter_List}>
                  {fItem.FilterBy.map(filter => {
                    const isSelected = selectedFilters[fItem.Id] === filter.Id;
                    return (
                      <TouchableOpacity
                        key={filter.Id}
                        style={[
                          styles.Filter_List_Content,
                          isSelected &&
                            globalStyle.g_appMainContentActiveBgColors, // Apply selected style if it's selected
                        ]}
                        onPress={() => handleFilterSelect(filter.Id, fItem.Id)} // Handle filter selection
                      >
                        <Text
                          style={[
                            globalStyle.g_appMainContentColors,
                            styles.Filter_List_Name,
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
            <TouchableOpacity style={[globalStyle.g_Button]}onPress={() => navigation.navigate('FoodTruckPickDish')}>
              <Text style={globalStyle.g_ButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Footer />
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
    </View>
  );
};

const styles = StyleSheet.create({
  Btn_As_Footer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7', // Adjust border color as needed
  },
  Btn_As_Footer_Text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },

  //Main Content
  Date_Time_Container: {
    marginTop: 5,
  },
  Date_Container: {
    marginBottom: 10,
  },
  Time_Container: {
    marginBottom: 10,
  },
  Form_Inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Form_Input: {
    width: '48%',
  },

  //Filter
  Filter_Container: {
    marginTop: 20,
  },
  Filter_Type_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Filter_List: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Filter_List_Name: {
    margin: '3%',
    borderColor: '#cccc',
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },

  //FoodTruck alloctation
  FoodTruck_Allowcation_Container: {
    marginBottom: 15,
  },
  FoodTruck_Allowcation_Card: {
    backgroundColor: '#ffff',
    margin: '1%',
    borderRadius: 5,
  },
  FoodTruck_Allowcation_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },

  //Food Specialties
  FS_Card: {
    margin: 10,
    padding: 10,
    marginLeft: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 0.5,
    width: 140,
  },
  FS_Image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  FS_Name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#292929',
    marginTop: 5,
  },
  Fs_Item_Desc: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#ccc',
  },
  Rating_Add_Remove_Container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Rating_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  Rating_Text: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },

  //No of people
  Crowd_Input_Icons: {
    flexDirection: 'row',
    position: 'relative',
  },
  Crowd_Icons: {
    position: 'absolute',
  },
  Crowd_Input: {
    width: '100%',
    paddingLeft: 10,
  },

  FoodTruck_Ingredients: {
    margin: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  FoodTruck_Ingredients_Card: {
    backgroundColor: '#fff',
    padding: 10,
  },
  FoodTruck_Ingredients_CardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 400,
  },
});

export default FoodTruckFilters;
