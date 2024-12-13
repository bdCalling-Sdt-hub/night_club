import {Text, View} from 'react-native';

import React from 'react';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import EHistory from './components/EHistory';
import UpcomingEvents from './components/UpcomingEvents';

const VenueEvent = ({navigation}: NavigProps<null>) => {
  const [selectOption, setSelectOption] = React.useState('Current Venues');
  const [search, setSearch] = React.useState('');
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithHeader navigation={navigation} title="Your Venues" />

      <View style={tw`px-4 mb-6 mt-2`}>
        <Text style={tw`text-white50 text-sm font-RobotoBold`}>
          Event lists
        </Text>
        <Text style={tw`text-white60 text-xs font-RobotoMedium`}>
          Here you can see all the event lists under this Venue.
        </Text>
      </View>

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
        <EHistory />
      ) : (
        <UpcomingEvents navigation={navigation} />
      )}
    </Background>
  );
};

export default VenueEvent;
