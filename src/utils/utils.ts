// devices screen size

import {
  Dimensions,
  PermissionsAndroid,
  PixelRatio,
  Platform,
} from 'react-native';

import {MMKVLoader} from 'react-native-mmkv-storage';

export const PrimaryColor = '#55AACA';
export const BaseColor = '#071115';
export const lStorage = new MMKVLoader().initialize();
export const Android = Platform.OS === 'android';

export const Ios = Platform.OS === 'ios';

export const ApiUrl =
  'http://10.0.80.14:5001/pushnotifiation-d1bcb/us-central1/';

export const {width, height} = Dimensions.get('screen');
//  three size like sm md or tablet
const fontScale = PixelRatio.getFontScale();
export const FontSize = (size: number) => size / fontScale;

export const isSmall = () => {
  return width < 375;
};
export const isTablet = () => {
  return width >= 768;
};

export const isMobile = () => {
  return width < 768;
};

function getRandomHashColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Usage:
// const price = formatCurrency(1234.56, 'fr-FR', 'EUR');
// console.log(price); // Output: "1 234,56 €" (French formatting for Euros)

// Call requestPermissions before trying to write to the file
export const filRequestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS does not require runtime permission for file writing.
};
