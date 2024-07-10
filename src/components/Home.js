import React,{useRef,useState,useEffect} from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Animated, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width} = Dimensions.get('window');

const filtersList = [
  {
    id:1,
    Lable:'Filter',
    icon:require('../assets/icon/homeFilters/filters.png')
  },
  {
    id:2,
    Lable:'Sort by',
    icon:require('../assets/icon/homeFilters/sort.png')
  },
  {
    id:3,
    Lable:'Top Rated',
    icon:require('../assets/icon/homeFilters/toprated.png')
  },
  {
    id:4,
    Lable:'Popular Locations',
    icon:require('../assets/icon/homeFilters/f_location.png')
  },
  {
    id:5,
    Lable:'Popular Dishes',
    icon:''
  },
  {
    id:6,
    Lable:'Popular Deserts',
    icon:''
  },
  {
    id:7,
    Lable:'Popular Regional Dishes',
    icon:''
  },
]

const Popular_Caters = [
  {
    Id:1,
    Img:require('../assets/images/homeCaters/Img_1.jpg'),
    Lable:'Bawarchi',
    Location:'RTC X Roads',
    Offers:'Flat 25% Off'
  },
  {
    Id:2,
    Img:require('../assets/images/homeCaters/Img_2.jpg'),
    Lable:'Paradise',
    Location:'Charminar',
    Offers:'Flat 45% Off'
  },
  {
    Id:3,
    Img:require('../assets/images/homeCaters/Img_3.jpg'),
    Lable:'Grand Hotel',
    Location:'Abids',
    Offers:'Flat 37% Off'
  },
  {
    Id:4,
    Img:require('../assets/images/homeCaters/Img_4.jpg'),
    Lable:'Palamuru Grills',
    Location:'Hitech City',
    Offers:'Flat 10% Off'
  }
]

const Explore_Items =[
  {
    Id:1,
    Img:require('../assets/icon/homeFilters/regularFood/plate_1.png'),
    Lable:'Chicken Biryani'
  },
  {
    Id:2,
    Img:require('../assets/icon/homeFilters/regularFood/plate_2.png'),
    Lable:'Panner Biryani'
  },
  {
    Id:3,
    Img:require('../assets/icon/homeFilters/regularFood/plate_3.png'),
    Lable:'Motton Biryani'
  },
  {
    Id:4,
    Img:require('../assets/icon/homeFilters/regularFood/plate_4.png'),
    Lable:'Veg Biryani'
  },
]

