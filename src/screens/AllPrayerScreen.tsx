import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/CommonUI';
import { Colors } from '../theme/colors';

export const AllPrayerScreen: React.FC = () => {
  const { allPrayerDays, selectedSeptDate, setSelectedSeptDate, locationName } =
    useApp();

  return (
    <View style={styles.container}>
      {/* Top Hero & Column Header */}
      <View style={styles.headerBlock}>
        <LinearGradient
          colors={['#20A69E', '#48B89C', '#71C89B']}
          style={styles.heroGradient}
        >
          <AppHeader title="All Prayer" />
          <View style={styles.bannerCard}>
            <Text style={styles.bannerLocation}>{locationName}</Text>
            <Text style={styles.bannerRemaining}>1 hr & 33 min remaining</Text>
          </View>
        </LinearGradient>

        {/* Table Column Headers */}
        <View style={styles.tableHeaderBar}>
          <Text style={[styles.colHeader, { flex: 1.15 }]}>2024</Text>
          <Text style={styles.colHeader}>Fajr</Text>
          <Text style={styles.colHeader}>Zuhr</Text>
          <Text style={styles.colHeader}>Asr</Text>
          <Text style={[styles.colHeader, { flex: 1.2 }]}>Maghrib</Text>
          <Text style={styles.colHeader}>Isha</Text>
        </View>
      </View>

      {/* Scrollable Table Rows */}
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {allPrayerDays.map((row) => {
          const isSelected = row.date === selectedSeptDate;
          return (
            <TouchableOpacity
              key={row.date}
              activeOpacity={0.85}
              onPress={() => setSelectedSeptDate(row.date)}
              style={[styles.dayRow, isSelected && styles.dayRowActive]}
            >
              <Text style={[styles.cellText, { flex: 1.15 }, isSelected && styles.cellTextActive]}>
                {row.date}
              </Text>
              <Text style={[styles.cellText, isSelected && styles.cellTextActive]}>
                {row.fajr}
              </Text>
              <Text style={[styles.cellText, isSelected && styles.cellTextActive]}>
                {row.zuhr}
              </Text>
              <Text style={[styles.cellText, isSelected && styles.cellTextActive]}>
                {row.asr}
              </Text>
              <Text style={[styles.cellText, { flex: 1.1 }, isSelected && styles.cellTextActive]}>
                {row.maghrib}
              </Text>
              <Text style={[styles.cellText, isSelected && styles.cellTextActive]}>
                {row.isha}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  headerBlock: {
    backgroundColor: '#CBEAE0',
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingBottom: 14,
  },
  heroGradient: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingBottom: 26,
  },
  bannerCard: {
    marginHorizontal: 42,
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerLocation: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1C2E2B',
    marginBottom: 4,
  },
  bannerRemaining: {
    fontSize: 13.5,
    color: '#203834',
    fontWeight: '500',
  },
  tableHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 4,
  },
  colHeader: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E2C2A',
    textAlign: 'center',
  },
  listScroll: {
    flex: 1,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3FBFB',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dayRowActive: {
    backgroundColor: Colors.primaryDark,
  },
  cellText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#202A2B',
    textAlign: 'center',
  },
  cellTextActive: {
    color: '#FFFFFF',
  },
});
