import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import ForgetPassword from '../screen/auth/ForgetPassword';
import LoginScreen from '../screen/auth/LoginScreen';
import SignUpScreen from '../screen/auth/SignUpScreen';
import VerifyEmail from '../screen/auth/VerifyEmail';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
