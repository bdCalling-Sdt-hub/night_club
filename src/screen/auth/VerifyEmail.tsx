import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import {FieldValue} from '@react-native-firebase/firestore';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import tw from '../../lib/tailwind';
import {useToast} from '../../components/modals/Toaster';
import {usersCollection} from '../../firebase/database/collections';

const VerifyEmail = ({
  navigation,
  route,
}: NavigProps<{email: string; forget?: boolean}>) => {
  const {closeToast, showToast} = useToast();
  // Use React state with correct typing for OTP (array of strings)
  const [otp, setOtp] = React.useState<string[]>(['', '', '', '']);
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Function to handle text change with correct typing for value and index

  //   console.log(otp);
  const handleChange = (value: string, index: number) => {
    // Update OTP state with correct typing
    // console.log(value, index);
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // Move to the next input if value is entered
    if (value && index <= otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // if (value && index) {
    //   // console.log(value);
    // }

    // Move to the previous input if value is deleted
  };

  // Function to handle key press with correct typing for the event and index
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
    if (otp[index] !== '' && event.nativeEvent.key !== 'Backspace') {
      const otpCopy = [...otp];
      otpCopy[index] = event.nativeEvent.key;
      setOtp(otpCopy);
      inputRefs.current[index + 1]?.focus();
    }
  };

  React.useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleUserVerification = async () => {
    // console.log(otp.join(''));wait userRef.where("email", "==", email).get();
    try {
      setLoading(true);
      const userSnapshot = (
        await usersCollection.where('email', '==', route?.params.email).get()
      ).docs[0];

      if (userSnapshot) {
        const user = userSnapshot.data();

        if (user?.verify_code == otp.join('')) {
          await userSnapshot.ref.update({
            verify_code: FieldValue.delete(),
            emailVerified: true,
          });
          setOtp(['', '', '', '']);
          if (route?.params.forget) {
            setLoading(false);
            navigation.navigate('ResetPassword', {
              email: route?.params.email,
            });
          } else {
            setLoading(false);
            navigation.navigate('VerifySuccess');
          }
        } else {
          showToast({
            title: 'Wrong',
            content: 'Your entered OTP is incorrect.\n Please try again.',
            onPress() {
              setLoading(false);
              closeToast();
            },
          });
        }
      } else {
        setLoading(false);
        showToast({
          title: 'Error',
          content: 'User not found.',
          onPress() {
            closeToast();
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (otp[3] !== '') {
      handleUserVerification();

      // (navigation as any)?.replace('VerifySuccess');
    }
  }, [otp]);

  return (
    <View style={tw`bg-base flex-1`}>
      {/* <BackWithHeader navigation={navigation} title="OTP Verification" /> */}
      <ScrollView
        contentContainerStyle={tw`px-[4%] py-[50%] gap-5`}
        keyboardShouldPersistTaps="always">
        <View>
          <View style={tw`gap-2`}>
            <Text style={tw`text-2xl text-white200 font-RobotoBold`}>
              Verify email
            </Text>
            <Text style={tw`text-sm text-white400 font-RobotoBold`}>
              Check your email account for the 4 digit code.
            </Text>
          </View>
          <View style={tw`gap-2 pt-8 `}>
            {/* <Text style={tw`text-sm text-white400 font-RobotoRegular`}>
              Enter the code
            </Text> */}
            <View style={tw`flex-row gap-3 my-2 justify-center`}>
              {otp.map((digit, index) => (
                <View
                  key={index}
                  style={tw`w-14 h-14 rounded-2xl border  justify-center items-center `}>
                  <TextInput
                    ref={el => (inputRefs.current[index] = el)}
                    value={digit}
                    editable={!loading}
                    onChangeText={value => {
                      // Validate the input to allow only numbers
                      if (/^\d*$/.test(value)) {
                        handleChange(value, index);
                      }
                    }}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    focusable
                    style={tw`text-center font-RobotoBlack text-[34px] m-0 p-0 w-full text-white bg-secondary h-full rounded-lg`}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* <TouchableOpacity style={tw`flex-row items-center`}>
          <Text style={tw`text-white400 font-NunitoSansRegular`}>
            Didn’t receive the code?
          </Text>
          <Text
            onPress={() => (navigation as any)?.replace('Login')}
            style={tw`text-primary font-RobotoBlack`}>
            {' '}
            Send again
          </Text>
        </TouchableOpacity> */}
        {/* <View style={tw` pt-6`}>
          <TButton
            onPress={() => (navigation as any)?.replace('VerifySuccess')}
            isLoading={false}
            title="Submit"
            containerStyle={tw`h-12 w-full bg-primary rounded-lg`}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default VerifyEmail;
