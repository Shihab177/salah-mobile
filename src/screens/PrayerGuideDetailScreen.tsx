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
import { AppHeader, DuaContentCard } from '../components/CommonUI';
import { PRAYER_GUIDE_TOPICS } from '../data/mockData';
import { Colors } from '../theme/colors';

export const PrayerGuideDetailScreen: React.FC = () => {
  const {
    selectedGuideTopicId,
    setSelectedGuideTopicId,
    duas,
    toggleDuaBookmark,
  } = useApp();

  const currentIndex = PRAYER_GUIDE_TOPICS.findIndex(
    (t) => t.id === selectedGuideTopicId
  );
  const currentTopic =
    PRAYER_GUIDE_TOPICS[currentIndex >= 0 ? currentIndex : 0];
  const nextTopic =
    PRAYER_GUIDE_TOPICS[(currentIndex + 1) % PRAYER_GUIDE_TOPICS.length];

  const handlePrev = () => {
    const prevIdx =
      currentIndex <= 0 ? PRAYER_GUIDE_TOPICS.length - 1 : currentIndex - 1;
    setSelectedGuideTopicId(PRAYER_GUIDE_TOPICS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PRAYER_GUIDE_TOPICS.length;
    setSelectedGuideTopicId(PRAYER_GUIDE_TOPICS[nextIdx].id);
  };

  return (
    <View style={styles.container}>
      <AppHeader title={currentTopic.shortTitle} rightMode="bookmark" />

      <View style={styles.bodySheet}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingTop: 10,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {duas.slice(0, 2).map((item) => (
            <DuaContentCard
              key={item.id}
              item={item}
              onToggleBookmark={toggleDuaBookmark}
            />
          ))}
        </ScrollView>

        {/* Bottom Navigation Bar (< 4. Conditions of Salah >) */}
        <View style={styles.bottomNavBar}>
          <TouchableOpacity
            style={styles.navCircleBtn}
            activeOpacity={0.8}
            onPress={handlePrev}
          >
            <Feather name="chevron-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextTitleBtn}
            activeOpacity={0.85}
            onPress={handleNext}
          >
            <Text style={styles.nextTitleText} numberOfLines={1}>
              {currentTopic.id === 1 ? '4. Conditions of Salah' : nextTopic.title}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navCircleBtn}
            activeOpacity={0.8}
            onPress={handleNext}
          >
            <Feather name="chevron-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
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
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextTitleBtn: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 14,
  },
  nextTitleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
