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
import Coupons from './src/components/Coupon/coupon';
import CaterSelection from './src/screens/CaterSelection';
import Invoice from './src/screens/Invoice';
import Rating from './src/components/Rating';
import Bidding from './src/components/Bidding/Bidding';
import OrderAccepted from './src/components/OrderAccepted';

//chef
import ChefFilters from './src/components/Chef/ChefFilters';
import ChefList from './src/components/Chef/ChefList';
import ChefConformation from './src/components/Chef/ChefConformation';
import ChefPickDish from './src/components/Chef/ChefPickDish';

//Home Food
import HomeFoodFilters from './src/components/HomeFood/HomeFoodFilters';
import HomeFoodList from './src/components/HomeFood/HomeFoodList';
import HomeFoodConformation from './src/components/HomeFood/HomeFoodConformation';
import HomeFoodPickDish from './src/components/HomeFood/HomeFoodPickDish';

//Food Truck
import FoodTruckFilters from './src/components/FoodTruck/FoodTruckFilter';
import FoodTruckList from './src/components/FoodTruck/FoodTruckList';
import FoodTruckConformation from './src/components/FoodTruck/FoodTruckConfromation';
import FoodTruckPickDish from './src/components/FoodTruck/FoodTruckPickDish';



//new Screens
import LoginScreen from './newsrc/newscreens/Login/LoginScreen';
import OtpScreen from './newsrc/newscreens/Otp/OtpScreen';
import EventsScreen from './newsrc/newscreens/Events/EventsScreen';
import CaterSelectionScreen from './newsrc/newscreens/Cater-Selection/CaterSelectionScreen';
import MenuSelection from './newsrc/newscreens/Menu-Selection/MenuSelectionScreen';
import OrderSummaryScreen from './newsrc/newscreens/Order-Summary/OrderSummaryScreen';
import FinalScreen from './newsrc/newscreens/FinalPage/FinalScreen';
import HomeScreen from './newsrc/newscreens/HomePage/HomeScreen';
import BookCaterScreen from './newsrc/newscreens/Book-Cater/BookCaterScreen';
import DayFoodSelectionScreen from './newsrc/newscreens/FoodSessions/DayFoodSelectionScreen';
import FooterComponent from './newsrc/newcomponents/Footer/FooterComponent';
import FoodSessionScreen from './newsrc/newscreens/FoodSessions/FoodSessionScreen';

//New Chef Screens
import ChefEventsScreen from './newsrc/newscreens/Chef-Screens/ChefEvents/ChefEventsScreen';
import BookChefScreen from './newsrc/newscreens/Chef-Screens/ChefBooking/BookChefScreen';
import ChefFoodSessionScreen from './newsrc/newscreens/Chef-Screens/ChefFoodSession/ChefFoodSessionsScreen';
import ChefSelectionScreen from './newsrc/newscreens/Chef-Screens/Chef-Selection/ChefSelectionScreen';
import ChefMenuSelectionScreen from './newsrc/newscreens/Chef-Screens/ChefMenusSelections/ChefMenusSelectionScreen';
import ChefOrderSummaryScreen from './newsrc/newscreens/Chef-Screens/ChefOrderSummary/ChefOrderSummaryScreen';

//New Home Food screen
import HomeFoodEventsScreen from './newsrc/newscreens/HomeFood-Screens/HomeFoodEvents/HomeFoodEventsScreen';
import BookHomeFoodScreen from './newsrc/newscreens/HomeFood-Screens/HomeFoodBooking/BookHomeFoodScreen';
import HomeFoodFoodSessionScreen from './newsrc/newscreens/HomeFood-Screens/HomeFoodFoodSession/HomeFoodFoodSessionScreen';
import HomeFoodSelectionScreen from './newsrc/newscreens/HomeFood-Screens/HomeFood-Selection/HomeFoodSelectionScreen';
import HomeFoodMenuSelectionScreen from './newsrc/newscreens/HomeFood-Screens/HomeFoodMenuSelection/HomeFoodMenuSelectionScreen';
import HomeFoodOrderSummaryScreen from './newsrc/newscreens/HomeFood-Screens/HomeFoodOrderSummary/HomeFoodOrderSummaryScreen';

