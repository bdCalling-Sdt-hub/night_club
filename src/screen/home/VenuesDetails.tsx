import {IVenue, getVenue} from '../../firebase/database/venues.doc';
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
import moment from 'moment';
import tw from '../../lib/tailwind';

const VenuesDetails = ({navigation, route}: NavigProps<{id: string}>) => {
  const [venue, setVenue] = useState<IVenue | null>();
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  // Handle scroll and update the current page
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / (height * 0.4)); // Adjust page width based on height
    setCurrentPage(page); // Update current page
  };

  React.useEffect(() => {
    if (route?.params?.id) {
      getVenue(route?.params?.id).then(res => {
        setVenue(res);
      });
    }
  }, [route?.params?.id]);

  // console.log(venues);

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
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll} // Handle scroll to update page
          scrollEventThrottle={16} // Throttle scroll for better performance
          keyboardShouldPersistTaps="always">
          <View style={tw`mx-4 my-2`}>
            {venue?.video && (
              <Video
                muted={false}
                // controls
                repeat
                style={tw`aspect-video h-[${
                  height * 0.058
                }] self-center rounded-lg overflow-hidden`}
                source={{uri: venue?.video}}
              />
            )}
          </View>
          <View style={tw`mx-4 my-2`}>
            {venue?.image && (
              <AniImage
                imageStyle={tw`aspect-video h-[${
                  height * 0.058
                }] self-center rounded-lg overflow-hidden`}
                source={{uri: venue?.image}}
              />
            )}
          </View>
        </ScrollView>

        {/* PageControl to show the current page */}
        <PageControl
          numOfPages={venue?.image && venue?.video ? 2 : 1}
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
            {venue?.name}
          </Text>

          <View style={tw`gap-3 my-1`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml xml={IconLocationV2Cyan} />
              <Text style={tw`text-white50 text-sm`}>{venue?.location}</Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml xml={IconClockCyan} />
              <Text style={tw`text-white50 text-sm`}>
                {moment(venue?.openingTime).format('LT')} -{' '}
                {moment(venue?.closingTime).format('LT')}
              </Text>
            </View>
          </View>

          <Text style={tw`text-white60`}>{venue?.description}</Text>
        </View>
        {/*=================== Accounts parts =============== */}
        <View style={tw`px-4 gap-5 mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Nightclub Manager:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.nightclubManager}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Capacity:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.capacity}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Bars:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.bars}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Dancefloors:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.danceFloor}
            </Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Resident dj:
            </Text>
            <Text style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.residentDj}
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
              navigation?.navigate('VenueEdit', {item: venue});
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
