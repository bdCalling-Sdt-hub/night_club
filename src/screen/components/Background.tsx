import {StatusBar, View} from 'react-native';

import {BaseColor} from '../../utils/utils';
import React from 'react';

const Background = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <View style={style}>
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
