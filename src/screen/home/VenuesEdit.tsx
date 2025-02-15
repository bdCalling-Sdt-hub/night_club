import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IUser, IVenue} from '../../firebase/interface';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconPlusGray,
} from '../../icons/icons';
import {ApiUrl, BaseColor, PrimaryColor} from '../../utils/utils';

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
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {uploadFileToFirebase} from '../../firebase/uploadFileToFirebase';
import {useMediaPicker} from '../../hook/useMediaPicker';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import VideoThumbnail from './components/VideoThumbnail';

interface createProps {
  name: string;
  location: string;
  description: string;
  image: any;
  video?: any;
  manager?: string;
  openingTime: string;
  closingTime: string;
  capacity: string;
  bars: string;
  danceFloor: string;
  residentDj: string;
}

const VenueEdit = ({navigation, route}: NavigProps<{item: IVenue}>) => {
  const [loading, setLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const {showToast, closeToast} = useToast();
  const {deleteFireData, updateFireData} = useFireStore();
  const [imageUpdateLoad, setImageUpdateLoad] = React.useState(false);
  const [videoUpdateLoad, setVideoUpdateLoad] = React.useState(false);
  const [allManager, setManger] = React.useState<IUser[]>([]);
  const {userId, user} = useAuth();
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
  const handleVideoUpdate = async () => {
    setVideoUpdateLoad(true);
    const video = await useMediaPicker({
      mediaType: 'video',
      selectionLimit: 1,
      option: 'library',
    });
    if (!video) {
      setVideoUpdateLoad(false);
      return;
    }

    const videoUrl = await uploadFileToFirebase(video[0]);
    setVideoUpdateLoad(false);
    return videoUrl;
  };

  const handleDeleteVenue = () => {
    setLoading(true);
    deleteFireData({
      collectType: 'Venues',
      id: route?.params.item.id as string,
    })
      .then(() => {
        setLoading(false);
        navigation?.goBack();
      })
      .catch(err => {
        setLoading(false);
        showToast({
          title: 'error',
          content: err,
          onPress: () => {
            closeToast();
          },
        });
      });
  };

  const handleValidate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    // if (!values.location) {
    //   errors.location = 'Required';
    // }
    // if (!values.description) {
    //   errors.description = 'Required';
    // }
    // if (!values.image) {
    //   errors.image = 'Required';
    // }
    // if (!values.video) {
    //   errors.video = 'Required';
    // }
    // if (!values.openingTime) {
    //   errors.openingTime = 'Required';
    // }
    // if (!values.manager) {
    //   errors.manager = 'Required';
    // }
    // if (!values.closingTime) {
    //   errors.closingTime = 'Required';
    // }
    // if (!values.capacity) {
    //   errors.capacity = 'Required';
    // }
    // if (!values.bars) {
    //   errors.bars = 'Required';
    // }
    // if (!values.danceFloor) {
    //   errors.danceFloor = 'Required';
    // }
    // if (!values.residentDj) {
    //   errors.residentDj = 'Required';
    // }
    // if (!values.status) {
    //   errors.status = 'Required';
    // }

    return errors;
  };

  const handleLoader = async () => {
    const res = await fetch(
      `${ApiUrl}users?super_owner_id=${
        user?.role === 'super-owner' ? user?.user_id : user?.super_owner_id
      }`,
    );
    const resData = await res.json();
    // console.log(resData?.users);
    setManger(
      resData?.users?.filter((item: IUser) => item?.role === 'manager'),
    );
  };

  React.useEffect(() => {
    handleLoader();
  }, []);

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Edit Venue"
        onPress={
          () => navigation.goBack()
          // (navigation as any)?.replace('VenuesDetails', {
          //   id: route?.params?.item?.id,
          // })
        }
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 pb-12`}>
        <Formik
          initialValues={route?.params?.item}
          onSubmit={(values, {resetForm}) => {
            setLoading(true);
            updateFireData({
              id: route?.params?.item?.id as string,
              collectType: 'Venues',
              data: values,
            })
              .then(() => {
                setLoading(false);
                navigation.goBack();
              })
              .catch(err => {
                setLoading(false);
                showToast({
                  title: 'error',
                  content: err,
                  onPress: () => {
                    closeToast();
                  },
                });
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
              <View style={tw` bg-secondary rounded-lg px-3`}>
                <Text style={tw`text-white font-RobotoBold text-sm py-2`}>
                  Add venue video
                </Text>
                <View
                  style={tw`border border-white60 h-28 rounded-lg border-dashed justify-center items-center my-3`}>
                  {values.video ? (
                    <View style={tw`flex-row justify-between items-center`}>
                      <VideoThumbnail videoUri={values.video} />
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
                      isLoading={videoUpdateLoad}
                      loadingColor="white"
                      onPress={async () => {
                        const video = await handleVideoUpdate();
                        // console.log('pressed');
                        // console.log(video);
                        // handleBlur('video');
                        video && handleChange('video')(video);
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
              <DateTimePicker
                cursorColor={PrimaryColor}
                label="Opening time"
                placeholder="Enter opening time"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                value={
                  values.openingTime
                    ? moment(values.openingTime).format('hh:mm A')
                    : ''
                }
                onChangeText={handleChange('openingTime')}
                onBlur={handleBlur('openingTime')}
                errorText={errors.openingTime}
                touched={touched.openingTime}
                onClear={() => {
                  handleChange('openingTime')('');
                }}
                getCurrentDate={date => {
                  handleChange('openingTime')(date);
                }}
              />
              <DateTimePicker
                value={
                  values.closingTime
                    ? moment(values.closingTime).format('hh:mm A')
                    : ''
                }
                label="Closing time"
                placeholder="Enter closing time"
                containerStyle={tw`border-0 h-12 rounded-lg`}
                onChangeText={handleChange('closingTime')}
                onBlur={handleBlur('closingTime')}
                errorText={errors.closingTime}
                touched={touched.closingTime}
                onClear={() => {
                  handleChange('closingTime')('');
                }}
                getCurrentDate={date => {
                  handleChange('closingTime')(date);
                }}
              />

              <View>
                <InputTextWL
                  cursorColor={PrimaryColor}
                  label="Capacity"
                  placeholder="Enter capacity"
                  containerStyle={tw`border-0 h-12 rounded-lg`}
                  value={values.capacity}
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  keyboardType="numeric"
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
                  placeholder="Enter resident dj"
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
                  value={values.manager}
                  onChange={handleChange('manager')}
                  onBlur={handleBlur('manager')}
                  renderInput={() => (
                    <InputTextWL
                      cursorColor={PrimaryColor}
                      value={
                        allManager.find(item => item?.uid === values.manager)
                          ?.displayName
                      }
                      editable={false}
                      label="Nightclub manager"
                      placeholder="select nightclub manager"
                      containerStyle={tw`h-12 border-0 rounded-lg`}
                      svgSecondIcon={IconDownArrayGray}
                      errorText={errors.manager}
                      touched={touched.manager}
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
                        <SvgXml xml={IconCloseGray} height={20} width={20} />
                      </TouchableOpacity>
                    );
                  }}
                  fieldType={Picker.fieldTypes.filter}
                  paddingH
                  items={allManager.map(item => {
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
                      errorText={errors?.status}
                      touched={touched?.status}
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
                    onPress={handleDeleteVenue}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default VenueEdit;
