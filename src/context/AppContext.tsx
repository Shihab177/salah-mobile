import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ALL_PRAYER_DAYS,
  AllPrayerDayRow,
  CALENDAR_DAYS,
  CalendarDayRow,
  DuaCardItem,
  INITIAL_DUAS,
  INITIAL_PRAYERS,
  PrayerTimeItem,
} from '../data/mockData';

export type ScreenName =
  | 'Splash'
  | 'Home'
  | 'AllPrayer'
  | 'Calendar'
  | 'Qibla'
  | 'Menu'
  | 'Settings'
  | 'PrayerDuas'
  | 'PrayerGuideList'
  | 'PrayerGuideDetail'
  | 'WaduGuide'
  | 'TasbihCounter'
  | 'PrayerTimesSettings';

export type ModalName =
  | null
  | 'CalendarSettingModal'
  | 'HijriSettingsModal'
  | 'FinancialSupportModal'
  | 'LanguagesModal'
  | 'LocationSettingsModal'
  | 'LocationMethodModal'
  | 'SearchLocationModal'
  | 'ManualLocationModal'
  | 'LocationInfoModal'
  | 'ManualTimesAdjustmentsModal'
  | 'NotificationSettingsModal'
  | 'PrayerNotificationTimesModal'
  | 'SwitchTimeModal'
  | 'SilentSettingsModal'
  | 'SilentTimeSettingsModal'
  | 'TasbihSettingsModal'
  | 'SalahReminderModal'
  | 'NoInternetModal';

export interface TasbihPreset {
  id: string;
  arabic: string;
  range: number;
}

export interface SilentPrayerConfig {
  enabled: boolean;
  switchMinutes: number;
  periodMinutes: number;
}

export interface NotificationPrayerConfig {
  enabled: boolean;
  minutesBefore: number;
}

interface SwitchTimeTarget {
  type: 'manualAdjustment' | 'notificationTime' | 'silentSwitch' | 'silentPeriod';
  prayerKey: string;
  title: string;
  currentValue: number;
}

interface AppContextType {
  currentScreen: ScreenName;
  screenHistory: ScreenName[];
  navigate: (screen: ScreenName) => void;
  goBack: () => void;

  activeModal: ModalName;
  openModal: (modal: ModalName) => void;
  closeModal: () => void;

  // Home & Prayer State
  prayers: PrayerTimeItem[];
  selectedPrayerIndex: number;
  setSelectedPrayerIndex: (idx: number) => void;
  togglePrayerMute: (id: PrayerTimeItem['id']) => void;
  suhoorMuted: boolean;
  setSuhoorMuted: (v: boolean) => void;
  iftaarMuted: boolean;
  setIftaarMuted: (v: boolean) => void;

  // All Prayer & Calendar
  allPrayerDays: AllPrayerDayRow[];
  selectedSeptDate: string;
  setSelectedSeptDate: (d: string) => void;
  calendarDays: CalendarDayRow[];
  selectedHijriDate: string;
  setSelectedHijriDate: (d: string) => void;

  // Duas, Prayer Guide, Wadu Guide
  duas: DuaCardItem[];
  waduSteps: DuaCardItem[];
  toggleDuaBookmark: (id: string) => void;
  toggleWaduBookmark: (id: string) => void;
  selectedGuideTopicId: number;
  setSelectedGuideTopicId: (id: number) => void;

  // Qibla
  qiblaThemeIndex: number;
  setQiblaThemeIndex: (idx: number) => void;
  qiblaAngle: number;
  setQiblaAngle: (deg: number) => void;

  // Tasbih Counter
  tasbihPresets: TasbihPreset[];
  activeTasbihIndex: number;
  setActiveTasbihIndex: (idx: number) => void;
  tasbihCount: number;
  tasbihSet: number;
  incrementTasbih: () => void;
  resetTasbih: () => void;
  updateTasbihPresetRange: (id: string, range: number) => void;

  // Settings & Modals State
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  hijriAdjustment: string;
  setHijriAdjustment: (adj: string) => void;
  calendarHijriAdjustment: string;
  setCalendarHijriAdjustment: (adj: string) => void;

