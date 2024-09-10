import { StyleSheet } from "react-native";
import { Fonts } from "./Fonts";


export const globalStyle = StyleSheet.create (
    {
        g_appDefaultBackground:{
            backgroundColor: '#389590',
            width: '100%',
            height: '100%',
        },
        g_appPageHeaderContainer:{
            padding:15
        },
        g_appPageHeaderText:{
            fontSize: 25,
            fontWeight: '900',
            color: '#FFFFFF',
            marginTop: '5%',
            fontFamily:Fonts.poppinsBlackItalic
        },
        g_appPageHeaderIconsContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        g_appPageHeaderIconsColors:{
            color:'#f5f5f5'
        },
        g_appPageHeaderIconsSize:{
            fontSize:24
        },


        //App Main Content
        g_appMainContent:{
            flex: 1,
            backgroundColor: '#ffff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            marginBottom: '10%',
        },
        g_appDefaultTextColor:{
            color:'#389590',
            // fontFamily:Fonts.poppinsBoldItalic
        },
        g_appMainContentHeaders:{
            color: '#272727',
            fontWeight: 'bold',
            marginBottom: 10,
        },
        g_appMainContentIconColors:{
            color:'#292929',
        },
        g_appMainContentColors:{
            // backgroundColor:'#389590',
            color:'#389590',
        },
        g_appMainContentActiveColors:{
            color:'#f5f5f5',
        },
        g_appMainContentActiveBgColors:{
            backgroundColor:'#389590',
        },
        g_appMainContentChexBoxSize:{
            fontSize:20,
            width:24,
            height:24
        },
        g_appMainContentInputs:{
            borderColor: '#389590',
            borderWidth: 1.5,
            paddingLeft: 10,
            borderRadius: 10,
        },

        //tabs
        g_appMainContentTabs:{
            color:'#292929',
            fontSize:12,
            fontWeight:'900',
            padding:5,
        },
        g_appMainContentActiveTabsBg:{
            backgroundColor:'#389590',
            borderRadius:5
        },
        g_appMainContentActiveTabsText:{
            color:'#f5f5f5'
        },


        // Accordion
        g_appMainContentAccordion:{
            backgroundColor:'#ffff',
            borderRadius: 10,
            padding: 15,
        },
        g_appMainContentAccordionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        g_appMainContentAccordionHeaderColorsSizes:{
            color:'#389590',
            fontSize:15,
            fontWeight:900
        },
        

        // Buttons
        g_Button:{
            marginTop: 20,
            borderColor: '#cccc',
            borderWidth: 1,
            margin: '1%',
            padding: 10,
        },
        g_ButtonText:{
            textAlign: 'center',
            color: '#389590',
            fontWeight: 'bold',
        }

    }
)