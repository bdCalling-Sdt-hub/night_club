import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId : "351876329586-3h7bdhnsuvqol4tmt0vus8amgtclffl4.apps.googleusercontent.com"
})
export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return await auth().signInWithCredential(googleCredential);
  } catch (error) {
    // console.warn('Google Sign-In Error:', error);
    if (error.code === 'DEVELOPER_ERROR') {
      // alert('Developer error: Please check your Google API and Firebase configuration.');
    } else {
      // alert('An error occurred: ' + error.message);
    }
  }
}
