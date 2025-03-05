import React, {useEffect} from 'react';
import {Alert, Button, Linking, Text, View} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default function PermissionHandler() {
  const requestPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA); // Change for iOS if needed

    if (result === RESULTS.GRANTED) {
      console.log('Permission granted ✅');
    } else if (result === RESULTS.DENIED) {
      console.log('Permission denied ❌ Retrying...');
      requestPermission(); // 🔄 Keep requesting
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Needed',
        'This feature requires camera access. Please enable it in settings.',
        [
          {text: 'Go to Settings', onPress: () => Linking.openSettings()},
          {text: 'Cancel', onPress: () => console.log('User canceled')},
        ],
      );
    }
  };

  useEffect(() => {
    requestPermission(); // Automatically request on component mount
  }, []);

  return (
    <View>
      <Text>Camera Permission Handler</Text>
      <Button title="Request Permission" onPress={requestPermission} />
    </View>
  );
}
