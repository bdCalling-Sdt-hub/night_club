import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  IconComment,
  IconFillLove,
  IconLock,
  IconPublic,
  IconUserSmallBlack,
  IconVThreeDots,
} from '../../icons/icons';
import {height, width} from '../../utils/utils';

import FastImage from 'react-native-fast-image';
import IButton from '../buttons/IButton';
import {INewpaper} from '../../redux/interface/newpaper';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import {useLikeUnlikeMutation} from '../../redux/apiSlices/newsFeetSlices';

interface PostCardProps {
  item: INewpaper;
  onPress?: () => void;
  svgIcon?: any;
  title?: string;
  setComment?: React.Dispatch<React.SetStateAction<any>>;
  likeOppress?: () => void;
  actionOptions?: () => void;
  onPressCement?: () => void;
}

const PostCard = ({
  item,
  onPress,
  setComment,
  likeOppress,
  actionOptions,
  onPressCement,
}: PostCardProps) => {
  const [love, setLove] = React.useState(item?.auth_user_liked);
  const [like] = useLikeUnlikeMutation();

  // console.log('recall');
  // console.log(item?.user?.image);
  return (
    <View style={tw` p-4   bg-white shadow-sm m-2 rounded-md`}>
      <View style={tw`flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          style={tw`flex-row gap-2 items-center self-start`}>
          {item?.user?.image ? (
            <FastImage
              style={tw`w-12 h-12 rounded-2xl`}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: item?.user?.image,
              }}
            />
          ) : (
            <View
              style={tw`w-12 h-12 rounded-2xl bg-primary justify-center items-center`}>
              <Text style={tw`text-white rounded-2xl font-RobotoBold`}>
                {item?.user?.full_name.slice(0, 1)}
              </Text>
            </View>
          )}

          <View style={tw`gap-[2px] justify-center`}>
            <Text style={tw`text-sm font-RobotoBold text-black1000`}>
              {item?.user?.full_name}
            </Text>
            <View style={tw`flex-row gap-2 items-center`}>
              <Text style={tw`text-xs text-[#A5A3A9] font-NunitoSansRegular`}>
                {item?.user?.user_name}
              </Text>

              <Text
              // style={tw`text-[8px] text-[#A5A3A9] font-NunitoSansRegular bg-gray-200 rounded-md  p-1 `}
              >
                {item?.privacy === 'public' ? (
                  <SvgXml xml={IconPublic} />
                ) : item?.privacy === 'private' ? (
                  <SvgXml xml={IconLock} />
                ) : (
                  item?.privacy === 'friends' && (
                    <SvgXml xml={IconUserSmallBlack} width={8} height={8} />
                  )
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {actionOptions && (
          <IButton
            svg={IconVThreeDots}
            onPress={actionOptions}
            containerStyle={tw`w-9 h-9 bg-base shadow-none`}
          />
        )}
      </View>
      {item?.content && (
        <View style={tw`py-3`}>
          <Text style={tw`text-sm text-black900 font-RobotoBold`}>
            {item?.content}
          </Text>
        </View>
      )}

      {item?.images?.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item?.images}
          pagingEnabled
          renderItem={({item}) => (
            <View
              style={tw` w-[${width * 0.92}px]  h-[${
                height * 0.055
              }] items-center bg-white rounded-2xl`}>
              <FastImage
                style={tw`w-full h-full rounded-2xl `}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: item?.url,
                }}
              />
            </View>
          )}
        />
      )}
      <View style={tw`px-2 gap-2 mt-3`}>
        {/* Icons Row */}
        <View style={tw`flex-row items-center gap-4 `}>
          <TouchableOpacity
            onPress={async () => {
              const res = await like({
                newsfeed_id: item.newsfeed_id || item.id,
              });
              // console.log('like', res);
              // console.log(item.newsfeed_id);
              setLove(!love);
              likeOppress && likeOppress();
            }}>
            <SvgXml
              xml={
                love
                  ? IconFillLove
                  : `<svg width="20" height="20" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.53553 6.53553L7.5 12.5L13.4645 6.53553C14.1275 5.87249 14.5 4.97322 14.5 4.03553C14.5 2.08291 12.9171 0.5 10.9645 0.5C10.0268 0.5 9.12751 0.872492 8.46447 1.53553L7.5 2.5L6.53553 1.53553C5.87249 0.872493 4.97322 0.5 4.03553 0.5C2.08291 0.5 0.5 2.08291 0.5 4.03553C0.5 4.97322 0.872491 5.87249 1.53553 6.53553Z" stroke="#D2D1D4" stroke-linejoin="round"/>
</svg>
`
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCement}>
            <SvgXml xml={IconComment} />
          </TouchableOpacity>
        </View>

        {/* Views and Likes */}
        <View style={tw`flex-row items-center gap-3`}>
          <Text style={tw`text-black1000  font-NunitoSansRegular text-xs`}>
            {item?.like_count} likes
          </Text>

          <Text
            numberOfLines={1}
            style={tw`text-gray-400 font-NunitoSansRegular w-[70%] text-xs`}>
            • Comment{' '}
            <Text style={tw`text-black500 font-RobotoBold`}>
              {item?.comment_count}
            </Text>
          </Text>
        </View>

        {/* Date */}
        <Text style={tw`text-gray-400 text-xs`}>
          {new Date().toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(PostCard);
