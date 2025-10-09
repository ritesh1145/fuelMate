import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen/OrderConfirmationScreen';
import ROUTES from '../constants/routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.HOME_TABS} component={HomeTabs} />
      <Stack.Screen
        name={ROUTES.ORDER_CONFIRMATION}
        component={OrderConfirmationScreen}
        options={{
          headerShown: true,
          title: 'Order Confirmation',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

