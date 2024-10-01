import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyle} from '../../assets/styles/GlobalStyles';
import {Card} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Header from '../Header';

const PickDishData = [
  {
    Id: 1,
    Name: 'Indian',
    Items: [
      {
        Id: 1,
        IName: 'Veg Biryani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        IName: 'Paneer Tikka',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        IName: 'Butter Chicken',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS3.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        IName: 'Dal Makhani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS4.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        IName: 'Chole Bhature',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS5.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 6,
        IName: 'Palak Paneer',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS6.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 7,
        IName: 'Aloo Gobi',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS7.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 8,
        IName: 'Samosa',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 9,
        IName: 'Rogan Josh',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 10,
        IName: 'Pav Bhaji',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
    ],
  },
  {
    Id: 2,
    Name: 'Chinese',
    Items: [
      {
        Id: 1,
        IName: 'Veg Biryani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        IName: 'Paneer Tikka',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        IName: 'Butter Chicken',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS3.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        IName: 'Dal Makhani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS4.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        IName: 'Chole Bhature',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS5.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 6,
        IName: 'Palak Paneer',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS6.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 7,
        IName: 'Aloo Gobi',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS7.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 8,
        IName: 'Samosa',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 9,
        IName: 'Rogan Josh',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 10,
        IName: 'Pav Bhaji',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
    ],
  },
  {
    Id: 3,
    Name: 'Japanese',
    Items: [
      {
        Id: 1,
        IName: 'Veg Biryani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 2,
        IName: 'Paneer Tikka',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 3,
        IName: 'Butter Chicken',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS3.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 4,
        IName: 'Dal Makhani',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS4.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 5,
        IName: 'Chole Bhature',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS5.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 6,
        IName: 'Palak Paneer',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS6.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 7,
        IName: 'Aloo Gobi',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS7.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 8,
        IName: 'Samosa',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 9,
        IName: 'Rogan Josh',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
      {
        Id: 10,
        IName: 'Pav Bhaji',
        Img: require('../../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
        Rating: 4.5,
        Decscription: 'A genuine fine-dining experience awaits.',
      },
    ],
  },
];
const Dates = [
  {
    Id: 1,
    Date: 27,
    Month: 'Sep',
  },
  {
    Id: 2,
    Date: 28,
    Month: 'Sep',
  },
  {
    Id: 3,
    Date: 29,
    Month: 'Sep',
  },
  {
    Id: 4,
    Date: 30,
    Month: 'Sep',
  },
  {
    Id: 5,
    Date: 1,
    Month: 'Oct',
  },
];

const BgColors = ['#f4d03f', '#FF2200', '#FA5F0F'];

const FoodTruckPickDish = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(1);
  const [checked, setChecked] = React.useState([]);
  const [isAdded, setIsAdded] = useState([]);

  const handleAddRemove = id => {
    setIsAdded(prevItems =>
      prevItems.includes(id)
        ? prevItems.filter(item => item !== id)
        : [...prevItems, id],
    );
  };

  const handleAccordions = id => {
    setExpanded(expanded === id ? null : id); // Toggle accordion
  };

  const handleCheck = itemId => {
    if (checked.includes(itemId)) {
      // If item is already selected, uncheck it
      setChecked(checked.filter(id => id !== itemId));
    } else {
      // If item is not selected, add it to the array
      setChecked([...checked, itemId]);
    }
  };

  const unCheck = itemId => {
    // Uncheck only the specific item
    setChecked(checked.filter(id => id !== itemId));
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={()=>navigation.navigate('FoodTruckFilters')}/>
        <Text style={[globalStyle.g_appPageHeaderText]}>Pick Your Dish</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {PickDishData.map((selectedItem, index) => (
            <View key={selectedItem.Id}>
              <View
                style={[
                  styles.selectedFS_Card,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: BgColors[index % BgColors.length],
                  },
                ]}>
                <View style={styles.selectedFS_CardBody}>
                  <TouchableOpacity
                    onPress={() => handleAccordions(selectedItem.Id)}>
                    <Text
                      style={[
                        styles.selectedName,
                        {color: BgColors[index % BgColors.length]},
                      ]}>
                      {selectedItem.Name}
                    </Text>
                  </TouchableOpacity>
                  <Ionicons
                    size={15}
                    color={BgColors[index % BgColors.length]}
                    name={
                      expanded === selectedItem.Id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    onPress={() => handleAccordions(selectedItem.Id)}
                  />
                </View>
              </View>
              {expanded === selectedItem.Id && (
                <View style={styles.SelectedFS_Item_Content}>
                  <View style={styles.selectDates_Container}>
                    {Dates.map(dateItem => (
                      <View key={dateItem.Id}>
                        <Card style={styles.Date_Card}>
                          <View style={styles.Date_CardBody}>
                            <Text style={styles.Date_Text}>
                              {dateItem.Date}
                            </Text>
                            <Text style={styles.Month_Text}>
                              {dateItem.Month}
                            </Text>
                          </View>
                        </Card>
                      </View>
                    ))}
                  </View>
                  <View style={styles.selectedItems_Data}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {selectedItem.Items.map(Items => (
                        <View key={Items.Id}>
                          <Card
                            style={styles.Dishtype_Card}
                            onPress={() => handleAddRemove(Items.Id)}>
                            <Image
                              source={Items.Img}
                              style={styles.Dish_Type_Image}
                            />
                            <Text style={styles.Dishes_Name}>
                              {Items.IName}
                            </Text>
                            <View style={styles.Rating_Add_Remove_Container}>
                              <View style={styles.Rating_Container}>
                                <AntIcons
                                  name="star"
                                  size={14}
                                  color="#f1c40f"
                                />
                                <Text style={styles.Rating_Text}>
                                  {Items.Rating}
                                </Text>
                              </View>
                              <View style={styles.Add_Remove_Btn}>
                                <MaIcons
                                  name={
                                    isAdded.includes(Items.Id)
                                      ? 'minus-box'
                                      : 'plus-box'
                                  }
                                  onPress={() => handleAddRemove(Items.Id)}
                                  size={20}
                                  color={
                                    isAdded.includes(Items.Id)
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
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[styles.Btn_As_Footer, globalStyle.g_appDefaultContentBgColor]}
        onPress={() => navigation.navigate('FoodTruckList')}>
        <Text style={styles.Btn_As_Footer_Text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn_As_Footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
  },
  Btn_As_Footer_Text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedFS_Card: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedFS_CardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffff',
  },

  //Dates
  selectDates_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  Date_Card: {
    padding: 5,
    borderRadius: 5,
  },
  Date_CardBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Date_Text: {
    fontSize: 10,
  },
  Month_Text: {
    fontSize: 10,
  },

  // Inner content
  SelectedFS_Item_Content: {
    margin: 10,
  },
  selectedItems_Data: {
    marginTop: 10,
  },
  Items_Data_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Items_Data: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  ItemName: {
    color: '#000',
  },

  //Dsihes
  Dishtype_Card: {
    margin: 10,
    marginLeft: 0,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#cccc',
    borderWidth: 0.5,
  },
  Dish_Type_Image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  Dishes_Name: {
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
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
});

export default FoodTruckPickDish;
