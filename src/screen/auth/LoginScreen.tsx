import {
  IconEmailGay,
  IconEyeCloseGray,
  IconEyeGray,
  IconLockGray,
} from '../../icons/icons';
import {PrimaryColor, lStorage} from '../../utils/utils';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import Background from '../components/Background';
import {Checkbox} from 'react-native-ui-lib';
import {Formik} from 'formik';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';
import {useFireAuth} from '../../firebase/useFireAuth';
import {useToast} from '../../components/modals/Toaster';

interface ISingInForm {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: NavigProps<any>) => {
  const {closeToast, showToast} = useToast();
  const {SignInWithEmailPass, handleResetPassword, handleVerifyEmail} =
    useFireAuth();
  const {userId, setUserId, setUser} = useAuth();
  const [check, setCheck] = React.useState(lStorage.getBool('check') || false);
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (data: ISingInForm) => {
    try {
      setLoading(true);

      SignInWithEmailPass(data.email, data.password)
        .then(res => {
          if (res.user.emailVerified) {
            setUserId(res.user.uid);
            res?.user?.getIdTokenResult().then(idTokenResult => {
              idTokenResult?.claims &&
                setUser({
                  ...idTokenResult.claims,
                  photoURL: res.user.photoURL,
                } as any);
              setLoading(false);
              (navigation as any)?.replace('Home');
            });
          } else {
            setLoading(false);
            showToast({
              title: 'Email not verified',
              content: 'Please verify your email before logging in.',
              multipleBTNStyle: tw`flex-col gap-3`,
              multipleButton: [
                {
                  buttonText: 'Resend',
                  onPress: () => {
                    handleVerifyEmail(data).then(res => {
                      // closeToast();

                      console.log(res);

                      if (res.success) {
                        showToast({
                          title: 'Success',
                          content: res.message,
                          onPress: closeToast,
                        });
                      } else {
                        showToast({
                          title: 'Warning',
                          content: res.message,
                          onPress: closeToast,
                        });
                      }
                    });
                  },
                },
                {
                  buttonText: 'Cancel',
                  onPress: () => {
                    closeToast();
                  },
                },
              ],
            });
          }
        })
        .catch(error => {
          // console.log(error);
          setLoading(false);
          if (error.code === 'auth/invalid-email') {
            showToast({
              title: 'Invalid Email',
              content: 'That email address is invalid!',
              onPress() {
                closeToast();
              },
            });
          }
          if (error.code === 'auth/invalid-credential') {
            showToast({
              title: 'Invalid Credential',
              content: 'The supplied credential is invalid.',
              onPress() {
                closeToast();
              },
            });
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // (navigation as any)?.replace('Home');
  };

  console.log(userId);

  return (
    <Background style={tw`bg-base h-full`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-5 py-12`}
        keyboardShouldPersistTaps="always">
        <View style={tw`px-[4%] mt-[15%]`}>
          <Text style={tw`text-3xl text-white font-RobotoBlack `}>
            Welcome to Nite
            {/* 🌙 */}
          </Text>
        </View>
        {/*================= login title and subtitle ================= */}
        <View style={tw`px-[4%] gap-3`}>
          <Text style={tw`text-[24px] text-white100 font-RobotoBlack `}>
            Log In.
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{
            email: lStorage.getString('email') || '',
            password: lStorage.getString('password') || '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {email?: string; password?: string} = {};
            if (!values.email) {
              errors.email = 'Required';
            }
            // check or validity of email
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            // check or validity of password 6 digit
            if (values.password.length < 6) {
              errors.password = 'Password must be at least 8 characters';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <View style={tw`px-[4%]  gap-1`}>
                {/*======================= email ======================== */}
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Email"
                  value={values.email}
                  onChangeText={(text: string) => {
                    handleChange('email')(text);
                    check && lStorage.setString('email', text);
                  }}
                  onBlur={handleBlur('email')}
                  placeholder="Enter your email"
                  defaultValue={lStorage.getString('email') || ''}
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  svgFirstIcon={IconEmailGay}
                />

                {errors.email && touched.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                {/*================== password =================== */}
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Password"
                  onSvgPress={() => setShowPass(!showPass)}
                  value={values.password}
                  onChangeText={(text: string) => {
                    handleChange('password')(text);
                    check && lStorage.setString('password', text);
                  }}
                  onBlur={handleBlur('password')}
                  placeholder="Enter your password"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  secureTextEntry={!showPass}
                  svgFirstIcon={IconLockGray}
                  svgSecondIcon={showPass ? IconEyeCloseGray : IconEyeGray}
                />

                {errors.password && touched.password && (
                  <Text style={tw`text-red-500`}>{errors.password}</Text>
                )}
              </View>
              {/* check box the Keep me logged In */}
              <View style={tw`px-[4%] `}>
                <TouchableOpacity
                  style={tw` my-5 flex-row items-center `}
                  onPress={() => {
                    setCheck(!check);
                    lStorage.setBool('check', check ? false : true);
                    lStorage.setString('email', values.email);
                    lStorage.setString('password', values.password);
                  }}>
                  <Checkbox
                    color={PrimaryColor}
                    size={25}
                    style={tw`border-2 border-[#E8E8EA]`}
                    value={check}
                    onValueChange={value => {
                      setCheck(value);
                      lStorage.setBool('check', value ? true : false);
                      lStorage.setString('email', values.email);
                      lStorage.setString('password', values.password);
                    }}
                  />
                  <Text style={tw`ml-2  font-RobotoBold text-black60`}>
                    Keep me logged in
                  </Text>
                </TouchableOpacity>
                <TButton
                  isLoading={loading}
                  onPress={() => {
                    handleSubmit();
                    // (navigation as any)?.replace('Home');
                  }}
                  title="Log in"
                  containerStyle={tw`w-full  h-12 items-center py-0 mt-3 rounded-lg bg-primary text-lg `}
                  titleStyle={tw`text-white font-RobotoMedium`}
                />
              </View>
            </>
          )}
        </Formik>

        {/* Sing up and  Forgot password? */}
        <View style={tw`items-center gap-2 mt-6 px-4`}>
          <TouchableOpacity
            style={tw`self-end`}
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
            <Text style={tw`text-primary font-RobotoBold text-right`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center mt-12 `}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-black60 font-NunitoSansLight`}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity
              style={tw`py-3 px-1 `}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw`text-primary font-RobotoBold text-base`}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default LoginScreen;
