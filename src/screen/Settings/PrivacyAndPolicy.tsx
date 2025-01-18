import {ScrollView, useWindowDimensions} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import firestore from '@react-native-firebase/firestore';
import tw from '../../lib/tailwind';

const PrivacyAndPolicy = ({navigation}: NavigProps<null>) => {
  const [privacyPolicy, setPrivacyPolicy] = React.useState<any>();

  React.useEffect(() => {
    let unsubscribe = () => {};
    // Cleanup the listener on  component unmount
    const query = firestore().collection('Setting').doc('privacy_policy');
    unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot?.data();
        data && setPrivacyPolicy(data);
      },
      error => {
        console.log(error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const {width} = useWindowDimensions();
  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle
        title="Privacy Policy"
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={tw` px-4`}>
        {privacyPolicy?.content && (
          <RenderHtml
            contentWidth={width * 0.5}
            source={{
              html: `${privacyPolicy?.content}`,
            }}
          />
        )}
      </ScrollView>
    </Background>
  );
};

export default PrivacyAndPolicy;
