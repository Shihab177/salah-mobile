import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { Colors } from '../theme/colors';
import {
  HeaderHexSettingsIcon,
  HeaderMenuIcon,
  MandalaCornerWatermark,
  PrayingPersonIcon,
} from '../components/SvgIcons';
import { PrayerTimeItem } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const {
    navigate,
    openModal,
    prayers,
    selectedPrayerIndex,
    setSelectedPrayerIndex,
    togglePrayerMute,
    suhoorMuted,
    setSuhoorMuted,
    iftaarMuted,
    setIftaarMuted,
    locationName,
    openSalahReminder,
    refreshAppData,
    checkInternetOrAlert,
  } = useApp();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refreshAppData();
    setTimeout(() => setRefreshing(false), 400);
  };

  const currentPrayer = prayers[selectedPrayerIndex] || prayers[0];
  const isNight = currentPrayer.id === 'Isha';

  const handlePrevPrayer = () => {
    setSelectedPrayerIndex(
      selectedPrayerIndex === 0 ? prayers.length - 1 : selectedPrayerIndex - 1
    );
  };

  const handleNextPrayer = () => {
    setSelectedPrayerIndex((selectedPrayerIndex + 1) % prayers.length);
  };

  const renderPrayerIcon = (id: PrayerTimeItem['id']) => {
    switch (id) {
      case 'Fajr':
        return <MaterialCommunityIcons name="weather-sunset-up" size={22} color="#8B999A" />;
      case 'Duhur':
        return <Feather name="sun" size={21} color="#8B999A" />;
      case 'Asr':
        return <MaterialCommunityIcons name="white-balance-sunny" size={22} color="#8B999A" />;
      case 'Maghrib':
        return <MaterialCommunityIcons name="weather-sunset-down" size={22} color="#8B999A" />;
      case 'Isha':
        return <MaterialCommunityIcons name="weather-night" size={22} color="#8B999A" />;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 34 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#FFFFFF"
          colors={[Colors.primary]}
        />
      }
    >
      {/* Hero Header Card (Day = Home.png, Night = Home - Isha.png) */}
      <View style={styles.heroOuterShadow}>
        <LinearGradient
          colors={
            isNight
              ? ['#051E24', '#0B4950', '#062026']
              : ['#20A69E', '#43B79C', '#71C89B']
          }
          style={styles.heroGradient}
        >
          {/* Night Mountains & Moon Overlay when Isha is active */}
          {isNight && (
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <Svg width="100%" height="100%" viewBox="0 0 400 380">
                {/* Stars */}
                <Circle cx="82" cy="40" r="1.5" fill="rgba(255,255,255,0.45)" />
                <Circle cx="160" cy="24" r="1.2" fill="rgba(255,255,255,0.35)" />
                <Circle cx="240" cy="52" r="1.6" fill="rgba(255,255,255,0.45)" />
                <Circle cx="310" cy="30" r="1.2" fill="rgba(255,255,255,0.35)" />
                {/* Glowing Moon on top right */}
                <Circle cx="348" cy="112" r="56" fill="rgba(46, 179, 172, 0.08)" />
                <Circle cx="348" cy="112" r="38" fill="rgba(46, 179, 172, 0.14)" />
                <Circle cx="348" cy="112" r="18" fill="#B7E4D7" opacity={0.85} />
                {/* Mountain silhouettes */}
                <Path
                  d="M0 245L58 202L135 255L220 210L335 248L400 205V380H0V245Z"
                  fill="rgba(4, 34, 40, 0.65)"
                />
                <Path
                  d="M0 285L95 250L215 310L315 268L400 295V380H0V285Z"
                  fill="#04191F"
                />
              </Svg>
            </View>
          )}

          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.locationBtn}
              activeOpacity={0.75}
              onPress={() =>
                checkInternetOrAlert(() => openModal('LocationSettingsModal'))
              }
            >
              <Ionicons name="location-outline" size={22} color="#FFFFFF" />
              <Text style={styles.locationText}>{locationName}</Text>
            </TouchableOpacity>

            <View style={styles.topRightIcons}>
              {/* 1. All Prayer Screen Monthly Schedule / Calendar Icon in Header */}
              <TouchableOpacity
                style={styles.topIconPad}
                onPress={() => navigate('AllPrayer')}
                accessibilityLabel="All Prayer Monthly Schedule"
              >
                <Ionicons name="calendar-outline" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topIconPad}
                onPress={() => navigate('Settings')}
              >
                <HeaderHexSettingsIcon size={23} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topIconPad}
                onPress={() => navigate('Menu')}
              >
                <HeaderMenuIcon size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Center Circular Countdown & Left/Right Arrows */}
          <View style={styles.circleRow}>
            <TouchableOpacity
              style={styles.arrowCircleOuter}
              activeOpacity={0.75}
              onPress={handlePrevPrayer}
            >
              <View style={styles.arrowCircleInner}>
                <Feather name="chevron-left" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* 2. Center Counter Circle Tap -> Opens Salah Reminder Modal */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => openSalahReminder(currentPrayer)}
              style={styles.outerRing1}
            >
              <View style={styles.outerRing2}>
                <View style={styles.outerRing3}>
                  <PrayingPersonIcon size={44} color="#FFFFFF" />
                  <Text style={styles.heroPrayerName}>{currentPrayer.name}</Text>
                  <Text
                    style={[
                      styles.heroRemainingTime,
                      isNight && { color: '#081B1E' },
                    ]}
                  >
                    {currentPrayer.remaining}
                  </Text>
                  <Text style={styles.heroRemainingLabel}>Remaining</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arrowCircleOuter}
              activeOpacity={0.75}
              onPress={handleNextPrayer}
            >
              <View style={styles.arrowCircleInner}>
                <Feather name="chevron-right" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Dates Row at Bottom of Hero */}
          <View style={styles.datesRow}>
            <TouchableOpacity onPress={() => navigate('AllPrayer')}>
              <Text style={styles.dateText}>Friday, 12 Sept 2024</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Calendar')}>
              <Text style={styles.dateText}>9 Rabi 1445</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Main Content Body */}
      <View style={styles.bodyContent}>
        {/* Suhoor & Iftaar Card */}
        <View style={styles.suhoorCard}>
          <View style={styles.suhoorSide}>
            <TouchableOpacity
              onPress={() => setSuhoorMuted(!suhoorMuted)}
              style={styles.speakerBtn}
            >
              <Feather
                name={suhoorMuted ? 'volume-x' : 'volume-1'}
                size={23}
                color={suhoorMuted ? Colors.dangerRed : Colors.primary}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.suhoorTitle}>Suhoor</Text>
              <Text style={styles.suhoorTime}>4:57 AM</Text>
            </View>
          </View>

          <View style={styles.suhoorDividerContainer}>
            <View style={styles.suhoorWatermark}>
              <MandalaCornerWatermark size={86} color="rgba(26, 156, 148, 0.14)" />
            </View>
            <View style={styles.suhoorVerticalLine} />
          </View>

          <View style={styles.suhoorSide}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.suhoorTitle}>Iftaar</Text>
              <Text style={styles.suhoorTime}>6:36 PM</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIftaarMuted(!iftaarMuted)}
              style={styles.speakerBtn}
            >
              <Feather
                name={iftaarMuted ? 'volume-x' : 'volume-1'}
                size={23}
                color={iftaarMuted ? Colors.dangerRed : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5 Daily Prayer Rows - Tapping any Salah card selects it & opens Salah Reminder Modal */}
        {prayers.map((item, idx) => {
          const isSelected = idx === selectedPrayerIndex;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedPrayerIndex(idx);
                openSalahReminder(item);
              }}
              style={[
                styles.prayerRowCard,
                isSelected && styles.prayerRowCardActive,
              ]}
            >
              <View style={styles.prayerLeft}>
                {renderPrayerIcon(item.id)}
                <Text style={styles.prayerNameText}>{item.name}</Text>
              </View>

              <View style={styles.prayerRight}>
                <Text style={styles.prayerTimeText}>{item.time}</Text>
                <TouchableOpacity
                  onPress={() => togglePrayerMute(item.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Feather
                    name={item.muted ? 'volume-x' : 'volume-1'}
                    size={22}
                    color={item.muted ? Colors.dangerRed : Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  heroOuterShadow: {
    backgroundColor: '#CBEAE0',
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    paddingBottom: 10,
  },
  heroGradient: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingTop: 14,
    paddingBottom: 22,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  topIconPad: {
    padding: 4,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  arrowCircleOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing1: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing2: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing3: {
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  heroPrayerName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 2,
  },
  heroRemainingTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#192B29',
    marginTop: 2,
  },
  heroRemainingLabel: {
    fontSize: 14,
    color: '#F2FAFA',
    marginTop: 2,
  },
  datesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bodyContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  suhoorCard: {
    backgroundColor: '#F5FBFB',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    overflow: 'hidden',
  },
  suhoorSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '42%',
  },
  speakerBtn: {
    padding: 4,
  },
  suhoorTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C2526',
    marginBottom: 4,
  },
  suhoorTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#182021',
  },
  suhoorDividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 54,
  },
  suhoorWatermark: {
    position: 'absolute',
    bottom: -28,
  },
  suhoorVerticalLine: {
    width: 1,
    height: 54,
    backgroundColor: '#CDE5E5',
  },
  prayerRowCard: {
    backgroundColor: '#F1F9F9',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E6F4F4',
  },
  prayerRowCardActive: {
    borderColor: '#B8E2DF',
    backgroundColor: '#FFFFFF',
  },
  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D2526',
  },
  prayerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  prayerTimeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D2526',
  },
  quickActionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  chipBtn: {
    backgroundColor: 'rgba(35, 166, 158, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(35, 166, 158, 0.25)',
  },
  chipBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
});
