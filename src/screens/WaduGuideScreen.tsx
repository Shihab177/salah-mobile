import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { AppHeader, DuaContentCard } from '../components/CommonUI';
import { Colors } from '../theme/colors';

export const WaduGuideScreen: React.FC = () => {
  const { waduSteps, toggleWaduBookmark } = useApp();
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  const visibleSteps = filterBookmarked
    ? waduSteps.filter((d) => d.bookmarked)
    : waduSteps;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Wadu Guide"
        rightMode="bookmark"
        bookmarkActive={filterBookmarked}
        onBookmarkPress={() => setFilterBookmarked(!filterBookmarked)}
      />

      <ScrollView
        style={styles.bodySheet}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10, paddingBottom: 38 }}
        showsVerticalScrollIndicator={false}
      >
        {(visibleSteps.length > 0 ? visibleSteps : waduSteps)
          .slice(0, 2)
          .map((item) => (
            <DuaContentCard
              key={item.id}
              item={item}
              onToggleBookmark={toggleWaduBookmark}
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
