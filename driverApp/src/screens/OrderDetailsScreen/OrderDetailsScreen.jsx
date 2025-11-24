import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { acceptOrder } from '../../api/orderApi';
import useAuth from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Find order from the list (this is a placeholder, a real app would fetch by ID)
const getOrderById = (orders, id) => orders.find(o => o._id === id);

const OrderDetailsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  // This is a simplification. In a real app, you'd fetch the order by its ID
  // or pass the full order object from the dashboard.
  // For now, let's assume the dashboard passed the *full* order object
  // Let's adjust the dashboard to pass the full object.
  
  // NOTE: I will update the Dashboard screen to pass the full order object
  // to make this screen work.
  
  const [order, setOrder] = useState(route.params.order); // Assume full order is passed
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!order) {
     // Fallback if order wasn't passed (shouldn't happen with our fix)
     return <View style={styles.centered}><Text style={styles.emptyText}>Order not found.</Text></View>
  }

  const handleAcceptOrder = async () => {
    setLoading(true);
    try {
      const updatedOrder = await acceptOrder(order._id, user.token);
      Alert.alert(
        "Order Accepted!",
        "You have accepted this order. You are now 'En Route'.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Failed to Accept", error.message);
      setLoading(false);
    }
  };

  const initialRegion = {
    latitude: order.location.latitude,
    longitude: order.location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <ScrollView style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker 
          coordinate={order.location} 
          title="Delivery Location" 
          pinColor={colors.primary} 
        />
      </MapView>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Order Details</Text>

        <View style={styles.card}>
          <View style={styles.detailItem}>
            <Icon name="account-circle" size={24} color={colors.primary}/>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Customer</Text>
              <Text style={styles.detailValue}>{order.user?.name || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Icon name="gas-station" size={24} color={colors.primary}/>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Fuel / Quantity</Text>
              <Text style={styles.detailValue}>{order.fuelType} / {order.quantity} Liters</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="currency-inr" size={24} color={colors.primary}/>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Total Payout</Text>
              <Text style={[styles.detailValue, styles.total]}>₹{order.totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Button 
          title="Accept This Order"
          loading={loading}
          onPress={handleAcceptOrder}
          style={styles.acceptButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    height: 300,
  },
  detailsContainer: {
    padding: spacing.medium,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.medium,
  },
  card: {
    backgroundColor: colors.border,
    borderRadius: 12,
    padding: spacing.medium,
    marginBottom: spacing.large,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(236, 240, 241, 0.1)',
  },
  detailTextContainer: {
    marginLeft: spacing.medium,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  detailValue: {
    ...typography.h2,
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  total: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: colors.secondary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default OrderDetailsScreen;