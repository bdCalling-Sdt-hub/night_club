import {FlatList, RefreshControl, Text, TouchableOpacity} from 'react-native';
import {
  IconBuildingCyan,
  IconClockCyan,
  IconLocationV2Cyan,
} from '../../../icons/icons';
import {PrimaryColor, height} from '../../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {useAuth} from '../../../context/AuthProvider';
import {IVenue} from '../../../firebase/interface';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

interface VHistoryProps extends NavigProps<any> {
  search?: string;
}

const VHistory = ({navigation, search}: VHistoryProps) => {
  const [data, setData] = React.useState<Array<IVenue>>();
  const {user} = useAuth();
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();
  const fetchData = async () => {
    setLoading(true);
    try {
      const collectionRef = firestore().collection('Venues');
      let query = collectionRef.where('status', '==', 'Closed');

      if (user?.role === 'manager') {
        query = query.where('manager_id', '==', user?.user_id);
      } else if (user?.role === 'guard' || user?.role === 'promoters') {
        query = query.where('manager_id', '==', user?.manager_id);
      }

      const snapshot = await query.get();
      const fetchedData: IVenue[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IVenue[];

      setData(fetchedData);
    } catch (error) {
      console.log('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [isFocused]);

  // console.log(user?.role);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={!isFocused && loading}
          progressBackgroundColor={PrimaryColor}
          colors={['white']}
          onRefresh={() => {
            fetchData();
          }}
        />
      }
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      data={data?.filter((item: IVenue) =>
        item?.name?.toLowerCase().includes(search?.toLowerCase() as string),
      )}
      ListEmptyComponent={
        <EmptyCard isLoading={loading} hight={height * 0.6} title="No Venues" />
      }
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

export default VHistory;
