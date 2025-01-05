import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import ForgetPassword from '../screen/auth/ForgetPassword';
import LoginScreen from '../screen/auth/LoginScreen';
import ResetPassword from '../screen/auth/ResetPassword';
import SendMailSuccess from '../screen/auth/SendMailSuccess';
import SignUpScreen from '../screen/auth/SignUpScreen';
import VerifyEmail from '../screen/auth/VerifyEmail';
import VerifySuccess from '../screen/auth/VerifySuccess';
import EventCreate from '../screen/Event/EventCreate';
import EventDetails from '../screen/Event/EventDetails';
import EventEdit from '../screen/Event/EventEdit';
import VenueEvent from '../screen/Event/VenueEvent';
import AddNewGuest from '../screen/Guestlist/AddNewGuest';
import AddNewGuestList from '../screen/Guestlist/AddNewGuestList';
import AddNewTag from '../screen/Guestlist/AddNewTag';
import AllGuestInGuestList from '../screen/Guestlist/AllGuestInGuestList';
import GuestDetails from '../screen/Guestlist/GuestDetails';
import GuestEdit from '../screen/Guestlist/GuestEdit';
import VenueGuestList from '../screen/Guestlist/VenueGuestList';
import VenueCreate from '../screen/home/VenueCreate';
import VenuesDetails from '../screen/home/VenuesDetails';
import VenuesEdit from '../screen/home/VenuesEdit';
import AddUser from '../screen/Profile/AddUser';
import EditProfile from '../screen/Profile/EditProfile';
import ManageUsers from '../screen/Profile/ManageUsers';
import UpdateUser from '../screen/Profile/UpdateUser';
import News from '../screen/Settings/News';
import PrivacyAndPolicy from '../screen/Settings/PrivacyAndPolicy';
import Support from '../screen/Settings/Support';
import TermsAndCondition from '../screen/Settings/TermsAndCondition';
import LoadingSplash from '../screen/spalsh/LoadingSplash';
import {BaseColor} from '../utils/utils';
import CustomDrawer from './DrawerRoutes';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://pushnotifiation-d1bcb.web.app/'],
  config: {
    screens: {
      VerifySuccess: 'email-verified',
      Login: 'login',
    },
  },
};

function Routes() {
  // useEffect(() => {
  //   const handleDeepLink = event => {
  //     const url = event.url;

  //     if (url.includes('email-verified')) {
  //       console.log('Email verified', url);
  //     }
  //   };

  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeAllListeners('url');
  //   };
  // }, []);
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: BaseColor,
          statusBarStyle: 'light',
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Loading" component={LoadingSplash} />
        {/* <Stack.Screen name="test" component={TestScreen} /> */}
        <Stack.Screen name="Home" component={CustomDrawer} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifySuccess" component={VerifySuccess} />
        <Stack.Screen name="SendMailSuccess" component={SendMailSuccess} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CreatePassword" component={CreateNewPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        {/* // Venues All Routes */}
        <Stack.Screen name="VenuesDetails" component={VenuesDetails} />
        <Stack.Screen name="VenueEvent" component={VenueEvent} />
        <Stack.Screen name="VenueEdit" component={VenuesEdit} />
        <Stack.Screen name="VenueCreate" component={VenueCreate} />
        {/* Event all Routes  */}
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="EventEdit" component={EventEdit} />
        <Stack.Screen name="EventCreate" component={EventCreate} />
        {/* GuestList All Routes  */}
        <Stack.Screen name="VenueGuestList" component={VenueGuestList} />
        <Stack.Screen name="AddNewGuest" component={AddNewGuest} />
        <Stack.Screen name="GuestDetails" component={GuestDetails} />
        <Stack.Screen name="AddNewGuestList" component={AddNewGuestList} />
        <Stack.Screen name="AddNewTag" component={AddNewTag} />
        <Stack.Screen name="GuestEdit" component={GuestEdit} />
        <Stack.Screen
          name="AllGuestInGuestList"
          component={AllGuestInGuestList}
        />
        {/* Profile All Routes  */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        {/* Settings All Routes */}
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
        <Stack.Screen name="PrivacyAndPolicy" component={PrivacyAndPolicy} />
        <Stack.Screen name="Support" component={Support} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
