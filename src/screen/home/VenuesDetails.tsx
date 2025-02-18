import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {IconClockCyan, IconLocationV2Cyan} from '../../icons/icons';
import {PrimaryColor, height} from '../../utils/utils';

import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {PageControl} from 'react-native-ui-lib';
import Video from 'react-native-video';
import AniImage from '../../components/animate/AniImage';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import TButton from '../../components/buttons/TButton';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {IVenue} from '../../firebase/interface';
import {userAccess} from '../../hook/useAccess';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';

const VenuesDetails = ({navigation, route}: NavigProps<{id: string}>) => {
  const [venue, setVenue] = useState<IVenue | null>();
  const {user} = useAuth();
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [paused, setPaused] = useState(true);
  const isFocused = useIsFocused();
  // Handle scroll and update the current page
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(contentOffsetX / (height * 0.4)); // Adjust page width based on height
    setCurrentPage(page); // Update current page
  };

  const {loadSingleData} = useFireStore();

  useEffect(() => {
    if (route?.params?.id) {
      loadSingleData({
        collectType: 'Venues',
        id: route?.params?.id as string,
        setLoad: setVenue,
      });
    }
  }, [isFocused]);
  // console.log('hit');
  useEffect(() => {
    if (venue?.video) {
      setPaused(false);
    }
    return () => {
      setPaused(true);
    };
  }, [isFocused, venue?.video]);

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
          {venue?.video && (
            <View style={tw`mx-4 my-2`}>
              <Video
                // muted={false}
                // controls
                // controls
                paused={paused}
                resizeMode="cover"
                // onEnd={() => setPaused(true)} // Optional: Pause video on end
                repeat
                renderLoader={() => {
                  return (
                    <View style={tw`flex-1 justify-center items-center`}>
                      <Text
                        style={tw`text-white50 font-RobotoBlack text-base `}>
                        Loading...
                      </Text>
                    </View>
                  );
                }}
                style={tw`aspect-video h-[${
                  height * 0.058
                }] self-center rounded-lg overflow-hidden`}
                source={{uri: venue?.video}}
              />
            </View>
          )}

          {venue?.image && (
            <View style={tw`mx-4 my-2`}>
              <AniImage
                imageStyle={tw`aspect-video h-[${
                  height * 0.058
                }] self-center rounded-lg overflow-hidden`}
                source={{uri: venue?.image}}
              />
            </View>
          )}
        </ScrollView>

        {/* PageControl to show the current page */}
        {venue?.image && venue?.video && (
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
        )}

        {/*============================ Clubs Details parts here ==================== */}

        <View style={tw`px-4 mb-1 mt-4 gap-3`}>
          {venue?.name && (
            <Text style={tw`text-white50 font-RobotoBlack text-base `}>
              {venue?.name}
            </Text>
          )}

          <View style={tw`gap-3 my-1`}>
            {venue?.location && (
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={IconLocationV2Cyan} />
                <Text style={tw`text-white50 text-sm`}>{venue?.location}</Text>
              </View>
            )}
            {venue?.openingTime && venue?.closingTime && (
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml xml={IconClockCyan} />
                <Text style={tw`text-white50 text-sm`}>
                  {moment(venue?.openingTime).format('LT')} -{' '}
                  {moment(venue?.closingTime).format('LT')}
                </Text>
              </View>
            )}
          </View>

          <Text style={tw`text-white60`}>{venue?.description}</Text>
        </View>
        {/*=================== Accounts parts =============== */}
        <View style={tw`px-4 gap-5 mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white50 text-base font-RobotoMedium`}>
              Nightclub Manager:
            </Text>
            <Text
              numberOfLines={1}
              style={tw`text-white60 text-base font-RobotoMedium`}>
              {venue?.manager_name}
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
              navigation?.navigate('VenueEvent', {venueId: venue?.id});
            }}
            title="See Venues Events"
            titleStyle={tw`text-base text-white50 font-RobotoBold`}
            containerStyle={tw`bg-primary p-0 h-12 rounded-lg items-center w-full `}
          />
          {userAccess({GRole: 'upper'}) && (
            <TButton
              onPress={() => {
                navigation?.navigate('VenueEdit', {item: venue});
              }}
              title="Edit"
              titleStyle={tw`text-base text-primary font-RobotoBold`}
              containerStyle={tw`bg-transparent border-primary border-2 p-0 h-12 rounded-lg items-center w-full `}
            />
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default VenuesDetails;
