import {StyleSheet} from 'react-native';
import {Fonts} from './Fonts';

export const globalStyle = StyleSheet.create({
  g_appDefaultBackground: {
    backgroundColor: '#092844',
    width: '100%',
    height: '100%',
  },
  g_appPageHeaderContainer: {
    padding: 15,
  },
  g_appPageHeaderText: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: '5%',
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
  },
  g_appPageHeaderIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  g_appPageHeaderIconsColors: {
    color: '#f5f5f5',
  },
  g_appPageHeaderIconsSize: {
    fontSize: 24,
  },
  g_appDefaultContentBgColor: {
    backgroundColor: '#092844',
  },
  g_appTextBlack:{
    color:'#000'
  },
  //App Main Content
  g_appMainContent: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginBottom: '10%',
  },
  g_appDefaultTextColor: {
    color: '#092844',
    // fontFamily:Fonts.poppinsBoldItalic
  },
  g_appMainContentHeaders: {
    color: '#272727',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  g_g_appMainContentHeadersIcon: {
    fontSize: 24,
  },
  g_appMainContentIconColors: {
    color: '#292929',
  },
  g_appMainContentColors: {
    // backgroundColor:'#092844',
    color: '#092844',
  },
  g_appMainContentActiveColors: {
    color: '#f5f5f5',
  },
  g_appMainContentActiveBgColors: {
    backgroundColor: '#092844',
  },
  g_appMainContentActiveIconText: {
    color: '#092844',
  },
  g_appMainContentChexBoxSize: {
    fontSize: 20,
    width: 24,
    height: 24,
  },
  g_appMainContentInputs: {
    borderColor: '#092844',
    borderWidth: 1.5,
    paddingLeft: 10,
    borderRadius: 10,
    color:'#000'
  },

  g_ListMainIconColor:{
    color:'#FBBC20'
  },
  //tabs
  g_appMainContentTabs: {
    color: '#292929',
    fontSize: 12,
    fontWeight: '900',
    padding: 5,
  },
  g_appMainContentActiveTabsBg: {
    backgroundColor: '#092844',
    borderRadius: 5,
  },
  g_appMainContentActiveTabsText: {
    color: '#f5f5f5',
  },

  // Accordion
  g_appMainContentAccordion: {
    // backgroundColor:'#ffff',
    borderRadius: 10,
    padding: 15,
  },
  g_appMainContentAccordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  g_appMainContentAccordionHeaderColorsSizes: {
    color: '#092844',
    fontSize: 15,
    fontWeight: 900,
  },

  // Buttons
  g_Button: {
    marginTop: 20,
    // borderColor: '#092844',
    // borderWidth: 1,
    margin: '1%',
    padding: 10,
    backgroundColor:'#092844',
    borderRadius:10
  },
  g_ButtonText: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
  },
});
