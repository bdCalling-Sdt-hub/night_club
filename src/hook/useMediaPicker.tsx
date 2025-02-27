import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const useMediaPicker = async ({
  option,
  selectionLimit,
  mediaType,
}: {
  option: 'camera' | 'library';
  mediaType?: 'mixed' | 'photo' | 'video';
  selectionLimit?: number;
}) => {
  try {
    if (option === 'camera') {
      const result = await launchCamera({
        mediaType: mediaType || 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
    if (option === 'library') {
      const result = await launchImageLibrary({
        mediaType: mediaType || 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        selectionLimit: selectionLimit || 1, // Set to 0 for unlimited image selection
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
