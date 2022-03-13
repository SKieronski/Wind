import 'react-native-gesture-handler' //we need this to use multiple navigators
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/screens/AppScreens';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as RunRouteProvider} from './src/context/RunRouteContext'

const App = () => {
  return (
    <RunRouteProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppScreens />
        </NavigationContainer>
      </AuthProvider>
    </RunRouteProvider>
    
  )
}

export default App;