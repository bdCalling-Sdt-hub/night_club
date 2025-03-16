import * as XLSX from 'xlsx';

import {Alert, Platform} from 'react-native';

import Papa from 'papaparse';
import RNFS from 'react-native-fs';
import {IGuest} from '../firebase/interface';
import {filRequestPermission} from '../utils/utils';

export const useExportFile = async ({
  data,
  type,
}: {
  type: 'txt' | 'csv' | 'xlsx';
  data: IGuest[];
}) => {
  try {
    const permission = await filRequestPermission();
    if (!permission) {
      return Alert.alert(
        'Permission Denied',
        'Guest list can not be saved without storage permission.',
      );
    }

    const csv = Papa.unparse(data);
    // Papa.parse(csv, {
    //   complete: function (results) {
    //     console.log(results);
    //   },
    // })
    if (type === 'txt') {
      //================ Start the file download of Text formate Save local file manager ====================
      let path = '';

      if (Platform.OS === 'android') {
        // Set path for Android Downloads folder
        path =
          RNFS.DocumentDirectoryPath +
          `/Download/guest-list-${new Date().getTime()}.txt`; // Use '/Download/' directory on Android
      } else {
        // For iOS, save in the Documents directory (no Downloads folder on iOS)
        path =
          RNFS.DocumentDirectoryPath +
          `/guest-list-${new Date().getTime()}.txt`;
      }

      try {
        await RNFS.writeFile(path, csv, 'utf8');
        console.log('CSV file saved at: ', path);
        Alert.alert(
          'Download Successful',
          'Guest list downloaded successfully Formatted as Txt. Please Check Download Folder.',
        );
      } catch (error) {
        console.error('Failed to save CSV file: ', error);
      }
      //================ End the file download of Text formate Save local file manager ====================
    }
    if (type === 'csv') {
      //================ Start the file download of CSV formate Save local file manager ====================
      let path = '';

      if (Platform.OS === 'android') {
        // Set path for Android Downloads folder
        path =
          RNFS.DownloadDirectoryPath +
          `/Download/guest-list-${new Date().getTime()}.csv`; // Use '/Download/' directory on Android
      } else {
        // For iOS, save in the Documents directory (no Downloads folder on iOS)
        path =
          RNFS.DocumentDirectoryPath +
          `/guest-list-${new Date().getTime()}.csv`;
      }

      try {
        await RNFS.writeFile(path, csv, 'utf8');
        console.log('CSV file saved at: ', path);
        Alert.alert(
          'Download Successful',
          'Guest list downloaded successfully Formatted as CSV. Please Check Download Folder.',
        );
      } catch (error) {
        console.error('Failed to save CSV file: ', error);
      }
      //================ End the file download of CSV formate Save local file manager ====================
    }
    // Function to flatten the JSON data

    if (type === 'xlsx') {
      //================ Start the file download of Excel formate Save local file manager ====================
      try {
        const flattenJsonData = (data: any) => {
          const flattenedData: IGuest[] = [];

          // Loop through each guest and flatten their data
          data.forEach((item: any) => {
            const guestData: IGuest = {
              added_by: item.added_by,
              check_in: item.check_in,
              entry_fee: item.entry_fee,
              event: item.event,
              free_entry: item.free_entry,
              free_entry_time: item.free_entry_time,
              guestList: item.guestList,
              id: item.id,
              note: item.note,
              people: item.people,
              tag: item.tag,
              updatedAt: item.updatedAt,
              fullName: item.fullName,
              email: item.email,
              venue: item.venue,
            };
            flattenedData.push(guestData);
          });

          return flattenedData;
        };
        // Check if JSON data is valid and not empty
        if (!data || data.length === 0) {
          console.log('No data to write to Excel.');
          return;
        }

        // Flatten the JSON data to a table-like structure
        const flattenedData = flattenJsonData(data);

        // Convert JSON data to Excel sheet
        const ws = XLSX.utils.json_to_sheet(flattenedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Write the workbook to binary data (XLSX format)
        const binaryExcel = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'binary',
        });
        // Helper function to convert binary string to base64
        const binaryToBase64 = (binary: string): string => {
          let base64String = '';
          for (let i = 0; i < binary.length; i++) {
            base64String += String.fromCharCode(binary.charCodeAt(i));
          }
          return global.btoa(base64String); // Use global.btoa for base64 encoding in React Native
        };
        // Convert the binary string to base64
        const base64Excel = binaryToBase64(binaryExcel);

        // Set the file path based on platform
        let path = '';
        if (Platform.OS === 'android') {
          path =
            RNFS.DownloadDirectoryPath +
            `/Download/guest-list-${new Date().getTime()}.xlsx`; // Android path
        } else {
          path =
            RNFS.DocumentDirectoryPath +
            `/guest-list-${new Date().getTime()}.xlsx`; // iOS path
        }

        // Write the base64 data to the file
        await RNFS.writeFile(path, base64Excel, 'base64');

        console.log('XLS file saved successfully at: ', path);
        Alert.alert(
          'Download Successful',
          'Guest list downloaded successfully Formatted as Excel. Please Check Download Folder.',
        );
      } catch (error) {
        console.error('Failed to save XLS file: ', error);
      }
    }
    //================ End the file download of Excel formate Save local file manager ====================
  } catch (error) {
    console.log('file import error', error);
  }
};

/**
 * Open a file using the native file manager
 */
// const openFile = async (filePath: string) => {
//   try {
//     if (Platform.OS === 'android') {
//       // Add "file://" prefix for Android
//       const androidPath = `file://${filePath}`;
//       (await Linking.canOpenURL(androidPath)) && Linking.openURL(androidPath);
//     } else {
//       // Direct path works for iOS
//       (await Linking.canOpenURL(filePath)) && Linking.openURL(filePath);
//     }
//     console.log('File opened:', filePath);
//   } catch (error) {
//     console.error('Failed to open file:', error);
//     Alert.alert(
//       'Open File Failed',
//       'Unable to open the file. Please check the file path or permissions.',
//     );
//   }
// };