  // Location Settings
  locationName: string;
  setLocationName: (name: string) => void;
  latitude: string;
  setLatitude: (lat: string) => void;
  longitude: string;
  setLongitude: (lng: string) => void;
  locationMethod: 'GPS' | 'Network';
  setLocationMethod: (m: 'GPS' | 'Network') => void;
  useInternetForLocation: boolean;
  setUseInternetForLocation: (v: boolean) => void;

  // Prayer Times Settings
  calculationMethod: string;
  juristicMethod: string;
  higherLatitude: string;
  adjustIshaRamadan: boolean;
  setAdjustIshaRamadan: (v: boolean) => void;
  manualAdjustments: Record<string, number>;
  resetManualAdjustments: () => void;

  // Notification Settings
  activateNotification: boolean;
  setActivateNotification: (v: boolean) => void;
  notificationAudio: boolean;
  setNotificationAudio: (v: boolean) => void;
  prayerNotificationTimes: Record<string, NotificationPrayerConfig>;
  togglePrayerNotification: (key: string) => void;

  // Silent Settings
  switchToSilent: boolean;
  setSwitchToSilent: (v: boolean) => void;
  vibrateOnSwitch: boolean;
  setVibrateOnSwitch: (v: boolean) => void;
  showMessageOnSwitch: boolean;
  setShowMessageOnSwitch: (v: boolean) => void;
  silentPrayerConfigs: Record<string, SilentPrayerConfig>;
  toggleSilentPrayerSwitch: (key: string) => void;

  // Switch Time Slider Modal Target
  switchTimeTarget: SwitchTimeTarget;
  openSwitchTimeSlider: (target: SwitchTimeTarget) => void;
  updateSwitchTimeValue: (val: number) => void;

  // Salah Reminder & Network/Refresh Handlers
  reminderPrayer: { name: string; time: string };
  openSalahReminder: (prayer?: { name: string; time: string }) => void;
  refreshAppData: () => void;
  checkInternetOrAlert: (onOnlineAction: () => void) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [screenHistory, setScreenHistory] = useState<ScreenName[]>(['Home']);
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  const [prayers, setPrayers] = useState<PrayerTimeItem[]>(INITIAL_PRAYERS);
  const [selectedPrayerIndex, setSelectedPrayerIndex] = useState<number>(0); // 0 = Fajr (Day), 4 = Isha (Night)
  const [suhoorMuted, setSuhoorMuted] = useState(false);
  const [iftaarMuted, setIftaarMuted] = useState(false);

  const [allPrayerDays] = useState<AllPrayerDayRow[]>(ALL_PRAYER_DAYS);
  const [selectedSeptDate, setSelectedSeptDate] = useState<string>('05 Sept');
  const [calendarDays] = useState<CalendarDayRow[]>(CALENDAR_DAYS);
  const [selectedHijriDate, setSelectedHijriDate] = useState<string>('05 Safar');

  const [duas, setDuas] = useState<DuaCardItem[]>(INITIAL_DUAS);
  const [waduSteps, setWaduSteps] = useState<DuaCardItem[]>(INITIAL_DUAS);
  const [selectedGuideTopicId, setSelectedGuideTopicId] = useState<number>(1);

