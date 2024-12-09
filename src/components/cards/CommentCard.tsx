import {Text, TouchableOpacity, View} from 'react-native';

import {ExpandableSection} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import {IComment} from '../../redux/interface/newpaper';
import React from 'react';
import tw from '../../lib/tailwind';
import {useDeleteCommentMutation} from '../../redux/apiSlices/newsFeetSlices';

interface CommentCardProps {
  item: IComment;
  setReply: any;
}
const CommentCard = ({item, setReply}: CommentCardProps) => {
  const [isReply, setIsReply] = React.useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  return (
    <ExpandableSection
      expanded={isReply}
      sectionHeader={
        <View>
          <View style={tw`flex-row gap-4 `}>
            <FastImage
              style={tw`w-12 h-12 rounded-2xl`}
              source={{uri: item?.image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <View style={tw`flex-row gap-2 items-center`}>
                <Text style={tw`text-sm font-PoppinsRegular text-black1000`}>
                  {item?.full_name}
                </Text>
                <Text style={tw`text-xs text-black400 font-NunitoSansRegular`}>
                  {item?.created_at}
                </Text>
              </View>

              <Text style={tw`text-black1000 text-base font-NunitoSansRegular`}>
                {item?.comment}
              </Text>
              <View style={tw`flex-row gap-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setReply(item);
                    setIsReply(!isReply);
                  }}>
                  <Text
                    style={tw`text-black400 text-sm font-NunitoSansRegular`}>
                    Reply
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteComment(item?.id);
                  }}>
                  <Text style={tw`text-red-500 text-sm font-NunitoSansRegular`}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }>
      {item?.replies?.map((item, index) => (
        <View key={index} style={tw`items-end my-4`}>
          <View style={tw`flex-row gap-4 w-[85%]`}>
            <FastImage
              style={tw`w-10 h-10 rounded-2xl`}
              source={{uri: item?.image}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View>
              <View style={tw`flex-row gap-2 items-center`}>
                <Text style={tw`text-sm font-PoppinsRegular text-black1000`}>
                  {item?.full_name}
                </Text>
                <Text style={tw`text-xs text-black400 font-NunitoSansRegular`}>
                  {item?.created_at}
                </Text>
              </View>

              <Text style={tw`text-black1000 text-base font-NunitoSansRegular`}>
                {item?.comment}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ExpandableSection>
  );
};

export default React.memo(CommentCard);
