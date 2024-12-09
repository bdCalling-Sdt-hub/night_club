import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {INotification} from '../../redux/interface/notificaiton';
import React from 'react';
import moment from 'moment-timezone';
import tw from '../../lib/tailwind';

interface NotificationCardProps {
  item: INotification;
  onPress?: () => void;
  joinBtn?: boolean;
  offPartOne?: boolean;
  offPartTow?: boolean;
  offPartThree?: boolean;
  titleStyle?: any;
  subTitleStyle?: any;
  containerStyle?: any;
  titleContainerStyle?: any;
}

const NotificationCard = ({
  item,
  containerStyle,
  joinBtn,
  subTitleStyle,
  titleStyle,
  titleContainerStyle,
  offPartOne,
  offPartTow,
  offPartThree,
  onPress,
}: NotificationCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[tw`flex-row items-center gap-3 px-[4%] py-2`, containerStyle]}>
      {!offPartOne && (
        <View style={tw`w-12 h-12 aspect-square rounded-2xl overflow-hidden`}>
          <FastImage
            source={{uri: item.data?.image}}
            style={tw`w-full h-full`}
          />
        </View>
      )}
      {!offPartTow && (
        <View style={[tw`flex-1 `, titleContainerStyle]}>
          <View style={tw`flex-row items-center  flex-wrap gap-1`}>
            {/* <Text
              style={[
                tw`text-[#1D1929] font-RobotoBold text-sm`,
                titleStyle,
              ]}>
              {item.data?.}
            </Text> */}
            <Text
              style={[
                tw`text-[#5D5D5D] font-NunitoSansRegular text-sm`,
                titleStyle,
              ]}>
              {item.data.message}
            </Text>
          </View>
          <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
            {/* date format like this 8:10 AM/PM  */}
            {moment(item.created_at).format('LT')}
          </Text>
        </View>
      )}
      {/* show unread message naumber */}
      {!offPartThree && (
        <View style={tw`items-center gap-2`}>
          {item.read_at === null && (
            <View
              style={tw`w-2 h-2 rounded-full bg-red-500 items-center justify-center`}></View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
export default React.memo(NotificationCard);
