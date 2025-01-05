import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';

import {createThumbnail} from 'react-native-create-thumbnail';
import tw from 'twrnc'; // Assuming you're using tailwind for styling

const VideoThumbnail = ({videoUri}: {videoUri: string}) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (videoUri) {
      createThumbnail({
        url: videoUri,
      })
        .then(response => {
          setThumbnail(response.path); // Set the path of the generated thumbnail
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [videoUri]);

  return (
    <View style={tw`w-[96%] h-24 self-center rounded-lg overflow-hidden`}>
      {thumbnail ? (
        <Image
          source={{uri: thumbnail}}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      ) : (
        <View style={tw`w-full h-full items-center justify-center`}>
          {loading && <ActivityIndicator size="small" color="white" />}
        </View>
      )}
    </View>
  );
};

export default VideoThumbnail;
