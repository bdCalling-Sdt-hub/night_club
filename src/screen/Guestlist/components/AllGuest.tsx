import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {IGuest, IGuestsList} from '../../../firebase/interface';
import {
  IconBigPlusCyan,
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
} from '../../../icons/icons';
import {BaseColor, PrimaryColor, height} from '../../../utils/utils';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import IButton from '../../../components/buttons/IButton';
import IwtButton from '../../../components/buttons/IwtButton';
import Or from '../../../components/buttons/Or';
import TButton from '../../../components/buttons/TButton';
import Card from '../../../components/cards/Card';
import EmptyCard from '../../../components/Empty/EmptyCard';
import NormalModal from '../../../components/modals/NormalModal';
import {loadAllData} from '../../../firebase/database/helper';
import tw from '../../../lib/tailwind';

interface Props {
  navigation: any;
}
const AllGuest = ({navigation}: Props) => {
  const [selectGuest, setSelectGuest] = React.useState([]);
  const [selectGuestList, setSelectGuestList] = React.useState<string>();
  const [addToGuests, setAddToGuests] = React.useState(false);

  const [guestListData, setGuestListData] = React.useState<Array<IGuest>>([]);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList>
  >([]);
  const [tag, setTag] = React.useState('Tags');
  React.useEffect(() => {
    //get all guest
    loadAllData({
      collectType: 'Guests',
      setLoad: setGuestListData,
    });
    //get all guest
  }, []);
  const tagsData = Array.from(
    new Set(guestListData?.map(guest => guest.tag)),
  ).map(tag => ({label: tag, value: tag}));
  return (
    <>
      <FlatList
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
                  value={tag}
                  onChange={text => setTag(text)}
                  renderInput={preps => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onPress}
                        style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                        <Text
                          numberOfLines={1}
                          style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                          {tag}
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
                            setTag('Tags');
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
                  items={tagsData}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
              </View>
            </View>
          );
        }}
        contentContainerStyle={tw`px-4 pt-2 pb-14 gap-3`}
        data={guestListData?.filter(item =>
          tag === 'Tags' ? item : item.tag === tag,
        )}
        ListEmptyComponent={
          <EmptyCard hight={height * 0.6} title="No Venues" />
        }
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              navigation?.navigate('GuestEdit', {guest: item});
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
                  value={selectGuest?.includes(item.id)}
                  onValueChange={() => {
                    if (selectGuest?.length > 0) {
                      if (selectGuest?.includes(item.id)) {
                        setSelectGuest(
                          selectGuest?.filter(i => i !== item?.id),
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
                  setSelectGuestList(item.id);
                }}
                style={tw`flex-row gap-3 items-center px-4 mb-4`}>
                <Checkbox
                  borderRadius={100}
                  size={15}
                  iconColor="#000000"
                  value={selectGuestList === item.id}
                  onValueChange={() => {
                    setSelectGuestList(item?.id);
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
