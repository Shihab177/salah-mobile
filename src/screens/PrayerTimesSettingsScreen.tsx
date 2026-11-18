import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader, CustomCheckbox } from '../components/CommonUI';
import { MandalaCornerWatermark } from '../components/SvgIcons';
import { Colors } from '../theme/colors';

export const PrayerTimesSettingsScreen: React.FC = () => {
  const {
    calculationMethod,
    juristicMethod,
    higherLatitude,
    adjustIshaRamadan,
    setAdjustIshaRamadan,
    openModal,
  } = useApp();

  return (
    <View style={styles.container}>
      <AppHeader title="Prayer Times Settings" />

      <ScrollView
        style={styles.bodySheet}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Calculations</Text>

        {/* 1. Methods */}
        <TouchableOpacity style={styles.rowCard} activeOpacity={0.85}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Methods</Text>
            <Text style={styles.cardSub}>{calculationMethod}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 2. Juristic Method */}
        <TouchableOpacity style={styles.rowCard} activeOpacity={0.85}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Juristic Method</Text>
            <Text style={styles.cardSub}>{juristicMethod}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 3. Higher latitude Adjustment */}
        <TouchableOpacity style={styles.rowCard} activeOpacity={0.85}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Higher latitude Adjustment</Text>
            <Text style={styles.cardSub}>{higherLatitude}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 4. Adjust Isha in Ramadan */}
        <View style={styles.rowCard}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.cardTitle}>Adjust Isha in Ramadan</Text>
            <Text style={styles.cardSub}>
              Add 30 minutes to Isha time during Ramadan in Umm Al-Qura method
            </Text>
          </View>
          <CustomCheckbox
            checked={adjustIshaRamadan}
            onPress={() => setAdjustIshaRamadan(!adjustIshaRamadan)}
          />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Times</Text>

        {/* 5. Adjust Daylight Saving TIme */}
        <TouchableOpacity style={styles.rowCard} activeOpacity={0.85}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Adjust Daylight Saving TIme</Text>
            <Text style={styles.cardSub}>
              1 hour adjustment to set summer time (DST)
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 6. Jumuah Prayer Time */}
        <TouchableOpacity style={styles.rowCard} activeOpacity={0.85}>
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Jumuah Prayer Time</Text>
            <Text style={styles.cardSub}>
              Input the appropriate time for Jumuah prayer
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#BDCECF" />
        </TouchableOpacity>

        {/* 7. Manual Times Adjustments */}
        <TouchableOpacity
          style={styles.rowCard}
          activeOpacity={0.85}
          onPress={() => openModal('ManualTimesAdjustmentsModal')}
        >
          <View style={styles.cardWatermark}>
            <MandalaCornerWatermark size={82} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Manual Times Adjustments</Text>
            <Text style={styles.cardSub}>Change Prayers times manually</Text>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#192122',
    marginBottom: 14,
  },
  rowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
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
  cardTitle: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#182122',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12.5,
    color: '#889596',
    lineHeight: 18,
  },
});
