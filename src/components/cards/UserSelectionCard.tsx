import React, {SetStateAction} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Checkbox} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import tw from '../../lib/tailwind';

interface UserSelectionCardProps {
  item: any;
  selectionSate: any;
  multiple?: boolean;
  setSelectionSate: React.Dispatch<SetStateAction<any>>;
}

const UserSelectionCard = ({
  item,
  selectionSate,
  setSelectionSate,
  multiple,
}: UserSelectionCardProps) => {
  // console.log(item);

  let haveExit: any = null;

  if (multiple) {
    haveExit = selectionSate?.find((i: any) => i?.id === item?.id);
  }

  // console.log(haveExit);
  return (
    <TouchableOpacity
      onPress={() => {
        if (multiple) {
          if (haveExit?.id === item?.id) {
            const exitData = selectionSate.filter(
              (i: any) => i?.id !== item?.id,
            );
            setSelectionSate([...exitData]);
          } else {
            setSelectionSate([...selectionSate, item]);
          }
        } else {
          setSelectionSate(item);
        }
      }}
      activeOpacity={0.5}
      style={tw`flex-row items-center justify-between py-2 gap-3`}>
      <View style={tw`flex-row items-center gap-3`}>
        <Checkbox
          color="#4964C6"
          size={25}
          style={tw`border-2 border-[#E8E8EA]`}
          value={
            multiple
              ? haveExit?.id === item?.id
              : selectionSate?.id === item?.id
          }
          onValueChange={value => {
            if (multiple) {
              if (haveExit?.id === item?.id) {
                const exitData = selectionSate.filter(
                  (i: any) => i?.id !== item?.id,
                );
                setSelectionSate([...exitData]);
              } else {
                setSelectionSate([...selectionSate, item]);
              }
            } else {
              setSelectionSate(item);
            }
          }}
        />
        <Text>{item?.full_name}</Text>
      </View>
      <FastImage
        source={{uri: item?.image}}
        style={tw`w-12 h-12 rounded-2xl`}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

export default React.memo(UserSelectionCard);
