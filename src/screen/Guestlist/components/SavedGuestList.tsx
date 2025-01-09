import React from 'react';
import {FlatList} from 'react-native';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {loadAllData} from '../../../firebase/database/collections';
import {IGuestsList} from '../../../firebase/database/guestsList.doc';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';

interface Props {
  navigation: any;
}
const SavedGuestList = ({navigation}: Props) => {
  const [guestListAvailable, setGuestListAvailable] = React.useState(
    [] as Array<IGuestsList>,
  );

  React.useEffect(() => {
    //get all guest
    loadAllData({
      collectType: 'GuestsList',
      setLoad: setGuestListAvailable,
    });
  }, []);

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
                title: item.name,

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
