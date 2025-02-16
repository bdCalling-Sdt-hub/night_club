import React, {useEffect} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {PrimaryColor, height} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import EmptyCard from '../../components/Empty/EmptyCard';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {IGuestsList} from '../../firebase/interface';
import {IconTrashGray} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const AddNewGuestList = ({navigation}: NavigProps<any>) => {
  const {closeToast, showToast} = useToast();
  const {user} = useAuth();
  const [search, setSearch] = React.useState('');
  const [guestList, setGuestList] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);
  const {listenToData, createFireData} = useFireStore();

  const isFocused = useIsFocused();

  const handleGuestList = () => {
    if (guestList) {
      setGuestList('');
      createFireData({
        collectType: 'GuestsList',
        data: {
          name: guestList,
        },
      });
    } else {
      showToast({
        title: 'Warning',
        content: 'Please enter guest list name',
        onPress: () => {
          closeToast();
        },
      });
    }
  };
  useEffect(() => {
    if (!user?.user_id || !isFocused) return; // Ensure we have a user ID and the screen is focused

    setLoading(true);

    // Subscribe to real-time updates
    const unsubscribe = firestore()
      .collection('GuestsList')
      .where('createdBy', '==', user.user_id)
      .onSnapshot(
        snapshot => {
          const guestListData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGuestListAvailable(guestListData);
          setLoading(false);
        },
        error => {
          console.error('Error fetching GuestsList in real-time:', error);
          setLoading(false);
        },
      );

    // Cleanup the subscription on unmount or when dependencies change
    return () => {
      unsubscribe();
    };
  }, [user?.user_id, isFocused]);

  // console.log(guestListAvailable);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithTitle
        onPress={() => navigation.goBack()}
        title="Add new guest list"
      />

      <View style={tw` px-4 flex-row items-center pb-4`}>
        <InputText
          value={guestList}
          placeholder="Enter Guest List Name"
          onChangeText={text => setGuestList(text)}
          containerStyle={tw`border border-secondary h-10 rounded-r-none rounded-l-lg flex-1`}
        />
        <TButton
          onPress={handleGuestList}
          title="Add"
          containerStyle={tw`rounded-r-lg rounded-l-none bg-primary800 w-20 h-10`}
        />
      </View>

      <View style={tw`px-[4%]`}>
        <Text style={tw`text-white400 text-base font-RobotoBold`}>
          GuestList
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={!isFocused && loading}
            progressBackgroundColor={PrimaryColor}
            colors={['white']}
            onRefresh={() => {
              fetchGuestsList();
            }}
          />
        }
        ListEmptyComponent={
          <EmptyCard
            isLoading={loading}
            hight={height * 0.6}
            title="No Venues"
          />
        }
        keyboardShouldPersistTaps="always"
        data={guestListAvailable}
        renderItem={({item, index}) => (
          <View
            style={tw`flex-row justify-between mt-1 pb-2 mx-[4%] border-b border-b-gray-800 `}>
            <Text style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
              {item.name}
            </Text>
            <IButton
              svg={IconTrashGray}
              onPress={() => {
                firestore().collection('GuestsList').doc(item.id).delete();
              }}
              containerStyle={tw`w-10 h-10 bg-red-500 text-white`}
            />
          </View>
        )}
      />
    </Background>
  );
};

export default AddNewGuestList;
