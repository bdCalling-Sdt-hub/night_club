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
import {BaseColor, PrimaryColor, lStorage} from '../../utils/utils';

import auth from '@react-native-firebase/auth';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import AniImage from '../../components/animate/AniImage';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ProfileScreen = ({navigation}: NavigProps<null>) => {
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

  const {listenToData, loadAllData} = useFireStore();

  React.useEffect(() => {
    // Step 1: Load Venues
    setLoading(true);
    loadAllData({
      collectType: 'Venues',
      filters: [
        {
          field: 'status',
          operator: '==',
          value: 'Open',
        },
        (user?.role === 'guard' ||
          user?.role === 'promoters' ||
          user?.role === 'manager') && {
          field: 'manager_id',
          operator: '==',
          value: user?.role === 'manager' ? user?.user_id : user?.manager_id,
        },
      ]?.filter(Boolean) as any,

      setLoad: (venues: IVenue[]) => {
        // Filter venues by manager
        setVenueData(venues);
      },
    });
    setLoading(false);
    // Cleanup all listeners on component unmount
  }, [loading]);

  React.useEffect(() => {
    let unsubscribeEvents = () => {};
    const venueIds = venueData.map(venue => venue.id);
    // console.log(venueIds);
    // Step 2: Load Events based on filtered venues
    listenToData({
      unsubscribe: unsubscribeEvents,
      collectType: 'Events',
      filters: [
        {
          field: 'venue',
          operator: 'in',
          value: venueIds, // Filter events where venue matches the filtered venues
        },
      ]?.filter(Boolean) as any,
      onUpdate: (events: IEvent[]) => {
        setEventData(events?.filter(i => i.date > new Date().toISOString()));

        // const eventIds = events.map((event: any) => event.id);
      },
    });

    // Cleanup all listeners on component unmount
    return () => {
      unsubscribeEvents();
    };
  }, [venueData]);

  React.useEffect(() => {
    let unsubscribeGuests = () => {};

    // Step 3: Load Guests based on filtered events
    listenToData({
      unsubscribe: unsubscribeGuests,
      collectType: 'Guests',
      filters: [
        {
          field: 'event',
          operator: 'in',
          value: eventData.map((event: any) => event.id), // Filter events where venue matches the filtered venues
        },
      ]?.filter(Boolean) as any,
      onUpdate: (data: any[]) => {
        // console.log(data);
        setAllGuest(
          data

            ?.filter((guest: any) => {
              return !selectEvent ? guest : selectEvent === guest.event;
            })
            ?.filter((guest: any) => {
              return !selectVenue ? guest : selectVenue === guest.venue;
            }),
        );
      },
    });

    // Cleanup all listeners on component unmount
    return () => {
      unsubscribeGuests();
    };
  }, [selectEvent, selectVenue, eventData]);

  // console.log(check_inGuest);

  // console.log(selectEvent, selectVenue);

  React.useEffect(() => {
    setTotalGuest(allGuest?.reduce((acc, cur) => acc + Number(cur.people), 0));
    setFreeGuest(
      allGuest?.reduce((acc, cur) => acc + Number(cur.free_entry), 0),
    );
    setCheck_inGuest(
      allGuest
        ?.filter(item => item?.check_in)
        ?.reduce((acc, cur) => acc + Number(cur.check_in), 0),
    );
    setPaidGuest(totalGuest - freeGuest);
  }, [allGuest]);

  // console.log(allGuest?.reduce((acc, cur) => acc + Number(cur.people), 0));

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
  }, [loading]);

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
              setLoading(true);
            }}
            refreshing={loading}
            colors={['white']}
          />
        }
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
            style={tw`p-3 bg-primary900  mx-4 rounded-lg mt-3 bg-opacity-10 gap-3`}>
            <View
              style={tw`flex-row flex-1 justify-between bg-secondary60  rounded-lg items-center   px-4 py-2`}>
              <IButton
                // title="Filter"
                svg={IconFilterGray}
                containerStyle={tw`p-0 m-0  bg-transparent items-center`}
              />

              <View style={tw`  flex-row   items-center gap-2`}>
                <Picker
                  useSafeArea
                  value={selectVenue || 'Select venue'}
                  onChange={text => setSelectVenue(text as string)}
                  renderInput={(preps: any) => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2  `}>
                        <Text
                          numberOfLines={1}
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
                  value={selectEvent || 'Select event'}
                  onChange={text => setSelectEvent(text as string)}
                  renderInput={(preps: any) => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                        <Text
                          numberOfLines={1}
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
        <View style={tw`px-4 mb-5`}>
          <InputTextWL
            label="Note"
            multiline
            verticalAlign="top"
            // textAlign="center"
            textAlignVertical="top"
            defaultValue={lStorage?.getString('note') as string}
            onChangeText={text => lStorage?.setString('note', text)}
            numberOfLines={10}
            containerStyle={tw` h-40 pt-2 rounded-lg border-[1px] border-transparent`}
            focusSTyle={tw`border-primary`}
            placeholder="Enter your note"
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default ProfileScreen;
