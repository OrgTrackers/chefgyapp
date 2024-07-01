import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const LunchMenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.L_M_Container} showsVerticalScrollIndicator={false}>
      <View style={styles.L_M_Header}>
        <TouchableOpacity onPress={() => navigation.navigate('EventPage')}>
          <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Home_Icon} />
        </TouchableOpacity>
        <Text style={styles.L_M_Header_Text}>Menu List</Text>
        <TouchableOpacity>
          <Image source={require('../assets/icon/more.png')} style={styles.L_M_More_Icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.L_M_Search}>
        <TextInput placeholder='What are you looking for ?' style={styles.L_M_Search_Input}></TextInput>
        <Image source={require('../assets/images/search_Img.png')} style={styles.L_M_Search_Icon}/>
      </View>
      <View style={styles.L_M_Banner_Content}>
        <Image source={require('../assets/images/LunchMenu.jpg')} style={styles.L_M_Banner_Img} />
        <Text style={styles.L_M_Banner_Text}>Experience the taste of real food</Text>
      </View>
      <View style={styles.L_M_Veg_Content}>
        <View style={styles.L_M_Veg_title_Icon}>
          <Image source={require('../assets/icon/vegSym.png')} style={styles.L_M_Veg_Icon} />
          <Text style={styles.L_M_Veg_title}>Veg</Text>
        </View>
        <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.Veg_List_Card} onPress={()=>navigation.navigate('VegIngredients')}>
                <Image source={require('../assets/images/VegBiryani.jpg')} style={styles.Veg_List_Img} />
                <Text style={styles.L_M_Veg_Item_Title}>Veg Biryani</Text>
                <Text style={styles.L_M_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
                <View style={styles.L_M_Veg_Rating}>
                   <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Veg_Rating_Icon}/>
                   <Text style={styles.L_M_Veg_Rating_Text}>4.6/5</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.Veg_List_Card}>
                <Image source={require('../assets/images/VegBiryani.jpg')} style={styles.Veg_List_Img} />
                <Text style={styles.L_M_Veg_Item_Title}>Veg Biryani</Text>
                <Text style={styles.L_M_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
                <View style={styles.L_M_Veg_Rating}>
                   <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Veg_Rating_Icon}/>
                   <Text style={styles.L_M_Veg_Rating_Text}>4.6/5</Text>
                </View>
            </View>
            <View style={styles.Veg_List_Card}>
                <Image source={require('../assets/images/VegBiryani.jpg')} style={styles.Veg_List_Img} />
                <Text style={styles.L_M_Veg_Item_Title}>Veg Biryani</Text>
                <Text style={styles.L_M_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
                <View style={styles.L_M_Veg_Rating}>
                   <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Veg_Rating_Icon}/>
                   <Text style={styles.L_M_Veg_Rating_Text}>4.6/5</Text>
                </View>
            </View>
            <View style={styles.Veg_List_Card}>
                <Image source={require('../assets/images/VegBiryani.jpg')} style={styles.Veg_List_Img} />
                <Text style={styles.L_M_Veg_Item_Title}>Veg Biryani</Text>
                <Text style={styles.L_M_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
                <View style={styles.L_M_Veg_Rating}>
                   <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Veg_Rating_Icon}/>
                   <Text style={styles.L_M_Veg_Rating_Text}>4.6/5</Text>
                </View>
            </View>
        </ScrollView>
      </View>
      <View style={styles.L_M_Non_Veg_Content}>
        <View style={styles.L_M_Non_Veg_title_Icon}>
          <Image source={require('../assets/icon/nonVeg.png')} style={styles.L_M_Non_Veg_Icon} />
          <Text style={styles.L_M_Non_Veg_title}>Non-Veg</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.Non_Veg_List_Card}>
            <Image source={require('../assets/images/chickenBiryani.jpeg')} style={styles.Non_Veg_List_Img} />
            <Text style={styles.L_M_Non_Veg_Item_Title}>Chicken Biryani</Text>
            <Text style={styles.L_M_Non_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
            <View style={styles.L_M_Non_Veg_Rating}>
                <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Non_Veg_Rating_Icon}/>
                <Text style={styles.L_M_Non_Veg_Rating_Text}>4.6/5</Text>
            </View>
          </View>
          <View style={styles.Non_Veg_List_Card}>
            <Image source={require('../assets/images/chickenBiryani.jpeg')} style={styles.Non_Veg_List_Img} />
            <Text style={styles.L_M_Non_Veg_Item_Title}>Chicken Biryani</Text>
            <Text style={styles.L_M_Non_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
            <View style={styles.L_M_Non_Veg_Rating}>
                <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Non_Veg_Rating_Icon}/>
                <Text style={styles.L_M_Non_Veg_Rating_Text}>4.6/5</Text>
            </View>
          </View>
          <View style={styles.Non_Veg_List_Card}>
            <Image source={require('../assets/images/chickenBiryani.jpeg')} style={styles.Non_Veg_List_Img} />
            <Text style={styles.L_M_Non_Veg_Item_Title}>Chicken Biryani</Text>
            <Text style={styles.L_M_Non_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
            <View style={styles.L_M_Non_Veg_Rating}>
                <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Non_Veg_Rating_Icon}/>
                <Text style={styles.L_M_Non_Veg_Rating_Text}>4.6/5</Text>
            </View>
          </View>
          <View style={styles.Non_Veg_List_Card}>
            <Image source={require('../assets/images/chickenBiryani.jpeg')} style={styles.Non_Veg_List_Img} />
            <Text style={styles.L_M_Non_Veg_Item_Title}>Chicken Biryani</Text>
            <Text style={styles.L_M_Non_Veg_Item_Ingredians}>1 cup basmati rice,2 tablespoons oil or ghee,1 large onion, thinly sliced</Text>
            <View style={styles.L_M_Non_Veg_Rating}>
                <Image source={require('../assets/icon/rating.png')} style={styles.L_M_Non_Veg_Rating_Icon}/>
                <Text style={styles.L_M_Non_Veg_Rating_Text}>4.6/5</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  L_M_Container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  L_M_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  Back_To_Home_Icon: {
    width: 20,
    height: 20,
  },
  L_M_Header_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#272727',
  },
  L_M_More_Icon: {
    width: 20,
    height: 20,
  },
  //Search content
  L_M_Search:{
    marginLeft:15,
    marginRight:15
  },
  L_M_Search_Input:{
    borderWidth:1,
    borderColor:'#cccc',
    paddingLeft:50,
    borderRadius:10,
    height:40
  },
  L_M_Search_Icon:{
    width:20,
    height:20,
    position:'absolute',
    top:10,
    left:10
  },
  // Banner content
  L_M_Banner_Content: {
    position: 'relative',
    margin: 15,
  },
  L_M_Banner_Img: {
    width: '100%',
    height: 450,
    borderRadius: 10,
  },
  L_M_Banner_Text: {
    position: 'absolute',
    fontSize: 50,
    margin: 10,
    fontWeight: '700',
  },

  // Veg Content
  L_M_Veg_Content: {
    margin: 15,
  },
  L_M_Veg_title_Icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5
  },
  L_M_Veg_Icon: {
    width: 20,
    height: 20,
  },
  L_M_Veg_title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
  },

  // // Veg Content List
  Veg_List_Card: {
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
  Veg_List_Img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  L_M_Veg_Item_Title:{
    marginTop:10,
    marginLeft:10,
    fontWeight:'900',
    color:'#272727',
    fontSize:20
  },
  L_M_Veg_Item_Ingredians:{
    fontSize:10,
    marginTop:5,
    marginLeft:10,
  },
  L_M_Veg_Rating:{
    display:'flex',
    alignItems:'center',
    gap:5,
    flexDirection:'row',
    marginTop:7,
    marginLeft:5
  },
  L_M_Veg_Rating_Icon:{
    width:15,
    height:15
  },
  L_M_Veg_Rating_Text:{
    fontWeight:'bold',
    color:'#272727'
  },

  //Non veg Content
  L_M_Non_Veg_Content:{
    margin: 15,
  },
  L_M_Non_Veg_title_Icon:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:5
  },
  L_M_Non_Veg_Icon:{
    width:20,
    height:20
  },

  //Non veg list card content
  Non_Veg_List_Card:{
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
    marginBottom:10
  },
  Non_Veg_List_Img:{
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  L_M_Non_Veg_Item_Title:{
    marginTop:10,
    marginLeft:10,
    fontWeight:'900',
    color:'#272727',
    fontSize:20
  },
  L_M_Non_Veg_Item_Ingredians:{
    fontSize:10,
    marginTop:5,
    marginLeft:10,
  },
  L_M_Non_Veg_Rating:{
    display:'flex',
    alignItems:'center',
    gap:5,
    flexDirection:'row',
    marginTop:7,
    marginLeft:5
  },
  L_M_Non_Veg_Rating_Icon:{
    width:15,
    height:15
  },
  L_M_Non_Veg_Rating_Text:{
    fontSize: 15,
    fontWeight: '700',
    color: '#272727',
  }
});

export default LunchMenu;
