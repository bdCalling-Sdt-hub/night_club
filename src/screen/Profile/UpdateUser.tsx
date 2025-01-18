import {ScrollView, Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {Checkbox} from 'react-native-ui-lib';
import {Formik} from 'formik';
import {IMangeUser} from './ManageUsers';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';
import {useToast} from '../../components/modals/Toaster';

const data = [
  {
    label: 'Owner',
    value: 'owner',
  },
  {
    label: 'Nightclub manager',
    value: 'manager',
  },
  {
    label: 'Promoters',
    value: 'promoters',
  },
  {
    label: 'Guard',
    value: 'guard',
  },
];

interface createUser {
  displayName: string;
  email: string;
  role: string;
}

const UpdateUser = ({navigation, route}: NavigProps<{item: IMangeUser}>) => {
  const {user} = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectRole, setSelectRole] = React.useState<string | null>(
    route?.params?.item.role as string,
  );
  const [optionSendMail, setOptionSendMail] = React.useState({
    sendMail: true,
    setPass: false,
  });
  const {closeToast, showToast} = useToast();

  const handleOnSubmit = async (values: any) => {
    setLoading(true);
    values.company = user?.company;
    values.super_owner_id =
      user?.role === 'super-owner' ? user.user_id : user?.super_owner_id;

    // console.log(values);

    const res = await fetch(
      'http://10.0.80.14:5001/pushnotifiation-d1bcb/us-central1/users?user_id=' +
        route?.params?.item?.uid,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    );
    const resData = await res.json();
    // console.log(resData);

    if (resData?.success) {
      setLoading(false);
      if (resData?.loginType === 'email') {
        showToast({
          content: 'user added successfully,And send login link to email',
          title: 'Success',
          onPress: () => {
            closeToast();
            navigation.goBack();
          },
        });
      } else {
        setLoading(false);
        showToast({
          content: 'User added successfully',
          title: 'Success',
          onPress: () => {
            closeToast();
            navigation.goBack();
          },
        });
      }
    } else {
      setLoading(false);
      showToast({
        content: resData?.message || resData?.details,
        title: 'Warning',
        onPress: () => {
          closeToast();
          navigation.goBack();
        },
      });
    }
    // navigation.goBack();
  };

  const handleValidate = (values: createUser) => {
    const errors: any = {};

    if (!values.displayName) {
      errors.displayName = 'name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.role) {
      errors.role = 'Role is required';
    }

    return errors;
  };

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle title="Add User" onPress={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`gap-5 pb-12 pt-1`}>
        <Formik
          initialValues={{
            displayName: route?.params?.item.displayName,
            email: route?.params?.item.email,
            role: route?.params?.item.role,
          }}
          onSubmit={values => {
            handleOnSubmit(values);
          }}
          validate={(values: any) => {
            return handleValidate(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={tw`px-4 gap-3`}>
                <Text style={tw`text-white50 font-RobotoBold `}>
                  Select role to create a new user{'  '}
                  {errors.role && (
                    <Text style={tw`text-red-500 font-RobotoBold text-xs `}>
                      {errors.role}
                    </Text>
                  )}
                </Text>
                <View>
                  {data?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        // onPress={() => {
                        //   setSelectRole(item);
                        //   handleChange('role')(item);
                        // }}
                        style={tw`flex-row gap-3 items-center  mb-4`}>
                        <Checkbox
                          borderRadius={100}
                          size={15}
                          iconColor="#fff"
                          value={item.value === selectRole}
                          onValueChange={() => {
                            setSelectRole(item.value);
                            handleChange('role')(item.value);
                          }}
                          style={tw``}
                          color={PrimaryColor}
                        />
                        <Text
                          style={tw`text-white50 font-RobotoBold text-base`}>
                          {item?.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View>
                  <InputTextWL
                    label="First & last name"
                    containerStyle={tw`h-12 border-0`}
                    placeholder="Enter your full name"
                    value={values?.displayName}
                    onChangeText={handleChange('displayName')}
                    onBlur={handleBlur('displayName')}
                    errorText={errors?.displayName}
                    touched={touched?.displayName}
                  />
                </View>
                <View>
                  <InputTextWL
                    label="Email"
                    containerStyle={tw`h-12 border-0 opacity-50`}
                    placeholder="Enter your email"
                    value={values?.email}
                    // editable={false}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    errorText={errors.email}
                    touched={touched.email}
                  />
                </View>
                {/* <View style={tw`mt-2`}>
                  <View style={tw`flex-row gap-3 items-center  mb-4`}>
                    <Checkbox
                      borderRadius={2}
                      size={15}
                      iconColor="#fff"
                      value={optionSendMail?.sendMail}
                      onValueChange={value => {
                        handleChange('loginType')('email');
                        setOptionSendMail({
                          sendMail: value,
                          setPass: false,
                        });
                      }}
                      style={tw``}
                      color={PrimaryColor}
                    />
                    <Text style={tw`text-white60 font-RobotoBold text-base`}>
                      Send invitation to email
                    </Text>
                  </View>
                  <View style={tw`flex-row gap-3 items-center  mb-2`}>
                    <Checkbox
                      borderRadius={2}
                      size={15}
                      iconColor="#fff"
                      value={optionSendMail?.setPass}
                      onValueChange={value => {
                        handleChange('loginType')('password');
                        setOptionSendMail({
                          sendMail: false,
                          setPass: value,
                        });
                      }}
                      style={tw``}
                      color={PrimaryColor}
                    />
                    <Text style={tw`text-white60 font-RobotoBold text-base`}>
                      Set password for User
                    </Text>
                  </View>
                </View>
                {optionSendMail?.setPass && (
                  <View>
                    <InputTextWL
                      label="Password"
                      secureTextEntry
                      value={values?.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      containerStyle={tw`h-12 border-0 `}
                      placeholder="Enter your password"
                    />
                  </View>
                )} */}
              </View>

              <View style={tw`px-4  mt-12 gap-5 `}>
                <TButton
                  isLoading={loading}
                  title="Update"
                  onPress={handleSubmit}
                />
                <TButton
                  title="Cancel"
                  onPress={() => navigation?.goBack()}
                  containerStyle={tw`bg-transparent border border-red-800`}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default UpdateUser;
