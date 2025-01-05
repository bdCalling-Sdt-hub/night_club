import {FlatList, Text, TouchableOpacity} from 'react-native';
import {
  IconMultiUserCyan,
  IconSmallCalendarCyan,
  IconSmallCalendarV2Cyan,
} from '../../../icons/icons';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {IEvent} from '../../../firebase/database/events.doc';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';

const UpcomingEvents = ({navigation}: NavigProps<null>) => {
  const [data, setData] = React.useState<Array<IEvent>>();

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('Events') // Your Firestore collection name
      .onSnapshot(snapshot => {
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IEvent[];
        setData(events);
      });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      data={data}
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
            imageStyle={tw`h-14 w-14 rounded-lg`}
          />
          <Card.Details
            data={[
              {
                title: item.name,
                icons: IconSmallCalendarCyan,
                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
              {
                title: '55 people',
                icons: IconMultiUserCyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              {
                title: moment(item.date).format('MMM DD, YYYY'),
                icons: IconSmallCalendarV2Cyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
            ]}
          />
        </Card>
      )}
    />
  );
};

export default UpcomingEvents;
