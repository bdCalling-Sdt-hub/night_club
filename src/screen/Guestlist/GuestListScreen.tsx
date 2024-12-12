import {Text} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const GuestListScreen = () => {
  return (
    <Background style={tw`flex-1 bg-base`}>
      <Text>GestlistScreen</Text>
    </Background>
  );
};

export default GuestListScreen;
