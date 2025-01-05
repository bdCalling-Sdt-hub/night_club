import firestore from '@react-native-firebase/firestore';
import {tagsCollection} from './collections';
export interface IGuest {
  id?: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

// creat tags
export const createTags = async (data: any) => {
  const tagRef = tagsCollection.doc(); // Auto-generate ID
  const id = tagRef.id;

  const tagData: IGuest = {
    ...data,
    id: id,
    createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
  };

  await tagRef.set(tagData);
  // console.log('Tag added successfully:', tagData);
};
