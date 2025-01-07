import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {PrimaryColor, height} from '../../../utils/utils';

import Card from '../../../components/cards/Card';
import {Checkbox} from 'react-native-ui-lib';
import EmptyCard from '../../../components/Empty/EmptyCard';
import IButton from '../../../components/buttons/IButton';
import {IGuest} from '../../../firebase/database/guests.doc';
import {IGuestsList} from '../../../firebase/database/guestsList.doc';
import {IconBigPlusCyan} from '../../../icons/icons';
import NormalModal from '../../../components/modals/NormalModal';
import Or from '../../../components/buttons/Or';
import React from 'react';
import TButton from '../../../components/buttons/TButton';
import firestore from '@react-native-firebase/firestore';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const AllGuest = ({navigation}: Props) => {
  const [selectGuest, setSelectGuest] = React.useState([]);
  const [guestListData, setGuestListData] = React.useState<Array<IGuest>>([]);
  const [selectGuestList, setSelectGuestList] = React.useState<string>();
  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);

  React.useEffect(() => {
    //get all guest
    firestore()
      .collection('Guests')
      .get()
      .then(querySnapshot => {
        const guests: any = querySnapshot.docs.map(doc => doc.data());
        setGuestListData(guests);
      });

    //get All Guest List
    firestore()
      .collection('GuestsList')
      .get()
      .then(querySnapshot => {
        const guestList: any = querySnapshot.docs.map(doc => doc.data());
        setGuestListAvailable(guestList);
      });
  }, []);

  return (
    <>
      <FlatList
        contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
        data={guestListData}
        ListEmptyComponent={
          <EmptyCard hight={height * 0.6} title="No Venues" />
        }
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              navigation?.navigate('GuestEdit', item);
            }}
            containerStyle={tw` flex-row gap-3 items-center`}
            component={
              <>
                {/* <Checkbox
            borderRadius={2}
            size={15}
            iconColor="#000000"
            value={selectGuest?.includes(item)}
            onValueChange={() => {}}
            style={tw``}
            color={'#fff'}
          /> */}
                <Checkbox
                  borderRadius={2}
                  size={15}
                  // iconColor="#000000"
                  value={selectGuest?.includes(item.id)}
                  onValueChange={() => {
                    if (selectGuest?.length > 0) {
                      if (selectGuest?.includes(item.id)) {
                        setSelectGuest(
                          selectGuest?.filter(i => i !== item?.id),
                        );
                      } else {
                        setSelectGuest([...selectGuest, item?.id]);
                      }
                    } else {
                      setSelectGuest([item?.id]);
                    }
                  }}
                  style={tw``}
                  color={PrimaryColor}
                />
              </>
            }>
            <Card.Details
              containerStyle={tw``}
              data={[
                {
                  title: item.fullName,

                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                {
                  title: item.tag,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
              ]}
            />
          </Card>
        )}
      />
      {selectGuest?.length > 0 ? (
        <TButton
          title="Add To Guest List"
          containerStyle={tw`my-4 w-[90%] self-center h-10 rounded-lg bg-primary`}
          titleStyle={tw`text-white50 font-RobotoBold text-sm`}
          onPress={() => {
            setAddToGuests(true);
          }}
          isLoading={false}
        />
      ) : (
        <IButton
          onPress={() => navigation.navigate('AddNewGuest')}
          svg={IconBigPlusCyan}
          containerStyle={tw`absolute bottom-5 bg-opacity-65 right-6 w-14 h-14 rounded-full  bg-base `}
        />
      )}

      <NormalModal
        layerContainerStyle={tw`flex-1`}
        containerStyle={tw`w-[70%] `}
        visible={addToGuests}
        setVisible={setAddToGuests}>
        <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
          <Text style={tw`text-white60 font-RobotoBold text-base`}>
            Selected guestlists
          </Text>
        </View>
        <View>
          {guestListAvailable?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectGuestList(item.id);
                }}
                style={tw`flex-row gap-3 items-center px-4 mb-4`}>
                <Checkbox
                  borderRadius={100}
                  size={15}
                  iconColor="#000000"
                  value={selectGuestList === item.id}
                  onValueChange={() => {
                    setSelectGuestList(item?.id);
                  }}
                  style={tw``}
                  color={'#fff'}
                />
                <Text style={tw`text-white50 font-RobotoBold text-base`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Or />
        <View style={tw`gap-3 mt-2`}>
          {/* <TButton
            title="Add New Guestlist"
            onPress={() => {
              setAddToGuests(false);
              navigation.navigate('AddNewGuestList');
            }}
            containerStyle={tw` w-[90%] self-center h-10 rounded-lg bg-primary`}
            titleStyle={tw`text-white50 font-RobotoBold text-sm`}
            isLoading={false}
          /> */}
          <TButton
            title="Cancel"
            onPress={() => {
              setAddToGuests(false);
            }}
            containerStyle={tw` w-[90%] self-center h-10 rounded-lg bg-transparent border border-red-500`}
            titleStyle={tw`text-red-500 font-RobotoBold text-sm`}
            isLoading={false}
          />
          <TButton
            title="Create New Guestlist"
            onPress={() => {
              setAddToGuests(false);
              navigation.navigate('AddNewGuestList');
            }}
            containerStyle={tw` w-[90%] self-center h-10 rounded-lg bg-primary`}
            titleStyle={tw`text-white50 font-RobotoBold text-sm`}
            isLoading={false}
          />
          <TButton
            title="Save"
            onPress={() => {
              setAddToGuests(false);
              // navigation.navigate('AddNewGuestList');
            }}
            containerStyle={tw` w-[90%] self-center h-10 rounded-lg bg-primary`}
            titleStyle={tw`text-white50 font-RobotoBold text-sm`}
            isLoading={false}
          />
        </View>
      </NormalModal>
    </>
  );
};

export default AllGuest;
