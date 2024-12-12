import {Text, TouchableOpacity} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface BackWithTitleProps {
  onPress?: () => void;
  title: string;
  titleStyle?: any;
  containerStyle?: any;
  backOff?: boolean;
}

const BackWithTitle = ({
  onPress,
  title,
  containerStyle,
  titleStyle,
  backOff,
}: BackWithTitleProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[tw`flex-row items-center gap-2 p-[4%]`, containerStyle]}>
      <SvgXml
        xml={`<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14.5L1 8L8 1.5" stroke="#1D1929" stroke-linecap="square"/>
        </svg>
        `}
      />
      <Text style={[tw`text-black900 font-RobotoBold text-lg`, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(BackWithTitle);
