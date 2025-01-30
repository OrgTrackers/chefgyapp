import { Dimensions, StyleSheet } from "react-native";

export const CaterSelectionStyles = StyleSheet.create({
    MainPageLayout:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
        backgroundColor:'#ffff',
    },
    PageContent:{
        margin:20,
        flex:0.85
    },
    PageName:{
        fontSize:20,
        padding:10,
        marginTop:15,
        fontWeight:'bold',
        color:'#000'
    },


    //List
    CaterCard:{
        margin:10,
        width:'90%',
        marginLeft:20,
        marginTop:30,
        backgroundColor:'#ffff',

    },
    CaterCardBody:{
        flexDirection:'row',
        display:'flex',
        gap:15,
    },
    ImageCard:{
        width:100,
        height:100,
        position:'relative',
        borderRadius:10,
        marginLeft:-15,
        marginTop:-15
    },
    RestroImg:{
        width:100,
        height:100,
        borderRadius:10
    },

    RestroInfo:{

    },
    RestroName:{
        fontSize:15,
        fontWeight:'600',
        color:'#272727', 
    },
    RestroDetails:{
        flexDirection:'row',
        display:'flex',
        gap:10,
        marginTop:'25%',
        marginBottom:'5%'
    },
    TypeSection:{
        width:60
    },
    TypeName:{
        fontSize:10,
        marginLeft:5,
        color:'#000',
        fontWeight:'500'
    },
    TimeSection:{
        width:40
    },
    TimeDuration:{
        fontSize:10,
        marginLeft:5,
        color:'#000',
        fontWeight:'500'
    },
    PageFooter:{
        flex:0.15,
        backgroundColor:'#fff'
    }
})