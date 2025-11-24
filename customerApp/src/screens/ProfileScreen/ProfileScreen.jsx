import React, { useState, useEffect } from 'react';
// Corrected: Added Alert and TouchableOpacity
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { colors, spacing, typography } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ROUTES from '../../constants/routes';
import { getProfile, uploadProfilePicture, deleteProfilePicture } from '../../api/profileApi';
import { API_URL } from '../../api/config';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfileData(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        {
          text: 'Choose from Library',
          onPress: () => pickImage(),
        },
        {
          text: 'Remove Picture',
          onPress: () => handleDeletePicture(),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
    });

    if (!result.didCancel && result.assets && result.assets[0]) {
      handleUploadImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async (imageUri) => {
    try {
      setUploading(true);
      const data = await uploadProfilePicture(imageUri);
      Alert.alert('Success', 'Profile picture updated successfully');
      await loadProfile();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', error.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    if (!profileData?.profilePicture) {
      Alert.alert('Info', 'No profile picture to remove');
      return;
    }

    try {
      setUploading(true);
      await deleteProfilePicture();
      Alert.alert('Success', 'Profile picture removed successfully');
      await loadProfile();
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      Alert.alert('Error', error.message || 'Failed to delete profile picture');
    } finally {
      setUploading(false);
    }
  };

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

  const menuItems = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'account-edit',
      route: ROUTES.EDIT_PROFILE,
      color: colors.primary,
    },
    {
      id: 2,
      title: 'Payment Methods',
      icon: 'credit-card',
      route: ROUTES.PAYMENT_METHODS,
      color: colors.secondary,
    },
    {
      id: 3,
      title: 'Help & Support',
      icon: 'help-circle',
      route: ROUTES.HELP_SUPPORT,
      color: colors.success,
    },
  ];

  return (
    <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          <>
            <View style={styles.profileHeader}>
                <TouchableOpacity 
                  onPress={handleSelectImage} 
                  style={styles.profileImageContainer}
                  disabled={uploading}
                >
                  {profileData?.profilePicture ? (
                    <Image 
                      source={{ uri: `${API_URL}${profileData.profilePicture}` }} 
                      style={styles.profileImage}
                    />
                  ) : (
                    <Icon name="account-circle" size={100} color={colors.primary} />
                  )}
                  <View style={styles.editIconContainer}>
                    {uploading ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Icon name="camera" size={20} color="#FFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.name}>{profileData?.name || user?.name}</Text>
                <Text style={styles.email}>{profileData?.email || user?.email}</Text>
                {profileData?.phone && (
                  <Text style={styles.phone}>{profileData.phone}</Text>
                )}
            </View>

            <View style={styles.menu}>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => navigation.navigate(item.route)}>
                    <Icon name={item.icon} size={24} color={item.color} />
                    <Text style={styles.menuText}>{item.title}</Text>
                    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                ))}
            </View>

            <Button
                title="Log Out"
                onPress={handleLogout}
                style={styles.logoutButton}
            />
          </>
        )}
    </View>
  );
};

// Corrected: Removed comments from styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: spacing.xlarge,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.lightGray,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
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
    phone: {
        ...typography.body,
        color: colors.textSecondary,
        marginTop: spacing.small,
    },
    menu: {
        width: '100%',
    },
    menuItem: {
        backgroundColor: '#FFF',
        padding: spacing.large,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.medium,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    menuText: {
        ...typography.body,
        marginLeft: spacing.medium,
        flex: 1,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 'auto', // Pushes the button to the bottom
        backgroundColor: colors.error, // Use a distinct color for logout
    }
});


export default ProfileScreen;