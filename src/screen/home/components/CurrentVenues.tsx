import {FlatList, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {
  IconBuildingCyan,
  IconClockCyan,
  IconLocationV2Cyan,
} from '../../../icons/icons';
import {PrimaryColor, height} from '../../../utils/utils';

import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import useFireStore from '../../../firebase/database/helper';
import {IVenue} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const CurrentVenues = ({navigation}: NavigProps<null>) => {
  const [data, setData] = React.useState<Array<IVenue>>();
  const {user} = useAuth();
  const [loading, setLoading] = React.useState(false);
  const {listenToData} = useFireStore();
  React.useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function
    setLoading(true);
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
    setLoading(false);
    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [loading]);

  console.log(user?.role);

  return (
    <FlatList
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
              item?.location && {
                title: item?.location,
                icons: IconLocationV2Cyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              item?.closingTime &&
                item?.openingTime && {
                  title:
                    moment(item?.openingTime).format('hh:mm A') +
                    ' - ' +
                    moment(item?.closingTime).format('hh:mm A'),
                  icons: IconClockCyan,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
            ].filter(Boolean)}
          />
        </Card>
      )}
    />
  );
};

export default CurrentVenues;
