import {ScrollView, Text, View} from 'react-native';
import {IconEyeGray, IconLockGray} from '../../icons/icons';

import React from 'react';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';

const ResetPassword = ({navigation}: NavigProps<null>) => {
  const [showPass, setShowPass] = React.useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <View style={tw`bg-base flex-1`}>
      {/* <BackWithHeader navigation={navigation} title="OTP Verification" /> */}
      <ScrollView
        contentContainerStyle={tw`px-[4%] py-[50%] gap-5`}
        keyboardShouldPersistTaps="always">
        <View>
          <View style={tw`gap-2`}>
            <Text style={tw`text-2xl text-white200 font-RobotoBold`}>
              Reset a new password
            </Text>
            <Text style={tw`text-sm text-white400 font-RobotoBold`}>
              You have to create a new password after reset your password.
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
                  label="New Password"
                  onPress={() =>
                    setShowPass({...showPass, password: !showPass?.password})
                  }
                  //   value={showPass.password}
                  placeholder="Enter new Password"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  secureTextEntry={!showPass.password}
                  svgFirstIcon={IconLockGray}
                  svgSecondIcon={showPass ? IconEyeGray : IconEyeGray}
                />
              </View>
              <View style={tw` w-full`}>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Confirm Password"
                  onPress={() =>
                    setShowPass({
                      ...showPass,
                      confirmPassword: !showPass?.confirmPassword,
                    })
                  }
                  //   value={showPass.password}
                  placeholder="Enter confirm Password"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  secureTextEntry={!showPass.confirmPassword}
                  svgFirstIcon={IconLockGray}
                  svgSecondIcon={showPass ? IconEyeGray : IconEyeGray}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={tw` pt-6`}>
          <TButton
            onPress={() => (navigation as any)?.replace('Home')}
            isLoading={false}
            title="Submit"
            containerStyle={tw`h-12 w-full bg-primary rounded-lg`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
