import {FlatList, Text, View} from 'react-native';
import {
  IconSmallEmailCyan,
  IconSmallPlusWhite,
  IconSmallUserCyan,
} from '../../icons/icons';
import {PrimaryColor, height} from '../../utils/utils';

import React from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IwtButton from '../../components/buttons/IwtButton';
import Card from '../../components/cards/Card';
import EmptyCard from '../../components/Empty/EmptyCard';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {IMangeUser} from '../../firebase/interface';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ManageUsers = ({navigation}: NavigProps<null>) => {
  const {user} = useAuth();
  const [allUser, setAllUser] = React.useState<IMangeUser[]>([]);
  const {getAllUser} = useFireStore();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getAllUser(setAllUser);
  }, []);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Manage Users" onPress={() => navigation.goBack()} />

      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setLoading(true);
              getAllUser(setAllUser);
              setLoading(false);
            }}
            refreshing={loading}
            colors={[PrimaryColor]}
          />
        }
        ListEmptyComponent={
          <EmptyCard title="No User Found" hight={height * 0.6} />
        }
        data={allUser}
        contentContainerStyle={tw`px-4 pb-5 gap-3`}
        renderItem={({item, index}) => {
          return (
            <Card
              onPress={() => navigation.navigate('UpdateUser', {item})}
              containerStyle={tw`flex-row gap-3 items-center justify-center`}
              component={
                <View>
                  <Text style={tw`text-primary font-RobotoBold`}>
                    {item.role === 'super-owner'
                      ? 'Super Owner'
                      : item.role === 'owner'
                      ? 'Owner'
                      : item.role === 'manager'
                      ? 'Manager'
                      : item.role === 'promoters'
                      ? 'Promoters'
                      : item.role === 'guard' && 'Guard'}
                  </Text>
                </View>
              }>
              <Card.Image
                imageStyle={tw`h-12 w-12 rounded-lg`}
                source={
                  item.photoURL
                    ? {uri: item?.photoURL}
                    : require('../../assets/images/profile/profile1.webp')
                }
              />
              <Card.Details
                data={[
                  {
                    title: item.displayName,
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
