import {Text, TouchableOpacity, View} from 'react-native';
import {TextField, TextFieldProps} from 'react-native-ui-lib'; // Import the type for TextField props

import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface InputTextProps
  extends Omit<TextFieldProps, 'containerStyle' | 'fieldStyle'> {
  onPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string;
  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  focusSTyle?: any;
  ref?: any;
  label?: string;
}

const InputTextWL = ({
  onPress,
  svgFirstIcon,
  svgSecondIcon,
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ref,
  label,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <View style={tw`gap-2`}>
      <Text style={tw`text-white text-base font-RobotoMedium px-[2%]`}>
        {label}
      </Text>
      <View
        style={[
          tw`flex-1 rounded-2xl px-4 bg-secondary flex-row items-center gap-3 border border-[#D1D1D1]  h-14 `,
          containerStyle,
          focus && focusSTyle,
        ]}>
        {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
        <TextField
          ref={ref}
          placeholderTextColor={'#B0B0B0'}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          containerStyle={[tw`flex-1`]}
          white
          fieldStyle={[
            tw`${inputProps?.floatingPlaceholder ? 'pb-4' : 'p-0'}`,
            fieldStyle,
          ]}
          {...inputProps} // Spread props here
        />
        {Component && Component}
        {svgSecondIcon && (
          <TouchableOpacity onPress={onPress}>
            <SvgXml xml={svgSecondIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputTextWL;
