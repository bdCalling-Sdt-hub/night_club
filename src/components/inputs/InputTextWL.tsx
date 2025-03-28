import {Text, TouchableOpacity, View} from 'react-native';
import {TextField, TextFieldProps} from 'react-native-ui-lib'; // Import the type for TextField props

import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

export interface InputTextProps
  extends Omit<TextFieldProps, 'containerStyle' | 'fieldStyle'> {
  onPress?: () => void;
  onSvgPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string | any;
  containerStyle?: any;
  fieldStyle?: any;
  Component?: React.ReactNode;
  Component2?: React.ReactNode;
  focusSTyle?: any;
  ref?: any;
  label?: string;
  labelStyle?: any;
  required?: boolean;
  errorText?: string;
  touched?: boolean;
}

const InputTextWL = ({
  onPress,
  onSvgPress,
  svgFirstIcon,
  svgSecondIcon,
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ref,
  label,
  errorText,
  required,
  touched,
  Component2,
  labelStyle,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);

  // console.log(touched);

  return (
    <View style={tw`gap-2`}>
      <Text
        style={[tw`text-white text-sm font-RobotoMedium px-[2%]`, labelStyle]}>
        {label} {required && <Text style={tw`text-red-500`}>*</Text>}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[
          tw` rounded-lg px-4 bg-secondary flex-row items-center gap-3 border border-[#D1D1D1]  h-14 `,
          containerStyle,
          focus && focusSTyle,
        ]}>
        {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
        <TextField
          ref={ref}
          placeholderTextColor={'#B0B0B0'}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          containerStyle={[tw`flex-1 h-full justify-center items-center`]}
          white
          fieldStyle={[
            tw`${inputProps?.floatingPlaceholder ? 'pb-4' : 'p-0'}`,
            fieldStyle,
          ]}
          {...inputProps} // Spread props here
        />
        {touched && errorText && (
          <Text style={tw`text-red-500 text-xs`}>{errorText}</Text>
        )}
        {Component && Component}
        {svgSecondIcon && (
          <TouchableOpacity onPress={onSvgPress}>
            <SvgXml xml={svgSecondIcon} />
          </TouchableOpacity>
        )}
        {Component2 && Component2}
      </TouchableOpacity>
    </View>
  );
};

export default InputTextWL;
