import {IconEyeGray, IconLockGray} from '../../icons/icons';
import {ScrollView, Text, View} from 'react-native';

import {Formik} from 'formik';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {usersCollection} from '../../firebase/database/collections';

const ResetPassword = ({navigation, route}: NavigProps<{email: string}>) => {
  const [showPass, setShowPass] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const onSubmitHandler = async (values: any) => {
    try {
      console.log(values);
      usersCollection
        .where('email', '==', route?.params.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({
              password: values.password,
            });
            (navigation as any).replace('Login');
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw`bg-base flex-1`}>
      {/* <BackWithHeader navigation={navigation} title="OTP Verification" /> */}
      <ScrollView
        contentContainerStyle={tw`px-[4%] py-[50%] gap-5`}
        keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            password: '',
            confirm_password: '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {
              password?: string;
              confirm_password?: string;
            } = {};
            // check or validity of password 8 digit
            if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters';
            }
            if (!values.password) {
              errors.password = 'Required';
            }

            if (!values.confirm_password) {
              errors.confirm_password = 'Required';
            }

            if (values.confirm_password !== values.password) {
              errors.confirm_password = 'Password does not match';
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
                        onSvgPress={() =>
                          setShowPass({
                            ...showPass,
                            password: !showPass?.password,
                          })
                        }
                        //   value={showPass.password}
                        placeholder="Enter new Password"
                        containerStyle={tw`h-12`}
                        focusSTyle={tw`border-primary`}
                        secureTextEntry={!showPass.password}
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        svgFirstIcon={IconLockGray}
                        svgSecondIcon={showPass ? IconEyeGray : IconEyeGray}
                        touched={touched.password}
                        errorText={errors.password}
                        // errorText={touched.password && errors.password ? errors.password : ''}
                      />
                    </View>
                    <View style={tw` w-full`}>
                      <InputTextWL
                        cursorColor={PrimaryColor}
                        label="Confirm Password"
                        onSvgPress={() =>
                          setShowPass({
                            ...showPass,
                            confirmPassword: !showPass?.confirmPassword,
                          })
                        }
                        //   value={showPass.password}
                        value={values.confirm_password}
                        onBlur={handleBlur('confirm_password')}
                        onChangeText={handleChange('confirm_password')}
                        placeholder="Enter confirm Password"
                        containerStyle={tw`h-12`}
                        focusSTyle={tw`border-primary`}
                        secureTextEntry={!showPass.confirmPassword}
                        svgFirstIcon={IconLockGray}
                        svgSecondIcon={showPass ? IconEyeGray : IconEyeGray}
                        touched={touched.confirm_password}
                        errorText={errors.confirm_password}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={tw` pt-6`}>
                <TButton
                  onPress={handleSubmit}
                  isLoading={false}
                  title="Submit"
                  containerStyle={tw`h-12 w-full bg-primary rounded-lg`}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
