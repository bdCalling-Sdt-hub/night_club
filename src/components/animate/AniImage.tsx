import React from 'react';
import {ActivityIndicator} from 'react-native';
import {AnimatedImage} from 'react-native-ui-lib';
import {AnimatedImageProps} from 'react-native-ui-lib/src/components/animatedImage';
import tw from '../../lib/tailwind';

interface IAniImage extends AnimatedImageProps {
  source: {uri: string};
  containerStyle?: any;
  imageStyle?: any;
}

const AniImage = ({
  source,
  containerStyle,
  imageStyle,
  ...props
}: IAniImage) => {
  return (
    <AnimatedImage
      containerStyle={[tw`  items-center rounded-md`, containerStyle]}
      errorSource={source}
      animationDuration={500}
      style={[tw` rounded-md`, imageStyle]}
      loader={<ActivityIndicator color="white" size={'small'} />}
      source={source}
      {...props}
    />
  );
};

export default AniImage;
