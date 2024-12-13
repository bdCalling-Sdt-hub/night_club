import React from 'react';
import {ActivityIndicator} from 'react-native';
import {AnimatedImage} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

interface IAniImage {
  source: {uri: string};
  containerStyle?: any;
  imageStyle?: any;
}

const AniImage = ({source, containerStyle, imageStyle}: IAniImage) => {
  return (
    <AnimatedImage
      containerStyle={[tw`  items-center rounded-md`, containerStyle]}
      errorSource={source}
      animationDuration={500}
      style={[tw` rounded-md`, imageStyle]}
      loader={<ActivityIndicator color="white" size={'small'} />}
      source={source}
    />
  );
};

export default AniImage;
