import {Dimensions, StyleSheet} from 'react-native';

export const ChefFoodSessionStyles = StyleSheet.create({
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

  //Slider
  Fsa_ValueText: {
    textAlign: 'left',
    color: '#272727',
    fontWeight: 'bold',
    padding: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  maxMininputLabel: {
    marginTop: 10,
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  Rangeinput: {
    width: '30%',
    marginTop: '5%',
    marginRight: '2%',
    padding: 0,
  },

  //cater alloctation
  BC_Cater_Allowcation_Container: {
    marginTop: 20,
  },
  BC_Cater_Allowcation_Card: {
    backgroundColor: '#ffff',
    margin: '2%',
    borderRadius: 5,
    marginLeft: 1,
  },
  BC_Cater_Allowcation_Card_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  BC_CA_Allocation_Text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },

  //No_Of_People_Container
  No_Of_People_Container: {
    marginTop: 20,
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
