import {ScrollView, Text, View} from 'react-native';

import AniImage from '../../components/animate/AniImage';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import tw from '../../lib/tailwind';

const News = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="News" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={tw`gap-10`}>
        <View style={tw`px-4 gap-2`}>
          <AniImage
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/5882/b576/8692f8fe724444d0ec5a7d897364586e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hA2MxVrJ~rThtarBWuU0SIzTbrAD2sS42MkJN5iLXVlkivFd94YMr9n88L-SSpSbZbozIhhBh4rLbLUHLuOU8sgYMn2Y8qLc96AwvJLEWuiBMFIq7Jk4Ar5g-aYqxMB~G-siMW973c7obPuTCtKsrYLCTNzyRzWQjs3115lJBDDV9qUZVlkZZxR32IFhsChfG~HN0nhiuOkKHPgRCDUVI8G1hcbzbc7a1Q4x0FnzyPEnF3ln22VgMPdRhrTOkUO2mYFSEBitpsukN1fS-4NQcCunU~f0oJlG5eSfMqeom-SFXNMsPbywi7V8bD9f4vXYi~qY~INyhL35mj2J~Mlv1g__',
            }}
            imageStyle={tw`aspect-video w-full`}
          />
          <Text style={tw`text-sm text-white60 font-RobotoRegular`}>
            Lorem ipsum dolor sit amet consectetur. Et etiam dui facilisi
            malesuada amet nam tincidunt. Lobortis nulla feugiat penatibus
            pulvinar eget quam. Magna et est nascetur ac id. Turpis vehicula
            orci pellentesque vehicula nunc interdum quis turpis. Turpis
            vehicula orci pellentesque vehicula nunc interdum quis turpis.
          </Text>
        </View>
        <View style={tw`px-4 gap-2`}>
          <AniImage
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/5882/b576/8692f8fe724444d0ec5a7d897364586e?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hA2MxVrJ~rThtarBWuU0SIzTbrAD2sS42MkJN5iLXVlkivFd94YMr9n88L-SSpSbZbozIhhBh4rLbLUHLuOU8sgYMn2Y8qLc96AwvJLEWuiBMFIq7Jk4Ar5g-aYqxMB~G-siMW973c7obPuTCtKsrYLCTNzyRzWQjs3115lJBDDV9qUZVlkZZxR32IFhsChfG~HN0nhiuOkKHPgRCDUVI8G1hcbzbc7a1Q4x0FnzyPEnF3ln22VgMPdRhrTOkUO2mYFSEBitpsukN1fS-4NQcCunU~f0oJlG5eSfMqeom-SFXNMsPbywi7V8bD9f4vXYi~qY~INyhL35mj2J~Mlv1g__',
            }}
            imageStyle={tw`aspect-video w-full`}
          />
          <Text style={tw`text-sm text-white60 font-RobotoRegular`}>
            Lorem ipsum dolor sit amet consectetur. Et etiam dui facilisi
            malesuada amet nam tincidunt. Lobortis nulla feugiat penatibus
            pulvinar eget quam. Magna et est nascetur ac id. Turpis vehicula
            orci pellentesque vehicula nunc interdum quis turpis. Turpis
            vehicula orci pellentesque vehicula nunc interdum quis turpis.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
};

export default News;
