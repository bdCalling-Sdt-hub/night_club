import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
  IconSmallEmailCyan,
  IconSmallPlusWhite,
  IconSmallUserCyan,
  IconTrashCyan,
} from '../../icons/icons';
import {ApiUrl, PrimaryColor, height} from '../../utils/utils';

import {RefreshControl} from 'react-native-gesture-handler';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import Card from '../../components/cards/Card';
import EmptyCard from '../../components/Empty/EmptyCard';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {IMangeUser} from '../../firebase/interface';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ManageUsers = ({navigation}: NavigProps<any>) => {
  const {user} = useAuth();
  const {closeToast, showToast} = useToast();

  const [allUser, setAllUser] = React.useState<IMangeUser[]>([]);
  const {getAllUser} = useFireStore();
  const [loading, setLoading] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAllUser(setAllUser);
  }, [isFocused]);

  const handleDeleteUser = async (id: string) => {
    showToast({
      title: 'Are you sure?',
      content: 'You want to delete this user?',
      multipleBTNStyle: tw`flex-col gap-2 mt-2`,
      multipleButton: [
        {
          buttonText: 'Yes',
          buttonStyle: tw`border-red-500 bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-red-500 font-RobotoBold text-base`,
          onPress: async () => {
            const res = await fetch(`${ApiUrl}users/?user_id=${id}`, {
              method: 'DELETE',
            });
            const resData = await res.json();
            if (resData?.success) {
              getAllUser(setAllUser);
              closeToast();
            }
          },
        },
        {
          buttonText: 'No',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => closeToast(),
        },
      ],
    });
  };

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Manage Users" onPress={() => navigation.goBack()} />

      <FlatList
        refreshControl={
          <RefreshControl
            progressBackgroundColor={PrimaryColor}
            onRefresh={() => {
              setLoading(true);
              getAllUser(setAllUser);
              setLoading(false);
            }}
            refreshing={loading}
            colors={['white']}
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
                <View style={tw`flex-row items-center gap-2`}>
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
                  <IButton
                    svg={IconTrashCyan}
                    onPress={() => {
                      handleDeleteUser(item.uid);
                    }}
                    containerStyle={tw` p-2 rounded-md bg-primary600`}
                  />
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
