import {Text, TouchableOpacity} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';

import Background from '../screen/components/Background';
import Home from '../screen/home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tw from '../lib/tailwind';

const Tab = createBottomTabNavigator();
function CustomTabBar({state, descriptors, navigation}: any) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <Background style={tw`bg-base`}>
      {state.routes.map((route, index) => {
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

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity key={index}>
            <Text style={tw`text-white`}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </Background>
  );
}

function BottomRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="HomeRoutes" component={Home} />
    </Tab.Navigator>
  );
}

export default BottomRoutes;
