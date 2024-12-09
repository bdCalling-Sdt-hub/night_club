import {IconFillLove, IconSendDown, IconSendUp} from '../../icons/icons';
import {Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {ITransactions} from '../../redux/interface/payment';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface TransactionCardProps {
  item: ITransactions;
}

const TransactionCard = ({item}: TransactionCardProps) => {
  // console.log(item);
  return (
    <View style={tw`my-3 flex-row gap-2 items-center`}>
      <View style={tw`relative`}>
        <FastImage
          style={tw`w-12 h-12 rounded-full`}
          source={{uri: item?.user?.image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={tw`w-5 h-5 rounded-full bg-white absolute bottom-0 left-8 justify-center items-center`}>
          <SvgXml
            xml={
              item?.status == 'Buy' || item?.status == 'Receive'
                ? IconSendUp
                : IconSendDown
            }
          />
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center flex-1`}>
        <View>
          <Text style={tw`text-black900 font-RobotoBold text-base`}>
            {item?.user?.full_name}
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
            {item?.status == 'Buy' || item?.status == 'Received'
              ? '+' + parseFloat(item?.total_love).toFixed(2)
              : '-' + parseFloat(item?.total_love).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(TransactionCard);
