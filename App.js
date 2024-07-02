import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import Splash from './src/components/Splash';
import Login from './src/components/Login';
import UserProfile from './src/components/UserProfile'
import EditUserProfile from './src/screens/EditUserProfile'
import Signup from './src/components/Signup'
import OtpContent from './src/screens/OtpContent'
import LunchMenu from './src/screens/LunchMenu'
import VegIngredients from './src/screens/VegIngredients'
import EventPage from './src/screens/EventPage'
import Ingredients from './src/screens/Ingredients'
import appIntroSlider from './src/components/appIntroSlider'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='EditUserProfile' component={EditUserProfile} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='OtpContent' component={OtpContent} />
        <Stack.Screen name='LunchMenu' component={LunchMenu} />
        <Stack.Screen name='VegIngredients' component={VegIngredients} />
        <Stack.Screen name='EventPage' component={EventPage} />
        <Stack.Screen name='Ingredients' component={Ingredients} />
        <Stack.Screen name='Splash' component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
