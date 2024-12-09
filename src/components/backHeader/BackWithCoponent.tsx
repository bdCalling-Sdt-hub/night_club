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
            xml={`<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14.5L1 8L8 1.5" stroke="#1D1929" stroke-linecap="square"/>
        </svg>
        `}
          />
          <Text
            numberOfLines={1}
            style={[tw`text-black900 font-RobotoBold text-lg`, titleStyle]}>
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
