import React,{useRef,useState,useEffect} from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Animated, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width} = Dimensions.get('window');

const App_Cate = [
  {
    Id:1,
    Img:require('../assets/images/home_categories/H_C_Img_1.jpg'),
    Lable:'Events',
    Offers:'UPTO 20% OFF'
  },
  {
    Id:2,
    Img:require('../assets/images/home_categories/H_C_Img_2.jpg'),
    Lable:'Cloud Kitchen',
    Offers:'UPTO 20% OFF'
  },
  {
    Id:3,
    Img:require('../assets/images/home_categories/H_C_Img_3.jpg'),
    Lable:'Wish Dish',
    Offers:'UPTO 20% OFF'
  },
  {
    Id:4,
    Img:require('../assets/images/home_categories/H_C_Img_4.png'),
    Lable:'Food On Wheels',
    Offers:'UPTO 20% OFF'
  }, 
]
const App_Footer=[
  {
    Id:1,
    Icon:require('../assets/icon/appFooter/Footer_Img_1.png'),
    Lable:'Home',
  },
  {
    Id:2,
    Icon:require('../assets/icon/appFooter/Footer_Img_2.png'),
    Lable:'Caters',
  },
  {
    Id:3,
    Icon:require('../assets/icon/appFooter/Footer_Img_3.png'),
    Lable:'Chef',
  },
  {
    Id:4,
    Icon:require('../assets/icon/appFooter/Footer_Img_4.png'),
    Lable:'Cloud',
  },
  {
    Id:5,
    Icon:require('../assets/icon/appFooter/Footer_Img_5.png'),
    Lable:'On Wheels',
  },
  {
    Id:6,
    Icon:require('../assets/icon/appFooter/Footer_Img_6.png'),
    Lable:'Profile',
  },
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

  const handleNavigation = (label) =>{
    switch(label){
      case 'Events':
        navigation.navigate('EventPage')
      break;

      default:
        break;
    }
  }
  
  return (
    <View  style={styles.Container}>
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
        <View style={styles.Home_Search}>
          <Image source={require('../assets/images/search_Img.png')} style={styles.Home_Search_Iocn}/>
          <TextInput placeholder='What are you looking for ?' style={styles.Home_Search_Input}></TextInput>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.ContainerContent} showsVerticalScrollIndicator={false}>
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
        <View style={styles.Home_Categories_Grid}>
          {App_Cate.map((item) => (
            <TouchableOpacity key={item.Id} style={styles.Home_Categories_Card}
              onPress={() => handleNavigation(item.Lable)}>
              <Image source={item.Img} style={styles.Home_Categories_Card_Image} />
              <Text style={styles.Home_Categories_Card_Label}>{item.Lable}</Text>
              <LinearGradient 
                colors={['#52c234','#061700']}  
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                style={styles.Home_Categories_Card_Offers} 
              >
                <Text style={styles.Home_Categories_Card_Offers_Text}>{item.Offers}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.Home_App_Footer}>
        {App_Footer.map((Footer_Item)=>(
          <View key={Footer_Item.Id} style={styles.Home_App_Footer_Content}>
            <Image source={Footer_Item.Icon} style={styles.Home_App_Footer_Icon}/>
            <Text style={styles.Home_App_Footer_Text} >{Footer_Item.Lable}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  Container:{
    backgroundColor:'#ffff',
    width:'100%',
    height:'100%'
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
    marginTop:20,
    zIndex:2
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

  ContainerContent:{
    marginTop:20,
    marginBottom:20
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


  //categories
  Home_Categories_Grid: {
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop:30
  },
  Home_Categories_Card: {
    height: 200,
    width: '45%', // Adjust width to fit 2 cards per row
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    borderRadius: 30,
    margin: 5, // Add margin for spacing between cards
    marginBottom:20
  },
  Home_Categories_Card_Label: {
    fontSize:18,
    fontWeight:'bold',
    color:'#272727',
    margin:10,
    textTransform:'uppercase'
  },
  Home_Categories_Card_Image: {
    width: '55%',
    height: '55%',
    objectFit:'cover',
    resizeMode:'center',
    position:'absolute',
    bottom:0,
    right:0,
    borderTopLeftRadius:50,
    borderBottomRightRadius:30
  },
  Home_Categories_Card_Offers:{
    width:'75%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    padding:3,
    left:0,
    borderTopRightRadius:50,
    borderBottomRightRadius:10
  },
  Home_Categories_Card_Offers_Text:{
    fontSize:10,
    fontWeight:'bold',
    color:'#ffff'
  },

  //Footer
  Home_App_Footer:{
    display:'flex',
    position:'absolute',
    flexDirection:'row',
    backgroundColor:'#ffff',
    width:'100%',
    padding:20,
    bottom:0,
    justifyContent:'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    borderTopLeftRadius:30,
    borderTopRightRadius:30
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
  },
  Home_App_Footer_Text:{
    color:'#272727',
    fontSize:10,
    fontWeight:'bold'
  }
})

export default Home
