/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppRoutes from './src/routes/AppRotues';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppRoutes);
