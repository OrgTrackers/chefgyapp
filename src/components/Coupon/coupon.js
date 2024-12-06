import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//styles
import {globalStyle} from '../../assets/styles/GlobalStyles';

//Components
import Header from '../Header';
// import Footer from '../Footer';
import {Button,Card,Modal,Portal,} from 'react-native-paper';

const OffersCardData = [
  {
    Id: 1,
    Name: 'MACDONALDS',
    OffersCost: 10,
    OfferType: 'OFF',
    ValidDate: '31 Oct 2024',
    Img: require('../../assets/Updated/images/Coupons/Img-1.png'),
  },
  {
    Id: 2,
    Name: 'STARBUCKS',
    OffersCost: 20,
    OfferType: 'OFF',
    ValidDate: '31 Oct 2024',
    Img: require('../../assets/Updated/images/Coupons/Img-2.png'),
  },
  {
    Id: 3,
    Name: 'KFC',
    OffersCost: 25,
    OfferType: 'OFF',
    ValidDate: '31 Oct 2024',
    Img: require('../../assets/Updated/images/Coupons/Img-3.png'),
  },
  {
    Id: 4,
    Name: 'PUMA',
    OffersCost: 25,
    OfferType: 'OFF',
    ValidDate: '31 Oct 2024',
    Img: require('../../assets/Updated/images/Coupons/Img-4.png'),
  },
  {
    Id: 5,
    Name: 'DOMINOS',
    OffersCost: 50,
    OfferType: 'OFF',
    ValidDate: '31 Oct 2024',
    Img: require('../../assets/Updated/images/Coupons/Img-5.png'),
  },
];

const Coupons = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,margin:10,borderRadius:10};

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('OrderSummary')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Coupons</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {OffersCardData.map(OffersItem => (
            <View key={OffersItem.Id}>
              <Card style={styles.OffersCard} onPress={showModal}>
                <View style={styles.OffersCardBody}>
                  <View style={styles.OffersImgContainer}>
                    <Image source={OffersItem.Img} style={styles.OffersImg} />
                  </View>
                  <View style={styles.verticleLine}></View>
                  <View style={styles.OfferDetailsContainer}>
                    <Text style={styles.Offers_Name_Text}>
                      {OffersItem.Name}
                    </Text>
                    <View style={styles.OffersCost_Container}>
                      <Text style={styles.Offers_Cost}>
                        {OffersItem.OffersCost}
                      </Text>
                      <Text style={styles.Offers_Type}>
                        {' '}
                        % {OffersItem.OfferType}
                      </Text>
                    </View>
                    <Text style={styles.Offers_ValidDate}>
                      Valid this offer till {OffersItem.ValidDate}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
      <Button
        style={[styles.Pay_Buttons, globalStyle.g_appDefaultContentBgColor]} onPress={()=>navigation.navigate('OrderSummary')}>
        <View style={styles.Pay_Button_Content}>
          <Text style={[styles.Pay_Buttons_Text]}>Back</Text>
        </View>
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={styles.GreetingTitle}>Yaahooo.!</Text>
          <Text style={styles.Offer_Text}>You Got 10% Off</Text>
          <TouchableOpacity style={styles.Ok_Button} onPress={hideModal}>
            <Text style={styles.Ok_Button_Text}>Ok</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  //List Container
  List_Container: {
    marginBottom: 40,
  },
  OffersCard: {
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    padding: 10,
  },
  OffersCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  OffersImg: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticleLine: {
    height: '100%',
    width: 1,
    borderStyle: 'dashed',
    borderLeftWidth: 2,
    borderColor: '#909090',
  },

  //Details
  Offers_Name_Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  OffersCost_Container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  Offers_Cost: {
    fontSize: 40,
    color: '#3498db',
    fontWeight: 'bold',
  },
  Offers_Type: {
    color: '#000',
  },
  Offers_ValidDate: {
    fontSize: 12,
    color: '#909090',
    fontWeight: 'bold',
  },

  //List
  Notifications_Title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: '5%',
  },
  Notifications_List_Container: {
    marginBottom: 40,
  },
  //List Card
  List_Card: {
    backgroundColor: '#fff',
    margin: '3%',
    borderRadius: 50,
  },
  List_Cardbody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'blue',
    borderWidth: 1,
  },
  User_Name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  Date_Text: {
    fontSize: 10,
    color: '#aeb6bf',
  },

  //Order content
  Order_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  OrderId_Text: {
    color: '#00A2E8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  Distance_Text: {
    color: '#00A2E8',
    fontSize: 12,
    fontWeight: 'bold',
  },

  ReportDescription_Text: {
    fontSize: 10,
    width: '35%',
    fontWeight: 'bold',
    color: '#00A2E8',
  },
  ReportDescription_Conttainer: {
    marginTop: 5,
  },

  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    // borderTopWidth: 1,
    borderRadius: 0,
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color: '#fff',
  },
  Pay_Button_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },


  //Modal 
  GreetingTitle:{
    fontSize:30,
    textAlign:'center',
    fontWeight:'bold',
    color:'#3498db',
    marginBottom:'5%'
  },
  Offer_Text:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'#000'
  },
  Ok_Button:{
    backgroundColor:'#3498db',
    padding:10,
    marginTop:'5%',
    borderRadius:10,

  },
  Ok_Button_Text:{
    textAlign:'center',
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  }
});
export default Coupons;
