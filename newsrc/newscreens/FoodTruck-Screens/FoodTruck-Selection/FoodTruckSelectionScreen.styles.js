import {Dimensions, StyleSheet} from 'react-native';

export const FoodTruckSelectionScreenStyles = StyleSheet.create({
  HeaderContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  PageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 3,
  },

  CaterCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  CaterCardBody: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  RestroImg: {
    width: 100,
    height: 110,
    borderRadius: 10,
  },

  CaterRestroDetailsContainer: {
    position: 'relative',
  },
  LikeUnLikeButton: {
    position: 'absolute',
    right: -5,
  },
  CaterRestroName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  CaterRestroDescription: {
    fontSize: 9,
    width: 200,
  },
  CaterPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 2,
  },
  CaterPrice: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  CaterRatingTimeAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  CaterRatingTimeConatainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  CaterRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  CaterTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  CaterRating: {
    fontSize: 12,
    color: '#000',
  },
  CaterTime: {
    fontSize: 12,
    color: '#000',
  },

  //Footer
  FooterButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FooterButton: {
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  FooterButtonText: {
    color: '#ffff',
    textAlign: 'center',
  },
});
