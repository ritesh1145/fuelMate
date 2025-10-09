import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { colors, spacing, typography } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => logout() }
      ]
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.profileHeader}>
            <Icon name="account-circle" size={100} color={colors.primary} />
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.menu}>
            {/* You can add more menu items here */}
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="account-edit" size={24} color={colors.secondary}/>
                <Text style={styles.menuText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="credit-card" size={24} color={colors.secondary}/>
                <Text style={styles.menuText}>Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Icon name="help-circle" size={24} color={colors.secondary}/>
                <Text style={styles.menuText}>Help & Support</Text>
            </TouchableOpacity>
        </View>

        <Button
            title="Log Out"
            onPress={handleLogout}
            style={{ marginTop: 'auto' }}
        />
    </View>
  );
};
// ... (Styles are new, so include them)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: spacing.xlarge,
    },
    name: {
        ...typography.h1,
        marginTop: spacing.medium,
        color: colors.textPrimary,
    },
    email: {
        ...typography.body,
        color: colors.textSecondary,
    },
    menu: {
        width: '100%',
    },
    menuItem: {
        backgroundColor: colors.white,
        padding: spacing.medium,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.medium,
    },
    menuText: {
        ...typography.body,
        marginLeft: spacing.medium,
        color: colors.textPrimary,
        fontWeight: '500',
    }
});


export default ProfileScreen;
