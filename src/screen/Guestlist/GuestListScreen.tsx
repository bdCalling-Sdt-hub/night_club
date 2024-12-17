import * as XLSX from 'xlsx';

import {BaseColor, PrimaryColor, height} from '../../utils/utils';
import {Checkbox, Picker} from 'react-native-ui-lib';
import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCloseGray,
  IconDownArrayGray,
  IconFilterGray,
} from '../../icons/icons';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import Background from '../components/Background';
import Card from '../../components/cards/Card';
import EmptyCard from '../../components/Empty/EmptyCard';
import IwtButton from '../../components/buttons/IwtButton';
import {NavigProps} from '../../interfaces/NaviProps';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import data from './guest.json';
import tw from '../../lib/tailwind';
import {useToast} from '../../components/modals/Toaster';

const GuestListScreen = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const [selectGuest, setSelectGuest] = React.useState(null);

  const [addedBy, setAddedBy] = React.useState('Added by');
  const [tags, setTags] = React.useState('Tags');

  const [search, setSearch] = React.useState('');

  const jsonData = [
    {name: 'John', age: 30, city: 'New York'},
    {name: 'Jane', age: 25, city: 'London'},
    {name: 'Doe', age: 35, city: 'Paris'},
  ];

  const csv = Papa.unparse(jsonData);

  const saveCSVFile = async (csvData: any) => {
    let path = '';

    if (Platform.OS === 'android') {
      // Set path for Android Downloads folder
      path = RNFS.ExternalStorageDirectoryPath + '/Download/data.csv'; // Use '/Download/' directory on Android
    } else {
      // For iOS, save in the Documents directory (no Downloads folder on iOS)
      path = RNFS.DocumentDirectoryPath + '/data.csv';
    }

    try {
      await RNFS.writeFile(path, csvData, 'utf8');
      console.log('CSV file saved at: ', path);
    } catch (error) {
      console.error('Failed to save CSV file: ', error);
    }
  };
  const saveTextFile = async (csvData: any) => {
    let path = '';

    if (Platform.OS === 'android') {
      // Set path for Android Downloads folder
      path = RNFS.ExternalStorageDirectoryPath + '/Download/data.text'; // Use '/Download/' directory on Android
    } else {
      // For iOS, save in the Documents directory (no Downloads folder on iOS)
      path = RNFS.DocumentDirectoryPath + '/data.text';
    }

    try {
      await RNFS.writeFile(path, csvData, 'utf8');
      console.log('CSV file saved at: ', path);
    } catch (error) {
      console.error('Failed to save CSV file: ', error);
    }
  };
  // Function to flatten the JSON data

  //=================== Excel Import start ======================
  const flattenJsonData = (jsonData: any) => {
    const flattenedData = [];

    // Loop through each guest and flatten their data
    jsonData.guest.forEach((item: any) => {
      const guestData = {
        Title: item.title,
        Type: item.type,
        GuestCheckin: item.guest.checkin,
        GuestTotal: item.guest.total,
      };
      flattenedData.push(guestData);
    });

    return flattenedData;
  };

  // Function to convert JSON data to Excel and save it
  const parseExcel = async (jsonData: any) => {
    try {
      // Check if JSON data is valid and not empty
      if (!jsonData || jsonData.guest.length === 0) {
        console.log('No data to write to Excel.');
        return;
      }

      // Flatten the JSON data to a table-like structure
      const flattenedData = flattenJsonData(jsonData);

      // Convert JSON data to Excel sheet
      const ws = XLSX.utils.json_to_sheet(flattenedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // Write the workbook to binary data (XLSX format)
      const binaryExcel = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

      // Convert the binary string to base64
      const base64Excel = binaryToBase64(binaryExcel);

      // Set the file path based on platform
      let path = '';
      if (Platform.OS === 'android') {
        path = RNFS.ExternalStorageDirectoryPath + '/Download/output.xlsx'; // Android path
      } else {
        path = RNFS.DocumentDirectoryPath + '/output.xlsx'; // iOS path
      }

      // Write the base64 data to the file
      await RNFS.writeFile(path, base64Excel, 'base64');

      console.log('XLS file saved successfully at: ', path);
    } catch (error) {
      console.error('Failed to save XLS file: ', error);
    }
  };

  // Helper function to convert binary string to base64
  const binaryToBase64 = (binary: string): string => {
    let base64String = '';
    for (let i = 0; i < binary.length; i++) {
      base64String += String.fromCharCode(binary.charCodeAt(i));
    }
    return global.btoa(base64String); // Use global.btoa for base64 encoding in React Native
  };
  //=================== Excel Import end ======================
  const handleImportData = () => {
    showToast({
      multipleBTNStyle: tw`flex-col gap-3`,
      multipleButton: [
        {
          buttonText: 'Import as text',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            // handleAddGuest();
            saveTextFile(csv);
            closeToast();
          },
        },
        {
          buttonText: 'Import as CSV',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            saveCSVFile(csv);
            closeToast();
          },
        },
        {
          buttonText: 'Import as Excel',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            parseExcel(data);
            closeToast();
          },
        },
      ],
    });
  };

  console.log(selectGuest);

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        title="View Guests List "
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TButton
            title="Import"
            onPress={handleImportData}
            containerStyle={tw`w-24 p-0 h-6 rounded-lg  bg-transparent self-end justify-end`}
            titleStyle={tw`text-primary font-RobotoBold text-base`}
          />
        }
      />

      {/* <View style={tw`px-4 mb-4 `}>
        <Text style={tw`text-white60 text-xs font-RobotoMedium`}>
          The Avalon Hollywood {'>'} Ultra Music Festival {'>'} 11/12/2024
        </Text>
      </View> */}

      <View style={tw`px-[4%]`}>
        <SearchCard search={search} setSearch={setSearch} />
      </View>

      <View
        style={tw`mt-4 mb-2 flex-row bg-secondary60 h-10 mx-4 rounded-lg items-center justify-between gap-1`}>
        <IwtButton
          title="Filter"
          svg={IconFilterGray}
          containerStyle={tw`p-0 bg-transparent items-center shadow-none  w-20`}
        />

        <View style={tw`px-1 flex-row items-center gap-2`}>
          <Picker
            value={tags}
            onChange={text => setTags(text)}
            renderInput={preps => {
              return (
                <TouchableOpacity
                  onPress={preps.onPress}
                  style={tw`border border-primary800 flex-row items-center justify-between h-7 px-4 rounded-lg gap-2`}>
                  <Text
                    numberOfLines={1}
                    style={tw`text-white100 w-15 font-RobotoMedium text-[10px]`}>
                    {tags}
                  </Text>
                  <SvgXml xml={IconDownArrayGray} height={10} width={10} />
                </TouchableOpacity>
              );
            }}
            renderItem={(value, items) => {
              return (
                <View
                  style={tw` mt-1 pb-2 mx-[4%] border-b border-b-gray-800 justify-center`}>
                  <Text
                    style={tw`text-white100 py-3  font-RobotoMedium text-base`}>
                    {value}
                  </Text>
                </View>
              );
            }}
            renderCustomDialogHeader={preps => {
              return (
                <View style={tw`flex-row justify-between items-center mr-2`}>
                  <TouchableOpacity
                    onPress={preps.onCancel}
                    style={tw`self-start py-3 px-4`}>
                    <SvgXml xml={IconCloseGray} height={20} width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTags('Tags');
                      preps.onCancel();
                    }}
                    style={tw` py-1 px-4 border border-primary rounded-lg `}>
                    <Text style={tw`text-primary font-RobotoMedium text-sm`}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            fieldType={Picker.fieldTypes.filter}
            paddingH
            items={[
              {label: 'Lounge', value: 'Lounge'},
              {label: 'Rooftop', value: 'Rooftop'},
              {label: 'Skyline Views', value: 'Skyline Views'},
              {label: 'Relaxation', value: 'Relaxation'},
              {label: 'Cocktails', value: 'Cocktails'},
              {label: 'Chill Vibes', value: 'Chill Vibes'},
              {label: 'Nightlife', value: 'Nightlife'},
              {label: 'Exclusive', value: 'Exclusive'},
              {label: 'Urban', value: 'Urban'},
              {label: 'Event Venue', value: 'Event Venue'},
            ]}
            pickerModalProps={{
              overlayBackgroundColor: BaseColor,
            }}
          />
        </View>
      </View>
      {/* <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          Checked in
        </Text>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          {data.checkin}/{data.total}
        </Text>
      </View> */}

      <FlatList
        contentContainerStyle={tw`px-4 pt-2 pb-4 gap-3`}
        data={data.guest}
        ListEmptyComponent={
          <EmptyCard hight={height * 0.6} title="No Venues" />
        }
        renderItem={({item, index}) => (
          <Card
            onPress={() => {
              if (selectGuest?.length > 0) {
                if (selectGuest?.includes(item?.guest)) {
                  setSelectGuest(selectGuest?.filter(i => i !== item?.guest));
                } else {
                  setSelectGuest([...selectGuest, item?.guest]);
                }
              } else {
                setSelectGuest([item?.guest]);
              }
            }}
            containerStyle={tw` flex-row gap-3 items-center`}
            component={
              <Checkbox
                value={true}
                onValueChange={() => {}}
                style={tw``}
                color={PrimaryColor}
              />
            }>
            <Card.Details
              containerStyle={tw``}
              data={[
                {
                  title: item.title,

                  titleStyle: tw`text-white50 font-RobotoBold text-sm`,
                },
                {
                  title: 'VIP',
                  titleStyle: tw`text-white60 font-RobotoBold text-xs`,
                },
              ]}
            />
          </Card>
        )}
      />
    </Background>
  );
};

export default GuestListScreen;
