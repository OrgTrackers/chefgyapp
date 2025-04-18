import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { GlobalCss } from '../../newassets/GlobalStyles/GlobalCss.styles';
import biddingStyles from './Bidding.styles';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome6';

//Paper
import {Button, Card, Modal, Portal, Tooltip} from 'react-native-paper';

const BiddingScreen = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigation = useNavigation();

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const showAlert = () => {
    Alert.alert(
      'Bidding Details',
      'Please note that submitting a bid does not guarantee approval at the quoted price. The final decision lies solely with the vendor, who reserves the right to accept or reject your bid based on their discretion and requirements.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity
          style={biddingStyles.HeaderContent}
          onPress={() => navigation.navigate('HomeScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={biddingStyles.PageName}>Bidding</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={biddingStyles.Bidding_Inputs_Form_Container}>
          <View style={biddingStyles.Form_Inputs}>
            <Text
              style={[biddingStyles.Bidding_Input_Label]}>
              Ask/Bidding Price
            </Text>
            <View style={biddingStyles.Bidding_Input_Info}>
              <TextInput
                placeholder="0.00"
                style={[
                  biddingStyles.Bidding_Input,
                  
                ]}
                placeholderTextColor={GlobalCss.g_appTextBlack.color}
              />
              <TouchableOpacity onPress={showAlert}>
                <Ionicons name="information-circle" size={20} color="#000" />
              </TouchableOpacity>
              {/* {tooltipVisible && (
                <>
                  <View style={biddingStyles.BiddingToolTip_Container}>
                    <Text style={biddingStyles.ToolTip_Header}>Bidding Details</Text>
                    <Text style={biddingStyles.ToolTip_Content_Text}>
                      Please note that submitting a bid does not guarantee
                      approval at the quoted price. The final decision lies
                      solely with the vendor, who reserves the right to accept
                      or reject your bid based on their discretion and
                      requirements.
                    </Text>
                  </View>
                  <View style={biddingStyles.ToolTip_Triangle}></View>
                </>
              )} */}
            </View>
          </View>
          <View style={biddingStyles.Form_Inputs}>
            <TextInput
              multiline
              numberOfLines={1}
              placeholder="comments"
              style={[
                biddingStyles.Comments_Section,
              ]}
              placeholderTextColor={GlobalCss.g_appTextBlack.color}
            />
          </View>
        </View>
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <TouchableOpacity style={biddingStyles.footerButton}>
          <Text style={biddingStyles.footerButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BiddingScreen;
