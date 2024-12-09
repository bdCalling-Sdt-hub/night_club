import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {IOrder} from '../../redux/interface/order';
import {IconFillLove} from '../../icons/icons';
import PriorityCard from './StatusCard';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind'; // Tailwind helper function

interface OrderCardProps {
  item: IOrder;
  firstButtonText: string;
  secondButtonText: string;
  onPressFirstButton?: () => void;
  onPressSecondButton?: () => void;
  isLoading?: boolean;
  firstButtonStyle?: any;
  secondButtonStyle?: any;
  onlyFirst?: boolean;
  onlySecond?: boolean;
  cardStyle?: 'seller' | 'buyer';
  navigation?: any;
}

const OrderCard = ({
  item,
  firstButtonText,
  secondButtonText,
  firstButtonStyle,
  isLoading,
  onlyFirst,
  onlySecond,
  onPressFirstButton,
  onPressSecondButton,
  secondButtonStyle,
  cardStyle,
  navigation,
}: OrderCardProps) => {
  // console.log(item);
  // console.log(item?.product?.images);
  return (
    <View style={tw`border-primary border rounded-md border-opacity-25`}>
      <View style={tw`bg-white rounded-lg shadow-sm p-4`}>
        {/* Product Section */}
        <View
          // activeOpacity={0.8}
          // onPress={() => {
          //   navigation?.navigate('ProductDetails', {
          //     item: item?.product,
          //   });
          // }}
          style={tw`flex-row items-center gap-2 mb-4 bg-white  p-3 rounded-md`}>
          {item?.product?.images![0] && (
            <Image
              source={{uri: item?.product?.images![0]}}
              style={tw`w-20 h-20 rounded-md`}
            />
          )}

          <View style={tw`flex-1`}>
            <Text
              numberOfLines={2}
              style={tw`text-lg font-bold self-start flex-1 text-gray-800`}>
              {item?.product?.product_name}
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-sm text-gray-500 mt-1`}>
                {item?.product?.price}
              </Text>
              <SvgXml xml={IconFillLove} width={12} height={12} />
            </View>
          </View>
        </View>

        {/* Order Details */}
        <View style={tw`mb-4 bg-gray-50 p-3 rounded-md`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>
            Order Details
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Order ID:</Text> {item?.order_id}
          </Text>
          <View style={tw`   flex-row items-center gap-1`}>
            <Text style={tw`font-semibold text-gray-600`}>Total Amount:</Text>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-sm text-gray-500 mt-1`}>
                {item?.total_amount}
              </Text>
              <SvgXml xml={IconFillLove} width={15} height={15} />
            </View>
          </View>

          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Order Date:</Text>{' '}
            {item?.created_at}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Phone:</Text> {item?.phone_number}
          </Text>
          <View style={tw`mt-2`}>
            {item?.status && (
              <PriorityCard cardStyle={cardStyle} status={item?.status} />
            )}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={tw`mb-4 bg-gray-50 p-3 rounded-md`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>
            Delivery Address
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Country:</Text>{' '}
            {item?.address?.country}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>State:</Text> {item?.address?.state}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Zipcode:</Text>{' '}
            {item?.address?.zipcode}
          </Text>
          <Text style={tw`text-sm text-gray-600`}>
            <Text style={tw`font-semibold`}>Address:</Text>{' '}
            {item?.address?.full_address}
          </Text>
        </View>

        {/* Notes */}
        <View style={tw`mb-4 bg-blue-50 p-3 rounded-md`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>
            Delivery Notes
          </Text>
          <Text style={tw`text-sm text-gray-600`}>{item?.notes}</Text>
        </View>

        {/* Buttons */}
        {item?.status !== 'canceled' && (
          <View style={tw`flex-row justify-between mt-4`}>
            {!onlySecond && (
              <TouchableOpacity
                disabled={isLoading}
                style={[
                  tw`flex-1 bg-primary p-3 rounded-md mr-2 gap-3`,
                  firstButtonStyle,
                ]}
                onPress={onPressFirstButton}>
                {isLoading ? <ActivityIndicator color="white" /> : null}
                <Text style={tw`text-center text-white font-bold`}>
                  {firstButtonText}
                </Text>
              </TouchableOpacity>
            )}

            {!onlyFirst && (
              <TouchableOpacity
                disabled={isLoading}
                style={[
                  tw`flex-1 bg-rose-800 p-3 rounded-md ml-2 gap-3`,
                  secondButtonStyle,
                ]}
                onPress={onPressSecondButton}>
                {isLoading ? <ActivityIndicator color="white" /> : null}
                <Text style={tw`text-center text-white font-bold`}>
                  {secondButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
