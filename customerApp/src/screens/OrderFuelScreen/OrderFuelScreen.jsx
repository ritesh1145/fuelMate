import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { colors, spacing, typography } from '../../constants/theme';
import useAuth from '../../hooks/useAuth';
import { createOrder } from '../../api/mockApi';
import { ROUTES } from '../../constants/routes';

// Dummy initial region. In a real app, get this from device location.
const initialRegion = {
  latitude: 28.5355,
  longitude: 77.3910,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const OrderFuelScreen = ({ navigation }) => {
  const [fuelType, setFuelType] = useState('Petrol');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState(initialRegion);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePlaceOrder = async () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid quantity.');
      return;
    }
    setLoading(true);
    try {
        const orderDetails = {
            fuelType,
            quantity: Number(quantity),
            total: Number(quantity) * 90, // Assuming price of 90
            location,
        };
      await createOrder(user.id, orderDetails);
      navigation.navigate(ROUTES.ORDER_CONFIRMATION, { orderDetails });
    } catch (error) {
      Alert.alert('Order Failed', 'Could not place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Select Fuel Type</Text>
        <View style={styles.fuelTypeContainer}>
          {['Petrol', 'Diesel'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.fuelTypeButton, fuelType === type && styles.fuelTypeSelected]}
              onPress={() => setFuelType(type)}
            >
              <Text style={[styles.fuelTypeText, fuelType === type && styles.fuelTypeSelectedText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          label="Quantity (in Liters)"
          placeholder="e.g., 20"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Confirm Delivery Location</Text>
        <Text style={styles.infoText}>Tap and drag the pin to adjust location.</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
          <Marker
            draggable
            coordinate={location}
            onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
            title="Delivery Location"
          />
      </MapView>

      <View style={styles.footer}>
        <Button
            title="Place Order"
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
    form: {
        padding: spacing.large,
    },
    label: {
        ...typography.body,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.medium,
    },
    infoText: {
        ...typography.body,
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: spacing.medium,
        marginTop: -spacing.medium,
    },
    fuelTypeContainer: {
        flexDirection: 'row',
        marginBottom: spacing.large,
    },
    fuelTypeButton: {
        flex: 1,
        padding: spacing.medium,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        marginHorizontal: spacing.small,
    },
    fuelTypeSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    fuelTypeText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    fuelTypeSelectedText: {
        color: colors.white,
    },
    map: {
        width: '100%',
        height: 300,
    },
    footer: {
        padding: spacing.large,
    }
});


export default OrderFuelScreen;
