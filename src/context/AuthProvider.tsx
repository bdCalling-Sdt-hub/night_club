import {IUser} from '../firebase/interface';
import React from 'react';
import auth from '@react-native-firebase/auth';

interface AuthContextProps {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  initialLoading: boolean;
  setInitialLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const [user, setUser] = React.useState<IUser | undefined>();
  const [userId, setUserId] = React.useState<string | undefined>();
  const [initialLoading, setInitialLoading] = React.useState(true);
  const logUserClaims = async () => {
    setInitialLoading(true);
    const currentUser = auth().currentUser;

    if (currentUser) {
      // const idTokenResult = await currentUser.getIdTokenResult();
      // console.log('Custom Claims:', currentUser);
      setUserId(currentUser.uid);
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
      setInitialLoading(false);
    } else {
      setInitialLoading(false);
      console.log('No user logged in');
    }
  };
  React.useEffect(() => {
    logUserClaims();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        initialLoading,
        setInitialLoading,
        userId,
        setUserId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
