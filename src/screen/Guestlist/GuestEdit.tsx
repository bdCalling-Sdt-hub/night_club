import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCleanGray,
  IconCloseGray,
  IconDownArrayGray,
  IconSmallPlusCyan,
  IconTimeGray,
} from '../../icons/icons';
import {BaseColor, PrimaryColor} from '../../utils/utils';

import {Formik} from 'formik';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

interface createProps {
  name: string;
  total: string;
  check_in: string;
  entry_fee: string;
  free_entry: string;
  free_entry_time: string;
  // free_entry_end_time: string;
  added_by: string;
  guest_list: string;
  tag: string;
}

const GuestEdit = ({navigation}: NavigProps<null>) => {
  const [extraFields, setExtraFields] = React.useState({
    note: '',
    email: '',
  });
  const [newTag, setNewTag] = React.useState('');
  const [guestList, setGuestList] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState({
    free_entry_time: false,
    free_entry_end_time: false,
  });

  const [tags, setTags] = React.useState([
    {label: 'VIP', value: 'VIP'},
    {label: 'PREMIUM', value: 'PREMIUM'},
    {label: 'GOLD', value: 'GOLD'},
    {label: 'SILVER', value: 'SILVER'},
    {label: 'BRONZE', value: 'BRONZE'},
  ]);
  const [guestListAvailable, setGuestListAvailable] = React.useState([
    {label: 'Guest List 1', value: 'Guest List 1'},
    {label: 'Guest List 2', value: 'Guest List 2'},
    {label: 'Guest List 3', value: 'Guest List 3'},
    {label: 'Guest List 4', value: 'Guest List 4'},
    {label: 'Guest List 5', value: 'Guest List 5'},
    {label: 'Guest List 6', value: 'Guest List 6'},
    {label: 'Guest List 7', value: 'Guest List 7'},
    {label: 'Guest List 8', value: 'Guest List 8'},
  ]);

  const handleValidate = (values: createProps) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.total) {
      errors.total = 'Number of total is required';
    }
    if (!values.entry_fee) {
      errors.entry_fee = 'Entry fee is required';
    }
    if (!values.free_entry) {
      errors.free_entry = 'Free entry is required';
    }
    // if (!values.free_entry_time) {
    //   errors.free_entry_time = 'Free entry time is required';
    // }
    // if (!values.free_entry_end_time) {
    //   errors.free_entry_end_time = 'Free entry end time is required';
    // }
    if (!values.guest_list) {
      errors.guest_list = 'Guest list is required';
    }
    if (!values.added_by) {
      errors.added_by = 'Added by is required';
    }
    if (!values.tag) {
      errors.tag = 'Tag is required';
    }

    return errors;
  };

  const handleNewTag = () => {
    if (!newTag) return;
    setTags([...tags, {label: newTag, value: newTag}]);
    setNewTag('');
  };

  const handleGuestList = () => {
    if (!guestList) return;
    setGuestListAvailable([
      ...guestListAvailable,
      {label: guestList, value: guestList},
    ]);
    setGuestList('');
  };

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
          initialValues={{
            name: 'AlexZender',
            total: '50',
            entry_fee: '100',
            free_entry: '6',
            free_entry_time: '',
            check_in: '10',
            added_by: 'ALex Zender',
            guest_list: 'Guest List 1',
            tag: 'VIP',
          }}
          onSubmit={values => {
            console.log(values);
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
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorText={errors.name}
                  touched={touched.name}
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
                  items={tags}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
                <TouchableOpacity
                  style={tw`self-end`}
                  onPress={() => {
                    navigation.navigate('AddNewTag');
                  }}>
                  <Text style={tw`text-primary pt-2 text-xs text-right`}>
                    Add new Tag
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[tw`text-white text-sm font-RobotoMedium px-[2%]`]}>
                Amount of people{' '}
                {errors.total && touched.total && (
                  <Text style={[tw`text-red-500 text-[10px] `]}>
                    {' '}
                    {errors.total}
                  </Text>
                )}
              </Text>
              <View style={tw`gap-2 flex-row `}>
                <TButton
                  disabled={
                    values?.total === '' ||
                    values?.total === '0' ||
                    values?.total === values.check_in
                  }
                  onPress={() => {
                    if (parseInt(values.total) > 0) {
                      handleChange('total')(`${parseInt(values.total) - 1}`);
                    }
                  }}
                  containerStyle={tw`h-12 rounded-lg bg-primary flex-1`}
                  title="-"
                />
                <InputText
                  placeholder="0"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.total}
                  editable={false}
                  fieldStyle={tw`text-center`}
                  keyboardType="numeric"
                  cursorColor={PrimaryColor}
                  onChangeText={handleChange('total')}
                  onBlur={handleBlur('total')}
                  textAlign="center"
                  errorText={errors.total}
                  touched={touched.total}
                />
                <TButton
                  containerStyle={tw`h-12 rounded-lg bg-primary flex-1`}
                  title="+"
                  onPress={() => {
                    if (!values.total) {
                      handleChange('total')('1');
                    } else {
                      handleChange('total')(`${parseInt(values.total) + 1}`);
                    }
                  }}
                />
              </View>
              {/* <View>
                <TButton
                  onPress={() => {
                    handleChange('check_in')(
                      `${parseInt(values.check_in) + 1}`,
                    );
                  }}
                  disabled={values?.check_in === values?.total}
                  containerStyle={tw`h-12 bg-transparent border border-green-500 w-full rounded-lg`}
                  titleStyle={tw`text-green-500 font-RobotoMedium text-base`}
                  title={`Checked In ${values?.check_in}/${values?.total}`}
                />
              </View> */}
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

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Free entry time"
                  editable={false}
                  onPress={() =>
                    setOpen({
                      free_entry_time: true,
                      free_entry_end_time: false,
                    })
                  }
                  placeholder="Default Stop"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={
                    values.free_entry_time
                      ? 'Open to free entry at ' +
                        moment(values.free_entry_time).format('hh:mm A')
                      : values.free_entry_time
                  }
                  onChangeText={handleChange('free_entry_time')}
                  onBlur={handleBlur('free_entry_time')}
                  errorText={errors.free_entry_time}
                  touched={touched.free_entry_time}
                  svgSecondIcon={!values.free_entry_time && IconTimeGray}
                  Component2={
                    <>
                      {values.free_entry_time && (
                        <IButton
                          onPress={() => {
                            handleChange('free_entry_time')('');
                          }}
                          svg={IconCleanGray}
                          containerStyle={tw`p-0 h-12 w-12 bg-secondary absolute right-0 rounded-r-lg rounded-l-none   `}
                        />
                      )}
                    </>
                  }
                />
              </View>

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
                    console.log(currentData.toISOString());
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
                  value={'Alexzander'}
                  editable={false}
                  onChangeText={handleChange('added_by')}
                  onBlur={handleBlur('added_by')}
                  errorText={errors.added_by}
                  touched={touched.added_by}
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
                      label="Add to guest list"
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
                  items={guestListAvailable}
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
              </View>

              {extraFields?.email && (
                <View>
                  <InputTextWL
                    cursorColor={PrimaryColor}
                    label="Email (optional)"
                    placeholder="Enter your email"
                    containerStyle={tw`border-0 h-12 rounded-lg`}
                    value={values.email}
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
                        titleStyle={tw`font-RobotoRegular text-primary text-xs `}
                        containerStyle={tw`mt-5  p-0 rounded-lg w-full  items-center bg-transparent justify-center h-4`}
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

export default GuestEdit;
