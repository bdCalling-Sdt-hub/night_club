import {ScrollView, Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {Formik} from 'formik';
import {IconPlusGray} from '../../icons/icons';
import InputTextWL from '../../components/inputs/InputTextWL';
import IwtButton from '../../components/buttons/IwtButton';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

interface createProps {
  name: string;
  location: string;
  description: string;
  image: string;
  video?: string;
  openingTime: string;
  closingTime: string;
  capacity: string;
  bars: string;
  danceFloor: string;
  residentDj: string;
}

const VenueCreate = ({navigation}: NavigProps<null>) => {
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

    return errors;
  };

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle title="Edit Venues" onPress={() => navigation?.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={{
            name: '',
            location: '',
            description: '',
            image: '',
            video: '',
            openingTime: '',
            closingTime: '',
            capacity: '',
            bars: '',
            danceFloor: '',
            residentDj: '',
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
                <Text style={tw`text-white font-RobotoBold text-base py-2`}>
                  Add venue video
                </Text>
                <View
                  style={tw`border border-white60 h-28 rounded-lg border-dashed justify-center items-center my-3`}>
                  <IwtButton
                    onPress={() => {
                      console.log('pressed');
                      handleBlur('video');
                      handleChange('video');
                    }}
                    containerStyle={tw`bg-transparent border border-primary shadow-none w-48 h-10 p-0 justify-center items-center rounded-lg gap-5`}
                    svg={IconPlusGray}
                    titleStyle={tw`text-white font-RobotoBold text-base`}
                    title="Upload video"
                  />
                </View>
                {errors.video && touched.video && (
                  <Text style={tw`text-red-500 text-xs pb-2 self-end`}>
                    {errors.video}
                  </Text>
                )}
              </View>
              <View style={tw` bg-secondary rounded-lg px-3`}>
                <Text style={tw`text-white font-RobotoBold text-base py-2`}>
                  Add venue image
                </Text>
                <View
                  style={tw`border border-white60 h-20 rounded-lg border-dashed justify-center items-center my-3`}>
                  <IwtButton
                    containerStyle={tw`bg-transparent border border-primary shadow-none w-48 h-10 p-0 justify-center items-center rounded-lg gap-5`}
                    svg={IconPlusGray}
                    titleStyle={tw`text-white font-RobotoBold text-base`}
                    title="Upload image"
                  />
                </View>
                {errors.video && touched.video && (
                  <Text style={tw`text-red-500 text-xs pb-2 self-end`}>
                    {errors.video}
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

export default VenueCreate;
