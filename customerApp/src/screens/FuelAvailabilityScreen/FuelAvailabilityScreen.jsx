import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../constants/theme';
import ROUTES from '../../constants/routes';

const FuelAvailabilityScreen = ({ route, navigation }) => {
  const { fuelType } = route.params;
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    // Simulate fetching availability data
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          area: 'Downtown',
          distance: '2.5 km',
          quantity: 5000,
          pricePerLiter: fuelType === 'Petrol' ? 95 : fuelType === 'Diesel' ? 89 : fuelType === 'CNG' ? 75 : 120,
          supplier: 'FuelMate Station A',
          rating: 4.5,
        },
        {
          id: 2,
          area: 'City Center',
          distance: '3.8 km',
          quantity: 3500,
          pricePerLiter: fuelType === 'Petrol' ? 96 : fuelType === 'Diesel' ? 90 : fuelType === 'CNG' ? 76 : 122,
          supplier: 'FuelMate Station B',
          rating: 4.7,
        },
        {
          id: 3,
          area: 'Suburb Area',
          distance: '5.2 km',
          quantity: 7000,
          pricePerLiter: fuelType === 'Petrol' ? 94 : fuelType === 'Diesel' ? 88 : fuelType === 'CNG' ? 74 : 118,
          supplier: 'FuelMate Station C',
          rating: 4.3,
        },
        {
          id: 4,
          area: 'Industrial Zone',
          distance: '6.5 km',
          quantity: 10000,
          pricePerLiter: fuelType === 'Petrol' ? 93 : fuelType === 'Diesel' ? 87 : fuelType === 'CNG' ? 73 : 115,
          supplier: 'FuelMate Station D',
          rating: 4.6,
        },
      ];
      setAvailability(mockData);
      setLoading(false);
    }, 1000);
  }, [fuelType]);

  const getFuelIcon = () => {
    switch (fuelType) {
      case 'Petrol':
        return 'gas-station';
      case 'Diesel':
        return 'gas-station-outline';
      case 'CNG':
        return 'gas-cylinder';
      case 'Electric':
        return 'ev-station';
      default:
        return 'gas-station';
    }
  };

  const getFuelColor = () => {
    switch (fuelType) {
      case 'Petrol':
        return '#FF6B6B';
      case 'Diesel':
        return '#4ECDC4';
      case 'CNG':
        return '#95E1D3';
      case 'Electric':
        return '#FFA07A';
      default:
        return colors.primary;
    }
  };

  const handleSelectSupplier = (supplier) => {
    navigation.navigate(ROUTES.ORDER_FUEL, {
      fuelType,
      supplier,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Finding available {fuelType}...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: getFuelColor() }]}>
        <MaterialCommunityIcons name={getFuelIcon()} size={50} color="#FFF" />
        <Text style={styles.headerTitle}>{fuelType}</Text>
        <Text style={styles.headerSubtitle}>Available in Your Area</Text>
      </View>

      {/* Availability List */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {availability.length} Suppliers Found
        </Text>

        {availability.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleSelectSupplier(item)}
            activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <View style={styles.supplierInfo}>
                <Text style={styles.supplierName}>{item.supplier}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color="#FFD700"
                  />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.distanceBadge}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.distanceText}>{item.distance}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.infoText}>{item.area}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="barrel"
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.infoText}>
                  {item.quantity.toLocaleString()} Liters Available
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="currency-inr"
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.infoText}>
                  ₹{item.pricePerLiter}/Liter
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.selectText}>Tap to Order</Text>
              <MaterialCommunityIcons
                name="arrow-right-circle"
                size={24}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.medium,
    ...typography.body,
    color: colors.textSecondary,
  },
  header: {
    padding: spacing.xlarge,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: spacing.medium,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: spacing.small,
    opacity: 0.9,
  },
  content: {
    padding: spacing.large,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.large,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: spacing.large,
    marginBottom: spacing.large,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.medium,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.small,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: spacing.small,
    fontSize: 14,
    color: colors.textSecondary,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
  },
  distanceText: {
    marginLeft: spacing.small,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: spacing.medium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  infoText: {
    marginLeft: spacing.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default FuelAvailabilityScreen;
