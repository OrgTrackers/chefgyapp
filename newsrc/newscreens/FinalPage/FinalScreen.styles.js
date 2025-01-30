import { Dimensions, StyleSheet } from 'react-native';

export const FinalScreenStyles = StyleSheet.create({
  MainPageLayout: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  BlurOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    backdropFilter: 'blur(50px)', // Blur effect (only works in Web)
  },
  PageHeader:{
    padding:10
  },
  Text_One: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: '5%',
    width: '60%',
    marginBottom: '5%',
  },
  Text_Second: {
    textAlign: 'center',
    // width:'90%',
    fontSize: 12,
    width: '80%',
  },


  //Page Content
  PageContent:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
});
