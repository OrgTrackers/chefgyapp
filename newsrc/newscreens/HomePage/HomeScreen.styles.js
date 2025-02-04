import {Dimensions, StyleSheet} from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  HeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  AddressContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  AddressHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  AddressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
  },
  AddressText: {
    width: '80%',
    fontSize: 12,
    fontWeight: '400',
    color: '#272727',
  },
  UserImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FA3B3D',
  },

  //Main Container
  UserDetailsCotainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  UserImgNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  UserName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  UserTagLine: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '500',
  },
  UserRatingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserRatingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E2',
    padding: 10,
    borderRadius: 50,
    gap: 1,
  },
  UserRatingText: {
    fontSize: 12,
    color: '#FA3B3D',
    fontWeight: 'bold',
  },
  UserRatingTagLine: {
    fontSize: 12,
    color: '#FA3B3D',
    fontWeight: 'bold',
  },

  //Main Images
  HomeUpdatesContainer: {
    // margin:10
    marginTop: 30,
    position: 'relative',
  },
  HomeUpdateImage: {
    width: 360,
    height: 200,
    borderRadius: 16,
  },
  GotoButton: {
    position: 'absolute',
    right: 30,
    bottom: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  GotoButtonText: {
    fontSize: 15,
    color: '#ffff',
    fontWeight: 'bold',
  },

  //Catergory

  HomeCateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
  },
  gridItem: {
    width: '48%',
    marginBottom: 10,
  },
  HomeCateCard: {
    backgroundColor: '#fff',
    position:'relative',
    padding:10
  },
  HomeCateImgRatingContainer: {
    position: 'relative',
  },
  HomeCateImg: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  HomeCateRatingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    right: 15,
    bottom: 15,
    borderRadius: 100,
    padding: 5,
  },
  RatingText:{
    fontSize:12,
    fontWeight:'bold',
    color:'#000'
  },
  HomeCateName:{
    fontSize:15,
    fontWeight:'bold',
    color:'#000',
    marginTop:10
  },
  BookButton:{
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    borderRadius:5,
    gap:10,
    width:60,
    marginTop:10
  },
  BookButtonText:{
    fontSize:10,
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center'
  }
});