//New Food Truck Screen
import FoodTruckEventsScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruckEvents/FoodTruckEventsScreen';
import BookFoodTruckScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruckBooking/BookFoodTruckScreen';
import FoodTruckFoodSessionScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruckFoodSession/FoodTruckFoodSessionScreen';
import FoodTruckSelectionScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruck-Selection/FoodTruckSelectionScreen';
import FoodTruckMenuSelectionScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruckMenuSelections/FoodTruckMenuSelectionScreen';
import FoodTruckOrderSummaryScreen from './newsrc/newscreens/FoodTruck-Screens/FoodTruckOrderSummary/FoodTruckOrderSummaryScreen';

//New Bidding Screen

import BiddingScreen from './newsrc/newscreens/Bidding/BiddingScreen';


import MenuScreen from './newsrc/newscreens/Cloud/Menuscreen';
import CustomizeScreen from './newsrc/newscreens/Cloud/CustomizeScreen';
import { CartProvider } from './newsrc/newscreens/Cloud/Usecart';

//import CartScreen from './newsrc/newscreens/Cloud/CartScreen';
import BillSummaryScreen from './newsrc/newscreens/Cloud/BillSummaryScreen';
import PaymentScreen from './newsrc/newscreens/Cloud/PaymentScreen';
import OrderSuccessScreen from './newsrc/newscreens/Cloud/OrderSuccessScreen';
import DoughnutBoxScreen from './newsrc/newscreens/Cloud/DoughnutBoxScreen';




import { createStackNavigator } from '@react-navigation/stack';

// Import all screens



import EditProfileScreen from './newsrc/newscreens/Address/EditProfileScreen';
import SelectLocationScreen from './newsrc/newscreens/Address/SelectLocationScreen';
import AddAddressScreen from './newsrc/newscreens/Address/AddAddressScreen';


