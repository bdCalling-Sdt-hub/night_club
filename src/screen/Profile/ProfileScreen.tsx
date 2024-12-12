import {Text} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ProfileScreen = () => {
  return (
    <Background style={tw`flex-1 bg-base`}>
      <Text>ProfileScreen</Text>
    </Background>
  );
};

export default ProfileScreen;
