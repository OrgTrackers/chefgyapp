import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';

const catersCategories = [
  {
    Icon: require('../assets/icon/cateringMenu/regularFood.png'),
    Label: 'Regular Food',
    Key: 'regularFood',
  },
  {
    Icon: require('../assets/icon/cateringMenu/seaFood.png'),
    Label: 'Sea Food',
    Key: 'seaFood',
  },
  {
    Icon: require('../assets/icon/cateringMenu/fastFood.png'),
    Label: 'Fast Food',
    Key: 'fastFood',
  },
  {
    Icon: require('../assets/icon/cateringMenu/streetFood.png'),
    Label: 'Street Food',
    Key: 'streetFood',
  },
];

const regularFoodList = [
  {
    key:1,
    Icon: require('../assets/icon/cateringMenu/regularFood/plate_1.png'),
    Label: 'Chicken Biryani',
    Price:200,
    Ingredients:'1kg Chiken,2 kg Basmati Rice,250 g Yogurt, 3 large Onions (sliced),4 Tomatoes (chopped)',
    Rating:4.5,
    Likes:150,
    Shares:270
  },
  {
    key:2,
    Icon: require('../assets/icon/cateringMenu/regularFood/plate_2.png'),
    Label: 'Paneer Biryani',
    Price:180,
    Ingredients:'500 g Paneer (cubed),2 kg Basmati Rice,250 g Yogurt, 3 large Onions (sliced),4 Tomatoes (chopped)',
    Rating:3,
    Likes:150,
    Shares:270
  },
  {
    key:3,
    Icon: require('../assets/icon/cateringMenu/regularFood/plate_3.png'),
    Label: 'Mutton Biryani',
    Price:370,
    Ingredients:'1kg Mutton,2 kg Basmati Rice,250 g Yogurt, 3 large Onions (sliced),4 Tomatoes (chopped)',
    Rating:4.5,
    Likes:180,
    Shares:270
  },
  {
    key:4,
    Icon: require('../assets/icon/cateringMenu/regularFood/plate_4.png'),
    Label: 'Veg Biryani',
    Price:150,
    Ingredients:'1 kg Mixed Vegetables (carrots, peas, potatoes, beans),2 kg Basmati Rice,250 g Yogurt, 3 large Onions (sliced),4 Tomatoes (chopped)',
    Rating:3.5,
    Likes:100,
    Shares:270
  },
];

