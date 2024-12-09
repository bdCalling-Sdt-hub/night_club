import {Text, View} from 'react-native';

import {IconWrite} from '../../icons/icons';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface CreatedHeaderWithITDefaultProps {
  title?: string;
  ComponentBtn?: JSX.Element;
  onPress?: () => void;
  icon?: string;
  visibleIcon?: boolean;
}

const CreatedHeaderWithITB = ({
  title,
  ComponentBtn,
  onPress,
  icon,
  visibleIcon,
}: CreatedHeaderWithITDefaultProps) => {
  return (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center gap-3`}>
        {!visibleIcon && (
          <>{!icon ? <SvgXml xml={IconWrite} /> : <SvgXml xml={icon} />}</>
        )}
        <Text style={tw`text-black900 font-RobotoBold text-base`}>{title}</Text>
      </View>
      <Text
        onPress={onPress}
        style={tw`text-red-600 font-RobotoBold text-base`}>
        Cancel
      </Text>
    </View>
  );
};

export default React.memo(CreatedHeaderWithITB);
