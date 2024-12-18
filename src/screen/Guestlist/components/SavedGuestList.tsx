import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {FlatList} from 'react-native';
import React from 'react';
import {height} from '../../../utils/utils';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const SavedGuestList = ({navigation}: Props) => {
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
  return (
    <FlatList
      contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
      data={guestListAvailable}
      ListEmptyComponent={<EmptyCard hight={height * 0.6} title="No Venues" />}
      renderItem={({item, index}) => (
        <Card
          onPress={() => {
            navigation?.navigate('AllGuestInGuestList');
          }}
          containerStyle={tw` flex-row gap-3 items-center`}>
          <Card.Details
            containerStyle={tw``}
            data={[
              {
                title: item.label,

                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
            ]}
          />
        </Card>
      )}
    />
  );
};

export default SavedGuestList;
