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
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path} from 'react-native-svg';
import { HomeFoodEventsScreenStyles } from './HomeFoodEventsScreen.styles';
import { GlobalCss } from '../../../newassets/GlobalStyles/GlobalCss.styles';
import {Card} from 'react-native-paper';

const {width} = Dimensions.get('window');
const Food_SpecData = [
  {
    Id: 1,
    Name: 'Chicken Biryani',
    Img: require('../../../newassets/images/Events/FoodSpec/FS1.webp'),
  },
  {
    Id: 2,
    Name: 'Veg Noodles',
    Img: require('../../../newassets/images/Events/FoodSpec/FS2.webp'),
  },
  {
    Id: 3,
    Name: 'Korean Crab',
    Img: require('../../../newassets/images/Events/FoodSpec/FS3.webp'),
  },
  {
    Id: 4,
    Name: 'Special Chicken Biryani',
    Img: require('../../../newassets/images/Events/FoodSpec/FS4.webp'),
  },
];

const Best_CatersData = [
  {
    Id: 1,
    Img: require('../../../newassets/images/Events/Best_Cater/Restro.webp'),
    Name: 'Venkateswara Mess',
  },
  {
    Id: 2,
    Img: require('../../../newassets/images/Events/Best_Cater/Restro.webp'),
    Name: 'Sri Ragavendra Caters',
  },
  {
    Id: 3,
    Img: require('../../../newassets/images/Events/Best_Cater/Restro.webp'),
    Name: 'New Brown Hotel',
  },
  {
    Id: 4,
    Img: require('../../../newassets/images/Events/Best_Cater/Restro.webp'),
    Name: 'Sairam Hotel And Mess',
  },
];

const HomeFoodEventsScreen = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../../../newassets/images/Events/EV1.webp'),
    require('../../../newassets/images/Events/EV2.webp'),
    require('../../../newassets/images/Events/EV3.webp'),
    require('../../../newassets/images/Events/EV4.webp'),
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current.scrollTo({x: nextIndex * width, animated: true});
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity style={HomeFoodEventsScreenStyles.HeaderContent} onPress={()=>navigation.navigate('HomeScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={HomeFoodEventsScreenStyles.PageName}>Home Food Events</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={HomeFoodEventsScreenStyles.Event_Content_Header}>
          Easy and Hassle-free Booking
        </Text>
        <View style={HomeFoodEventsScreenStyles.Home_Carousel}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={HomeFoodEventsScreenStyles.image}
              />
            ))}
          </Animated.ScrollView>
          <View style={HomeFoodEventsScreenStyles.indicatorContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                    HomeFoodEventsScreenStyles.indicator,
                  currentIndex === index && HomeFoodEventsScreenStyles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>
        <View style={HomeFoodEventsScreenStyles.Best_Food_Container}>
          <Text style={HomeFoodEventsScreenStyles.Section_Title}>Our Specials :</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Food_SpecData.map(FoodItem => (
              <View key={FoodItem.Id}>
                <Card style={HomeFoodEventsScreenStyles.FoodItem_Card}>
                  <Image
                    source={FoodItem.Img}
                    style={HomeFoodEventsScreenStyles.FoodItem_Img}
                  />
                  <Text
                    numberOfLines={1}
                    style={HomeFoodEventsScreenStyles.FoodItem_Name}>
                    {FoodItem.Name}
                  </Text>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={HomeFoodEventsScreenStyles.Best_Caters_Container}>
          <Text style={HomeFoodEventsScreenStyles.Section_Title}>Best Home Food :</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Best_CatersData.map(CaterItem => (
              <View key={CaterItem.Id}>
                <Card style={HomeFoodEventsScreenStyles.Best_Caters_Card}>
                  <Image
                    source={CaterItem.Img}
                    style={HomeFoodEventsScreenStyles.Best_Caterers_Img}
                  />
                  <Text style={HomeFoodEventsScreenStyles.Cater_Name}>
                    {CaterItem.Name}
                  </Text>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <View style={HomeFoodEventsScreenStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
                HomeFoodEventsScreenStyles.BookCaterButton,
              GlobalCss.ThemeBackgroundColor,
            ]} onPress={()=>navigation.navigate('BookHomeFoodScreen')}>
            <Text style={HomeFoodEventsScreenStyles.BookCaterText}>Book Home Food</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeFoodEventsScreen;
