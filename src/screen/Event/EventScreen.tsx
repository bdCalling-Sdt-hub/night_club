import BackWithHeader from '../../components/backHeader/BackWithHeader';
import Background from '../components/Background';
import EHistory from './components/EHistory';
import {NavigProps} from '../../interfaces/NaviProps';
import OptionSelect from '../../components/cards/OptionSelect';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import UpcomingEvents from './components/UpcomingEvents';
import {View} from 'react-native';
import tw from '../../lib/tailwind';

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
        <EHistory navigation={navigation} />
      ) : (
        <UpcomingEvents navigation={navigation} />
      )}
    </Background>
  );
};

export default VenueEvent;
