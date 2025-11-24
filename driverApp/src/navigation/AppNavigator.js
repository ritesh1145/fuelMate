import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen/OrderDetailsScreen';
import ROUTES from '../constants/routes';
import { colors } from '../constants/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { color: colors.textPrimary },
      }}>
      <Stack.Screen 
        name={ROUTES.DASHBOARD} 
        component={DashboardScreen} 
        options={{ title: 'Available Orders' }}
      />
      <Stack.Screen 
        name={ROUTES.ORDER_DETAILS} 
        component={OrderDetailsScreen} 
        options={{ title: 'Order Details' }}
      />
      {/* We can add the Profile screen later */}
      {/* <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;