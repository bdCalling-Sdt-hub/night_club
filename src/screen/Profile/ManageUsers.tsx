import {FlatList, Text, View} from 'react-native';
import {
  IconSmallEmailCyan,
  IconSmallPlusWhite,
  IconSmallUserCyan,
} from '../../icons/icons';

import React from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IwtButton from '../../components/buttons/IwtButton';
import Card from '../../components/cards/Card';
import {useAuth} from '../../context/AuthProvider';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

export interface IMangeUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  company: string;
  photoURL: string;
}

const ManageUsers = ({navigation}: NavigProps<null>) => {
  const {user} = useAuth();
  const [allUser, setAllUser] = React.useState<IMangeUser[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleLoader = async () => {
    const res = await fetch(
      `http://10.0.80.14:5001/pushnotifiation-d1bcb/us-central1/users?super_owner_id=${
        user?.role === 'super-owner' ? user?.user_id : user?.super_owner_id
      }`,
    );
    const resData = await res.json();
    // console.log(resData?.users);
    setAllUser(resData?.users);
  };

  React.useEffect(() => {
    handleLoader();
  }, []);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Manage Users" onPress={() => navigation.goBack()} />

      <FlatList
        refreshControl={
          <RefreshControl onRefresh={handleLoader} refreshing={loading} />
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
                    {item.role}
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
