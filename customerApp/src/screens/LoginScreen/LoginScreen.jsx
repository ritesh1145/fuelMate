import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import useAuth from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';
import ROUTES from '../../constants/routes';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('john@test.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your FuelMate account</Text>

      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
        style={{ marginTop: spacing.medium }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
          <Text style={styles.linkText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    logoContainer: {
      width: 150,
      height: 150,
      borderRadius: 75, // Half of width/height makes it a perfect circle
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: spacing.xlarge,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 8,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
        justifyContent: 'center',
    },
    title: {
        ...typography.h1,
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.small,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xlarge,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.large,
    },
    footerText: {
        color: colors.textSecondary,
    },
    linkText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
});

export default LoginScreen;

