import {IconClockCyan, IconLocationV2Cyan} from '../../icons/icons';
import {PrimaryColor, height} from '../../utils/utils';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import AniImage from '../../components/animate/AniImage';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {NavigProps} from '../../interfaces/NaviProps';
import {PageControl} from 'react-native-ui-lib';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import Video from 'react-native-video';
import tw from '../../lib/tailwind';
import venuesD from './vanues_d.json';

const VenuesDetails = ({navigation}: NavigProps<null>) => {
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  // Handle scroll and update the current page
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / (height * 0.4)); // Adjust page width based on height
    setCurrentPage(page); // Update current page
  };

  return (
    <Background style={tw`flex-1`}>
      <BackWithTitle
        title="Venue Details"
        onPress={() => navigation?.goBack()}
      />

      <ScrollView>
        {/*================= View or image part ==================  */}

        <ScrollView
          pagingEnabled
          horizontal
          onScroll={handleScroll} // Handle scroll to update page
          scrollEventThrottle={16} // Throttle scroll for better performance
        >
          <View style={tw`mx-4 my-2`}>
            <Video
              muted={false}
              // controls
              repeat
              style={tw`aspect-video h-[${
                height * 0.058
              }] self-center rounded-lg overflow-hidden`}
              source={venuesD.video}
            />
          </View>
          <View style={tw`mx-4 my-2`}>
            <AniImage
              imageStyle={tw`aspect-video h-[${
                height * 0.058
              }] self-center rounded-lg overflow-hidden`}
              source={venuesD.image}
            />
          </View>
        </ScrollView>

        {/* PageControl to show the current page */}
        <PageControl
          numOfPages={2}
          currentPage={currentPage} // Bind current page from state
          color={PrimaryColor}
          inactiveColor="white"
          enlargeActive
          spacing={5}
          size={4}
          limitShownPages
          containerStyle={tw``}
        />

        {/*============================ Clubs Details parts here ==================== */}

        <View style={tw`px-4 mb-1 mt-4 gap-3`}>
          <Text style={tw`text-white50 font-RobotoBlack text-base `}>
            {venuesD.venues_details.title}
          </Text>

          <View style={tw`gap-3 my-1`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml xml={IconLocationV2Cyan} />
              <Text style={tw`text-white50 text-sm`}>
                {venuesD.venues_details.location}
              </Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml xml={IconClockCyan} />
              <Text style={tw`text-white50 text-sm`}>
                {venuesD.venues_details.time.start} -
                {venuesD.venues_details.time.end}
              </Text>
            </View>
          </View>

          <Text style={tw`text-white60`}>
            {venuesD.venues_details.describe}
          </Text>
        </View>
        {/*=================== Accounts parts =============== */}
        <View style={tw`px-4 gap-5 mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Nightclub manager :
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venuesD.venues_details.nightclub_manager}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Capacity:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venuesD.venues_details.capacity}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Bars:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>3</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Dance floors:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venuesD.venues_details.bars}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Resident dj:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venuesD.venues_details.resident_dj}
            </Text>
          </View>
        </View>

        {/*====================== actions ====================== */}
        <View style={tw`px-4 py-10 gap-5`}>
          <TButton
            onPress={() => {
              navigation?.navigate('VenueEvent');
            }}
            title="See Venues Events"
            titleStyle={tw`text-base text-white50 font-RobotoBold`}
            containerStyle={tw`bg-primary p-0 h-12 rounded-lg items-center w-full `}
          />
          <TButton
            onPress={() => {
              navigation?.navigate('VenueEdit');
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
