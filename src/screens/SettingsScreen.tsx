import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader, CustomToggle } from '../components/CommonUI';
import {
  MandalaCornerWatermark,
  PrayingPersonOutlineIcon,
} from '../components/SvgIcons';
import { Colors } from '../theme/colors';

export const SettingsScreen: React.FC = () => {
  const {
    navigate,
    openModal,
    darkMode,
    setDarkMode,
    language,
  } = useApp();

  return (
    <View style={styles.container}>
      <AppHeader title="App Settings" />

      <ScrollView
        style={styles.bodySheet}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Prayer Times Settings */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => navigate('PrayerTimesSettings')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <PrayingPersonOutlineIcon size={24} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Prayer Times Settings</Text>
            <Text style={styles.cardSub}>Settings for calculating prayer times</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 2. Location Settings */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => openModal('LocationSettingsModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <Ionicons name="location-outline" size={22} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Location Settings</Text>
            <Text style={styles.cardSub}>Choose your location settings</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 3. Notification Settings */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => openModal('NotificationSettingsModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <Feather name="volume-1" size={22} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Notification Settings</Text>
            <Text style={styles.cardSub}>
              Select your notifications & reminders settings
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 4. Silent Settings */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => openModal('SilentSettingsModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <Feather name="volume-x" size={21} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Silent Settings</Text>
            <Text style={styles.cardSub}>
              Adjust the silent mode settings for each prayer
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 5. Hijri Settings */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => openModal('HijriSettingsModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <Ionicons name="calendar-outline" size={21} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Hijri Settings</Text>
            <Text style={styles.cardSub}>Hijri date adjustment</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 6. Dark Mode */}
        <View style={styles.settingCard}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <Feather name="moon" size={21} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Dark Mode</Text>
            <Text style={styles.cardSub}>App Theme</Text>
          </View>
          <CustomToggle value={darkMode} onValueChange={setDarkMode} />
        </View>

        {/* 7. Language */}
        <TouchableOpacity
          style={styles.settingCard}
          activeOpacity={0.85}
          onPress={() => openModal('LanguagesModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={styles.iconCircle}>
            <MaterialIcons name="translate" size={20} color="#124E52" />
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>Language</Text>
            <Text style={styles.cardSub}>{language}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>
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
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardWatermark: {
    position: 'absolute',
    right: 65,
    bottom: -36,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#E5F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    paddingHorizontal: 14,
  },
  cardTitle: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#182122',
    marginBottom: 3,
  },
  cardSub: {
    fontSize: 12,
    color: '#889596',
    lineHeight: 16,
  },
});
