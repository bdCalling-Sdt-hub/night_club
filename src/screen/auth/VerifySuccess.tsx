import {Text, View} from 'react-native';

import {IconRightTik} from '../../icons/Special.icon';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

const VerifySuccess = ({navigation}: NavigProps<null>) => {
  setTimeout(() => {
    (navigation as any)?.replace('Home');
  }, 500);
  return (
    <View style={tw`flex-1 bg-base justify-center items-center`}>
      <View style={tw`gap-3 justify-center items-center`}>
        <View
          style={tw`w-20 h-20 rounded-full bg-green-600 justify-center items-center`}>
          <SvgXml xml={IconRightTik} />
        </View>
        <Text style={tw`text-lg text-white50 font-RobotoBold `}>
          You’re done!
        </Text>
      </View>
    </View>
  );
};

export default VerifySuccess;
