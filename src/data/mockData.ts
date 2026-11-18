export interface PrayerTimeItem {
  id: 'Fajr' | 'Duhur' | 'Asr' | 'Maghrib' | 'Isha';
  name: string;
  time: string;
  remaining: string;
  muted: boolean;
  isNight?: boolean;
}

export const INITIAL_PRAYERS: PrayerTimeItem[] = [
  { id: 'Fajr', name: 'Fajr', time: '4:44 AM', remaining: '1 hr & 33 min', muted: false, isNight: false },
  { id: 'Duhur', name: 'Duhur', time: '12:45 PM', remaining: '3 hr & 12 min', muted: false, isNight: false },
  { id: 'Asr', name: 'Asr', time: '3:40 PM', remaining: '2 hr & 55 min', muted: true, isNight: false },
  { id: 'Maghrib', name: 'Maghrib', time: '6:35 PM', remaining: '1 hr & 45 min', muted: false, isNight: false },
  { id: 'Isha', name: 'Isha', time: '8:15 PM', remaining: '1 hr & 33 min', muted: false, isNight: true },
];

export interface AllPrayerDayRow {
  date: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  active?: boolean;
}

export const ALL_PRAYER_DAYS: AllPrayerDayRow[] = [
  { date: '01 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '02 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '03 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '04 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '05 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM', active: true },
  { date: '06 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '07 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '08 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '09 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '10Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '11 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
  { date: '12 Sept', fajr: '04:38 AM', zuhr: '12:18 PM', asr: '03:47 PM', maghrib: '06:37 PM', isha: '08:07 PM' },
];

export interface CalendarDayRow {
  hijri: string;
  gregorian: string;
  day: string;
  active?: boolean;
}

export const CALENDAR_DAYS: CalendarDayRow[] = [
  { hijri: '01 Safar', gregorian: '01 September', day: 'Sun' },
  { hijri: '02 Safar', gregorian: '02 September', day: 'Mon' },
  { hijri: '03 Safar', gregorian: '03 September', day: 'Tue' },
  { hijri: '04 Safar', gregorian: '04 September', day: 'Wed' },
  { hijri: '05 Safar', gregorian: '05 September', day: 'Thu', active: true },
  { hijri: '06 Safar', gregorian: '06 September', day: 'Fri' },
  { hijri: '07 Safar', gregorian: '07 September', day: 'Sat' },
  { hijri: '08 Safar', gregorian: '08 September', day: 'Sun' },
  { hijri: '09 Safar', gregorian: '09 September', day: 'Mon' },
  { hijri: '10 Safar', gregorian: '10 September', day: 'Tue' },
];

export interface DuaCardItem {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  bookmarked: boolean;
}

export const INITIAL_DUAS: DuaCardItem[] = [
  {
    id: 'dua-1',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّآ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
    transliteration: 'Rabbana taqabbal minna\ninnaka antas samee ul aleem',
    translation: 'O our Lord ! accept (this service) from us,\nverily You and You (alone) are the\nHearer, the Knower',
    reference: 'Surah Al-Fatihah 1:5',
    bookmarked: false,
  },
  {
    id: 'dua-2',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّآ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
    transliteration: 'Rabbana taqabbal minna\ninnaka antas samee ul aleem',
    translation: 'O our Lord ! accept (this service) from us,\nverily You and You (alone) are the\nHearer, the Knower',
    reference: 'Surah Al-Fatihah 1:5',
    bookmarked: false,
  },
  {
    id: 'dua-3',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan\nwa fil-akhirati hasanatan waqina adhaban-nar',
    translation: 'Our Lord! Grant us good in this world\nand good in the Hereafter, and protect us\nfrom the torment of the Fire',
    reference: 'Surah Al-Baqarah 2:201',
    bookmarked: true,
  },
];

export interface PrayerGuideTopic {
  id: number;
  title: string;
  shortTitle: string;
  cards: DuaCardItem[];
}

export const PRAYER_GUIDE_TOPICS: PrayerGuideTopic[] = [
  {
    id: 1,
    title: '1. Importance of Salah',
    shortTitle: 'Importance of Salah',
    cards: [
      {
        id: 'pg-1-1',
        arabic: 'رَبَّنَا تَقَبَّلْ مِنَّآ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
        transliteration: 'Rabbana taqabbal minna\ninnaka antas samee ul aleem',
        translation: 'O our Lord ! accept (this service) from us,\nverily You and You (alone) are the\nHearer, the Knower',
        reference: 'Surah Al-Fatihah 1:5',
        bookmarked: false,
      },
      {
        id: 'pg-1-2',
        arabic: 'رَبَّنَا تَقَبَّلْ مِنَّآ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
        transliteration: 'Rabbana taqabbal minna\ninnaka antas samee ul aleem',
        translation: 'O our Lord ! accept (this service) from us,\nverily You and You (alone) are the\nHearer, the Knower',
        reference: 'Surah Al-Fatihah 1:5',
        bookmarked: false,
      },
    ],
  },
  {
    id: 2,
    title: '2. How to get more reward from Salah?',
    shortTitle: 'More Reward from Salah',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 3,
    title: "3. Number of Raka'h in Salah",
    shortTitle: "Number of Raka'h in Salah",
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 4,
    title: '4. Conditions of Salah',
    shortTitle: 'Conditions of Salah',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 5,
    title: '5. Anything that can disturb your Salah',
    shortTitle: 'Disturbances in Salah',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 6,
    title: '6. Qiyaam',
    shortTitle: 'Qiyaam',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 7,
    title: '7. Looking at the place of Sajdah',
    shortTitle: 'Looking at the place of Sajdah',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 8,
    title: '8. Takbeer-at-Tehreemah',
    shortTitle: 'Takbeer-at-Tehreemah',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 9,
    title: '9. Rafa-ul-yadain | Raising hands',
    shortTitle: 'Rafa-ul-yadain | Raising hands',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 10,
    title: '10. Right hand on the left',
    shortTitle: 'Right hand on the left',
    cards: INITIAL_DUAS.slice(0, 2),
  },
  {
    id: 11,
    title: '11. The Opening Dua',
    shortTitle: 'The Opening Dua',
    cards: INITIAL_DUAS.slice(0, 2),
  },
];

export const FINANCIAL_TIERS = [
  { usd: '$1.00', aed: '(AED 3.92)' },
  { usd: '$2.00', aed: '(AED 7.34' },
  { usd: '$3.00', aed: '(AED 11.02)' },
  { usd: '$5.00', aed: '(AED 11.02)' },
  { usd: '$7.00', aed: '(25.70)' },
  { usd: '$10.00', aed: '(AED 36.72)' },
  { usd: '$15.00', aed: '(AED 55.03)' },
  { usd: '$20.00', aed: '(AED 73.41)' },
  { usd: '$30.00', aed: '(AED 110.02)' },
];
