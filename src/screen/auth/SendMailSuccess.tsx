import {Text, View} from 'react-native';

import {IconEmailSending} from '../../icons/icons';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

const SendMailSuccess = () => {
  return (
    <View style={tw`flex-1 bg-base justify-center items-center`}>
      <View style={tw`gap-5 px-4 justify-center items-center`}>
        <View
          style={tw`w-24 h-24 rounded-full bg-green-600 justify-center items-center`}>
          <SvgXml xml={IconEmailSending} />
        </View>
        <Text style={tw`text-xl text-white50 font-RobotoBold text-center`}>
          Verification Link Sent!
        </Text>
        <Text style={tw`text-sm text-gray-400 font-RobotoMedium text-center `}>
          Please check your email to complete the verification process.
        </Text>
      </View>
    </View>
  );
};

export default SendMailSuccess;
