import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from '../components/modals/Toaster';
import AuthProvider from '../context/AuthProvider';
import {BaseColor} from '../utils/utils';
import Routes from './Routes'; // Assuming you have a Routes component

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <SafeAreaProvider>
          {/* Set the status bar behavior */}

          <SafeAreaView style={{flex: 1, backgroundColor: BaseColor}}>
            <Routes />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
