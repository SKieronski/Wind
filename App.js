import 'react-native-gesture-handler' //we need this to use multiple navigators
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/screens/AppScreens';
import {Provider as AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App;