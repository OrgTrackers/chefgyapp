import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';
import Header from './Header';
import {globalStyle} from '../assets/styles/GlobalStyles';

const AccordiansData = [
  {
    Id: 1,
    Name: 'Rate Your Ordered Dishes',
  },
  {
    Id: 2,
    Name: 'Add a detailed review',
  },
  {
    Id: 3,
    Name: 'Rate Your Delivery Partner',
  },
];
const Items = [
  {
    Id: 1,
    Name: 'Osmania Biscuits',
  },
  {
    Id: 2,
    Name: 'Double Choco Chip Cookies',
  },
  {
    Id: 3,
    Name: 'Cheese Garlic Toast',
  },
  {
    Id: 4,
    Name: 'Maska Bun',
  },
];

const Rating = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [expanded, setExpanded] = useState(null); // Tracks which accordion is expanded

  const toggleAccordion = id => {
    setExpanded(expanded === id ? null : id); // Toggle the accordion based on id
  };

  const handleRating = newRating => {
    setRating(newRating);
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('Home')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Cafe Bastiro</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <View style={styles.Rating_Star_Container}>
          <Card style={styles.Rating_Card}>
            <Text style={styles.Rating_Header_Text}>Rating</Text>
            <View style={styles.Stars_Container}>
              {[1, 2, 3, 4, 5].map(star => (
                <AntIcons
                  key={star}
                  name={star <= rating ? 'star' : 'staro'} // Change icon based on rating
                  size={24}
                  color="gold"
                  onPress={() => handleRating(star)} // Update rating on press
                  style={styles.Star}
                />
              ))}
            </View>
          </Card>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {AccordiansData.map(AccordianItem => (
            <View key={AccordianItem.Id}>
              <Card style={styles.Accordian_Card}>
                <TouchableOpacity
                  style={styles.Accordian_Cardbody}
                  onPress={() => toggleAccordion(AccordianItem.Id)} // Toggle the accordion
                >
                  <Text style={styles.Accordian_Name}>
                    {AccordianItem.Name}
                  </Text>
                  <Ionicons
                    name={
                      expanded === AccordianItem.Id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={15}
                    color="#000"
                  />
                </TouchableOpacity>
              </Card>
              {expanded === AccordianItem.Id &&
                AccordianItem.Name === 'Rate Your Ordered Dishes' && (
                  <View style={styles.Items_Container}>
                    <View style={styles.Items_Content}>
                      {Items.map(OrderItem => (
                        <View
                          key={OrderItem.Id}
                          style={styles.Order_Rating_Container}>
                          <Text style={styles.Order_Name_Text}>
                            {OrderItem.Name}
                          </Text>
                          <View style={styles.OK_NotOk_Symbol_Container}>
                            <MaIcons name="thumb-up" size={24} color="#ddd" />
                            <MaIcons name="thumb-down" size={24} color="#ddd" />
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              {expanded === AccordianItem.Id &&
                AccordianItem.Name === 'Add a detailed review' && (
                  <View style={styles.Detailed_Review_Content}>
                    <TextInput
                      placeholder="Enter Detailed Review"
                      placeholderTextColor="#000"
                      numberOfLines={5}
                      style={styles.Detailed_Review_Input}
                    />
                  </View>
                )}
              {expanded === AccordianItem.Id &&
                AccordianItem.Name === 'Rate Your Delivery Partner' && (
                  <>
                    <View style={styles.Stars_Container}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <AntIcons
                          key={star}
                          name={star <= rating ? 'star' : 'staro'} // Change icon based on rating
                          size={24}
                          color="gold"
                          onPress={() => handleRating(star)} // Update rating on press
                          style={styles.Star}
                        />
                      ))}
                    </View>
                    <View style={styles.Detailed_Review_Content}>
                      <TextInput
                        placeholder="Enter Delivery Partner Review"
                        placeholderTextColor="#000"
                        numberOfLines={5}
                        style={styles.Detailed_Review_Input}
                      />
                    </View>
                  </>
                )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Rating_Card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  Rating_Header_Text: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Stars_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
    marginBottom: '2%',
    gap: 10,
  },
  Star: {
    paddingHorizontal: 5,
  },

  //Accordian
  Accordian_Card: {
    backgroundColor: '#ffff',
    margin: 2,
    marginBottom: 15,
    marginTop: 15,
  },
  Accordian_Cardbody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  Accordian_Name: {
    color: '#000',
    fontWeight: 'bold',
  },
  //order rating
  Order_Rating_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  Order_Name_Text: {
    color: '#000',
  },
  OK_NotOk_Symbol_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  //Multi
  Detailed_Review_Input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default Rating;
