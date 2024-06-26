import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView style={styles.Container}>
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
        <View style={styles.Home_Categories}>
          <View style={styles.Home_Categories_Grid}>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/breakfast.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Breakfast</Text>
            </View>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/lunch.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Lunch</Text>
            </View>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/dinner.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Dinner</Text>
            </View>
          </View>
          <View style={styles.Home_Categories_Grid}>
            <View style={styles.Home_Categories_Card}>
              <Image source={require('../assets/images/home_categories/Coffee.png')} style={styles.Home_Categories_Card_Img}/>
              <Text style={styles.Home_Categories_Card_Title}>Coffee</Text>
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
          <View style={styles.Home_Popular_Title}>
            <Text style={styles.Home_Popular_Title_Header}>Popular</Text>
            <Text style={styles.Home_Popular_Title_Text}>1200 Caterers</Text>
          </View>
          <View style={styles.Home_Popular_Content}>
            <View style={styles.Home_Popular_Card}>
              <View style={styles.Home_Popular_Card_Content}>
                <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
                <View>
                  <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                  <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
                  <View style={styles.Home_Popular_Rating}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Rating_Icon}/>
                    <Text>4.5/5</Text>
                  </View>
                </View>
              </View>

            </View>
            <View style={styles.Home_Popular_Card}>
              <View style={styles.Home_Popular_Card_Content}>
                <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
                <View>
                  <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                  <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
                  <View style={styles.Home_Popular_Rating}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Rating_Icon}/>
                    <Text>4.5/5</Text>
                  </View>
                </View>
              </View>

            </View>
            <View style={styles.Home_Popular_Card}>
              <View style={styles.Home_Popular_Card_Content}>
                <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
                <View>
                  <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                  <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
                  <View style={styles.Home_Popular_Rating}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Rating_Icon}/>
                    <Text>4.5/5</Text>
                  </View>
                </View>
              </View>

            </View>
            <View style={styles.Home_Popular_Card}>
              <View style={styles.Home_Popular_Card_Content}>
                <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
                <View>
                  <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                  <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
                  <View style={styles.Home_Popular_Rating}>
                    <Image source={require('../assets/icon/rating.png')} style={styles.Home_Popular_Rating_Icon}/>
                    <Text>4.5/5</Text>
                  </View>
                </View>
              </View>

            </View>
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
    padding:20
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
  },
  Home_Header_User_Img:{
    width:40,
    height:40,
    borderRadius:50,
    objectFit:'cover',
    borderWidth:1,
    borderColor:'#FFCD78'
  },
  Home_Search:{
    marginLeft:15,
    marginRight:15
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
  Home_Categories:{
    margin:5,
    marginTop:30
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
    backgroundColor: '#fff', // Added background color
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
    width:30,
    height:30,
    objectFit:'cover',
    resizeMode:'contain'
  },
  Home_Popular:{
    margin:20,
    height:700
  },
  Home_Popular_Title:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  Home_Popular_Title_Header:{
    fontWeight:'bold'
  },
  Home_Popular_Title_Text:{
    fontWeight:'bold'
  },
  Home_Popular_Content:{
    display:'flex',
    flexDirection:'column',
    gap:20,
    marginTop:20
  },
  Home_Popular_Card:{
    backgroundColor: '#fff', // Added background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    justifyContent: 'center', // Centering text
    alignItems: 'center', // Centering text
    borderRadius:5
  },
  Home_Popular_Card_Content:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    gap:10,
    padding:10
  },
  Home_Popular_Img:{
    width:100,
    height:100,
    borderRadius:10
  },
  Home_Popular_Card_Title:{
    fontSize:20,
    color:'#272727',
    fontWeight:'bold'
  },
  Home_Categories_Card_Desc:{
    fontSize:10,
    width:250
  },
  Home_Popular_Rating:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  Home_Popular_Rating_Icon:{
    width:14,
    height:12
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
