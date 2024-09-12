import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
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
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
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


          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
