import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import { GlobalCss } from '../../../newassets/GlobalStyles/GlobalCss.styles';
import { FoodTruckFoodSessionStyles } from './FoodTruckFoodSessionScreen.styles';
import {Card, Switch} from 'react-native-paper';
import Slider from '@react-native-community/slider';

const caterAllowcation = [
  {
    Id: 1,
    Name: 'Auto Asign',
  },
  {
    Id: 2,
    Name: 'Let Me Do It My Self',
  },
];

const FoodTruckFoodSessionScreen = () => {
  const navigation = useNavigation();
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [sliderValue, setSliderValue] = useState([0, 1000]);
  const [isSwitchOn, setIsSwitchOn] = React.useState(null);

  const onToggleSwitch = id => {
    if (isSwitchOn === id) {
      setIsSwitchOn(null); // Deselect if clicked again
    } else {
      setIsSwitchOn(id); // Set the clicked switch as active
    }
  };

  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity
          style={FoodTruckFoodSessionStyles.HeaderContent}
          onPress={() => navigation.navigate('BookFoodTruckScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={FoodTruckFoodSessionStyles.PageName}>Food Truck Food Session</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={require('../../../newassets/images/FoodSessions/FS_Main.png')}
            style={FoodTruckFoodSessionStyles.FS_Image}
          />
        </View>
        <View style={FoodTruckFoodSessionStyles.BC_Cater_Allowcation_Container}>
          <Text style={[GlobalCss.g_SideHeaders]}>Cater Allocation</Text>
          {caterAllowcation.map(CA_Item => (
            <View key={CA_Item.Id}>
              <Card style={FoodTruckFoodSessionStyles.BC_Cater_Allowcation_Card}>
                <View
                  style={FoodTruckFoodSessionStyles.BC_Cater_Allowcation_Card_Content}>
                  <View style={FoodTruckFoodSessionStyles.BC_Icon_Allocation_Name}>
                    <MCIcons
                      name={
                        CA_Item.Name === 'Auto Asign' ? 'cheese' : 'chili-mild'
                      }
                      size={20}
                      color={CA_Item.Name === 'Auto Asign' ? '#FA3B3D' : '#2E770A'}
                    />
                    <Text
                      style={[
                        FoodTruckFoodSessionStyles.BC_CA_Allocation_Text,
                        GlobalCss.ThemeColor.color,
                      ]}>
                      {CA_Item.Name}
                    </Text>
                  </View>
                  <Switch
                    value={isSwitchOn === CA_Item.Id} // Check if the switch is active
                    onValueChange={() => onToggleSwitch(CA_Item.Id)}
                    color={GlobalCss.ThemeColor.color}
                  />
                </View>
              </Card>
            </View>
          ))}
        </View>
        <View style={FoodTruckFoodSessionStyles.No_Of_People_Container}>
          <Text style={FoodTruckFoodSessionStyles.Fsa_ValueText}>
            Attendees : {sliderValue[0]} - {sliderValue[1]}
          </Text>
          <View style={FoodTruckFoodSessionStyles.inputWrapper}>
            <Text
              style={[
                FoodTruckFoodSessionStyles.maxMininputLabel,
                GlobalCss.g_appTextBlack,
              ]}>
              Min:{' '}
            </Text>
            <TextInput
              style={[FoodTruckFoodSessionStyles.Rangeinput, GlobalCss.g_Inputs]}
              keyboardType="numeric"
              value={minValue !== null ? String(minValue) : ''}
              onChangeText={text =>
                setMinValue(text === '' ? null : Number(text))
              }
            />
          </View>
          <View style={FoodTruckFoodSessionStyles.SliderContainer}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={10}
              maximumValue={10000}
              step={1}
              minimumTrackTintColor="green"
              maximumTrackTintColor={GlobalCss.ThemeColor.color}
              value={minValue}
              onValueChange={value => setMinValue(value)}
            />
          </View>
          <View style={FoodTruckFoodSessionStyles.inputWrapper}>
            <Text
              style={[
                FoodTruckFoodSessionStyles.maxMininputLabel,
                GlobalCss.g_appTextBlack,
              ]}>
              Max:{' '}
            </Text>
            <TextInput
              style={[FoodTruckFoodSessionStyles.Rangeinput, GlobalCss.g_Inputs]}
              keyboardType="numeric"
              value={maxValue !== null ? String(maxValue) : ''}
              onChangeText={text =>
                setMaxValue(text === '' ? null : Number(text))
              }
            />
          </View>
          <View style={FoodTruckFoodSessionStyles.SliderContainer}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="green"
              maximumTrackTintColor={GlobalCss.ThemeColor.color}
              value={maxValue}
              onValueChange={value => setMaxValue(value)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <View style={FoodTruckFoodSessionStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              FoodTruckFoodSessionStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => navigation.navigate('FoodTruckSelectionScreen')}>
            <Text style={FoodTruckFoodSessionStyles.FooterButtonText}>Select Food Truck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FoodTruckFoodSessionScreen;
