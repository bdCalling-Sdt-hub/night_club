import {FlatList, RefreshControl} from 'react-native';
import {PrimaryColor, height} from '../../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import {IGuestsList} from '../../../firebase/interface';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const SavedGuestList = ({navigation}: Props) => {
  const [guestListAvailable, setGuestListAvailable] = React.useState(
    [] as Array<IGuestsList>,
  );

  const {user} = useAuth();
  const [loading, setLoading] = React.useState(false);

  const isFocused = useIsFocused();

  const fetchGuestsList = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore()
        .collection('GuestsList')
        .where('createdBy', '==', user?.user_id)
        .get();

      const guestListData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuestListAvailable(guestListData);
    } catch (error) {
      console.error('Error fetching GuestsList:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchGuestsList();
  }, [isFocused]);

  return (
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
      contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
      data={guestListAvailable}
      ListEmptyComponent={
        <EmptyCard isLoading={loading} hight={height * 0.6} title="No Venues" />
      }
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
