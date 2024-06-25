import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const User_Pro_Details=[
    {
        "Detail_Img":require('../assets/icon/yourbooking.png'),
        "Label":'Your Bookings',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/fevr.png'),
        "Label":'Favourites',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/Lang.png'),
        "Label":'Language',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/location.png'),
        "Label":'Location',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/subscribe.png'),
        "Label":'Subscribe',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/clearhistory.png'),
        "Label":'Clear History',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/deactivate.png'),
        "Label":'Deactivate Account',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/visible.png'),
        "Label":'Passwords',
        "Goto": require('../assets/icon/goto.png')
    },
    {
        "Detail_Img":require('../assets/icon/logout.png'),
        "Label":'Log Out',
        "Goto": require('../assets/icon/goto.png')
    },
]

const UserProfile = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.User_Container}>
        <View style={styles.User_Pro_Header}>
            <Image source={require('../assets/icon/back.png')} style={styles.U_P_Back_Icon}/>
            <Text style={styles.U_P_Header_Text}>My Profile</Text>
            <Image source={require('../assets/icon/setting.png')} style={styles.U_P_Setting_Icon}/>
        </View>
        <View style={styles.User_Pro_Content}>
            <View style={styles.User_Pro_Pic}>
                <Image source={require('../assets/images/user.jpg')} style={styles.User_Image}/>
                <View style={styles.Open_Cam}>
                    <Image source={require('../assets/icon/camera.png')} style={styles.Open_Cam_Icon}/>
                </View>
            </View>
            <View style={styles.User_Pro_Data}>
                <Text style={styles.User_Pro_Name}>Saicharan Vadlamanu</Text>
                <Text style={styles.User_Pro_Mail}>Charan.vadlamanu@gmail.com</Text>
                <TouchableOpacity style={styles.Edit_Button} onPress={()=>navigation.navigate('EditUserProfile')}>
                    <Text style={styles.Edit_Button_Text}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
        {User_Pro_Details.map((item, index) => (
          <View key={index} style={styles.User_deatils}>
            <Image source={item.Detail_Img} style={styles.User_deatils_img} />
            <Text style={styles.User_deatils_Text}>{item.Label}</Text>
            <Image source={item.Goto} style={styles.User_deatils_Goto_Img} />
          </View>
        ))}
        <View style={styles.App_Version_Content}>
            <Text style={styles.App_Version_Text}>App Version 003</Text>
        </View>   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    User_Container:{
        backgroundColor:'#ffff'
    },
    User_Pro_Header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20
    },
    U_P_Back_Icon:{
        width:20,
        height:20
    },
    U_P_Header_Text:{
        fontSize:15,
        fontWeight:'bold',
        color:'#272727'
    },
    U_P_Setting_Icon:{
        width:20,
        height:20
    },
    User_Pro_Content:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        margin:20,
    },
    User_Pro_Pic:{
        position:'relative',
        width:100,
    },
    User_Image:{
        width:100,
        height:100,
        borderRadius:50
    },
    Open_Cam:{
        position:'absolute',
        backgroundColor:'#ffff',
        padding:5,
        borderRadius:50,
        bottom:0,
        right:0,
        borderWidth:1,
        borderColor:'#F7B52D'
    },
    Open_Cam_Icon:{
        width:20,
        height:20
    },
    User_Pro_Data:{
        display:'flex',
        flexDirection:'column',
        gap:5,
        justifyContent:'center',
        alignItems:'center',
        width:'70%'
    },
    User_Pro_Name:{
        fontSize:20,
        fontWeight:'bold',
        color:'#272727'
    },
    User_Pro_Mail:{
        fontSize:15,
        color:'#272727'
    },
    Edit_Button:{
        backgroundColor: '#F7B52D',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width:'70%'
    },
    Edit_Button_Text:{
       color:'#ffff' 
    },
    User_deatils:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    User_deatils_img:{
        width: 20,
        height: 20,
        marginRight: 10
    },
    User_deatils_Text:{
        flex: 1,
        fontSize: 16,
        color: '#272727'
    },
    User_deatils_Goto_Img:{
        width: 20,
        height: 20
    },
    App_Version_Text:{
        margin:30,
        textAlign:'center'
    }
});

export default UserProfile;
