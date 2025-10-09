import React from 'react';
import useAuth from '../hooks/useAuth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const RootNavigator = () => {
  const { user, loading } = useAuth();

  // Show a loading screen while we check for an existing user session
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }

  // If a user exists, show the main app. Otherwise, show the login/signup flow.
  return user ? <AppNavigator /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    }
})

export default RootNavigator;

