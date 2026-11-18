import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Colors } from '../theme/colors';
import { FINANCIAL_TIERS } from '../data/mockData';
import { CustomCheckbox, CustomToggle } from './CommonUI';
import {
  CongregationPrayingIllustration,
  MandalaCornerWatermark,
  WifiOffIllustration,
} from './SvgIcons';

export const AppModals: React.FC = () => {
  const {
    activeModal,
    closeModal,
    openModal,
    calendarHijriAdjustment,
    setCalendarHijriAdjustment,
    hijriAdjustment,
    setHijriAdjustment,
    language,
    setLanguage,
    locationMethod,
    setLocationMethod,
    useInternetForLocation,
    setUseInternetForLocation,
    locationName,
    setLocationName,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    manualAdjustments,
    resetManualAdjustments,
    activateNotification,
    setActivateNotification,
    notificationAudio,
    setNotificationAudio,
    prayerNotificationTimes,
    togglePrayerNotification,
    switchToSilent,
    setSwitchToSilent,
    vibrateOnSwitch,
    setVibrateOnSwitch,
    showMessageOnSwitch,
    setShowMessageOnSwitch,
    silentPrayerConfigs,
    toggleSilentPrayerSwitch,
    tasbihPresets,
    setActiveTasbihIndex,
    updateTasbihPresetRange,
    switchTimeTarget,
    openSwitchTimeSlider,
    updateSwitchTimeValue,
    reminderPrayer,
    checkInternetOrAlert,
  } = useApp();

  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [tempLat, setTempLat] = useState(latitude);
  const [tempLng, setTempLng] = useState(longitude);

  if (!activeModal) return null;

  const renderCloseCircle = (onPress = closeModal, lightBg = false) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.closeCircleBtn,
        lightBg && {
          backgroundColor: 'rgba(255,255,255,0.28)',
          borderColor: 'transparent',
        },
      ]}
    >
      <Feather
        name="x"
        size={18}
        color={lightBg ? '#FFFFFF' : Colors.primaryDark}
      />
    </TouchableOpacity>
  );

  const renderRadioList = (
    options: string[],
    selectedValue: string,
    onSelect: (val: string) => void
  ) =>
    options.map((opt) => {
      const selected = opt === selectedValue;
      return (
        <TouchableOpacity
          key={opt}
          activeOpacity={0.8}
          onPress={() => onSelect(opt)}
          style={[styles.radioRow, selected && styles.radioRowSelected]}
        >
          <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>
            {opt}
          </Text>
          <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
            {selected && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      );
    });

  const renderCenterDialog = () => {
    switch (activeModal) {
      case 'CalendarSettingModal': {
        const opts = [
          'Two days ago (-2)',
          'One days ago (-1)',
          'No change',
          'One days ahead (+1)',
          'Two days ahead (+2)',
        ];
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Hijri Date Adjustment</Text>
              {renderCloseCircle()}
            </View>
            {renderRadioList(opts, calendarHijriAdjustment, (val) => {
              setCalendarHijriAdjustment(val);
            })}
          </View>
        );
      }

      case 'HijriSettingsModal': {
        const opts = [
          'Two days ago',
          'One day ago',
          'No change',
          'One day ahead',
          'Two days ahead',
        ];
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Hijri date adjustment</Text>
              {renderCloseCircle()}
            </View>
            {renderRadioList(opts, hijriAdjustment, (val) => {
              setHijriAdjustment(val);
            })}
          </View>
        );
      }

      case 'LanguagesModal': {
        const opts = ['العربية', 'English', 'اردو', 'हिंदी', 'বাংলা'];
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Languages</Text>
              {renderCloseCircle()}
            </View>
            {renderRadioList(opts, language, (val) => {
              setLanguage(val);
            })}
          </View>
        );
      }

      case 'LocationMethodModal': {
        const opts: ('GPS' | 'Network')[] = ['GPS', 'Network'];
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Location Method</Text>
              {renderCloseCircle(() => openModal('LocationSettingsModal'))}
            </View>
            {renderRadioList(opts, locationMethod, (val) => {
              setLocationMethod(val as 'GPS' | 'Network');
            })}
          </View>
        );
      }

      case 'LocationInfoModal': {
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Location  info</Text>
              {renderCloseCircle(() => openModal('LocationSettingsModal'))}
            </View>
            <View style={styles.infoBoxRow}>
              <Text style={styles.infoBoxLabel}>Latitude</Text>
              <Text style={styles.infoBoxValue}>{latitude}</Text>
            </View>
            <View style={styles.infoBoxRow}>
              <Text style={styles.infoBoxLabel}>Longitude</Text>
              <Text style={styles.infoBoxValue}>{longitude}</Text>
            </View>
            <View style={styles.infoBoxRow}>
              <Text style={styles.infoBoxLabel}>Name</Text>
              <Text style={styles.infoBoxValue}>
                {locationName === 'Dubai, UAE' ? 'AE, Dubai' : locationName}
              </Text>
            </View>
          </View>
        );
      }

      case 'SearchLocationModal': {
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Location</Text>
              {renderCloseCircle(() => openModal('LocationSettingsModal'))}
            </View>
            <View style={styles.searchInputGroup}>
              <TextInput
                style={styles.searchTextInput}
                placeholder="Dubai, UAE"
                placeholderTextColor="#B0BFC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                style={styles.findBtn}
                activeOpacity={0.85}
                onPress={() => {
                  checkInternetOrAlert(() => {
                    if (searchQuery.trim()) {
                      setLocationName(searchQuery.trim());
                    }
                    openModal('LocationSettingsModal');
                  });
                }}
              >
                <Text style={styles.findBtnText}>FIND</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.searchCaption}>
              Location information are retrieved from Google Maps data
            </Text>
          </View>
        );
      }

      case 'ManualLocationModal': {
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Location</Text>
              {renderCloseCircle(() => openModal('LocationSettingsModal'))}
            </View>
            <TextInput
              style={styles.manualInput}
              placeholder="Latitude"
              placeholderTextColor="#A5B4B5"
              keyboardType="numeric"
              value={tempLat}
              onChangeText={setTempLat}
            />
            <TextInput
              style={styles.manualInput}
              placeholder="Longitude"
              placeholderTextColor="#A5B4B5"
              keyboardType="numeric"
              value={tempLng}
              onChangeText={setTempLng}
            />
            <TouchableOpacity
              style={styles.setFullBtn}
              activeOpacity={0.85}
              onPress={() => {
                if (tempLat.trim()) setLatitude(tempLat.trim());
                if (tempLng.trim()) setLongitude(tempLng.trim());
                openModal('LocationSettingsModal');
              }}
            >
              <Text style={styles.setFullBtnText}>SET</Text>
            </TouchableOpacity>
          </View>
        );
      }

      case 'TasbihSettingsModal': {
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Tasbih Counter Settings</Text>
              {renderCloseCircle()}
            </View>
            {tasbihPresets.map((preset, index) => (
              <TouchableOpacity
                key={preset.id}
                style={styles.tasbihSettingRow}
                activeOpacity={0.8}
                onPress={() => {
                  setActiveTasbihIndex(index);
                  const nextRange =
                    preset.range === 33 ? 99 : preset.range === 99 ? 100 : 33;
                  updateTasbihPresetRange(preset.id, nextRange);
                }}
              >
                <View style={styles.tasbihArabicBox}>
                  <Text style={styles.tasbihArabicSettingText}>{preset.arabic}</Text>
                </View>
                <View style={styles.tasbihCountBox}>
                  <Text style={styles.tasbihCountSettingText}>{preset.range}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      }

      case 'SwitchTimeModal': {
        const val = switchTimeTarget.currentValue;
        const pct = Math.min(100, Math.max(0, (val / 60) * 100));
        const steps = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60];
        return (
          <View style={styles.centerCard}>
            <View style={styles.watermarkTopCenter}>
              <MandalaCornerWatermark size={120} />
            </View>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>{switchTimeTarget.title}</Text>
              {renderCloseCircle()}
            </View>

            <Text style={styles.sliderCenterValue}>{val}</Text>

            <View style={styles.sliderLabelsRow}>
              <Text style={styles.sliderEndLabel}>0</Text>
              <Text style={styles.sliderEndLabel}>60</Text>
            </View>

            <View style={styles.sliderTrackContainer}>
              <View style={styles.sliderTrackLine} />
              <View style={[styles.sliderTrackFill, { width: `${pct}%` }]} />
              <View style={[styles.sliderThumb, { left: `${pct}%` }]} />
              {/* Interactive step tap overlay */}
              <View style={styles.sliderTouchRow}>
                {steps.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.sliderTouchStep}
                    onPress={() => updateSwitchTimeValue(s)}
                  />
                ))}
              </View>
            </View>
          </View>
        );
      }

      default:
        return null;
    }
  };

  const renderBottomSheet = () => {
    switch (activeModal) {
      case 'FinancialSupportModal':
        return (
          <View style={styles.sheetOuter}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Financial Support</Text>
              {renderCloseCircle(closeModal, true)}
            </View>
            <View style={styles.sheetWhiteBody}>
              <View style={styles.noticeCard}>
                <View style={styles.noticeWatermarkLeft}>
                  <MandalaCornerWatermark size={76} />
                </View>
                <View style={styles.noticeWatermarkRight}>
                  <MandalaCornerWatermark size={76} />
                </View>
                <Text style={styles.noticeBodyText}>
                  This page is added upon users requests{'\n'}to find a way to support the app
                </Text>
              </View>

              <View style={styles.tiersGrid}>
                {FINANCIAL_TIERS.map((tier, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.tierCard}
                    activeOpacity={0.8}
                    onPress={closeModal}
                  >
                    <Text style={styles.tierUsdText}>{tier.usd}</Text>
                    <Text style={styles.tierAedText}>{tier.aed}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 'LocationSettingsModal':
        return (
          <View style={styles.sheetOuter}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Location Settings</Text>
              {renderCloseCircle(closeModal, true)}
            </View>
            <View style={styles.sheetWhiteBody}>
              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() => openModal('LocationMethodModal')}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Location Method</Text>
                  <Text style={styles.sheetItemSub}>
                    Network is faster in finding location
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>

              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Use Internet</Text>
                  <Text style={styles.sheetItemSub}>
                    Only used to get your location name
                  </Text>
                </View>
                <CustomCheckbox
                  checked={useInternetForLocation}
                  onPress={() => setUseInternetForLocation(!useInternetForLocation)}
                />
              </View>

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() =>
                  checkInternetOrAlert(() => openModal('SearchLocationModal'))
                }
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Search for location</Text>
                  <Text style={styles.sheetItemSub}>
                    The search is done using Google Maps data
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() => openModal('ManualLocationModal')}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Manual Location Setting</Text>
                  <Text style={styles.sheetItemSub}>
                    Enter latitude and longitude manually
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() => openModal('LocationInfoModal')}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>location  info</Text>
                  <Text style={styles.sheetItemSub}>
                    Show currently used latitude and longitude
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'ManualTimesAdjustmentsModal':
        return (
          <View style={[styles.sheetOuter, { maxHeight: '88%' }]}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Manual Times Adjustments</Text>
              {renderCloseCircle(closeModal, true)}
            </View>
            <ScrollView
              style={styles.sheetWhiteBody}
              contentContainerStyle={{ paddingBottom: 28 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.noticeCard}>
                <View style={styles.noticeWatermarkLeft}>
                  <MandalaCornerWatermark size={82} />
                </View>
                <View style={styles.noticeWatermarkRight}>
                  <MandalaCornerWatermark size={82} />
                </View>
                <Text style={styles.noticeHeading}>Important Notice</Text>
                <Text style={styles.noticeBodyText}>
                  Before modifying times, make sure to{'\n'}select the best settings for your area,{'\n'}and choose the correct Time Zone{'\n'}from device settings.
                </Text>
              </View>

              <Text style={styles.sheetSectionHeading}>Adjustments</Text>

              {(['Fajr', 'Zuhr', 'Asr', 'Magrib', 'Isha'] as const).map((pKey) => (
                <TouchableOpacity
                  key={pKey}
                  style={styles.sheetItemCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    openSwitchTimeSlider({
                      type: 'manualAdjustment',
                      prayerKey: pKey,
                      title: `${pKey} Time`,
                      currentValue: manualAdjustments[pKey] || 0,
                    })
                  }
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sheetItemTitle}>{pKey} TIme</Text>
                    <Text style={styles.sheetItemSub}>
                      Current value in minutes: {manualAdjustments[pKey] || 0}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#BDD4D4" />
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={resetManualAdjustments}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Reset Default Times</Text>
                  <Text style={styles.sheetItemSub}>
                    Change the times of all prayers back to original values
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );

      case 'NotificationSettingsModal':
        return (
          <View style={styles.sheetOuter}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Notification Settings</Text>
              {renderCloseCircle(closeModal, true)}
            </View>
            <View style={styles.sheetWhiteBody}>
              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Activate Notification</Text>
                  <Text style={styles.sheetItemSub}>Notify on prayer time</Text>
                </View>
                <CustomToggle
                  value={activateNotification}
                  onValueChange={setActivateNotification}
                />
              </View>

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() => openModal('PrayerNotificationTimesModal')}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Prayer Notification Times</Text>
                  <Text style={styles.sheetItemSub}>
                    Prayer notification time for each prayer
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>

              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Notification Audio</Text>
                  <Text style={styles.sheetItemSub}>Athan notification audio</Text>
                </View>
                <CustomToggle
                  value={notificationAudio}
                  onValueChange={setNotificationAudio}
                />
              </View>
            </View>
          </View>
        );

      case 'PrayerNotificationTimesModal':
        return (
          <View style={[styles.sheetOuter, { maxHeight: '85%' }]}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Prayer Notification Times</Text>
              {renderCloseCircle(() => openModal('NotificationSettingsModal'), true)}
            </View>
            <ScrollView
              style={styles.sheetWhiteBody}
              contentContainerStyle={{ paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sheetSectionHeading}>Active Notification Times</Text>
              {(['Fajr', 'Zuhr', 'Asr', 'Magrib', 'Isha', 'Jumuah'] as const).map(
                (pKey) => {
                  const cfg = prayerNotificationTimes[pKey];
                  return (
                    <TouchableOpacity
                      key={pKey}
                      style={styles.sheetItemCard}
                      activeOpacity={0.85}
                      onPress={() =>
                        openSwitchTimeSlider({
                          type: 'notificationTime',
                          prayerKey: pKey,
                          title: 'Before Prayer Time',
                          currentValue: cfg.minutesBefore,
                        })
                      }
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.sheetItemTitle}>{pKey} Switch TIme</Text>
                        <Text style={styles.sheetItemSub}>
                          Current value in minutes: {cfg.minutesBefore}
                        </Text>
                      </View>
                      <CustomToggle
                        value={cfg.enabled}
                        onValueChange={() => togglePrayerNotification(pKey)}
                      />
                    </TouchableOpacity>
                  );
                }
              )}
            </ScrollView>
          </View>
        );

      case 'SilentSettingsModal':
        return (
          <View style={styles.sheetOuter}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Silent Settings</Text>
              {renderCloseCircle(closeModal, true)}
            </View>
            <View style={styles.sheetWhiteBody}>
              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sheetItemTitle}>Switch to Silent</Text>
                  <Text style={styles.sheetItemSub}>Switch to silent during prayer</Text>
                </View>
                <CustomToggle
                  value={switchToSilent}
                  onValueChange={setSwitchToSilent}
                />
              </View>

              <TouchableOpacity
                style={styles.sheetItemCard}
                activeOpacity={0.8}
                onPress={() => openModal('SilentTimeSettingsModal')}
              >
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.sheetItemTitle}>Silent Time Settings</Text>
                  <Text style={styles.sheetItemSub}>
                    Set the start time of silent mode and its duration for each prayer
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#BDD4D4" />
              </TouchableOpacity>

              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.sheetItemTitle}>Vibrate on Switching</Text>
                  <Text style={styles.sheetItemSub}>
                    Vibrate once when switching from or to silent mode
                  </Text>
                </View>
                <CustomCheckbox
                  checked={vibrateOnSwitch}
                  onPress={() => setVibrateOnSwitch(!vibrateOnSwitch)}
                />
              </View>

              <View style={styles.sheetItemCard}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.sheetItemTitle}>Show message on Switching</Text>
                  <Text style={styles.sheetItemSub}>
                    Show a message when switching from or to silent mode
                  </Text>
                </View>
                <CustomCheckbox
                  checked={showMessageOnSwitch}
                  onPress={() => setShowMessageOnSwitch(!showMessageOnSwitch)}
                />
              </View>
            </View>
          </View>
        );

      case 'SilentTimeSettingsModal':
        return (
          <View style={[styles.sheetOuter, { maxHeight: '88%' }]}>
            <View style={styles.sheetTealHeader}>
              <Text style={styles.sheetTealTitle}>Silent Time Settings</Text>
              {renderCloseCircle(() => openModal('SilentSettingsModal'), true)}
            </View>
            <ScrollView
              style={styles.sheetWhiteBody}
              contentContainerStyle={{ paddingBottom: 28 }}
              showsVerticalScrollIndicator={false}
            >
              {(['Fajr', 'Zuhr', 'Asr', 'Magrib', 'Isha'] as const).map((pKey) => {
                const cfg = silentPrayerConfigs[pKey];
                return (
                  <View key={pKey} style={{ marginBottom: 6 }}>
                    <Text style={styles.sheetSectionHeading}>{pKey} Prayer</Text>
                    <TouchableOpacity
                      style={styles.sheetItemCard}
                      activeOpacity={0.85}
                      onPress={() =>
                        openSwitchTimeSlider({
                          type: 'silentSwitch',
                          prayerKey: pKey,
                          title: 'Before Prayer Time',
                          currentValue: cfg.switchMinutes,
                        })
                      }
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.sheetItemTitle}>{pKey} Switch TIme</Text>
                        <Text style={styles.sheetItemSub}>
                          Current value in minutes: {cfg.switchMinutes}
                        </Text>
                      </View>
                      <CustomToggle
                        value={cfg.enabled}
                        onValueChange={() => toggleSilentPrayerSwitch(pKey)}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.sheetItemCard}
                      activeOpacity={0.85}
                      onPress={() =>
                        openSwitchTimeSlider({
                          type: 'silentPeriod',
                          prayerKey: pKey,
                          title: 'Silent Period',
                          currentValue: cfg.periodMinutes,
                        })
                      }
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.sheetItemTitle}>Silent Period</Text>
                        <Text style={styles.sheetItemSub}>
                          Current value in minutes: {cfg.periodMinutes}
                        </Text>
                      </View>
                      <Feather name="chevron-right" size={20} color="#BDD4D4" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );

      case 'SalahReminderModal':
        return (
          <View style={styles.mintAlertSheet}>
            <View style={styles.mintAlertContent}>
              <Text style={styles.salahReminderHeading}>
                Its time to offer {reminderPrayer.name}
              </Text>
              <View style={{ marginVertical: 14 }}>
                <CongregationPrayingIllustration size={142} />
              </View>
              <Text style={styles.salahReminderTime}>{reminderPrayer.time}</Text>
              <Text style={styles.salahReminderSub}>
                Proceed to salah and hand over your{'\n'}worries to Allah
              </Text>
            </View>
            <TouchableOpacity
              style={styles.mintCloseBar}
              activeOpacity={0.85}
              onPress={closeModal}
            >
              <Text style={styles.mintCloseBarText}>Close</Text>
            </TouchableOpacity>
          </View>
        );

      case 'NoInternetModal':
        return (
          <View style={styles.mintAlertSheet}>
            <View style={styles.mintAlertContent}>
              <View style={{ marginVertical: 16 }}>
                <WifiOffIllustration size={84} />
              </View>
              <Text style={styles.offlineHeading}>Its look like you’re offline</Text>
              <Text style={styles.salahReminderSub}>
                Check your internet connection and try{'\n'}again
              </Text>
            </View>
            <TouchableOpacity
              style={styles.mintCloseBar}
              activeOpacity={0.85}
              onPress={closeModal}
            >
              <Text style={styles.mintCloseBarText}>Close</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  const isCenterDialog = [
    'CalendarSettingModal',
    'HijriSettingsModal',
    'LanguagesModal',
    'LocationMethodModal',
    'LocationInfoModal',
    'SearchLocationModal',
    'ManualLocationModal',
    'TasbihSettingsModal',
    'SwitchTimeModal',
  ].includes(activeModal);

  return (
    <Modal
      visible={!!activeModal}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View
        style={[
          styles.backdrop,
          isCenterDialog
            ? styles.backdropCenter
            : [styles.backdropBottom, { paddingBottom: insets.bottom }],
        ]}
      >
        {isCenterDialog ? renderCenterDialog() : renderBottomSheet()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
  },
  backdropCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  backdropBottom: {
    justifyContent: 'flex-end',
  },
  centerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 26,
    overflow: 'hidden',
  },
  watermarkTopCenter: {
    position: 'absolute',
    top: -36,
    right: 60,
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  dialogTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#181E1F',
  },
  closeCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#79C2BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECF4F4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  radioRowSelected: {
    backgroundColor: '#E5F4F4',
    borderColor: '#D6EEEE',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2627',
  },
  radioLabelSelected: {
    fontWeight: '600',
    color: '#152021',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E6F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    backgroundColor: '#D7EFEF',
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.primaryDark,
  },
  infoBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECF4F4',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 12,
  },
  infoBoxLabel: {
    fontSize: 15,
    color: '#4F5A5B',
    fontWeight: '500',
  },
  infoBoxValue: {
    fontSize: 15,
    color: '#2B3536',
    fontWeight: '700',
  },
  searchInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECF4F4',
    borderRadius: 12,
    overflow: 'hidden',
    height: 52,
    marginTop: 4,
    marginBottom: 14,
  },
  searchTextInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1E2728',
  },
  findBtn: {
    backgroundColor: Colors.primary,
    height: '100%',
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
  },
  findBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  searchCaption: {
    fontSize: 13,
    color: '#889495',
    lineHeight: 19,
  },
  manualInput: {
    borderWidth: 1,
    borderColor: '#ECF4F4',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1E2728',
    marginBottom: 14,
  },
  setFullBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  setFullBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  tasbihSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5F2F2',
    borderRadius: 12,
    overflow: 'hidden',
    height: 52,
    marginBottom: 14,
  },
  tasbihArabicBox: {
    flex: 1.8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  tasbihArabicSettingText: {
    fontSize: 16,
    color: '#1F2627',
    fontWeight: '600',
  },
  tasbihCountBox: {
    flex: 1,
    backgroundColor: '#E4F4F4',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#D5ECEC',
  },
  tasbihCountSettingText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  sliderCenterValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1B2425',
    textAlign: 'center',
    marginTop: 10,
  },
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderEndLabel: {
    fontSize: 16,
    color: '#B6C2C3',
    fontWeight: '500',
  },
  sliderTrackContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrackLine: {
    height: 2,
    backgroundColor: '#E1F1F1',
    width: '100%',
  },
  sliderTrackFill: {
    position: 'absolute',
    left: 0,
    height: 2,
    backgroundColor: Colors.primaryDark,
  },
  sliderThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primaryDark,
    marginLeft: -9,
  },
  sliderTouchRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  sliderTouchStep: {
    flex: 1,
    height: '100%',
  },
  sheetOuter: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  sheetTealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  sheetTealTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sheetWhiteBody: {
    backgroundColor: '#F5FAFA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 26,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  noticeWatermarkLeft: {
    position: 'absolute',
    left: -26,
    top: 12,
  },
  noticeWatermarkRight: {
    position: 'absolute',
    right: -26,
    top: 12,
  },
  noticeHeading: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 10,
  },
  noticeBodyText: {
    fontSize: 14,
    color: '#1E2526',
    textAlign: 'center',
    lineHeight: 21,
  },
  tiersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  tierCard: {
    width: '30.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  tierUsdText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#192021',
    marginBottom: 3,
  },
  tierAedText: {
    fontSize: 12.5,
    color: '#5F6A6B',
  },
  sheetSectionHeading: {
    fontSize: 17,
    fontWeight: '600',
    color: '#182021',
    marginBottom: 12,
    marginTop: 4,
  },
  sheetItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sheetItemTitle: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#192122',
    marginBottom: 4,
  },
  sheetItemSub: {
    fontSize: 12.5,
    color: '#889495',
    lineHeight: 17,
  },
  mintAlertSheet: {
    width: '100%',
    backgroundColor: '#E5F5F5',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 28,
    overflow: 'hidden',
  },
  mintAlertContent: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  salahReminderHeading: {
    fontSize: 21,
    fontWeight: '600',
    color: '#192021',
    marginBottom: 6,
  },
  salahReminderTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2526',
    marginBottom: 14,
  },
  salahReminderSub: {
    fontSize: 15,
    color: '#252E2F',
    textAlign: 'center',
    lineHeight: 23,
  },
  offlineHeading: {
    fontSize: 21,
    fontWeight: '600',
    color: '#192021',
    marginBottom: 12,
  },
  mintCloseBar: {
    backgroundColor: '#F5FBFB',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mintCloseBarText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B2324',
  },
});
