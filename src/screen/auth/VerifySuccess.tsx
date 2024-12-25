import {Text, View} from 'react-native';

import {IconRightTik} from '../../icons/Special.icon';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';

const VerifySuccess = ({navigation, route}: NavigProps<null>) => {
  const {setUserId} = useAuth();
  // console.log(route?.params);

  React.useEffect(() => {
    if (route?.params?.uid) {
      const user = auth().currentUser;
      user?.reload();
      setUserId(route?.params?.uid);
      (navigation as any).replace('Home');
    } else {
      (navigation as any).replace('Login');
    }
  }, [route?.params?.uid, navigation]);
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