  const [qiblaThemeIndex, setQiblaThemeIndex] = useState<number>(0);
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);

  const [tasbihPresets, setTasbihPresets] = useState<TasbihPreset[]>([
    { id: 'subhanallah', arabic: 'سبحان الله', range: 33 },
    { id: 'alhamdulillah', arabic: 'اَلْحَمْدُ لِلّٰهِ', range: 33 },
    { id: 'allahuakbar', arabic: 'الله اكبر', range: 33 },
  ]);
  const [activeTasbihIndex, setActiveTasbihIndex] = useState<number>(1); // default Alhamdulillah like screenshot
  const [tasbihCount, setTasbihCount] = useState<number>(33);
  const [tasbihSet, setTasbihSet] = useState<number>(1);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');
  const [hijriAdjustment, setHijriAdjustment] = useState<string>('No change');
  const [calendarHijriAdjustment, setCalendarHijriAdjustment] = useState<string>('No change');

  const [locationName, setLocationName] = useState<string>('Dubai, UAE');
  const [latitude, setLatitude] = useState<string>('25.234028');
  const [longitude, setLongitude] = useState<string>('55.3565471');
  const [locationMethod, setLocationMethod] = useState<'GPS' | 'Network'>('Network');
  const [useInternetForLocation, setUseInternetForLocation] = useState<boolean>(true);

  const [calculationMethod] = useState<string>('Umm Al-Qura University, Makkah');
  const [juristicMethod] = useState<string>('Shafi');
  const [higherLatitude] = useState<string>('Middle of the Night');
  const [adjustIshaRamadan, setAdjustIshaRamadan] = useState<boolean>(true);

  const [manualAdjustments, setManualAdjustments] = useState<Record<string, number>>({
    Fajr: 0,
    Zuhr: 0,
    Asr: 0,
    Magrib: 0,
    Isha: 0,
  });

  const [activateNotification, setActivateNotification] = useState<boolean>(true);
  const [notificationAudio, setNotificationAudio] = useState<boolean>(true);
  const [prayerNotificationTimes, setPrayerNotificationTimes] = useState<
    Record<string, NotificationPrayerConfig>
  >({
    Fajr: { enabled: true, minutesBefore: 0 },
    Zuhr: { enabled: true, minutesBefore: 0 },
    Asr: { enabled: true, minutesBefore: 0 },
    Magrib: { enabled: true, minutesBefore: 0 },
    Isha: { enabled: true, minutesBefore: 0 },
    Jumuah: { enabled: true, minutesBefore: 0 },
  });

  const [switchToSilent, setSwitchToSilent] = useState<boolean>(true);
  const [vibrateOnSwitch, setVibrateOnSwitch] = useState<boolean>(true);
  const [showMessageOnSwitch, setShowMessageOnSwitch] = useState<boolean>(true);
  const [silentPrayerConfigs, setSilentPrayerConfigs] = useState<
    Record<string, SilentPrayerConfig>
  >({
    Fajr: { enabled: true, switchMinutes: 20, periodMinutes: 10 },
    Zuhr: { enabled: true, switchMinutes: 20, periodMinutes: 10 },
    Asr: { enabled: true, switchMinutes: 20, periodMinutes: 10 },
    Magrib: { enabled: true, switchMinutes: 20, periodMinutes: 10 },
    Isha: { enabled: true, switchMinutes: 20, periodMinutes: 10 },
  });

  const [switchTimeTarget, setSwitchTimeTarget] = useState<SwitchTimeTarget>({
    type: 'notificationTime',
    prayerKey: 'Fajr',
    title: 'Before Prayer Time',
    currentValue: 0,
  });

  const [reminderPrayer, setReminderPrayer] = useState<{ name: string; time: string }>({
    name: 'Fajr',
    time: '05:17 AM',
  });

  const isCurrentlyOnline = () => {
    if (!useInternetForLocation) return false;
    if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
      return navigator.onLine;
    }
    return true;
  };

  const checkInternetOrAlert = (onOnlineAction: () => void) => {
    if (!isCurrentlyOnline()) {
      setActiveModal('NoInternetModal');
      return;
    }
    onOnlineAction();
  };

  const refreshAppData = () => {
    if (!isCurrentlyOnline()) {
      setActiveModal('NoInternetModal');
    }
  };

  const openSalahReminder = (prayer?: { name: string; time: string }) => {
    const current = prayer || prayers[selectedPrayerIndex] || prayers[0];
    setReminderPrayer({
      name: current.name,
      time: current.name === 'Fajr' && current.time === '4:44 AM' ? '05:17 AM' : current.time,
    });
    setActiveModal('SalahReminderModal');
  };

  // Listen for browser/device offline event & automatic prayer time trigger
  useEffect(() => {
    const handleOffline = () => {
      setActiveModal('NoInternetModal');
    };
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('offline', handleOffline);
    }

    const timer = setInterval(() => {
      if (!activateNotification) return;
      const now = new Date();
      let hrs = now.getHours();
      const mins = now.getMinutes();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      const formattedNow = `${hrs}:${mins < 10 ? '0' + mins : mins} ${ampm}`;
      const matched = prayers.find((p) => p.time === formattedNow && !p.muted);
      if (matched) {
        openSalahReminder(matched);
      }
    }, 45000);

    return () => {
      if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
        window.removeEventListener('offline', handleOffline);
      }
      clearInterval(timer);
    };
  }, [activateNotification, prayers]);

  const navigate = (screen: ScreenName) => {
    setActiveModal(null);
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (activeModal) {
      setActiveModal(null);
      return;
    }
    if (screenHistory.length > 1) {
      const nextHistory = screenHistory.slice(0, -1);
      setScreenHistory(nextHistory);
      setCurrentScreen(nextHistory[nextHistory.length - 1]);
    } else {
      setCurrentScreen('Home');
    }
  };

  const openModal = (modal: ModalName) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const togglePrayerMute = (id: PrayerTimeItem['id']) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, muted: !p.muted } : p))
    );
  };

  const toggleDuaBookmark = (id: string) => {
    setDuas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, bookmarked: !d.bookmarked } : d))
    );
  };

  const toggleWaduBookmark = (id: string) => {
    setWaduSteps((prev) =>
      prev.map((d) => (d.id === id ? { ...d, bookmarked: !d.bookmarked } : d))
    );
  };

  const incrementTasbih = () => {
    const currentRange = tasbihPresets[activeTasbihIndex]?.range || 33;
    if (tasbihCount >= currentRange) {
      setTasbihCount(1);
      setTasbihSet((s) => s + 1);
    } else {
      setTasbihCount((c) => c + 1);
    }
  };

  const resetTasbih = () => {
    setTasbihCount(0);
    setTasbihSet(1);
  };

  const updateTasbihPresetRange = (id: string, range: number) => {
    setTasbihPresets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, range } : p))
    );
  };

  const resetManualAdjustments = () => {
    setManualAdjustments({ Fajr: 0, Zuhr: 0, Asr: 0, Magrib: 0, Isha: 0 });
  };

  const togglePrayerNotification = (key: string) => {
    setPrayerNotificationTimes((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  const toggleSilentPrayerSwitch = (key: string) => {
    setSilentPrayerConfigs((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  const openSwitchTimeSlider = (target: SwitchTimeTarget) => {
    setSwitchTimeTarget(target);
    setActiveModal('SwitchTimeModal');
  };

  const updateSwitchTimeValue = (val: number) => {
    setSwitchTimeTarget((prev) => ({ ...prev, currentValue: val }));
    const { type, prayerKey } = switchTimeTarget;
    if (type === 'manualAdjustment') {
      setManualAdjustments((prev) => ({ ...prev, [prayerKey]: val }));
    } else if (type === 'notificationTime') {
      setPrayerNotificationTimes((prev) => ({
        ...prev,
        [prayerKey]: { ...prev[prayerKey], minutesBefore: val },
      }));
    } else if (type === 'silentSwitch') {
      setSilentPrayerConfigs((prev) => ({
        ...prev,
        [prayerKey]: { ...prev[prayerKey], switchMinutes: val },
      }));
    } else if (type === 'silentPeriod') {
      setSilentPrayerConfigs((prev) => ({
        ...prev,
        [prayerKey]: { ...prev[prayerKey], periodMinutes: val },
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigate,
        goBack,
        activeModal,
        openModal,
        closeModal,
        prayers,
        selectedPrayerIndex,
        setSelectedPrayerIndex,
        togglePrayerMute,
        suhoorMuted,
        setSuhoorMuted,
        iftaarMuted,
        setIftaarMuted,
        allPrayerDays,
        selectedSeptDate,
        setSelectedSeptDate,
        calendarDays,
        selectedHijriDate,
        setSelectedHijriDate,
        duas,
        waduSteps,
        toggleDuaBookmark,
        toggleWaduBookmark,
        selectedGuideTopicId,
        setSelectedGuideTopicId,
        qiblaThemeIndex,
        setQiblaThemeIndex,
        qiblaAngle,
        setQiblaAngle,
        tasbihPresets,
        activeTasbihIndex,
        setActiveTasbihIndex,
        tasbihCount,
        tasbihSet,
        incrementTasbih,
        resetTasbih,
        updateTasbihPresetRange,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        hijriAdjustment,
        setHijriAdjustment,
        calendarHijriAdjustment,
        setCalendarHijriAdjustment,
        locationName,
        setLocationName,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        locationMethod,
        setLocationMethod,
        useInternetForLocation,
        setUseInternetForLocation,
        calculationMethod,
        juristicMethod,
        higherLatitude,
        adjustIshaRamadan,
        setAdjustIshaRamadan,
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
        switchTimeTarget,
        openSwitchTimeSlider,
        updateSwitchTimeValue,
        reminderPrayer,
        openSalahReminder,
        refreshAppData,
        checkInternetOrAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
