import React from 'react';
import {Text} from 'react-native';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const EventDetails = ({}: any) => {
  return (
    <Background style={tw`flex-1`}>
      <Text>EventDetails</Text>
    </Background>
  );
};

export default EventDetails;
