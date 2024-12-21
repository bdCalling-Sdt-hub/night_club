import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconRightTik} from '../../icons/Special.icon';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const PassChanSuccess = ({navigation}: NavigProps<null>) => {
  setTimeout(() => {
    (navigation as any)?.replace('HomeRoutes');
  }, 500);
  return (
    <View style={tw`flex-1 bg-base justify-center items-center`}>
      <View style={tw`gap-3 justify-center items-center`}>
        <View
          style={tw`w-20 h-20 rounded-full bg-green-600 justify-center items-center`}>
          <SvgXml xml={IconRightTik} />
        </View>
        <Text style={tw`text-[20px] text-white400 font-RobotoBold `}>
          Password updated successfully
        </Text>
      </View>
    </View>
  );
};

export default PassChanSuccess;
