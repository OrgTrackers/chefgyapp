import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import React, { useState, useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import Home from './src/components/Home';
import Splash from './src/components/Splash';
import Login from './src/components/Login';
import UserProfile from './src/components/UserProfile';
import EditUserProfile from './src/screens/EditUserProfile';
import Signup from './src/components/Signup';
import OtpContent from './src/screens/OtpContent';
import CaterMenu from './src/screens/CaterMenu';
import VegIngredients from './src/screens/VegIngredients';
import EventPage from './src/screens/EventPage';
import Ingredients from './src/screens/Ingredients';
import Location from './src/components/Location';
import BookCateres from './src/screens/BookCateres';
import appIntroSlider from './src/components/appIntroSlider';

import FoodSession from './src/components/FoodSessions';
import Menus from './src/components/Menus';
import OrderSummary from './src/components/OrderSummary';
import CaterSelection from './src/screens/CaterSelection';
import Invoice from './src/screens/Invoice';

const Stack = createNativeStackNavigator();

const App = () => {
  const [backPressed, setBackPressed] = useState(0);
  const navigationRef = useRef(null); // Use a ref for the navigation container

  useEffect(() => {
    let update = true;

    const backAction = () => {
      if (update) {
        if (backPressed > 0) {
          BackHandler.exitApp();
          setBackPressed(0);
        } else {
          const currentRoute = navigationRef.current?.getCurrentRoute();

          if (currentRoute?.name === 'Home') {
            // If on the Home screen, handle back press to exit app
            setBackPressed(backPressed + 1);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
            setTimeout(() => setBackPressed(0), 1000); // Reset after 1 second
          } else {
            // If not on Home screen, navigate back
            navigationRef.current?.goBack();
          }
        }
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      update = false;
    };
  }, [backPressed]);

  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="OtpContent" component={OtpContent} />
          <Stack.Screen name="CaterMenu" component={CaterMenu} />
          <Stack.Screen name="VegIngredients" component={VegIngredients} />
          <Stack.Screen name="EventPage" component={EventPage} />
          <Stack.Screen name="Ingredients" component={Ingredients} />
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="BookCateres" component={BookCateres} />
          <Stack.Screen name="FoodSession" component={FoodSession} />
          <Stack.Screen name="Menus" component={Menus} />
          <Stack.Screen name="OrderSummary" component={OrderSummary} />
          <Stack.Screen name="CaterSelection" component={CaterSelection} />
          <Stack.Screen name="Invoice" component={Invoice} />
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;