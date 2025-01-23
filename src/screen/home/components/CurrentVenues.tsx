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
import {useAuth} from '../../../context/AuthProvider';
import useFireStore from '../../../firebase/database/helper';
import {IVenue} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';

const CurrentVenues = ({navigation}: NavigProps<null>) => {
  const [data, setData] = React.useState<Array<IVenue>>();
  const {user} = useAuth();

  const {listenToData} = useFireStore();
  React.useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function

    listenToData({
      unsubscribe,
      collectType: 'Venues',
      filters: [
        {
          field: 'status',
          operator: '==',
          value: 'Open',
        },
        (user?.role === 'guard' ||
          user?.role === 'promoters' ||
          user?.role === 'manager') && {
          field: 'manager_id',
          operator: '==',
          value: user?.role === 'manager' ? user?.user_id : user?.manager_id,
        },
      ].filter(Boolean) as any,
      onUpdate: (data: any[]) => {
        if (user?.role === 'manager') {
          data = data.filter(
            (item: IVenue) => item?.manager_id === user?.user_id,
          );
          setData(data);
          return;
        }
        if (user?.role === 'guard' || user?.role === 'promoters') {
          data = data.filter(
            (item: IVenue) => item?.manager_id === user?.manager_id,
          );
          setData(data);
        } else {
          setData(data);
        }
      },
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(user?.role);

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
