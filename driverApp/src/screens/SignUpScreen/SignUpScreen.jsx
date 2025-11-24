import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import useAuth from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';
import ROUTES from '../../constants/routes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone || !licenseNumber || !vehicleNumber || !vehicleType) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      // This calls the signUp function from authApi.js that sends 'role: driver'
      await signUp(name, email, password, phone, licenseNumber, vehicleNumber, vehicleType, address);
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Driver Registration</Text>
          <Text style={styles.subtitle}>Apply to drive for FuelMate</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="account-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Full Name *"
              value={name}
              onChangeText={setName}
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Email *"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Phone Number *"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Password *"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="card-account-details-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="License Number *"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="truck-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Vehicle Number *"
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
              autoCapitalize="characters"
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="car-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Vehicle Type (e.g., Tanker, Truck) *"
              value={vehicleType}
              onChangeText={setVehicleType}
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="map-marker-outline" size={22} color={colors.textSecondary} style={styles.icon} />
            <TextInput
              placeholder="Address (Optional)"
              value={address}
              onChangeText={setAddress}
              multiline
              containerStyle={{ marginBottom: 0 }}
              style={styles.input}
            />
          </View>

          <Button
            title="Create Driver Account"
            onPress={handleSignUp}
            loading={loading}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.linkText}> Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.large,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xlarge,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    borderRadius: 12,
    marginBottom: spacing.medium,
  },
  icon: {
    paddingLeft: spacing.medium,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.textPrimary,
  },
  button: {
    marginTop: spacing.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.large,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignUpScreen;