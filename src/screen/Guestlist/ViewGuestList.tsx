import React, {useEffect} from 'react';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {IEvent, IGuest, ITags, IVenue} from '../../firebase/interface';
import {
  IconBigPlusCyan,
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
} from '../../icons/icons';
import {BaseColor, PrimaryColor, height} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import Card from '../../components/cards/Card';
import SearchCard from '../../components/cards/SearchCard';
import EmptyCard from '../../components/Empty/EmptyCard';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {useImportData} from '../../hook/useImportFile';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ViewGuestList = ({navigation, route}: NavigProps<{item: IEvent}>) => {
  const {closeToast, showToast} = useToast();
  const {user} = useAuth();
  const [addedBy, setAddedBy] = React.useState('Added by');
  const [venueData, setVenueData] = React.useState<IVenue | null>(null);
  // const [tagsData, setTagsData] = React.useState<Array<ITags>>([]);
  const [tags, setTags] = React.useState('Tags');
  const [loading, setLoading] = React.useState(false);

  const [search, setSearch] = React.useState('');

  const {
    loadAllData,
    updateFireData,
    listenToData,
    loadSingleData,
    createFireData,
  } = useFireStore();
  const [TagsData, setTagsData] = React.useState<Array<ITags>>([]);
  const [guestListData, setGuestListData] = React.useState<Array<IGuest>>([]);

  const isFocused = useIsFocused();

  const [totalGuest, setTotalGuest] = React.useState(0);
  const [totoCheckIn, setTotalCheckIn] = React.useState(0);
  const [addedByData, setAddedByData] = React.useState<
    {label: string; value: string}[]
  >([]);

  const handleCheckIn = (guest: IGuest) => {
    updateFireData({
      id: guest.id,
      collectType: 'Guests',
      data: {
        check_in:
          parseInt(guest?.check_in) === parseInt(guest?.people)
            ? 0
            : parseInt(guest.check_in) + 1 || 0,
      },
    });
  };

  React.useEffect(() => {
    setLoading(true);
    loadAllData({
      collectType: 'Tags',

      setLoad: data => {
        setTagsData(data);
      },
    });
  }, [isFocused]);

  // console.log(route?.params?.item?.id);

  React.useEffect(() => {
    let unsubscribe: () => void = () => {}; // Default no-op function for cleanup

    if (route?.params?.item?.id) {
      setLoading(true);

      unsubscribe = firestore()
        .collection('Guests')
        .where('event', '==', route.params.item.id)
        .onSnapshot(
          snapshot => {
            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGuestListData(data as any);
            setLoading(false); // Stop loading when data is received
          },
          error => {
            console.error('Error fetching Guests:', error);
            setLoading(false); // Stop loading if there's an error
          },
        );
    }

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [isFocused, route?.params?.item?.id]);

  React.useEffect(() => {
    setLoading(true);
    loadSingleData({
      id: route?.params?.item?.venue as string,
      collectType: 'Venues',
      setLoad: (data: any) => {
        setVenueData(data);
        setLoading(false);
      },
    });
  }, [isFocused]);

  useEffect(() => {
    const totalGuest = guestListData.reduce(
      (acc, guest) => acc + (guest.people ? Number(guest.people) : 0),
      0,
    );

    const totalCheckIn = guestListData.reduce(
      (acc, guest) =>
        acc + (parseInt(guest?.check_in) || 0 ? Number(guest.check_in) : 0),
      0,
    );

    const addedByData = Array.from(
      new Set(guestListData?.map(guest => guest.added_by)),
    ).map(addedBy => ({label: addedBy, value: addedBy}));

    setTotalGuest(totalGuest);
    setTotalCheckIn(totalCheckIn);
    setAddedByData(addedByData);
  }, [guestListData]); // Ensure `guestListData` is updated and prevents infinite loop

  // console.log(route?.params?.item);

  const handleImportData = async () => {
    try {
      const data = await useImportData();

      if (
        data &&
        (data?.find(item => item).id || data?.find(item => item).fullName)
      ) {
        if (!data) {
          showToast({
            title: 'Warning',
            content: 'Guest list is empty',
            onPress: closeToast,
          });
          return;
        } else {
          showToast({
            title: 'Do you want to add the guests as new entries?',
            content: `Note: If you select 'No' and the guests are already added to another event, they will be moved to this event's guest list, replacing their association with the previous event.`,
            multipleButton: [
              {
                buttonText: 'Yes',
                onPress: () => {
                  if (data && Array.isArray(data)) {
                    data.forEach(async (guest: IGuest) => {
                      guest.event = route?.params?.item?.id;
                      guest.venue = route?.params?.item?.venue;

                      if (guest.event_date) {
                        guest.event_date = route?.params?.item?.date;
                      }

                      try {
                        delete guest.id;
                        // guest.createdBy = user?.user_id as string;
                        guest.createdBy = '';

                        // console.log(guest);
                        createFireData({
                          collectType: 'Guests',
                          data: guest,
                        });
                      } catch (error) {
                        console.log('Error updating guest:', error);
                      }

                      // add as new create own
                    });
                  }
                  closeToast();
                },
                buttonStyle: tw`bg-primary flex-1`,
              },
              {
                buttonText: 'No',
                onPress: () => {
                  if (data && Array.isArray(data)) {
                    data.forEach(async (guest: IGuest) => {
                      guest.event = route?.params?.item?.id;
                      guest.venue = route?.params?.item?.venue;

                      if (guest.event_date) {
                        guest.event_date = route?.params?.item?.date;
                      }

                      // console.log(guest.id);
                      // update options

                      if (guest?.createdBy === user?.user_id) {
                        try {
                          const docRef = firestore()
                            .collection('Guests')
                            .doc(guest.id);
                          const docSnapshot = await docRef.get();

                          if (docSnapshot.exists) {
                            // Document exists, update it
                            await docRef.update(guest);
                          } else {
                            // Document not found, show a warning
                            showToast({
                              title: 'Warning',
                              content:
                                'Please upload the latest version of the guest list. The uploaded guest list does not match the database.',
                              onPress: closeToast,
                            });
                          }
                        } catch (error) {
                          console.log('Error updating guest:', error);
                        }
                      } else {
                        try {
                          delete guest.id;
                          // guest.createdBy = user?.user_id as string;
                          guest.createdBy = '';

                          createFireData({
                            collectType: 'Guests',
                            data: guest,
                          });
                        } catch (error) {
                          console.log('Error updating guest:', error);
                        }
                      }

                      // add as new create own
                    });
                  }
                  closeToast();
                },
                buttonStyle: tw`border bg-transparent border-primary flex-1`,
              },
            ],
          });
        }
      } else if (data) {
        const convertMyFormate = data?.map(item => {
          return {
            fullName: item['First name'] + ' ' + item['Last name'],
            people: item['Total tickets'],
            free_entry: item['Free tickets'],
            added_by: item['Added by'],
          };
        });

        if (convertMyFormate && Array.isArray(convertMyFormate)) {
          convertMyFormate.forEach(async (guest: any) => {
            guest.event = route?.params?.item?.id;
            guest.venue = route?.params?.item?.venue;

            if (!guest.event_date) {
              guest.event_date = route?.params?.item?.date;
            }

            // console.log(guest.id);
            // update options

            if (guest?.createdBy === user?.user_id) {
              try {
                const docRef = firestore().collection('Guests').doc(guest.id);
                const docSnapshot = await docRef.get();

                if (docSnapshot.exists) {
                  // Document exists, update it
                  await docRef.update(guest);
                } else {
                  // Document not found, show a warning
                  showToast({
                    title: 'Warning',
                    content:
                      'Please upload the latest version of the guest list. The uploaded guest list does not match the database.',
                    onPress: closeToast,
                  });
                }
              } catch (error) {
                console.log('Error updating guest:', error);
              }
            } else {
              try {
                delete guest.id;
                // guest.createdBy = user?.user_id as string;
                guest.createdBy = '';

                createFireData({
                  collectType: 'Guests',
                  data: guest,
                });
              } catch (error) {
                console.log('Error updating guest:', error);
              }
            }

            // add as new create own
          });
        }
      } else {
        showToast({
          title: 'Warning',
          content: 'No data found to import',
          onPress: closeToast,
        });
        return;
      }
    } catch (err: unknown) {
      console.log('Error importing data:', err);
    }
  };

  // console.log(guestListData);

  // console.log(venueData);

  // console.log(loading);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        title="View Guest List"
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <>
            {user?.role !== 'guard' && (
              <TButton
                title="Import"
                onPress={handleImportData}
                containerStyle={tw`w-24 p-0 h-6 rounded-lg  bg-transparent self-end justify-end`}
                titleStyle={tw`text-primary font-RobotoBold text-base`}
              />
            )}
          </>
        }
      />

      <View style={tw`px-4 mb-4 `}>
        <Text style={tw`text-white60 text-xs font-RobotoMedium`}>
          {venueData?.name && venueData?.name + '>'}{' '}
          {route?.params?.item?.name && route?.params?.item?.name}
          {route?.params?.item?.date &&
            '>' + moment(route?.params?.item?.date).format('DD-MM-YYYY')}
          {route?.params?.item?.date &&
            '>' + moment(route?.params?.item?.date).format(' h:mm A')}
        </Text>
      </View>

      <View style={tw`px-[4%]`}>
        <SearchCard search={search} setSearch={setSearch} />
      </View>

      <View
        style={tw`mt-4 mb-2 flex-row bg-secondary60 h-10 mx-4 rounded-lg items-center justify-between gap-1`}>
        <IwtButton
          title="Filter"
          svg={IconFilterGray}
          containerStyle={tw`p-0 bg-transparent items-center   w-20`}
        />

        <View style={tw`px-4 flex-row items-center gap-2`}>
          <Picker
            useSafeArea
            listProps={{
              ListEmptyComponent: (
                <EmptyCard
                  title="No any one added yet"
                  isLoading={loading}
                  hight={height * 0.8}
                />
              ),
            }}
            value={addedBy}
            onChange={text => setAddedBy(text as string)}
            renderInput={(preps: any) => {
              return (
                <TouchableOpacity
                  onPress={preps.onPress}
                  style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                  <Text
                    numberOfLines={1}
                    style={tw`text-white100  font-RobotoMedium text-[10px]`}>
                    {addedBy}
                  </Text>
                  <SvgXml xml={IconDownArrayGray} height={10} width={10} />
                </TouchableOpacity>
              );
            }}
            renderItem={(value, items) => {
              return (
                <View
                  style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                  <Text
                    style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
                    {value}
                  </Text>
                </View>
              );
            }}
            renderCustomDialogHeader={(preps: any) => {
              return (
                <View style={tw`flex-row justify-between items-center mr-2`}>
                  <TouchableOpacity
                    onPress={preps.onCancel}
                    style={tw`self-start py-3 px-4`}>
                    <SvgXml xml={IconCloseGray} height={20} width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setAddedBy('Added by');
                      preps.onCancel();
                    }}
                    style={tw` py-1 px-4 border border-primary rounded-lg `}>
                    <Text style={tw`text-primary font-RobotoMedium text-sm`}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            fieldType={Picker.fieldTypes.filter}
            paddingH
            items={addedByData}
            pickerModalProps={{
              overlayBackgroundColor: BaseColor,
            }}
          />
          <Picker
            useSafeArea
            listProps={{
              ListEmptyComponent: (
                <EmptyCard
                  title="No tags added yet"
                  isLoading={loading}
                  hight={height * 0.8}
                />
              ),
            }}
            value={tags}
            onChange={text => setTags(text as any)}
            renderInput={(preps: any) => {
              return (
                <TouchableOpacity
                  onPress={preps.onPress}
                  style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                  <Text
                    numberOfLines={1}
                    style={tw`text-white100  font-RobotoMedium text-[10px]`}>
                    {TagsData?.find(tag => tag?.id === tags)?.name ?? 'Tags'}
                  </Text>
                  <SvgXml xml={IconDownArrayGray} height={10} width={10} />
                </TouchableOpacity>
              );
            }}
            renderItem={(value, items) => {
              return (
                <View
                  style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                  <Text
                    style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
                    {items?.label}
                  </Text>
                </View>
              );
            }}
            renderCustomDialogHeader={(preps: any) => {
              return (
                <View style={tw`flex-row justify-between items-center mr-2`}>
                  <TouchableOpacity
                    onPress={preps.onCancel}
                    style={tw`self-start py-3 px-4`}>
                    <SvgXml xml={IconCloseGray} height={20} width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTags('Tags');
                      preps.onCancel();
                    }}
                    style={tw` py-1 px-4 border border-primary rounded-lg `}>
                    <Text style={tw`text-primary font-RobotoMedium text-sm`}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            fieldType={Picker.fieldTypes.filter}
            paddingH
            items={TagsData?.map(item => {
              return {
                label: item?.name,
                value: item?.id,
              } as any;
            })}
            pickerModalProps={{
              overlayBackgroundColor: BaseColor,
            }}
          />
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          Checked in
        </Text>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          {totoCheckIn}/{totalGuest}
        </Text>
      </View>

      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={false}
            progressBackgroundColor={PrimaryColor}
            colors={['white']}
            onRefresh={() => {
              setLoading(!loading);
            }}
          />
        }
        estimatedItemSize={200}
        ListEmptyComponent={
          <EmptyCard
            isLoading={loading}
            hight={height * 0.6}
            title="No Guests"
          />
        }
        data={guestListData
          ?.filter(item => {
            return tags === 'Tags' ? item : item?.tag === tags;
          })
          .filter(item => {
            return addedBy === 'Added by' ? item : item?.added_by === addedBy;
          })
          .filter(item => {
            return item.fullName.toLowerCase().includes(search.toLowerCase());
          })}
        keyExtractor={(item, index) => item?.id.toString()}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        renderItem={({item, index}) => (
          <Card
            onPress={() => navigation.navigate('GuestDetails', {guest: item})}
            containerStyle={tw`flex-row gap-3 items-center`}
            layoutStyle={tw`mx-4 my-2 `}
            component={
              <Card.Button
                onPress={() => handleCheckIn(item)}
                checkedIn={Number(item?.check_in || 0)}
                total={Number(item?.people || 0)}
              />
            }>
            <Card.Details
              data={[
                {
                  title: item.fullName,
                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                (item.entry_fee || item.free_entry || item.free_entry_time) && {
                  title: item.free_entry_time
                    ? `Free entry before ${moment(item.free_entry_time).format(
                        'hh:mm A',
                      )}`
                    : item.entry_fee && !item.free_entry
                    ? `Paid guest  ${parseInt(item.people)}`
                    : !item.entry_fee && item.free_entry
                    ? `Free guest ${parseInt(item.free_entry)}`
                    : item.free_entry && item.entry_fee
                    ? `Free guest ${parseInt(item.free_entry)} and paid guest ${
                        parseInt(item.people) - parseInt(item.free_entry)
                      }`
                    : '',
                  titleStyle: tw`text-yellow-400 font-RobotoBold text-xs`,
                },
                {
                  title: `Guests ${
                    item?.check_in ? item?.check_in : 0
                  } out of ${item?.people ?? 0} `,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
              ]}
            />
          </Card>
        )}
      />

      <IButton
        onPress={() =>
          navigation.navigate('AddNewGuest', {
            item: route?.params?.item,
          })
        }
        svg={IconBigPlusCyan}
        containerStyle={tw`absolute bottom-5 bg-opacity-65 right-6 w-14 h-14 rounded-full  bg-base `}
      />
    </Background>
  );
};

export default ViewGuestList;
