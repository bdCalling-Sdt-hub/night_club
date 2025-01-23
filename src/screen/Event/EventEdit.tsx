import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCalendarGay,
  IconCloseGray,
  IconDownArrayGray,
  IconPlusGray,
} from '../../icons/icons';
import {BaseColor, PrimaryColor} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import moment from 'moment';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useToast} from '../../components/modals/Toaster';
import {IEvent} from '../../firebase/database/events.doc';
import {IVenue} from '../../firebase/database/venues.doc';
import {uploadFileToFirebase} from '../../firebase/uploadFileToFirebase';
import {useMediaPicker} from '../../hook/useMediaPicker';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const EventCreate = ({navigation, route}: NavigProps<{item: IEvent}>) => {
  const {showToast, closeToast} = useToast();
  const [open, setOpen] = React.useState({
    openTime: false,
    closeTime: false,
  });

  const [imageUpdateLoad, setImageUpdateLoad] = React.useState(false);
  const [allVenues, setAllVenues] = React.useState<IVenue[]>([]);

  const handleImageUpdate = async () => {
    setImageUpdateLoad(true);
    const image = await useMediaPicker({
      mediaType: 'photo',
      selectionLimit: 1,
      option: 'library',
    });
    if (!image) {
      setImageUpdateLoad(false);
      return;
    }

    const imageUrl = await uploadFileToFirebase(image[0]);
    setImageUpdateLoad(false);
    return imageUrl;
  };

  const handleDeleteEvent = () => {
    firestore()
      .collection('Events')
      .doc(route?.params?.item.id)
      .delete()
      .then(() => {
        showToast({
          title: 'success',
          content: 'Event deleted successfully',
          onPress: () => {
            (navigation as any)?.pop(2) && navigation?.goBack();
            closeToast();
          },
        });
      });
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
    if (!values.entry_fee) {
      errors.entry_fee = 'Required';
    }

    if (!values.resident_dj) {
      errors.resident_dj = 'Required';
    }

    return errors;
  };

  React.useEffect(() => {
    const venues = async () => {
      const venues = await firestore().collection('Venues').get();
      setAllVenues(venues.docs.map(doc => doc.data() as IVenue));
    };
    venues();
  }, []);

  // console.log(allVenues);

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle title="Edit event" onPress={() => navigation?.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={route?.params?.item}
          onSubmit={values => {
            // console.log(values);
            firestore()
              .collection('Events')
              .doc(values.id)
              .update(values)
              .then(() => {
                showToast({
                  title: 'success',
                  content: 'Event updated successfully',
                  onPress: () => {
                    (navigation as any)?.pop(2);
                    closeToast();
                  },
                });
              });
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
                  Add event image
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
                      isLoading={imageUpdateLoad}
                      onPress={async () => {
                        const image = await handleImageUpdate();
                        // console.log('pressed');
                        // console.log(image);
                        // handleBlur('image');
                        image && handleChange('image')(image);
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
                      value={
                        allVenues?.find(item => item.id === values.venue)?.name
                      }
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
                        <SvgXml xml={IconCloseGray} height={20} width={20} />
                      </TouchableOpacity>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  items={allVenues?.map(item => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  })}
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
                label="Start time"
                placeholder="Please select start time"
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
                label="End time"
                placeholder="Please select end time"
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
                  label="Resident dj"
                  placeholder="Enter resident dj"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.resident_dj}
                  onChangeText={handleChange('resident_dj')}
                  onBlur={handleBlur('resident_dj')}
                  errorText={errors.resident_dj}
                  touched={touched.resident_dj}
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
                  onPress={handleDeleteEvent}
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
