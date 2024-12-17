import {FlatList, Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

const AddNewTag = ({navigation}: NavigProps<null>) => {
  const [newTag, setNewTag] = React.useState('');
  const [tags, setTags] = React.useState([
    {label: 'VIP', value: 'VIP'},
    {label: 'PREMIUM', value: 'PREMIUM'},
    {label: 'GOLD', value: 'GOLD'},
    {label: 'SILVER', value: 'SILVER'},
    {label: 'BRONZE', value: 'BRONZE'},
  ]);

  const handleNewTag = () => {
    if (!newTag) return;
    setTags([...tags, {label: newTag, value: newTag}]);
    setNewTag('');
  };
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithTitle onPress={() => navigation.goBack()} title="Add new tag" />

      <View style={tw` px-4 flex-row items-center pb-4`}>
        <InputText
          value={newTag}
          placeholder="Enter new Tag"
          onChangeText={text => setNewTag(text)}
          containerStyle={tw`border border-secondary h-10 rounded-r-none rounded-l-lg flex-1`}
        />
        <TButton
          onPress={handleNewTag}
          title="Add"
          containerStyle={tw`rounded-r-lg rounded-l-none bg-primary800 w-20 h-10`}
        />
      </View>

      <View style={tw`px-[4%]`}>
        <Text style={tw`text-white400 text-base font-RobotoBold`}>Tags</Text>
      </View>
      <FlatList
        data={tags}
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

export default AddNewTag;
