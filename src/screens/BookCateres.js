import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Calendar from "react-native-calendar-range-picker";
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';

const Cater_Categories = [
  {
    Id: 1,
    Img: require('../assets/icon/breakfast.png'),
    Name: 'Breakfast',
  },
  {
    Id: 2,
    Img: require('../assets/icon/lunch.png'),
    Name: 'Lunch'
  },
  {
    Id: 4,
    Img: require('../assets/icon/breakfast.png'),
    Name: 'Breakfast',
  },
  {
    Id: 5,
    Img: require('../assets/icon/lunch.png'),
    Name: 'Lunch'
  },
];

const BookCateres = () => {
  const navigation = useNavigation();
  const [fromDate, setFromDate] = useState("18/07/2024");
  const [toDate, setToDate] = useState("25/07/2024");

  return (
    <View style={styles.BookCateres_Container}>
      <View style={styles.B_C_Header}>
        <TouchableOpacity onPress={() => navigation.navigate("EventPage")}>
          <Image source={require('../assets/icon/back.png')} style={styles.BackToEventPage_Icon} />
        </TouchableOpacity>
        <Text style={styles.B_C_Header_Text}>Book Caters</Text>
        <View></View>
      </View>
      <View style={styles.B_C_Selected_Dates}>
        <View style={styles.B_C_From_Date}>
          <Text style={styles.B_C_Selected_Header}>From</Text>
          <Text style={styles.B_C_Selected_Date_Text}>{fromDate}</Text>
        </View>
        <View style={styles.B_C_To_Date}>
          <Text style={styles.B_C_Selected_Header}>To</Text>
          <Text style={styles.B_C_Selected_Date_Text}>{toDate}</Text>
        </View>
      </View>
      <View style={styles.B_C_Calendar}>
        <Calendar
          startDate="2024-03-05"
          endDate="2024-03-12"
          onChange={({ startDate, endDate }) => {
            setFromDate(startDate);
            setToDate(endDate);
          }}
          // style={{
          //   container: {},
          //   monthContainer: {},
          //   monthOverlayContainer: {},
          //   weekContainer: {},
          //   monthNameText: {},
          //   dayNameText: {},
          //   dayText: {},
          //   dayTextColor: '#f7f7f7',
          //   holidayColor: 'rgba(0,0,0,0.5)',
          //   todayColor: 'blue',
          //   disabledTextColor: '#cccccc',
          //   selectedDayTextColor: '#ffffff',
          //   selectedDayBackgroundColor: '#52c234',
          //   selectedBetweenDayTextColor: '#ffffff',
          //   selectedBetweenDayBackgroundTextColor: '#cccccc',
          // }}
        />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.B_C_Catergory_Container}>
          {Cater_Categories.map((C_Cate_Item) => (
            <TouchableOpacity key={C_Cate_Item.Id} style={styles.B_C_Catergory_Card}>
              <Image source={C_Cate_Item.Img} style={styles.B_C_Catergory_Card_Img} />
              <Text style={styles.B_C_Catergory_Card_Title}>{C_Cate_Item.Name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <LinearGradient
        colors={['#52c234', '#061700']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} style={styles.B_C_Next_Btn}>
        <TouchableOpacity style={styles.Goto_Card_Btn}>
          <Text style={styles.B_C_Next_Btn_Text}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  BookCateres_Container: {
    backgroundColor: '#ffff',
    height: '100%',
    width: '100%'
  },
  B_C_Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  BackToEventPage_Icon: {
    width: 20,
    height: 20
  },
  B_C_Calendar: {
    height: '45%',
    paddingBottom: 5,
    borderBottomColor: '#cccc',
    borderBottomWidth: 1
  },
  B_C_Header_Text: {
    color: '#272727'
  },
  B_C_Selected_Dates: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccc',
    paddingBottom: 10,
    gap: 10
  },
  B_C_From_Date: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  B_C_To_Date: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  B_C_Selected_Date_Text: {
    fontSize: 20,
    color: '#272727',
    fontWeight: '900',
  },
  B_C_Catergory_Card: {
    backgroundColor: '#cccc',
    width: 130,
    height: 130,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  B_C_Catergory_Card_Img: {
    width: 80,
    height: 80,
  },
  B_C_Next_Btn_Text: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  B_C_Next_Btn: {
    padding: 20,
    backgroundColor: '#cccc',
    margin: 10,
    borderRadius: 10,
  }
})

export default BookCateres;
