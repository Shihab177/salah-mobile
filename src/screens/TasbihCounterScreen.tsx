import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/CommonUI';
import { MandalaCornerWatermark, TasbihBeadsIcon } from '../components/SvgIcons';
import { Colors } from '../theme/colors';

export const TasbihCounterScreen: React.FC = () => {
  const {
    tasbihPresets,
    activeTasbihIndex,
    tasbihCount,
    tasbihSet,
    incrementTasbih,
    resetTasbih,
    openModal,
  } = useApp();

  const currentPreset = tasbihPresets[activeTasbihIndex] || tasbihPresets[1];

  return (
    <View style={styles.container}>
      <AppHeader title="Tasbih Counter" />

      <View style={styles.bodySheet}>
        {/* Bottom Subtle Mandala Watermark */}
        <View style={styles.bottomMandala} pointerEvents="none">
          <MandalaCornerWatermark size={260} color="rgba(35, 166, 158, 0.06)" />
        </View>

        {/* Set & Range Top Row */}
        <View style={styles.topStatsRow}>
          <Text style={styles.statText}>Set : {tasbihSet}</Text>
          <Text style={styles.statText}>Range : {currentPreset.range}</Text>
        </View>

        {/* Arabic Dhikr */}
        <View style={styles.centerSection}>
          <Text style={styles.arabicDhikr}>{currentPreset.arabic}</Text>

          <Text style={styles.counterLabel}>Tasbih Counter</Text>
          <Text style={styles.counterBigNumber}>{tasbihCount}</Text>

          {/* Circular TAP Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={incrementTasbih}
            style={styles.tapOuterCircle}
          >
            <View style={styles.tapInnerCircle}>
              <TasbihBeadsIcon size={84} color={Colors.primaryDark} />
              <Text style={styles.tapText}>TAP</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Pill Bar with Settings Gear & Reset Icon */}
        <View style={styles.bottomPillWrapper}>
          <View style={styles.bottomPill}>
            <TouchableOpacity
              style={styles.pillIconBtn}
              onPress={() => openModal('TasbihSettingsModal')}
            >
              <Ionicons
                name="settings-outline"
                size={25}
                color={Colors.primaryDark}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pillIconBtn} onPress={resetTasbih}>
              <Feather name="rotate-cw" size={23} color={Colors.primaryDark} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 18,
    justifyContent: 'space-between',
  },
  bottomMandala: {
    position: 'absolute',
    bottom: -60,
    alignSelf: 'center',
  },
  topStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#192122',
  },
  centerSection: {
    alignItems: 'center',
    marginTop: -6,
  },
  arabicDhikr: {
    fontSize: 44,
    fontWeight: '700',
    color: '#161C1D',
    marginBottom: 22,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2324',
    marginBottom: 4,
  },
  counterBigNumber: {
    fontSize: 72,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: 22,
  },
  tapOuterCircle: {
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: '#F3FAFA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0E4A4A',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  tapInnerCircle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: '#BDE0E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#5C989B',
    marginTop: 4,
    letterSpacing: 0.8,
  },
  bottomPillWrapper: {
    alignItems: 'center',
  },
  bottomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D5ECEE',
    borderWidth: 2,
    borderColor: '#EBF7F7',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingVertical: 11,
    width: 136,
  },
  pillIconBtn: {
    padding: 4,
  },
});
