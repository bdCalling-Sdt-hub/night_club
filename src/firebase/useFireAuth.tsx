import auth from '@react-native-firebase/auth';

export const useFireAuth = () => {
  // sigin in with email and password
  const SignInWithEmailPass = async (email: string, password: string) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      return res;
    } catch (error) {
      throw error;
    }
  };
  // ================  sign up with email and password ===================
  const SignUpWithEmailPass = async (email: string, password: string) => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      return res;
    } catch (error) {
      throw error;
    }
  };
  // ================  update user ===================
  const UpdateUser = async (name: string, image: string) => {
    try {
      await auth().currentUser?.updateProfile({
        displayName: name,
        photoURL: image,
      });
    } catch (error) {
      throw error;
    }
  };
  //===============   display imge update ==================
  const displayImage = async (image: string) => {
    try {
      await auth().currentUser?.updateProfile({
        photoURL: image,
      });
    } catch (error) {
      throw error;
    }
  };

  //================ user name udpate ======================
  const updateUserName = async (name: string) => {
    try {
      await auth().currentUser?.updateProfile({
        displayName: name,
      });
    } catch (error) {
      throw error;
    }
  };

  //====================== logout =================
  const SignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  };

  return {
    SignInWithEmailPass,
    SignOut,
    displayImage,
    updateUserName,
    SignUpWithEmailPass,
    UpdateUser,
  };
};
