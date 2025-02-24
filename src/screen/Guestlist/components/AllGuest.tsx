import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {IGuest, IGuestsList, ITags} from '../../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
} from '../../../icons/icons';
import {BaseColor, PrimaryColor, height} from '../../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import IwtButton from '../../../components/buttons/IwtButton';
import Or from '../../../components/buttons/Or';
import TButton from '../../../components/buttons/TButton';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import NormalModal from '../../../components/modals/NormalModal';
import {useAuth} from '../../../context/AuthProvider';
import useFireStore from '../../../firebase/database/helper';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
  search: string;
}
const AllGuest = ({navigation, search}: Props) => {
  const [selectGuest, setSelectGuest] = React.useState<any>([]);
  const [selectGuestList, setSelectGuestList] = React.useState<
    [string] | [] | null
  >(null);
  const [addToGuests, setAddToGuests] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {user} = useAuth();

  const [guestListData, setGuestListData] = React.useState<Array<IGuest>>([]);
  const [TagsData, setTagsData] = React.useState<Array<ITags>>([]);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);

  const isFocused = useIsFocused();

  // console.log(guestListData);

  const [tag, setTag] = React.useState('Tags');
  const {updateFireData} = useFireStore();

  const fetchGuestsList = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore()
        .collection('GuestsList')
        .where('createdBy', '==', user?.user_id)
        .get();

      const guestListData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuestListAvailable(guestListData);
    } catch (error) {
      console.error('Error fetching GuestsList:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchGuestsList();
  }, [isFocused]);

  const fetchTags = async () => {
    setLoading(true);
    try {
      // Build the Firestore query
      let query = firestore().collection('Tags');

      if (user?.role === 'super-owner') {
        query = query.where('super_owner_id', '==', user?.user_id);
      } else {
        query = query.where('super_owner_id', '==', user?.super_owner_id);
      }

      // if (
      //   user?.role === 'guard' ||
      //   user?.role === 'promoters' ||
      //   user?.role === 'manager'
      // ) {
      //   const managerId =
      //     user?.role === 'manager' ? user?.user_id : user?.manager_id;
      //   query = query.where('manager_id', '==', managerId);
      // }

      // Subscribe to real-time updates
      query.onSnapshot(
        snapshot => {
          const tagsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTagsData(tagsData);
          setLoading(false);
        },
        error => {
          console.error('Error fetching Tags in real-time:', error);
          setLoading(false);
        },
      );
    } catch (error) {
      console.error('Error fetching Tags:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTags();
  }, [isFocused]);

  const fetchGuests = () => {
    setLoading(true);
    const query = firestore()
      .collection('Guests')
      .where('createdBy', '==', user?.user_id)
      .orderBy('updatedAt', 'desc'); // Sort by updatedAt, most recent first

    const unsubscribe = query.onSnapshot(
      snapshot => {
        const guestListData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuestListData(guestListData);
        setLoading(false);
      },
      error => {
        console.error('Error fetching Guests:', error);
        setLoading(false);
      },
    );

    return unsubscribe; // Return the unsubscribe function for cleanup
  };

  React.useEffect(() => {
    setLoading(true);
    fetchGuests();
    return () => {};
  }, [isFocused]);

  const handleAddGuestOnGuestList = async () => {
    // Loop through the selected guests
    selectGuest?.forEach(async (id: string) => {
      // Get the current guest data to access the existing guest_list
      const guestRef = firestore().collection('Guests').doc(id);
      const guestDoc = await guestRef.get();

      if (guestDoc.exists) {
        const guestData = guestDoc.data();
        const currentGuestList = guestData?.guest_list || []; // Get the current guest_list (or an empty array if not found)

        // Combine the current guest list with the new selected guests
        const updatedGuestList = [
          ...new Set([...currentGuestList, ...selectGuestList]),
        ]; // Use Set to avoid duplicates

        // Update the guest document with the new guest_list
        await guestRef.update({
          guest_list: updatedGuestList,
        });

        console.log(
          `Updated guest ${id} with new guest_list:`,
          updatedGuestList,
        );
      } else {
        console.error('Guest not found:', id);
      }
    });

    // Reset the state
    setAddToGuests(false);
    setSelectGuest([]);
    setSelectGuestList('');
  };

  // console.log(tag);

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={false}
            progressBackgroundColor={PrimaryColor}
            colors={['white']}
            onRefresh={() => {
              fetchGuests();
              fetchTags();
            }}
          />
        }
        ListEmptyComponent={
          <EmptyCard
            isLoading={loading}
            hight={height * 0.6}
            title="No Guests"
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <View
              style={tw`mt-4 mb-2 flex-row bg-secondary60 h-10  rounded-lg items-center justify-between gap-1`}>
              <IwtButton
                title="Filter"
                svg={IconFilterGray}
                containerStyle={tw`p-0 bg-transparent items-center   w-20`}
              />

              <View style={tw`px-1 flex-row items-center gap-2`}>
                <Picker
                  useSafeArea
                  listProps={{
                    ListEmptyComponent: (
                      <EmptyCard
                        title="No Tags"
                        isLoading={loading}
                        hight={height * 0.8}
                      />
                    ),
                  }}
                  value={tag}
                  onChange={(text: any) => setTag(text)}
                  renderInput={(preps: any) => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                        <Text
                          numberOfLines={1}
                          style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                          {TagsData?.find(item => item?.id === tag)?.name ??
                            'Tags'}
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
                            setTag('Tags');
                            preps?.onCancel();
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
                  items={TagsData?.filter(item => item?.id && item?.name).map(
                    item => {
                      return {
                        label: item.name as string,
                        value: item.id as string,
                      };
                    },
                  )}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
              </View>
            </View>
          );
        }}
        contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
        data={guestListData
          ?.filter(item =>
            item.fullName.toLowerCase().includes(search.toLowerCase()),
          )
          ?.filter(item => (tag === 'Tags' ? item : item.tag === tag))}
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              navigation?.navigate('GuestEdit', {guest: item});
            }}
            containerStyle={tw` flex-row gap-3 items-center`}
            layoutStyle={tw`gap-2`}
            OuterComponent={
              <>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    if (selectGuest?.length > 0) {
                      if (selectGuest?.includes(item.id)) {
                        setSelectGuest(
                          selectGuest?.filter((i: string) => i !== item?.id),
                        );
                      } else {
                        setSelectGuest([...selectGuest, item?.id]);
                      }
                    } else {
                      setSelectGuest([item?.id]);
                    }
                  }}
                  style={tw`px-2 rounded-md bg-secondary py-2 items-center justify-center`}>
                  <Checkbox
                    containerStyle={tw`justify-center items-center`}
                    borderRadius={2}
                    size={16}
                    // iconColor="#000000"
                    value={selectGuest?.includes(item.id)}
                    onValueChange={() => {
                      if (selectGuest?.length > 0) {
                        if (selectGuest?.includes(item.id)) {
                          setSelectGuest(
                            selectGuest?.filter((i: string) => i !== item?.id),
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
                </TouchableOpacity>
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
                  title: item?.tag_name,
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
              ]}
            />
          </Card>
        )}
      />
      {selectGuest?.length > 0 && (
        <TButton
          title="Add To Guest List"
          containerStyle={tw`my-4 w-[90%] self-center h-10 rounded-lg bg-primary`}
          titleStyle={tw`text-white50 font-RobotoBold text-sm`}
          onPress={() => {
            setAddToGuests(true);
          }}
          isLoading={false}
        />
      )}

      <NormalModal
        // scrollable
        layerContainerStyle={tw`flex-1 my-3`}
        containerStyle={tw`w-[85%] `}
        visible={addToGuests}
        setVisible={setAddToGuests}>
        <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
          <Text style={tw`text-white60 font-RobotoBold text-base`}>
            Selected guestlists
          </Text>
        </View>
        <ScrollView style={tw`h-[60%]`}>
          {guestListAvailable?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Toggle the selected ID in the selectGuestList array
                  if (selectGuestList?.includes(item.id)) {
                    setSelectGuestList(
                      selectGuestList.filter((i: string) => i !== item.id),
                    ); // Remove if already selected
                  } else {
                    setSelectGuestList([...selectGuestList, item.id]); // Add if not selected
                  }
                }}
                style={tw`flex-row gap-3 items-center px-4 pb-4`}>
                <Checkbox
                  borderRadius={100}
                  size={16}
                  iconColor="#000000"
                  value={selectGuestList?.includes(item.id)} // Check if the ID is in selectGuestList
                  onValueChange={() => {
                    // Toggle the selected ID in the selectGuestList array
                    if (selectGuestList?.includes(item.id)) {
                      setSelectGuestList(
                        selectGuestList?.filter((i: string) => i !== item.id),
                      ); // Remove if already selected
                    } else {
                      setSelectGuestList([...selectGuestList, item.id]); // Add if not selected
                    }
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
        </ScrollView>
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
            disabled={selectGuestList?.length > 0 ? false : true}
            onPress={() => {
              // setAddToGuests(false);
              handleAddGuestOnGuestList();
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
