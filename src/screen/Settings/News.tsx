import {FlatList, RefreshControl} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import {INews} from '../../firebase/interface';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';
import NewsCard from './components/NewsCard';
const News = ({navigation}: NavigProps<null>) => {
  const [allNews, setAllNews] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    let unsubscribe = () => {};
    setLoading(true);
    // Cleanup the listener on  component unmount
    const query = firestore().collection('News');
    unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot?.docs?.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllNews(data);
      },
      error => {
        console.log(error);
      },
    );
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, [loading]);

  // console.log(allNews);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="News" onPress={() => navigation.goBack()} />
      <FlatList
        refreshControl={
          <RefreshControl
            progressBackgroundColor={PrimaryColor}
            onRefresh={() => {
              setLoading(true);
            }}
            refreshing={loading}
            colors={['white']}
          />
        }
        contentContainerStyle={tw`px-4 pb-5 gap-3`}
        data={allNews}
        renderItem={({item}) => <NewsCard item={item} />}
      />
    </Background>
  );
};

export default News;
