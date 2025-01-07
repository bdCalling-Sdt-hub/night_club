import firestore from '@react-native-firebase/firestore';
import {guestsListCollection} from './collections';
export interface IGuestsList {
  id: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}

// create new Guest List
export const createGuestList = async (data: any) => {
  const guestListRef = guestsListCollection.doc(); // Auto-generate ID
  const id = guestListRef.id;

  const guestListData: IGuestsList = {
    ...data,
    id: id,
    createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
  };

  await guestListRef.set(guestListData);
  // console.log('Guest List added successfully:', guestListData);
};

// deleteGuestList
export const deleteGuestList = async (id: string) => {
  try {
    const guestListRef = guestsListCollection.doc(id);
    await guestListRef.delete();
    // console.log('Guest List deleted successfully');
  } catch (error) {
    console.error('Error deleting Guest List:', error);
  }
};

// gets all Guest List
export const getGuestList = async () => {
  try {
    const guestListSnapshot = await guestsListCollection.get();
    const guestList = guestListSnapshot.docs.map(
      doc => doc.data() as IGuestsList,
    );
    return guestList;
  } catch (error) {
    console.error('Error getting Guest List:', error);
    return [];
  }
};
