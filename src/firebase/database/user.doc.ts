import {usersCollection} from './collections';

export interface IUser {
  uid?: string;
  email: string;
  displayName: string;
  password?: string;
  phoneNumber: string;
  photoURL?: string;
  role: 'super-owner' | 'owner' | 'manager' | 'promoters' | 'guard';
}

export const getUser = async (uid: string) => {
  const user = await usersCollection.doc(uid).get();
  if (user.exists) {
    return user.data();
  } else {
    return null;
  }
};
export const createUser = async (uid: string, data: IUser) => {
  const res = await usersCollection.doc(uid).set(data);
  return res;
};

export const updateUser = async (uid: string, data: IUser) => {
  const res = await usersCollection.doc(uid).update(data);
  return res;
};
