import {FlatList, RefreshControl, Text, View} from 'react-native';
import {PrimaryColor, height} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
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
  const {createFireData} = useFireStore();

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

  const fetchGuestsList = async (unsubscribe?: any) => {
    setLoading(true);
    try {
      unsubscribe = firestore()
        .collection('GuestsList')
        .where('createdBy', '==', user?.user_id)
        .onSnapshot(
          snapshot => {
            const guestListData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGuestListAvailable(guestListData as Array<IGuestsList>);
          },
          error => {
            console.log('Error fetching GuestsList:', error);
          },
        );
    } catch (error) {
      console.log('Error fetching GuestsList:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let unsubscribe = () => {};
    fetchGuestsList(unsubscribe);
    return () => {
      unsubscribe();
    };
  }, [isFocused]);

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
            refreshing={false}
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
            title="No guest list found"
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
