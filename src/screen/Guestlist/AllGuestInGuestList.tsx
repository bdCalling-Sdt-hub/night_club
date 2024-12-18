import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {PrimaryColor, height} from '../../utils/utils';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import Background from '../components/Background';
import Card from '../../components/cards/Card';
import {Checkbox} from 'react-native-ui-lib';
import EmptyCard from '../../components/Empty/EmptyCard';
import {NavigProps} from '../../interfaces/NaviProps';
import NormalModal from '../../components/modals/NormalModal';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import TButton from '../../components/buttons/TButton';
import data from './guest.json';
import tw from '../../lib/tailwind';
import {useImportFile} from '../../hook/useImportFile';
import {useToast} from '../../components/modals/Toaster';

const AllGuestInGuestList = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const [selectGuest, setSelectGuest] = React.useState([]);
  const [selectGuestList, setSelectGuestList] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListAvailable, setGuestListAvailable] = React.useState([
    {label: 'Event for demo content 1', value: 'Event for demo content 1'},
    {label: 'Event for demo content 2', value: 'Event for demo content 2'},
    {label: 'Event for demo content 3', value: 'Event for demo content 3'},
    {label: 'Event for demo content 4', value: 'Event for demo content 4'},
    {label: 'Event for demo content 5', value: 'Event for demo content 5'},
    {label: 'Event for demo content 6', value: 'Event for demo content 6'},
    {label: 'Event for demo content 7', value: 'Event for demo content 7'},
    {label: 'Event for demo content 8', value: 'Event for demo content 8'},
  ]);
  const handleImportData = () => {
    showToast({
      multipleBTNStyle: tw`flex-col gap-3`,
      multipleButton: [
        {
          buttonText: 'Import as text',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            // handleAddGuest();
            useImportFile({data, type: 'text'});
            closeToast();
          },
        },
        {
          buttonText: 'Import as CSV',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data, type: 'csv'});
            closeToast();
          },
        },
        {
          buttonText: 'Import as Excel',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data, type: 'xlsx'});
            closeToast();
          },
        },
      ],
    });
  };
  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        offBack
        title="Random Title of guest List "
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TButton
            title="Import"
            onPress={handleImportData}
            containerStyle={tw`w-24 p-0 h-6 rounded-lg  bg-transparent self-end justify-end`}
            titleStyle={tw`text-primary font-RobotoBold text-base`}
          />
        }
      />

      <View style={tw`px-[4%] pb-2`}>
        <SearchCard search={search} setSearch={setSearch} />
      </View>

      <FlatList
        contentContainerStyle={tw`px-4 pt-1 pb-8 gap-3`}
        data={data.guest}
        ListHeaderComponent={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selectGuest?.length > 0) {
                  setSelectGuest([]);
                } else {
                  setSelectGuest(data.guest);
                }
              }}
              style={tw` px-4 self-end`}>
              <Text style={tw`text-primary text-xs font-RobotoBold text-right`}>
                {selectGuest?.length > 0 ? 'Clear All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          );
        }}
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
                  title: item.name,

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
      {selectGuest?.length > 0 && (
        <TButton
          title="Add this list to an event"
          containerStyle={tw`my-4 w-[90%] self-center h-10 rounded-lg bg-primary800`}
          titleStyle={tw`text-white50 font-RobotoBold text-sm`}
          onPress={() => {
            setAddToGuests(true);
          }}
          isLoading={false}
        />
      )}

      <NormalModal
        layerContainerStyle={tw`flex-1`}
        containerStyle={tw`w-[80%] `}
        visible={addToGuests}
        setVisible={setAddToGuests}>
        <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
          <Text style={tw`text-white60 font-RobotoBold text-base`}>
            Selected Event
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

        <TButton
          title="Save"
          onPress={() => {
            setAddToGuests(false);
            // navigation.navigate('AddNewGuestList');
          }}
          containerStyle={tw` w-full mt-2
             self-center h-10 rounded-lg bg-primary`}
          titleStyle={tw`text-white50 font-RobotoBold text-sm`}
          isLoading={false}
        />
      </NormalModal>
    </Background>
  );
};

export default AllGuestInGuestList;
