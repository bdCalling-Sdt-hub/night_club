import {ScrollView, useWindowDimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import GLoading from '../../components/loader/GLoading';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const TermsAndCondition = ({navigation}: NavigProps<any>) => {
  const [termsAndCondition, SetTermsAndCondition] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};
    // Cleanup the listener on  component unmount
    const query = firestore().collection('Setting').doc('terms_and_condition');
    unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot?.data();
        data && SetTermsAndCondition(data);
        setLoading(false);
      },
      error => {
        console.log(error);
        setLoading(false);
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
      <GLoading loading={loading} setLoading={setLoading} />
    </Background>
  );
};

export default TermsAndCondition;
