import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {PrimaryColor, height} from '../../../utils/utils';

import Card from '../../../components/cards/Card';
import {Checkbox} from 'react-native-ui-lib';
import EmptyCard from '../../../components/Empty/EmptyCard';
import IButton from '../../../components/buttons/IButton';
import {IconBigPlusCyan} from '../../../icons/icons';
import NormalModal from '../../../components/modals/NormalModal';
import Or from '../../../components/buttons/Or';
import React from 'react';
import TButton from '../../../components/buttons/TButton';
import data from '../guest.json';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const AllGuest = ({navigation}: Props) => {
  const [selectGuest, setSelectGuest] = React.useState([]);
  const [selectGuestList, setSelectGuestList] = React.useState(null);

  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListAvailable, setGuestListAvailable] = React.useState([
    {label: 'Guest List 1', value: 'Guest List 1'},
    {label: 'Guest List 2', value: 'Guest List 2'},
    {label: 'Guest List 3', value: 'Guest List 3'},
    {label: 'Guest List 4', value: 'Guest List 4'},
    {label: 'Guest List 5', value: 'Guest List 5'},
    {label: 'Guest List 6', value: 'Guest List 6'},
    {label: 'Guest List 7', value: 'Guest List 7'},
    {label: 'Guest List 8', value: 'Guest List 8'},
  ]);
  return (
    <>
      <FlatList
        contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
        data={data.guest}
        ListEmptyComponent={
          <EmptyCard hight={height * 0.6} title="No Venues" />
        }
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              if (selectGuest?.length > 0) {
                if (selectGuest?.includes(item)) {
                  setSelectGuest(selectGuest?.filter(i => i !== item));
                } else {
                  setSelectGuest([...selectGuest, item]);
                }
              } else {
                setSelectGuest([item]);
              }
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
                  value={selectGuest?.includes(item)}
                  onValueChange={() => {}}
                  style={tw``}
                  color={PrimaryColor}
                />
              </>
            }>
            <Card.Details
              containerStyle={tw``}
              data={[
                {
                  title: item.title,

                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                {
                  title: 'VIP',
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
                  setSelectGuestList(item);
                }}
                style={tw`flex-row gap-3 items-center px-4 mb-4`}>
                <Checkbox
                  borderRadius={100}
                  size={15}
                  iconColor="#000000"
                  value={selectGuestList?.label === item.label}
                  onValueChange={() => {
                    setSelectGuestList(item);
                  }}
                  style={tw``}
                  color={'#fff'}
                />
                <Text style={tw`text-white50 font-RobotoBold text-base`}>
                  {item.label}
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
