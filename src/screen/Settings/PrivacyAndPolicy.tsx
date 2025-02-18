import {ScrollView, useWindowDimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import GLoading from '../../components/loader/GLoading';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const PrivacyAndPolicy = ({navigation}: NavigProps<any>) => {
  const [privacyPolicy, setPrivacyPolicy] = React.useState<any>();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};
    // Cleanup the listener on  component unmount
    const query = firestore().collection('Setting').doc('privacy_policy');
    unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot?.data();
        data && setPrivacyPolicy(data);
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
      <GLoading loading={loading} setLoading={setLoading} />
    </Background>
  );
};

export default PrivacyAndPolicy;
