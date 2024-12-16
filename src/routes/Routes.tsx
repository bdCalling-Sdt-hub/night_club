import AddNewGuest from '../screen/Guestlist/AddNewGuest';
import {BaseColor} from '../utils/utils';
import BottomRoutes from './BottomRoutes';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import EventDetails from '../screen/Event/EventDetails';
import EventEdit from '../screen/Event/EventEdit';
import ForgetPassword from '../screen/auth/ForgetPassword';
import GuestDetails from '../screen/Guestlist/GuestDetails';
import GuestList from '../screen/Guestlist/GuestList';
import LoginScreen from '../screen/auth/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import SignUpScreen from '../screen/auth/SignUpScreen';
import VenueCreate from '../screen/home/VenueCreate';
import VenueEvent from '../screen/Event/VenueEvent';
import VenuesDetails from '../screen/home/VenuesDetails';
import VenuesEdit from '../screen/home/VenuesEdit';
import VerifyEmail from '../screen/auth/VerifyEmail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: BaseColor,
          animation: 'slide_from_right',
        }}>
        {/* <Stack.Screen name="Loading" component={LoadingSplash} /> */}
        {/* <Stack.Screen name="test" component={TestScreen} /> */}
        <Stack.Screen name="Home" component={BottomRoutes} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifySuccess" component={BottomRoutes} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CreatePassword" component={CreateNewPassword} />
        {/* // Venues All Routes */}
        <Stack.Screen name="VenuesDetails" component={VenuesDetails} />
        <Stack.Screen name="VenueEvent" component={VenueEvent} />
        <Stack.Screen name="VenueEdit" component={VenuesEdit} />
        {/* Event all Routes  */}
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="EventEdit" component={EventEdit} />
        <Stack.Screen name="VenueUpdate" component={VenueCreate} />
        {/* GuestList All Routes  */}
        <Stack.Screen name="GuestList" component={GuestList} />
        <Stack.Screen name="AddNewGuest" component={AddNewGuest} />
        <Stack.Screen name="GuestDetails" component={GuestDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
