import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import {
  HeaderHexSettingsIcon,
  HeaderMenuIcon,
  MandalaCornerWatermark,
} from './SvgIcons';
import { DuaCardItem } from '../data/mockData';

interface AppHeaderProps {
  title: string;
  rightMode?: 'settingsAndMenu' | 'bookmark';
  bookmarkActive?: boolean;
  onBookmarkPress?: () => void;
  onSettingsPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  rightMode = 'settingsAndMenu',
  bookmarkActive = false,
  onBookmarkPress,
  onSettingsPress,
}) => {
  const { goBack, navigate } = useApp();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerLeft} onPress={goBack} activeOpacity={0.7}>
        <Feather name="chevron-left" size={24} color="#FFFFFF" />
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>

      {rightMode === 'settingsAndMenu' ? (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onSettingsPress ? onSettingsPress : () => navigate('Settings')}
            activeOpacity={0.7}
          >
            <HeaderHexSettingsIcon size={23} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigate('Menu')}
            activeOpacity={0.7}
          >
            <HeaderMenuIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onBookmarkPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={bookmarkActive ? 'bookmark' : 'bookmark-outline'}
            size={23}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const CustomToggle: React.FC<{
  value: boolean;
  onValueChange: (val: boolean) => void;
}> = ({ value, onValueChange }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onValueChange(!value)}
    style={[styles.toggleTrack, value && styles.toggleTrackActive]}
  >
    <View style={[styles.toggleThumb, value ? styles.toggleThumbOn : styles.toggleThumbOff]} />
  </TouchableOpacity>
);

export const CustomCheckbox: React.FC<{
  checked: boolean;
  onPress: () => void;
}> = ({ checked, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}
  >
    {checked && <Feather name="check" size={16} color={Colors.primary} />}
  </TouchableOpacity>
);

export const DuaContentCard: React.FC<{
  item: DuaCardItem;
  onToggleBookmark: (id: string) => void;
}> = ({ item, onToggleBookmark }) => (
  <View style={styles.duaCardWrapper}>
    {/* Floating Top Bookmark Circle */}
    <TouchableOpacity
      style={styles.floatingBookmarkBtn}
      activeOpacity={0.8}
      onPress={() => onToggleBookmark(item.id)}
    >
      <Ionicons
        name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
        size={20}
        color={Colors.primaryDark}
      />
    </TouchableOpacity>

    <View style={styles.duaCard}>
      <View style={styles.watermarkTopRight}>
        <MandalaCornerWatermark size={95} />
      </View>
      <View style={styles.watermarkBottomLeft}>
        <MandalaCornerWatermark size={95} />
      </View>

      <Text style={styles.arabicText}>{item.arabic}</Text>
      <Text style={styles.transliterationText}>{item.transliteration}</Text>

      <View style={styles.divider} />

      <Text style={styles.translationText}>{item.translation}</Text>

      <View style={styles.divider} />

      <Text style={styles.referenceText}>{item.reference}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: 'transparent',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBtn: {
    padding: 4,
  },
  toggleTrack: {
    width: 54,
    height: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CBE4E4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackActive: {
    borderColor: '#CBE4E4',
    backgroundColor: '#FFFFFF',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  toggleThumbOff: {
    alignSelf: 'flex-start',
    backgroundColor: '#D9EEEE',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  checkboxBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#CBE4E4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    borderColor: '#BCE2E0',
    backgroundColor: '#F5FCFC',
  },
  duaCardWrapper: {
    marginTop: 22,
    marginBottom: 8,
    alignItems: 'center',
  },
  floatingBookmarkBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: Colors.mintBg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    marginBottom: -22,
  },
  duaCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingTop: 34,
    paddingBottom: 22,
    paddingHorizontal: 22,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#0E4A4A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  watermarkTopRight: {
    position: 'absolute',
    right: -25,
    top: 25,
  },
  watermarkBottomLeft: {
    position: 'absolute',
    left: -20,
    bottom: -25,
  },
  arabicText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#191D1E',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 10,
  },
  transliterationText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#252B2C',
    textAlign: 'center',
    lineHeight: 23,
  },
  divider: {
    width: '58%',
    height: 1,
    backgroundColor: '#F1F6F6',
    marginVertical: 15,
  },
  translationText: {
    fontSize: 13.5,
    color: '#303738',
    textAlign: 'center',
    lineHeight: 21,
  },
  referenceText: {
    fontSize: 12.5,
    color: '#2B3233',
    textAlign: 'center',
    fontWeight: '500',
  },
});
