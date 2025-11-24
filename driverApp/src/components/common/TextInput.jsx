import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../constants/theme';

const TextInput = ({ containerStyle, style, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.medium,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.textPrimary, // Will be light text
  },
});

export default TextInput;