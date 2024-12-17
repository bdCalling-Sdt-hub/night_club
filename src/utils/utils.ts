// devices screen size

import {Dimensions, PixelRatio, Platform} from 'react-native';

export const PrimaryColor = '#55AACA';
export const BaseColor = '#071115';

export const Android = Platform.OS === 'android';

export const Ios = Platform.OS === 'ios';

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
