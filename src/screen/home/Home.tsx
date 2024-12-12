import React from 'react';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const Home = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithHeader navigation={navigation} offBack title="Your Venues" />
    </Background>
  );
};

export default Home;
