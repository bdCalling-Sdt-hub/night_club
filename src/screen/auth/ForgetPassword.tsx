import React, {useCallback} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {IconEmailGay} from '../../icons/icons';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useFireAuth} from '../../firebase/useFireAuth';
import {useToast} from '../../components/modals/Toaster';

const ForgetPassword = ({navigation}: NavigProps<null>) => {
  const [email, setEmail] = React.useState('');
  const {closeToast, showToast} = useToast();
  const [loading, setLoading] = React.useState(false);
  const {handleResetPassword} = useFireAuth();

  const onSubmit = useCallback(async () => {
    // console.log(email);

    try {
      if (email) {
        handleResetPassword(email).then(res => {
          setLoading(false);
          (navigation as any)?.replace('SendMailSuccess');
        });

        // console.log(data);
      } else {
        setLoading(false);
        showToast({
          title: 'Warning',
          content: 'Please enter your email',
          onPress: closeToast,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [email]);

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
                  value={email}
                  onChangeText={text => setEmail(text)}
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
            onPress={onSubmit}
            isLoading={loading}
            title="Submit"
            containerStyle={tw`h-12 w-full bg-primary rounded-lg`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;
