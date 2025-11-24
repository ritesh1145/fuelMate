import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
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

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.phone}>📱 {profileData.phone}</Text>
        )}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {profileData?.status?.toUpperCase() || 'ACTIVE'}
          </Text>
        </View>
      </View>

      {/* Driver Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Driver Details</Text>
        
        {profileData?.licenseNumber && (
          <View style={styles.detailRow}>
            <Icon name="card-account-details" size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>License Number</Text>
              <Text style={styles.detailValue}>{profileData.licenseNumber}</Text>
            </View>
          </View>
        )}

        {profileData?.vehicleNumber && (
          <View style={styles.detailRow}>
            <Icon name="car" size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Vehicle Number</Text>
              <Text style={styles.detailValue}>{profileData.vehicleNumber}</Text>
            </View>
          </View>
        )}

        {profileData?.vehicleType && (
          <View style={styles.detailRow}>
            <Icon name="car-info" size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Vehicle Type</Text>
              <Text style={styles.detailValue}>{profileData.vehicleType}</Text>
            </View>
          </View>
        )}

        {profileData?.address && (
          <View style={styles.detailRow}>
            <Icon name="map-marker" size={20} color={colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>{profileData.address}</Text>
            </View>
          </View>
        )}
      </View>

      <Button
        title="Log Out"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xlarge,
    paddingVertical: spacing.large,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.medium,
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
    marginTop: spacing.small,
    color: colors.textPrimary,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  phone: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
    marginTop: spacing.medium,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: spacing.large,
    marginBottom: spacing.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.medium,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.medium,
    paddingBottom: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailContent: {
    marginLeft: spacing.medium,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.error,
    marginTop: spacing.medium,
    marginBottom: spacing.xlarge,
  },
});

export default ProfileScreen;
