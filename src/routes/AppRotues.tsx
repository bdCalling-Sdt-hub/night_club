// In App.js in a new project

import * as React from 'react';

import Routes from './Routes';
import {ToastProvider} from '../components/modals/Toaster';

export default function AppRoutes() {
  return (
    <>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </>
  );
}
