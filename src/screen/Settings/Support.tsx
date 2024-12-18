import {ScrollView, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

const Support = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Support" onPress={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="always" style={tw`px-4 mb-6 mt-2`}>
        <InputTextWL
          label="Write support topic"
          placeholder="Enter support topic"
          multiline
          verticalAlign="top"
          // textAlign="center"
          textAlignVertical="top"
          numberOfLines={30}
          containerStyle={tw` h-[300px] pt-2 rounded-lg border-[1px] border-transparent`}
          focusSTyle={tw`border-primary`}
        />
      </ScrollView>
      <View style={tw`px-4 py-2`}>
        <TButton title="Send" />
      </View>
    </Background>
  );
};

export default Support;
