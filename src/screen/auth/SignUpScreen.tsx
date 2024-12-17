import {BaseColor, PrimaryColor} from '../../utils/utils';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {
  IconCloseGray,
  IconCompanyGray,
  IconDownArrayGray,
  IconEmailGay,
  IconEyeGray,
  IconLockGray,
  IconPhoneGray,
  IconUserGray,
} from '../../icons/icons';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Formik} from 'formik';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

interface ISingUpForm {
  company: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
}

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Yes');
  const onSubmitHandler = (data: ISingUpForm) => {
    console.log(data);
    navigation?.navigate('VerifyEmail');
  };
  const [items, setItems] = useState([
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ]);
  return (
    <View style={tw`bg-base h-full`}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-1 pb-5`}
        keyboardShouldPersistTaps="always">
        <View style={tw`px-[4%] mt-[15%]`}>
          <Text style={tw`text-3xl text-white font-RobotoBlack `}>
            Welcome back!
          </Text>
        </View>
        {/*================= login title and subtitle ================= */}
        <View style={tw`px-[4%] gap-3`}>
          <Text style={tw`text-[24px] text-white100 font-RobotoBlack `}>
            Sing Up.
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
              company?: string;
              phone?: string;
            } = {};
            if (!values.company) {
              errors.company = 'Required';
            }
            if (!values.fullname) {
              errors.fullname = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
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
            // check or validity of password 6 digit
            if (values.password.length < 6) {
              errors.password = 'Password must be at least 6 characters';
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
                  label="Company Name"
                  value={values.company}
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  placeholder="Enter your company name"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconCompanyGray}
                />
                {errors.company && touched.company && (
                  <Text style={tw`text-red-500`}>{errors.company}</Text>
                )}

                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Phone"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="phone"
                  keyboardType="decimal-pad"
                  containerStyle={tw`h-12`}
                  svgFirstIcon={IconPhoneGray}
                />

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
                  onPress={() => setShowPass(!showPass)}
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

              <View style={tw`bg-base px-[4%]`}>
                <Picker
                  onChange={value => {
                    setValue(value as string);
                  }}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={value}
                      onPress={() => {
                        setOpen(true);
                      }}
                      label="Are you interested in a free onboarding call?"
                      placeholder="Yes"
                      containerStyle={tw`h-12`}
                      svgSecondIcon={IconDownArrayGray}
                    />
                  )}
                  renderItem={(value, items) => {
                    return (
                      <View
                        // onPress={() => setValue(value)}
                        style={tw` py-2 mx-[4%] border-b border-b-gray-800`}>
                        <Text
                          style={tw`text-white100 font-RobotoMedium text-lg`}>
                          {value}
                        </Text>
                      </View>
                    );
                  }}
                  renderCustomDialogHeader={preps => {
                    return (
                      <TouchableOpacity
                        onPress={preps.onCancel}
                        style={tw`self-start py-3 px-4`}>
                        <SvgXml xml={IconCloseGray} height={20} width={20} />
                      </TouchableOpacity>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={items}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
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
                  onPress={() => {
                    // handleSubmit
                    navigation?.navigate('VerifyEmail');
                  }}
                  title="Sign Up"
                  containerStyle={tw`w-full h-12 py-0 items-center bg-primary text-lg `}
                  titleStyle={tw`text-white font-RobotoMedium`}
                />
              </View>
            </>
          )}
        </Formik>

        {/* Sing up and  Forgot password? */}
        {/* <View style={tw`items-center gap-2 mt-6 px-4`}>
          <TouchableOpacity
            style={tw`self-end`}
            onPress={() => navigation?.navigate('Forget')}>
            <Text style={tw`text-primary font-RobotoBold text-right`}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={tw`flex-row justify-center mt-12 `}>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-white400 font-NunitoSansLight`}>
              Already have an account?{' '}
            </Text>
            <Text
              onPress={() => navigation?.navigate('Login')}
              style={tw`text-primary font-NunitoSansLight`}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
