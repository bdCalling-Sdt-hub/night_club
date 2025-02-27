import React, {Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {useAuth} from '../../context/AuthProvider';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';

// Lazy loading the CurrentVenues component
const CurrentVenues = React.lazy(() => import('./components/CurrentVenues'));
const VHistory = React.lazy(() => import('./components/VHistory'));

const Home = ({navigation}: NavigProps<any>) => {
  const [selectOption, setSelectOption] = React.useState('Current Venues');
  const [search, setSearch] = React.useState('');
  const {user, setUser} = useAuth();
  // console.log(user?.user_id);
  const currentUser = auth().currentUser;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (!user?.role) {
      currentUser?.getIdTokenResult(true).then(idTokenResult => {
        if (idTokenResult?.claims) {
          setUser({
            ...idTokenResult.claims,
            photoURL: currentUser?.photoURL,
          });
        }
      });
    }
  }, [isFocused]);

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
          <VHistory navigation={navigation} search={search} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator color={PrimaryColor} size={'large'} />
            </View>
          }>
          <CurrentVenues navigation={navigation} search={search} />
        </Suspense>
      )}
    </Background>
  );
};

export default Home;
