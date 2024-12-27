import {BaseColor, PrimaryColor} from '../../utils/utils';
import {
  IconCalendarGay,
  IconCloseGray,
  IconDownArrayGray,
  IconPlusGray,
} from '../../icons/icons';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import {Formik} from 'formik';
import IButton from '../../components/buttons/IButton';
import {IEvent} from '../../firebase/database/events.doc';
import InputTextWL from '../../components/inputs/InputTextWL';
import IwtButton from '../../components/buttons/IwtButton';
import {NavigProps} from '../../interfaces/NaviProps';
import {Picker} from 'react-native-ui-lib';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import moment from 'moment';
import tw from '../../lib/tailwind';
import {useMediaPicker} from '../../hook/useMediaPicker';

const EventCreate = ({navigation}: NavigProps<null>) => {
  const [open, setOpen] = React.useState({
    openTime: false,
    closeTime: false,
  });

  const handleImageUpdate = async () => {
    // console.log(values);

    const image = await useMediaPicker({
      option: 'library',
      mediaType: 'photo',
      selectionLimit: 1,
    });

    return image[0];
  };

  const handleValidate = (values: IEvent) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.image) {
      errors.image = 'Required';
    }
    if (!values.venue) {
      errors.venue = 'Required';
    }
    if (!values.date) {
      errors.date = 'Required';
    }
    if (!values.start_time) {
      errors.start_time = 'Required';
    }
    if (!values.end_time) {
      errors.end_time = 'Required';
    }
    if (!values.capacity) {
      errors.capacity = 'Required';
    }
    if (!values.entryFee) {
      errors.entry_fee = 'Required';
    }

    if (!values.residentDj) {
      errors.resident_dj = 'Required';
    }

    return errors;
  };

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Create Event"
        onPress={() => navigation?.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={{
            name: '',
            description: '',
            image: '',
            venue: '',
            date: '',
            start_time: '',
            end_time: '',
            capacity: '',
            entryFee: '',
            residentDj: '',
            createdBy: '',
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validate={(values: IEvent) => handleValidate(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={tw`gap-4 `}>
              <View style={tw` bg-secondary rounded-lg px-3`}>
                <Text style={tw`text-white font-RobotoBold text-sm py-2`}>
                  Add venue image
                </Text>
                <View
                  style={tw`border border-white60 h-20 rounded-lg border-dashed justify-center items-center my-3`}>
                  {values?.image ? (
                    <View
                      style={tw`flex-row justify-center items-center w-full`}>
                      <Image
                        resizeMode="cover"
                        style={tw`w-[96%] h-16 self-center  rounded-lg overflow-hidden`}
                        source={{uri: values.image}}
                      />
                      <IButton
                        onPress={() => {
                          handleChange('image')('');
                        }}
                        svg={IconCloseGray}
                        containerStyle={tw`absolute  top-0 right-0 w-8 h-8 bg-secondary rounded-full  justify-center items-center`}
                      />
                    </View>
                  ) : (
                    <IwtButton
                      onPress={async () => {
                        const image = await handleImageUpdate();
                        // console.log('pressed');
                        // console.log(image);
                        // handleBlur('image');
                        image && handleChange('image')(image?.uri);
                      }}
                      containerStyle={tw`bg-transparent border border-primary  w-48 h-10 p-0 justify-center items-center rounded-lg gap-5`}
                      svg={IconPlusGray}
                      titleStyle={tw`text-white font-RobotoBold text-sm`}
                      title="Upload image"
                    />
                  )}
                </View>
                {errors.image && touched.image && (
                  <Text style={tw`text-red-500 text-xs pb-2 self-end`}>
                    {errors.image}
                  </Text>
                )}
              </View>
              <View style={tw`bg-base `}>
                <Picker
                  useSafeArea
                  value={values.venue}
                  onChange={handleChange('venue')}
                  onBlur={handleBlur('venue')}
                  shouldRasterizeIOS
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={values.venue}
                      label="Venue"
                      placeholder="Select venue"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.venue}
                      touched={touched.venue}
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
                      <TouchableOpacity
                        onPress={preps.onCancel}
                        style={tw`self-start py-3 px-4`}>
                        <SvgXml xml={IconCloseGray} height={20} width={20} />
                      </TouchableOpacity>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  items={[
                    {label: 'The Velvet Lounge', value: 'The Velvet Lounge'},
                    {label: 'Skyline Rooftop', value: 'Skyline Rooftop'},
                    {label: 'Oceanview Club', value: 'Oceanview Club'},
                    {label: 'The Pulse Arena', value: 'The Pulse Arena'},
                    {label: 'Neon District', value: 'Neon District'},
                    {label: 'Electric Gardens', value: 'Electric Gardens'},
                    {label: 'The Vibe Room', value: 'The Vibe Room'},
                    {label: 'Sunset Terrace', value: 'Sunset Terrace'},
                    {label: 'Riverside Pavilion', value: 'Riverside Pavilion'},
                    {label: 'Majestic Hall', value: 'Majestic Hall'},
                  ]}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
              </View>

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Event name"
                  placeholder="Enter event full name"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorText={errors.name}
                  touched={touched.name}
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Event description"
                  placeholder="Describe event information"
                  multiline
                  containerStyle={tw`border-0 h-24 rounded-lg`}
                  textAlignVertical="top"
                  numberOfLines={5}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  errorText={errors.description}
                  touched={touched.description}
                />
              </View>

              <DateTimePicker
                value={
                  values.date
                    ? moment(values.date || new Date()).format('d MMMM, YYYY')
                    : ''
                }
                dateProps={{
                  mode: 'date',
                }}
                svgSecondIcon={!values?.date && IconCalendarGay}
                label="Event date"
                placeholder="Enter event date name"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                errorText={errors.date}
                touched={touched.date}
                onClear={() => {
                  handleChange('date')('');
                }}
                getCurrentDate={date => {
                  handleChange('date')(date);
                }}
              />
              <DateTimePicker
                value={
                  values.start_time
                    ? moment(values.start_time).format('hh:mm A')
                    : ''
                }
                label="Opening time"
                placeholder="Please select open time"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                onChangeText={handleChange('start_time')}
                onBlur={handleBlur('start_time')}
                errorText={errors.start_time}
                touched={touched.start_time}
                onClear={() => {
                  handleChange('start_time')('');
                }}
                getCurrentDate={date => {
                  handleChange('start_time')(date);
                }}
              />
              <DateTimePicker
                value={
                  values.end_time
                    ? moment(values.end_time).format('hh:mm A')
                    : ''
                }
                label="Closing time"
                placeholder="Please select close time"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                onChangeText={handleChange('end_time')}
                onBlur={handleBlur('end_time')}
                errorText={errors.end_time}
                touched={touched.end_time}
                onClear={() => {
                  handleChange('end_time')('');
                }}
                getCurrentDate={date => {
                  handleChange('end_time')(date);
                }}
              />

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Capacity"
                  placeholder="Enter capacity"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.capacity}
                  onChangeText={handleChange('capacity')}
                  onBlur={handleBlur('capacity')}
                  errorText={errors.capacity}
                  touched={touched.capacity}
                  keyboardType="decimal-pad"
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Entry fee"
                  placeholder="Enter entry fee"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.entryFee}
                  onChangeText={handleChange('entry_fee')}
                  onBlur={handleBlur('entry_fee')}
                  errorText={errors.entryFee}
                  touched={touched.entryFee}
                  keyboardType="decimal-pad"
                />
              </View>

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Resident dj"
                  placeholder="Enter resident dj"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.residentDj}
                  onChangeText={handleChange('resident_dj')}
                  onBlur={handleBlur('resident_dj')}
                  errorText={errors.residentDj}
                  touched={touched.residentDj}
                />
              </View>

              <View>
                <TButton
                  title="Update"
                  titleStyle={tw`font-RobotoBold text-base`}
                  containerStyle={tw`mt-5 bg-primary rounded-lg w-full h-12 `}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
                <TButton
                  title="Delete"
                  titleStyle={tw`font-RobotoBold text-red-500 text-base`}
                  containerStyle={tw`mt-5 bg-transparent border border-red-500 rounded-lg w-full h-12 `}
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

export default EventCreate;
