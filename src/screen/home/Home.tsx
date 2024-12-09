import Background from '../components/Background';
import React from 'react';
import {Text} from 'react-native';
import tw from '../../lib/tailwind';

const Home = () => {
  return (
    <Background style={tw`flex-1 bg-base`}>
      <Text style={tw`text-white`}>Home</Text>
    </Background>
  );
};

export default Home;
