import {ScrollView, Text, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import InputTextWL from '../../components/inputs/InputTextWL';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useAuth} from '../../context/AuthProvider';
import {useToast} from '../../components/modals/Toaster';

const Support = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const [laoding, setLoading] = React.useState(false);

  const {user} = useAuth();
  const [content, setContent] = React.useState<string>('');

  const onSubmit = async () => {
    setLoading(true);
    if (content.trim().length < 50) {
      showToast({
        title: 'Warning',
        content: 'Support topic must be at least 50 characters long.',
        onPress: () => {
          closeToast();
        },
      });
      return;
    }

    try {
      const response = await fetch(
        'http://10.0.80.14:5001/pushnotifiation-d1bcb/us-central1/support?',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user?.email,
            content,
          }),
        },
      );
      const data = await response.json();
      // console.log(data);

      if (data?.success) {
        setLoading(false);
        showToast({
          title: 'Success',
          content: 'Support message sent successfully',
          onPress: () => {
            closeToast();
          },
        });
      }
    } catch (err) {
      setLoading(false);
      showToast({
        title: 'Warning',
        content: err?.message,
        onPress: () => {
          closeToast();
        },
      });

      console.log('ERROR', err);
    }
  };

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="Support" onPress={() => navigation.goBack()} />
      <ScrollView keyboardShouldPersistTaps="always" style={tw`px-4 mb-6 mt-2`}>
        <InputTextWL
          label="Write support topic"
          placeholder="Enter support topic"
          multiline
          verticalAlign="top"
          // textAlign="center"
          onChangeText={text => setContent(text)}
          textAlignVertical="top"
          numberOfLines={30}
          containerStyle={tw` h-[300px] pt-2 rounded-lg border-[1px] border-transparent`}
          focusSTyle={tw`border-primary`}
        />
        <Text style={tw`text-right mt-2 text-gray-600`}>
          {content.length} characters typed
        </Text>
      </ScrollView>
      <View style={tw`px-4 py-2`}>
        <TButton onPress={onSubmit} title="Send" />
      </View>
    </Background>
  );
};

export default Support;
