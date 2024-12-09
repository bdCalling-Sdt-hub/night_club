import {TextField, TextFieldProps} from 'react-native-ui-lib'; // Import the type for TextField props
import {TouchableOpacity, View} from 'react-native';

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
}

const InputText = ({
  onPress,
  svgFirstIcon,
  svgSecondIcon,
  containerStyle,
  fieldStyle,
  focusSTyle,
  Component,
  ref,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  const [focus, setFocus] = React.useState(false);
  return (
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
  );
};

export default InputText;
