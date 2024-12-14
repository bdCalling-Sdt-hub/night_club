import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind';

interface IButton {
  containerStyle?: {};
  titleStyle?: {};
  title?: string;
  isLoading?: boolean;
  onPress?: () => void;
  loadingColor?: string;
  disabled?: boolean;
}

const TButton = ({
  containerStyle,
  title,
  titleStyle,
  isLoading,
  onPress,
  loadingColor,
  disabled,
}: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.5}
      style={[
        tw`bg-[#003CFF] h-12 flex-row justify-center items-center gap-3 rounded-2xl shadow-md w-36 ${
          disabled ? 'opacity-60' : 'opacity-100'
        }`,
        containerStyle,
      ]}>
      {isLoading && (
        <ActivityIndicator color={loadingColor ? loadingColor : 'white'} />
      )}
      {title && (
        <Text style={[tw`text-white font-semibold text-sm`, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TButton;

const styles = StyleSheet.create({});
