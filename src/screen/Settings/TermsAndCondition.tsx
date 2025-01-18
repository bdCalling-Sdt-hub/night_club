import {ScrollView, useWindowDimensions} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import firestore from '@react-native-firebase/firestore';
import tw from '../../lib/tailwind';

const TermsAndCondition = ({navigation}: NavigProps<null>) => {
  const [termsAndCondition, SetTermsAndCondition] = React.useState<any>();

  React.useEffect(() => {
    let unsubscribe = () => {};
    // Cleanup the listener on  component unmount
    const query = firestore().collection('Setting').doc('terms_and_condition');
    unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot?.data();
        data && SetTermsAndCondition(data);
      },
      error => {
        console.log(error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(termsAndCondition?.content);
  const {width} = useWindowDimensions();
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle
        title="Terms and Condition"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={tw` px-4`}>
        {termsAndCondition?.content && (
          <RenderHtml
            contentWidth={width * 0.5}
            source={{
              html: `${termsAndCondition?.content}`,
            }}
          />
        )}
      </ScrollView>
    </Background>
  );
};

export default TermsAndCondition;
