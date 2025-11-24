import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { colors, spacing, typography } from '../../constants/theme';
import ROUTES from '../../constants/routes';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [lastOrderedFuel, setLastOrderedFuel] = useState('Petrol');

  useEffect(() => {
    // Load last ordered fuel type from storage
    const loadLastOrder = async () => {
      try {
        const lastFuel = await AsyncStorage.getItem('lastOrderedFuel');
        if (lastFuel) {
          setLastOrderedFuel(lastFuel);
        }
      } catch (error) {
        console.log('Error loading last order:', error);
      }
    };
    loadLastOrder();
  }, []);

  const handleQuickOrder = () => {
    navigation.navigate(ROUTES.FUEL_AVAILABILITY, { fuelType: lastOrderedFuel });
  };

  const fuelTypes = [
    { id: 1, name: 'Petrol', icon: 'gas-station', color: '#E74C3C', image: require('../../assets/petrol.jpg') },
    { id: 2, name: 'Diesel', icon: 'truck', color: '#F39C12', image: require('../../assets/deisel.jpg') },
    { id: 3, name: 'CNG', icon: 'fire', color: '#3498DB', image: require('../../assets/cng.jpg') },
    { id: 4, name: 'Electric', icon: 'lightning-bolt', color: '#2ECC71', image: null },
  ];

  const quickActions = [
    { id: 1, title: 'Order History', icon: 'history', route: ROUTES.ORDER_HISTORY, color: '#9B59B6', image: require('../../assets/order-history.jpg') },
    { id: 2, title: 'My Profile', icon: 'account', route: ROUTES.PROFILE, color: '#1ABC9C', image: require('../../assets/user-profile.jpg') },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.welcomeContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={styles.welcomeText}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'User'}!</Text>
          </View>
        </View>
        <Text style={styles.heroSubtitle}>Let's fuel up your journey today 🚗</Text>
      </View>

      {/* Main Action Card */}
      <View style={styles.mainActionCard}>
        <View style={styles.cardHeader}>
          <Icon name="lightning-bolt-circle" size={32} color={colors.primary} />
          <Text style={styles.mainCardTitle}>Quick Fuel Delivery</Text>
        </View>
        <Text style={styles.mainCardDescription}>
          Order fuel delivered to your location in minutes. Fast, convenient, and hassle-free.
        </Text>
        <Button
          title={`Order ${lastOrderedFuel} Now`}
          onPress={handleQuickOrder}
          style={styles.orderButton}
        />
      </View>

      {/* Fuel Types Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Fuel Types</Text>
        <View style={styles.fuelTypesGrid}>
          {fuelTypes.map((fuel) => (
            <TouchableOpacity
              key={fuel.id}
              style={styles.fuelTypeCard}
              onPress={() => navigation.navigate(ROUTES.FUEL_AVAILABILITY, { fuelType: fuel.name })}
            >
              {fuel.image ? (
                <>
                  <Image source={fuel.image} style={styles.fuelTypeImage} />
                  <View style={styles.fuelTypeInfo}>
                    <Icon name={fuel.icon} size={24} color={fuel.color} />
                    <Text style={styles.fuelTypeName}>{fuel.name}</Text>
                  </View>
                </>
              ) : (
                <View style={styles.fuelTypeInfo}>
                  <Icon name={fuel.icon} size={36} color={fuel.color} />
                  <Text style={styles.fuelTypeName}>{fuel.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={() => navigation.navigate(action.route)}
            >
              <Icon name={action.icon} size={28} color={colors.white} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* How It Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {[
            { step: 1, icon: 'map-marker', text: 'Set your delivery location' },
            { step: 2, icon: 'gas-station', text: 'Choose fuel type & quantity' },
            { step: 3, icon: 'credit-card', text: 'Confirm and pay securely' },
            { step: 4, icon: 'truck-delivery', text: 'Driver delivers to you!' },
          ].map((item) => (
            <View key={item.step} style={styles.stepCard}>
              <View style={styles.stepIconContainer}>
                <Icon name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepNumber}>Step {item.step}</Text>
                <Text style={styles.stepText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={24} color={colors.success} />
          <Text style={styles.statNumber}>Fast</Text>
          <Text style={styles.statLabel}>Delivery</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="shield-check" size={24} color={colors.primary} />
          <Text style={styles.statNumber}>Secure</Text>
          <Text style={styles.statLabel}>Payment</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="account-check" size={24} color={colors.secondary} />
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Support</Text>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroSection: {
    backgroundColor: colors.white,
    padding: spacing.large,
    paddingTop: spacing.xlarge,
    paddingBottom: spacing.xlarge,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  welcomeText: {
    marginLeft: spacing.medium,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  mainActionCard: {
    backgroundColor: colors.white,
    margin: spacing.large,
    padding: spacing.large,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  mainCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: spacing.small,
  },
  mainCardDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.large,
  },
  orderButton: {
    marginTop: 0,
  },
  section: {
    paddingHorizontal: spacing.large,
    marginBottom: spacing.large,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.medium,
  },
  fuelTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fuelTypeCard: {
    width: (width - spacing.large * 3) / 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.medium,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  fuelTypeImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  fuelTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
    justifyContent: 'center',
  },
  fuelTypeName: {
    marginLeft: spacing.small,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    padding: spacing.large,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: spacing.small,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quickActionText: {
    marginTop: spacing.small,
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  stepsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.medium,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  stepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  stepContent: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.large,
    marginBottom: spacing.large,
  },
  statCard: {
    backgroundColor: colors.white,
    padding: spacing.large,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.small,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.small,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bottomPadding: {
    height: spacing.xlarge,
  },
});

export default HomeScreen;

