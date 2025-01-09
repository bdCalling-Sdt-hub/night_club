import React from 'react';
import {View} from 'react-native';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import EHistory from './components/EHistory';
import UpcomingEvents from './components/UpcomingEvents';

const VenueEvent = ({navigation}: NavigProps<null>) => {
  const [selectOption, setSelectOption] = React.useState('Upcoming Events');
  const [search, setSearch] = React.useState('');
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithHeader navigation={navigation} offBack title="Events" />

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
        <EHistory navigation={navigation} search={search} />
      ) : (
        <UpcomingEvents navigation={navigation} search={search} />
      )}
    </Background>
  );
};

export default VenueEvent;
