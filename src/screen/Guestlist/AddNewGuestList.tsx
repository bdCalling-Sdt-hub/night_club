import {FlatList, Text, View} from 'react-native';
import {createFireData, listenToData} from '../../firebase/database/helper';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {IGuestsList} from '../../firebase/interface';
import {IconTrashGray} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const AddNewGuestList = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const [search, setSearch] = React.useState('');
  const [guestList, setGuestList] = React.useState('');
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);

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
    const unsubscribe = listenToData({
      collectType: 'GuestsList',
      onUpdate: (data: any[]) => {
        setGuestListAvailable(data);
      },
    });
    return () => unsubscribe();
  }, []);

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
