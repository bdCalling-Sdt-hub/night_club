import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {Text} from 'react-native';
import tw from '../../lib/tailwind';

const AddNewGuest = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Add New Guest"
        onPress={() => navigation.goBack()}
      />
      <Text>AddNewGuest</Text>
    </Background>
  );
};

export default AddNewGuest;
