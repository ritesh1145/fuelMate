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
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
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
    backgroundColor: '#F39C12', // A slightly lighter orange when loading
  },
});

export default Button;

