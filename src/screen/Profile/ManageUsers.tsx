import {FlatList, Text, View} from 'react-native';
import {
  IconSmallEmailCyan,
  IconSmallPlusWhite,
  IconSmallUserCyan,
} from '../../icons/icons';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import Card from '../../components/cards/Card';
import IwtButton from '../../components/buttons/IwtButton';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import data from './user.json';
import tw from '../../lib/tailwind';

const ManageUsers = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Manage Users" onPress={() => navigation.goBack()} />

      <FlatList
        data={data}
        contentContainerStyle={tw`px-4 pb-5 gap-3`}
        renderItem={({item, index}) => {
          return (
            <Card
              onPress={() => navigation.navigate('UpdateUser')}
              containerStyle={tw`flex-row gap-3 items-center justify-center`}
              component={
                <View>
                  <Text style={tw`text-primary font-RobotoBold`}>
                    {item.role}
                  </Text>
                </View>
              }>
              <Card.Image
                imageStyle={tw`h-12 w-12 rounded-lg`}
                source={{uri: item.avatar}}
              />
              <Card.Details
                data={[
                  {
                    title: item.name,
                    icons: IconSmallUserCyan,
                    titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                  },
                  {
                    title: item.email,
                    icons: IconSmallEmailCyan,
                    titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                  },
                ]}
              />
            </Card>
          );
        }}
      />

      <View style={tw`px-4 my-2 gap-3 `}>
        <IwtButton
          onPress={() => navigation.navigate('AddUser')}
          svg={IconSmallPlusWhite}
          title="Add new user"
          containerStyle={tw``}
        />
      </View>
    </Background>
  );
};

export default ManageUsers;
