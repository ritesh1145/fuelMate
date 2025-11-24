import React from 'react';
import useAuth from '../hooks/useAuth';
// AppNavigator will be created in the next step
// import AppNavigator from './AppNavigator'; 
import AuthNavigator from './AuthNavigator';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    );
  }
  
  // NOTE: We will create AppNavigator in the next step.
  // For now, it will only show AuthNavigator.
  // return user ? <AppNavigator /> : <AuthNavigator />;
  
  // TEMPORARY: Until we build the driver dashboard, let's just show Auth.
  // Once we build the main app, we will uncomment the line above.
  if (user) {
     // This is just a placeholder until we build the main driver screens
     return (
       <View style={styles.container}>
         <LoadingIndicator />
         <Text style={{color: colors.white}}>Logged In! (Main app next)</Text>
       </View>
     );
  }
  
  return <AuthNavigator />;
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