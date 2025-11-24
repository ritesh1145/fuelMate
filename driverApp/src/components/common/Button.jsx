import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';

const Button = ({ title, onPress, loading = false, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, loading && styles.disabled]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary, // Will be blue from new theme
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.7,
  },
});

export default Button;