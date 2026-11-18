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

export const CalendarScreen: React.FC = () => {
  const {
    calendarDays,
    selectedHijriDate,
    setSelectedHijriDate,
    openModal,
  } = useApp();

  return (
    <View style={styles.container}>
      {/* Top Hero & Column Header */}
      <View style={styles.headerBlock}>
        <LinearGradient
          colors={['#20A69E', '#48B89C', '#71C89B']}
          style={styles.heroGradient}
        >
          <AppHeader
            title="Islamic Calendar"
            onSettingsPress={() => openModal('CalendarSettingModal')}
          />

          <TouchableOpacity
            style={styles.bannerCard}
            activeOpacity={0.85}
            onPress={() => openModal('CalendarSettingModal')}
          >
            <Text style={styles.bannerHijri}>16 Rabi’ al-Awwal 1446</Text>
            <Text style={styles.bannerGregorian}>19 September 2024</Text>
          </TouchableOpacity>

          <View style={styles.heroLinksRow}>
            <TouchableOpacity onPress={() => setSelectedHijriDate('05 Safar')}>
              <Text style={styles.heroLinkText}>View Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openModal('CalendarSettingModal')}>
              <Text style={styles.heroLinkText}>Gregorian to Hijri</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Column Header */}
        <View style={styles.tableHeaderBar}>
          <Text style={[styles.colHeader, { textAlign: 'left' }]}>1446</Text>
          <Text style={[styles.colHeader, { textAlign: 'center' }]}>2024</Text>
          <Text style={[styles.colHeader, { textAlign: 'right' }]}>Day</Text>
        </View>
      </View>

      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32, paddingTop: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {calendarDays.map((row) => {
          const isSelected = row.hijri === selectedHijriDate;
          return (
            <TouchableOpacity
              key={row.hijri}
              activeOpacity={0.85}
              onPress={() => setSelectedHijriDate(row.hijri)}
              style={[styles.dayRow, isSelected && styles.dayRowActive]}
            >
              <Text
                style={[
                  styles.cellText,
                  { textAlign: 'left' },
                  isSelected && styles.cellTextActive,
                ]}
              >
                {row.hijri}
              </Text>
              <Text
                style={[
                  styles.cellText,
                  { textAlign: 'center', flex: 1.4 },
                  isSelected && styles.cellTextActive,
                ]}
              >
                {row.gregorian}
              </Text>
              <Text
                style={[
                  styles.cellText,
                  { textAlign: 'right', flex: 0.7 },
                  isSelected && styles.cellTextActive,
                ]}
              >
                {row.day}
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
    paddingBottom: 20,
  },
  bannerCard: {
    marginHorizontal: 40,
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerHijri: {
    fontSize: 19,
    fontWeight: '600',
    color: '#192B29',
    marginBottom: 4,
  },
  bannerGregorian: {
    fontSize: 14,
    color: '#F2FAFA',
  },
  heroLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    marginTop: 22,
  },
  heroLinkText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '500',
  },
  tableHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 38,
    paddingTop: 16,
    paddingBottom: 4,
  },
  colHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E2C2A',
  },
  listScroll: {
    flex: 1,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3FBFB',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 11,
  },
  dayRowActive: {
    backgroundColor: Colors.primaryDark,
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#202A2B',
  },
  cellTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
