import {Text, View} from 'react-native';

import AniImage from '../../../components/animate/AniImage';
import {INews} from '../../../firebase/interface';
import React from 'react';
import tw from '../../../lib/tailwind';

const NewsCard = ({item}: {item: INews}) => {
  const [seeMore, setSeeMore] = React.useState(false);
  return (
    <View
      style={tw` gap-2 border-primary border-2 rounded-lg p-4 bg-primary600`}>
      {item?.image && (
        <AniImage
          source={{
            uri: item?.image,
          }}
          imageStyle={tw`aspect-video w-full`}
        />
      )}
      <Text
        numberOfLines={seeMore ? 0 : 3}
        style={tw`text-sm text-white60 font-RobotoRegular text-justify`}>
        {item?.content}
      </Text>
      <Text
        onPress={() => setSeeMore(!seeMore)}
        style={tw`text-xs text-primary font-RobotoBold`}>
        {seeMore ? 'See less' : 'See more'}
      </Text>
    </View>
  );
};

export default NewsCard;
