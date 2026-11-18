import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Path, Polygon, Rect } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/CommonUI';
import { KaabaIcon, MandalaCornerWatermark } from '../components/SvgIcons';

export const QiblaScreen: React.FC = () => {
  const { qiblaThemeIndex, setQiblaThemeIndex, qiblaAngle, setQiblaAngle } =
    useApp();

  const handleRotateCompass = () => {
    setQiblaAngle((qiblaAngle + 15) % 360);
  };

  return (
    <LinearGradient
      colors={['#20A89E', '#3DB39C', '#56BF9C']}
      style={styles.container}
    >
      {/* Subtle Top & Bottom Mandala Ornaments */}
      <View style={styles.topMandala} pointerEvents="none">
        <MandalaCornerWatermark size={260} color="rgba(255,255,255,0.08)" />
      </View>
      <View style={styles.bottomMandala} pointerEvents="none">
        <MandalaCornerWatermark size={260} color="rgba(255,255,255,0.08)" />
      </View>

      <AppHeader title="Qibla" />

      {/* Center Compass Area */}
      <View style={styles.compassWrapper}>
        {/* Top Direction Pointer Triangle */}
        <View style={styles.topPointer}>
          <Svg width={36} height={36} viewBox="0 0 36 36">
            <Path
              d="M18 4L30 28L18 23L6 28L18 4Z"
              fill="#0A4E46"
              stroke="#0A4E46"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleRotateCompass}
          style={[
            styles.outerCompassCircle,
            { transform: [{ rotate: `${qiblaAngle}deg` }] },
          ]}
        >
          <View style={styles.midCompassCircle}>
            {/* Top, Bottom, Left, Right Tick Lines */}
            <View style={styles.tickTop} />
            <View style={styles.tickBottom} />
            <View style={styles.tickLeft} />
            <View style={styles.tickRight} />

            <View style={styles.innerCompassCircle}>
              {/* Cardinal Letters (W on top, E on bottom, N on left, S on right like Qibla.png) */}
              <Text style={[styles.cardinalText, styles.cardinalTop]}>W</Text>
              <Text style={[styles.cardinalText, styles.cardinalBottom]}>E</Text>
              <Text style={[styles.cardinalText, styles.cardinalLeft]}>N</Text>
              <Text style={[styles.cardinalText, styles.cardinalRight]}>S</Text>

              {/* Center Kaaba */}
              <KaabaIcon size={76} color="#0A594E" />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.facingText}>
          <Text style={styles.facingMuted}>You’re facing </Text>
          <Text style={styles.facingBold}>Makkah</Text>
        </Text>
      </View>

      {/* Bottom 3 Compass Style Thumbnails Bar */}
      <View style={styles.bottomSelectorBar}>
        {[0, 1, 2].map((idx) => {
          const active = qiblaThemeIndex === idx;
          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.85}
              onPress={() => setQiblaThemeIndex(idx)}
              style={[
                styles.thumbCircle,
                active && styles.thumbCircleActive,
              ]}
            >
              {idx < 2 ? (
                <Svg width={56} height={56} viewBox="0 0 56 56">
                  <Circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="rgba(255,255,255,0.22)"
                  />
                  <Circle
                    cx="28"
                    cy="28"
                    r="16"
                    fill="rgba(255,255,255,0.35)"
                  />
                  <Polygon points="28,20 33,32 28,29 23,32" fill="#0B5148" />
                </Svg>
              ) : (
                <Svg width={44} height={54} viewBox="0 0 44 54">
                  <Rect
                    x="8"
                    y="8"
                    width="28"
                    height="38"
                    rx="3"
                    stroke="#0A594E"
                    strokeWidth="2"
                    fill="rgba(255,255,255,0.45)"
                  />
                  <Path
                    d="M13 38V22C13 17 22 14 22 14C22 14 31 17 31 22V38"
                    stroke="#0A594E"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </Svg>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topMandala: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
  },
  bottomMandala: {
    position: 'absolute',
    bottom: -70,
    alignSelf: 'center',
  },
  compassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  topPointer: {
    marginBottom: -12,
    zIndex: 10,
  },
  outerCompassCircle: {
    width: 276,
    height: 276,
    borderRadius: 138,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midCompassCircle: {
    width: 222,
    height: 222,
    borderRadius: 111,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tickTop: {
    position: 'absolute',
    top: 10,
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  tickBottom: {
    position: 'absolute',
    bottom: 10,
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  tickLeft: {
    position: 'absolute',
    left: 10,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  tickRight: {
    position: 'absolute',
    right: 10,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  innerCompassCircle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardinalText: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(13, 77, 69, 0.45)',
  },
  cardinalTop: { top: 10 },
  cardinalBottom: { bottom: 10 },
  cardinalLeft: { left: 12 },
  cardinalRight: { right: 12 },
  facingText: {
    fontSize: 20,
    marginTop: 26,
  },
  facingMuted: {
    color: 'rgba(16, 61, 56, 0.65)',
    fontWeight: '500',
  },
  facingBold: {
    color: '#172E2B',
    fontWeight: '700',
  },
  bottomSelectorBar: {
    marginHorizontal: 46,
    marginBottom: 16,
    backgroundColor: 'rgba(18, 128, 114, 0.32)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  thumbCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCircleActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
});
