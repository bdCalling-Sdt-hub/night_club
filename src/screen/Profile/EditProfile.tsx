import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import AniImage from '../../components/animate/AniImage';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {IconImage} from '../../icons/Special.icon';
import {IconPenCyan} from '../../icons/icons';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {uploadFileToFirebase} from '../../firebase/uploadFileToFirebase';
import {useAuth} from '../../context/AuthProvider';
import {useFireAuth} from '../../firebase/useFireAuth';
import {useMediaPicker} from '../../hook/useMediaPicker';
import {useToast} from '../../components/modals/Toaster';

const EditProfile = ({navigation}: NavigProps<null>) => {
  const {user, setUser} = useAuth();
  const {UpdateCurrentUser} = useFireAuth();
  const [image, setImage] = React.useState<any>(
    user?.photoURL ? {uri: user?.photoURL} : null,
  );
  const [imageLoading, setImageLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(user?.name || '');
  const {closeToast, showToast} = useToast();

  const handleImage = async (type: 'camera' | 'library') => {
    try {
      setImageLoading(true);
      if (type === 'camera') {
        const image = await useMediaPicker({
          option: 'camera',
          mediaType: 'photo',
        });
        const url = await uploadFileToFirebase(image![0]);
        setImageLoading(false);
        return setImage({uri: url});
      }

      const image = await useMediaPicker({
        option: 'library',
        mediaType: 'photo',
      });

      const url = await uploadFileToFirebase(image![0]);
      setImageLoading(false);
      return setImage({uri: url});
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('hit');
      setLoading(true);

      UpdateCurrentUser(name || '', image?.uri || '').then(res => {
        if (res) {
          setUser({...user, name: name, photoURL: image?.uri});
          setLoading(false);
          showToast({
            title: 'Successfully',
            content: 'Your profile updated successfully',
            onPress: () => {
              navigation.goBack();
              closeToast();
            },
          });
        }
      });
      setLoading(false);
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
            {imageLoading ? (
              <ActivityIndicator color={PrimaryColor} size={'small'} />
            ) : image ? (
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
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={tw`px-4 my-12 gap-3 `}>
          <TButton
            isLoading={loading}
            title="Update"
            containerStyle={tw``}
            onPress={() => handleUpdate()}
          />
          <TButton
            isLoading={loading}
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
