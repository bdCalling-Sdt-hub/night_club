import {EmailJSResponseStatus, send} from '@emailjs/react-native';
import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import TButton from '../../components/buttons/TButton';
import InputTextWL from '../../components/inputs/InputTextWL';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const Support = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const {user} = useAuth();
  const [content, setContent] = React.useState<string>('');

  const onSubmit = async () => {
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
      await send(
        'service_pt8yu45',
        'template_lvlarjl',
        {
          name: user?.name,
          email: user?.email,
          message: content,
        },
        {
          publicKey: '-sgscKfEcySxIg0BV',
        },
      );

      const response = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: 'service_pt8yu45',
            template_id: 'template_lvlarjl',
            user_id: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
            template_params: {
              name: user?.name,
              email: user?.email,
              message: content,
            },
          }),
        },
      );
      showToast({
        title: 'Success',
        content: 'Support message sent successfully',
        onPress: () => {
          closeToast();
        },
      });
      console.log('SUCCESS!');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EmailJS Request Failed...', err);
        showToast({
          title: 'Warning',
          content: err?.text,
          onPress: () => {
            closeToast();
          },
        });
      }

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
