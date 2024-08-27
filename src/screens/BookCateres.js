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
import Calendar from 'react-native-calendar-range-picker';
import Footer from '../components/Footer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

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

const BookCateres = () => {
  const navigation = useNavigation();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const scrollViewRef = useRef(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // const handleCheck = () => {
  //   setChecked(!checked);
  //   if (!checked) {
  //     // Scroll to the end when the checkbox is checked
  //     scrollViewRef.current?.scrollToEnd({ animated: true });
  //   }
  // };

  const handleCardPress = id => {
    if (selectedTypes.includes(id)) {
      setSelectedTypes(selectedTypes.filter(typeId => typeId !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
      scrollViewRef.current?.scrollToEnd({animated: true});
    }
  };

  const handleDateChange = dateRange => {
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      setStartDate(dateRange.startDate);
      setEndDate(dateRange.endDate);
    }
  };
  return (
    <View style={styles.BC_Container}>
      <View style={styles.BC_Header_Container}>
        <View style={styles.BC_Header_Icons}>
          <TouchableOpacity onPress={() => navigation.navigate('EventPage')}>
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
        <Text style={styles.BC_Header_Text}>Book Cateres</Text>
      </View>
      <View style={styles.BC_Content}>
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.BC_Date_Calendar_Container}>
            <View style={styles.BC_Dates_Content}>
              <Text style={styles.BC_Date_Header}>Pick Dates</Text>
              <View style={styles.BC_Date_Inputs}>
                <TextInput
                  keyboardType="decimal-pad"
                  placeholderTextColor="#d9d9d9"
                  placeholder="From Date"
                  style={styles.BC_Date_Input}
                  value={startDate}
                />
                <TextInput
                  keyboardType="decimal-pad"
                  placeholderTextColor="#d9d9d9"
                  placeholder="To Date"
                  style={styles.BC_Date_Input}
                  value={endDate}
                />
              </View>
            </View>
            <View style={styles.BC_Calendar_Content}>
              <View style={styles.BC_Calendar_Container}>
                <Calendar
                  startDate="2024-03-05"
                  endDate="2024-03-12"
                  onChange={handleDateChange}
                  style={{
                    monthNameText: {fontSize: 10, color: '#272727'},
                    dayNameText: {fontSize: 10},
                    dayText: {fontSize: 10},
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.BC_Select_Type_Content}>
            <Text style={styles.BC_Type_Header}>Select Type</Text>
            <View style={styles.BC_Type_Cards}>
              {Cater_Type.map(BC_TypeItem => {
                let iconColor;
                let iconBgColor;
                switch (BC_TypeItem.Id) {
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

                const isSelected = selectedTypes.includes(BC_TypeItem.Id);
                const cardBgColor = isSelected ? '#FF9800' : '#ffffff';

                return (
                  <View>
                    <Card
                      key={BC_TypeItem.Id}
                      onPress={() => handleCardPress(BC_TypeItem.Id)}
                      style={[
                        styles.BC_Type_Card,
                        {backgroundColor: cardBgColor},
                      ]}>
                      <View style={styles.CheckBoxContainer}></View>
                      <MaIcons
                        name={BC_TypeItem.Icon}
                        size={15}
                        color={iconColor}
                        style={{
                          backgroundColor: iconBgColor,
                          width: 35,
                          padding: 10,
                          borderRadius: 100,
                          marginTop: 15,
                        }}
                      />
                      <Text style={styles.BC_Type_Text}>
                        {BC_TypeItem.name}
                      </Text>
                    </Card>
                  </View>
                );
              })}
            </View>
          </View>
          {selectedTypes.length > 0 && (
            <TouchableOpacity
              style={styles.BC_Next_Btn}
              onPress={() => navigation.navigate('FoodSession')}>
              <Text style={styles.BC_Next_Btn_Text}>Next</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  BC_Container: {
    backgroundColor: '#5CB35E',
    width: '100%',
    height: '100%',
  },

  //header
  BC_Header_Container: {
    padding: 15,
  },
  BC_Header_Text: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: '5%',
  },
  BC_Header_Icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //Main content
  BC_Content: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: '10%',
  },

  //Calendar and Dates
  BC_Date_Header: {
    color: '#272727',
    fontWeight: 'bold',
  },
  BC_Date_Inputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  BC_Date_Input: {
    borderColor: '#fcf3cf',
    borderWidth: 1.5,
    borderRadius: 10,
    width: '48%',
    marginTop: '2%',
    marginRight: '2%',
    paddingLeft: 10,
  },

  //Calendar
  BC_Calendar_Container: {
    width: '100%',
    height: 350,
  },

  // types selection
  BC_Type_Header: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: '2%',
  },
  BC_Type_Cards: {
    display: 'flex',
    flexDirection: 'row',
    margin: '3%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  BC_Type_Card: {
    margin: '1%',
    padding: 10,
    width: 100,
    backgroundColor: '#ffff',
    borderColor: '#cccc',
    borderWidth: 0.5,
  },
  BC_Type_Text: {
    color: '#272727',
    fontSize: 15,
  },
  CheckBoxContainer: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 1,
  },

  //Next Btn
  BC_Next_Btn: {
    backgroundColor: '#fcf3cf',
    padding: 10,
    margin: '2%',
    borderRadius: 10,
  },
  BC_Next_Btn_Text: {
    fontSize: 15,
    color: '#FF9800',
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default BookCateres;
