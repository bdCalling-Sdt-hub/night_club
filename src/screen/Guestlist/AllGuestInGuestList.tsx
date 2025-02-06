import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IEvent, IGuest, IGuestsList} from '../../firebase/interface';
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
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {useExportFile} from '../../hook/useExportFile';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const AllGuestInGuestList = ({
  navigation,
  route,
}: NavigProps<{item: IGuestsList}>) => {
  const {user} = useAuth();
  const {closeToast, showToast} = useToast();
  const [selectGuest, setSelectGuest] = React.useState<IGuest[]>([]);
  const [selectEvent, setSelectEvent] = React.useState<IEvent>();
  const [search, setSearch] = React.useState('');
  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListAvailable, setGuestListAvailable] =
    React.useState<Array<IGuestsList>>();
  const [guests, setGuests] = React.useState<Array<IGuest>>();

  const {loadAllData, updateFireData, listenToData} = useFireStore();

  React.useEffect(() => {
    loadAllData({
      collectType: 'Events',
      filters: [
        {
          field: 'date',
          operator: '>=',
          value: new Date().toISOString(),
        },
        (user?.role === 'guard' ||
          user?.role === 'promoters' ||
          user?.role === 'manager') && {
          field: 'manager_id',
          operator: '==',
          value: user?.role === 'manager' ? user?.user_id : user?.manager_id,
        },
      ]?.filter(Boolean) as any,
      setLoad: data => {
        setGuestListAvailable(data);
      },
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = () => {};
    listenToData({
      unsubscribe,
      collectType: 'Guests',
      filters: [
        {
          field: 'guest_list',
          operator: '==',
          value: route?.params?.item?.id,
        },
        {
          field: 'event',
          operator: '==',
          value: null,
        },
        {
          field: 'createdBy',
          operator: '==',
          value: user?.user_id,
        },
      ],
      onUpdate: (data: any[]) => {
        setGuests(data);
      },
    });

    return () => {
      unsubscribe();
    };
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
            useExportFile({data: selectGuest, type: 'txt'});
            closeToast();
          },
        },
        {
          buttonText: 'Export as CSV',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useExportFile({data: selectGuest, type: 'csv'});
            closeToast();
          },
        },
        {
          buttonText: 'Export as Excel',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useExportFile({data: selectGuest, type: 'xlsx'});
            closeToast();
          },
        },
      ],
    });
  };

  const handleAddEventGuest = async () => {
    try {
      console.log('selectGuest', selectGuest);
      console.log('Event', selectEvent);

      selectGuest?.forEach(item => {
        updateFireData({
          collectType: 'Guests',
          id: item.id,
          data: {
            event: selectEvent?.id,
            venue: selectEvent?.venue,
            event_date: selectEvent?.date,
          },
        });
        setAddToGuests(false);
        setSelectGuest([]);
        setSelectEvent(undefined);
      });

      // console.log(selectGuestList);
    } catch (error) {
      console.log(error);
    }
  };

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
                  setSelectGuest(guests as any);
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
                  title: item.tag_name,
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
          <View>
            <Text style={tw`text-white60 font-RobotoBold text-base`}>
              Selected Event
            </Text>
            <Text style={tw`text-white60 text-xs font-RobotoBold `}>
              (All upcoming events)
            </Text>
          </View>
        </View>
        <View>
          {guestListAvailable?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectEvent(item as any);
                }}
                style={tw`flex-row gap-3 items-center px-4 mb-4`}>
                <Checkbox
                  borderRadius={100}
                  size={15}
                  iconColor="#000000"
                  value={selectEvent === item}
                  onValueChange={() => {
                    setSelectEvent(item as any);
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
            // setAddToGuests(false);
            handleAddEventGuest();
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
