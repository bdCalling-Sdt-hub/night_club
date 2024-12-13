import {StatusBar, View} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import {BaseColor} from '../../utils/utils';

const Background = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <View style={[tw`bg-base`, style]}>
      {children}
      <StatusBar
        barStyle={'light-content'}
        animated
        backgroundColor={BaseColor}
      />
    </View>
  );
};

export default Background;
