import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
} from 'react-native';
import {globalStyle} from '../assets/styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-paper';

const {width} = Dimensions.get('window');

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

const Food_SpecData = [
  {
    Id: 1,
    Name: 'Chicken Biryani',
    Img: require('../assets/Updated/images/Chef/FoodSpec/FS1.jpeg'),
  },
  {
    Id: 2,
    Name: 'Mutton Biryani',
    Img: require('../assets/Updated/images/Chef/FoodSpec/FS2.jpeg'),
  },
  {
    Id: 3,
    Name: 'Veg Biryani',
    Img: require('../assets/Updated/images/Chef/FoodSpec/FS3.jpeg'),
  },
  {
    Id: 4,
    Name: 'Special Chicken Biryani',
    Img: require('../assets/Updated/images/Chef/FoodSpec/FS4.jpeg'),
  },
];

const Best_CatersData = [
  {
    Id:1,
    Img:require('../assets/Updated/images/Events/BestCaters/BestCaters.jpeg'),
    Name:'Venkateswara Mess'
  },
  {
    Id:2,
    Img:require('../assets/Updated/images/Events/BestCaters/BestCaters.jpeg'),
    Name:'Venkateswara Mess'
  },
  {
    Id:3,
    Img:require('../assets/Updated/images/Events/BestCaters/BestCaters.jpeg'),
    Name:'Venkateswara Mess'
  },
  {
    Id:4,
    Img:require('../assets/Updated/images/Events/BestCaters/BestCaters.jpeg'),
    Name:'Venkateswara Mess'
  },
];

const EventPage = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../assets/Updated/images/Events/EV3.jpg'),
    require('../assets/Updated/images/Events/EV4.jpg'),
    require('../assets/Updated/images/Events/EV5.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current.scrollTo({x: nextIndex * width, animated: true});
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('Home')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Cater Events</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.Book_Btn}
            onPress={() => navigation.navigate('BookCateres')}>
            <Text style={styles.Book_Btn_Text}>Book Cater</Text>
          </TouchableOpacity>
          <Text style={styles.Event_Content_Header}>We Serve Food For</Text>
          <View style={styles.Home_Carousel}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}>
              {images.map((image, index) => (
                <Image key={index} source={image} style={styles.image} />
              ))}
            </Animated.ScrollView>
            <View style={styles.indicatorContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.Best_Food_Container}>
            <Text style={styles.Section_Title}>Our Specials :</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Food_SpecData.map(FoodItem => (
                <View key={FoodItem.Id}>
                  <Card style={styles.FoodItem_Card}>
                    <Image source={FoodItem.Img} style={styles.FoodItem_Img} />
                    <Text numberOfLines={1} style={styles.FoodItem_Name}>{FoodItem.Name}</Text>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.Best_Caters_Container}>
          <Text style={styles.Section_Title}>Best Caterers:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Best_CatersData.map((CaterItem)=>(
                <View key={CaterItem.Id}>
                  <Card style={styles.Best_Caters_Card}>
                    <Image source={CaterItem.Img} style={styles.Best_Caterers_Img}/>
                    <Text style={styles.Cater_Name}>{CaterItem.Name}</Text>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
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
    backgroundColor: '#fff',
    margin: 5,
    borderColor: '#3498db',
    borderWidth: 0.2,
  },
  Event_Name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: '5%',
  },

  // carousel content
  image: {
    width: width - 30,
    height: 220,
    marginHorizontal: 10,
    // borderRadius: 10,
    objectFit: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#389590',
  },
  Home_Carousel: {
    marginTop: 20,
  },

  //Food Spec
  Best_Food_Container:{
    marginTop:20
  },
  Section_Title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
    margin:10
  },
  FoodItem_Card: {
    marginRight: 10,
    marginBottom:10,
    backgroundColor:'#fff',
    marginLeft:10
  },
  FoodItem_Img: {
    width: 100,
    height: 100,
    borderRadius:10
  },
  FoodItem_Name:{
    margin:5,
    fontSize:12,
    fontWeight:'bold',
    color:'#000',
    width:80,
  },

  //Best Caterers
  Best_Caterers_Img:{
    width:200,
    height:100,
    borderRadius:10
  },
  Best_Caters_Card:{
    margin:10,
    backgroundColor:'#ffff'
  },
  Cater_Name:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000',
    margin:5
  }
});

export default EventPage;
