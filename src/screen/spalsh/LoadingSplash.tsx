import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Background from '../components/Background';
import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  // console.log(token);

  const {user, initialLoading, userId} = useAuth();

  useEffect(() => {
    if (!initialLoading) {
      if (userId) {
        (navigation as any).replace('Home');
      } else {
        (navigation as any).replace('Login');
      }
    }
  }, [user, navigation, initialLoading]);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <View style={tw`flex-1 w-full justify-center items-center`}>
        <FastImage
          style={tw`w-36 h-36 flex-1 `}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../assets/images/logo/logo.png')}
        />
      </View>
    </Background>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
