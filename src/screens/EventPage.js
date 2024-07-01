import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const calendar = [
  { "Day": 'Sun', "Date": 1 },
  { "Day": 'Mon', "Date": 2 },
  { "Day": 'Tue', "Date": 3 },
  { "Day": 'Wed', "Date": 4 },
  { "Day": 'Thu', "Date": 5 },
  { "Day": 'Fri', "Date": 6 },
  { "Day": 'Sat', "Date": 7 },
  { "Day": 'Sun', "Date": 8 },
  { "Day": 'Mon', "Date": 9 },
  { "Day": 'Tue', "Date": 10 },
  { "Day": 'Wed', "Date": 11 },
  { "Day": 'Thu', "Date": 12 },
  { "Day": 'Fri', "Date": 13 },
  { "Day": 'Sat', "Date": 14 },
  { "Day": 'Sun', "Date": 15 },
  { "Day": 'Mon', "Date": 16 },
  { "Day": 'Tue', "Date": 17 },
  { "Day": 'Wed', "Date": 18 },
  { "Day": 'Thu', "Date": 19 },
  { "Day": 'Fri', "Date": 20 },
  { "Day": 'Sat', "Date": 21 },
  { "Day": 'Sun', "Date": 22 },
  { "Day": 'Mon', "Date": 23 },
  { "Day": 'Tue', "Date": 24 },
  { "Day": 'Wed', "Date": 25 },
  { "Day": 'Thu', "Date": 26 },
  { "Day": 'Fri', "Date": 27 },
  { "Day": 'Sat', "Date": 28 },
  { "Day": 'Sun', "Date": 29 },
  { "Day": 'Mon', "Date": 30 }
];


const EventPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Event_Container}>
      <ScrollView style={styles.Events_Content}>
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
        <View style={styles.Events_Chef_Header}>
          <View style={styles.Events_Chef__Name}>
            <Text style={styles.Events_Chef__Name_Text}>Mc.Danial</Text>
            <Text style={styles.Events_Chef__Status}>Your Today's Menu</Text>
          </View>
          <View style={styles.Events_Chef_Add}>
            <Image source={require('../assets/icon/adding.png')} style={styles.Events_Chef_Add_Icon}/>
          </View>
        </View>
        <View style={styles.Calendar_Container}>
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
            <TouchableOpacity style={styles.Events_Categories_Card} onPress={()=>navigation.navigate('LunchMenu')}>
              <Image source={require('../assets/images/home_categories/lunch.png')} style={styles.Events_Categories_Image}/>
              <Text style={styles.Events_Categories_Title}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Events_Categories_Card}>
              <Image source={require('../assets/images/home_categories/dinner.png')} style={styles.Events_Categories_Image}/>
              <Text style={styles.Events_Categories_Title}>Dinner</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Event_Food_List_Container}>
          <View style={styles.Event_Food_List_Header}>
            <Image source={require('../assets/icon/hot.png')} style={styles.Hot_Icon}/>
            <Text style={styles.Event_Food_List_Header_Title}>Recommended</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.Event_Food_List_Card_Content}>
            <View style={styles.Event_Food_List_Card}>
              <View style={styles.Event_Food_List_Card_Body}>
                <View>
                  <Image source={require('../assets/images/Events/biryani.png')} style={styles.Event_Food_List_Image}/>
                </View>
                <View style={styles.Event_Food_List_Price}>
                  <Text style={styles.Event_Food_List_Price_Title}>Price :</Text>
                  <Text style={styles.Event_Food_List_Price_Cost}>150rs</Text>
                  <View style={styles.Ratings}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                  </View>
                </View>
              </View>
              <View style={styles.Event_Food_List_Card_Footer}>
                <Text style={styles.Events_Item_Name}>Chicken Biryani</Text>
              </View>
            </View>
            <View style={styles.Event_Food_List_Card}>
              <View style={styles.Event_Food_List_Card_Body}>
                <View>
                  <Image source={require('../assets/images/Events/biryani.png')} style={styles.Event_Food_List_Image}/>
                </View>
                <View style={styles.Event_Food_List_Price}>
                  <Text style={styles.Event_Food_List_Price_Title}>Price :</Text>
                  <Text style={styles.Event_Food_List_Price_Cost}>150rs</Text>
                  <View style={styles.Ratings}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Ratings_Icon}/>
                  </View>
                </View>
              </View>
              <View style={styles.Event_Food_List_Card_Footer}>
                <Text style={styles.Events_Item_Name}>Chicken Biryani</Text>
              </View>
            </View>
          </ScrollView>
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



  // chef's Name conatent
  Events_Chef_Header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20
  },
  Events_Chef_Add_Icon:{
    width:30,
    height:30
  },
  Events_Chef__Name_Text:{
    fontSize:20,
    fontWeight:'900',
    color:'#272727'
  },

  //calendar content
  Calendar_Container:{
    margin:15
  },
  Calendar_Content_Text:{
    marginLeft:5,
    fontWeight:'900',
    marginBottom:5,
    color:'#FFC90E'
  },
  Date_Card: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    // Android shadow
    elevation: 3,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width:60
  },
  Date_Card_Day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  Date_Card_Date: {
    fontSize: 14,
    color: '#555',
  },




  //Categories content
  Events_Categories:{
    margin:20
  },
  Events_Categories_Header_Text:{
    fontSize:15,
    fontWeight:'900'
  },
  Events_Categories_Header_Icon:{
    width:20,
    height:20
  },
  Events_Categories_Content:{
    display:'flex',
    flexDirection:'row',
    gap:20
  },
  Events_Categories_Card:{
    padding: 10,
    marginTop:15,
    backgroundColor: '#ffff',
    borderRadius: 5,
    alignItems: 'center',
    // Android shadow
    elevation: 3,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width:110
  },
  Events_Categories_Image:{
    width:70,
    height:70
  },
  Events_Categories_Title:{
    color:'#272727'
  },

  // Recommended content
  Event_Food_List_Container:{
    margin:20
  },
  Event_Food_List_Header_Title:{
    fontSize:20,
    fontWeight:'900',
    marginLeft:20
  },
  Hot_Icon:{
    position:'absolute',
    width:40,
    height:40,
    left:0,
    top:-20,
    transform: [{ rotate: '-20deg' }],
  },

  // Food list card
  Event_Food_List_Card_Content:{
    marginTop:20
  },
  Event_Food_List_Card:{
    margin:10,
    padding: 10,
    backgroundColor: '#F7FAFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Event_Food_List_Card_Body:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  Event_Food_List_Image:{
    width:200,
    height:150,
    marginTop:-30,
  },
  Event_Food_List_Price_Cost:{
    fontSize:20,
    color:'#272727',
    fontWeight:'900'
  },
  Event_Food_List_Card_Footer:{
    margin:5
  },
  Events_Item_Name:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    width:180,
    color:'#272727'
  },

  //ratings
  Ratings:{
    flexDirection:'row',
    gap:5,
    alignItems:'center',
    marginTop:20
  },
  Ratings_Icon:{
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
  }
})

export default EventPage
