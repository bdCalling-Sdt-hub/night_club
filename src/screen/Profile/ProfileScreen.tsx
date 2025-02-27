import {DrawerActions, useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IEvent, IGuest, IVenue} from '../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
  IconLeftArrayGray,
  IconSmallSettingCyan,
} from '../../icons/icons';
import {BaseColor, PrimaryColor, height, lStorage} from '../../utils/utils';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import AniImage from '../../components/animate/AniImage';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import EmptyCard from '../../components/Empty/EmptyCard';
import InputTextWL from '../../components/inputs/InputTextWL';
import GLoading from '../../components/loader/GLoading';
import {useAuth} from '../../context/AuthProvider';
import {userAccess} from '../../hook/useAccess';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ProfileScreen = ({navigation}: NavigProps<any>) => {
  const currentUser = auth().currentUser;
  const {user, setUser} = useAuth();
  const [venueData, setVenueData] = React.useState<IVenue[]>([]);
  const [eventData, setEventData] = React.useState<IEvent[]>([]);
  const [selectVenue, setSelectVenue] = React.useState<string | null>(null);
  const [selectEvent, setSelectEvent] = React.useState<string | null>(null);

  const [allGuest, setAllGuest] = React.useState<IGuest[]>([]);

  const [totalGuest, setTotalGuest] = React.useState(0);
  const [freeGuest, setFreeGuest] = React.useState(0);
  const [check_inGuest, setCheck_inGuest] = React.useState(0);
  const [paidGuest, setPaidGuest] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  // console.log(user);
  const isFocused = useIsFocused();

  const MiddleRoles = userAccess({GRole: 'middler'});

  const fetchData = async () => {
    setLoading(true);
    try {
      const collectionRef = firestore().collection('Venues');
      let query = collectionRef.where('status', '==', 'Open');
      if (user?.role === 'super-owner') {
        query = query.where('super_owner_id', '==', user?.user_id);
      } else {
        query = query.where('super_owner_id', '==', user?.super_owner_id);
      }

      if (user?.role === 'manager') {
        query = query.where('manager_id', 'array-contains', user?.user_id);
      } else if (user?.role === 'guard' || user?.role === 'promoters') {
        query = query.where('manager_id', 'array-contains', user?.manager_id);
      }

      const snapshot = await query.get();
      const fetchedData: IVenue[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IVenue[];

      setVenueData(fetchedData);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (MiddleRoles) {
      if (!isFocused) return;

      // Step 1: Load Venues
      setLoading(true);

      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!venueData.length) return;

    // Step 2: Load Events based on filtered venues
    const venueIds = venueData.map(venue => venue.id);

    // console.log(venueData);

    let eventsQuery = firestore()
      .collection('Events')
      .where('venue', 'in', venueIds);

    const unsubscribeEvents = eventsQuery.onSnapshot(snapshot => {
      const events = snapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .filter(event =>
          !event.date ? event : new Date(event.date) >= new Date(),
        );
      setEventData(events);
      setLoading(false);
    });

    return () => {
      unsubscribeEvents();
    };
  }, [venueData]);

  useEffect(() => {
    // if (!eventData.length) return;

    // Step 3: Load Guests based on filtered events
    const eventIds = eventData.map(event => event.id);

    let guestsQuery = firestore()
      .collection('Guests')
      .where('event', 'in', eventIds?.length ? eventIds : ['']);

    const unsubscribeGuests = guestsQuery.onSnapshot(snapshot => {
      const guests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IGuest[];
      // console.log(guests);
      const filteredGuests = guests
        .filter(guest => (!selectEvent ? guest : selectEvent === guest.event))
        .filter(guest => (!selectVenue ? guest : selectVenue === guest.venue));
      // console.log(selectVenue, selectEvent);
      setAllGuest(filteredGuests);
      setLoading(false);
    });

    return () => {
      unsubscribeGuests();
    };
  }, [selectEvent, selectVenue, eventData]);

  // console.log(check_inGuest);

  // console.log(selectEvent, selectVenue);

  React.useEffect(() => {
    if (MiddleRoles) {
      setTotalGuest(
        allGuest?.reduce(
          (acc, cur) => acc + (parseInt(cur.people) ? parseInt(cur.people) : 0),
          0,
        ),
      );
      setFreeGuest(
        allGuest?.reduce(
          (acc, cur) =>
            acc + (parseInt(cur.free_entry) ? parseInt(cur.free_entry) : 0),
          0,
        ),
      );
      setCheck_inGuest(
        allGuest?.reduce(
          (acc, cur) =>
            acc + (parseInt(cur.check_in) ? parseInt(cur.check_in) : 0),
          0,
        ),
      );
      // console.log(
      //   allGuest?.reduce((acc, cur) => acc + parseInt(cur.people), 0),
      //   allGuest?.reduce((acc, cur) => acc + parseInt(cur.free_entry), 0),
      // );
      setPaidGuest(
        allGuest?.reduce(
          (acc, cur) => acc + (cur.people ? parseInt(cur.people) : 0),
          0,
        ) -
          allGuest?.reduce(
            (acc, cur) => acc + (cur.free_entry ? parseInt(cur.free_entry) : 0),
            0,
          ),
      );
    }

    return () => {
      setLoading(false);
    };
  }, [allGuest, eventData]);

  // console.log(eventData);

  // console.log(venueData?.map((venue: any) => venue.id));

  // console.log(user);

  React.useEffect(() => {
    if (!user?.role) {
      currentUser?.getIdTokenResult(true).then(idTokenResult => {
        if (idTokenResult?.claims) {
          setUser({
            ...idTokenResult.claims,
            photoURL: currentUser?.photoURL,
          });
        }
      });
    }
    return () => {
      setLoading(false);
    };
  }, [isFocused]);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        offBack
        title={'Profile'}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TouchableOpacity
            onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
            <SvgXml xml={IconSmallSettingCyan} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={PrimaryColor}
            onRefresh={() => {
              fetchData();
            }}
            refreshing={false}
            colors={['white']}
          />
        }
        contentContainerStyle={tw`px-4 pb-4`}
        keyboardShouldPersistTaps="always">
        {/* //profile sections */}
        <View style={tw`gap-4 justify-center items-center`}>
          <AniImage
            imageStyle={tw`w-32 h-32  rounded-full`}
            source={
              user?.photoURL
                ? {
                    uri: user?.photoURL,
                  }
                : require('../../assets/images/profile/profile1.webp')
            }
          />
          <View style={tw`gap-1 justify-center items-center`}>
            <Text style={tw`text-2xl text-white200 font-RobotoBold`}>
              {user?.name}
            </Text>
            <Text style={tw`text-xs text-white400 font-RobotoRegular`}>
              {user?.email}
            </Text>
            <Text style={tw`text-sm text-white400 font-RobotoRegular`}>
              {user?.role}
            </Text>
          </View>
        </View>

        {/*============= dashboard part to some accounts =============== */}
        {(user?.role === 'super-owner' ||
          user?.role === 'owner' ||
          user?.role === 'manager') && (
          <View
            style={tw`p-3 bg-primary900  rounded-lg mt-3 bg-opacity-10 gap-3`}>
            <View
              style={tw`flex-row flex-1 justify-between bg-secondary60  rounded-lg items-center   px-4 py-2`}>
              <IButton
                // title="Filter"
                disabled
                svg={IconFilterGray}
                containerStyle={tw`p-0 m-0  bg-transparent items-center`}
              />

              <View style={tw`flex-row  items-center gap-2`}>
                <Picker
                  useSafeArea
                  listProps={{
                    ListEmptyComponent: (
                      <EmptyCard
                        title="No Venues available"
                        isLoading={loading}
                        hight={height * 0.8}
                      />
                    ),
                  }}
                  value={selectVenue || 'Select venue'}
                  onChange={text => setSelectVenue(text as string)}
                  renderInput={(preps: any) => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2  `}>
                        <Text
                          style={tw`text-white100   font-RobotoMedium text-[10px]`}>
                          {selectVenue
                            ? venueData?.find(i => i.id === selectVenue)?.name
                            : 'Select venue'}
                        </Text>
                        <SvgXml
                          xml={IconDownArrayGray}
                          height={10}
                          width={10}
                        />
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
                      <View
                        style={tw`flex-row justify-between items-center mr-2`}>
                        <TouchableOpacity
                          onPress={preps.onCancel}
                          style={tw`self-start py-3 px-4`}>
                          <SvgXml xml={IconCloseGray} height={20} width={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectVenue(null);
                            preps.onCancel();
                          }}
                          style={tw` py-1 px-4 border border-primary rounded-lg `}>
                          <Text
                            style={tw`text-primary font-RobotoMedium text-sm`}>
                            Clear
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={venueData?.map(item => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
                <Picker
                  useSafeArea
                  listProps={{
                    ListEmptyComponent: (
                      <EmptyCard
                        title="No Events available"
                        isLoading={loading}
                        hight={height * 0.8}
                      />
                    ),
                  }}
                  value={selectEvent || 'Select event'}
                  onChange={text => setSelectEvent(text as string)}
                  renderInput={(preps: any) => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                        <Text
                          parseIntOfLines={1}
                          style={tw`text-white100  font-RobotoMedium text-[10px]`}>
                          {selectEvent
                            ? eventData?.find(i => i.id === selectEvent)
                                ?.name || 'Select event'
                            : 'Select event'}
                        </Text>
                        <SvgXml
                          xml={IconDownArrayGray}
                          height={10}
                          width={10}
                        />
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
                      <View
                        style={tw`flex-row justify-between items-center mr-2`}>
                        <TouchableOpacity
                          onPress={preps.onCancel}
                          style={tw`self-start py-3 px-4`}>
                          <SvgXml xml={IconCloseGray} height={20} width={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectEvent(null);
                            preps.onCancel();
                          }}
                          style={tw` py-1 px-4 border border-primary rounded-lg `}>
                          <Text
                            style={tw`text-primary font-RobotoMedium text-sm`}>
                            Clear
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={eventData?.map(item => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
              </View>
            </View>
            <View style={tw`flex-row justify-between gap-2`}>
              <View
                style={tw`bg-secondary bg-opacity-20 h-20 flex-1 rounded-lg p-3 gap-1`}>
                <Text style={tw`text-white50  font-RobotoMedium text-base`}>
                  Total Guest
                </Text>
                <Text style={tw`text-white60  font-RobotoMedium text-base`}>
                  {totalGuest}
                </Text>
              </View>
              <View
                style={tw`bg-secondary bg-opacity-20 h-20 flex-1 rounded-lg p-3 gap-1`}>
                <Text style={tw`text-white50  font-RobotoMedium text-base`}>
                  Free Guest
                </Text>
                <Text style={tw`text-white60  font-RobotoMedium text-base`}>
                  {freeGuest}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between gap-2`}>
              <View
                style={tw`bg-secondary bg-opacity-20 h-20 flex-1 rounded-lg p-3 gap-1`}>
                <Text style={tw`text-white50  font-RobotoMedium text-base`}>
                  Checked In
                </Text>
                <Text style={tw`text-white60  font-RobotoMedium text-base`}>
                  {check_inGuest}
                </Text>
              </View>
              <View
                style={tw`bg-secondary bg-opacity-20 h-20 flex-1 rounded-lg p-3 gap-1`}>
                <Text style={tw`text-white50  font-RobotoMedium text-base`}>
                  Paid Guest
                </Text>
                <Text style={tw`text-white60  font-RobotoMedium text-base`}>
                  {paidGuest}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={tw`px-4 my-3 gap-3`}>
          <IwtButton
            title="Edit Profile"
            svg={IconLeftArrayGray}
            containerStyle={tw`flex-row-reverse justify-between p-0 items-center px-4 w-full h-12 rounded-lg bg-primary800`}
            titleStyle={tw`text-white font-RobotoBold text-base`}
            onPress={() => navigation.navigate('EditProfile')}
          />
          {(user?.role === 'super-owner' || user?.role === 'owner') && (
            <IwtButton
              title="Manage Users"
              svg={IconLeftArrayGray}
              containerStyle={tw`flex-row-reverse justify-between p-0 items-center px-4 w-full h-12 rounded-lg bg-primary800`}
              titleStyle={tw`text-white font-RobotoBold text-base`}
              onPress={() => navigation.navigate('ManageUsers')}
            />
          )}
        </View>
        {/*================= note section ==================  */}
        <View style={tw`px-4 mb-5 `}>
          <InputTextWL
            label="Note"
            multiline
            verticalAlign="top"
            textAlignVertical="top"
            defaultValue={
              lStorage?.getString(user?.user_id as string) as string
            }
            onChangeText={text =>
              lStorage?.setString(user?.user_id as string, text)
            }
            containerStyle={tw`h-40  pt-2 rounded-lg border-[1px] border-transparent`}
            focusSTyle={tw`border-primary`}
            placeholder="Enter your note"
            numberOfLines={10}
          />
        </View>
      </ScrollView>

      <GLoading loading={loading} setLoading={setLoading} />
    </Background>
  );
};

export default ProfileScreen;
