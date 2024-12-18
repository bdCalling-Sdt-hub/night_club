import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {Modal} from 'react-native-ui-lib';
import React from 'react';
import tw from '../../lib/tailwind';

interface NormalModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  scrollable?: boolean;
}

const NormalModal = ({
  setVisible,
  visible,
  containerStyle,
  children,
  layerContainerStyle,
  scrollable,
  animationType,
}: NormalModalProps) => {
  return (
    <Modal
      transparent
      useGestureHandlerRootView
      presentationStyle="overFullScreen"
      shouldRasterizeIOS
      enableModalBlur={false}
      useKeyboardAvoidingView
      animationType={animationType}
      overlayBackgroundColor={'rgba(0, 0, 0, 0.5)'}
      visible={visible}
      onBackgroundPress={() => setVisible && setVisible(false)} // Ensure it toggles correctly
    >
      <BlurView
        style={tw`absolute top-0 left-0 right-0 bottom-0`}
        blurType="dark"
        blurAmount={5}
      />
      <TouchableWithoutFeedback onPress={() => setVisible && setVisible(false)}>
        <View
          style={[
            tw`flex-1  justify-center items-center `,
            layerContainerStyle,
          ]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                tw`bg-secondary bg-opacity-10  w-full p-4 rounded-xl`,
                containerStyle,
                tw`tablet:w-[35%]`,
              ]}>
              {scrollable ? (
                <ScrollView
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="always"
                  showsVerticalScrollIndicator={false}>
                  {children}
                </ScrollView>
              ) : (
                children
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default React.memo(NormalModal);
