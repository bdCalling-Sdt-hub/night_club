import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {IconEmailGay} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';

const ForgetPassword = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`bg-base flex-1`}>
      {/* <BackWithHeader navigation={navigation} title="OTP Verification" /> */}
      <ScrollView
        contentContainerStyle={tw`px-[4%] py-[50%] gap-5`}
        keyboardShouldPersistTaps="always">
        <View>
          <View style={tw`gap-2`}>
            <Text style={tw`text-2xl text-white200 font-RobotoBold`}>
              Forget password
            </Text>
            <Text style={tw`text-sm text-white400 font-RobotoBold`}>
              Enter your email, which was use to create nite account.
            </Text>
          </View>
          <View style={tw`gap-2 pt-8 `}>
            {/* <Text style={tw`text-sm text-white400 font-RobotoRegular`}>
            Enter the code
          </Text> */}
            <View style={tw` gap-3 my-2 justify-center`}>
              <View style={tw` w-full`}>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Email"
                  value={'arif@gmail.com'}
                  placeholder="Enter New Password"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  svgFirstIcon={IconEmailGay}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={tw` pt-6`}>
          <TButton
            onPress={() => (navigation as any)?.replace('ResetPassword')}
            isLoading={false}
            title="Submit"
            containerStyle={tw`h-12 w-full bg-primary rounded-lg`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;
