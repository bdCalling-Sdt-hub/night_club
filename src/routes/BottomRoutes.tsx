import {Text, TouchableOpacity, View} from 'react-native';
import {
  IconCalendarCyan,
  IconCalendarGay,
  IconListCyan,
  IconListGray,
  IconLocationCyan,
  IconLocationGay,
  IconUserHomeCyan,
  IconUserHomeGray,
} from '../icons/icons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import {useAuth} from '../context/AuthProvider';
import {userAccess} from '../hook/useAccess';
import {IconBottomPlusButton} from '../icons/Special.icon';
import tw from '../lib/tailwind';
import Background from '../screen/components/Background';
import EventScreen from '../screen/Event/EventScreen';
import MyGuestListScreen from '../screen/Guestlist/MyGuestListScreen';
import Home from '../screen/home/Home';
import ProfileScreen from '../screen/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
function CustomTabBar({state, descriptors, navigation}: any) {
  const {user} = useAuth();
  // console.log(state);
  return (
    <Background style={tw`bg-base`}>
      <View style={tw`flex-row justify-around px-4 h-16 items-center`}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          if (route.name === 'Venue') {
            return (
              <TouchableOpacity
                onPress={onPress}
                key={index}
                style={tw`justify-center items-center gap-1`}>
                <SvgXml xml={isFocused ? IconLocationCyan : IconLocationGay} />
                <Text
                  style={[
                    tw`text-white font-RobotoMedium text-xs`,
                    isFocused && tw`text-primary`,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }
          if (route.name === 'Event') {
            return (
              <TouchableOpacity
                onPress={onPress}
                key={index}
                style={tw`justify-center items-center gap-1`}>
                <SvgXml xml={isFocused ? IconCalendarCyan : IconCalendarGay} />
                <Text
                  style={[
                    tw`text-white font-RobotoMedium text-xs`,
                    isFocused && tw`text-primary`,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }

          if (route.name === 'Button' && userAccess({GRole: 'middler'})) {
            if (
              state.routes[state.index].name == 'Venue' &&
              user?.role === 'manager'
            ) {
              return null;
            }
            if (state.routes[state.index].name == 'Profile') {
              return null;
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Determine the appropriate route based on the current tab
                  const currentRoute = state.routes[state.index].name;

                  switch (currentRoute) {
                    case 'Venue':
                      navigation.navigate('VenueCreate'); // Navigate to Create Venue
                      break;
                    case 'Event':
                      navigation.navigate('EventCreate'); // Navigate to Create Event
                      break;
                    case 'GuestList':
                      navigation.navigate('AddNewGuest'); // Navigate to Create Guest List
                      break;
                    default:
                      // console.log('No specific route for the button.');
                      break;
                  }
                }}
                style={tw`justify-center items-center gap-1 mb-8`}>
                <SvgXml xml={IconBottomPlusButton} />
              </TouchableOpacity>
            );
          }

          if (route.name === 'GuestList') {
            return (
              <TouchableOpacity
                onPress={onPress}
                key={index}
                style={tw`justify-center items-center gap-1`}>
                <SvgXml xml={isFocused ? IconListCyan : IconListGray} />
                <Text
                  style={[
                    tw`text-white font-RobotoMedium text-xs`,
                    isFocused && tw`text-primary`,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }
          if (route.name === 'Profile') {
            return (
              <TouchableOpacity
                onPress={onPress}
                key={index}
                style={tw`justify-center items-center gap-1`}>
                <SvgXml xml={isFocused ? IconUserHomeCyan : IconUserHomeGray} />
                <Text
                  style={[
                    tw`text-white font-RobotoMedium text-xs`,
                    isFocused && tw`text-primary`,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </Background>
  );
}

function BottomRoutes() {
  const {user} = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Venue" component={Home as any} />
      <Tab.Screen name="Event" component={EventScreen as any} />
      <Tab.Screen name="Button" component={Button as any} />
      {user?.role !== 'guard' && (
        <Tab.Screen name="GuestList" component={MyGuestListScreen as any} />
      )}

      <Tab.Screen name="Profile" component={ProfileScreen as any} />
    </Tab.Navigator>
  );
}

export default BottomRoutes;

const Button = () => {
  return <View></View>;
};
