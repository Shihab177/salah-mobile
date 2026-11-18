import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { SplashMosqueIllustration } from '../components/SvgIcons';

const { width } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.95}
      onPress={() => navigate('Home')}
    >
      <View style={styles.centerContent}>
        <Text style={styles.brandTitle}>
          <Text style={styles.brandPrayer}>Prayer </Text>
          <Text style={styles.brandReminder}>Reminder</Text>
        </Text>
        <Text style={styles.subtitle}>
          <Text style={styles.subTeal}>Bringing you </Text>
          <Text style={styles.subDark}>closer </Text>
          <Text style={styles.subTeal}>to </Text>
          <Text style={styles.subDark}>Allah</Text>
        </Text>
      </View>

      <View style={styles.bottomArt}>
        <SplashMosqueIllustration width={width} height={width * 0.87} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F3F4',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    marginTop: '52%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  brandTitle: {
    fontSize: 34,
    marginBottom: 10,
  },
  brandPrayer: {
    color: '#198C91',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  brandReminder: {
    color: '#192021',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16.5,
    letterSpacing: 0.2,
  },
  subTeal: {
    color: '#198C91',
    fontWeight: '400',
  },
  subDark: {
    color: '#192021',
    fontWeight: '700',
  },
  bottomArt: {
    width: '100%',
    alignItems: 'center',
  },
});
