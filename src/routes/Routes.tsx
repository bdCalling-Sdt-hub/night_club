import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import ForgetPassword from '../screen/auth/ForgetPassword';
import LoginScreen from '../screen/auth/LoginScreen';
import SignUpScreen from '../screen/auth/SignUpScreen';
import VerifyEmail from '../screen/auth/VerifyEmail';
import EventDetails from '../screen/Event/EventDetails';
import VenueEvent from '../screen/Event/VenueEvent';
import VenuesDetails from '../screen/home/VenuesDetails';
import VenuesEdit from '../screen/home/VenuesEdit';
import VenueUpdate from '../screen/home/VenueUpdate';
import {BaseColor} from '../utils/utils';
import BottomRoutes from './BottomRoutes';

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
        <Stack.Screen name="VenueUpdate" component={VenueUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
