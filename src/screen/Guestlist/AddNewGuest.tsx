import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IEvent, IGuestsList, ITags} from '../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconSmallPlusCyan,
} from '../../icons/icons';
import {BaseColor, PrimaryColor} from '../../utils/utils';

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
import InputText from '../../components/inputs/InputText';
import InputTextWL from '../../components/inputs/InputTextWL';
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
  guest_list: string;
  event: string;
  venue: string;
  tag: string;
}

const AddNewGuest = ({navigation, route}: NavigProps<{item: IEvent}>) => {
  // get current user
  const {user} = useAuth();
  const {closeToast, showToast} = useToast();
  const {createFireData, loadAllData} = useFireStore();
  // console.log(currentUser);
  const [extraFields, setExtraFields] = React.useState({
    note: '',
    email: '',
  });

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState({
    free_entry_time: false,
    free_entry_end_time: false,
  });

  const [tags, setTags] = React.useState<Array<ITags> | []>([]);
  const [guestListAvailable, setGuestListAvailable] = React.useState<
    Array<IGuestsList> | []
  >([]);

  const handleValidate = (values: createProps) => {
    const errors: any = {};

    if (!values.fullName) {
      errors.fullName = 'Name is required';
    }

    return errors;
  };

  React.useEffect(() => {
    loadAllData({
      collectType: 'Tags',
      setLoad: setTags,
    });

    loadAllData({
      collectType: 'GuestsList',
      setLoad: setGuestListAvailable,
    });

    return () => {};
  }, []);

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Add New Guest"
        onPress={() => navigation?.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={{
            fullName: '',
            people: '',
            entry_fee: '',
            free_entry: '',
            free_entry_time: '',
            guest_list: '',
            tag: '',
            added_by: user?.name || '',
            event: route?.params?.item?.name || '',
            venue: route?.params?.item?.venue || '',
            event_date: route?.params?.item?.date || '',
          }}
          onSubmit={values => {
            // console.log(values);
            createFireData({
              collectType: 'Guests',
              data: values,
            }).then(() => {
              navigation.goBack();
            });
          }}
          validate={(values: createProps) => handleValidate(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
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
                  value={values.tag}
                  onChange={handleChange('tag')}
                  onBlur={handleBlur('tag')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={values.tag}
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
                          {value}
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
                    value: item.name,
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
                    {errors.people}
                  </Text>
                )}
              </Text>
              <View style={tw`gap-2 flex-row `}>
                <TButton
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
                />
              </View>
              <View style={tw`bg-base `}>
                <Picker
                  useSafeArea
                  value={values.guest_list}
                  onChange={handleChange('guest_list')}
                  onBlur={handleBlur('guest_list')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={values.guest_list}
                      label="Add to guest list (optional)"
                      placeholder="Select guest list"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.guest_list}
                      touched={touched.guest_list}
                    />
                  )}
                  renderItem={(value, items) => {
                    return (
                      <View
                        style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                        <Text
                          style={tw`text-white100 py-3  font-RobotoMedium text-lg`}>
                          {value}
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
                          <SvgXml xml={IconCloseGray} height={20} width={20} />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={guestListAvailable?.map(item => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
                {userAccess({GRole: 'middler'}) && (
                  <TouchableOpacity
                    style={tw`self-end`}
                    onPress={() => {
                      navigation.navigate('AddNewGuestList');
                    }}>
                    <Text style={tw`text-primary py-2 text-xs text-right`}>
                      Add new guest list
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {extraFields?.email && (
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
              {extraFields?.note && (
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
                  title="Save"
                  titleStyle={tw`font-RobotoBold text-base`}
                  containerStyle={tw`mt-5 bg-primary rounded-lg w-full h-12 `}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
                <TButton
                  title="Cancel"
                  titleStyle={tw`font-RobotoBold text-white50 text-base`}
                  containerStyle={tw`mt-5 bg-transparent border border-primary rounded-lg w-full h-12 `}
                  onPress={() => navigation?.goBack()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default AddNewGuest;
