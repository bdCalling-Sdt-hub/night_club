import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');
export const venuesCollection = firestore().collection('Venues');
export const eventsCollection = firestore().collection('Events');
export const guestsCollection = firestore().collection('Guests');
export const guestsListCollection = firestore().collection('GuestsList');
export const tagsCollection = firestore().collection('Tags');
