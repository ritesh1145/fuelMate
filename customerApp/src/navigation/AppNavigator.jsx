import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import FuelAvailabilityScreen from '../screens/FuelAvailabilityScreen/FuelAvailabilityScreen';
import OrderFuelScreen from '../screens/OrderFuelScreen/OrderFuelScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen/OrderConfirmationScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen/PaymentMethodsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen/HelpSupportScreen';
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
        name={ROUTES.FUEL_AVAILABILITY}
        component={FuelAvailabilityScreen}
        options={{
          headerShown: true,
          title: 'Fuel Availability',
        }}
      />
      <Stack.Screen
        name={ROUTES.ORDER_FUEL}
        component={OrderFuelScreen}
        options={{
          headerShown: true,
          title: 'Order Fuel',
        }}
      />
      <Stack.Screen
        name={ROUTES.ORDER_CONFIRMATION}
        component={OrderConfirmationScreen}
        options={{
          headerShown: true,
          title: 'Order Confirmation',
        }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name={ROUTES.PAYMENT_METHODS}
        component={PaymentMethodsScreen}
        options={{
          headerShown: true,
          title: 'Payment Methods',
        }}
      />
      <Stack.Screen
        name={ROUTES.HELP_SUPPORT}
        component={HelpSupportScreen}
        options={{
          headerShown: true,
          title: 'Help & Support',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

