import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, ImageBackground, Image } from 'react-native';
import { getAvailableOrders } from '../../api/orderApi';
import useAuth from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTES from '../../constants/routes';

const DashboardScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const data = await getAvailableOrders(user.token);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch orders when the screen first loads
    fetchOrders();

    // Add a listener to refetch orders when the driver navigates back
    // (e.g., after accepting an order)
    const unsubscribe = navigation.addListener('focus', () => {
      fetchOrders();
    });

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      // --- THIS IS THE CORRECTION ---
      // Pass the full 'item' (the order object) so the details screen can use it
      onPress={() => navigation.navigate(ROUTES.ORDER_DETAILS, { order: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>New Order: {item.fuelType}</Text>
        <Text style={styles.quantity}>{item.quantity} Liters</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.detailItem}>
          <Icon name="account-circle-outline" size={20} color={colors.textSecondary}/>
          <Text style={styles.detailText}>Customer: {item.user?.name || 'N/A'}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="map-marker-outline" size={20} color={colors.textSecondary}/>
          <Text style={styles.detailText} numberOfLines={1} ellipsizeMode="tail">
            Near: (Lat: {item.location.latitude.toFixed(2)}, Lon: {item.location.longitude.toFixed(2)})
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>Tap to view details & accept</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Finding available jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/dashboard.jpg')} 
        style={styles.headerBackground}
        imageStyle={styles.headerBackgroundImage}
      >
        <View style={styles.headerOverlay}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Welcome, {user?.name}!</Text>
            <Text style={styles.headerSubtitle}>Available Deliveries</Text>
          </View>
        </View>
      </ImageBackground>
      
      <FlatList
        style={styles.listContainer}
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => (
          <View style={styles.centered}>
            <Icon name="coffee-outline" size={60} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No available orders right now. Check back soon!</Text>
          </View>
        )}
        contentContainerStyle={{ padding: spacing.medium }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={colors.primary} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBackground: {
    height: 150,
    justifyContent: 'center',
  },
  headerBackgroundImage: {
    opacity: 0.4,
  },
  headerOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: spacing.large,
    marginVertical: spacing.medium,
    borderRadius: 15,
    padding: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: spacing.medium,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
    marginTop: 100,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.medium,
  },
  emptyText: {
    ...typography.h2,
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.medium,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    paddingHorizontal: spacing.small,
    marginBottom: spacing.medium,
  },
  card: {
    backgroundColor: colors.border,
    borderRadius: 12,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(236, 240, 241, 0.1)',
  },
  cardTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.textPrimary,
  },
  quantity: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: spacing.medium,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.small,
    flexShrink: 1, // Prevents long text from pushing icons off-screen
  },
  cardFooter: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    padding: spacing.medium,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    color: colors.primary,
    fontWeight: '500',
  }
});

export default DashboardScreen;