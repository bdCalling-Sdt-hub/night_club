import {Text, TouchableOpacity, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {Checkbox} from 'react-native-ui-lib';
import {Formik} from 'formik';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

const data = ['Owner', 'Nightclub manager', 'Promoters', 'Guard'];

interface createUser {
  name: string;
  email: string;
  role: string;
}

const UpdateUser = ({navigation}: NavigProps<null>) => {
  const [selectRole, setSelectRole] = React.useState(null);
  const [optionSendMail, setOptionSendMail] = React.useState({
    sendMail: true,
    setPass: false,
  });

  const handleSendMail = () => {
    setOptionSendMail({
      sendMail: true,
      setPass: false,
    });
  };

  const handleOnSubmit = (values: any) => {
    console.log(values);
  };

  const handleValidate = (values: createUser) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Name is required';
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
      <BackWithTitle title="Update User" onPress={() => navigation.goBack()} />
      <Formik
        initialValues={{
          name: '',
          email: '',
          role: '',
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
                {data?.map((item: any, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectRole(item);
                        handleChange('role')(item);
                      }}
                      style={tw`flex-row gap-3 items-center  mb-4`}>
                      <Checkbox
                        borderRadius={100}
                        size={15}
                        iconColor="#fff"
                        value={selectRole === item}
                        onValueChange={() => {
                          setSelectRole(item);
                          handleChange('role')(item);
                        }}
                        style={tw``}
                        color={PrimaryColor}
                      />
                      <Text style={tw`text-white50 font-RobotoBold text-base`}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View>
                <InputTextWL
                  label="First name & Last name"
                  containerStyle={tw`h-12 border-0`}
                  placeholder="Enter your full name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorText={errors.name}
                  touched={touched.name}
                />
              </View>
              <View>
                <InputTextWL
                  label="Email"
                  containerStyle={tw`h-12 border-0 `}
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorText={errors.email}
                  touched={touched.email}
                />
              </View>
              <View style={tw`mt-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setOptionSendMail({
                      sendMail: true,
                      setPass: false,
                    });
                  }}
                  style={tw`flex-row gap-3 items-center  mb-4`}>
                  <Checkbox
                    borderRadius={2}
                    size={15}
                    iconColor="#fff"
                    value={optionSendMail?.sendMail}
                    onValueChange={() => {
                      setOptionSendMail({
                        sendMail: true,
                        setPass: false,
                      });
                    }}
                    style={tw``}
                    color={PrimaryColor}
                  />
                  <Text style={tw`text-white60 font-RobotoBold text-base`}>
                    Sent invitation to Email
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOptionSendMail({
                      sendMail: false,
                      setPass: true,
                    });
                  }}
                  style={tw`flex-row gap-3 items-center  mb-2`}>
                  <Checkbox
                    borderRadius={2}
                    size={15}
                    iconColor="#fff"
                    value={optionSendMail?.setPass}
                    onValueChange={() => {
                      setOptionSendMail({
                        sendMail: true,
                        setPass: false,
                      });
                    }}
                    style={tw``}
                    color={PrimaryColor}
                  />
                  <Text style={tw`text-white60 font-RobotoBold text-base`}>
                    Set password for User
                  </Text>
                </TouchableOpacity>
              </View>
              {optionSendMail?.setPass && (
                <View>
                  <InputTextWL
                    label="Password"
                    containerStyle={tw`h-12 border-0 `}
                    placeholder="Enter your password"
                  />
                </View>
              )}
            </View>

            <View style={tw`px-4  mt-12 gap-5 `}>
              <TButton title="Save" onPress={handleSubmit} />
              <TButton
                title="Cancel"
                onPress={() => navigation?.goBack()}
                containerStyle={tw`bg-transparent border border-red-800`}
              />
            </View>
          </View>
        )}
      </Formik>
    </Background>
  );
};

export default UpdateUser;
