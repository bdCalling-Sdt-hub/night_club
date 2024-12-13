import {FlatList, Text, TouchableOpacity} from 'react-native';
import {
  IconBuildingCyan,
  IconClockCyan,
  IconLocationV2Cyan,
} from '../../../icons/icons';

import React from 'react';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import tw from '../../../lib/tailwind';
import {height} from '../../../utils/utils';
import data from './venues.json';

const VHistory = () => {
  return (
    <FlatList
      contentContainerStyle={tw`px-4 pb-5 gap-3`}
      ListEmptyComponent={
        <EmptyCard hight={height * 0.6} title="No Venues History" />
      }
      data={data.slice(0, 0)}
      renderItem={({item, index}) => (
        <Card
          containerStyle={tw` flex-row gap-3 items-center`}
          component={
            <TouchableOpacity style={tw`px-2 `}>
              <Text style={tw`text-primary font-RobotoBlack`}>View</Text>
            </TouchableOpacity>
          }>
          <Card.Image source={item.image} />
          <Card.Details
            data={[
              {
                title: item.title,
                icons: IconBuildingCyan,
                titleStyle: tw`text-white50 font-RobotoBold text-sm`,
              },
              {
                title: item.location.address,
                icons: IconLocationV2Cyan,
                titleStyle: tw`text-white60 font-RobotoBold text-xs`,
              },
              {
                title: item.time.start + ' - ' + item.time.end,
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
