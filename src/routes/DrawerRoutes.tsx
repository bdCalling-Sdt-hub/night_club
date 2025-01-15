import * as React from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text, View} from 'react-native';
import {IconCloseGray, IconLoginRed} from '../icons/icons';

import IwtButton from '../components/buttons/IwtButton';
import TButton from '../components/buttons/TButton';
import {useToast} from '../components/modals/Toaster';
import {useAuth} from '../context/AuthProvider';
import {useFireAuth} from '../firebase/useFireAuth';
import tw from '../lib/tailwind';
import BottomRoutes from './BottomRoutes';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  // console.log(user);
  const {closeToast, showToast} = useToast();
  const {setUser, setUserId} = useAuth();
  const {SignOut} = useFireAuth();

  const handleDeleteAccount = () => {
    showToast({
      title: 'Delete Account',
      titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
      content: 'Are you sure you want to delete your account?',
      btnDisplay: true,
      multipleBTNStyle: tw`flex-col gap-3`,
      multipleButton: [
        {
          buttonText: 'Yes',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            closeToast();
          },
        },
        {
          buttonText: 'No',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            closeToast();
          },
        },
      ],
    });
  };

  return (
    <>
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <DrawerItemList {...props} />
        <View style={tw`flex-col flex-1 px-4 py-8 gap-10 `}>
          <IwtButton
            containerStyle={tw`bg-transparent flex-row-reverse justify-between`}
            title="Settings"
            titleStyle={tw`text-white50 font-RobotoBold text-xl`}
            svg={IconCloseGray}
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>
        <View style={tw`px-4`}>
          <TButton
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-white60 font-RobotoRegular text-base`}
            title="News"
            onPress={() => props.navigation.navigate('News')}
          />
          <TButton
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-white60 font-RobotoRegular text-base `}
            title="Change password"
            onPress={() => props.navigation.navigate('CreatePassword')}
          />
          <TButton
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-white60 font-RobotoRegular text-base`}
            title="Terms & conditions"
            onPress={() => props.navigation.navigate('TermsAndCondition')}
          />
          <TButton
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-white60 font-RobotoRegular text-base`}
            title="Privacy Policy"
            onPress={() => props.navigation.navigate('PrivacyAndPolicy')}
          />
          <TButton
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-white60 font-RobotoRegular text-base`}
            title="Support"
            onPress={() => props.navigation.navigate('Support')}
          />
          <TButton
            onPress={() => {
              handleDeleteAccount();
            }}
            containerStyle={tw`bg-transparent self-start`}
            titleStyle={tw`text-red-600 font-RobotoRegular text-base`}
            title="Delete account"
          />
        </View>
      </DrawerContentScrollView>
      <View style={tw` py-6 px-6 gap-5`}>
        <IwtButton
          containerStyle={tw`bg-transparent flex-row-reverse justify-between`}
          title="Logout"
          titleStyle={tw`text-white60 font-RobotoBold text-base`}
          svg={IconLoginRed}
          onPress={() => {
            SignOut();
            setUserId(undefined);
            setUser(undefined);
            (props.navigation as any).replace('Loading');
            props.navigation.closeDrawer();
          }}
        />
        <View>
          <Text style={tw`text-primary font-RobotoBold text-xs text-center`}>
            Version 2.0.1
          </Text>
        </View>
      </View>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right', // Drawer comes from the right
        drawerType: 'front',
        headerShown: false,
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        drawerStyle: tw`w-[66%] md:w-[65%] tablet:w-[22%] h-full bg-base`,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'}, // Hides the drawer item for the screen
        }}
        name="App"
        component={BottomRoutes}
      />
    </Drawer.Navigator>
  );
}
