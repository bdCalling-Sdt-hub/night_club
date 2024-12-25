import {BaseColor, PrimaryColor} from '../../utils/utils';
import {
  IconCloseGray,
  IconCompanyGray,
  IconEmailGay,
  IconEyeGray,
  IconLockGray,
  IconSearchGray,
  IconUserGray,
} from '../../icons/icons';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Formik} from 'formik';
import {IUser} from '../../firebase/interface';
import InputText from '../../components/inputs/InputText';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {Picker} from 'react-native-ui-lib';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import countries from './countries.json';
import {createUser} from '../../firebase/database/user.doc';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';
import {useFireAuth} from '../../firebase/useFireAuth';
import {useToast} from '../../components/modals/Toaster';

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const {setUser, user, setUserId} = useAuth();
  const {SignUpWithEmailPass} = useFireAuth();
  const [loading, setLoading] = React.useState(false);

  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+46');
  const onSubmitHandler = async (data: IUser) => {
    if (!data.phoneNumber.startsWith('+')) {
      data.phoneNumber = phoneCode + data.phoneNumber;
    }

    // console.log(data);
    try {
      setLoading(true);
      // Sign up the user using your custom function
      const res = await SignUpWithEmailPass(data.email, data.password);
      if (res?.user?.uid) {
        data.role = 'super-owner';
        delete data.password;
        await createUser(res.user?.uid, data);
        // console.log('User created successfully in Firestore.');
      }
      if (res?.user?.email) {
        // Send email verification with handleCodeInApp

        const verification = await fetch(
          'https://send-verification-code-3heivjy47q-uc.a.run.app/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: data.email,
              uid: res.user.uid,
            }),
          },
        );

        const verificationResponse = await verification.json();

        console.log(verificationResponse);

        if (verificationResponse?.message) {
          setUserId(res.user.uid);
          // Optionally store the user locally
          // setUser(res.user);
          showToast({
            title: 'Please check your email',
            content: "We've sent a verification code to your email address.",
            onPress() {
              closeToast();
            },
          });

          // Navigate to an email verification screen
          (navigation as any)?.replace('VerifyEmail', {
            email: data.email,
          });
          setLoading(false);
        } else {
          setLoading(false);
          console.warn(
            'Error sending verification email:',
            verificationResponse,
          );
        }
      }
    } catch (error) {
      console.error('Error signing up or sending verification email:', error);
    }

    // (navigation as any)?.replace('VerifyEmail');
  };

  return (
    <View style={tw`bg-base h-full`}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-1 pb-5`}
        keyboardShouldPersistTaps="always">
        <View style={tw`px-[4%] mt-[15%]`}>
          <Text style={tw`text-3xl text-white font-RobotoBlack `}>
            Become a member
          </Text>
        </View>
        {/*================= login title and subtitle ================= */}
        <View style={tw`px-[4%] gap-3`}>
          <Text style={tw`text-[24px] text-white100 font-RobotoBlack `}>
            Sign Up.
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{
            email: '',
            password: '',
            company: '',
            displayName: '',
            phoneNumber: '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {
              email?: string;
              displayName?: string;
              password?: string;

              phoneNumber?: string;
            } = {};

            if (!values.displayName) {
              errors.displayName = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            }
            // check or validity of email
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.phoneNumber) {
              errors.phoneNumber = 'Required';
            }
            // check or validity of email
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            // check or validity of password 8 digit
            if (values.password.length < 8) {
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
              <View style={tw`px-[4%] mt-6 gap-1`}>
                {/*======================= email ======================== */}

                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Enter you email"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconEmailGay}
                />

                {errors.email && touched.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Full Name"
                  value={values.displayName}
                  onChangeText={handleChange('displayName')}
                  onBlur={handleBlur('displayName')}
                  placeholder="Enter your full name"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconUserGray}
                />

                {errors.displayName && touched.displayName && (
                  <Text style={tw`text-red-500`}>{errors.displayName}</Text>
                )}

                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Company Name, if applicable"
                  value={values.company}
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  placeholder="Enter your company name"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconCompanyGray}
                />

                <View>
                  <Text
                    style={tw`text-white100 font-RobotoMedium text-sm px-[2%]`}>
                    Phone
                  </Text>
                  <View style={tw`bg-base w-full my-2 flex-row items-end `}>
                    <Picker
                      useSafeArea
                      onChange={value => {
                        setPhoneCode(value);
                      }}
                      renderInput={() => (
                        <View
                          style={tw` w-16 h-12 bg-gray-500 bg-opacity-50  border border-[#D1D1D1] rounded-lg border-r-0 rounded-r-none`}>
                          <View
                            style={tw`flex-row items-center justify-center h-full gap-1 px-2`}>
                            <Text
                              style={tw`text-white100 font-RobotoMedium text-sm text-center`}>
                              {phoneCode || '+46'}
                            </Text>
                          </View>
                        </View>
                      )}
                      renderItem={(value, items, label) => {
                        return (
                          <View
                            // onPress={() => setValue(value)}
                            style={tw` py-2 mx-[4%] border-b border-b-gray-800 flex-row items-center  gap-3`}>
                            <Text
                              style={tw`text-white100 font-RobotoMedium text-lg`}>
                              {label + ' ' + value}
                            </Text>
                          </View>
                        );
                      }}
                      value={phoneCode || '+1'}
                      searchStyle={tw`bg-secondary h-12 `}
                      showSearch
                      onSearchChange={value => {}}
                      renderCustomSearch={preps => {
                        return (
                          <View style={tw`h-12  `}>
                            <InputText
                              cursorColor={PrimaryColor}
                              svgFirstIcon={IconSearchGray}
                              placeholderTextColor={'#B0B0B0'}
                              onChangeText={preps.onSearchChange}
                              placeholder="Search"
                              containerStyle={tw`h-12 w-full  border-0 rounded-none bg-base border-b border-gray-800`}
                            />
                          </View>
                        );
                      }}
                      renderCustomDialogHeader={preps => {
                        return (
                          <TouchableOpacity
                            onPress={preps.onCancel}
                            style={tw`self-start py-3 px-4`}>
                            <SvgXml
                              xml={IconCloseGray}
                              height={20}
                              width={20}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      fieldType={Picker.fieldTypes.filter}
                      paddingH
                      items={countries}
                      pickerModalProps={{
                        overlayBackgroundColor: BaseColor,
                      }}
                    />

                    <InputText
                      cursorColor={PrimaryColor}
                      label="Phone"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      placeholder="Enter your phone number"
                      keyboardType="decimal-pad"
                      containerStyle={tw`h-12 w-full border-l-0 rounded-l-none px-2 `}
                      // svgFirstIcon={IconPhoneGray}
                    />
                  </View>
                </View>

                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={tw`text-red-500`}>{errors.phoneNumber}</Text>
                )}

                {/*================== password =================== */}
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onSvgPress={() => setShowPass(!showPass)}
                  placeholder="Enter Your Password"
                  containerStyle={tw`h-12`}
                  secureTextEntry={!showPass}
                  svgFirstIcon={IconLockGray}
                  svgSecondIcon={showPass ? IconEyeGray : IconEyeGray}
                />
                {errors.password && touched.password && (
                  <Text style={tw`text-red-500`}>{errors.password}</Text>
                )}
              </View>

              {/* check box the Keep me logged In */}
              <View style={tw`px-[4%] mt-5`}>
                <TButton
                  isLoading={loading}
                  disabled={
                    !values.email ||
                    !values.password ||
                    !values.displayName ||
                    !values.phoneNumber
                  }
                  onPress={() => {
                    handleSubmit();
                    // (navigation as any)?.replace('VerifyEmail');
                  }}
                  title="Sign Up"
                  containerStyle={tw`w-full h-12 py-0 items-center ${
                    !values.email ||
                    !values.password ||
                    !values.displayName ||
                    !values.phoneNumber
                      ? 'bg-gray-500'
                      : 'bg-primary'
                  } text-lg `}
                  titleStyle={tw`text-white font-RobotoMedium `}
                />
              </View>
            </>
          )}
        </Formik>

        {/* Sing up and  Forgot password? */}
        {/* <View style={tw`items-center gap-2 mt-6 px-4`}>
          <TouchableOpacity
            style={tw`self-end`}
            onPress={() => (navigation as any)?.replace('Forget')}>
            <Text style={tw`text-primary font-RobotoBold text-right`}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={tw`flex-row justify-center mt-12 `}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-white400 font-NunitoSansLight`}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-primary font-NunitoSansLight`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
