import auth from '@react-native-firebase/auth';
import React from 'react';

interface AuthContextProps {
  user: AuthenticatedUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | undefined>>;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined,
);

export interface AuthenticatedUser {
  uid: string; // Unique ID for the user
  email: string | null; // User's email address
  displayName: string | null; // User's display name
  phoneNumber: string | null; // User's phone number
  photoURL: string | null; // URL of the user's profile picture
  emailVerified: boolean; // Whether the user's email is verified
  isAnonymous: boolean; // Whether the user is signed in anonymously
  tenantId: string | null; // The tenant ID for multi-tenancy apps (if any)
  providerId: string; // The ID of the authentication provider
  metadata: UserMetadata; // Metadata containing creation and last sign-in times
  providerData: ProviderData[]; // List of authentication providers
  customClaims?: Record<string, any>; // Custom claims (if set via Admin SDK)
}

export interface ProviderData {
  providerId: string; // ID of the authentication provider (e.g., "google.com")
  uid: string; // UID provided by the authentication provider
  displayName: string | null; // Display name from the provider
  email: string | null; // Email from the provider
  phoneNumber: string | null; // Phone number from the provider
  photoURL: string | null; // Profile picture URL from the provider
}

export interface UserMetadata {
  creationTime: string; // Account creation time (ISO 8601 string)
  lastSignInTime: string; // Last sign-in time (ISO 8601 string)
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = React.useState<AuthenticatedUser>();
  const logUserClaims = async () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      // const idTokenResult = await currentUser.getIdTokenResult();
      // console.log('Custom Claims:', currentUser);
      currentUser && setUser(currentUser);
    } else {
      console.log('No user logged in');
    }
  };
  React.useEffect(() => {
    logUserClaims();
  }, []);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
