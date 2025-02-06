import {FlatList, RefreshControl, Text, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
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
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';

const AddNewGuestList = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const {user} = useAuth();
  const [search, setSearch] = React.useState('');
  const [guestList, setGuestList] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);
  const {listenToData, createFireData} = useFireStore();
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

  React.useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function
    setLoading(true);
    listenToData({
      unsubscribe,
      collectType: 'GuestsList',
      filters: [
        {
          field: 'createdBy',
          operator: '==',
          value: user?.user_id,
        },
      ],
      onUpdate: (data: any[]) => {
        setGuestListAvailable(data);
      },
    });
    setLoading(false);
    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [loading]);

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
            refreshing={loading}
            progressBackgroundColor={PrimaryColor}
            colors={['white']}
            onRefresh={() => {
              setLoading(!loading);
            }}
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
