import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';

const Background = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return <View style={[tw`bg-base`, style]}>{children}</View>;
};

export default Background;
