import {ApiUrl, BaseColor, PrimaryColor, height} from '../../utils/utils';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {IconCloseGray, IconDownArrayGray} from '../../icons/icons';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import EmptyCard from '../../components/Empty/EmptyCard';
import {Formik} from 'formik';
import {IMangeUser} from '../../firebase/interface';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
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

const AddUser = ({navigation}: NavigProps<null>) => {
  const {user} = useAuth();
  const [allUser, setAllUser] = React.useState<IMangeUser[]>([]);
  const {getAllUser} = useFireStore();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectRole, setSelectRole] = React.useState<string | null>(null);
  const [optionSendMail, setOptionSendMail] = React.useState({
    sendMail: true,
    setPass: false,
  });
  const {closeToast, showToast} = useToast();

  const handleOnSubmit = async (values: any) => {
    setLoading(true);
    if (values?.loginType === 'password' && !values?.password) {
      showToast({
        content: 'Password is required',
        title: 'Warning',
        onPress: () => {
          closeToast();
        },
      });
      return;
    }
    values.company = user?.company;
    values.super_owner_id =
      user?.role === 'super-owner' ? user.user_id : user?.super_owner_id;

    // console.log(values);

    const res = await fetch(`${ApiUrl}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    // console.log(resData);

    if (resData?.success) {
      console.log(resData);

      setLoading(false);
      if (resData?.loginType === 'email') {
        showToast({
          content: 'The invitation has successfully been sent to the user',
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
    if (values?.loginType === 'password' && !values?.password) {
      errors.password = 'Password is required';
    }
    if (
      (values?.role == 'promoters' || values?.role == 'guard') &&
      !values?.manager_id
    ) {
      errors.manager_id = 'Manager is required';
    }

    return errors;
  };
  React.useEffect(() => {
    getAllUser(data => {
      setAllUser(data?.filter(item => item.role == 'manager'));
    });
  }, []);
  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle title="Add User" onPress={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`gap-5 pb-12 pt-1`}>
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            role: '',
            manager_id: '',
            phoneNumber: '',
            loginType: 'email',
            password: '',
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
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectRole(item.value);
                          handleChange('role')(item.value);
                        }}
                        style={tw`flex-row gap-3 items-center  mb-4`}>
                        <Checkbox
                          borderRadius={100}
                          size={20}
                          iconColor="#fff"
                          value={selectRole === item.value}
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
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {(values?.role == 'promoters' || values?.role == 'guard') && (
                  <View style={tw`bg-base `}>
                    <Picker
                      useSafeArea
                      listProps={{
                        ListEmptyComponent: (
                          <EmptyCard
                            title="No manager available"
                            isLoading={loading}
                            hight={height * 0.8}
                          />
                        ),
                      }}
                      value={values.manager_id}
                      onChange={handleChange('manager_id')}
                      onBlur={handleBlur('manager_id')}
                      renderInput={() => (
                        <InputTextWL
                          cursorColor={PrimaryColor}
                          value={
                            allUser.find(
                              item => item?.uid === values.manager_id,
                            )?.displayName
                          }
                          editable={false}
                          label="Select manager"
                          placeholder="select  manager"
                          containerStyle={tw`h-12 border-0 rounded-lg`}
                          svgSecondIcon={IconDownArrayGray}
                          errorText={errors.manager_id}
                          touched={touched.manager_id}
                        />
                      )}
                      renderItem={(value, items) => {
                        return (
                          <View
                            // onPress={() => setValue(value)}
                            style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                            <Text
                              style={tw`text-white100 py-3  font-RobotoMedium text-lg`}>
                              {items?.label}
                            </Text>
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
                      items={allUser.map(item => {
                        return {
                          label: item?.displayName,
                          value: item?.uid,
                        };
                      })}
                      pickerModalProps={{
                        overlayBackgroundColor: BaseColor,
                      }}
                    />
                  </View>
                )}

                <View>
                  <InputTextWL
                    label="First & last displayName"
                    containerStyle={tw`h-12 border-0`}
                    placeholder="Enter your full displayName"
                    value={values.displayName}
                    onChangeText={handleChange('displayName')}
                    onBlur={handleBlur('displayName')}
                    errorText={errors.displayName}
                    touched={touched.displayName}
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
                  <View style={tw`flex-row gap-3 items-center  mb-4`}>
                    <Checkbox
                      borderRadius={2}
                      size={15}
                      iconColor="#fff"
                      value={optionSendMail?.sendMail}
                      onValueChange={value => {
                        handleChange('loginType')('email');
                        handleChange('password')('');
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
                      errorText={errors.password}
                      touched={touched.password}
                    />
                  </View>
                )}
              </View>

              <View style={tw`px-4  mt-12 gap-5 `}>
                <TButton
                  disabled={
                    (optionSendMail.setPass && values?.password?.length < 6) ||
                    (!optionSendMail?.sendMail && !optionSendMail?.setPass)
                  }
                  isLoading={loading}
                  title="Save"
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

export default AddUser;
