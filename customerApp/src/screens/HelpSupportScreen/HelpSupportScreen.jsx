import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../constants/theme';

const HelpSupportScreen = ({ navigation }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const contactOptions = [
    {
      id: 1,
      title: 'Call Us',
      icon: 'phone',
      color: '#4CAF50',
      action: () => Linking.openURL('tel:+911234567890'),
      info: '+91 123 456 7890',
    },
    {
      id: 2,
      title: 'Email Support',
      icon: 'email',
      color: '#2196F3',
      action: () => Linking.openURL('mailto:support@fuelmate.com'),
      info: 'support@fuelmate.com',
    },
    {
      id: 3,
      title: 'WhatsApp',
      icon: 'whatsapp',
      color: '#25D366',
      action: () => Linking.openURL('whatsapp://send?phone=911234567890'),
      info: 'Chat with us',
    },
    {
      id: 4,
      title: 'Live Chat',
      icon: 'chat',
      color: '#9C27B0',
      action: () => Alert.alert('Coming Soon', 'Live chat feature will be available soon!'),
      info: 'Available 24/7',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer:
        'Simply select your fuel type, choose a supplier, enter quantity and delivery details, then confirm your order. Payment can be made online or cash on delivery.',
    },
    {
      id: 2,
      question: 'What are the delivery charges?',
      answer:
        'Delivery charges vary based on distance and order quantity. You will see the exact charges before confirming your order.',
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer:
        'Most deliveries are completed within 30-60 minutes depending on your location and current demand.',
    },
    {
      id: 4,
      question: 'What payment methods are accepted?',
      answer:
        'We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery for your convenience.',
    },
    {
      id: 5,
      question: 'Can I cancel my order?',
      answer:
        'Orders can be cancelled within 5 minutes of placing. After that, please contact support for assistance.',
    },
    {
      id: 6,
      question: 'Is there a minimum order quantity?',
      answer:
        'Yes, the minimum order quantity is 10 liters for all fuel types.',
    },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="help-circle" size={60} color={colors.primary} />
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerSubtitle}>We're here to help you</Text>
      </View>

      <View style={styles.content}>
        {/* Contact Options */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactGrid}>
          {contactOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.contactCard}
              onPress={option.action}>
              <View
                style={[styles.contactIconContainer, { backgroundColor: option.color }]}>
                <MaterialCommunityIcons name={option.icon} size={28} color="#FFF" />
              </View>
              <Text style={styles.contactTitle}>{option.title}</Text>
              <Text style={styles.contactInfo}>{option.info}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => toggleFaq(faq.id)}>
              <Text style={styles.faqQuestionText}>{faq.question}</Text>
              <MaterialCommunityIcons
                name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {expandedFaq === faq.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Emergency Info */}
        <View style={styles.emergencyCard}>
          <MaterialCommunityIcons name="alert-circle" size={32} color={colors.error} />
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Support</Text>
            <Text style={styles.emergencyText}>
              For urgent issues or emergencies, call our 24/7 helpline
            </Text>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => Linking.openURL('tel:+911234567890')}>
              <MaterialCommunityIcons name="phone" size={20} color="#FFF" />
              <Text style={styles.emergencyButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>FuelMate App</Text>
          <Text style={styles.infoText}>Version 1.0.0</Text>
          <Text style={styles.infoText}>© 2025 FuelMate. All rights reserved.</Text>
        </View>
      </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.large,
    marginBottom: spacing.large,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: spacing.large,
    marginBottom: spacing.large,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.small,
  },
  contactInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  faqCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: spacing.medium,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.large,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  faqAnswer: {
    padding: spacing.large,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  faqAnswerText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  emergencyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: spacing.large,
    borderRadius: 12,
    marginTop: spacing.xlarge,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  emergencyContent: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.small,
  },
  emergencyText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
    lineHeight: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: spacing.small,
  },
  infoCard: {
    alignItems: 'center',
    padding: spacing.xlarge,
    marginTop: spacing.large,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.small,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default HelpSupportScreen;
