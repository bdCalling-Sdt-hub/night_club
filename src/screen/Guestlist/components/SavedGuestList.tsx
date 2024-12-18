import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {FlatList} from 'react-native';
import React from 'react';
import data from '../guest.json';
import {height} from '../../../utils/utils';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const SavedGuestList = ({navigation}: Props) => {
  return (
    <FlatList
      contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
      data={data.guest}
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
                title: item.title,

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
