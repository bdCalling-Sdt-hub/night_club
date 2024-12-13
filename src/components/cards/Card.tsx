import {ActivityIndicator, Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {AnimatedImage} from 'react-native-ui-lib';
import tw from '../../lib/tailwind';

export interface ICardProps {
  children?: React.ReactNode;
  containerStyle?: any;
  cardStyle?: any;
  component?: React.ReactNode;
}

const Card = ({children, cardStyle, component, containerStyle}: ICardProps) => {
  return (
    <View
      style={[
        tw`bg-primary600 p-2 rounded-md flex-row justify-between items-center`,
        cardStyle,
      ]}>
      <View style={[tw``, containerStyle]}>{children}</View>
      <View>{component}</View>
    </View>
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
              tw`aspect-square h-16  items-center rounded-md`,
              containerStyle,
            ]}
            errorSource={source}
            animationDuration={500}
            style={[tw`aspect-square h-16 rounded-md`, imageStyle]}
            loader={<ActivityIndicator color="white" size={'small'} />}
            source={source}
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
    title: string;
    icons: React.ReactNode;
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
        <View style={[tw`justify-start gap-1`, containerStyle]}>
          {data?.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  tw`flex-row items-center gap-1.5`,
                  detailsContainerStyle,
                ]}>
                <SvgXml xml={item.icons} {...svgStyle} />
                <Text
                  numberOfLines={1}
                  style={[
                    tw`text-white font-NunitoSansRegular text-sm`,
                    item.titleStyle,
                  ]}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

export default Card;
