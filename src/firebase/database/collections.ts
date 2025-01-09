import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const venuesCollection = firestore().collection('Venues');
export const eventsCollection = firestore().collection('Events');
export const guestsCollection = firestore().collection('Guests');
export const guestsListCollection = firestore().collection('GuestsList');
export const tagsCollection = firestore().collection('Tags');

export type COLLECTION =
  | 'Users'
  | 'Venues'
  | 'Events'
  | 'Guests'
  | 'GuestsList'
  | 'Tags';

export const loadAllData = async ({
  collectType,
  setLoad,
}: {
  collectType: COLLECTION;
  setLoad?: Function;
}) => {
  try {
    const Snapshot = await firestore().collection(collectType).get();
    const data = Snapshot.docs.map(doc => doc.data());
    setLoad && setLoad(data);
    return data;
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
};

export const loadSingleData = async ({
  collectType,
  id,
  setLoad,
}: {
  id: string;
  collectType: COLLECTION;
  setLoad?: Function;
}) => {
  try {
    const Snapshot = await firestore().collection(collectType).doc(id).get();
    const data = Snapshot.data();
    setLoad && setLoad(data);
    return data;
  } catch (error) {
    console.error('Error getting tags:', error);
    return {};
  }
};
