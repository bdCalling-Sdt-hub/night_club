import firestore from '@react-native-firebase/firestore';
import {eventsCollection} from './collections';

export interface IEvent {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  name: string;
  description: string;
  image: any;
  date: string;
  venue: string;
  start_time: string;
  end_time: string;
  capacity: string;
  entry_fee: string;
  resident_dj: string;
  createdBy: string;
}

export interface IEventWithId extends IEvent {
  id: string;
}

//==================== create new events ====================
export const createEvents = async (data: IEvent) => {
  const eventRef = eventsCollection.doc(); // Auto-generate ID
  const id = eventRef.id;

  const eventData: IEvent = {
    ...data,
    id: id,
    createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
  };

  await eventRef.set(eventData);
  console.log('Event added successfully:', eventData);

  // when event is created, add a new document in the events collection

  return;

  // when get any error
  // console.log('Error adding event:', error);
};
