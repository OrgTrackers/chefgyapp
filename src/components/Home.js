import React,{useRef,useState,useEffect} from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const {width} = Dimensions.get('window');

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const images = [
    require('../assets/images/Home_Chef_Banner.jpg'),
    require('../assets/images/Home_Cater_Banner.jpg'),
    require('../assets/images/Home_Food_Truck.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
  }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );



  return (
    <View  style={styles.Container}>
      <ScrollView contentContainerStyle={styles.ContainerContent}>
        <View style={styles.Home_Header}>
          <View style={styles.Home_Header_Address}>
            <View style={styles.Home_Location_Icon_Content}>
              <Image source={require('../assets/icon/Home_Loca_Icon.png')} style={styles.Home_Header_Loaction_Icon}/>
            </View>
            <View style={styles.Home_Location_Text_Content}>
              <Text style={styles.Home_Location_Text}>Home</Text>
              <Text style={styles.Home_Location_Sub_Text}>5-74,Arunodaya coloney,Jaihind Enclave,Madhapur,Hyd,500088</Text>
            </View>
            <View style={styles.Home_Header_User}>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                  <Image source={require('../assets/images/user.jpg')} style={styles.Home_Header_User_Img}/>
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.Home_Search}>
          <Image source={require('../assets/images/search_Img.png')} style={styles.Home_Search_Iocn}/>
          <TextInput placeholder='What are you looking for ?' style={styles.Home_Search_Input}></TextInput>
        </View>
        <View style={styles.Home_Carousel}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
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
                  currentIndex === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        </View>
        <View style={styles.Home_Categories}>
          <View style={styles.Home_Categories_Grid}>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/selectCaterer.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Caterers</Text>
            </View>
            <TouchableOpacity style={styles.Home_Categories_Card} onPress={()=>navigation.navigate('EventPage')}>
              <Image source={require('../assets/images/home_categories/selectchef.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Chef</Text>
            </TouchableOpacity>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/FoodTruck.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Food On Wheels</Text>
            </View>
          </View>
          <View style={styles.Home_Categories_Grid}>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/HomeFood.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Home Food</Text>
            </View>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/starters.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Starters</Text>
            </View>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/soup.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Soups</Text>
            </View>
          </View>
        </View>
        <View style={styles.Home_Popular}>
          <View style={styles.Home_Popular_Header}>
            <Image source={require('../assets/icon/popular.png')} style={styles.Home_Popular_Header_Icon}/>
            <Text style={styles.Home_Popular_Header_Text}>Popular</Text>
          </View>
          <View style={styles.Home_Popular_Content}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.Home_Popular_Chef_Card_Content}>
              <View style={styles.Home_Chef_Popular_Card}>
                <Image source={require('../assets/images/chefProfile.jpg')} style={styles.Home_Chef_Popular_Image}/>
                <Text style={styles.Home_Popular_Chef_Name}>Mc.Danial</Text>
                <View style={styles.Home_Popular_Chef_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Chef_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Bookings_Text}>Booking : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Chef_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Chef_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Offers}>
                  <Text style={styles.Home_Popular_Chef_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>      
              <View style={styles.Home_Chef_Popular_Card}>
                <Image source={require('../assets/images/chefProfile.jpg')} style={styles.Home_Chef_Popular_Image}/>
                <Text style={styles.Home_Popular_Chef_Name}>Mc.Danial</Text>
                <View style={styles.Home_Popular_Chef_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Chef_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Bookings_Text}>Booking : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Chef_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Chef_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Offers}>
                  <Text style={styles.Home_Popular_Chef_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>  
              <View style={styles.Home_Chef_Popular_Card}>
                <Image source={require('../assets/images/chefProfile.jpg')} style={styles.Home_Chef_Popular_Image}/>
                <Text style={styles.Home_Popular_Chef_Name}>Mc.Danial</Text>
                <View style={styles.Home_Popular_Chef_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Chef_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Bookings_Text}>Booking : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Chef_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Chef_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Offers}>
                  <Text style={styles.Home_Popular_Chef_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>
              <View style={styles.Home_Chef_Popular_Card}>
                <Image source={require('../assets/images/chefProfile.jpg')} style={styles.Home_Chef_Popular_Image}/>
                <Text style={styles.Home_Popular_Chef_Name}>Mc.Danial</Text>
                <View style={styles.Home_Popular_Chef_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Chef_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Bookings_Text}>Booking : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Chef_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Chef_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Chef_Offers}>
                  <Text style={styles.Home_Popular_Chef_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>    
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.Home_Popular_Cater_Card_Content}>
              <View style={styles.Home_Cater_Popular_Card}>
                <Image source={require('../assets/images/Home_Cater_Banner.jpg')} style={styles.Home_Cater_Popular_Image}/>
                <Text style={styles.Home_Popular_Cater_Name}>Hotel Taj</Text>
                <View style={styles.Home_Popular_Cater_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Cater_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Bookings_Text}>Served : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Cater_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Cater_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Offers}>
                  <Text style={styles.Home_Popular_Cater_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>
              <View style={styles.Home_Cater_Popular_Card}>
                <Image source={require('../assets/images/Home_Cater_Banner.jpg')} style={styles.Home_Cater_Popular_Image}/>
                <Text style={styles.Home_Popular_Cater_Name}>Hotel Taj</Text>
                <View style={styles.Home_Popular_Cater_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Cater_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Bookings_Text}>Served : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Cater_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Cater_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Offers}>
                  <Text style={styles.Home_Popular_Cater_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>
              <View style={styles.Home_Cater_Popular_Card}>
                <Image source={require('../assets/images/Home_Cater_Banner.jpg')} style={styles.Home_Cater_Popular_Image}/>
                <Text style={styles.Home_Popular_Cater_Name}>Hotel Taj</Text>
                <View style={styles.Home_Popular_Cater_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Cater_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Bookings_Text}>Served : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Cater_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Cater_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Offers}>
                  <Text style={styles.Home_Popular_Cater_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>
              <View style={styles.Home_Cater_Popular_Card}>
                <Image source={require('../assets/images/Home_Cater_Banner.jpg')} style={styles.Home_Cater_Popular_Image}/>
                <Text style={styles.Home_Popular_Cater_Name}>Hotel Taj</Text>
                <View style={styles.Home_Popular_Cater_Bookings}>
                  <Image  source={require('../assets/icon/bookings.png')} style={styles.Home_Popular_Cater_Bookings_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Bookings_Text}>Served : 120k</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Ratings}>
                  <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Cater_Rating_Icon}/>
                  <Text style={styles.Home_Popular_Chef_Rating_Text}>4.8/5</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Likes}>
                  <Image source={require('../assets/icon/like.png')} style={styles.Home_Popular_Cater_Likes_Icon}/>
                  <Text style={styles.Home_Popular_Cater_Likes_Text}>1.3M</Text>
                </View>
                <View style={styles.Home_Popular_Cater_Offers}>
                  <Text style={styles.Home_Popular_Cater_Offers_Text}>UP TO 70% OFF</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView> 
      <View style={styles.Home_App_Footer}>
        <View style={styles.Home_App_Footer_Content}>
          <Image source={require('../assets/icon/home.png')} style={styles.Home_App_Footer_Icon}/>
          <Text>Home</Text>
        </View>
        <View style={styles.Home_App_Footer_Content}>
          <Image source={require('../assets/icon/location.png')} style={styles.Home_App_Footer_Icon}/>
          <Text>Near by</Text>
        </View>
        <View style={styles.Home_App_Footer_Content}>
          <Image source={require('../assets/icon/trolley.png')} style={styles.Home_App_Footer_Icon}/>
          <Text>Cart</Text>
        </View>
        <View style={styles.Home_App_Footer_Content}>
          <Image source={require('../assets/icon/user.png')} style={styles.Home_App_Footer_Icon}/>
          <Text>Account</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  Container:{
    backgroundColor:'#ffff'
  },
  Home_Header:{
    padding:20,
    backgroundColor:'#FFF0C8',
    height:100
  },
  Home_Header_Address:{
    display:'flex',
    gap:10,
    alignItems:'center',
    flexDirection:'row'
  },
  Home_Header_Loaction_Icon:{
    width:20,
    height:25
  },
  Home_Location_Text_Content:{
    width:'80%'
  },
  Home_Location_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#272727',
  },
  Home_Location_Sub_Text:{
    fontSize:10,
    fontWeight:'bold'
  },
  Home_Header_User_Img:{
    width:40,
    height:40,
    borderRadius:50,
    objectFit:'cover',
    borderWidth:1,
    borderColor:'#FFCD78',
  },
  Home_Search:{
    marginLeft:15,
    marginRight:15,
    marginTop:-20
  },
  Home_Search_Input:{
    paddingLeft:40,
    backgroundColor:'#ffff',
    borderRadius:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    height:40,
    fontSize:12
  },
  Home_Search_Iocn:{
    width:20,
    height:20,
    position:'absolute',
    left:8,
    top:10,
    zIndex:3
  },

  // carousel content
  image: {
    width: width - 40,
    height: 150,
    marginHorizontal: 20,
    borderRadius:10
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
    backgroundColor: '#FFF0C8',
  },
  Home_Carousel:{
    marginTop:20
  },


  //home categories
  Home_Categories:{
    margin:5,
    marginTop:20
  },
  Home_Categories_Grid:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:30
  },
  Home_Categories_Card:{
    height: 80,
    width: 100, // Added width for better visibility
    backgroundColor: '#f4f4f4', // Added background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    justifyContent: 'center', // Centering text
    alignItems: 'center', // Centering text
    borderRadius:5
  },
  Home_Categories_Card_Title:{
    marginTop:5,
    marginBottom:5,
    fontSize:12
  },
  Home_Categories_Card_Img:{
    width:40,
    height:40,
    objectFit:'cover',
    resizeMode:'contain'
  },


  //popular content
  Home_Popular:{
    margin:20,
    height:750,
  },
  Home_Popular_Header:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  Home_Popular_Header_Icon:{
    width:20,
    height:20
  },
  Home_Popular_Header_Text:{
    color:'#272727',
    fontSize:17,
    fontWeight:'bold'
  },
  Home_Popular_Content:{
    borderRightWidth:2,
    borderRightColor:'#FFF0C8'
  },


  // Popular chef's
  Home_Popular_Chef_Card_Content:{
    flexDirection:'row',
    gap:10
  },
  Home_Chef_Popular_Card:{
    width: 180,
    height: 300,
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    marginRight:10,
    marginTop:20,
    marginBottom:10,
    marginLeft:5
  },
  Home_Chef_Popular_Image:{
    width:180,
    height:180,
    objectFit:'fill',
    borderRadius:10
  },
  Home_Popular_Chef_Name:{
    fontSize:20,
    fontWeight:'bold',
    color:'#272727',
    marginLeft:5
  },

  Home_Popular_Chef_Bookings:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Chef_Bookings_Icon:{
    width:20,
    height:20
  },
  Home_Popular_Chef_Bookings_Text:{
    marginLeft:5,
    fontWeight:'bold'
  },
  Home_Popular_Chef_Ratings:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Chef_Rating_Icon:{
    width:15,
    height:15
  },
  Home_Popular_Chef_Rating_Text:{
    marginLeft:10,
    fontWeight:'bold'
  },
  Home_Popular_Chef_Likes:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Chef_Likes_Icon:{
    width:15,
    height:15
  },
  Home_Popular_Chef_Likes_Text:{
    marginLeft:10,
    fontWeight:'bold'
  },
  Home_Popular_Chef_Offers:{
    position:'absolute',
    bottom:2,
    right:0,
    backgroundColor:'#F1C40F',
    zIndex:1,
    padding:5,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  Home_Popular_Chef_Offers_Text:{
    fontSize:12,
    fontWeight:'bold',
    color:'#ffff'
  },





  // Popular caters
  Home_Popular_Cater_Card_Content:{
    flexDirection:'row',
    gap:10
  },
  Home_Cater_Popular_Card:{
    width: 180,
    height: 300,
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    marginRight:10,
    marginTop:20,
    marginBottom:10,
    marginLeft:5
  },
  Home_Cater_Popular_Image:{
    width:180,
    height:180,
    objectFit:'fill',
    borderRadius:10
  },
  Home_Popular_Cater_Name:{
    fontSize:20,
    fontWeight:'bold',
    color:'#272727',
  },
  Home_Popular_Cater_Bookings:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Cater_Bookings_Icon:{
    width:20,
    height:20
  },
  Home_Popular_Cater_Bookings_Text:{
    marginLeft:5,
    fontWeight:'bold'
  },
  Home_Popular_Cater_Ratings:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Cater_Rating_Icon:{
    width:15,
    height:15
  },
  Home_Popular_Cater_Rating_Text:{
    marginLeft:10,
    fontWeight:'bold'
  },
  Home_Popular_Cater_Likes:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  Home_Popular_Cater_Likes_Icon:{
    width:15,
    height:15
  },
  Home_Popular_Cater_Likes_Text:{
    marginLeft:10,
    fontWeight:'bold'
  },
  Home_Popular_Cater_Offers:{
    position:'absolute',
    bottom:2,
    right:0,
    backgroundColor:'#F1C40F',
    zIndex:1,
    padding:5,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10
  },
  Home_Popular_Cater_Offers_Text:{
    fontSize:12,
    fontWeight:'bold',
    color:'#ffff'
  },






  Home_App_Footer:{
    display:'flex',
    position:'absolute',
    flexDirection:'row',
    backgroundColor:'#ffff',
    width:420,
    padding:20,
    bottom:0,
    justifyContent:'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  Home_App_Footer_Content:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  Home_App_Footer_Icon:{
    width:20,
    height:20,
    objectFit:'cover',
  }
})

export default Home
