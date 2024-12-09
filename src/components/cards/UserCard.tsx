import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import React from 'react';
import tw from '../../lib/tailwind';

interface UserCardProps {
  item: {
    image: string;
    name: string;
    unreadCount: number;
  };
  onPress?: () => void;
}

const UserCard = ({item, onPress}: UserCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={tw`items-center justify-center gap-1 overflow-visible h-28`}>
      <View style={tw`relative overflow-visible`}>
        <FastImage
          style={tw`w-12 h-12 rounded-2xl`}
          resizeMode={FastImage.resizeMode.contain}
          source={{uri: item.image}}
        />
        {item.unreadCount > 0 && (
          <View
            style={tw`w-5 h-5 bg-red-500 rounded-full absolute -top-1 -right-1 items-center justify-center`}>
            <Text style={tw`text-white font-RobotoBold text-[10px]`}>
              {item?.unreadCount}
            </Text>
          </View>
        )}
      </View>
      <Text style={tw`text-center w-16 h-10 font-RobotoBold text-[12px]`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default UserCard;
