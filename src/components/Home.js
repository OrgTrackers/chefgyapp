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

const {width} = Dimensions.get('window');

const App_Cate = [
  {
    Id: 1,
    Img: require('../assets/Updated/images/H1.png'),
    Lable: 'Caters',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 2,
    Img: require('../assets/Updated/images/H2.png'),
    Lable: 'Chef',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 3,
    Img: require('../assets/Updated/images/H3.png'),
    Lable: 'Home Food',
    Offers: 'UPTO 20% OFF',
  },
  {
    Id: 4,
    Img: require('../assets/Updated/images/H4.png'),
    Lable: 'Food On Wheels',
    Offers: 'UPTO 20% OFF',
  },
];

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const images = [
    require('../assets/Updated/images/Home/Banner-1.png'),
    require('../assets/Updated/images/Home/Banner-2.png'),
    require('../assets/Updated/images/Home/Banner-3.png'),
    require('../assets/Updated/images/Home/Banner-4.png'),
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
      default:
        break;
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Home_Header}>
        <View style={styles.Home_Header_Address}>
          <View style={styles.Home_Location_Icon_Content}>
            <Image
              source={require('../assets/icon/Home_Loca_Icon.png')}
              style={styles.Home_Header_Loaction_Icon}
            />
          </View>
          <TouchableOpacity
            style={styles.Home_Location_Text_Content}
            onPress={() => navigation.navigate('Location')}>
            <Text style={styles.Home_Location_Text}>Home</Text>
            <Text
              style={styles.Home_Location_Sub_Text}
              numberOfLines={1}
              ellipsizeMode="tail">
              5-74,Arunodaya coloney,Jaihind Enclave,Madhapur,Hyd,500088
            </Text>
          </TouchableOpacity>
          <View style={styles.Home_Header_User}>
            <TouchableOpacity onPress={handleUserSignIn}>
              <Image
                source={require('../assets/images/user.jpg')}
                style={styles.Home_Header_User_Img}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Home_Search}>
          <Image
            source={require('../assets/images/search_Img.png')}
            style={styles.Home_Search_Iocn}
          />
          <TextInput
            placeholder="What are you looking for ?"
            placeholderTextColor="#000"
            style={styles.Home_Search_Input}></TextInput>
        </View>
      </View>
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
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#ffff',
    width: '100%',
    height: '100%',
  },
  Home_Header: {
    padding: 20,
    // backgroundColor:'#FFF0C8',
    height: 100,
  },
  Home_Header_Address: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Home_Header_Loaction_Icon: {
    width: 20,
    height: 25,
  },
  Home_Location_Text_Content: {
    width: '80%',
  },
  Home_Location_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D48B35',
  },
  Home_Location_Sub_Text: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '80%',
    color: '#272727',
  },
  Home_Header_User_Img: {
    width: 40,
    height: 40,
    borderRadius: 50,
    objectFit: 'cover',
    borderWidth: 1,
    borderColor: '#FFCD78',
  },

  //search
  Home_Search: {
    marginTop: 20,
    zIndex: 2,
  },
  Home_Search_Input: {
    paddingLeft: 40,
    backgroundColor: '#ffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    height: 40,
    fontSize: 12,
  },
  Home_Search_Iocn: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 8,
    top: 10,
    zIndex: 3,
  },

  ContainerContent: {
    marginTop: 20,
    marginBottom: 20,
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
});

export default Home;
