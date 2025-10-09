import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../constants/theme';

const TextInput = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error ? styles.errorBorder : null]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.medium,
  },
  label: {
    marginBottom: spacing.small,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.small,
    fontSize: 12,
  },
});

export default TextInput;

