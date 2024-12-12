import {Text} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const EventScreen = () => {
  return (
    <Background style={tw`flex-1 bg-base`}>
      <Text>EventScreen</Text>
    </Background>
  );
};

export default EventScreen;
