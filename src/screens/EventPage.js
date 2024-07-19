import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput,ImageBackground, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Footer from '../components/Footer'


// const calendar = [
//   { "Day": 'Sun', "Date": 1 },
//   { "Day": 'Mon', "Date": 2 },
//   { "Day": 'Tue', "Date": 3 },
//   { "Day": 'Wed', "Date": 4 },
//   { "Day": 'Thu', "Date": 5 },
//   { "Day": 'Fri', "Date": 6 },
//   { "Day": 'Sat', "Date": 7 },
//   { "Day": 'Sun', "Date": 8 },
//   { "Day": 'Mon', "Date": 9 },
//   { "Day": 'Tue', "Date": 10 },
//   { "Day": 'Wed', "Date": 11 },
//   { "Day": 'Thu', "Date": 12 },
//   { "Day": 'Fri', "Date": 13 },
//   { "Day": 'Sat', "Date": 14 },
//   { "Day": 'Sun', "Date": 15 },
//   { "Day": 'Mon', "Date": 16 },
//   { "Day": 'Tue', "Date": 17 },
//   { "Day": 'Wed', "Date": 18 },
//   { "Day": 'Thu', "Date": 19 },
//   { "Day": 'Fri', "Date": 20 },
//   { "Day": 'Sat', "Date": 21 },
//   { "Day": 'Sun', "Date": 22 },
//   { "Day": 'Mon', "Date": 23 },
//   { "Day": 'Tue', "Date": 24 },
//   { "Day": 'Wed', "Date": 25 },
//   { "Day": 'Thu', "Date": 26 },
//   { "Day": 'Fri', "Date": 27 },
//   { "Day": 'Sat', "Date": 28 },
//   { "Day": 'Sun', "Date": 29 },
//   { "Day": 'Mon', "Date": 30 }
// ];

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
const Popular_Items = [
  {
    Id:1,
    Img:require('../assets/images/homePItems/P_I_Img_1.jpg'),
    Lable:'Burgers',
    Price:200,
    Offers:'UPTO 20% OFF',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:2,
    Img:require('../assets/images/homePItems/P_I_Img_2.jpg'),
    Lable:'Chilli Chicken',
    Price:180,
    Offers:'UPTO 20% OFF',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:3,
    Img:require('../assets/images/homePItems/P_I_Img_3.jpg'),
    Lable:'Sambar Rice',
    Price:180,
    Offers:'UPTO 20% OFF',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:4,
    Img:require('../assets/images/homePItems/P_I_Img_4.jpg'),
    Lable:'French Fries',
    Price:275,
    Offers:'UPTO 20% OFF',
    RatingIcon:require('../assets/icon/homeFilters/rating.png')
  },
  {
    Id:5,
    Img:require('../assets/images/homePItems/P_I_Img_5.jpg'),
    Lable:'Pizzas',
    Price:150,
    Offers:'UPTO 20% OFF',
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
const Popular_Home_Food = [
  {
    Id:1,
    Img:require('../assets/images/homeCaters/Home_Img_1.png'),
    Lable:'Ayyapa Home Foods',
    Location:'RTC X Roads',
    Offers:'Flat 25% Off'
  },
  {
    Id:2,
    Img:require('../assets/images/homeCaters/Home_Img_2.jpg'),
    Lable:'Kali Home Foods',
    Location:'Uppal',
    Offers:'Flat 25% Off'
  },
  {
    Id:3,
    Img:require('../assets/images/homeCaters/Home_Img_3.jpg'),
    Lable:'Aaryavysya Home Foods',
    Location:'Nagole',
    Offers:'Flat 25% Off'
  },
  {
    Id:4,
    Img:require('../assets/images/homeCaters/Home_Img_4.jpg'),
    Lable:'Lila Local Food',
    Location:'Ambberpet',
    Offers:'Flat 25% Off'
  },
  {
    Id:5,
    Img:require('../assets/images/homeCaters/Home_Img_5.jpg'),
    Lable:'New Home Foods',
    Location:'Vijaya Amma Foods',
    Offers:'Flat 25% Off'
  },
]

const EventPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Event_Container}>
      <ScrollView style={styles.Events_Content} showsVerticalScrollIndicator={false}>
        <View style={styles.Events_Header}>
          <TouchableOpacity  onPress={()=>navigation.navigate('Home')}>
            <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Home_Icon}/>
          </TouchableOpacity>
          <Text style={styles.Events_Header_Text}>Events</Text>
          <TouchableOpacity style={styles.Events_Notifications}>
            <Image source={require('../assets/icon/notification.png')} style={styles.Events_Notifications_Icon}/>
            <Text style={styles.Events_Notifications_Text}>5</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Home_Search}>
          <Image source={require('../assets/images/search_Img.png')} style={styles.Home_Search_Iocn}/>
          <TextInput placeholder='What are you looking for ?' style={styles.Home_Search_Input}></TextInput>
        </View>
        {/* <View style={styles.Calendar_Container}>
          <Text style={styles.Calendar_Content_Text}>05-07 (2 Days) January ,2024</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.Calendar_Content}>
            {calendar.map((Dateitem,index)=>(
              <View key={index} style={styles.Date_Card}>
                <Text style={styles.Date_Card_Day}>{Dateitem.Day}</Text>
                <Text style={styles.Date_Card_Date}>{Dateitem.Date}</Text>
              </View>
            ))} 
          </ScrollView>
        </View>
        <View style={styles.Events_Categories}>
          <Text style={styles.Events_Categories_Header_Text}>
            Today's Menu
            <Image source={require('../assets/icon/EventsMenu.png')} style={styles.Events_Categories_Header_Icon}/>
          </Text>
          <View style={styles.Events_Categories_Content}>
            <TouchableOpacity style={styles.Events_Categories_Card} >
              <Image source={require('../assets/images/home_categories/breakfast.png')} style={styles.Events_Categories_Image}/>
              <Text style={styles.Events_Categories_Title}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Events_Categories_Card} onPress={()=>navigation.navigate('CaterMenu')}>
              <Image source={require('../assets/images/home_categories/lunch.png')} style={styles.Events_Categories_Image}/>
              <Text style={styles.Events_Categories_Title}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Events_Categories_Card}>
              <Image source={require('../assets/images/home_categories/dinner.png')} style={styles.Events_Categories_Image}/>
              <Text style={styles.Events_Categories_Title}>Dinner</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <LinearGradient     
          colors={['#52c234','#061700']}  
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }}   
          style={styles.BookCater_Btn}>
          <TouchableOpacity onPress={()=> navigation.navigate("BookCateres")}>
            <Text style={styles.BookCater_Btn_Text}> BOOK A CATERER </Text> 
          </TouchableOpacity>
        </LinearGradient>
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
              {Popular_Items.map((P_Items)=>(
                <TouchableOpacity key={P_Items.Id} style={{ borderRadius: 10, overflow: 'hidden', margin: 5 }}>
                  <ImageBackground source={P_Items.Img} style={[styles.H_P_I_Card, { borderRadius: 10 }]} imageStyle={{ borderRadius: 10 }}>
                    <LinearGradient colors={['#0000', '#17202A']} style={styles.H_P_I_Price_Content}>
                      <View style={styles.H_P_I_Price_Icon_Content}>
                        <Text style={styles.H_P_I_Offers_Text}>{P_Items.Offers}</Text>
                      </View>
                      <TouchableOpacity style={styles.H_P_I_Like}>
                        <Image source={require('../assets/images/homePItems/fevr.png')} style={styles.H_P_I_Like_Icon}/>
                      </TouchableOpacity>
                    </LinearGradient>
                  </ImageBackground>
                  <View style={styles.H_P_I_CardBody}>
                    <Text style={styles.H_P_I_Name}>{P_Items.Lable}</Text>
                    <View style={styles.H_P_I_Rating_Content}>
                      <Image source={P_Items.RatingIcon} style={styles.H_P_I_Rating_Icon}/>
                      <Text style={styles.H_P_I_Rating_Text}>4.5/5</Text>
                    </View>
                    <View style={styles.H_P_I_Location_Content}>
                      <Image source={require('../assets/icon/location.png')} style={styles.H_P_I_Location_Icon}/>
                      <Text style={styles.H_P_I_Location_Text}>30Min (20km)</Text>
                    </View>
                  </View>
                </TouchableOpacity>
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
          <View style={styles.H_P_HomeFood_Content}>
            <View style={styles.H_P_HF_Header}>
              <View style={styles.Horizontal_Line}/>  
              <Text style={styles.H_P_HF_Header_Title}>Popular Home Food</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Popular_Home_Food.map((P_H_Food) => (
                <View key={P_H_Food.Id} style={{ borderRadius: 10, overflow: 'hidden', margin: 5 }}>
                  <ImageBackground style={[styles.H_P_HF_Card, { borderRadius: 10 }]} imageStyle={{ borderRadius: 10 }} source={P_H_Food.Img}>
                    <LinearGradient colors={['#0000', '#17202A']} style={styles.H_P_HF_CardBody}>
                      <Text style={styles.H_P_HF_Offers}>{P_H_Food.Offers}</Text>
                      <Text style={styles.H_P_HF_Name}>{P_H_Food.Lable}</Text>
                      <Text style={styles.H_P_HF_Location}>{P_H_Food.Location}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
          </View>
        </View> 
        <View style={styles.Event_To_Location}>
            <View style={styles.Delev_Time_Content}>
              <Image source={require('../assets/images/Events/walk.png')} style={styles.Delev_Time_Content_Icon}/>
              <View style={styles.Delev_Time_Text_Content}>
                <Text style={styles.Delev_Text}>Will reach you in</Text>
                <Text style={styles.Delev_Time_Text}>1hr 21 min</Text>
              </View>
            </View>
            <View>
              <Image source={require('../assets/images/Events/destination.png')} style={styles.Event_To_Location_Icon}/>
            </View>
        </View>
      </ScrollView>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  Event_Container:{
    backgroundColor:'#ffff',
    width:'100%',
    height:'100%'
  },
  Events_Header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20
  },
  Back_To_Home_Icon:{
    width:20,
    height:20
  },
  Events_Header_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#272727'
  },
  Events_Notifications:{
    position:'relative'
  },
  Events_Notifications_Icon:{
    width:25,
    height:25
  },
  Events_Notifications_Text:{
    backgroundColor:'red',
    fontWeight:'bold',
    color:'#ffff',
    position:'absolute',
    width:20,
    height:'auto',
    textAlign:'center',
    top:-7,
    right:-4,
    borderRadius:50,
  },

  //search 
  Home_Search:{
    marginLeft:15,
    marginRight:15,
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

  //Book cater btn
  BookCater_Btn:{
    padding:20,
    backgroundColor:'#cccc',
    margin:15,
    borderRadius:10
  },
  BookCater_Btn_Text:{
    textAlign:'center',
    color:'#ffff'
  },

  
  // //calendar content
  // Calendar_Container:{
  //   margin:15
  // },
  // Calendar_Content_Text:{
  //   marginLeft:5,
  //   fontWeight:'900',
  //   marginBottom:5,
  //   color:'#FFC90E'
  // },
  // Date_Card: {
  //   padding: 10,
  //   margin: 5,
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   // Android shadow
  //   elevation: 3,
  //   // iOS shadow
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   width:60
  // },
  // Date_Card_Day: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // Date_Card_Date: {
  //   fontSize: 14,
  //   color: '#555',
  // },




  // //Categories content
  // Events_Categories:{
  //   margin:20
  // },
  // Events_Categories_Header_Text:{
  //   fontSize:15,
  //   fontWeight:'900'
  // },
  // Events_Categories_Header_Icon:{
  //   width:20,
  //   height:20
  // },
  // Events_Categories_Content:{
  //   display:'flex',
  //   flexDirection:'row',
  //   gap:20
  // },
  // Events_Categories_Card:{
  //   padding: 10,
  //   marginTop:15,
  //   backgroundColor: '#ffff',
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   // Android shadow
  //   elevation: 3,
  //   // iOS shadow
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   width:110
  // },
  // Events_Categories_Image:{
  //   width:70,
  //   height:70
  // },
  // Events_Categories_Title:{
  //   color:'#272727'
  // },


  //Recommended
  Event_Recommended_Content:{
    margin:20
  },
  E_R_Header:{
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  E_R_Header_Title:{
    fontSize:20,
    fontWeight:'900',
  },
  Hot_Icon:{
    width:25,
    height:25
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
  
  

  // Location Content
  Event_To_Location:{
    margin:20,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#F4F7FC',
    padding:10,
    borderRadius: 10,
  },
  Delev_Time_Content:{
    flexDirection:'row',
    gap:15,
    alignItems:'center'
  },
  Delev_Time_Content_Icon:{
    width:35,
    height:35
  },
  Delev_Time_Text:{
    color:'#272727',
    fontWeight:'900',
    fontSize:15
  },
  Event_To_Location_Icon:{
    width:35,
    height:35
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
    height:135,
    marginTop:20,
    marginLeft:0,
    marginBottom:30
  },
  H_P_C_CardBody:{
    position:'absolute',
    bottom:0,
    width:250,
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
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
  H_P_I_Card:{
    width:150,
    height:130,
    marginTop:20,
    marginLeft:0,
    marginBottom:30
  },
  H_P_I_Price_Content:{
    width:150,
    height:130,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  H_P_I_Price_Icon_Content:{
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    position:'absolute',
    bottom:0,
  },
  H_P_I_Like_Icon:{
    width:15,
    height:15,
    position:'absolute',
    right:10,
    top:5,
  },
  H_P_I_Offers_Text:{
    color:'#ffff',
    fontSize:15,
    fontWeight:'900',
    position:'relative',
    bottom:2,
    left:5
  },
  H_P_I_CardBody:{
    position:'relative',
    top:-20
  },
  H_P_I_Name:{
    fontSize:15,
    color:'#272727',
    width:150,
    fontWeight:'bold'
  },
  H_P_I_Rating_Content:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    gap:5
  },
  H_P_I_Rating_Icon:{
    width:15,
    height:15
  },
  H_P_I_Location_Content:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    gap:5
  },
  H_P_I_Location_Icon:{
    width:15,
    height:15
  },
  H_P_I_Location_Text:{
    fontSize:12,
    color:'#272727'
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
  },

  //Home Food
  H_P_HF_Header_Title:{
    fontSize:14,
    textTransform:'capitalize',
    color:'#272727',
    fontWeight:'bold',
    position:'absolute',
    top:-12,
    backgroundColor:'#ffff',
    paddingRight:5
  },
  H_P_HF_Card:{
    width:250,
    height:150,
    marginTop:20,
    marginLeft:0,
    marginBottom:30
  },
  H_P_HF_CardBody:{
    position:'absolute',
    bottom:0,
    width:250,
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
  H_P_HF_Offers:{
    fontSize:20,
    fontWeight:'bold',
    color:'#F1C40F',
  },
  H_P_HF_Name:{
    fontSize:20,
    fontWeight:'bold',
    color:'#ffff',
  },
  H_P_HF_Location:{
    fontSize:10,
    fontWeight:'bold',
    color:'#ffff',
  },
  
})

export default EventPage