const Popular_Items = [
  {
    Id:1,
    Img:require('../assets/icon/homeFilters/regularFood/plate_1.png'),
    Lable:'Chicken Biryani',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:2,
    Img:require('../assets/icon/homeFilters/regularFood/plate_2.png'),
    Lable:'Panner Biryani',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:3,
    Img:require('../assets/icon/homeFilters/regularFood/plate_3.png'),
    Lable:'Motton Biryani',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:4,
    Img:require('../assets/icon/homeFilters/regularFood/plate_4.png'),
    Lable:'Veg Biryani',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
]

const Popular_Locations =[
  {
    Id:1,
    Lable:'Madhapur',
    bgColor:'#E74C3C'
  },
  {
    Id:2,
    Lable:'RTC X Roads',
     bgColor:'#9B59B6'
  },
  {
    Id:3,
    Lable:'Gachibowli',
     bgColor:'#2980B9'
  },
  {
    Id:4,
    Lable:'Uppal',
     bgColor:'#1ABC9C'
  },
  {
    Id:5,
    Lable:'Nagole',
     bgColor:'#2ECC71'
  },
  {
    Id:6,
    Lable:'Inorbit Mall',
    bgColor:'#F39C12'
  }
]




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

  const handleUserSignIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    if (token && userId) {
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View  style={styles.Container}>
      <ScrollView contentContainerStyle={styles.ContainerContent} showsVerticalScrollIndicator={false}>

        <View style={styles.Home_Header}>
          <View style={styles.Home_Header_Address}>
            <View style={styles.Home_Location_Icon_Content}>
              <Image source={require('../assets/icon/Home_Loca_Icon.png')} style={styles.Home_Header_Loaction_Icon}/>
            </View>
            <TouchableOpacity style={styles.Home_Location_Text_Content} onPress={()=>navigation.navigate('Location')}>
              <Text style={styles.Home_Location_Text}>Home</Text>
              <Text style={styles.Home_Location_Sub_Text} numberOfLines={1} ellipsizeMode='tail'>5-74,Arunodaya coloney,Jaihind Enclave,Madhapur,Hyd,500088</Text>
            </TouchableOpacity>
            <View style={styles.Home_Header_User}>
                <TouchableOpacity onPress={handleUserSignIn}>
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
            <TouchableOpacity style={styles.Home_Categories_Card} onPress={()=>navigation.navigate('EventPage')}>
              <Image source={require('../assets/images/home_categories/selectchef.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/HomeFood.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Home Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/FoodTruck.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Food On Wheels</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.H_F_Explore_Containter}>
            <View style={styles.H_F_E_Item}>
              <View style={styles.Horizontal_Line}/>
              <Text style={styles.H_F_E_Item_Header}>Explore Competencies</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Explore_Items.map((E_I_Item) => (
                  <View key={E_I_Item.Id} style={styles.H_F_E_Item_Header_List}>
                    <Image source={E_I_Item.Img} style={styles.H_F_E_Item_Header_Img}/>
                    <Text style={styles.H_F_E_Item_Header_Title}>{E_I_Item.Lable}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
        </View>
        <View style={styles.Home_Filters_Container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filtersList.map((filItem,filIndex)=>(
              <TouchableOpacity key={filIndex} style={styles.H_F_Card}>
                  <Text style={styles.H_F_Title}>{filItem.Lable}</Text>
                  <Image source={filItem.icon} style={styles.H_F_Icon}/>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.Home_Popular_Container}>
          <View style={styles.H_P_Caters_Content}>
            <View style={styles.H_P_C_Header}>
              <View style={styles.Horizontal_Line}/>  
              <Text style={styles.H_P_C_Header_Title}>Popular Cateres</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Popular_Caters.map((P_Caters) => (
                <View key={P_Caters.Id} style={{ borderRadius: 10, overflow: 'hidden', margin: 5 }}>
                  <ImageBackground style={[styles.H_P_C_Card, { borderRadius: 10 }]} imageStyle={{ borderRadius: 10 }} source={P_Caters.Img}>
                    <LinearGradient colors={['#0000', '#17202A']} style={styles.H_P_C_CardBody}>
                      <Text style={styles.H_P_C_Offers}>{P_Caters.Offers}</Text>
                      <Text style={styles.H_P_C_Name}>{P_Caters.Lable}</Text>
                      <Text style={styles.H_P_C_Location}>{P_Caters.Location}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.H_P_Items_Content}>
            <View style={styles.H_P_Items_Header}>
              <View style={styles.Horizontal_Line}/>
              <Text style={styles.H_P_I_Header_Title}>Popular Items</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Popular_Items.map((P_Item) => (
                <LinearGradient colors={['#FCF3CF', '#ffff']} key={P_Item.Id} style={styles.H_P_I_Card}>
                  <TouchableOpacity style={styles.H_P_I_Add}>
                    <Image source={require('../assets/icon/homeFilters/add.png')} style={styles.H_P_I_Add_Icon} />
                  </TouchableOpacity>
                  <View style={styles.H_P_I_CardBody}>
                    <Text style={styles.H_P_I_Title}>{P_Item.Lable}</Text>
                    <Image source={P_Item.Img} style={styles.H_P_I_Img} />
                    <View style={styles.H_P_I_Rating}>
                      {Array(5).fill().map((_, rateIndex) => (
                        <Image key={rateIndex} source={P_Item.RatingIcon} style={styles.H_P_I_RatingIcon} />
                      ))}
                    </View>
                  </View>
                  <View style={styles.H_P_I_Card_Footer_Content}>
                    <View style={styles.H_P_I_Like_Share_Price}>
                      <TouchableOpacity style={styles.H_P_I_Like_Share}>
                        <Image source={require('../assets/icon/homeFilters/fevr.png')} style={styles.H_P_I_Like}/>
                        <Image source={require('../assets/icon/homeFilters/share.png')} style={styles.H_P_I_Share}/>
                      </TouchableOpacity>
                      <View style={styles.H_P_Price_Content}>
                        <Image source={require('../assets/icon/homeFilters/rupee.png')} style={styles.H_P_Price_Icon}/>
                        <Text style={styles.H_P_Price_Text}>270</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </ScrollView>
          </View>
          <View style={styles.H_P_Locations_Content}>
            <View style={styles.H_P_Locations_Header}>
              <View style={styles.Horizontal_Line}/>
              <Text style={styles.H_P_L_Header_Title}>Popular Locations</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Popular_Locations.map((P_Location)=>(
                <View key={P_Location.Id} style={[styles.H_P_L_Card,{backgroundColor:P_Location.bgColor}]}>
                  <Text style={styles.H_P_L_Title}>{P_Location.Lable}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.H_P_Caters_Content}>
            <View style={styles.H_P_C_Header}>
              <View style={styles.Horizontal_Line}/>  
              <Text style={styles.H_P_C_Header_Title}>Popular Home Food</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Popular_Caters.map((P_Caters) => (
                <View key={P_Caters.Id} style={{ borderRadius: 10, overflow: 'hidden', margin: 5 }}>
                  <ImageBackground style={[styles.H_P_C_Card, { borderRadius: 10 }]} imageStyle={{ borderRadius: 10 }} source={P_Caters.Img}>
                    <LinearGradient colors={['#0000', '#17202A']} style={styles.H_P_C_CardBody}>
                      <Text style={styles.H_P_C_Offers}>{P_Caters.Offers}</Text>
                      <Text style={styles.H_P_C_Name}>{P_Caters.Lable}</Text>
                      <Text style={styles.H_P_C_Location}>{P_Caters.Location}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
          </View>
        </View> 
      </ScrollView> 
      {/* <View style={styles.Home_App_Footer}>
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
      </View> */}
    </View>
  )
}


const styles = StyleSheet.create({
  Container:{
    backgroundColor:'#ffff'
  },
  Home_Header:{
    padding:20,
    // backgroundColor:'#FFF0C8',
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
    width:'80%',
  },
  Home_Location_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#D48B35'
  },
  Home_Location_Sub_Text:{
    fontSize:10,
    fontWeight:'bold',
    width:'80%'
  },
  Home_Header_User_Img:{
    width:40,
    height:40,
    borderRadius:50,
    objectFit:'cover',
    borderWidth:1,
    borderColor:'#FFCD78',
  },

  //search 
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

  //filters
  Home_Filters_Container:{
    margin:15
  },
  H_F_Card:{
    display:'flex',
    alignItems:'center',
    gap:5,
    flexDirection:'row',
    borderWidth:1,
    borderRadius:50,
    borderColor:'#ECECEC',
    padding:10,
    margin:5
  },
  H_F_Title:{
    fontSize:15,
    color:'#272727'
  },
  H_F_Icon:{
    width:15,
    height:15
  },

  // Explore content
  H_F_Explore_Containter:{
    margin:20
  },
  H_F_E_Item_Header:{
    fontSize:14,
    textTransform:'capitalize',
    color:'#272727',
    fontWeight:'bold',
    position:'absolute',
    top:-12,
    backgroundColor:'#ffff',
    paddingRight:5
  },
  H_F_E_Item_Header_List:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginRight:15,
    marginTop:20
  },
  Horizontal_Line:{
    flex:1,
    height:1,
    backgroundColor:"#9f9f9f"
  },
  H_F_E_Item_Header_Img:{
    width:85,
    height:100
  },

  //popular content
  Home_Popular_Container:{
    margin:20
  },

  //Caters
  H_P_C_Header_Title:{
    fontSize:14,
    textTransform:'capitalize',
    color:'#272727',
    fontWeight:'bold',
    position:'absolute',
    top:-12,
    backgroundColor:'#ffff',
    paddingRight:5
  },
  H_P_C_Card:{
    width:250,
    height:150,
    marginTop:20,
    marginLeft:0,
    marginBottom:30
  },
  H_P_C_CardBody:{
    position:'absolute',
    bottom:0,
    width:230,
    margin:5,
    padding:10
  },
  H_P_C_Offers:{
    fontSize:20,
    fontWeight:'bold',
    color:'#F1C40F',
  },
  H_P_C_Name:{
    fontSize:20,
    fontWeight:'bold',
    color:'#ffff',
  },
  H_P_C_Location:{
    fontSize:10,
    fontWeight:'bold',
    color:'#ffff',
  },

  //Items
  H_P_I_Card:{
    marginTop:20,
    marginRight:10,
    marginBottom:30,
    padding: 10,
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:200
  },
  H_P_I_Add:{
    backgroundColor:"#ffff",
    position:'absolute',
    padding:5,
    right:0,
    margin:3,
    borderRadius:50
  },
  H_P_I_Header_Title:{
    fontSize:14,
    textTransform:'capitalize',
    color:'#272727',
    fontWeight:'bold',
    position:'absolute',
    top:-12,
    backgroundColor:'#ffff',
    paddingRight:5
  },
  H_P_I_Add_Icon:{
    width:12,
    height:12,
  },
  H_P_I_CardBody:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  H_P_I_Title:{
    color:'#272727',
    fontWeight:'bold',
  },

  H_P_I_Img:{
    width:120,
    height:120
  },
  H_P_I_Rating:{
    flexDirection:'row',
    gap:3,
    alignItems:'center',
    justifyContent:'center'
  },
  H_P_I_RatingIcon:{
    width:10,
    height:10
  },
  H_P_I_Card_Footer_Content:{
    borderTopColor:'#cccc',
    borderTopWidth:1,
    marginTop:10
  },
  H_P_I_Like_Share_Price:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  H_P_I_Like_Share:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    paddingTop:10
  },
  H_P_I_Like:{
    width:15,
    height:15
  },
  H_P_I_Share:{
    width:15,
    height:15
  },
  H_P_Price_Content:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center',
  },
  H_P_Price_Icon:{
    width:13,
    height:13
  },
  H_P_Price_Text:{
    fontSize:15,
    color:'#272727',
    fontWeight:'bold'
  },

  //Locations
  H_P_Locations_Content:{
    marginTop:20,
    marginBottom:30
  },
  H_P_L_Header_Title:{
    fontSize:14,
    textTransform:'capitalize',
    color:'#272727',
    fontWeight:'bold',
    position:'absolute',
    top:-12,
    backgroundColor:'#ffff',
    paddingRight:5
  },
  H_P_L_Card:{
    height: 100,
    width: 100, // Added width for better visibility
    backgroundColor: '#f4f4f4', // Added background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    justifyContent: 'center', // Centering text
    alignItems: 'center', // Centering text
    borderRadius:5,
    margin:20,
    marginLeft:0,
  },
  H_P_L_Title:{
    fontSize:15,
    fontWeight:'900',
    color:'#ffff'
  }



  // Home_App_Footer:{
  //   display:'flex',
  //   position:'absolute',
  //   flexDirection:'row',
  //   backgroundColor:'#ffff',
  //   width:420,
  //   padding:20,
  //   bottom:0,
  //   justifyContent:'space-around',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5, // for Android
  // },
  // Home_App_Footer_Content:{
  //   display:'flex',
  //   justifyContent:'center',
  //   alignItems:'center',
  //   flexDirection:'column'
  // },
  // Home_App_Footer_Icon:{
  //   width:20,
  //   height:20,
  //   objectFit:'cover',
  // }
})

export default Home
