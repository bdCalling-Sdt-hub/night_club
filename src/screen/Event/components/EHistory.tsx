import {FlatList, Text, TouchableOpacity} from 'react-native';
import {
  IconMultiUserCyan,
  IconSmallCalendarCyan,
  IconSmallCalendarV2Cyan,
} from '../../../icons/icons';

import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';
import data from './events.json';

const EHistory = ({navigation}: NavigProps<null>) => {
  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      data={data?.slice(0, 0)}
      ListEmptyComponent={<EmptyCard hight={height * 0.6} title="No Venues" />}
      renderItem={({item, index}) => (
        <Card
          containerStyle={tw` flex-row gap-3 items-center`}
          component={
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('EventDetails');
              }}
              style={tw`px-2 `}>
              <Text style={tw`text-primary font-RobotoBlack`}>View</Text>
            </TouchableOpacity>
          }>
          <Card.Image source={item.image} />
          <Card.Details
            data={[
              {
                title: item.title,
                icons: IconSmallCalendarCyan,
                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
              {
                title: item.people.toString(),
                icons: IconMultiUserCyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              {
                title: item.date,
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

export default EHistory;
