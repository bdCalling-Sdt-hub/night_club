import {Text, TouchableOpacity, View} from 'react-native';

import {IconRightArrayGray} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

interface IBackWithHeader extends NavigProps<null> {
  svgIcon?: any;
  title: string;
  titleStyle?: any;
  containerStyle?: any;
}
const BackWithHeader = ({
  navigation,
  svgIcon,
  title,
  titleStyle,
  containerStyle,
}: IBackWithHeader) => {
  return (
    <View
      style={[tw`px-[4%] py-8 flex-row gap-3 items-center`, containerStyle]}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <SvgXml xml={svgIcon || IconRightArrayGray} />
      </TouchableOpacity>
      <Text
        style={[tw`text-[24px] text-white200 font-RobotoBlack `, titleStyle]}>
        {title}
      </Text>
    </View>
  );
};

export default React.memo(BackWithHeader);
