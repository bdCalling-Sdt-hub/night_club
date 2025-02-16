import {FlatList, RefreshControl, Text, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import IButton from '../../components/buttons/IButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {useAuth} from '../../context/AuthProvider';
import useFireStore from '../../firebase/database/helper';
import {ITags} from '../../firebase/interface';
import {IconTrashGray} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';
import Background from '../components/Background';

const AddNewTag = ({navigation}: NavigProps<any>) => {
  const {closeToast, showToast} = useToast();
  const [newTag, setNewTag] = React.useState('');
  const [tags, setTags] = React.useState<Array<ITags>>([]);
  const [loading, setLoading] = React.useState(false);
  const {createFireData} = useFireStore();

  const {user} = useAuth();

  const handleNewTag = () => {
    if (!newTag) {
      showToast({
        title: 'Warning',
        content: 'Please enter tag',
        onPress: () => {
          closeToast();
        },
      });
    } else {
      setNewTag('');
      createFireData({
        collectType: 'Tags',
        data: {
          name: newTag,
        },
      });
    }
  };

  React.useEffect(() => {
    if (!user?.user_id) return; // Ensure user data is available

    setLoading(true);

    // Build the Firestore query
    let query = firestore().collection('Tags');

    if (
      user?.role === 'guard' ||
      user?.role === 'promoters' ||
      user?.role === 'manager'
    ) {
      const managerId =
        user?.role === 'manager' ? user?.user_id : user?.manager_id;
      query = query.where('manager_id', '==', managerId);
    }

    // Subscribe to real-time updates
    const unsubscribe = query.onSnapshot(
      snapshot => {
        const tagsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTags(tagsData);
        setLoading(false);
      },
      error => {
        console.error('Error fetching Tags in real-time:', error);
        setLoading(false);
      },
    );

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithTitle onPress={() => navigation.goBack()} title="Add new tag" />

      <View style={tw` px-4 flex-row items-center pb-4`}>
        <InputText
          value={newTag}
          placeholder="Enter new Tag"
          onChangeText={text => setNewTag(text)}
          containerStyle={tw`border border-secondary h-10 rounded-r-none rounded-l-lg flex-1`}
        />
        <TButton
          onPress={handleNewTag}
          title="Add"
          containerStyle={tw`rounded-r-lg rounded-l-none bg-primary800 w-20 h-10`}
        />
      </View>

      <View style={tw`px-[4%]`}>
        <Text style={tw`text-white400 text-base font-RobotoBold`}>Tags</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            progressBackgroundColor={PrimaryColor}
            colors={['white']}
            onRefresh={() => {
              setLoading(!loading);
            }}
          />
        }
        keyboardShouldPersistTaps="always"
        data={tags}
        renderItem={({item, index}) => (
          <View
            style={tw`flex-row justify-between mt-1 pb-2 mx-[4%] border-b border-b-gray-800 `}>
            <Text style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
              {item.name}
            </Text>
            <IButton
              svg={IconTrashGray}
              onPress={() => {
                firestore().collection('Tags').doc(item.id).delete();
              }}
              containerStyle={tw`w-10 h-10 bg-red-500 text-white`}
            />
          </View>
        )}
      />
    </Background>
  );
};

export default AddNewTag;
