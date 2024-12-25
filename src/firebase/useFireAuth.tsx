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

  const handleVerifyEmail = async (email: string) => {
    try {
      const res = await fetch(
        'https://us-central1-pushnotifiation-d1bcb.cloudfunctions.net/send_email_verification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const handleResetPassword = async (email: string) => {
    const actionCodeSettings = {
      url: `https://pushnotifiation-d1bcb.web.app/login`,
      handleCodeInApp: true,
    };
    try {
      const res = await auth().sendPasswordResetEmail(
        email,
        actionCodeSettings,
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
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
    handleResetPassword,
    handleVerifyEmail,
  };
};
