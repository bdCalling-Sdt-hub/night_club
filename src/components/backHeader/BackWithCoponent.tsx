import {Text, TouchableOpacity} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {View} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
}: BackButtonProps) => {
  return (
    <View style={[tw`flex-row items-center gap-2 p-[4%] `, containerStyle]}>
      {!offBack && (
        <TouchableOpacity
          onPress={onPress}
          style={tw`flex-row items-center gap-2`}>
          <SvgXml
            xml={`<svg width="13" height="20" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3333 20.0834L0.75 10.5L10.3333 0.916687L12.0344 2.61773L4.15208 10.5L12.0344 18.3823L10.3333 20.0834Z" fill="white"/>
</svg>
        `}
          />
          <Text
            numberOfLines={1}
            style={[tw`text-white50 font-RobotoBold text-base`, titleStyle]}>
            {title ? title : 'Back'}
          </Text>
        </TouchableOpacity>
      )}
      {offBack && (
        <View style={tw`flex-row items-center gap-2`}>
          <Text
            numberOfLines={1}
            style={[tw`text-black900 font-RobotoBold text-lg`, titleStyle]}>
            {title ? title : 'Back'}
          </Text>
        </View>
      )}

      {ComponentBtn && ComponentBtn}
    </View>
  );
};

export default BackWithComponent;
