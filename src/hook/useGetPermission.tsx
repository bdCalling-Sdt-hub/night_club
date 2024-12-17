import {PermissionsAndroid} from 'react-native';

export const useGetPermission = async (
  permissionKey:
    | 'WRITE_EXTERNAL_STORAGE'
    | 'READ_EXTERNAL_STORAGE'
    | 'CAMERA'
    | 'ACCESS_FINE_LOCATION'
    | 'ACCESS_COARSE_LOCATION'
    | 'READ_CONTACTS'
    | 'WRITE_CONTACTS'
    | 'READ_PHONE_STATE'
    | 'CALL_PHONE'
    | 'SEND_SMS'
    | 'RECEIVE_SMS'
    | 'ACCESS_FINE_LOCATION'
    | 'ACCESS_COARSE_LOCATION'
    | 'READ_CALENDAR'
    | 'WRITE_CALENDAR'
    | 'READ_CALL_LOG'
    | 'WRITE_CALL_LOG'
    | 'PROCESS_OUTGOING_CALLS'
    | 'INTERNET'
    | 'BLUETOOTH'
    | 'BLUETOOTH_ADMIN'
    | 'BLUETOOTH_ADVERTISE'
    | 'BLUETOOTH_SCAN'
    | 'WAKE_LOCK'
    | 'VIBRATE'
    | 'ACCESS_WIFI_STATE'
    | 'CHANGE_WIFI_STATE'
    | 'CHANGE_NETWORK_STATE'
    | 'ACCESS_NETWORK_STATE'
    | 'RECEIVE_BOOT_COMPLETED'
    | 'FOREGROUND_SERVICE'
    | 'MANAGE_EXTERNAL_STORAGE'
    | 'INSTALL_PACKAGES'
    | 'SET_TIME_ZONE'
    | 'SET_WALLPAPER'
    | 'READ_SMS'
    | 'WRITE_SMS'
    | 'READ_EXTERNAL_STORAGE'
    | 'SYSTEM_ALERT_WINDOW',
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permissionKey],
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`${permissionKey} granted`);
    } else {
      console.log(`${permissionKey} denied`);
    }
  } catch (err) {
    console.error(`Error requesting ${permissionKey}: `, err);
  }
};
