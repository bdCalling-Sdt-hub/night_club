import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IconMultiUserCyan, IconShearCyan} from '../../icons/icons';

import Clipboard from '@react-native-clipboard/clipboard';
import {SvgXml} from 'react-native-svg';
import AniImage from '../../components/animate/AniImage';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import TButton from '../../components/buttons/TButton';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {height} from '../../utils/utils';
import Background from '../components/Background';
import EventD from './event_d.json';

const VenuesDetails = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  // Handle scroll and update the current page
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / (height * 0.4)); // Adjust page width based on height
    setCurrentPage(page); // Update current page
  };

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

  return (
    <Background style={tw`flex-1`}>
      <BackWithComponent
        title={EventD.name}
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
          <AniImage
            imageStyle={tw`w-full h-[${
              height * 0.04
            }] self-center rounded-lg overflow-hidden `}
            source={EventD.image}
            containerStyle={tw`opacity-60`}
          />
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
            {EventD.guestlist.current_guest_count}
          </Text>
        </View>

        {/*============================ Clubs Details parts here ==================== */}

        <View style={tw`px-4 mb-1 mt-4 gap-3`}>
          <Text style={tw`text-white60`}>{EventD.description}</Text>
        </View>
        {/*=================== Accounts parts =============== */}
        <View style={tw`px-4 gap-5 mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Date :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.date}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Start time :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.start_time}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              End time :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.end_time}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Capacity :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.capacity}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Entry fee :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.entry_fees}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Booked DJs :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.booked_djs}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-sm font-RobotoRegular`}>
              Free entry :
            </Text>
            <Text style={tw`text-white60 text-sm font-RobotoMedium`}>
              {EventD.guestlist.free_entries}
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
              navigation?.navigate('EventEdit');
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
