import {Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import React from 'react';
import tw from '../../lib/tailwind';

interface SearchCardProps {
  item: any;
  offPeople?: boolean;
  offPost?: boolean;
  offProduct?: boolean;
}

const SearchCard = ({
  item: SingItem,
  offPeople,
  offPost,
  offProduct,
}: SearchCardProps) => {
  const Card = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.type === 'user') {
            // navigation?.navigate('SingleMessage');
          }
        }}
        activeOpacity={0.5}
        style={tw`flex-row items-center gap-3 py-2`}>
        <FastImage
          source={{
            uri:
              item.type === 'product'
                ? item.image
                : item.type === 'post'
                ? item.image
                : item.type === 'user'
                ? item.profilePicture
                : item.image,
          }}
          style={tw`w-12 h-12 rounded-2xl`}
          resizeMode={FastImage.resizeMode.contain}
        />
        {item.type === 'product' ? (
          <View>
            <Text style={tw`text-black500 font-RobotoMedium text-sm`}>
              {item.title})
            </Text>
            <Text style={tw`text-black500 font-RobotoBlack text-[12px]`}>
              $ {item.price}
            </Text>
          </View>
        ) : item.type === 'post' ? (
          <View>
            <Text style={tw`text-black500 font-RobotoMedium text-lg`}>
              {item.author}
            </Text>
            <Text style={tw`text-black500 font-NunitoSansRegular text-[12px]`}>
              {item.title}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={tw`text-black500 font-RobotoMedium text-sm`}>
              {item.name}
            </Text>
            <Text style={tw`text-black500 font-RobotoMedium text-[12px]`}>
              {item.bio}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {SingItem.type === 'product' && !offProduct ? (
        <Card item={SingItem} />
      ) : SingItem.type === 'post' && !offPost ? (
        <Card item={SingItem} />
      ) : (
        SingItem.type === 'user' && !offPeople && <Card item={SingItem} />
      )}
    </>
  );
};

export default SearchCard;
