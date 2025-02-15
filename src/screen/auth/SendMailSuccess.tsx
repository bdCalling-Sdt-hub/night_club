import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconEmailSending} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const SendMailSuccess = ({navigation}: NavigProps<any>) => {
  const openGmail = () => {
    if (Platform.OS === 'android') {
      const gmailPackageName = `https://mail.google.com/`;

      Linking.openURL(gmailPackageName);
    } else {
      Alert.alert(
        'Unsupported Platform',
        'This feature is only available on Android.',
      );
    }
  };

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
        <View style={tw`gap-2`}>
          <TouchableOpacity onPress={openGmail}>
            <Text
              style={tw`text-sm text-white50  font-RobotoMedium text-center border border-gray-800 px-4 py-2 rounded-md`}>
              Open gmail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={tw`text-sm text-white50  font-RobotoMedium text-center border border-gray-800 px-4 py-2 rounded-md`}>
              Go back and login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendMailSuccess;
