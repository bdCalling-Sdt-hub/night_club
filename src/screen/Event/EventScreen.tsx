import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';

import BackWithHeader from '../../components/backHeader/BackWithHeader';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';

// Lazy loading the CurrentVenues component
const UpcomingEvents = React.lazy(() => import('./components/UpcomingEvents'));
const EHistory = React.lazy(() => import('./components/EHistory'));

const VenueEvent = ({navigation}: NavigProps<any>) => {
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
        <Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <EHistory navigation={navigation} search={search} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <UpcomingEvents navigation={navigation} search={search} />
        </Suspense>
      )}
    </Background>
  );
};

export default VenueEvent;
