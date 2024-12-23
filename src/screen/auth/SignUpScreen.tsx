import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {
  IconCloseGray,
  IconCompanyGray,
  IconEmailGay,
  IconEyeGray,
  IconLockGray,
  IconSearchGray,
  IconUserGray,
} from '../../icons/icons';
import {BaseColor, PrimaryColor} from '../../utils/utils';

import {Formik} from 'formik';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import countries from './countries.json';

interface ISingUpForm {
  email: string;
  fullname: string;
  password: string;
  phone: string;
}

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [phoneCode, setPhoneCode] = useState(null);
  const onSubmitHandler = (data: ISingUpForm) => {
    if (!data.phone.startsWith('+')) {
      data.phone = phoneCode + data.phone;
    }
    console.log(data);
    (navigation as any)?.replace('VerifyEmail');
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
            fullname: '',
            phone: '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {
              email?: string;
              fullname?: string;
              password?: string;

              phone?: string;
            } = {};

            if (!values.fullname) {
              errors.fullname = 'Required';
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
            if (!values.phone) {
              errors.phone = 'Required';
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
                  value={values.fullname}
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  placeholder="Enter your full name"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconUserGray}
                />

                {errors.fullname && touched.fullname && (
                  <Text style={tw`text-red-500`}>{errors.fullname}</Text>
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
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      placeholder="Enter your phone number"
                      keyboardType="decimal-pad"
                      containerStyle={tw`h-12 w-full border-l-0 rounded-l-none px-2 `}
                      // svgFirstIcon={IconPhoneGray}
                    />
                  </View>
                </View>

                {errors.phone && touched.phone && (
                  <Text style={tw`text-red-500`}>{errors.phone}</Text>
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
              <View style={tw`px-[4%] `}>
                <TouchableOpacity
                  style={tw` my-5 flex-row items-center `}
                  onPress={() => {
                    setCheck(!check);
                  }}>
                  <Checkbox
                    color={PrimaryColor}
                    size={25}
                    style={tw`border-2 border-[#E8E8EA]`}
                    value={check}
                    onValueChange={value => setCheck(value)}
                  />
                  <Text style={tw`ml-2  font-RobotoBold text-white400`}>
                    Keep me logged in
                  </Text>
                </TouchableOpacity>
                <TButton
                  disabled={
                    !values.email ||
                    !values.password ||
                    !values.fullname ||
                    !values.phone
                  }
                  onPress={() => {
                    handleSubmit();
                    // (navigation as any)?.replace('VerifyEmail');
                  }}
                  title="Sign Up"
                  containerStyle={tw`w-full h-12 py-0 items-center ${
                    !values.email ||
                    !values.password ||
                    !values.fullname ||
                    !values.phone
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
