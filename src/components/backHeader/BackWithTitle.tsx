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
      style={[tw`flex-row items-center gap-3 p-[4%]`, containerStyle]}>
      <SvgXml
        xml={`<svg width="13" height="20" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3333 20.0834L0.75 10.5L10.3333 0.916687L12.0344 2.61773L4.15208 10.5L12.0344 18.3823L10.3333 20.0834Z" fill="white"/>
</svg>

        `}
      />
      <Text style={[tw`text-white50 font-RobotoBold text-base`, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(BackWithTitle);
