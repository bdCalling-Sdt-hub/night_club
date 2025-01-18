import * as XLSX from 'xlsx';

import {Alert} from 'react-native';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';
import {pick} from 'react-native-document-picker';

export const useImportData = async () => {
  try {
    const [pickResult] = await pick(); // File picker

    const fileExtension = pickResult.name.split('.').pop()?.toLowerCase();
    if (!fileExtension) throw new Error('Invalid file format.');

    // console.log('File Extension:', fileExtension);

    let jsonData: any[] = [];

    const fileUri = pickResult.uri;

    if (fileExtension === 'csv' || fileExtension === 'txt') {
      // Read the file content using react-native-fs
      const fileContent = await RNFS.readFile(fileUri, 'utf8');

      // Parse CSV or Text content
      Papa.parse(fileContent, {
        header: true,
        complete: results => {
          if (results.errors.length > 0) {
            console.error('Parsing Errors:', results.errors);
          }
          jsonData = results.data; // Parsed JSON

          return jsonData;
        },
      });
      return jsonData;
    } else if (fileExtension === 'xlsx') {
      // Read the XLSX file content
      const fileContent = await RNFS.readFile(fileUri, 'base64'); // XLSX needs base64 encoding
      const workbook = XLSX.read(fileContent, {type: 'base64'});

      // Convert first sheet to JSON
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      jsonData = XLSX.utils.sheet_to_json(worksheet);

      // console.log('XLSX to JSON:', jsonData);
      return jsonData;
    } else {
      Alert.alert(
        'Invalid File Format',
        'Please select a CSV, TXT, or XLSX file for import.',
      );
    }
  } catch (err: unknown) {
    Alert.alert(
      'Import Failed',
      'Unable to import the file. Please try again.',
    );
  }
};
