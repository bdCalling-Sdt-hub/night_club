import {FlatList, Text, TouchableOpacity} from 'react-native';
import {
  IconBuildingCyan,
  IconClockCyan,
  IconLocationV2Cyan,
} from '../../../icons/icons';

import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {listenToData} from '../../../firebase/database/helper';
import {IVenue} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';

const CurrentVenues = ({navigation}: NavigProps<null>) => {
  const [data, setData] = React.useState<Array<IVenue>>();

  React.useEffect(() => {
    const unsubscribe = listenToData({
      collectType: 'Venues',
      onUpdate: (data: any[]) => {
        setData(data);
      },
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

export default CurrentVenues;
