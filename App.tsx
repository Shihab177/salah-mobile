import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { SplashScreen } from './src/screens/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { AllPrayerScreen } from './src/screens/AllPrayerScreen';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { QiblaScreen } from './src/screens/QiblaScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { PrayerTimesSettingsScreen } from './src/screens/PrayerTimesSettingsScreen';
import { PrayerDuasScreen } from './src/screens/PrayerDuasScreen';
import { PrayerGuideListScreen } from './src/screens/PrayerGuideListScreen';
import { PrayerGuideDetailScreen } from './src/screens/PrayerGuideDetailScreen';
import { WaduGuideScreen } from './src/screens/WaduGuideScreen';
import { TasbihCounterScreen } from './src/screens/TasbihCounterScreen';
import { AppModals } from './src/components/AppModals';
import { Colors } from './src/theme/colors';

const MainNavigator: React.FC = () => {
  const { currentScreen, prayers, selectedPrayerIndex } = useApp();

  const isHomeIsha =
    currentScreen === 'Home' && prayers[selectedPrayerIndex]?.id === 'Isha';
  const isSplash = currentScreen === 'Splash';

  const topBgColor = isSplash
    ? '#E1F3F4'
    : isHomeIsha
    ? '#051E24'
    : Colors.primary;

  const bottomBgColor =
    currentScreen === 'Qibla'
      ? '#56BF9C'
      : currentScreen === 'PrayerGuideList' ||
        currentScreen === 'PrayerGuideDetail'
      ? Colors.primary
      : Colors.mintBg;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Home':
        return <HomeScreen />;
      case 'AllPrayer':
        return <AllPrayerScreen />;
      case 'Calendar':
        return <CalendarScreen />;
      case 'Qibla':
        return <QiblaScreen />;
      case 'Menu':
        return <MenuScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'PrayerTimesSettings':
        return <PrayerTimesSettingsScreen />;
      case 'PrayerDuas':
        return <PrayerDuasScreen />;
      case 'PrayerGuideList':
        return <PrayerGuideListScreen />;
      case 'PrayerGuideDetail':
        return <PrayerGuideDetailScreen />;
      case 'WaduGuide':
        return <WaduGuideScreen />;
      case 'TasbihCounter':
        return <TasbihCounterScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeAreaTop, { backgroundColor: topBgColor }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style={isSplash ? 'dark' : 'light'} />
      <SafeAreaView
        style={[styles.safeAreaBottom, { backgroundColor: bottomBgColor }]}
        edges={['bottom']}
      >
        <View style={styles.screenContainer}>{renderScreen()}</View>
      </SafeAreaView>
      <AppModals />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 1,
  },
  safeAreaBottom: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
});
