import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type COLLECTION =
  | 'Users'
  | 'Venues'
  | 'Events'
  | 'Guests'
  | 'GuestsList'
  | 'Tags';

// get all data to lising on firestore
export const listenToData = ({
  collectType,
  filters,
  onUpdate,
}: {
  collectType: COLLECTION;
  filters?: Array<{
    field: string;
    operator: FirebaseFirestoreTypes.WhereFilterOp;
    value: any;
  }>;
  onUpdate: (data: any[]) => void;
}) => {
  try {
    // Initialize the Firestore query
    let query = firestore().collection(collectType);

    // Apply filters if provided
    if (filters && filters.length > 0) {
      filters.forEach(({field, operator, value}) => {
        query = query.where(field, operator, value);
      });
    }

    // Listen to real-time updates
    const unsubscribe = query.onSnapshot(
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Pass the data to the callback
        onUpdate(data);
      },
      error => {
        console.error(`Error listening to ${collectType}:`, error);
      },
    );

    // Return the unsubscribe function to clean up the listener
    return unsubscribe;
  } catch (error) {
    console.error(`Error initializing listener for ${collectType}:`, error);
    return () => {};
  }
};

// Get all data
export const loadAllData = async ({
  collectType,
  filters,
  setLoad,
}: {
  collectType: COLLECTION;
  filters?: Array<{
    field: string;
    operator: FirebaseFirestoreTypes.WhereFilterOp;
    value: any;
  }>;
  setLoad?: Function;
}) => {
  try {
    // Initialize the Firestore query
    let query = firestore().collection(collectType);

    // Apply filters if provided
    if (filters && filters.length > 0) {
      filters.forEach(({field, operator, value}) => {
        query = query.where(field, operator, value);
      });
    }

    // Fetch data
    const Snapshot = await query.get();
    const data = Snapshot.docs.map(doc => doc.data());

    // Set load if provided
    setLoad && setLoad(data);

    return data;
  } catch (error) {
    console.error(`Error getting data from ${collectType}:`, error);
    return [];
  }
};

// single get all data

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

// update with id and other filed and collect type

export const updateFireData = async ({
  id,
  collectType,
  data,
}: {
  id: string;
  collectType: COLLECTION;
  data: any;
}) => {
  try {
    const docRef = firestore().collection(collectType).doc(id);
    await docRef.update(data);
  } catch (error) {
    console.error(`Error updating ${collectType} with ID ${id}:`, error);
  }
};

// create data

export const createFireData = async ({
  collectType,
  data,
}: {
  collectType: COLLECTION;
  data: any;
}) => {
  try {
    const docRef = firestore().collection(collectType).doc();
    const docData = {
      ...data,
      id: docRef.id,
      createdAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
      updatedAt: firestore.FieldValue.serverTimestamp() as any, // Auto-generate timestamp
    };
    await docRef.set(docData);
    return docRef.id;
  } catch (error) {
    console.error(`Error updating ${collectType} with ID:`, error);
  }
};

// delete data

export const deleteFireData = async ({
  id,
  collectType,
}: {
  id: string;
  collectType: COLLECTION;
}) => {
  try {
    const docRef = firestore().collection(collectType).doc(id);
    await docRef.delete();
  } catch (error) {
    console.error(`Error deleting ${collectType} with ID ${id}:`, error);
  }
};
