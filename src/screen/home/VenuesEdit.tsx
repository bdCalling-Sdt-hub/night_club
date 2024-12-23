import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconPlusGray,
} from '../../icons/icons';
import {BaseColor, PrimaryColor} from '../../utils/utils';

import {Formik} from 'formik';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Picker} from 'react-native-ui-lib';
import Video from 'react-native-video';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useMediaPicker} from '../../hook/useMediaPicker';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

interface createProps {
  name: string;
  location: string;
  description: string;
  image: any;
  video?: any;
  nightclubManager?: string;
  openingTime: string;
  closingTime: string;
  capacity: string;
  bars: string;
  danceFloor: string;
  residentDj: string;
}

const VenuesEdit = ({navigation}: NavigProps<null>) => {
  const handleVideoUpdate = async () => {
    // console.log(values);

    try {
      const Video = await useMediaPicker({
        option: 'library',
        mediaType: 'video',
        selectionLimit: 1,
      });

      return Video[0];
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpdate = async () => {
    // console.log(values);

    const image = await useMediaPicker({
      option: 'library',
      mediaType: 'photo',
      selectionLimit: 1,
    });

    return image[0];
  };

  const handleValidate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.location) {
      errors.location = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.image) {
      errors.image = 'Required';
    }
    if (!values.video) {
      errors.video = 'Required';
    }
    if (!values.openingTime) {
      errors.openingTime = 'Required';
    }
    if (!values.nightclubManager) {
      errors.nightclubManager = 'Required';
    }
    if (!values.closingTime) {
      errors.closingTime = 'Required';
    }
    if (!values.capacity) {
      errors.capacity = 'Required';
    }
    if (!values.bars) {
      errors.bars = 'Required';
    }
    if (!values.danceFloor) {
      errors.danceFloor = 'Required';
    }
    if (!values.residentDj) {
      errors.residentDj = 'Required';
    }
    if (!values.status) {
      errors.status = 'Required';
    }

    return errors;
  };

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle title="Edit" onPress={() => navigation?.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={{
            name: '',
            location: '',
            description: '',
            image: null,
            video: null,
            openingTime: '',
            closingTime: '',
            capacity: '',
            bars: '',
            danceFloor: '',
            nightclubManager: '',
            residentDj: '',
            status: '',
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
              <View style={tw` bg-secondary rounded-lg px-3`}>
                <Text style={tw`text-white font-RobotoBold text-sm py-2`}>
                  Add venue video
                </Text>
                <View
                  style={tw`border border-white60 h-28 rounded-lg border-dashed justify-center items-center my-3`}>
                  {values.video ? (
                    <View style={tw`flex-row justify-between items-center`}>
                      <Video
                        muted={false}
                        // controls
                        repeat
                        resizeMode="cover"
                        style={tw`w-[96%] h-24 self-center rounded-lg overflow-hidden`}
                        source={{uri: values.video}}
                      />
                      <IButton
                        onPress={() => {
                          handleChange('video')('');
                        }}
                        svg={IconCloseGray}
                        containerStyle={tw`absolute  top-0 right-0 w-8 h-8 bg-secondary rounded-full  justify-center items-center`}
                      />
                    </View>
                  ) : (
                    <IwtButton
                      onPress={async () => {
                        const video = await handleVideoUpdate();
                        // console.log('pressed');
                        // console.log(video);
                        // handleBlur('video');
                        video && handleChange('video')(video?.uri);
                      }}
                      containerStyle={tw`bg-transparent border border-primary  w-48 h-10 p-0 justify-center items-center rounded-lg gap-5`}
                      svg={IconPlusGray}
                      titleStyle={tw`text-white font-RobotoBold text-sm`}
                      title="Upload video"
                    />
                  )}
                </View>
                {errors.video && touched.video && (
                  <Text style={tw`text-red-500 text-xs pb-2 self-end`}>
                    {errors.video}
                  </Text>
                )}
              </View>
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

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Venue name"
                  placeholder="Enter venue full name"
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
                  label="Venue description"
                  placeholder="Describe venue information"
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
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Venue location"
                  placeholder="Enter venue location name"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.location}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  errorText={errors.location}
                  touched={touched.location}
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Opening time"
                  placeholder="Enter opening time"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.openingTime}
                  onChangeText={handleChange('openingTime')}
                  onBlur={handleBlur('openingTime')}
                  errorText={errors.openingTime}
                  touched={touched.openingTime}
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Closing time"
                  placeholder="Enter closing time"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.closingTime}
                  onChangeText={handleChange('closingTime')}
                  onBlur={handleBlur('closingTime')}
                  errorText={errors.closingTime}
                  touched={touched.closingTime}
                />
              </View>
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
                  label="Bars"
                  placeholder="Enter bars count"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.bars}
                  onChangeText={handleChange('bars')}
                  onBlur={handleBlur('bars')}
                  errorText={errors.bars}
                  touched={touched.bars}
                  keyboardType="decimal-pad"
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Dance floors"
                  placeholder="Enter dance floors count"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.danceFloor}
                  onChangeText={handleChange('danceFloor')}
                  onBlur={handleBlur('danceFloor')}
                  errorText={errors.danceFloor}
                  touched={touched.danceFloor}
                  keyboardType="decimal-pad"
                />
              </View>
              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Resident dj"
                  placeholder="Enter dance floors count"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.residentDj}
                  onChangeText={handleChange('residentDj')}
                  onBlur={handleBlur('residentDj')}
                  errorText={errors.residentDj}
                  touched={touched.residentDj}
                />
              </View>
              <View style={tw`bg-base `}>
                <Picker
                  useSafeArea
                  value={values.nightclubManager}
                  onChange={handleChange('nightclubManager')}
                  onBlur={handleBlur('nightclubManager')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      value={values.nightclubManager}
                      editable={false}
                      label="Nightclub manager"
                      placeholder="select nightclub manager"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.nightclubManager}
                      touched={touched.nightclubManager}
                    />
                  )}
                  renderItem={(value, items) => {
                    return (
                      <View
                        // onPress={() => setValue(value)}
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
                  paddingH
                  items={[
                    {label: 'Badhenke', value: 'Badhenke'},
                    {label: 'Alexjender', value: 'Alexjender'},
                    {label: 'Arif Biswas', value: 'Arif Biswas'},
                  ]}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
                />
              </View>
              <View style={tw`bg-base `}>
                <Picker
                  useSafeArea
                  value={values.status}
                  onChange={handleChange('status')}
                  onBlur={handleBlur('status')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      editable={false}
                      value={values.status}
                      label="Status"
                      placeholder="Select status"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.status}
                      touched={touched.status}
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
                  paddingH
                  items={[
                    {label: 'Open', value: 'Open'},
                    {label: 'Closed', value: 'Closed'},
                  ]}
                  pickerModalProps={{
                    overlayBackgroundColor: BaseColor,
                  }}
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

export default VenuesEdit;
