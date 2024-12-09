import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {IUserChat} from '../../redux/interface/message';
import React from 'react';
import {getRandomColor} from '../../utils/getRandomColor';
import moment from 'moment-timezone';
import tw from '../../lib/tailwind';

interface MessageCardProps {
  item: IUserChat;
  onPress?: () => void;
  joinBtn?: boolean;
  joinPress?: () => void;
  offPartOne?: boolean;
  offPartTow?: boolean;
  offPartThree?: boolean;
  titleStyle?: any;
  subTitleStyle?: any;
  containerStyle?: any;
  titleContainerStyle?: any;
  Component?: React.ReactNode;
  disabled?: boolean;
  ImagePressable?: boolean;
  cardStyle?: 'message' | 'group' | 'notification' | 'profile';
}

// three part are divided 1= is image part 2= is name and title part 3= is icons and options part
const MessageCard = ({
  item,
  onPress,
  joinBtn,
  joinPress,
  subTitleStyle,
  titleStyle,
  containerStyle,
  titleContainerStyle,
  offPartOne,
  offPartTow,
  offPartThree,
  Component,
  disabled,
  ImagePressable,
  cardStyle,
}: MessageCardProps) => {
  // console.log(item?.images);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[tw`flex-row items-center  gap-3 px-[4%] py-2`, containerStyle]}>
      {!offPartOne && (
        <TouchableOpacity
          disabled={!ImagePressable}
          style={tw`w-12 h-12 aspect-square rounded-2xl overflow-hidden`}>
          {item.image ? (
            <FastImage
              source={{uri: item.image}}
              resizeMode={FastImage.resizeMode.cover}
              style={tw`w-full h-full`}
            />
          ) : (
            <View
              style={tw`w-full h-full bg-[${getRandomColor()}] rounded-2xl justify-center items-center`}>
              <Text style={tw`text-white font-RobotoBold text-lg shadow`}>
                {item.full_name?.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {!offPartTow && (
        <View style={[tw`flex-1  gap-[2px]`, titleContainerStyle]}>
          {item.full_name && (
            <Text
              numberOfLines={1}
              style={[tw`text-[#1D1929] font-RobotoBold text-sm`, titleStyle]}>
              {item.full_name}
            </Text>
          )}

          {item.last_message ? (
            <Text
              style={[
                tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`,
                subTitleStyle,
              ]}>
              {item.last_message}
            </Text>
          ) : (
            cardStyle === 'message' && (
              <Text
                style={[
                  tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`,
                  subTitleStyle,
                ]}>
                send a image
              </Text>
            )
          )}
        </View>
      )}
      {Component && Component}
      {/* show unread message naumber */}
      {!offPartThree && (
        <View style={tw`items-center gap-2`}>
          {joinBtn ? (
            <TouchableOpacity
              onPress={joinPress}
              activeOpacity={0.5}
              style={tw`items-center gap-2 `}>
              {/* unread message = 0 so dot show  */}
              <Text style={tw`text-white400 font-RobotoBold text-sm`}>
                {/* date format like this 8:10 AM/PM  */}
                Join
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {item.unread_count !== 0 && (
                <View
                  style={tw`w-4 h-4 rounded-full bg-red-500 items-center justify-center`}>
                  <Text style={tw`text-white font-RobotoBold text-[10px]`}>
                    {item.unread_count}
                  </Text>
                </View>
              )}

              <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
                {/* date format like this 8:10 AM/PM  */}
                {moment(item.last_message_time).format('LT')}
              </Text>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MessageCard;
