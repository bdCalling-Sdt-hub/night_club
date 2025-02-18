import {FlatList, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {
  IconMultiUserCyan,
  IconSmallCalendarCyan,
  IconSmallCalendarV2Cyan,
} from '../../../icons/icons';
import {PrimaryColor, height} from '../../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import {IEvent} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

interface Props extends NavigProps<null> {
  search?: string;
  venueId?: string;
}

const EHistory = ({navigation, search, venueId}: Props) => {
  const [data, setData] = React.useState<Array<IEvent>>();
  const {user} = useAuth();
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  // console.log(venue?.id);
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const collectionRef = firestore().collection('Events');
      let query = collectionRef;
      if (user?.role === 'super-owner') {
        query = query.where('super_owner_id', '==', user?.user_id);
      } else {
        query = query.where('super_owner_id', '==', user?.super_owner_id);
      }
      if (venueId) {
        query = query.where('venue', '==', venueId);
      }

      if (
        user?.role === 'guard' ||
        user?.role === 'promoters' ||
        user?.role === 'manager'
      ) {
        const managerId =
          user?.role === 'manager' ? user?.user_id : user?.manager_id;
        query = query.where('manager_id', '==', managerId);
      }

      const snapshot = await query.get();
      const filteredData = snapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .filter(
          (item: IEvent) => item?.date && item.date < new Date().toISOString(),
        );

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchEvents();

    // No unsubscribe needed for one-time fetch
  }, [isFocused]);

  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      data={data?.filter((item: IEvent) => {
        if (search) {
          return item.name.toLowerCase().includes(search.toLowerCase());
        }
        return item;
      })}
      ListEmptyComponent={
        <EmptyCard isLoading={loading} hight={height * 0.6} title="No Venues" />
      }
      refreshControl={
        <RefreshControl
          refreshing={false}
          progressBackgroundColor={PrimaryColor}
          colors={['white']}
          onRefresh={() => {
            fetchEvents();
          }}
        />
      }
      renderItem={({item, index}) => (
        <Card
          containerStyle={tw` flex-row gap-3 items-center`}
          component={
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('EventDetails', {id: item.id});
              }}
              style={tw`px-2 `}>
              <Text style={tw`text-primary font-RobotoBlack`}>View</Text>
            </TouchableOpacity>
          }>
          <Card.Image
            source={{uri: item.image}}
            imageStyle={tw`h-16 w-16 rounded-lg`}
          />
          <Card.Details
            data={
              [
                {
                  title: item.name,
                  icons: IconSmallCalendarCyan,
                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                item.capacity && {
                  title: `${item.capacity} people`,
                  icons: IconMultiUserCyan,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
                item.date && {
                  title: moment(item.date).format('MMM DD, YYYY'),
                  icons: IconSmallCalendarV2Cyan,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
              ].filter(Boolean) as any
            }
          />
        </Card>
      )}
    />
  );
};

export default React.memo(EHistory);
