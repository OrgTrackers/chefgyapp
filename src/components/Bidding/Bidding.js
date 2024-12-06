import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {globalStyle} from '../../assets/styles/GlobalStyles';

import Header from '../Header';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome6';

//Paper
import {Button, Card, Modal, Portal, Tooltip} from 'react-native-paper';

const Bidding = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigation = useNavigation();

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <View style={[globalStyle.g_appDefaultBackground]}>
      <View style={[globalStyle.g_appPageHeaderContainer]}>
        <Header onBackPress={() => navigation.navigate('OrderSummary')} />
        <Text style={[globalStyle.g_appPageHeaderText]}>Bidding</Text>
      </View>
      <View style={[globalStyle.g_appMainContent]}>
        <View style={styles.Bidding_Inputs_Form_Container}>
          <View style={styles.Form_Inputs}>
            <Text
              style={[styles.Bidding_Input_Label, globalStyle.g_appTextBlack]}>
              Ask/Bidding Price
            </Text>
            <View style={styles.Bidding_Input_Info}>
              <TextInput
                placeholder="0.00"
                style={[
                  styles.Bidding_Input,
                  globalStyle.g_appMainContentInputs,
                ]}
                placeholderTextColor={globalStyle.g_appTextBlack.color}
              />
              <TouchableOpacity onPress={handleTooltip}>
                <Ionicons name="information-circle" size={20} color="#000" />
              </TouchableOpacity>
              {tooltipVisible && (
                <>
                  <View style={styles.BiddingToolTip_Container}>
                    <Text style={styles.ToolTip_Header}>Bidding Details</Text>
                    <Text style={styles.ToolTip_Content_Text}>
                      Please note that submitting a bid does not guarantee
                      approval at the quoted price. The final decision lies
                      solely with the vendor, who reserves the right to accept
                      or reject your bid based on their discretion and
                      requirements.
                    </Text>
                  </View>
                  <View style={styles.ToolTip_Triangle}></View>
                </>
              )}
            </View>
          </View>
          <View style={styles.Form_Inputs}>
            <TextInput
              multiline
              numberOfLines={1}
              placeholder="comments"
              style={[
                styles.Comments_Section,
                globalStyle.g_appMainContentInputs,
              ]}
              placeholderTextColor={globalStyle.g_appTextBlack.color}
            />
          </View>
        </View>
      </View>
      <Button
        style={[styles.Pay_Buttons, globalStyle.g_appDefaultContentBgColor]}
        onPress={() => navigation.navigate('OrderSummary')}>
        <View style={styles.Pay_Button_Content}>
          <Text style={[styles.Pay_Buttons_Text]}>Back</Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Comments_Section: {
    width: '85%',
    marginTop: 10,
    textAlignVertical: 'top', // This aligns the text to the top
  },
  Bidding_Inputs_Form_Container: {
    marginTop: 5,
    marginBottom: 10,
  },
  Form_Inputs: {
    marginTop: 10,
  },
  Bidding_Input_Label: {
    marginBottom: 5,
  },

  Bidding_Input_Info: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    position: 'relative',
  },
  Bidding_Input: {
    width: '85%',
  },

  //tooltip
  BiddingToolTip_Container: {
    backgroundColor: '#5d6d7e',
    position: 'absolute',
    right: 0,
    top: -125,
    left: 0,
    padding: 15,
    borderRadius: 15,
    zIndex: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,

    // elevation: 15,
  },
  ToolTip_Header: {
    fontSize: 20,
    color: '#f7f7f7',
    fontWeight: 'bold',
  },
  ToolTip_Content_Text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ccc',
  },
  ToolTip_Triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#5d6d7e',
    position: 'absolute',
    transform: [{rotate: '180deg'}],
    right: 23,
    top: -12,
  },
  Pay_Buttons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Adjust height as needed
    backgroundColor: '#FFFF', // Adjust background color as needed
    justifyContent: 'center',
    // borderTopWidth: 1,
    borderRadius: 0,
  },
  Pay_Buttons_Text: {
    textAlign: 'center',
    color: '#fff',
  },
  Pay_Button_Content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default Bidding;
