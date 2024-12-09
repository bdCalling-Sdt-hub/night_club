import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  IconBell,
  IconBellWithDot,
  IconClose,
  IconMenu,
  IconSearch,
  IconVThreeDots,
} from '../../icons/icons';

import {DrawerActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import IButton from '../buttons/IButton';
import InputText from '../inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import NormalModal from '../modals/NormalModal';
import React from 'react';
import SearchCard from '../cards/SearchCard';
import {SvgXml} from 'react-native-svg';
import searchResults from '../../assets/database/search.json';
import tw from '../../lib/tailwind';
import {useGetNotificationsQuery} from '../../redux/apiSlices/notificaiton';

interface ILogoWithHeader extends NavigProps<null> {
  onPressMenu?: () => void;
  searchOffItem?: {
    offPost?: boolean;
    offProduct?: boolean;
    offPeople?: boolean;
  };
  offSearch?: boolean;
  offMenu?: boolean;
  onFinish?: (text: string) => void;
  searchValue?: string;
  offHambar?: boolean;
  onPressHambar?: () => void;
}

const LogoWithHeader = ({
  navigation,
  onPressMenu,
  searchOffItem,
  offMenu,
  onFinish,
  offSearch,
  searchValue,
  offHambar,
  onPressHambar,
}: ILogoWithHeader) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const {data} = useGetNotificationsQuery({});

  const haveNotification = data?.data?.some(n => n.read_at === null);

  return (
    <View style={tw`px-[4%] flex-row justify-between items-center bg-white`}>
      {/*============== image or logo==================  */}
      <View style={tw`py-4 flex-row items-center gap-2`}>
        <FastImage
          style={tw`h-10 aspect-square`}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../assets/images/logo/logo.png')}
        />
        <Text style={tw`text-2xl font-RobotoBlack text-primary`}>Choozy</Text>
      </View>
      <View style={tw`flex-row gap-3`}>
        {!offSearch && (
          <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
            svg={IconSearch}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        )}
        <IButton
          onPress={() => navigation?.navigate('Notification')}
          svg={haveNotification ? IconBellWithDot : IconBell}
          containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
        />
        {!offMenu && (
          <IButton
            onPress={onPressMenu}
            svg={IconVThreeDots}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        )}
        {!offHambar && (
          <IButton
            onPress={() => {
              navigation?.dispatch(DrawerActions.openDrawer());
            }}
            svg={IconMenu}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        )}
      </View>
      <NormalModal
        animationType="fade"
        containerStyle={tw`w-full rounded-none`}
        setVisible={setSearchVisible}
        layerContainerStyle={tw`justify-start items-start flex-1 `}
        visible={searchVisible}>
        {/*=========== search here =========== */}
        <View style={tw`flex-row items-center py-2 gap-3`}>
          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <InputText
            containerStyle={tw`w-full border-2 border-transparent bg-black50 `}
            placeholder="Search"
            defaultValue={searchValue}
            onChangeText={text => {
              setSearchText(text);
            }}
            focusSTyle={tw`border-[#B3C5FF] border-2`}
            returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
            onSubmitEditing={e => {
              onFinish && onFinish(e.nativeEvent.text);
              setSearchVisible(!searchVisible);
            }}
            svgFirstIcon={IconSearch}
          />
          <IButton
            onPress={() => {
              onFinish && onFinish(searchText);
              setSearchVisible(!searchVisible);
            }}
            svg={IconSearch}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          {/* <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
            svg={IconMenu}
            
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          /> */}
        </View>
        {/*============= results here =================*/}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pt-2 `}
          data={searchResults}
          renderItem={({item}) => (
            <>
              <SearchCard
                item={item}
                offPost={searchOffItem?.offPost}
                offProduct={searchOffItem?.offProduct}
                offPeople={searchOffItem?.offPeople}
              />
            </>
          )}
        />
      </NormalModal>
    </View>
  );
};

export default LogoWithHeader;
