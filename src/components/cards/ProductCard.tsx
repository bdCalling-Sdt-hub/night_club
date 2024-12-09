import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {IProduct} from '../../redux/interface/products';
import {IconFillLove} from '../../icons/icons';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

export interface IProductCarProps {
  onPress?: () => void;
  containerStyle?: any;
  showStatus?: boolean;
  status?: 'Delivered' | 'Pending' | 'Cancelled';
  item: IProduct;
}

const ProductCard = ({
  item,
  onPress,
  status,
  showStatus,
  containerStyle,
}: IProductCarProps) => {
  // console.log(item);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        tw`bg-white w-[48%] tablet:w-[25%]  p-2 md:p-4 tablet:p-5 shadow-md shadow-slate-800 rounded-xl gap-2`,
        containerStyle,
      ]}>
      {item?.product_images && (
        <View>
          <FastImage
            style={tw`w-full  h-32 rounded-xl`}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item?.product_images![0],
            }}
          />
          {item?.status && (
            <Text
              numberOfLines={2}
              style={tw`absolute right-1 top-1 bg-white px-2 py-1 rounded-md ${
                item?.status === 'pending'
                  ? 'text-yellow-500 '
                  : item?.status === 'cancelled'
                  ? 'text-red-500'
                  : 'text-green-500'
              } font-RobotoBold text-xs `}>
              {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
            </Text>
          )}
        </View>
      )}

      <View style={tw` flex-row justify-between gap-2`}>
        <View style={tw`flex-row items-center gap-1`}>
          <SvgXml height={10} width={10} xml={IconFillLove} />
          <Text style={tw`text-center font-RobotoBold text-sm text-black900`}>
            {item?.price}
          </Text>
        </View>
        <Text
          style={tw`text-center text-[#615E69] font-NunitoSansRegular text-xs`}>
          {item?.product_code}
        </Text>
      </View>
      <Text
        numberOfLines={2}
        style={tw`text-left text-black900 font-RobotoBold text-sm flex-1`}>
        {item?.product_name}
      </Text>

      <View>
        {showStatus && (
          <View style={tw`flex-row gap-2 justify-center items-center my-2`}>
            <View
              style={tw`w-2 h-2 rounded-full justify-center items-center ${
                status === 'Pending'
                  ? 'bg-yellow-500'
                  : status === 'Cancelled'
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}></View>
            <Text
              style={tw`text-center text-black ${
                status === 'Pending'
                  ? 'text-yellow-500'
                  : status === 'Cancelled'
                  ? 'text-red-500'
                  : 'text-green-500'
              } text-xs font-RobotoBold`}>
              {status}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
