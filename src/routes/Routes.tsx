import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import ForgetPassword from '../screen/auth/ForgetPassword';
import LoginScreen from '../screen/auth/LoginScreen';
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
import ViewGuestList from '../screen/Guestlist/ViewGuestList';
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
import TestScreen from '../screen/TestScreen';
import {BaseColor} from '../utils/utils';
import CustomDrawer from './DrawerRoutes';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://nightclubapp.web.app/', 'nightclubapp://'],
  config: {
    screens: {
      VerifySuccess: 'email-verified',
      LoadingSplash: 'login',
    },
  },
};

function Routes() {
  // React.useEffect(() => {
  //   const handleDeepLink = event => {
  //     const url = event.url;
  //     if (url) {
  //       console.log(url);
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
        <Stack.Screen name="Loading" component={LoadingSplash as any} />
        <Stack.Screen name="test" component={TestScreen as any} />
        <Stack.Screen name="Home" component={CustomDrawer as any} />
        <Stack.Screen name="Login" component={LoginScreen as any} />
        <Stack.Screen name="SignUp" component={SignUpScreen as any} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail as any} />
        <Stack.Screen name="VerifySuccess" component={VerifySuccess as any} />
        <Stack.Screen
          name="SendMailSuccess"
          component={SendMailSuccess as any}
        />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword as any} />
        <Stack.Screen
          name="CreatePassword"
          component={CreateNewPassword as any}
        />

        {/* // Venues All Routes */}
        <Stack.Screen name="VenuesDetails" component={VenuesDetails as any} />
        <Stack.Screen name="VenueEvent" component={VenueEvent as any} />
        <Stack.Screen name="VenueEdit" component={VenuesEdit as any} />
        <Stack.Screen name="VenueCreate" component={VenueCreate as any} />
        {/* Event all Routes  */}
        <Stack.Screen name="EventDetails" component={EventDetails as any} />
        <Stack.Screen name="EventEdit" component={EventEdit as any} />
        <Stack.Screen name="EventCreate" component={EventCreate as any} />
        {/* GuestList All Routes  */}
        <Stack.Screen name="ViewGuestList" component={ViewGuestList as any} />
        <Stack.Screen name="AddNewGuest" component={AddNewGuest as any} />
        <Stack.Screen name="GuestDetails" component={GuestDetails as any} />
        <Stack.Screen
          name="AddNewGuestList"
          component={AddNewGuestList as any}
        />
        <Stack.Screen name="AddNewTag" component={AddNewTag as any} />
        <Stack.Screen name="GuestEdit" component={GuestEdit as any} />
        <Stack.Screen
          name="AllGuestInGuestList"
          component={AllGuestInGuestList as any}
        />
        {/* Profile All Routes  */}
        <Stack.Screen name="EditProfile" component={EditProfile as any} />
        <Stack.Screen name="ManageUsers" component={ManageUsers as any} />
        <Stack.Screen name="AddUser" component={AddUser as any} />
        <Stack.Screen name="UpdateUser" component={UpdateUser as any} />
        {/* Settings All Routes */}
        <Stack.Screen name="News" component={News as any} />
        <Stack.Screen
          name="TermsAndCondition"
          component={TermsAndCondition as any}
        />
        <Stack.Screen
          name="PrivacyAndPolicy"
          component={PrivacyAndPolicy as any}
        />
        <Stack.Screen name="Support" component={Support as any} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