import VendorListScreen from './newsrc/newscreens/CgCloud/VendorListScreen';
import VendorMenuScreen from './newsrc/newscreens/CgCloud/VendorMenuScreen';
import CartScreen from './newsrc/newscreens/CgCloud/CartScreen';
import SearchServicesScreen from './newsrc/newscreens/SearchServicesScreen';
import ServiceVendorsScreen from './newsrc/newscreens/ServiceVendorsScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  const [backPressed, setBackPressed] = useState(0);
  const navigationRef = useRef(null); // Use a ref for the navigation container
  const [cart, setCart] = useState([]);

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
      <CartProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator

            initialRouteName="Home"

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
          <Stack.Screen name="Rating" component={Rating} />
          <Stack.Screen name="Coupons" component={Coupons} />
          <Stack.Screen name="Bidding" component={Bidding} />
          <Stack.Screen name="OrderAccepted" component={OrderAccepted} />

          <Stack.Screen name="ChefFilters" component={ChefFilters} />
          <Stack.Screen name="ChefList" component={ChefList} />
          <Stack.Screen name="ChefConformation" component={ChefConformation} />
          <Stack.Screen name="ChefPickDish" component={ChefPickDish} />

          <Stack.Screen name="HomeFoodFilters" component={HomeFoodFilters} />
          <Stack.Screen name="HomeFoodList" component={HomeFoodList} />
          <Stack.Screen name="HomeFoodConformation" component={HomeFoodConformation} />
          <Stack.Screen name="HomeFoodPickDish" component={HomeFoodPickDish} />

          <Stack.Screen name="FoodTruckFilters" component={FoodTruckFilters} />
          <Stack.Screen name="FoodTruckList" component={FoodTruckList} />
          <Stack.Screen name="FoodTruckConformation" component={FoodTruckConformation} />
          <Stack.Screen name="FoodTruckPickDish" component={FoodTruckPickDish} />


          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="EventsScreen" component={EventsScreen} />
          <Stack.Screen name="CaterSelectionScreen" component={CaterSelectionScreen} />
          <Stack.Screen name="MenuSelection" component={MenuSelection} />
          <Stack.Screen name="OrderSummaryScreen" component={OrderSummaryScreen} />
          <Stack.Screen name="FinalScreen" component={FinalScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BookCaterScreen" component={BookCaterScreen} />
          <Stack.Screen name="FoodSessionScreen" component={FoodSessionScreen} />
          <Stack.Screen name="DayFoodSelectionScreen" component={DayFoodSelectionScreen} />
          <Stack.Screen name="FooterComponent" component={FooterComponent} />

          {/* New chef Screen */}
          <Stack.Screen name="ChefEventsScreen" component={ChefEventsScreen} />
          <Stack.Screen name="BookChefScreen" component={BookChefScreen} />
          <Stack.Screen name="ChefFoodSessionScreen" component={ChefFoodSessionScreen} />
          <Stack.Screen name="ChefSelectionScreen" component={ChefSelectionScreen} />
          <Stack.Screen name="ChefMenuSelectionScreen" component={ChefMenuSelectionScreen} />
          <Stack.Screen name="ChefOrderSummaryScreen" component={ChefOrderSummaryScreen} />

          {/* new Home food Screen */}
          <Stack.Screen name="HomeFoodEventsScreen" component={HomeFoodEventsScreen} />
          <Stack.Screen name="BookHomeFoodScreen" component={BookHomeFoodScreen} />
          <Stack.Screen name="HomeFoodFoodSessionScreen" component={HomeFoodFoodSessionScreen} />
          <Stack.Screen name="HomeFoodSelectionScreen" component={HomeFoodSelectionScreen} />
          <Stack.Screen name="HomeFoodMenuSelectionScreen" component={HomeFoodMenuSelectionScreen} />
          <Stack.Screen name="HomeFoodOrderSummaryScreen" component={HomeFoodOrderSummaryScreen} />

          
          {/* new Home food Screen */}
          <Stack.Screen name="FoodTruckEventsScreen" component={FoodTruckEventsScreen} />
          <Stack.Screen name="BookFoodTruckScreen" component={BookFoodTruckScreen} />
          <Stack.Screen name="FoodTruckFoodSessionScreen" component={FoodTruckFoodSessionScreen} />
          <Stack.Screen name="FoodTruckSelectionScreen" component={FoodTruckSelectionScreen} />
          <Stack.Screen name="FoodTruckMenuSelectionScreen" component={FoodTruckMenuSelectionScreen} />
          <Stack.Screen name="FoodTruckOrderSummaryScreen" component={FoodTruckOrderSummaryScreen} />


          <Stack.Screen name="BiddingScreen" component={BiddingScreen} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />


          <Stack.Screen name="CustomizeScreen" component={CustomizeScreen} />
          {/* <Stack.Screen name="CartScreen" component={CartScreen} /> */}
          <Stack.Screen name="BillSummaryScreen" component={BillSummaryScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />

          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

           <Stack.Screen name="DoughnutBoxScreen" component={DoughnutBoxScreen} />
            
        <Stack.Screen name ="AddAddressScreen"component={AddAddressScreen} />
         <Stack.Screen name ="SelectLocationScreen"component={SelectLocationScreen} />
          <Stack.Screen name ="SearchServicesScreen"component={SearchServicesScreen} />
            <Stack.Screen name ="ServiceVendorsScreen"component={ServiceVendorsScreen} />



           <Stack.Screen name="VendorListScreen">
             {(props) => (
               <VendorListScreen
                 {...props}
                 cart={cart}
                 onViewCart={() => props.navigation.navigate('CartScreen')}
               />
             )}
           </Stack.Screen>
           <Stack.Screen name="VendorMenuScreen">
             {(props) => (
               <VendorMenuScreen
                 {...props}
                 cart={cart}
                 setCart={setCart}
                 onViewCart={() => props.navigation.navigate('CartScreen')}
               />
             )}
           </Stack.Screen>
           <Stack.Screen name="CartScreen">
             {(props) => (
               <CartScreen
                 {...props}
                 cart={cart}
                 setCart={setCart}
               />
             )}
           </Stack.Screen>



        </Stack.Navigator>
      </NavigationContainer>
      </CartProvider>
    </PaperProvider>
  );
};

export default App;