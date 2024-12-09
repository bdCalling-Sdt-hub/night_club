import React from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import tw from '../../lib/tailwind';
import NormalModal from './NormalModal';

interface DateModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate?: React.Dispatch<React.SetStateAction<Date>>;
}

const DateModal = ({setVisible, visible, selectedDate}: DateModalProps) => {
  const [selectDate, setSelectDate] = React.useState(new Date());
  return (
    <>
      <NormalModal
        animationType="fade"
        visible={visible}
        setVisible={setVisible}
        layerContainerStyle={tw`justify-center items-center flex-1 px-[4%] `}
        containerStyle={tw`rounded-2xl`}>
        <DateTimePicker
          mode="single"
          date={selectDate}
          onChange={(params: any) => {
            selectedDate && selectedDate(params.date);
            setSelectDate(params.date);
            setVisible(false);
          }}
        />
      </NormalModal>
    </>
  );
};

export default DateModal;
