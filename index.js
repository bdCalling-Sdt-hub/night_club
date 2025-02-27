/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppRoutes from './src/routes/AppRotues';

AppRegistry.registerComponent(appName, () => AppRoutes);
