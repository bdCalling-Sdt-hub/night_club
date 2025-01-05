import {ScrollView, Text, View} from 'react-native';
import {IconMultiUserCyan, IconShearCyan} from '../../icons/icons';

import Clipboard from '@react-native-clipboard/clipboard';
import {firebase} from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import AniImage from '../../components/animate/AniImage';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import TButton from '../../components/buttons/TButton';
import {useToast} from '../../components/modals/Toaster';
import {IEvent} from '../../firebase/database/events.doc';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {height} from '../../utils/utils';
import Background from '../components/Background';

const VenuesDetails = ({navigation, route}: NavigProps<{id: string}>) => {
  const {closeToast, showToast} = useToast();

  const [event, setEvent] = React.useState<IEvent>();

  // Handle scroll and update the current page

  const handleShearPress = () => {
    showToast({
      title: 'Share link:',
      content: 'https://www.freepik.com/search?format=sear.........',
      contentStyle: tw`text-blue-400 `,
      buttonStyle: tw`bg-primary w-1/3 self-center`,
      buttonText: 'Copy link',
      buttonTextStyle: tw`text-white font-RobotoBlack text-sm`,
      onPress() {
        Clipboard.setString('hello world');
        closeToast();
      },
    });
  };

  // console.log('route', route?.params?.id);

  useFocusEffect(() => {
    if (route?.params?.id) {
      firebase
        .firestore()
        .collection('Events')
        .doc(route?.params?.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            setEvent(doc.data() as IEvent);
          } else {
            console.log('No such document!');
          }
        });
    }
  });

  // console.log(event);

  return (
    <Background style={tw`flex-1`}>
      <BackWithComponent
        title={event?.name}
        onPress={() => navigation?.goBack()}
        ComponentBtn={
          <IButton
            onPress={handleShearPress}
            containerStyle={tw`justify-end items-center bg-transparent  p-1 w-10`}
            svg={IconShearCyan}
          />
        }
        containerStyle={tw`justify-between`}
      />

      <ScrollView keyboardShouldPersistTaps="always">
        {/*================= View or image part ==================  */}

        <View style={tw`mx-4 my-2`}>
          {event?.image && (
            <AniImage
              imageStyle={tw`w-full h-[${
                height * 0.04
              }] self-center rounded-lg overflow-hidden `}
              source={{uri: event?.image}}
              containerStyle={tw`opacity-60`}
            />
          )}
        </View>

        <View
          style={tw`bg-secondary50 h-32 gap-1 mx-4 rounded-lg mt-4 mb-2 justify-center items-center`}>
          <View
            style={tw`h-12 w-12 bg-secondary rounded-full justify-center items-center`}>
            <SvgXml width={20} height={20} xml={IconMultiUserCyan} />
          </View>
          <Text style={tw`text-white50 text-base font-RobotoBold`}>
            Total RSVP guests
          </Text>
          <Text style={tw`text-white50 text-base font-RobotoBold`}>
            {event?.capacity}
          </Text>
        </View>

        {/*============================ Clubs Details parts here ==================== */}

        <View style={tw`px-4 mb-1 mt-4 gap-3`}>
          <Text style={tw`text-white60`}>{event?.description}</Text>
        </View>
        {/*=================== Accounts parts =============== */}
        <View style={tw`px-4 gap-5 mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Date:
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {moment(event?.date).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Start time:
            </Text>
            {event?.start_time && (
              <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
                {moment(event?.start_time).format('hh:mm A')}
              </Text>
            )}
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              End time:
            </Text>
            {event?.end_time && (
              <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
                {moment(event?.end_time).format('hh:mm A')}
              </Text>
            )}
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Capacity:
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {event?.capacity}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Entry fee:
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {event?.entry_fee}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Booked DJs:
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {event?.resident_dj}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Free entry:
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {event?.entry_fee === 'Free' ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        {/*====================== actions ====================== */}
        <View style={tw`px-4 py-10 gap-5`}>
          <TButton
            onPress={() => {
              navigation?.navigate('VenueGuestList');
            }}
            title="View Guest List"
            titleStyle={tw`text-base text-white50 font-RobotoBold`}
            containerStyle={tw`bg-primary p-0 h-12 rounded-lg items-center w-full `}
          />
          <TButton
            onPress={() => {
              navigation?.navigate('EventEdit', {item: event});
            }}
            title="Edit"
            titleStyle={tw`text-base text-primary font-RobotoBold`}
            containerStyle={tw`bg-transparent border-primary border-2 p-0 h-12 rounded-lg items-center w-full `}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default VenuesDetails;
