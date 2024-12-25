import firestore from '@react-native-firebase/firestore';
import {venuesCollection} from './collections';
export interface IVenue {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  name: string;
  location: string;
  description: string;
  image: any;
  video?: any;
  nightclubManager?: string;
  openingTime: string;
  closingTime: string;
  capacity: string;
  bars: string;
  danceFloor: string;
  residentDj: string;
  createdBy: string;
}

export const addVenue = async (
  venue: Omit<IVenue, 'createdAt' | 'updatedAt' | 'id'>,
) => {
  try {
    const venueRef = venuesCollection.doc(); // Auto-generate ID
    const id = venueRef.id;

    const venueData: IVenue = {
      ...venue,
      id: id,
      createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
      updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    };

    await venueRef.set(venueData);
    console.log('Venue added successfully:', venueData);
  } catch (error) {
    console.error('Error adding venue:', error);
  }
};

export const updateVenue = async (id: string, updates: Partial<IVenue>) => {
  try {
    const venueRef = venuesCollection.doc(id);

    const updatedData = {
      ...updates,
      updatedAt: firestore.FieldValue.serverTimestamp(), // Update timestamp
    };

    await venueRef.update(updatedData);
    console.log('Venue updated successfully:', updatedData);
  } catch (error) {
    console.error('Error updating venue:', error);
  }
};
