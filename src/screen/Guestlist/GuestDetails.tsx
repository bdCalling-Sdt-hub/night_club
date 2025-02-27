import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IGuest, IGuestsList, ITags} from '../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconSmallPlusCyan,
} from '../../icons/icons';
import {BaseColor, PrimaryColor, height} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {Formik} from 'formik';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import EmptyCard from '../../components/Empty/EmptyCard';
import InputText from '../../components/inputs/InputText';
import InputTextWL from '../../components/inputs/InputTextWL';
import GLoading from '../../components/loader/GLoading';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {userAccess} from '../../hook/useAccess';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

interface createProps {
  fullName: string;
  people: string;
  entry_fee: string;
  free_entry: string;
  free_entry_time: string;
  // free_entry_end_time: string;
  added_by: string;
  guest_list: [string];
  tag: string;
  tag_name: string;
}

const GuestDetails = ({navigation, route}: NavigProps<{guest: IGuest}>) => {
  // get current user
  const {user} = useAuth();
  const {closeToast, showToast} = useToast();
  // console.log(currentUser);
  const [extraFields, setExtraFields] = React.useState({
    note: '',
    email: '',
  });
  const isFocused = useIsFocused();
  const {loadAllData, updateFireData, deleteFireData} = useFireStore();

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState({
    free_entry_time: false,
    free_entry_end_time: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [guest, setGuest] = React.useState<IGuest | null>(null);
  const [tags, setTags] = React.useState<Array<ITags> | []>([]);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList> | []
  >([]);

  const handleValidate = (values: createProps) => {
    const errors: any = {};

    if (!values.fullName) {
      errors.fullName = 'Name is required';
    }

    if (values.people) {
      if (isNaN(parseInt(values.people))) {
        errors.people = 'People should be a number';
      }
      if (parseInt(values.people) < 1) {
        errors.people = 'People should be greater than 0';
      }
    }
    if (values.free_entry) {
      if (isNaN(parseInt(values.free_entry))) {
        errors.free_entry = 'Free entry should be a number';
      }
      if (parseInt(values.free_entry) < 0) {
        errors.free_entry = 'Free entry should be greater than 0';
      }
      if (!values.people) {
        errors.free_entry =
          'Please enter total people, before count free entry';
      }
      if (parseInt(values.people) < parseInt(values.free_entry)) {
        errors.free_entry = 'Free entry should be less than total people';
      }
    }

    return errors;
  };

  const fetchTags = async () => {
    setLoading(true);
    try {
      // Build the Firestore query
      let query = firestore().collection('Tags');

      if (user?.role === 'super-owner') {
        query = query.where('super_owner_id', '==', user?.user_id);
      } else {
        query = query.where('super_owner_id', '==', user?.super_owner_id);
      }

      // if (
      //   user?.role === 'guard' ||
      //   user?.role === 'promoters' ||
      //   user?.role === 'manager'
      // ) {
      //   const managerId =
      //     user?.role === 'manager' ? user?.user_id : user?.manager_id;
      //   query = query.where('manager_id', '==', managerId);
      // }

      // Subscribe to real-time updates
      query.onSnapshot(
        snapshot => {
          const tagsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTags(tagsData);
          setLoading(false);
        },
        error => {
          console.error('Error fetching Tags in real-time:', error);
          setLoading(false);
        },
      );
    } catch (error) {
      console.error('Error fetching Tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestsList = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore()
        .collection('GuestsList')
        .where('createdBy', '==', user?.user_id)
        .get();

      const guestListData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuestListAvailable(guestListData);
    } catch (error) {
      console.error('Error fetching GuestsList:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTags();
    fetchGuestsList();
  }, [isFocused]);

  // console.log(guest);

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Guest Details"
        onPress={() => navigation?.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={
            route?.params?.guest
              ? (route?.params?.guest as any)
              : {
                  fullName: '',
                  people: '',
                  entry_fee: '',
                  free_entry: '',
                  free_entry_time: '',
                  free_entry_end_time: '',
                  added_by: '',
                  guest_list: '',
                  tag: '',
                  tag_name: '',
                  check_in: 0,
                }
          }
          onSubmit={async values => {
            // console.log(values);
            setLoading(true);
            if (values?.tag && !values?.tag_name) {
              values.tag_name = tags?.find(item => item.id === values.tag)
                ?.name as string;
            }

            updateFireData({
              collectType: 'Guests',
              id: route?.params?.guest?.id as string,
              data: values,
            }).then(() => {
              navigation?.goBack();
            });
            setLoading(false);
          }}
          validate={(values: createProps) => handleValidate(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={tw`gap-4 `}>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="First name & Last name"
                  placeholder="Enter  full name"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  errorText={errors.fullName}
                  touched={touched.fullName}
                />
              </View>
              <View style={tw`bg-base `}>
                <Picker
                  useSafeArea
                  listProps={{
                    ListEmptyComponent: (
                      <EmptyCard
                        title="No Tags"
                        isLoading={loading}
                        hight={height * 0.8}
                      />
                    ),
                  }}
                  value={values.tag}
                  onChange={handleChange('tag') as any}
                  onBlur={handleBlur('tag')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={tags?.find(item => item.id === values.tag)?.name}
                      label="Tag"
                      placeholder="Select tag"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.tag}
                      touched={touched.tag}
                    />
                  )}
                  renderItem={(value, items) => {
                    return (
                      <View
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
                      <View>
                        <TouchableOpacity
                          onPress={preps.onCancel}
                          style={tw`self-start pt-3 px-4`}>
                          <SvgXml xml={IconCloseGray} height={20} width={20} />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={tags?.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
                {userAccess({GRole: 'middler'}) && (
                  <TouchableOpacity
                    style={tw`self-end`}
                    onPress={() => {
                      navigation.navigate('AddNewTag');
                    }}>
                    <Text style={tw`text-primary pt-2 text-xs text-right`}>
                      Add new Tag
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={[tw`text-white text-sm font-RobotoMedium px-[2%]`]}>
                Amount of people{' '}
                {errors.people && touched.people && (
                  <Text style={[tw`text-red-500 text-[10px] `]}>
                    {' '}
                    {errors.people}
                  </Text>
                )}
              </Text>
              <View style={tw`gap-2 flex-row `}>
                <TButton
                  disabled={
                    parseInt(values?.check_in ?? 0) >=
                    parseInt(values?.people ?? 0)
                  }
                  onPress={() => {
                    if (parseInt(values.people) > 0) {
                      handleChange('people')(`${parseInt(values.people) - 1}`);
                    }
                  }}
                  containerStyle={tw`h-12 rounded-lg bg-primary flex-1`}
                  title="-"
                />
                <InputText
                  placeholder="0"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.people}
                  fieldStyle={tw`text-center`}
                  keyboardType="numeric"
                  cursorColor={PrimaryColor}
                  onChangeText={handleChange('people')}
                  onBlur={handleBlur('people')}
                  textAlign="center"
                  errorText={errors.people}
                  touched={touched.people}
                />
                <TButton
                  containerStyle={tw`h-12 rounded-lg bg-primary flex-1`}
                  title="+"
                  onPress={() => {
                    if (!values.people) {
                      handleChange('people')('1');
                    } else {
                      handleChange('people')(`${parseInt(values.people) + 1}`);
                    }
                  }}
                />
              </View>

              <TButton
                disabled={parseInt(values.people) == 0 || !values?.people}
                onPress={() => {
                  handleChange('check_in')(
                    `${
                      parseInt(values?.check_in) === parseInt(values?.people)
                        ? 0
                        : parseInt(values.check_in) + 1 || 0
                    }`,
                  );
                  handleSubmit();
                }}
                title={`Check in ${parseInt(values?.check_in ?? 0)}/${
                  values?.people ?? 0
                }`}
                containerStyle={tw`bg-green-600`}
              />

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Free Entry"
                  placeholder="Enter free entry"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.free_entry}
                  onChangeText={handleChange('free_entry')}
                  onBlur={handleBlur('free_entry')}
                  errorText={errors.free_entry}
                  touched={touched.free_entry}
                  keyboardType="decimal-pad"
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Entry fee"
                  placeholder="Enter entry fee"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.entry_fee}
                  onChangeText={handleChange('entry_fee')}
                  onBlur={handleBlur('entry_fee')}
                  errorText={errors.entry_fee}
                  touched={touched.entry_fee}
                  keyboardType="decimal-pad"
                />
              </View>

              <DateTimePicker
                value={
                  values.free_entry_time
                    ? moment(values.free_entry_time).format('hh:mm A')
                    : ''
                }
                label="Free entry time (optional)"
                placeholder="Enter free entry time"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                onChangeText={handleChange('free_entry_time')}
                onBlur={handleBlur('free_entry_time')}
                errorText={errors.free_entry_time}
                touched={touched.free_entry_time}
                onClear={() => {
                  handleChange('free_entry_time')('');
                }}
                getCurrentDate={date => {
                  handleChange('free_entry_time')(date);
                }}
              />

              <DatePicker
                style={tw`border-0 h-12 rounded-lg bg-transparent`}
                mode="time"
                modal
                theme="dark"
                dividerColor={PrimaryColor}
                buttonColor={PrimaryColor}
                open={open.free_entry_end_time || open.free_entry_time}
                date={date}
                onConfirm={(currentData: any) => {
                  if (currentData) {
                    // Format the date with time, assuming you want to specify the time as well.
                    // console.log(currentData.toISOString());
                    if (open.free_entry_time) {
                      handleChange('free_entry_time')(
                        currentData.toISOString(),
                      );
                    } else if (open.free_entry_end_time) {
                      handleChange('free_entry_end_time')(
                        currentData.toISOString(),
                      );
                    }
                  }
                  setOpen({
                    free_entry_time: false,
                    free_entry_end_time: false,
                  });
                }}
                onCancel={() =>
                  setOpen({
                    free_entry_time: false,
                    free_entry_end_time: false,
                  })
                }
              />
              {/* {values?.free_entry_time && (
                <View>
                  <InputTextWL
                    cursorColor={PrimaryColor}
                    label="Free entry end time"
                    editable={false}
                    onPress={() =>
                      setOpen({
                        free_entry_time: false,
                        free_entry_end_time: true,
                      })
                    }
                    placeholder="Enter free entry time"
                    containerStyle={tw`border-0 h-12 rounded-lg`}
                    value={values.free_entry_end_time}
                    onChangeText={handleChange('free_entry_time')}
                    onBlur={handleBlur('free_entry_time')}
                    errorText={errors.free_entry_end_time}
                    touched={touched.free_entry_end_time}
                    svgSecondIcon={IconTimeGray}
                  />
                </View>
              )} */}
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Added By"
                  placeholder="Enter your name"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={user?.name}
                  editable={false}
                  onChangeText={handleChange('added_by')}
                  onBlur={handleBlur('added_by')}
                  errorText={errors.added_by}
                  touched={touched.added_by}
                />
              </View>
              {/* <View style={tw`bg-base flex-1 `}>
                <Text
                  style={[
                    tw`text-white text-sm font-RobotoMedium px-[2%] pb-2`,
                  ]}>
                  Add to guest list (optional)
                </Text>
                <Picker
                  useSafeArea
                  mode={Picker.modes.MULTI}
                  listProps={{
                    ListEmptyComponent: (
                      <EmptyCard
                        title="No Guest List"
                        isLoading={loading}
                        hight={height * 0.8}
                      />
                    ),
                  }}
                  multiline
                  value={values.guest_list}
                  onChange={items => {
                    setFieldValue('guest_list', items);
                  }}
                  renderPicker={(value, label) => {
                    // console.log(label);
                    return (
                      <View
                        key={value}
                        style={tw`flex-row justify-between items-center border-b border-b-gray-800 `}>
                        <View
                          style={tw`flex flex-1 pb-2 flex-row flex-wrap gap-1`}>
                          {label ? (
                            label?.split(',')?.map(item => {
                              return (
                                <Text
                                  style={tw`text-white100 bg-secondary p-1  font-RobotoMedium text-xs  rounded-lg`}>
                                  {item}
                                </Text>
                              );
                            })
                          ) : (
                            <Text
                              style={tw`text-white100 py-3  font-RobotoMedium text-sm px-4`}>
                              Select guest list
                            </Text>
                          )}
                        </View>
                        <SvgXml xml={IconDownArrayGray} />
                      </View>
                    );
                  }}
                  onBlur={handleBlur('guest_list')}
                  renderItem={(value, items) => {
                    // console.log(items);
                    return (
                      <View
                        key={value}
                        style={tw`flex-row justify-between items-center border-b border-b-gray-800`}>
                        <View style={tw` mt-1 pb-2 mx-[4%]  justify-center`}>
                          <Text
                            style={tw`text-white100 py-3  font-RobotoMedium text-lg`}>
                            {items.label}
                          </Text>
                        </View>
                        {items?.isSelected && (
                          <View style={tw`px-4`}>
                            <SvgXml
                              xml={IconSmallTickCyan}
                              height={20}
                              width={20}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }}
                  renderCustomDialogHeader={preps => {
                    return (
                      <View style={tw`flex-row justify-between`}>
                        <TouchableOpacity
                          onPress={preps.onCancel}
                          style={tw`self-start py-3 px-4`}>
                          <SvgXml xml={IconCloseGray} height={20} width={20} />
                        </TouchableOpacity>
                        <View style={tw`flex-row`}>
                          <TouchableOpacity
                            onPress={() => {
                              setFieldValue('guest_list', []);
                            }}
                            style={tw`self-start py-3 px-4`}>
                            <Text style={tw`text-primary text-base`}>
                              Clear
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={preps.onDone}
                            style={tw`self-start py-3 px-4`}>
                            <Text style={tw`text-primary text-base`}>Done</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                  items={guestListAvailable?.map(item => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />

                <TouchableOpacity
                  style={tw`self-end`}
                  onPress={() => {
                    navigation.navigate('AddNewGuestList');
                  }}>
                  <Text style={tw`text-primary py-2 text-xs text-right`}>
                    Add new guest list
                  </Text>
                </TouchableOpacity>
              </View> */}

              {(extraFields?.email || values?.email) && (
                <View>
                  <InputTextWL
                    cursorColor={PrimaryColor}
                    label="Email (optional)"
                    placeholder="Enter your email"
                    containerStyle={tw`border-0 h-12 rounded-lg`}
                    value={values?.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                </View>
              )}
              {(extraFields?.note || values?.note) && (
                <View>
                  <InputTextWL
                    cursorColor={PrimaryColor}
                    label="Note (optional)"
                    textAlignVertical="top"
                    multiline
                    verticalAlign="top"
                    numberOfLines={8}
                    placeholder="Enter your note"
                    containerStyle={tw`border-0 py-2 h-30 rounded-lg`}
                    value={values.note}
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                  />
                </View>
              )}

              <View>
                <View style={tw`bg-base `}>
                  <Picker
                    useSafeArea
                    listProps={{
                      ListEmptyComponent: (
                        <EmptyCard
                          title="No Extra Fields"
                          isLoading={loading}
                          hight={height * 0.8}
                        />
                      ),
                    }}
                    onChange={(value: string) => {
                      setExtraFields({
                        ...extraFields,
                        [value]: !extraFields[value],
                      });
                      // console.log(value);
                    }}
                    renderInput={() => (
                      <IwtButton
                        svg={IconSmallPlusCyan}
                        title="Add new text field"
                        titleStyle={tw`font-RobotoRegular text-primary text-xs  border-0`}
                        containerStyle={tw`mt-5  p-0 rounded-lg w-full h-8 items-center bg-transparent`}
                        onPress={() => {
                          // handleSubmit();
                        }}
                      />
                    )}
                    renderItem={(value, items) => {
                      return (
                        <View
                          style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                          <Text
                            style={tw`text-white100 py-3  font-RobotoMedium text-lg`}>
                            {items.label}
                          </Text>
                        </View>
                      );
                    }}
                    renderCustomDialogHeader={preps => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={preps.onCancel}
                            style={tw`self-start py-3 px-4`}>
                            <SvgXml
                              xml={IconCloseGray}
                              height={20}
                              width={20}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                    fieldType={Picker.fieldTypes.filter}
                    paddingH
                    items={[
                      {
                        label: 'Note',
                        value: 'note',
                      },
                      {
                        label: 'Email',
                        value: 'email',
                      },
                    ]}
                    pickerModalProps={{
                      overlayBackgroundColor: BaseColor,
                    }}
                  />
                </View>

                <TButton
                  title="Update"
                  titleStyle={tw`font-RobotoBold text-base`}
                  containerStyle={tw`mt-5 bg-primary rounded-lg w-full h-12 `}
                  onPress={async () => {
                    handleSubmit();
                  }}
                />
                <TButton
                  title="Cancel"
                  titleStyle={tw`font-RobotoBold text-white50 text-base`}
                  containerStyle={tw`mt-5 bg-transparent border border-primary rounded-lg w-full h-12 `}
                  onPress={() => navigation?.goBack()}
                />
                <TButton
                  title="Delete"
                  titleStyle={tw`font-RobotoBold text-red-500 text-base`}
                  containerStyle={tw`mt-5 bg-transparent border border-red-500 rounded-lg w-full h-12 `}
                  onPress={() => {
                    showToast({
                      title: 'Warning',
                      content: 'Are you sure you want to delete this guest?',
                      multipleBTNStyle: tw`flex-col gap-3`,

                      multipleButton: [
                        {
                          buttonText: 'Yes',
                          buttonTextStyle: tw`text-red-500 font-RobotoBold text-base`,
                          buttonStyle: tw`border-red-500 bg-transparent border w-full self-center`,
                          onPress: () => {
                            // updateFireData({
                            //   id: route?.params?.guest?.id as string,
                            //   collectType: 'Guests',
                            //   data: {
                            //     event: null,
                            //   },
                            // });
                            deleteFireData({
                              id: route?.params?.guest?.id as string,
                              collectType: 'Guests',
                            });
                            closeToast();
                            navigation?.goBack();
                          },
                        },
                        {
                          buttonText: 'Cancel',
                          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
                          onPress: () => {
                            closeToast();
                          },
                        },
                      ],
                    });
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <GLoading loading={loading} setLoading={setLoading} />
    </Background>
  );
};

export default GuestDetails;
