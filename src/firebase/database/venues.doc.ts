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

export const addVenue = async (venue: IVenue) => {
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

export const deleteVenue = async (id: string) => {
  try {
    const venueRef = venuesCollection.doc(id);
    await venueRef.delete();
    console.log('Venue deleted successfully');
  } catch (error) {
    console.error('Error deleting venue:', error);
  }
};

export const getVenues = async () => {
  try {
    const venuesSnapshot = await venuesCollection.get();
    const venues: IVenue[] = [];
    venuesSnapshot.forEach(doc => {
      const data = doc.data() as IVenue;
      venues.push(data);
    });
    return venues;
  } catch (error) {
    console.error('Error getting venues:', error);
    return [];
  }
};

export const getVenue = async (id: string) => {
  try {
    const venueSnapshot = await venuesCollection.doc(id).get();
    const venue = venueSnapshot.data() as IVenue;
    return venue;
  } catch (error) {
    console.error('Error getting venue:', error);
    return null;
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
