import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../constants/theme';
import Button from '../../components/common/Button';
import ROUTES from '../../constants/routes'; // Corrected import

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderDetails } = route.params;

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={100} color={colors.success} />
      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.subtitle}>Your fuel is on the way.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fuel Type:</Text>
            <Text style={styles.detailValue}>{orderDetails.fuelType}</Text>
        </View>
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>{orderDetails.quantity} Liters</Text>
        </View>
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount:</Text>
            {/* CORRECTED: Changed orderDetails.total to orderDetails.totalAmount */}
            <Text style={styles.detailValue}>₹{orderDetails.totalAmount.toFixed(2)}</Text>
        </View>
         <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID:</Text>
            {/* Added Order ID from the real object */}
            <Text style={styles.detailValue}>#{orderDetails._id.slice(-6)}</Text>
        </View>
      </View>

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate(ROUTES.HOME)}
        style={{ marginTop: spacing.large }}
      />
    </View>
  );
};

// ... Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.large,
    },
    title: {
        ...typography.h1,
        color: colors.textPrimary,
        textAlign: 'center',
        marginTop: spacing.large,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xlarge,
    },
    card: {
        backgroundColor: colors.border, // Use a slightly different background
        borderRadius: 12,
        padding: spacing.large,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        ...typography.h2,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: spacing.large,
        color: colors.textPrimary, // Changed from secondary
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.medium,
        // Add a light border for separation
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(236, 240, 241, 0.1)',
        paddingBottom: spacing.medium,
    },
    detailLabel: {
        ...typography.body,
        color: colors.textSecondary,
    },
    detailValue: {
        ...typography.body,
        color: colors.textPrimary,
        fontWeight: 'bold',
    }
});


export default OrderConfirmationScreen;