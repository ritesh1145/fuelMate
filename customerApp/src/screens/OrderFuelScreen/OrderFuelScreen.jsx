import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { colors, spacing, typography } from '../../constants/theme';
import useAuth from '../../hooks/useAuth';
import { createOrder } from '../../api/orderApi';
import ROUTES from '../../constants/routes';

const OrderFuelScreen = ({ route, navigation }) => {
  const { fuelType, supplier } = route.params;
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePlaceOrder = async () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid quantity.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Missing Address', 'Please enter your delivery address.');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Missing Phone', 'Please enter your phone number.');
      return;
    }

    setLoading(true);
    try {
      // Get the auth token from user context
      const userData = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.token;

      if (!token) {
        Alert.alert('Error', 'Please login again');
        return;
      }

      const orderData = {
        fuelType,
        quantity: Number(quantity),
        pricePerLiter: supplier.pricePerLiter,
        totalAmount: Number(quantity) * supplier.pricePerLiter,
        deliveryAddress: address,
        customerPhone: phoneNumber,
        supplierName: supplier.supplier,
        supplierArea: supplier.area,
        paymentMethod: 'cash',
        notes: '',
      };

      console.log('Creating order:', orderData);
      const response = await createOrder(orderData, token);
      console.log('Order response:', response);
      
      if (response.success) {
        // Save the fuel type for future quick orders
        await AsyncStorage.setItem('lastOrderedFuel', fuelType);
        
        Alert.alert(
          'Success! 🎉',
          'Your order has been placed successfully! A driver will be assigned soon.',
          [
            {
              text: 'View Order',
              onPress: () => navigation.navigate(ROUTES.ORDER_CONFIRMATION, {
                orderDetails: {
                  ...orderData,
                  orderId: response.order._id,
                  status: response.order.status,
                  createdAt: response.order.createdAt,
                }
              })
            }
          ]
        );
      }
    } catch (error) {
      console.error('Order creation error:', error);
      Alert.alert(
        'Order Failed',
        error.message || 'Could not place your order. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = quantity ? (Number(quantity) * supplier.pricePerLiter).toFixed(2) : '0.00';

  return (
    <ScrollView style={styles.container}>
      {/* Supplier Info Card */}
      <View style={styles.supplierCard}>
        <View style={styles.supplierHeader}>
          <MaterialCommunityIcons
            name="gas-station"
            size={40}
            color={colors.primary}
          />
          <View style={styles.supplierDetails}>
            <Text style={styles.supplierName}>{supplier.supplier}</Text>
            <Text style={styles.supplierArea}>{supplier.area}</Text>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{supplier.rating}</Text>
              <Text style={styles.distanceText}> • {supplier.distance}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.priceInfo}>
          <Text style={styles.fuelTypeText}>{fuelType}</Text>
          <Text style={styles.priceText}>₹{supplier.pricePerLiter}/Liter</Text>
        </View>
      </View>

      {/* Order Form */}
      <View style={styles.form}>
        <TextInput
          label="Quantity (Liters)"
          placeholder="e.g., 20"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <TextInput
          label="Delivery Address"
          placeholder="Enter complete address"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
        />

        <TextInput
          label="Phone Number"
          placeholder="Enter your contact number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        {/* Price Summary */}
        {quantity && Number(quantity) > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Quantity:</Text>
              <Text style={styles.summaryValue}>{quantity} Liters</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price per Liter:</Text>
              <Text style={styles.summaryValue}>₹{supplier.pricePerLiter}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>₹{totalPrice}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          title={`Place Order - ₹${totalPrice}`}
          onPress={handlePlaceOrder}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

// ... Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  supplierCard: {
    backgroundColor: '#FFF',
    margin: spacing.large,
    padding: spacing.large,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  supplierHeader: {
    flexDirection: 'row',
    marginBottom: spacing.large,
  },
  supplierDetails: {
    marginLeft: spacing.medium,
    flex: 1,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  supplierArea: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  distanceText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  fuelTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  form: {
    paddingHorizontal: spacing.large,
  },
  summaryCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.large,
    borderRadius: 12,
    marginTop: spacing.large,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.medium,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.medium,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    padding: spacing.large,
  },
});

export default OrderFuelScreen;
