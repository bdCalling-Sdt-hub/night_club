import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconEmailGay, IconEyeGray, IconLockGray} from '../../icons/icons';

import {Formik} from 'formik';
import React from 'react';
import {Checkbox} from 'react-native-ui-lib';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';

interface ISingInForm {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: NavigProps<null>) => {
  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const onSubmitHandler = (data: ISingInForm) => {
    console.log(data);
    navigation?.navigate('HomeRoutes');
  };

  return (
    <Background style={tw`bg-base h-full`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-5 py-12`}
        keyboardShouldPersistTaps="always">
        <View style={tw`px-[4%] mt-[15%]`}>
          <Text style={tw`text-3xl text-white font-RobotoBlack `}>
            Welcome back!
          </Text>
        </View>
        {/*================= login title and subtitle ================= */}
        <View style={tw`px-[4%] gap-3`}>
          <Text style={tw`text-[24px] text-white100 font-RobotoBlack `}>
            Log In.
          </Text>

          <Text style={tw`text-sm text-black60 font-RobotoMedium`}>
            Log In with your data that you entered during your registration
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{email: '', password: ''}}
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
              <View style={tw`px-[4%]  gap-1`}>
                {/*======================= email ======================== */}
                <InputTextWL
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Enter you email"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
                  svgFirstIcon={IconEmailGay}
                />

                {errors.email && touched.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                {/*================== password =================== */}
                <InputTextWL
                  label="Password"
                  onPress={() => setShowPass(!showPass)}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Enter Your Password"
                  containerStyle={tw`h-12`}
                  focusSTyle={tw`border-primary`}
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
                  <Text style={tw`ml-2  font-RobotoBold text-black60`}>
                    Keep me logged in
                  </Text>
                </TouchableOpacity>
                <TButton
                  onPress={() => {
                    // handleSubmit()
                    navigation?.navigate('Home');
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
            onPress={() => navigation?.navigate('ForgetPassword')}>
            <Text style={tw`text-primary font-RobotoBold text-right`}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-center mt-12 `}>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-black60 font-NunitoSansLight`}>
              Don’t have an account?
            </Text>
            <Text
              onPress={() => {
                navigation?.navigate('SignUp');
              }}
              style={tw`text-primary font-NunitoSansLight`}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Background>
  );
};

export default LoginScreen;
