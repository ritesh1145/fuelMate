// Centralized theme file for the Driver App
// We'll use the 'secondary' blue from the customer app as our 'primary' here
export const colors = {
  primary: '#3498DB', // A clear, professional blue
  secondary: '#2ECC71', // Green as a secondary/success color
  background: '#2C3E50', // A deep, professional slate blue
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#ECF0F1', // Light text for dark background
  textSecondary: '#BDC3C7', // A softer grey for subtitles
  success: '#27AE60',
  error: '#E74C3C',
  border: '#34495E', // A border color that works with the dark theme
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
};
