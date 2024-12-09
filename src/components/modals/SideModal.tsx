import {Pressable, View} from 'react-native';
import {Dialog, PanningProvider} from 'react-native-ui-lib';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconClose} from '../../icons/icons';
import tw from '../../lib/tailwind';
import {Android} from '../../utils/utils';

interface SideModalProps {
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  layerContainerStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  scrollable?: boolean;
  headerOff?: boolean;
  closeBTN?: boolean;
}

const SideModal = ({
  children,
  containerStyle,
  setVisible,
  visible,
  headerOff,
  closeBTN,
}: SideModalProps) => {
  const [layoutHight, setLayoutHight] = React.useState<number>();
  // console.log(layoutHight, height * 0.8);

  const header = !headerOff && {
    ...{
      renderPannableHeader: () => (
        <View style={tw`h-[4%] mt-[2%] items-center justify-center`}>
          <View style={tw`bg-gray-300 h-1 w-20 rounded-full self-center`} />
        </View>
      ),
    },
  };

  return (
    <>
      {visible && (
        <Dialog
          width={'100%'}
          // height={Ios ? height - height * 0.4 : '100%'}
          ignoreBackgroundPress={false}
          visible={visible || false}
          bottom={true}
          onDismiss={() => setVisible && setVisible(false)}
          panDirection={PanningProvider.Directions.DOWN}
          containerStyle={tw` z-20 bg-base rounded-t-2xl  ${
            Android ? 'mt-[2%]' : 'mt-20'
          } `}
          {...header}>
          <Pressable
            onLayout={e => {
              setLayoutHight(e.nativeEvent.layout.height);
            }}
            disabled
            style={[
              tw`${!headerOff ? 'max-h-[95%]' : 'max-h-[100%]'}`,
              containerStyle,
            ]}>
            {/* close button  */}
            <View>
              {headerOff && closeBTN && (
                <View style={tw`bg-white absolute top-3 right-3 z-50`}>
                  <Pressable
                    style={tw`p-2 bg-gray-200 rounded-full`}
                    onPress={() => setVisible && setVisible(false)}>
                    <View style={tw`self-end`}>
                      <SvgXml xml={IconClose} />
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
            {children}
          </Pressable>
        </Dialog>
      )}
    </>
  );
};

export default SideModal;
