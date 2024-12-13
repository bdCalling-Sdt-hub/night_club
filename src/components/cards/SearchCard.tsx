import React from 'react';
import {View} from 'react-native';
import {IconSearchGray} from '../../icons/icons';
import tw from '../../lib/tailwind';
import InputText from '../inputs/InputText';

interface SearchCardProps {
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  search?: string;
  placeholder?: string;
  containerStyle?: any;
  fieldStyle?: any;
  focusSTyle?: any;
  Component?: React.ReactNode;
  ref?: any;
  label?: string;
  onPress?: () => void;
}

const SearchCard = ({search, setSearch}: SearchCardProps) => {
  return (
    <View style={tw`h-10  `}>
      <InputText
        svgFirstIcon={IconSearchGray}
        value={search}
        onChangeText={text => setSearch && setSearch(text)}
        placeholder="Search"
        containerStyle={tw` bg-secondary border-2 border-secondary rounded-lg`}
      />
    </View>
  );
};

export default SearchCard;
