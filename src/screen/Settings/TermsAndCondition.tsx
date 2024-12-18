import {Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import tw from '../../lib/tailwind';

const TermsAndCondition = ({navigation}: NavigProps<null>) => {
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle
        title="Terms and Condition"
        onPress={() => navigation.goBack()}
      />
      <View style={tw`px-4`}>
        <Text style={tw`text-sm text-white60 font-RobotoRegular text-justify`}>
          Lorem ipsum dolor sit amet consectetur. Ac at nunc et aliquet egestas.
          Mi volutpat libero sit magna scelerisque sit vulputate. Sed aliquam
          ullamcorper tortor ipsum. In eget malesuada odio arcu ligula auctor
          sed. Lorem ipsum dolor sit amet consectetur. Ac at nunc et aliquet
          egestas. Mi volutpat libero sit magna scelerisque sit vulputate. Sed
          aliquam ullamcorper tortor ipsum. In eget malesuada odio arcu ligula
          auctor sed. Lorem ipsum dolor sit amet consectetur. Ac at nunc et
          aliquet egestas. Mi volutpat libero sit magna scelerisque sit
          vulputate. Sed aliquam ullamcorper tortor ipsum. In eget malesuada
          odio arcu ligula auctor sed. Lorem ipsum dolor sit amet consectetur.
          {`\n`}
          {`\n`}
          {`\n`}
          Ac at nunc et aliquet egestas. Mi volutpat libero sit magna
          scelerisque sit vulputate. Sed aliquam ullamcorper tortor ipsum. In
          eget malesuada odio arcu ligula auctor sed. Lorem ipsum dolor sit amet
          consectetur. Ac at nunc et aliquet egestas. Mi volutpat libero sit
          magna scelerisque sit vulputate. Sed aliquam ullamcorper tortor ipsum.
          {`\n`}
          {`\n`}
          In eget malesuada odio arcu ligula auctor sed.Lorem ipsum dolor sit
          amet consectetur. Ac at nunc et aliquet egestas. Mi volutpat libero
          sit magna scelerisqla auctor sed.Lorem ipsum dolor sit amet
          consectetur. Ac at nunc et aliquet egestas. Mi volutpat liberper
          tortor ipsum. In eget malesuada odio arcu ligula auctor sed. Lorem
          ipsum dolor sit amet consectetur. Ac at nunc et aliquet egestas. Mi
          volutpat libero sit magna scelerisque sit vulputate. Sed aliquam
          ullamcorper tortor ipsum. In eget malesuada odio arcu ligula auctor
          sed.Lorem ipsum dolor sit amet consectetur.
          {`\n`}
          {`\n`}
          Ac at nunc et aliquet egestas. Mi volutpat libero sit magna
          scelerisqla auctor sed.Lorem ipsum dolor sit amet consectetur. Ac at
          nunc et aliquet egestas. Mi volutpat liberper tortor ipsum. In eget
          malesuada odio arcu ligula auctor sed.
        </Text>
      </View>
    </Background>
  );
};

export default TermsAndCondition;
