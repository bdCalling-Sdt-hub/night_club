import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {IconCleanGray, IconTimeGray} from '../../icons/icons';
import InputTextWL, {InputTextProps} from '../inputs/InputTextWL';

import React from 'react';
import {View} from 'react-native';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import IButton from '../buttons/IButton';

interface DateTimePickerProps extends InputTextProps {
  onClear?: () => void;
  getCurrentDate?: (value: string) => any;
  dateProps?: DatePickerProps;
}

const DateTimePicker = ({
  onClear,
  dateProps,
  getCurrentDate,
  ...props
}: DateTimePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View>
      <View>
        <InputTextWL
          cursorColor={PrimaryColor}
          editable={false}
          onPress={() => setOpen(!open)}
          onSvgPress={() => setOpen(!open)}
          containerStyle={tw`border-0 h-12 rounded-lg`}
          svgSecondIcon={!props?.value && IconTimeGray}
          Component2={
            <>
              {props?.value && (
                <IButton
                  onPress={onClear}
                  svg={IconCleanGray}
                  containerStyle={tw`p-0 h-12 w-12 bg-secondary absolute right-0 rounded-r-lg rounded-l-none   shadow-none`}
                />
              )}
            </>
          }
          {...props}
        />
      </View>
      <DatePicker
        style={tw`border-0 h-12 rounded-lg bg-transparent`}
        mode="time"
        modal
        theme="dark"
        dividerColor={PrimaryColor}
        buttonColor={PrimaryColor}
        open={open}
        date={new Date()}
        onConfirm={(currentData: any) => {
          if (currentData) {
            getCurrentDate && getCurrentDate(currentData?.toISOString());
            // Format the date with time, assuming you want to specify the time as well.
            // console.log(currentData.toISOString());
          }
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        {...dateProps}
      />
    </View>
  );
};

export default DateTimePicker;
