import {FlatList, Text, TouchableOpacity} from 'react-native';
import {
  IconBuildingCyan,
  IconClockCyan,
  IconLocationV2Cyan,
} from '../../../icons/icons';

import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {IVenue} from '../../../firebase/database/venues.doc';
import React from 'react';
import firebase from '@react-native-firebase/firestore';
import {height} from '../../../utils/utils';
import moment from 'moment';
import tw from '../../../lib/tailwind';

const VHistory = () => {
  const [data, setData] = React.useState<Array<IVenue>>();

  React.useEffect(() => {
    const unsubscribe = firebase()
      .collection('Venues') // Your Firestore collection name
      .onSnapshot(snapshot => {
        const venues = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as IVenue[];
        setData(venues);
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
                navigation?.navigate('VenuesDetails', {id: item.id});
              }}
              style={tw`px-2 `}>
              <Text style={tw`text-primary font-RobotoBlack`}>View</Text>
            </TouchableOpacity>
          }>
          <Card.Image
            source={{uri: item?.image}}
            imageStyle={tw`h-16 w-16 rounded-lg`}
          />
          <Card.Details
            data={[
              {
                title: item?.name,
                icons: IconBuildingCyan,
                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
              {
                title: item?.location,
                icons: IconLocationV2Cyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              {
                title:
                  moment(item?.openingTime).format('hh:mm A') +
                  ' - ' +
                  moment(item?.closingTime).format('hh:mm A'),
                icons: IconClockCyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
            ]}
          />
        </Card>
      )}
    />
  );
};

export default VHistory;
