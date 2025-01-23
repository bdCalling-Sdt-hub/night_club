import React from 'react';
import {FlatList} from 'react-native';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import useFireStore from '../../../firebase/database/helper';
import {IGuestsList} from '../../../firebase/interface';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';

interface Props {
  navigation: any;
}
const SavedGuestList = ({navigation}: Props) => {
  const [guestListAvailable, setGuestListAvailable] = React.useState(
    [] as Array<IGuestsList>,
  );

  const {user} = useAuth();

  const {loadAllData} = useFireStore();

  React.useEffect(() => {
    //get all guest
    loadAllData({
      collectType: 'GuestsList',
      filters: [
        {
          field: 'createdBy',
          operator: '==',
          value: user?.user_id,
        },
      ]?.filter(Boolean) as any,
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
            navigation?.navigate('AllGuestInGuestList', {item: item});
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
