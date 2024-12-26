import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';

export const uploadFileToFirebase = async (result: Asset | undefined) => {
  try {
    // Pick an image or video from the device library

    if (!result) {
      return console.warn('No file selected');
    }
    if (result && result?.uri) {
      const file = result;
      const fileName = file.fileName || 'default_file_name';
      const filePath = file.uri || '';

      // Define the Firebase Storage reference
      const reference = storage().ref(fileName);

      // Upload the file
      const task = reference.putFile(
        Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath,
      );

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      await task;
      console.log('File uploaded successfully!');

      // Get the download URL
      const downloadUrl = await reference.getDownloadURL();
      console.log('File available at:', downloadUrl);

      return downloadUrl; // Use this URL in your app
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
