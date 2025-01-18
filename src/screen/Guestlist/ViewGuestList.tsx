import {BaseColor, height} from '../../utils/utils';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IEvent, IGuest} from '../../firebase/interface';
import {
  IconBigPlusCyan,
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
} from '../../icons/icons';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import Background from '../components/Background';
import Card from '../../components/cards/Card';
import EmptyCard from '../../components/Empty/EmptyCard';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import {NavigProps} from '../../interfaces/NaviProps';
import {Picker} from 'react-native-ui-lib';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import moment from 'moment';
import tw from '../../lib/tailwind';
import useFireStore from '../../firebase/database/helper';
import {useImportData} from '../../hook/useImportFIle';
import {useToast} from '../../components/modals/Toaster';

const ViewGuestList = ({navigation, route}: NavigProps<{item: IEvent}>) => {
  const {closeToast, showToast} = useToast();
  const [addedBy, setAddedBy] = React.useState('Added by');
  // const [tagsData, setTagsData] = React.useState<Array<ITags>>([]);
  const [tags, setTags] = React.useState('Tags');
  const [loading, setLoading] = React.useState(false);
  const [selectOption, setSelectOption] = React.useState('Upcoming Events');
  const [search, setSearch] = React.useState('');

  const {loadAllData, updateFireData, listenToData, loadSingleData} =
    useFireStore();

  const [guestListData, setGuestListData] = React.useState<Array<IGuest>>([]);

  const handleCheckIn = (guest: IGuest) => {
    updateFireData({
      id: guest.id,
      collectType: 'Guests',
      data: {
        check_in: guest?.check_in ? Number(guest.check_in) + 1 : 1,
      },
    });
    loadAllData({
      collectType: 'Guests',
      filters: [
        {
          field: 'event',
          operator: '==',
          value: route?.params?.item?.name,
        },
      ],
      setLoad: setGuestListData,
    });
  };

  React.useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function

    listenToData({
      unsubscribe,
      collectType: 'Guests',
      filters: [
        {
          field: 'event',
          operator: '==',
          value: route?.params?.item?.name,
        },
      ],
      onUpdate: (data: any[]) => {
        setGuestListData(data);
      },
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);
  const totalGuest = guestListData.reduce(
    (acc, guest) => acc + Number(guest.people),
    0,
  );
  const totoCheckIn = guestListData.reduce(
    (acc, guest) => acc + (guest?.check_in ? Number(guest.check_in) : 0),
    0,
  );

  const tagsData = Array.from(
    new Set(guestListData?.map(guest => guest.tag)),
  ).map(tag => ({label: tag, value: tag}));

  const addedByData = Array.from(
    new Set(guestListData?.map(guest => guest.added_by)),
  ).map(addedBy => ({label: addedBy, value: addedBy}));

  // console.log(addedByData);

  const handleImportData = async () => {
    try {
      const data = await useImportData();
      // console.log(data);
      data?.forEach((guest: IGuest) => {
        guest.event = route?.params?.item?.name;
        guest.venue = route?.params?.item?.venue;
        guest.event_date = route?.params?.item?.date;
        updateFireData({
          id: guest.id,
          collectType: 'Guests',
          data: guest,
        });
      });
    } catch (err: unknown) {
      // see error handling
    }
  };

  // console.log(guestListData);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        title="View Guest List "
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

      <View style={tw`px-4 mb-4 `}>
        <Text style={tw`text-white60 text-xs font-RobotoMedium`}>
          {route?.params?.item?.venue} {'>'} {route?.params?.item?.name} {'>'}{' '}
          {moment(route?.params?.item?.date).format('DD-MM-YYYY')}
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
            value={addedBy}
            onChange={text => setAddedBy(text as string)}
            renderInput={(preps: any) => {
              return (
                <TouchableOpacity
                  onPress={preps.onPress}
                  style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                  <Text
                    numberOfLines={1}
                    style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
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
            value={tags}
            onChange={text => setTags(text as any)}
            renderInput={(preps: any) => {
              return (
                <TouchableOpacity
                  onPress={preps.onPress}
                  style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                  <Text
                    numberOfLines={1}
                    style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                    {tags}
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
            items={tagsData}
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

      <FlatList
        contentContainerStyle={tw`px-4 pb-14 gap-3`}
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
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyCard hight={height * 0.6} title="No Venues" />
        }
        renderItem={({item, index}) => (
          <Card
            onPress={() => navigation.navigate('GuestDetails', {guest: item})}
            containerStyle={tw` flex-row gap-3 items-center`}
            component={
              <Card.Button
                onPress={() => handleCheckIn(item)}
                checkedIn={Number(item?.check_in || 0)}
                total={Number(item?.people)}
              />
            }>
            <Card.Details
              data={[
                {
                  title: item.fullName,
                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                {
                  title: item.free_entry_time
                    ? `Free entry start at ${moment(
                        item.free_entry_time,
                      ).format('hh:mm A')}`
                    : 'Paid',
                  titleStyle: tw`text-yellow-400 font-RobotoBold text-xs`,
                },
                {
                  title: `Guests ${
                    item?.check_in ? item?.check_in : 0
                  } out of ${item?.people} `,
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
