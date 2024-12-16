import {Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import EHistory from './components/EHistory';
import {NavigProps} from '../../interfaces/NaviProps';
import OptionSelect from '../../components/cards/OptionSelect';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import UpcomingEvents from './components/UpcomingEvents';
import tw from '../../lib/tailwind';

const VenueEvent = ({navigation}: NavigProps<null>) => {
  const [selectOption, setSelectOption] = React.useState('Upcoming Events');
  const [search, setSearch] = React.useState('');
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithTitle
        onPress={() => {
          navigation.goBack();
        }}
        title="Venue Events"
      />

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
          data={['Upcoming Events', 'History']}
          selectOption={selectOption}
          containerStyle={tw`px-4`}
          setSelectOption={setSelectOption}
        />
      </View>

      {selectOption === 'History' ? (
        <EHistory navigation={navigation} />
      ) : (
        <UpcomingEvents navigation={navigation} />
      )}
    </Background>
  );
};

export default VenueEvent;
