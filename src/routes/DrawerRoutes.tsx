import * as React from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';

import Home from '../screen/home/Home';
import tw from '../lib/tailwind';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  // console.log(user);

  return (
    <>
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <DrawerItemList {...props} />
        <View style={tw`flex-col flex-1 px-6 py-8 gap-10 `}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Wallet');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <Text style={tw`text-white400 font-RobotoBold text-xs md:text-sm`}>
              My Wallet
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={tw` py-6 px-6`}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={tw` flex-row gap-3 items-center`}>
          <Text style={tw`text-white400 font-RobotoBold text-xs md:text-sm`}>
            Log Out
          </Text>
        </TouchableOpacity>
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
        drawerStyle: tw`w-[66%] md:w-[65%] tablet:w-[22%] h-full`,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'}, // Hides the drawer item for the screen
        }}
        name="App"
        component={Home}
      />
    </Drawer.Navigator>
  );
}
