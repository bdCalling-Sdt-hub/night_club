import {FlatList, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {
  IconMultiUserCyan,
  IconSmallCalendarCyan,
  IconSmallCalendarV2Cyan,
} from '../../../icons/icons';
import {PrimaryColor, height} from '../../../utils/utils';

import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import useFireStore from '../../../firebase/database/helper';
import {IEvent} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

interface Props extends NavigProps<null> {
  search?: string;
  venueId?: string;
}
const UpcomingEvents = ({navigation, venueId, search}: Props) => {
  const [data, setData] = React.useState<Array<IEvent>>();
  const {listenToData, createRefer} = useFireStore();
  const {user} = useAuth();
  const [loading, setLoading] = React.useState(false);
  // console.log(venue?.id);

  React.useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function
    setLoading(true);
    listenToData({
      unsubscribe,
      collectType: 'Events',
      filters: [
        venueId && {
          field: 'venue',
          operator: '==',
          value: venueId,
        },
        user?.user_id && {
          field: 'createdBy',
          operator: '==',
          value: user?.user_id,
        },
        (user?.role === 'guard' ||
          user?.role === 'promoters' ||
          user?.role === 'manager') && {
          field: 'manager_id',
          operator: '==',
          value: user?.role === 'manager' ? user?.user_id : user?.manager_id,
        },
      ].filter(Boolean) as any,
      onUpdate: (data: any) => {
        setData(
          data?.filter((item: IEvent) =>
            item?.date ? item.date > new Date().toISOString() : item,
          ),
        );
      },
    });
    setLoading(false);

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [loading]);

  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      data={data}
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
      ListEmptyComponent={<EmptyCard hight={height * 0.6} title="No Venues" />}
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
            data={[
              {
                title: item.name,
                icons: IconSmallCalendarCyan,
                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
              {
                title: item.capacity ?? 0 + ' people',
                icons: IconMultiUserCyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              item.date && {
                title: moment(item.date).format('MMM DD, YYYY'),
                icons: IconSmallCalendarV2Cyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
            ].filter(Boolean)}
          />
        </Card>
      )}
    />
  );
};

export default UpcomingEvents;
