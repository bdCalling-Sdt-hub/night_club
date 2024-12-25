import {ActivityIndicator, View} from 'react-native';
import React, {Suspense} from 'react';

import BackWithHeader from '../../components/backHeader/BackWithHeader';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import OptionSelect from '../../components/cards/OptionSelect';
import {PrimaryColor} from '../../utils/utils';
import SearchCard from '../../components/cards/SearchCard';
import tw from '../../lib/tailwind';

// Lazy loading the CurrentVenues component
const CurrentVenues = React.lazy(() => import('./components/CurrentVenues'));
const VHistory = React.lazy(() => import('./components/VHistory'));

const Home = ({navigation}: NavigProps<null>) => {
  const [selectOption, setSelectOption] = React.useState('Current Venues');
  const [search, setSearch] = React.useState('');
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithHeader navigation={navigation} offBack title="Your Venues" />

      <View style={tw`px-[4%]`}>
        <SearchCard search={search} setSearch={setSearch} />
      </View>

      <View style={tw`my-4`}>
        <OptionSelect
          data={['Current Venues', 'History']}
          selectOption={selectOption}
          containerStyle={tw`px-4`}
          setSelectOption={setSelectOption}
        />
      </View>

      {selectOption === 'History' ? (
        <Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <VHistory />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <CurrentVenues navigation={navigation} />
        </Suspense>
      )}
    </Background>
  );
};

export default Home;
