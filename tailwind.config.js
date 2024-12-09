const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    screens: {
      sm: '300px',
      md: '400px',
      lg: '880px',
      tablet: '1024px',
    },
    extend: {
      fontFamily: {
        // poppins fonts
        PoppinsBlack: 'PoppinsBlack',
        PoppinsBlackItalic: 'PoppinsBlackItalic',
        PoppinsBold: 'PoppinsBold',
        PoppinsBoldItalic: 'PoppinsBoldItalic',
        PoppinsExtraBold: 'PoppinsExtraBold',
        PoppinsExtraBoldItalic: 'PoppinsExtraBoldItalic',
        PoppinsExtraLight: 'PoppinsExtraLight',
        PoppinsExtraLightItalic: 'PoppinsExtraLightItalic',
        PoppinsItalic: 'PoppinsItalic',
        PoppinsLight: 'PoppinsLight',
        PoppinsLightItalic: 'PoppinsLightItalic',
        PoppinsMedium: 'PoppinsMedium',
        PoppinsMediumItalic: 'PoppinsMediumItalic',
        PoppinsRegular: 'PoppinsRegular',
        PoppinsSemiBold: 'PoppinsSemiBold',
        PoppinsSemiBoldItalic: 'PoppinsSemiBoldItalic',
        PoppinsThin: 'PoppinsThin',
        PoppinsThinItalic: 'PoppinsThinItalic',
        // You can replace 'YourCustomFont' with your desired font
        // Nunito fonts
        NunitoSansBlack: 'NunitoSansBlack',
        NunitoSansBold: 'NunitoSansBold',
        NunitoSansExtraBold: 'NunitoSansExtraBold',
        NunitoSansExtraLight: 'NunitoSansExtraLight',
        NunitoSansLight: 'NunitoSansLight',
        NunitoSansMedium: 'NunitoSansMedium',
        NunitoSansRegular: 'NunitoSansRegular',
        NunitoSansSemiBold: 'NunitoSansSemiBold',

        // roboto
        RobotoBlack: 'Roboto-Black',
        RobotoBlackItalic: 'Roboto-BlackItalic',
        RobotoBold: 'Roboto-Bold',
        RobotoBoldItalic: 'Roboto-BoldItalic',
        RobotoItalic: 'Roboto-Italic',
        RobotoLight: 'Roboto-Light',
        RobotoLightItalic: 'Roboto-LightItalic',
        RobotoMedium: 'Roboto-Medium',
        RobotoMediumItalic: 'Roboto-MediumItalic',
        RobotoRegular: 'Roboto-Regular',
        RobotoThin: 'Roboto-Thin',
        RobotoThinItalic: 'Roboto-ThinItalic',
      },

      colors: {
        text14: '14px',
        text16: '16px',
        primary50: 'rgba(85, 170, 202, 0.2)',
        primary100: '#99CCDF',
        primary500: '#55AACA',
        primary: '#55AACA',
        primary900: '#323D76',
        secondary: 'rgba(136, 136, 136, 0.3)',
        secondary500: 'rgba(136, 136, 136, 0.3)',
        success600: '#5BB659',

        Warning500: '#EAD852',
        base: '#071115',
        baseCircle: 'rgba(174, 234, 0, 0.2)',
        baseCircleTwo: 'rgba(85, 170, 202, 0.2)',
        danger600: '#DC3545',
        danger50: '#FEF2F2',

        black50: '#F6F6F6',
        black60: '#FFFFFF99',
        black100: '#E7E7E7',
        black200: '#D1D1D1',
        black400: '#888888',
        black500: '#5D5D5D',
        black600: '#5D5D5D',
        black800: '#454545',
        black900: '#333333',
        black950: '#262626',
        black1000: '#1D1929',

        white50: '#F6F6F6',
        white100: '#E7E7E7',
        white200: '#D1D1D1',
        white400: '#888888',
        white500: '#5D5D5D',
        white600: '#5D5D5D',
        white800: '#454545',
        white900: '#333333',
        white1000: '#1D1929',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
