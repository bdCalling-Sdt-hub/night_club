import AddNewGuest from '../screen/Guestlist/AddNewGuest';
import AddNewGuestList from '../screen/Guestlist/AddNewGuestList';
import AddNewTag from '../screen/Guestlist/AddNewTag';
import AddUser from '../screen/Profile/AddUser';
import AllGuestInGuestList from '../screen/Guestlist/AllGuestInGuestList';
import {BaseColor} from '../utils/utils';
import CreateNewPassword from '../screen/auth/CreateNewPassword';
import CustomDrawer from './DrawerRoutes';
import EditProfile from '../screen/Profile/EditProfile';
import EventDetails from '../screen/Event/EventDetails';
import EventEdit from '../screen/Event/EventEdit';
import ForgetPassword from '../screen/auth/ForgetPassword';
import GuestDetails from '../screen/Guestlist/GuestDetails';
import GuestList from '../screen/Guestlist/GuestList';
import LoadingSplash from '../screen/spalsh/LoadingSplash';
import LoginScreen from '../screen/auth/LoginScreen';
import ManageUsers from '../screen/Profile/ManageUsers';
import {NavigationContainer} from '@react-navigation/native';
import News from '../screen/Settings/News';
import PrivacyAndPolicy from '../screen/Settings/PrivacyAndPolicy';
import ResetPassword from '../screen/auth/ResetPassword';
import SignUpScreen from '../screen/auth/SignUpScreen';
import Support from '../screen/Settings/Support';
import TermsAndCondition from '../screen/Settings/TermsAndCondition';
import UpdateUser from '../screen/Profile/UpdateUser';
import VenueCreate from '../screen/home/VenueCreate';
import VenueEvent from '../screen/Event/VenueEvent';
import VenuesDetails from '../screen/home/VenuesDetails';
import VenuesEdit from '../screen/home/VenuesEdit';
import VerifyEmail from '../screen/auth/VerifyEmail';
import VerifySuccess from '../screen/auth/VerifySuccess';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: BaseColor,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Loading" component={LoadingSplash} />
        {/* <Stack.Screen name="test" component={TestScreen} /> */}
        <Stack.Screen name="Home" component={CustomDrawer} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifySuccess" component={VerifySuccess} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CreatePassword" component={CreateNewPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
        <Stack.Screen name="AddNewGuestList" component={AddNewGuestList} />
        <Stack.Screen name="AddNewTag" component={AddNewTag} />
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
