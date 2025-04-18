import {Dimensions, StyleSheet} from 'react-native';

export const GlobalCss = StyleSheet.create({
    //ThemeColors
    ThemeColor:{
        color:'#FA3B3D'
    },
    ThemeBackgroundColor:{
        backgroundColor:'#FA3B3D'
    },
    //Layout
    pageLayout:{
        flex:1,
        backgroundColor:'#ffff'
    },
    HeaderContainer:{
        flex:0.1,
        backgroundColor:'#ffff'
    },
    MainContainer:{
        flex:1,
        backgroundColor:'#ffff',
        padding:15
        
    },
    FooterContainer:{
       flex:0.1,
       backgroundColor:'#ffff' 
    },

    //Inputs
    g_Inputs: {
        borderColor: '#FA3B3D',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 10,
        color:'#000'
    },
    
    //Page side headers
    g_SideHeaders: {
        color: '#272727',
        fontWeight: 'bold',
        marginBottom: 10,
    },


    g_appTextBlack:{
        color:'#000'
    },

})