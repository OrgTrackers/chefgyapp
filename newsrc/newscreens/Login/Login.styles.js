import { Dimensions, StyleSheet } from "react-native";

// export const LoginScreenStyles = StyleSheet.create({
//     newText:{
//        fontWeight:'bold',
//        color:'#000'
//     },
//     Background_Img:{
//         height:'100%',
//         width:'100%'
//     },

//     //content
//     Login_Content:{
//         margin:'10%',
//         marginTop:'50%'
//     },
//     LoginScreen_PageHeader:{
//         fontSize:30,
//         fontWeight:'bold',
//         color:'#fff'
//     },
//     LoginScreen_PageHeaderTagLine:{
//         fontSize:12,
//         fontWeight:'bold',
//         color:'#000'
//     },

//     //input 
//     MobileNumber_Input:{
//         backgroundColor:'#ffff',
//         padding:10,
//         borderRadius:5,
//         marginTop:'10%'
//     },
//     GetOtp_Btn:{
//         backgroundColor:'#F1DD00',
//         marginTop:'5%',
//         flexDirection:'row',
//         padding:10,
//         justifyContent:'center',
//         gap:5,
//         borderRadius:5,
//         alignItems:'center'
//     },
//     GetOtp_Btn_Text:{
//         fontSize:15,
//         fontWeight:'bold',
//         color:'#ffff'
//     }
// })
export const LoginScreenStyles = StyleSheet.create({
    Page_Background:{
        flex:1,
        backgroundColor:'#ffff',
    },
    Bottom_Wave_Container:{
        position:'absolute',
        width:Dimensions.get('screen').width,
        bottom:0
    },
    Bottom_Wave_Box:{
        backgroundColor:'#FFB20B',
        height:80
    },
    Bottom_Wave:{
        position:'absolute',
        bottom:20
    },


    //Login Content
    Login_Content:{
       marginTop:'50%',
       margin:'10%'
    },
    LoginScreen_PageHeader:{
        fontSize:20,
        fontWeight:'900',
        color:'#000'
    },
    LoginScreen_PageHeaderTagLine:{
        fontSize:12,
        fontWeight:'bold',
        color:'#ffd700'
    },
    //Input
    MobileNumber_Input:{
        backgroundColor:'#ffff',
        marginTop:'10%',
        padding:10,
        borderRadius:10,
        fontSize:12,
        borderWidth:1,
        borderColor:'#000'
    },

    //Button
    GetOtp_Btn:{
        backgroundColor:'#253E92',
        flexDirection:'row',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop:'5%',
        gap:10
    },
    GetOtp_Btn_Text:{
        fontSize:15,
        fontWeight:'bold',
        color:'#fff'
    }
})