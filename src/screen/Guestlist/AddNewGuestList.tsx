import {FlatList, Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

const AddNewGuestList = ({navigation}: NavigProps<null>) => {
  const [search, setSearch] = React.useState('');
  const [guestList, setGuestList] = React.useState('');
  const [guestListAvailable, setGuestListAvailable] = React.useState([
    {label: 'Guest List 1', value: 'Guest List 1'},
    {label: 'Guest List 2', value: 'Guest List 2'},
    {label: 'Guest List 3', value: 'Guest List 3'},
    {label: 'Guest List 4', value: 'Guest List 4'},
    {label: 'Guest List 5', value: 'Guest List 5'},
    {label: 'Guest List 6', value: 'Guest List 6'},
    {label: 'Guest List 7', value: 'Guest List 7'},
    {label: 'Guest List 8', value: 'Guest List 8'},
  ]);

  const handleGuestList = () => {
    if (!guestList) return;
    setGuestListAvailable([
      ...guestListAvailable,
      {label: guestList, value: guestList},
    ]);
    setGuestList('');
  };
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
            style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
            <Text style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
              {item.value}
            </Text>
          </View>
        )}
      />
    </Background>
  );
};

export default AddNewGuestList;
