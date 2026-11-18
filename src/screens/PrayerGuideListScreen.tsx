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
import { AppHeader } from '../components/CommonUI';
import { MandalaCornerWatermark } from '../components/SvgIcons';
import { PRAYER_GUIDE_TOPICS } from '../data/mockData';
import { Colors } from '../theme/colors';

export const PrayerGuideListScreen: React.FC = () => {
  const { navigate, setSelectedGuideTopicId } = useApp();

  const handleOpenTopic = (id: number) => {
    setSelectedGuideTopicId(id);
    navigate('PrayerGuideDetail');
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Prayer Guide" rightMode="bookmark" />

      <View style={styles.bodySheet}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingTop: 22,
            paddingBottom: 92,
          }}
          showsVerticalScrollIndicator={false}
        >
          {PRAYER_GUIDE_TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              activeOpacity={0.85}
              onPress={() => handleOpenTopic(topic.id)}
            >
              <View style={styles.topicWatermark}>
                <MandalaCornerWatermark size={76} />
              </View>
              <Text style={styles.topicTitle}>{topic.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Sticky Get Start now > Bar */}
        <TouchableOpacity
          style={styles.bottomStartBar}
          activeOpacity={0.9}
          onPress={() => handleOpenTopic(1)}
        >
          <Text style={styles.bottomStartText}>Get Start now</Text>
          <Feather name="chevron-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },
  topicWatermark: {
    position: 'absolute',
    right: 65,
    bottom: -36,
  },
  topicTitle: {
    fontSize: 15.5,
    fontWeight: '500',
    color: '#0D4346',
  },
  bottomStartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bottomStartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
