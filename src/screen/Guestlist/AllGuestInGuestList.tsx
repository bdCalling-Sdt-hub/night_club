import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IGuest, IGuestsList} from '../../firebase/interface';
import {PrimaryColor, height} from '../../utils/utils';

import React from 'react';
import {Checkbox} from 'react-native-ui-lib';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import TButton from '../../components/buttons/TButton';
import Card from '../../components/cards/Card';
import SearchCard from '../../components/cards/SearchCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import NormalModal from '../../components/modals/NormalModal';
import {useToast} from '../../components/modals/Toaster';
import useFireStore from '../../firebase/database/helper';
import {useImportFile} from '../../hook/useImportFile';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const AllGuestInGuestList = ({
  navigation,
  route,
}: NavigProps<{item: IGuestsList}>) => {
  const {closeToast, showToast} = useToast();
  const [selectGuest, setSelectGuest] = React.useState<IGuest[]>([]);
  const [selectGuestList, setSelectGuestList] = React.useState<IGuestsList>();
  const [search, setSearch] = React.useState('');
  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListAvailable, setGuestListAvailable] =
    React.useState<Array<IGuestsList>>();
  const [guests, setGuests] = React.useState<Array<IGuest>>();

  const {loadAllData} = useFireStore();

  React.useEffect(() => {
    //get all guest
    loadAllData({
      collectType: 'Guests',
      filters: [
        {
          field: 'guest_list',
          operator: '==',
          value: route?.params?.item?.name,
        },
      ],
      setLoad: setGuests,
    });
    loadAllData({
      collectType: 'Events',
      setLoad: setGuestListAvailable,
    });
  }, []);

  const handleImportData = () => {
    showToast({
      multipleBTNStyle: tw`flex-col gap-3`,
      multipleButton: [
        {
          buttonText: 'Export as text',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            // handleAddGuest();
            useImportFile({data: selectGuest, type: 'text'});
            closeToast();
          },
        },
        {
          buttonText: 'Export as CSV',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data: selectGuest, type: 'csv'});
            closeToast();
          },
        },
        {
          buttonText: 'Export as Excel',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data: selectGuest, type: 'xlsx'});
            closeToast();
          },
        },
      ],
    });
  };

  const handleAddEventGuest = async () => {};

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        // offBack
        title={route?.params?.item?.name}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TButton
            title="Export"
            disabled={selectGuest?.length > 0 ? false : true}
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
        data={guests}
        ListHeaderComponent={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selectGuest?.length > 0) {
                  setSelectGuest([]);
                } else {
                  setSelectGuest(guests);
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
            // onPress={() => {
            //   if (selectGuest?.length > 0) {
            //     if (selectGuest?.includes(item)) {
            //       setSelectGuest(selectGuest?.filter(i => i !== item));
            //     } else {
            //       setSelectGuest([...selectGuest, item]);
            //     }
            //   } else {
            //     setSelectGuest([item]);
            //   }
            // }}
            containerStyle={tw` flex-row gap-3 items-center`}
            component={
              <>
                <Checkbox
                  borderRadius={2}
                  size={15}
                  // iconColor="#000000"
                  value={selectGuest?.includes(item)}
                  onValueChange={() => {
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
                  value={selectGuestList?.name === item.name}
                  onValueChange={() => {
                    setSelectGuestList(item);
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
