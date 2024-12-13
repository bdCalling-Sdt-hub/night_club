import React from 'react';
import {View} from 'react-native';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import CurrentVenues from './components/CurrentVenues';
import VHistory from './components/VHistory';

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
        <VHistory />
      ) : (
        <CurrentVenues navigation={navigation} />
      )}
    </Background>
  );
};

export default Home;
