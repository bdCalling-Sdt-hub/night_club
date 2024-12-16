import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {Text} from 'react-native';
import tw from '../../lib/tailwind';

const GuestDetails = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Guest Details"
        onPress={() => navigation.goBack()}
      />
      <Text>GuestDetails</Text>
    </Background>
  );
};

export default GuestDetails;
