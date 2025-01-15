import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IEvent, IGuest, IVenue} from '../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
  IconLeftArrayGray,
  IconSmallSettingCyan,
} from '../../icons/icons';
import {BaseColor, lStorage} from '../../utils/utils';

import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import AniImage from '../../components/animate/AniImage';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IwtButton from '../../components/buttons/IwtButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const ProfileScreen = ({navigation}: NavigProps<null>) => {
  const {user, setUser} = useAuth();
  const [venueData, setVenueData] = React.useState<IVenue[]>([]);
  const [eventData, setEventData] = React.useState<IEvent[]>([]);
  const [selectVenue, setSelectVenue] = React.useState('Select venue');
  const [selectEvent, setSelectEvent] = React.useState('Select event');

  const [allGuest, setAllGuest] = React.useState<IGuest[]>([]);

  // console.log(user);

  const {listenToData, loadAllData} = useFireStore();

  React.useEffect(() => {
    let unsubscribe = () => {};

    listenToData({
      unsubscribe,
      collectType: 'Guests',
      filters: [
        {
          field: 'event',
          operator: '!=',
          value: '',
        },
        {
          field: 'event',
          operator: '==',
          value: selectEvent,
        },
        {
          field: 'venue',
          operator: '==',
          value: selectVenue,
        },
      ],
      onUpdate: (data: any[]) => {
        setAllGuest(data);
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    loadAllData({
      collectType: 'Venues',
      setLoad: setVenueData,
    });
    loadAllData({
      collectType: 'Events',
      setLoad: setEventData,
    });
  }, []);

  const totalGuest = allGuest?.reduce(
    (acc, cur) => acc + Number(cur.people),
    0,
  );

  const freeGuest = allGuest?.reduce(
    (acc, cur) => acc + Number(cur.free_entry),
    0,
  );

  const check_inGuest = allGuest
    ?.filter(item => item?.check_in)
    ?.reduce((acc, cur) => acc + Number(cur.check_in), 0);

  const paidGuest = totalGuest - freeGuest;

  // console.log(check_inGuest);

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
      <ScrollView keyboardShouldPersistTaps="always">
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
            {/* <Text style={tw`text-xs text-white400 font-RobotoRegular`}>
              {user?.email}
            </Text> */}
            <Text style={tw`text-sm text-white400 font-RobotoRegular`}>
              {user?.role}
            </Text>
          </View>
        </View>

        {/*============= dashboard part to some accounts =============== */}
        <View
          style={tw`p-3 bg-primary900   mx-4 rounded-lg mt-3 bg-opacity-10 gap-3`}>
          <View
            style={tw` flex-row bg-secondary60 h-10  rounded-lg items-center justify-between gap-1`}>
            <IwtButton
              title="Filter"
              svg={IconFilterGray}
              containerStyle={tw`p-0 bg-transparent items-center   w-20`}
            />

            <View style={tw`px-4 flex-row items-center gap-2`}>
              <Picker
                useSafeArea
                value={selectVenue}
                onChange={text => setSelectVenue(text)}
                renderInput={preps => {
                  return (
                    <TouchableOpacity
                      onPress={preps.onPress}
                      style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                      <Text
                        numberOfLines={1}
                        style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                        {selectVenue}
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
                renderCustomDialogHeader={preps => {
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
                          setSelectVenue('Select venue');
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
                    value: item?.name,
                  };
                })}
                pickerModalProps={{
                  overlayBackgroundColor: BaseColor,
                }}
              />
              <Picker
                useSafeArea
                value={selectEvent}
                onChange={text => setSelectEvent(text)}
                renderInput={preps => {
                  return (
                    <TouchableOpacity
                      onPress={preps.onPress}
                      style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                      <Text
                        numberOfLines={1}
                        style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                        {selectEvent}
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
                renderCustomDialogHeader={preps => {
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
                          setSelectEvent('Select event');
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
                    value: item?.name,
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
            value={lStorage?.getString('note')}
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
