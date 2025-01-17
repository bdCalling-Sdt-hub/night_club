import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {useAuth} from '../../context/AuthProvider';

export type COLLECTION =
  | 'Users'
  | 'Venues'
  | 'Events'
  | 'Guests'
  | 'GuestsList'
  | 'Tags';

const preprocessData = (data: any) => {
  const processedData = {} as any;
  for (const key in data) {
    const value = data[key];
    processedData[key] = value === '' || value?.length === 0 ? null : value;
  }
  return processedData;
};

const useFireStore = () => {
  const {user} = useAuth();

  // Helper to initialize a Firestore query
  const initializeQuery = async (
    collectType: COLLECTION,
    filters?: Array<{
      field: string;
      operator: FirebaseFirestoreTypes.WhereFilterOp;
      value: any;
      accept?: boolean;
    }>,
  ): Promise<FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> | null> => {
    try {
      let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
        firestore().collection(collectType);

      // Apply default filter for super_owner_id
      query = query.where(
        'createdBy',
        '==',
        user?.role === 'super-owner' ? user.user_id : user?.super_owner_id,
      );

      // Temporary: Remove orderBy while index is being created
      // query = query.orderBy('createdAt', 'desc');

      // Check for data after default filter
      const snapshot = await query.limit(1).get();
      if (snapshot.empty) {
        console.log(`No data found in ${collectType} for the default filter.`);
        return null;
      }

      // Apply additional filters if provided

      // Apply additional filters if provided
      filters?.forEach(({field, operator, value}) => {
        if (value?.length === 0) return;
        query = query.where(field, operator, value);
      });

      return query;
    } catch (error) {
      console.warn(`Error initializing query for ${collectType}:`, error);
      return null;
    }
  };

  // Helper to get server timestamps
  const getServerTimestamps = () => ({
    createdAt: firestore.FieldValue.serverTimestamp() as any,
    updatedAt: firestore.FieldValue.serverTimestamp() as any,
  });

  // Listen to real-time updates
  const listenToData = async ({
    collectType,
    filters,
    onUpdate,
    unsubscribe,
  }: {
    collectType: COLLECTION;
    filters?: Array<{
      field: string;
      operator: FirebaseFirestoreTypes.WhereFilterOp;
      value: any;
    }>;
    unsubscribe?: () => void;
    onUpdate: (data: any[]) => void;
  }) => {
    try {
      const query = await initializeQuery(collectType, filters);
      if (!query) {
        console.log(`No data found in ${collectType} for the default filter.`);
        return () => {};
      }

      unsubscribe = query.onSnapshot(
        snapshot => {
          const data = snapshot?.docs?.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          onUpdate(data);
        },
        error => {
          // console.warn(`Error listening to ${collectType}:`, error);
        },
      );

      return unsubscribe;
    } catch (error) {
      console.log(`Error initializing listener for ${collectType}:`, error);
      return () => {};
    }
  };

  // Load all data
  const loadAllData = async ({
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
      const query = await initializeQuery(collectType, filters);
      if (!query) {
        return [];
      }

      const snapshot = await query.get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoad?.(data);
      return data;
    } catch (error) {
      console.error(`Error getting data from ${collectType}:`, error);
      return [];
    }
  };

  // Load single document
  const loadSingleData = async ({
    collectType,
    id,
    setLoad,
  }: {
    id: string;
    collectType: COLLECTION;
    setLoad?: Function;
  }) => {
    try {
      const snapshot = await firestore().collection(collectType).doc(id).get();
      const data = snapshot.data();
      setLoad?.(data);
      return data;
    } catch (error) {
      console.error(
        `Error getting ${collectType} document with ID ${id}:`,
        error,
      );
      return {};
    }
  };

  // Update document
  const updateFireData = async ({
    id,
    collectType,
    data,
  }: {
    id: string;
    collectType: COLLECTION;
    data: any;
  }) => {
    try {
      data = preprocessData(data);
      const docRef = firestore().collection(collectType).doc(id);
      await docRef.update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error(`Error updating ${collectType} with ID ${id}:`, error);
    }
  };

  // Create document
  const createFireData = async ({
    collectType,
    data,
  }: {
    collectType: COLLECTION;
    data: any;
  }) => {
    try {
      data = preprocessData(data);
      const docRef = firestore().collection(collectType).doc();
      // console.log(data);
      const docData = {
        ...data,
        id: docRef.id,
        createdBy: user?.user_id,
        super_owner_id:
          user?.role === 'super-owner' ? user.user_id : user?.super_owner_id,
        ...getServerTimestamps(),
      };
      await docRef.set(docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating ${collectType}:`, error);
    }
  };

  // Delete document
  const deleteFireData = async ({
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

  return {
    listenToData,
    loadAllData,
    loadSingleData,
    updateFireData,
    createFireData,
    deleteFireData,
  };
};

export default useFireStore;
