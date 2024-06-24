import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

const Home = () => {
  
  return (
    <View>
      <ScrollView style={styles.Container}>
      <Image source={require('../assets/images/Home_Banner.jpg')} style={styles.Home_Banner_Image}/>
      <Text style={styles.Home_App_Title} >CHEFGY</Text>
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
          <Text>Popular</Text>
          <Text>1200 Caterers</Text>
        </View>
        <View style={styles.Home_Popular_Content}>
          <View style={styles.Home_Popular_Card}>
            <View style={styles.Home_Popular_Card_Content}>
              <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
              <View>
                <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
              </View>
            </View>
          </View>
          <View style={styles.Home_Popular_Card}>
            <View style={styles.Home_Popular_Card_Content}>
              <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
              <View>
                <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
              </View>
            </View>
          </View>
          <View style={styles.Home_Popular_Card}>
            <View style={styles.Home_Popular_Card_Content}>
              <Image source={require('../assets/images/popular_Img_1.jpg')} style={styles.Home_Popular_Img}/>
              <View>
                <Text style={styles.Home_Popular_Card_Title}>Subbayya Gaari Hotel</Text>
                <Text style={styles.Home_Categories_Card_Desc}>From Our Kitchen to Your Table, Creating Culinary Memories that Last.</Text>
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
    // style={styles.Home_App_Footer_HomeBtn}
  )
}
const styles = StyleSheet.create({
  Container:{
    backgroundColor:'#ffff'
  },
  Home_Banner_Image:{
    width:500,
    height:250
  },
  Home_App_Title:{
    fontSize:60,
    position:'absolute',
    color:'#272727',
    fontWeight:'bold',
    left:20,
    top:60
  },
  Home_Search:{
    marginLeft:15,
    marginRight:15
  },
  Home_Search_Input:{
    paddingLeft:40,
    marginTop:-30,
    backgroundColor:'#ffff',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  Home_Search_Iocn:{
    width:25,
    height:20,
    position:'absolute',
    left:8,
    top:-15,
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
    height: 100,
    width: 110, // Added width for better visibility
    backgroundColor: '#fff', // Added background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    justifyContent: 'center', // Centering text
    alignItems: 'center', // Centering text
    borderRadius:10
  },
  Home_Categories_Card_Title:{
    marginTop:5,
    marginBottom:5
  },
  Home_Categories_Card_Img:{
    width:50,
    height:50,
    objectFit:'cover',
    resizeMode:'contain'
  },
  Home_Popular:{
    margin:20
  },
  Home_Popular_Title:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
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
    borderRadius:10
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
