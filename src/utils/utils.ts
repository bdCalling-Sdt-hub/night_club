// devices screen size

import {Alert, Dimensions, Linking, PixelRatio, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {MMKVLoader} from 'react-native-mmkv-storage';

export const PrimaryColor = '#55AACA';
export const BaseColor = '#071115';
export const lStorage = new MMKVLoader().initialize();
export const Android = Platform.OS === 'android';

export const Ios = Platform.OS === 'ios';

export const ApiUrl = 'https://us-central1-nightclubapp.cloudfunctions.net/';
export const WebUrl = 'https://nightclubapp.web.app/';

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
  const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE); // Change for iOS if needed

  if (result === RESULTS.GRANTED) {
    return true;
  } else if (result === RESULTS.DENIED) {
    filRequestPermission(); // 🔄 Keep requesting
  } else if (result === RESULTS.BLOCKED) {
    Alert.alert(
      'Permission Needed',
      'This feature requires files access. Please enable it in settings.',
      [
        {text: 'Go to Settings', onPress: () => Linking.openSettings()},
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
        },
      ],
    );
  }
};
