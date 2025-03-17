import {Alert, NativeModules, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const {PermissionFileModule} = NativeModules;

export const filRequestPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      // Android 11 and above (API level 30+)
      const results = await PermissionFileModule?.checkAndGrantPermission();

      //   console.log(results);

      return true;
    } else {
      // iOS 10 and below (API level 29+)
      await request(PERMISSIONS.IOS.MEDIA_LIBRARY);

      if (RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'Cannot access photo library without permission.',
        );
        return false;
      }
    }
  } catch (error) {
    console.error('Permission request failed:', error);
    return false;
  }
};
