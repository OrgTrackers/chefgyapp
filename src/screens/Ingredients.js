import { ImageBackground, StyleSheet, Text, View,TouchableOpacity,Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Ingredients = () => {
  const navigation = useNavigation();

  const ingredients = [
    { id: '1', name: '1kg Chicken' },
    { id: '2', name: '5 Lemons' },
    { id: '3', name: '2kg Biryani Rice' },
    { id: '4', name: '2 Curd Packets' },
    { id: '5', name: '300g Red Chilli Powder' },
    { id: '6', name: '200g Salt' },
  ];

  return (
    <ScrollView style={styles.Ingre_Container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={require('../assets/images/Events/biryani.png')} style={styles.Ingre_Image}>
        <View style={styles.I_Header}>
          <TouchableOpacity onPress={()=>navigation.navigate('EventPage')}>
            <Image source={require('../assets/icon/back.png')} style={styles.Back_To_Menu}/>
          </TouchableOpacity>
          <View style={styles.I_Fev_Icon_Content}>
            <TouchableOpacity style={styles.I_Fev_Content}>
              <Image source={require('../assets/icon/fevr.png')} style={styles.I_Fev_Icon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.I_Share_Content}>
              <Image source={require('../assets/icon/share.png')} style={styles.I_Share_Icon}/>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.I_Content}>
      <View >
        <View style={styles.I_Item_Name_Rating}>
          <View style={styles.I_Item_Name_Content}>
            <Text style={styles.I_Item_Name_Title}>Chicken Biryani with hot leg pieces</Text>
            <Text style={styles.I_Item_Country}>India</Text>
          </View>
          <View style={styles.I_Item_Rating_Content}>
            <Image source={require('../assets/icon/rating.png')} style={styles.I_Item_Rating_Icon}/>
            <Text style={styles.I_Item_Rating_Text}>4.7/5</Text>
          </View>
        </View>
        <View style={styles.I_Content_Features}>
          <View style={styles.I_Content_Features_Card}>
            <View style={styles.I_Content_Features_Icon_Content}>
              <Image source={require('../assets/icon/Ingre_Icons/clock.png')} style={styles.I_Content_Features_Icon}/>
            </View>
            <Text style={styles.I_Content_Features_Text}>35</Text>
            <Text style={styles.I_Content_Features_Tag_Text}>Min</Text>
          </View>
          <View style={styles.I_Content_Features_Card}>
            <View style={styles.I_Content_Features_Icon_Content}>
              <Image source={require('../assets/icon/Ingre_Icons/people.png')} style={styles.I_Content_Features_Icon}/>
            </View>
            <Text style={styles.I_Content_Features_Text}>05</Text>
            <Text style={styles.I_Content_Features_Tag_Text}>Servings</Text>
          </View>
          <View style={styles.I_Content_Features_Card}>
            <View style={styles.I_Content_Features_Icon_Content}>
              <Image source={require('../assets/icon/Ingre_Icons/fire.png')} style={styles.I_Content_Features_Icon}/>
            </View>
            <Text style={styles.I_Content_Features_Text}>300</Text>
            <Text style={styles.I_Content_Features_Tag_Text}>Cal</Text>
          </View>
          <View style={styles.I_Content_Features_Card}>
            <View style={styles.I_Content_Features_Icon_Content}>
              <Image source={require('../assets/icon/Ingre_Icons/taste.png')} style={styles.I_Content_Features_Icon}/>
            </View>
            <Text style={styles.I_Content_Features_Text}>100%</Text>
            <Text style={styles.I_Content_Features_Tag_Text}>Tasty</Text>
          </View>
        </View>
        <View style={styles.Ingre_List_Content}>
          <Text style={styles.Ingre_List_Title}>Ingredients</Text>
          <View style={styles.Ingre_List_Container}>
            {ingredients.map(item => (
              <View key={item.id} style={styles.Ingre_List_Item_Container}>
                <View style={styles.Ingre_List_Dot} />
                <Text style={styles.Ingre_List_Item}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Ingre_Container:{
    backgroundColor:'#ffff',
    width:'100%',
    height:'100%'
  },
  Ingre_Image:{
    width:'100%',
    height:400,
    backgroundColor:'#F4F6F6'
  },
  I_Content:{
    backgroundColor:'#ffff'
  },
  I_Header:{
    padding:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    // alignItems:'center'
  },
  Back_To_Menu:{
    width:20,
    height:20
  },
  I_Header_Text:{
    fontSize:15,
    fontWeight:'bold',
    color:'#272727'
  },
  I_Fev_Content:{
    marginBottom:15
  },
  I_Fev_Icon:{
    width:20,
    height:20
  },
  I_Share_Icon:{
    width:20,
    height:20
  },

  //I_Content
  I_Content:{
    backgroundColor:'#ffff',
    width:'100%',
    marginTop:-40,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
  },
  I_Item_Name_Rating:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    alignItems:'center'
  },
  I_Item_Rating_Content:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  I_Item_Name_Title:{
    fontSize:20,
    fontWeight:'900',
    color:'#272727',
    width:300
  },
  I_Item_Rating_Icon:{
    width:20,
    height:20
  },
  I_Item_Rating_Text:{
    fontWeight:'900',
    color:'#272727'
  },

  //features
  I_Content_Features:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:5
  },
  I_Content_Features_Card:{
    backgroundColor:'#1E943C',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    borderRadius:25,
    padding:10,
    width:65
  },
  I_Content_Features_Icon_Content:{
    backgroundColor:'#ffff',
    padding:10,
    borderRadius:50,
    marginBottom:5
  },
  I_Content_Features_Icon:{
    width:20,
    height:20,
  },
  I_Content_Features_Text:{
    fontWeight:'900',
    color:'#ffff',
  },
  I_Content_Features_Tag_Text:{
    fontSize:10,
    fontWeight:'bold',
    color:'#ffff'
  },


  //Ingre List Content
  Ingre_List_Content:{
    margin:20
  },
  Ingre_List_Title:{
    fontSize:20,
    fontWeight:'900',
    color:'#272727',
  },
  Ingre_List_Container:{
    margin:15
  },
  Ingre_List_Item_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  Ingre_List_Dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E943C',
    marginRight: 10,
  },
  Ingre_List_Item: {
    fontSize: 15,
    fontWeight:'bold',
    color:'#272727'
  }
})

export default Ingredients
