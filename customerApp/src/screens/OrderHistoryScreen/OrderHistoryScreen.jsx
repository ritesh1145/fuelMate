import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyOrders } from '../../api/orderApi';
import useAuth from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderHistoryScreen = () => {
  const [orders, setOrders]      = useState([]);
  const [loading, setLoading]    = useState(true);
  const { user }                 = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.token;

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const userOrders = await getMyOrders(token);
      console.log('Fetched orders:', userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error('Failed to fetch order history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return styles.delivered;
      case 'In_Transit': return styles.inTransit;
      case 'Assigned_To_Driver': return styles.assigned;
      case 'Cancelled':
      case 'Rejected': return styles.cancelled;
      default: return styles.pending;
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ');
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        <View style={[styles.statusBadge, getStatusColor(item.status)]}>
            <Text style={styles.statusText}>{formatStatus(item.status)}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.detailItem}>
            <Icon name="gas-station" size={20} color={colors.primary}/>
            <Text style={styles.detailText}>{item.fuelType} - {item.quantity} Liters</Text>
        </View>
        <View style={styles.detailItem}>
            <Icon name="currency-inr" size={20} color={colors.primary}/>
            <Text style={styles.detailText}>₹{item.totalAmount.toFixed(2)}</Text>
        </View>
        {item.driverName && (
          <View style={styles.detailItem}>
            <Icon name="truck" size={20} color={colors.primary}/>
            <Text style={styles.detailText}>Driver: {item.driverName}</Text>
          </View>
        )}
        <View style={styles.detailItem}>
            <Icon name="map-marker" size={20} color={colors.primary}/>
            <Text style={styles.detailText} numberOfLines={1}>{item.deliveryAddress}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={orders}
      renderItem={renderOrderItem}
      keyExtractor={item => item._id}
      ListEmptyComponent={() => (
        <View style={styles.centered}>
            <Text style={styles.emptyText}>No order history found.</Text>
        </View>
      )}
      contentContainerStyle={{ padding: spacing.large }}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        ...typography.body,
        color: colors.textSecondary,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: spacing.medium,
        marginBottom: spacing.large,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: spacing.medium,
    },
    date: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    delivered: {
        backgroundColor: colors.success,
    },
    inTransit: {
        backgroundColor: '#3b82f6',
    },
    assigned: {
        backgroundColor: '#8b5cf6',
    },
    cancelled: {
        backgroundColor: '#ef4444',
    },
    pending: {
        backgroundColor: colors.primary,
    },
    statusText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardBody: {
        paddingTop: spacing.medium,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.small,
    },
    detailText: {
        ...typography.body,
        marginLeft: spacing.medium,
        color: colors.textPrimary,
    }
});

export default OrderHistoryScreen;

