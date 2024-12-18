import React, {SetStateAction} from 'react';

import Background from '../components/Background';
import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import {View} from 'react-native';
import tw from '../../lib/tailwind';

interface SplashProps extends NavigProps<null> {
  setIsSplash: React.Dispatch<SetStateAction<boolean>>;
  isSplash?: boolean;
}

const SplashScreen = ({setIsSplash, route, navigation}: SplashProps) => {
  setTimeout(() => {
    (navigation as any)?.navigate('Login');
  }, 1000);
  return (
    <Background>
      <View style={tw`flex-1 w-full  justify-center items-center`}>
        <FastImage
          style={tw`w-60 h-60 flex-1 `}
          resizeMode={FastImage.resizeMode.cover}
          source={require('../../assets/images/logo/logo.png')}
        />
      </View>
    </Background>
  );
};

export default SplashScreen;
