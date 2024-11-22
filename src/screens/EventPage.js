import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  Button,
} from 'react-native';
import {globalStyle} from '../assets/styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-paper';

const Evnt_Data = [
  {
    Id: 1,
    Name: 'Marriage Events',
    Img: require('../assets/images/Events/PageImgs/img-1.png'),
  },
  {
    Id: 2,
    Name: 'Opeing Ceremony',
    Img: require('../assets/images/Events/PageImgs/img-2.png'),
  },
  {
    Id: 3,
    Name: 'Birthday Events',
    Img: require('../assets/images/Events/PageImgs/img-3.png'),
  },
];

const EventPage = () => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('Home')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Cater Events</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <TouchableOpacity
          style={styles.Book_Btn}
          onPress={() => navigation.navigate('BookCateres')}>
          <Text style={styles.Book_Btn_Text}>Book Cater</Text>
        </TouchableOpacity>
        <Text style={styles.Event_Content_Header}>We Serve Food For</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Evnt_Data.map(EventItem => (
            <View key={EventItem.Id}>
              <Card style={styles.Event_Card}>
                <Image source={EventItem.Img} style={styles.Event_Img} />
              </Card>
              <Text style={styles.Event_Name}>{EventItem.Name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  Book_Btn: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 10,
    padding: 10,
  },
  Book_Btn_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  Event_Content_Header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: '10%',
    textAlign: 'center',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: '5%',
  },
  Event_Img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  Event_Card: {
    // iOS shadow styles
    shadowColor: '#3498db', // Shadow color
    shadowOffset: {width: 0, height: 4}, // Shadow position
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
    // Android shadow support
    elevation: 5,
    backgroundColor:'#fff',
    margin:5,
    borderColor:'#3498db',
    borderWidth:0.2
  },
  Event_Name: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#000',
    textAlign: 'center',
    marginBottom: '5%',
  },
});

export default EventPage;
