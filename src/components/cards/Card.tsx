import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {AnimatedImage} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

export interface ICardProps {
  children?: React.ReactNode;
  containerStyle?: any;
  cardStyle?: any;
  component?: React.ReactNode;
  onPress?: () => void;
}

const Card = ({
  children,
  cardStyle,
  component,
  containerStyle,
  onPress,
}: ICardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={!onPress}
      onPress={onPress}
      style={[
        tw`bg-primary600 p-2 rounded-md flex-row justify-between items-center`,
        cardStyle,
      ]}>
      <View style={[tw``, containerStyle]}>{children}</View>
      <View>{component}</View>
    </TouchableOpacity>
  );
};

export interface ICardImageProps {
  source: {uri: string};
  containerStyle?: any;
  imageStyle?: any;
  children?: React.ReactNode;
}

Card.Image = ({
  source,
  containerStyle,
  imageStyle,
  children,
}: ICardImageProps) => {
  return (
    <>
      {children ? (
        children
      ) : (
        <>
          <AnimatedImage
            containerStyle={[
              tw`aspect-square   items-center rounded-md`,
              containerStyle,
            ]}
            errorSource={source}
            // onError={e => console.log(e)}
            animationDuration={500}
            style={[tw`aspect-square  rounded-md`, imageStyle]}
            loader={<ActivityIndicator color="white" size={'small'} />}
            source={
              source?.uri
                ? source
                : require('../../assets/images/icons/no_image.png')
            }
          />
        </>
      )}
    </>
  );
};

export interface ICardDetailsProps {
  children?: React.ReactNode;
  containerStyle?: any;
  detailsContainerStyle?: any;
  svgStyle?: any;
  textStyle?: any;
  data?: Array<{
    title?: string;
    icons?: React.ReactNode;
    titleStyle?: any;
  }>;
}

Card.Details = ({
  children,
  data,
  containerStyle,
  detailsContainerStyle,
  svgStyle,
  textStyle,
}: ICardDetailsProps) => {
  return (
    <>
      {children ? (
        children
      ) : (
        <View style={[tw`justify-start  gap-1 `, containerStyle]}>
          {data?.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  tw`flex-row items-center gap-1.5`,
                  detailsContainerStyle,
                ]}>
                {item?.icons && <SvgXml xml={item.icons} {...svgStyle} />}
                {item?.title && (
                  <Text
                    numberOfLines={1}
                    style={[
                      tw`text-white font-NunitoSansRegular text-sm `,
                      item.titleStyle,
                    ]}>
                    {item.title}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

interface CardButtonProps {
  total: number;
  checkedIn: number;
  onPress?: () => void;
}

Card.Button = ({checkedIn, total, onPress}: CardButtonProps) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={checkedIn === total}
        onPress={onPress}
        style={tw`px-2  ${
          checkedIn === total ? 'bg-green-900' : 'bg-green-600'
        } rounded-lg h-10 items-center justify-center`}>
        <Text
          style={tw` ${
            checkedIn === total ? 'text-white400' : 'text-white50'
          }  font-RobotoBlack`}>
          Checked in {checkedIn}/{total}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Card;
