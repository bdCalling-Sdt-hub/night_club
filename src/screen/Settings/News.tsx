import {FlatList, RefreshControl} from 'react-native';
import {PrimaryColor, height} from '../../utils/utils';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import EmptyCard from '../../components/Empty/EmptyCard';
import {INews} from '../../firebase/interface';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import NewsCard from './components/NewsCard';

const News = ({navigation}: NavigProps<null>) => {
  const [allNews, setAllNews] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState(false);
  const isFocused = useIsFocused();

  const fetchNews = async () => {
    const query = firestore().collection('News');
    query.onSnapshot(
      snapshot => {
        const data = snapshot?.docs?.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllNews(data);
        setLoading(false);
      },
      error => {
        console.log(error);
        setLoading(false);
      },
    );
  };

  React.useEffect(() => {
    setLoading(true);
    // Cleanup the listener on  component unmount

    fetchNews();
    return () => {};
  }, [isFocused]);

  // console.log(allNews);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="News" onPress={() => navigation.goBack()} />
      <FlatList
        refreshControl={
          <RefreshControl
            progressBackgroundColor={PrimaryColor}
            onRefresh={() => {
              fetchNews();
            }}
            refreshing={false}
            colors={['white']}
          />
        }
        ListEmptyComponent={
          <EmptyCard isLoading={loading} hight={height * 0.6} title="No News" />
        }
        contentContainerStyle={tw`px-4 pb-5 gap-3`}
        data={allNews}
        renderItem={({item}) => <NewsCard item={item} />}
      />
    </Background>
  );
};

export default News;
