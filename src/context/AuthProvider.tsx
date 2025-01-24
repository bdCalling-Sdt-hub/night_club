import auth from '@react-native-firebase/auth';
import React from 'react';
import {IUser} from '../firebase/interface';

interface firebaseClaimUser {
  aud: string;
  auth_time: number;
  company: string;
  email: string;
  email_verified: boolean;
  exp: number;
  firebase: {identities: {email: Array<string>}; sign_in_provider: string};
  photoURL: string;
  iat: number;
  iss: string;
  name: string;
  phoneNumber: string;
  role: 'super-owner' | 'owner' | 'manager' | 'promoters' | 'guard';
  sub: string;
  user_id: string;
  super_owner_id: string;
  owner_id: string;
  manager_id: string;
}

interface AuthContextProps {
  user: firebaseClaimUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  initialLoading: boolean;
  setInitialLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
  // allUser: IMangeUser[];
  // setAllUser: React.Dispatch<React.SetStateAction<IMangeUser[]>>;
  // handleLoader: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = React.useState<any | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  // const [allUser, setAllUser] = React.useState<IMangeUser[]>([]);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const logUserClaims = async () => {
    setInitialLoading(true);
    const currentUser = auth().currentUser;

    if (currentUser?.emailVerified) {
      // const idTokenResult = await currentUser.getIdTokenResult();
      // console.log('Custom Claims:', currentUser);
      setUserId(currentUser.uid);

      // Fetch the refreshed token with claims
      const idTokenResult = await currentUser?.getIdTokenResult(true);
      // console.log(idTokenResult?.claims);

      idTokenResult?.claims &&
        setUser({
          ...idTokenResult.claims,
          photoURL: currentUser.photoURL,
        }); // This should now include the custom claims
      // const user = await getUser(currentUser.uid);
      // user &&
      //   setUser({
      //     uid: currentUser.uid,
      //     email: user.email,
      //     displayName: user.displayName,
      //     password: user.password,
      //     phoneNumber: user.phoneNumber,
      //     photoURL: user.photoURL,
      //     role: user.role,
      //     // add other properties as needed
      //   });
      idTokenResult?.claims && setInitialLoading(false);
    } else {
      setInitialLoading(false);
      console.log('No user logged in');
    }
  };

  // const handleLoader = React.useCallback(async () => {
  //   const res = await fetch(
  //     `${ApiUrl}users?super_owner_id=${
  //       user?.role === 'super-owner' ? user?.user_id : user?.super_owner_id
  //     }`,
  //   );
  //   const resData = await res.json();
  //   // console.log(resData?.users);

  //   setAllUser(resData?.users);
  // }, [user]);

  React.useEffect(() => {
    logUserClaims();
  }, []);
  // React.useEffect(() => {
  //   handleLoader();
  // }, [user?.role]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        initialLoading,
        setInitialLoading,
        userId,
        setUserId,
        // allUser,
        // setAllUser,
        // handleLoader,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
