import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/authContext';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { colors } from './src/constants/theme';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;