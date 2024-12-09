import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {ITransfer} from '../../redux/interface/wallet';
import {IconFillLove} from '../../icons/icons';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../buttons/TButton';
import tw from '../../lib/tailwind';

interface TransactionCardProps {
  item: ITransfer;
  onPressAccept?: () => void;
  onPressDecline?: () => void;
}

const TransferRequestCard = ({
  item,
  onPressAccept,
  onPressDecline,
}: TransactionCardProps) => {
  // console.log(item);
  return (
    <View style={tw` bg-gray-100 rounded-md `}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw` flex-row gap-2 items-center border border-gray-200 py-2 px-3 rounded-md bg-white`}>
        <View style={tw`relative`}>
          <FastImage
            style={tw`w-12 h-12 rounded-full`}
            source={{uri: item?.requested_by?.image}}
            resizeMode={FastImage.resizeMode.cover}
          />
          {/* <View
          style={tw`w-5 h-5 rounded-full bg-white absolute bottom-0 left-8 justify-center items-center`}>
          <SvgXml
            xml={item?.requested_by === 'credit' ? IconSendDown : IconSendUp}
          />
        </View> */}
        </View>
        <View style={tw`flex-row justify-between items-center flex-1`}>
          <View>
            <Text style={tw`text-black900 font-RobotoBold text-base`}>
              {item?.requested_by?.full_name}
            </Text>
            <Text style={tw`text-black600 font-NunitoSansRegular text-[10px]`}>
              {new Date(item?.created_at).toDateString()}
            </Text>
            <Text style={tw`text-black600 font-NunitoSansRegular text-[10px]`}>
              {item.status}
            </Text>
          </View>

          <View style={tw`flex-row gap-2 items-center justify-center`}>
            <SvgXml
              height={15}
              width={15}
              xml={IconFillLove}
              style={tw`w-6 h-6`}
            />
            <Text style={tw`text-black900 font-RobotoBold text-base`}>
              {parseInt(item?.amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={tw`flex-row justify-end gap-2 items-center my-3 px-3`}>
        <TButton
          onPress={onPressAccept}
          title="Accept"
          containerStyle={tw`py-2 px-3 w-24 bg-primary `}
        />
        <TButton
          onPress={onPressDecline}
          title="Decline"
          containerStyle={tw`py-2 px-3 w-24 bg-rose-700 `}
        />
      </View>
    </View>
  );
};

export default React.memo(TransferRequestCard);
