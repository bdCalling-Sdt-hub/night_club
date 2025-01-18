import BackWithTitle from '../../components/backHeader/BackWithTitle';
import Background from '../components/Background';
import {FlatList} from 'react-native';
import {INews} from '../../firebase/interface';
import {NavigProps} from '../../interfaces/NaviProps';
import NewsCard from './components/NewsCard';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import tw from '../../lib/tailwind';
const News = ({navigation}: NavigProps<null>) => {
  const [allNews, setAllNews] = React.useState<INews[]>([]);

  React.useEffect(() => {
    let unsubscribe = () => {};
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

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(allNews);

  return (
    <Background style={tw`flex-1 `}>
      <BackWithTitle title="News" onPress={() => navigation.goBack()} />
      <FlatList
        contentContainerStyle={tw`px-4 pb-5 gap-3`}
        data={allNews}
        renderItem={({item}) => <NewsCard item={item} />}
      />
    </Background>
  );
};

export default News;
