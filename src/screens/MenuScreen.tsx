import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/CommonUI';
import {
  DuaHandsIcon,
  KaabaIcon,
  MandalaCornerWatermark,
  PrayingPersonOutlineIcon,
  TasbihBeadsIcon,
  WaduHandsIcon,
} from '../components/SvgIcons';
import { Colors } from '../theme/colors';

export const MenuScreen: React.FC = () => {
  const { navigate, openModal } = useApp();

  const generalItems = [
    {
      topLabel: 'Qibla',
      boldLabel: 'Direction',
      icon: <KaabaIcon size={36} color="#209B95" />,
      onPress: () => navigate('Qibla'),
    },
    {
      topLabel: 'Prayer',
      boldLabel: 'Duas',
      icon: <DuaHandsIcon size={36} color="#209B95" />,
      onPress: () => navigate('PrayerDuas'),
    },
    {
      topLabel: 'Prayer',
      boldLabel: 'Guide',
      icon: <PrayingPersonOutlineIcon size={36} color="#209B95" />,
      onPress: () => navigate('PrayerGuideList'),
    },
    {
      topLabel: 'Wadu',
      boldLabel: 'Guide',
      icon: <WaduHandsIcon size={36} color="#209B95" />,
      onPress: () => navigate('WaduGuide'),
    },
    {
      topLabel: 'Tasbih',
      boldLabel: 'Counter',
      icon: <TasbihBeadsIcon size={36} color="#209B95" />,
      onPress: () => navigate('TasbihCounter'),
    },
    {
      topLabel: 'Islamic',
      boldLabel: 'Calendar',
      icon: <Ionicons name="calendar-outline" size={32} color="#209B95" />,
      onPress: () => navigate('Calendar'),
    },
  ];

  const otherItems = [
    {
      title: 'Feedback',
      sub: 'Let’s share your thoughts with us',
      icon: <Feather name="mail" size={20} color="#175255" />,
      onPress: () => {},
    },
    {
      title: 'Rate Us',
      sub: 'Your Experience on App',
      icon: <Feather name="star" size={21} color="#175255" />,
      onPress: () => {},
    },
    {
      title: 'Share App',
      sub: 'Help your friends become better Muslims',
      icon: <Feather name="share-2" size={20} color="#175255" />,
      onPress: () => {},
    },
    {
      title: 'Financial Support',
      sub: 'Any one can support and become a part\nof Sadaqa Jariya',
      icon: <MaterialCommunityIcons name="sack" size={21} color="#175255" />,
      onPress: () => openModal('FinancialSupportModal'),
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader title="Menu" />

      <ScrollView
        style={styles.bodySheet}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 38 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.generalGrid}>
          {generalItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.gridCard}
              activeOpacity={0.85}
              onPress={item.onPress}
            >
              <View style={styles.gridWatermark}>
                <MandalaCornerWatermark size={74} />
              </View>
              <View style={styles.gridIconBox}>{item.icon}</View>
              <Text style={styles.gridTopLabel}>{item.topLabel}</Text>
              <Text style={styles.gridBoldLabel}>{item.boldLabel}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Other</Text>

        {otherItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.otherRowCard}
            activeOpacity={0.85}
            onPress={item.onPress}
          >
            <View style={styles.otherWatermark}>
              <MandalaCornerWatermark size={82} />
            </View>
            <View style={styles.otherIconCircle}>{item.icon}</View>
            <View style={{ flex: 1, paddingHorizontal: 14 }}>
              <Text style={styles.otherTitle}>{item.title}</Text>
              <Text style={styles.otherSub}>{item.sub}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#BDCECF" />
          </TouchableOpacity>
        ))}

        {/* Bottom Instagram Card */}
        <View style={styles.instaCard}>
          <View style={styles.instaWatermarkLeft}>
            <MandalaCornerWatermark size={90} />
          </View>
          <View style={styles.instaWatermarkRight}>
            <MandalaCornerWatermark size={90} />
          </View>
          <Feather name="instagram" size={30} color={Colors.primaryDark} />
          <Text style={styles.instaHeading}>Show us some love</Text>
          <Text style={styles.instaSub}>
            Connect with prayer reminder app on{'\n'}Instagram & learn something new everyday.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  bodySheet: {
    flex: 1,
    backgroundColor: Colors.mintBg,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#192122',
    marginBottom: 14,
  },
  generalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: '30.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 4,
    overflow: 'hidden',
  },
  gridWatermark: {
    position: 'absolute',
    right: -28,
    top: 12,
  },
  gridIconBox: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 6,
  },
  gridTopLabel: {
    fontSize: 11.5,
    color: '#465253',
  },
  gridBoldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#182122',
  },
  otherRowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  otherWatermark: {
    position: 'absolute',
    right: 60,
    bottom: -36,
  },
  otherIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#E5F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherTitle: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#182122',
    marginBottom: 3,
  },
  otherSub: {
    fontSize: 12,
    color: '#889596',
    lineHeight: 17,
  },
  instaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 6,
    overflow: 'hidden',
  },
  instaWatermarkLeft: {
    position: 'absolute',
    left: -34,
    bottom: -14,
  },
  instaWatermarkRight: {
    position: 'absolute',
    right: -34,
    bottom: -14,
  },
  instaHeading: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginTop: 10,
    marginBottom: 6,
  },
  instaSub: {
    fontSize: 13,
    color: '#1F2728',
    textAlign: 'center',
    lineHeight: 20,
  },
});
