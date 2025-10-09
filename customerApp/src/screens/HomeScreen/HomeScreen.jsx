import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { colors, spacing, typography } from '../../constants/theme';
import ROUTES from '../../constants/routes';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello, {user?.name || 'User'}!</Text>
        <Text style={styles.subtitle}>Ready to get fueled up?</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Order</Text>
        <Text style={styles.cardBody}>
          Get fuel delivered right to your location with just a few taps.
        </Text>
        <Button
          title="Order Fuel Now"
          onPress={() => navigation.navigate(ROUTES.ORDER_FUEL)}
          style={{ marginTop: spacing.medium }}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>How it Works</Text>
        <Text style={styles.infoText}>1. Pin your location on the map.</Text>
        <Text style={styles.infoText}>2. Select your fuel type and amount.</Text>
        <Text style={styles.infoText}>3. Confirm your order and pay securely.</Text>
        <Text style={styles.infoText}>4. A driver will be on their way!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
  },
  header: {
    marginBottom: spacing.xlarge,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 18,
    marginTop: spacing.small,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.large,
    marginBottom: spacing.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.large,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.medium,
  },
  cardBody: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.small,
  },
});

export default HomeScreen;

