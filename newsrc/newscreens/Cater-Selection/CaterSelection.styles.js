import {Dimensions, StyleSheet} from 'react-native';

export const CaterSelectionStyles = StyleSheet.create({
  MainPageLayout: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ffff',
  },
  PageContent: {
    margin: 20,
    flex: 0.85,
  },
  PageName: {
    fontSize: 20,
    padding: 10,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  // Page Content
  PageMainContent: {
    flex: 1.5,
  },
  CaterCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:5
  },
  CaterCardBody:{
    padding:10,
    flexDirection:'row',
    gap:10,
    position:'relative'
  },
  RestroImg: {
    width: 100,
    height: 110,
    borderRadius:10
  },

  CaterRestroDetailsContainer:{
    position:'relative'
  },
  LikeUnLikeButton:{
    position:'absolute',
    right:0,
  },
  CaterRestroName:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000'
  },
  CaterRestroDescription:{
    fontSize:9,
    width:200
  },
  CaterPriceContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    gap:2
  },
  CaterPrice:{
    fontSize:15,
    color:'#000',
    fontWeight:'bold'
  },
  CaterRatingTimeAddContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10
  },
  CaterRatingTimeConatainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  CaterRatingContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:3
  },    
  CaterTimeContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:3
  },
  CaterRating:{
    fontSize:12,
    color:'#000'
  },
  CaterTime:{
    fontSize:12,
    color:'#000'
  },

  PageFooter: {
    flex: 0.15,
    backgroundColor: '#fff',
  },
  FooterButtonContainer:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  SaveButton:{
    backgroundColor:'#FFB20B',
    margin:10,
    padding:10,
    width:'80%',
    borderRadius:10
  },
  SaveButtonText:{
    textAlign:'center',
    color:'#f7f7f7',
    fontWeight:'bold',
    fontSize:15
  },
});
