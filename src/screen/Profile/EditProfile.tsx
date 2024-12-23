import {ScrollView, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import AniImage from '../../components/animate/AniImage';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useToast} from '../../components/modals/Toaster';
import {uploadFileToFirebase} from '../../firebase/updateMedia';
import {useMediaPicker} from '../../hook/useMediaPicker';
import {IconImage} from '../../icons/Special.icon';
import {IconPenCyan} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const EditProfile = ({navigation}: NavigProps<null>) => {
  const [image, setImage] = React.useState<any>(null);
  const {closeToast, showToast} = useToast();

  const handleImage = async (type: 'camera' | 'library') => {
    try {
      if (type === 'camera') {
        const image = await useMediaPicker({
          option: 'camera',
          mediaType: 'photo',
        });

        return setImage(image![0]);
      }

      const image = await useMediaPicker({
        option: 'library',
        mediaType: 'photo',
      });

      return setImage(image![0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const url = await uploadFileToFirebase(image);
      console.log(url);
      setImage({uri: url});
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(image);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="always">
        <View>
          {/* <AniImage source={} /> */}
          <View
            style={tw`bg-white100 h-32 w-32 rounded-full self-center mt-12 items-center justify-center`}>
            {image ? (
              <AniImage
                source={{uri: image?.uri}}
                style={tw`h-32 w-32 rounded-full`}
              />
            ) : (
              <SvgXml xml={IconImage} />
            )}

            <TouchableOpacity
              onPress={() => {
                showToast({
                  multipleBTNStyle: tw`flex-col gap-3 `,
                  multipleButton: [
                    {
                      buttonText: 'Camera',
                      buttonStyle: tw`bg-primary800  w-full `,
                      onPress: () => {
                        handleImage('camera');
                        closeToast();
                      },
                    },
                    {
                      buttonText: 'Gallery',
                      onPress: () => {
                        handleImage('library');
                        closeToast();
                      },
                    },
                  ],
                });
              }}
              style={tw`bg-white h-6 w-6 rounded-full self-center mt-4 items-center justify-center absolute bottom-2 right-3`}>
              <SvgXml xml={IconPenCyan} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw` h-12 px-4`}>
          <InputTextWL
            label="Full Name"
            containerStyle={tw`h-12 border-0`}
            placeholder="Enter your Full Name"
          />
        </View>

        <View style={tw`px-4 my-12 gap-3 `}>
          <TButton
            title="Update"
            containerStyle={tw``}
            onPress={() => handleUpdate()}
          />
          <TButton
            title="Cancel"
            containerStyle={tw`bg-transparent border border-red-800`}
            onPress={() => navigation?.goBack()}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default EditProfile;
