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
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

import {globalStyle} from '../assets/styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';

const {width} = Dimensions.get('window');

const App_Cate = [
  {
    Id: 1,
    Img: require('../assets/Updated/images/HCU2.png'),
    Lable: 'Caters',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 2,
    Img: require('../assets/Updated/images/HCU1.png'),
    Lable: 'Chef',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 3,
    Img: require('../assets/Updated/images/HCU3.png'),
    Lable: 'Home Food',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 4,
    Img: require('../assets/Updated/images/HCU4.png'),
    Lable: 'Food Truck',
    Offers: 'UPTO 20% OFF',
  },
];

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 30};

  const images = [
    require('../assets/Updated/images/HCU2.png'),
    require('../assets/Updated/images/HCU1.png'),
    require('../assets/Updated/images/HCU3.png'),
    require('../assets/Updated/images/HCU4.png'),
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

  const handleUserSignIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    if (token && userId) {
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('Login');
    }
  };

  const handleNavigation = label => {
    switch (label) {
      case 'Caters':
        navigation.navigate('EventPage');
        break;
      case 'Chef':
        navigation.navigate('ChefFilters');
        break;
      case 'Home Food':
        navigation.navigate('HomeFoodFilters');
        break;
      case 'Food Truck':
        navigation.navigate('FoodTruckFilters');
        break;
      default:
        break;
    }
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <View style={styles.homePage_Header_Container}>
          <View style={styles.Location_Container}>
            <Ionicons name="location" color="#FFCD78" size={30} />
            <View style={styles.Location_Content}>
              <Text style={styles.Location_Type}>Home</Text>
              <Text
                style={styles.Location_Text}
                numberOfLines={1}
                ellipsizeMode="tail">
                5-74,Arunodaya coloney,Jaihind Enclave,Madhapur,Hyd,500088
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
            <Image
              source={require('../assets/images/user.jpg')}
              style={styles.Home_Header_User_Img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Search_Container}>
          <Ionicons
            name="search"
            size={20}
            color="#ffff"
            style={styles.SearchIcon}
          />
          <TextInput
            placeholder="Search ..."
            placeholderTextColor="#ffff"
            style={styles.Search_Input}
          />
          <TouchableOpacity onPress={showModal} style={styles.MicIcon}>
            <Ionicons name="mic" size={20} color="#ffff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView
          contentContainerStyle={styles.ContainerContent}
          showsVerticalScrollIndicator={false}>
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
          <View style={styles.Home_Categories_Grid}>
            {App_Cate.map(item => (
              <TouchableOpacity
                key={item.Id}
                style={styles.Home_Categories_Card}
                onPress={() => handleNavigation(item.Lable)}>
                <ImageBackground
                  source={item.Img}
                  style={styles.Home_Select_Images}
                  imageStyle={styles.Home_ImageBackground}
                  resizeMode="cover"></ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.Allow_Mic_Text}>
            Allow Miciophone Access for Voice Search
          </Text>
          <Text>It'll help translate your voice to search within Swiggy</Text>
          <View style={styles.Model_Button_Container}>
            <TouchableOpacity style={styles.Deny_Button} onPress={hideModal}>
              <Text style={styles.Deny_Text}>Deny</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Allow_Button} onPress={hideModal}>
              <Text style={styles.Allow_Text}>Allow</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  homePage_Header_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Location_Type: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  Location_Text: {
    color: '#ffff',
    fontSize: 10,
    width: 200,
  },
  Location_Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //User Image
  Home_Header_User_Img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    objectFit: 'cover',
    borderWidth: 1,
    borderColor: '#FFCD78',
  },

  Search_Container: {
    position: 'relative',
    marginTop: '5%',
  },
  Search_Input: {
    borderRadius: 10,
    borderColor: '#ffff',
    borderWidth: 1,
    height: 40,
    textAlignVertical: 'center',
    paddingLeft: 40,
  },
  SearchIcon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  MicIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  // carousel content
  image: {
    width: width - 40,
    height: 120,
    marginHorizontal: 20,
    borderRadius: 10,
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

  Home_Categories_Grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 100,
  },
  Home_Categories_Card: {
    height: 150,
    width: 150, // Fit two cards per row
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    margin: 5,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Home_Select_Images: {
    width: 150,
    height: 150,
    justifyContent: 'flex-end',
  },
  Home_ImageBackground: {
    borderRadius: 20,
  },

  //Model
  Allow_Mic_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  Model_Button_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  Deny_Button: {
    backgroundColor: '#ebedef',
    width: '45%',
    borderRadius: 10,
    padding: 10,
  },
  Deny_Text: {
    color: '#092844',
    textAlign: 'center',
  },
  Allow_Button: {
    backgroundColor: '#092844',
    width: '45%',
    borderRadius: 10,
    padding: 10,
  },
  Allow_Text: {
    color: '#ffff',
    textAlign: 'center',
  },
});

export default Home;
