import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { AppHeader, DuaContentCard } from '../components/CommonUI';
import { Colors } from '../theme/colors';

export const PrayerDuasScreen: React.FC = () => {
  const { duas, toggleDuaBookmark } = useApp();
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  const visibleDuas = filterBookmarked
    ? duas.filter((d) => d.bookmarked)
    : duas;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Prayer Duas"
        rightMode="bookmark"
        bookmarkActive={filterBookmarked}
        onBookmarkPress={() => setFilterBookmarked(!filterBookmarked)}
      />

      <ScrollView
        style={styles.bodySheet}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10, paddingBottom: 38 }}
        showsVerticalScrollIndicator={false}
      >
        {(visibleDuas.length > 0 ? visibleDuas : duas).map((item) => (
          <DuaContentCard
            key={item.id}
            item={item}
            onToggleBookmark={toggleDuaBookmark}
          />
        ))}
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
});
