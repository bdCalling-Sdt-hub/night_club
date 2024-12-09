import {Text, TouchableOpacity, View} from 'react-native';

import {IconFillLove} from '../../icons/icons';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface SelectionCardProps {
  title?: string;
  subtitle?: string;
  price?: string;
  option?: string;
  onPress?: (option: string) => void;
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectionCard = ({
  subtitle,
  title,
  onPress,
  price,
  option,
  checked,
  setChecked,
}: SelectionCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        onPress && onPress(option || 'please give option');
        setChecked && setChecked(!checked);
      }}
      style={tw` rounded-2xl px-4 bg-white flex-row items-center justify-between gap-3 border ${
        checked ? 'border-primary' : 'border-[#D1D1D1]'
      }   h-16`}>
      <View style={tw`flex-row gap-3 items-center`}>
        <View
          style={tw`w-6 h-6 ${
            checked ? 'bg-primary' : 'bg-white'
          } rounded-full justify-center items-center border-2 border-gray-300`}>
          <View style={tw`w-3 h-3 bg-white rounded-full`} />
        </View>
        <View>
          <Text style={tw`text-white400 font-RobotoBold text-base`}>
            {title}
          </Text>
          <Text style={tw`text-black600 font-NunitoSansRegular text-xs`}>
            {subtitle}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row gap-2 items-center`}>
        <SvgXml xml={IconFillLove} />
        <Text style={tw`text-white400 font-RobotoBold text-base`}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectionCard;
