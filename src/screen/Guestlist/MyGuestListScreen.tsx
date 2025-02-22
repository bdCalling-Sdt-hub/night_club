import {ActivityIndicator, View} from 'react-native';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import OptionSelect from '../../components/cards/OptionSelect';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import tw from '../../lib/tailwind';

// Lazy Load Component
const AllGuest = React.lazy(() => import('./components/AllGuest'));
const SavedGuestList = React.lazy(() => import('./components/SavedGuestList'));

const MyGuestListScreen = ({navigation}: NavigProps<any>) => {
  // const {closeToast, showToast} = useToast();

  const [search, setSearch] = React.useState('');

  // console.log(selectGuest);

  const [selectOption, setSelectOption] = React.useState('All Guest');

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        offBack
        title="My Guests List "
        containerStyle={tw`justify-between`}
      />

      {/* <View style={tw`px-4 mb-4 `}>
        <Text style={tw`text-white60 text-xs font-RobotoMedium`}>
          The Avalon Hollywood {'>'} Ultra Music Festival {'>'} 11/12/2024
        </Text>
      </View> */}

      <View style={tw`px-[4%]`}>
        <SearchCard search={search} setSearch={setSearch} />
      </View>

      <View style={tw`mt-4`}>
        <OptionSelect
          data={['All Guest', 'Saved Guestlists']}
          selectOption={selectOption}
          containerStyle={tw`px-4`}
          setSelectOption={setSelectOption}
        />
      </View>

      {/* <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          Checked in
        </Text>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          {data.checkin}/{data.total}
        </Text>
      </View> */}

      {selectOption === 'All Guest' ? (
        <React.Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <AllGuest navigation={navigation} search={search} />
        </React.Suspense>
      ) : (
        <React.Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <SavedGuestList navigation={navigation} search={search} />
        </React.Suspense>
      )}
    </Background>
  );
};

export default MyGuestListScreen;
