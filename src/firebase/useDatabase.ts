import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

export const getUser = async (uid: string) => {
  const user = await usersCollection.doc(uid).get();
  if (user.exists) {
    return user.data();
  } else {
    return null;
  }
};
export const createUser = async (uid: string, data: any) => {
  const res = await usersCollection.doc(uid).set(data);
  return res;
};

export const updateUser = async (uid: string, data: any) => {
  const res = await usersCollection.doc(uid).update(data);
  return res;
};