const CaterMenu = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('regularFood');

  const renderContent = () => {
    switch (selectedCategory) {
      case 'regularFood':
        return (
          <View style={styles.Cat_Regualar_Food_Content}>
            {regularFoodList.map((regItem,regIndex)=>(
              <View key={regIndex} style={styles.Cat_Reg_Food_Card}>
                <View style={styles.Cat_Reg_Food_Card_Body}>
                  <View style={styles.Cat_Reg_Img_Title}>
                    <Image source={regItem.Icon} style={styles.Cat_Reg_Food_Image}/>
                    <Text style={styles.Cat_Reg_Food_Label} >{regItem.Label}</Text>
                  </View>
                  <View style={styles.Cat_Reg_Pricing_Rating}>
                    <View style={styles.Cat_Reg_Pricing_Content}>
                      <Text>Price</Text>
                      <Text style={styles.Cat_Reg_Pricing_Text}>{regItem.Price}</Text>
                    </View>
                    <View style={styles.Cat_Ingre_Content}>
                      <Text style={styles.Cat_Ingre_Text}>{regItem.Ingredients}</Text>
                    </View>
                    <View style={styles.Cat_Reg_Rating_Likes_Shares}>
                      <View style={styles.Cat_Reg_RLS_Content}>
                        <Image source={require('../assets/icon/cateringMenu/regularFood/Foodlikes.png')} style={styles.Cat_Reg_RLS_Image}/>
                        <Text style={styles.Cat_Reg_RLS_Text}>{regItem.Likes}</Text>
                      </View>
                      <View style={styles.Cat_Reg_RLS_Content}>
                        <Image source={require('../assets/icon/cateringMenu/regularFood/share.png')} style={styles.Cat_Reg_RLS_Image}/>
                        <Text style={styles.Cat_Reg_RLS_Text}>{regItem.Shares}</Text>
                      </View>
                      <View style={styles.Cat_Reg_RLS_Content}>
                        <Image source={require('../assets/icon/cateringMenu/regularFood/rating.png')} style={styles.Cat_Reg_RLS_Image}/>
                        <Text style={styles.Cat_Reg_RLS_Text}>{regItem.Rating}</Text>
                      </View>
                    </View>
                    <View style={styles.Offers_Content}>
                      <Text style={styles.Offers_Text}>UPTO 80% OFF</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
      case 'seaFood':
        return (
          <View style={styles.Cat_Sea_Food_Content}>
            <Text>Sea Food</Text>
          </View>
        );
      case 'fastFood':
        return (
          <View style={styles.Cat_Fast_Food_Content}>
            <Text>Fast Food</Text>
          </View>
        );
      case 'streetFood':
        return (
          <View style={styles.Cat_Street_Food_Content}>
            <Text>Street Food</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.M_Container} showsVerticalScrollIndicator={false}>
      <View style={styles.M_Header}>
        <TouchableOpacity onPress={() => navigation.navigate('EventPage')}>
          <Image
            source={require('../assets/icon/back.png')}
            style={styles.Back_To_Home_Icon}
          />
        </TouchableOpacity>
        <Text style={styles.M_Header_Text}>Menu List</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon/more.png')}
            style={styles.M_More_Icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.M_Search}>
        <TextInput
          placeholder="What are you looking for ?"
          style={styles.M_Search_Input}></TextInput>
        <Image
          source={require('../assets/images/search_Img.png')}
          style={styles.M_Search_Icon}
        />
      </View>
      <ScrollView horizontal style={styles.Cat_Menu_Categories} showsHorizontalScrollIndicator={false}>
        {catersCategories.map((item, index) => (
          <TouchableOpacity key={index} style={[ styles.Caters_Categories_Card, selectedCategory === item.Key && styles.Caters_Categories_Card_Active,]} onPress={() => setSelectedCategory(item.Key)}>
            <View style={styles.Caters_Categories_Card_Body}>
              <Image source={item.Icon} style={styles.Categories_Icon} />
              <Text style={[styles.Caters_Categories_Label,selectedCategory === item.Key && styles.Caters_Categories_Label_Active]}>
                {item.Label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.Cat_Menu_Content}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  M_Container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  M_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  Back_To_Home_Icon: {
    width: 20,
    height: 20,
  },
  M_Header_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#272727',
  },
  M_More_Icon: {
    width: 20,
    height: 20,
  },
  // Search content
  M_Search: {
    marginLeft: 15,
    marginRight: 15,
  },
  M_Search_Input: {
    borderWidth: 1,
    borderColor: '#cccc',
    paddingLeft: 50,
    borderRadius: 10,
    height: 40,
  },
  M_Search_Icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  // cater categories
  Cat_Menu_Categories: {
    margin: 20,
  },
  Caters_Categories_Card: {
    marginRight: 10,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  Caters_Categories_Card_Active: {
    backgroundColor: '#F4D03F',
  },
  Caters_Categories_Card_Body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Categories_Icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  Caters_Categories_Label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  Caters_Categories_Label_Active: {
    color: '#272727',
  },

  // categories content
  Cat_Menu_Content: {
    margin:20
  },
  // Regular food 
  Cat_Reg_Food_Card: {
    backgroundColor: '#F4F6F6',
    marginBottom: 20,
    padding: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  Cat_Reg_Food_Card_Body:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:30,
  },
  Cat_Reg_Food_Image:{
    width:150,
    height:150
  },
  Cat_Reg_Food_Label:{
    fontSize:15,
    fontWeight:'bold',
    color:'#272727'
  },
  Cat_Reg_Pricing_Text:{
    fontSize:20,
    fontWeight:'900',
    color:'#272727'
  },
  Cat_Ingre_Content:{
     width:180
  },
  Cat_Ingre_Text:{
    fontSize:10
  },

  // rating,likes,shares
  Cat_Reg_Rating_Likes_Shares:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:20,
    width:150,
    gap:25
  },
  Cat_Reg_RLS_Content:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  Cat_Reg_RLS_Image:{
    width:20,
    height:20
  },
  Cat_Reg_RLS_Text:{
    // fontSize:10,
    fontWeight:'900',
    color:'#272727'
  },


  //offers content
  Offers_Content:{
    backgroundColor:'#FFC90E',
    position:'absolute',
    padding:5,
    right:-1,
    bottom:-40,
    width:120
  },
  Offers_Text:{
    fontSize:12,
    fontWeight:'900',
    color:'#272727'
  }
});

export default CaterMenu;
