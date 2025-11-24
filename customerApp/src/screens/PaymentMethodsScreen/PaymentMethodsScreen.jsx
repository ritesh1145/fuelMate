import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput as RNTextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { colors, spacing, typography } from '../../constants/theme';

const PaymentMethodsScreen = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      icon: 'credit-card',
      isDefault: true,
    },
    {
      id: 2,
      type: 'upi',
      name: 'UPI: user@paytm',
      icon: 'cellphone',
      isDefault: false,
    },
  ]);

  const [selectedMethod, setSelectedMethod] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState('card'); // 'card' or 'upi'
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleSetDefault = (id) => {
    const updated = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }));
    setPaymentMethods(updated);
    setSelectedMethod(id);
    
    // Save to AsyncStorage
    AsyncStorage.setItem('paymentMethods', JSON.stringify(updated));
    
    Alert.alert('Success', 'Default payment method updated!');
  };

  const handleAddPayment = () => {
    setShowAddModal(true);
  };

  const handleSaveNewPayment = () => {
    if (newPaymentType === 'card') {
      // Validate card details
      if (!cardNumber.trim() || cardNumber.length < 16) {
        Alert.alert('Validation Error', 'Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardHolderName.trim()) {
        Alert.alert('Validation Error', 'Please enter card holder name.');
        return;
      }
      if (!expiryDate.trim() || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
        Alert.alert('Validation Error', 'Please enter expiry date in MM/YY format.');
        return;
      }
      if (!cvv.trim() || cvv.length < 3) {
        Alert.alert('Validation Error', 'Please enter a valid CVV.');
        return;
      }

      // Get last 4 digits
      const lastFour = cardNumber.slice(-4);
      const cardType = cardNumber[0] === '4' ? 'Visa' : cardNumber[0] === '5' ? 'Mastercard' : 'Card';

      const newMethod = {
        id: Date.now(),
        type: 'card',
        name: `${cardType} ending in ${lastFour}`,
        icon: 'credit-card',
        isDefault: paymentMethods.length === 0,
      };

      const updated = [...paymentMethods, newMethod];
      setPaymentMethods(updated);
      AsyncStorage.setItem('paymentMethods', JSON.stringify(updated));
      
      Alert.alert('Success', 'Payment method added successfully!');
      resetForm();
      setShowAddModal(false);
    } else if (newPaymentType === 'upi') {
      // Validate UPI
      if (!upiId.trim() || !upiId.includes('@')) {
        Alert.alert('Validation Error', 'Please enter a valid UPI ID (e.g., user@paytm).');
        return;
      }

      const newMethod = {
        id: Date.now(),
        type: 'upi',
        name: `UPI: ${upiId}`,
        icon: 'cellphone',
        isDefault: paymentMethods.length === 0,
      };

      const updated = [...paymentMethods, newMethod];
      setPaymentMethods(updated);
      AsyncStorage.setItem('paymentMethods', JSON.stringify(updated));
      
      Alert.alert('Success', 'UPI payment method added successfully!');
      resetForm();
      setShowAddModal(false);
    }
  };

  const resetForm = () => {
    setCardNumber('');
    setCardHolderName('');
    setExpiryDate('');
    setCvv('');
    setUpiId('');
    setNewPaymentType('card');
  };

  const handleDeletePayment = (id) => {
    const methodToDelete = paymentMethods.find(m => m.id === id);
    
    if (methodToDelete.isDefault && paymentMethods.length > 1) {
      Alert.alert(
        'Cannot Delete',
        'You cannot delete the default payment method. Please set another method as default first.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (paymentMethods.length === 1) {
      Alert.alert(
        'Cannot Delete',
        'You must have at least one payment method.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = paymentMethods.filter((method) => method.id !== id);
            setPaymentMethods(updated);
            AsyncStorage.setItem('paymentMethods', JSON.stringify(updated));
            Alert.alert('Success', 'Payment method removed!');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="credit-card-multiple" size={60} color={colors.primary} />
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <Text style={styles.headerSubtitle}>Manage your payment options</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPayment}>
          <MaterialCommunityIcons name="plus-circle" size={24} color={colors.primary} />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <TouchableOpacity
              style={styles.paymentCardContent}
              onPress={() => handleSetDefault(method.id)}>
              <View style={styles.paymentIconContainer}>
                <MaterialCommunityIcons
                  name={method.icon}
                  size={32}
                  color={colors.primary}
                />
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentType}>
                  {method.type === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}
                </Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.paymentActions}>
              {!method.isDefault && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(method.id)}>
                  <MaterialCommunityIcons name="check" size={20} color={colors.primary} />
                  <Text style={styles.actionText}>Set as Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeletePayment(method.id)}>
                <MaterialCommunityIcons name="delete" size={20} color={colors.error} />
                <Text style={[styles.actionText, styles.deleteText]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="shield-check" size={24} color={colors.success} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Secure Payments</Text>
            <Text style={styles.infoText}>
              Your payment information is encrypted and stored securely.
            </Text>
          </View>
        </View>
      </View>

      {/* Add Payment Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Payment Method</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialCommunityIcons name="close" size={28} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Payment Type Selector */}
              <View style={styles.paymentTypeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newPaymentType === 'card' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewPaymentType('card')}>
                  <MaterialCommunityIcons
                    name="credit-card"
                    size={24}
                    color={newPaymentType === 'card' ? '#FFF' : colors.primary}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newPaymentType === 'card' && styles.typeButtonTextActive,
                    ]}>
                    Card
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newPaymentType === 'upi' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewPaymentType('upi')}>
                  <MaterialCommunityIcons
                    name="cellphone"
                    size={24}
                    color={newPaymentType === 'upi' ? '#FFF' : colors.primary}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newPaymentType === 'upi' && styles.typeButtonTextActive,
                    ]}>
                    UPI
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Card Form */}
              {newPaymentType === 'card' && (
                <View style={styles.formContainer}>
                  <TextInput
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                  <TextInput
                    label="Card Holder Name"
                    placeholder="John Doe"
                    value={cardHolderName}
                    onChangeText={setCardHolderName}
                  />
                  <View style={styles.row}>
                    <View style={styles.halfWidth}>
                      <TextInput
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        maxLength={5}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <TextInput
                        label="CVV"
                        placeholder="123"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* UPI Form */}
              {newPaymentType === 'upi' && (
                <View style={styles.formContainer}>
                  <TextInput
                    label="UPI ID"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChangeText={setUpiId}
                    keyboardType="email-address"
                  />
                  <View style={styles.upiInfo}>
                    <MaterialCommunityIcons name="information" size={20} color={colors.primary} />
                    <Text style={styles.upiInfoText}>
                      Enter your UPI ID like username@paytm, username@phonepe, etc.
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.modalFooter}>
                <Button title="Add Payment Method" onPress={handleSaveNewPayment} />
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    resetForm();
                    setShowAddModal(false);
                  }}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: spacing.xlarge,
    backgroundColor: colors.backgroundSecondary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.medium,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  content: {
    padding: spacing.large,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.large,
    borderRadius: 12,
    marginBottom: spacing.xlarge,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: spacing.medium,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.large,
  },
  paymentCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: spacing.large,
    marginBottom: spacing.large,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  paymentIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  paymentType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  defaultBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 20,
  },
  defaultText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
  paymentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.small,
  },
  actionText: {
    marginLeft: spacing.small,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteText: {
    color: colors.error,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.large,
    borderRadius: 12,
    marginTop: spacing.large,
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.small,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalBody: {
    padding: spacing.large,
  },
  paymentTypeSelector: {
    flexDirection: 'row',
    marginBottom: spacing.xlarge,
    gap: spacing.medium,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.backgroundSecondary,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    marginLeft: spacing.small,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  typeButtonTextActive: {
    color: '#FFF',
  },
  formContainer: {
    marginBottom: spacing.large,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.medium,
  },
  halfWidth: {
    flex: 1,
  },
  upiInfo: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.medium,
    borderRadius: 8,
    marginTop: spacing.medium,
  },
  upiInfoText: {
    flex: 1,
    marginLeft: spacing.small,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  modalFooter: {
    marginTop: spacing.large,
  },
  cancelButton: {
    alignItems: 'center',
    padding: spacing.medium,
    marginTop: spacing.medium,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

export default PaymentMethodsScreen;
