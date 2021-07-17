import 'react-native-gesture-handler';

import React, { useState, useEffect, useContext } from 'react';
import MainContext, { DispatchContext } from './src/utils/context/MainContext';
import AppNavContainer from './src/components/navigation/AppNavContainer';
import axios from 'axios'
import Define from './src/utils/helpers/Define';


//axios setup
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

export default function App() {



  return (
    <>

      <MainContext>
        <AppNavContainer />
      </MainContext>
    </>
  );
}