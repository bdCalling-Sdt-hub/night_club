import React from 'react';
import {View} from 'react-native';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import TButton from '../../components/buttons/TButton';
import OptionSelect from '../../components/cards/OptionSelect';
import SearchCard from '../../components/cards/SearchCard';
import {useToast} from '../../components/modals/Toaster';
import {useImportFile} from '../../hook/useImportFile';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Background from '../components/Background';
import AllGuest from './components/AllGuest';
import SavedGuestList from './components/SavedGuestList';
import data from './guest.json';

const GuestListScreen = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const [search, setSearch] = React.useState('');

  const jsonData = [
    {name: 'John', age: 30, city: 'New York'},
    {name: 'Jane', age: 25, city: 'London'},
    {name: 'Doe', age: 35, city: 'Paris'},
  ];

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
            useImportFile({data, type: 'text'});
            closeToast();
          },
        },
        {
          buttonText: 'Import as CSV',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data, type: 'csv'});
            closeToast();
          },
        },
        {
          buttonText: 'Import as Excel',
          buttonStyle: tw`border-primary bg-transparent border w-full self-center`,
          buttonTextStyle: tw`text-white50 font-RobotoBold text-base`,
          onPress: () => {
            useImportFile({data, type: 'xlsx'});
            closeToast();
          },
        },
      ],
    });
  };

  // console.log(selectGuest);

  const [selectOption, setSelectOption] = React.useState('All Guest');

  return (
    <Background style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => {
          navigation.goBack();
        }}
        offBack
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

      <View style={tw`mt-4`}>
        <OptionSelect
          data={['All Guest', 'Saved Guestlists']}
          selectOption={selectOption}
          containerStyle={tw`px-4`}
          setSelectOption={setSelectOption}
        />
      </View>

      {/* <View style={tw`flex-row justify-between items-center px-4 mb-4`}>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          Checked in
        </Text>
        <Text style={tw`text-white50 font-RobotoBold text-base`}>
          {data.checkin}/{data.total}
        </Text>
      </View> */}

      {selectOption === 'All Guest' ? (
        <AllGuest navigation={navigation} />
      ) : (
        <SavedGuestList navigation={navigation} />
      )}
    </Background>
  );
};

export default GuestListScreen;
