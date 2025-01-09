import firestore from '@react-native-firebase/firestore';
import {guestsCollection} from './collections';

export interface IGuest {
  id: string;
  fullName: string;
  tag: string;
  people: string;
  check_in: string;
  entry_fee: string;
  free_entry: string;
  added_by: string;
  guestList: string;
  free_entry_time: any;
  createdAt: any;
  updatedAt: any;
  email?: string;
  note?: string;
}

// create Guest
export const createGuest = async (data: any) => {
  const guestRef = guestsCollection.doc(); // Auto-generate ID
  const id = guestRef.id;

  const guestData: IGuest = {
    ...data,
    id: id,
    createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
  };

  await guestRef.set(guestData);
  return id;
};

// delete Guest
export const deleteGuest = async (id: string) => {
  try {
    const guestRef = guestsCollection.doc(id);
    await guestRef.delete();
    // console.log('Guest deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting Guest:', error);
  }
};

// update guest
export const updateGuest = async (id: string, data: any) => {
  try {
    const guestRef = guestsCollection.doc(id);
    const guestSnapshot = await guestRef.get();
    if (!guestSnapshot.exists) {
      console.log('Guest not found');
      return;
    }
    await guestRef.update(data);
    // console.log('Guest updated successfully');
  } catch (error) {
    console.error('Error updating Guest:', error);
  }
};
