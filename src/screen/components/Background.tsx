import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';
import {width} from '../../utils/utils';

const Background = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return <View style={[tw`bg-base `, style, {width: width}]}>{children}</View>;
};

export default Background;
