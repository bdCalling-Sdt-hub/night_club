import {SafeAreaView} from 'react-native';

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ConnectionStatusBar} from 'react-native-ui-lib';
import {ToastProvider} from '../components/modals/Toaster';
import AuthProvider from '../context/AuthProvider';
import {BaseColor} from '../utils/utils';
import Routes from './Routes'; // Assuming you have a Routes component

// LogBox.ignoreAllLogs();

const App = () => {
  const [isConnected, setIsConnected] = React.useState(true);

  // console.log(isConnected);
  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <AuthProvider>
          <SafeAreaProvider>
            {/* Set the status bar behavior */}

            <SafeAreaView style={{flex: 1, backgroundColor: BaseColor}}>
              <ConnectionStatusBar
                onConnectionChange={isConnected => setIsConnected(isConnected)}
              />
              {isConnected && <Routes />}
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
