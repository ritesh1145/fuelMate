import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// Corrected: Changed from { ROUTES } to ROUTES (default import)
import ROUTES from '../constants/routes';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === ROUTES.HOME) {
            iconName = 'home-variant';
          } else if (route.name === ROUTES.ORDER_HISTORY) {
            iconName = 'history';
          } else if (route.name === ROUTES.PROFILE) {
            iconName = 'account-circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
            paddingBottom: 5,
            height: 60,
        }
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} options={{ title: 'Dashboard' }}/>
      <Tab.Screen name={ROUTES.ORDER_HISTORY} component={OrderHistoryScreen} options={{ title: 'Order History' }}/>
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;

