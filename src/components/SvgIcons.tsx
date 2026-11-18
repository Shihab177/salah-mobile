import React from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient as SvgLinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from 'react-native-svg';

export const PrayingPersonIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 42,
  color = '#FFFFFF',
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Head */}
    <Circle cx="26.5" cy="9.5" r="4.2" fill={color} />
    {/* Torso & Kneeling Body */}
    <Path
      d="M17 18C17 15.2 19.5 13.5 22 14.5L26 21.5L32.5 25.5C33.5 26.2 33.2 27.8 32 27.8H24.5L21.5 22.5L20.5 31H30C31.5 31 32.5 32.2 32.5 33.5C32.5 34.8 31.5 35.8 30 35.8H15.5C14.2 35.8 13.5 34.8 14 33.5L17 18Z"
      fill={color}
    />
    {/* Prayer Mat Line */}
    <Line x1="10" y1="38.5" x2="39" y2="38.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

export const PrayingPersonOutlineIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = '#10494C',
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="26.5" cy="10" r="3.6" stroke={color} strokeWidth="2.2" />
    <Path
      d="M17.5 18.5C17.5 15.8 19.8 14.2 22 15.2L25.5 21.5L31.5 25.5C32.5 26.2 32.2 27.8 31 27.8H24L21.5 23L20.5 31H29.5C31 31 32 32 32 33.2C32 34.5 31 35.5 29.5 35.5H15.5C14.2 35.5 13.5 34.5 14 33.2L17.5 18.5Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <Line x1="10" y1="38.5" x2="38" y2="38.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const KaabaIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 38,
  color = '#1B8D8B',
}) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* 3D Isometric Cube for Kaaba */}
    <Polygon
      points="32,8 54,20 54,44 32,56 10,44 10,20"
      stroke={color}
      strokeWidth="2.4"
      strokeLinejoin="round"
      fill="rgba(27, 141, 139, 0.06)"
    />
    <PolylinePath d="M10 20L32 32L54 20" stroke={color} strokeWidth={2.4} />
    <Line x1="32" y1="32" x2="32" y2="56" stroke={color} strokeWidth="2.4" />
    {/* Kiswah Decorative Band */}
    <Path d="M10 27L32 39L54 27" stroke={color} strokeWidth="2.2" />
    <Path d="M10 32L32 44L54 32" stroke={color} strokeWidth="1.6" strokeDasharray="3 2" />
    {/* Kaaba Door on Right Face */}
    <Path d="M40 40L46 36.8V47L40 50.2V40Z" stroke={color} strokeWidth="2" />
  </Svg>
);

const PolylinePath: React.FC<{ d: string; stroke: string; strokeWidth: number }> = ({
  d,
  stroke,
  strokeWidth,
}) => <Path d={d} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />;

export const DuaHandsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = '#1B8D8B',
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="10" r="3.5" stroke={color} strokeWidth="2" />
    <Path
      d="M16 24C16 19 19 16 23 17L27 22L33 17.5C34.2 16.8 35.5 18 34.5 19.5L28.5 26.5L24 25L22 33H29C30.5 33 31.5 34.2 31.5 35.5C31.5 36.8 30.5 38 29 38H15C13.8 38 13 36.8 13.5 35.5L16 24Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const WaduHandsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = '#1B8D8B',
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Tap & Water drops */}
    <Path d="M12 10H24V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M21 19C21 21 19.5 22 19.5 22C19.5 22 18 21 18 19C18 17.5 19.5 16 19.5 16C19.5 16 21 17.5 21 19Z" stroke={color} strokeWidth="1.6" />
    <Path d="M28 20C28 22 26.5 23 26.5 23C26.5 23 25 22 25 20C25 18.5 26.5 17 26.5 17C26.5 17 28 18.5 28 20Z" stroke={color} strokeWidth="1.6" />
    {/* Cupped Hands */}
    <Path
      d="M11 29C14 26 20 27 24 30C28 27 34 26 37 29C39 31 37 36 32 38H16C11 36 9 31 11 29Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TasbihBeadsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 36,
  color = '#1B8D8B',
}) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Tassel at top */}
    <Path d="M24 6C26 6 27 8 25 11L24 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    {/* Bead loop */}
    <Path
      d="M24 14C17 19 14 27 16 33C17.5 37.5 21 40 24 40C27 40 30.5 37.5 32 33C34 27 31 19 24 14Z"
      stroke={color}
      strokeWidth="2.4"
      strokeDasharray="2.5 3.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const HeaderHexSettingsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#FFFFFF',
}) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Polygon
      points="14,2.5 24,8.2 24,19.8 14,25.5 4,19.8 4,8.2"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Circle cx="14" cy="14" r="4.5" stroke={color} strokeWidth="2" />
  </Svg>
);

export const HeaderMenuIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#FFFFFF',
}) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Line x1="11" y1="7" x2="24" y2="7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Line x1="4" y1="14" x2="24" y2="14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <Line x1="14" y1="21" x2="24" y2="21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

export const CongregationPrayingIllustration: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <Svg width={size} height={size} viewBox="0 0 160 150" fill="none">
    {/* Ground Line */}
    <Line x1="16" y1="136" x2="144" y2="136" stroke="#22A69E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Person 1 (Left Back) */}
    <Circle cx="44" cy="48" r="10" stroke="#22A69E" strokeWidth="2.2" />
    <Path d="M35 42L53 46" stroke="#22A69E" strokeWidth="2" />
    <Path
      d="M30 62C30 57 35 55 40 57L48 72L38 80H30V136H52V84"
      stroke="#22A69E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Person 2 (Middle) */}
    <Circle cx="68" cy="44" r="10.5" stroke="#22A69E" strokeWidth="2.2" />
    <Path d="M59 38L77 42" stroke="#22A69E" strokeWidth="2" />
    <Path
      d="M54 59C54 54 59 52 64 54L73 70L62 78H54V136H76V82"
      stroke="#22A69E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Imam (Right Front) */}
    <Circle cx="104" cy="34" r="12" stroke="#22A69E" strokeWidth="2.4" />
    <Path d="M94 27L115 32" stroke="#22A69E" strokeWidth="2.2" />
    <Path
      d="M88 52C88 46 95 44 102 47L114 66L98 76H88L85 136H116L113 78"
      stroke="#22A69E"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <Line x1="94" y1="120" x2="94" y2="136" stroke="#22A69E" strokeWidth="2" />
    <Line x1="106" y1="124" x2="106" y2="136" stroke="#22A69E" strokeWidth="2" />
  </Svg>
);

export const WifiOffIllustration: React.FC<{ size?: number }> = ({ size = 84 }) => (
  <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
    <Path
      d="M14 38C32 22 64 22 82 38"
      stroke="#23A69E"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Path
      d="M26 52C38 41 58 41 70 52"
      stroke="#23A69E"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Path
      d="M38 65C44 60 52 60 58 65"
      stroke="#23A69E"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Circle cx="48" cy="77" r="4.5" fill="#23A69E" />
    <Line x1="22" y1="18" x2="74" y2="78" stroke="#23A69E" strokeWidth="6" strokeLinecap="round" />
  </Svg>
);

export const SplashMosqueIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 380,
  height = 330,
}) => (
  <Svg width={width} height={height} viewBox="0 0 380 330" fill="none">
    <Defs>
      <SvgLinearGradient id="pinkDome" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#FA4E9C" />
        <Stop offset="50%" stopColor="#D61E72" />
        <Stop offset="100%" stopColor="#7C1046" />
      </SvgLinearGradient>
      <SvgLinearGradient id="tealDomeLeft" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#6CE0E6" />
        <Stop offset="60%" stopColor="#35A7B5" />
        <Stop offset="100%" stopColor="#0E515C" />
      </SvgLinearGradient>
      <SvgLinearGradient id="crescentGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#A2E9F7" />
        <Stop offset="100%" stopColor="#26A2DB" />
      </SvgLinearGradient>
      <SvgLinearGradient id="goldBase" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#FFC77D" />
        <Stop offset="100%" stopColor="#894462" />
      </SvgLinearGradient>
    </Defs>

    {/* 4-point Sparkle Stars */}
    <Polygon points="82,55 86,65 96,69 86,73 82,83 78,73 68,69 78,65" fill="#32A8DF" />
    <Polygon points="315,48 318,57 327,60 318,63 315,72 312,63 303,60 312,57" fill="#32A8DF" />
    <Polygon points="98,132 101,139 108,142 101,145 98,152 95,145 88,142 95,139" fill="#32A8DF" />
    <Polygon points="282,126 286,136 296,140 286,144 282,154 278,144 268,140 278,136" fill="#32A8DF" />

    {/* Crescent Moon & 5-Point Star */}
    <Path
      d="M196 42C168 42 146 64 146 91C146 118 168 140 196 140C211 140 225 133 234 122C226 126 217 128 207 128C185 128 167 110 167 88C167 66 185 48 207 48C215 48 222 50 228 54C219 46 208 42 196 42Z"
      fill="url(#crescentGrad)"
    />
    <Polygon
      points="214,62 220,76 235,76 223,85 227,99 214,90 201,99 205,85 193,76 208,76"
      fill="#2BA6DF"
    />

    {/* Left Teal Dome */}
    <Path d="M48 162L52 178H44L48 162Z" fill="#176975" />
    <Path
      d="M48 178C10 202 -20 225 -20 275V330H116V275C116 225 86 202 48 178Z"
      fill="url(#tealDomeLeft)"
    />

    {/* Right Teal Dome */}
    <Path d="M332 162L336 178H328L332 162Z" fill="#176975" />
    <Path
      d="M332 178C294 202 264 225 264 275V330H400V275C400 225 370 202 332 178Z"
      fill="url(#tealDomeLeft)"
    />

    {/* Center Pink Dome Spire */}
    <Path d="M190 138L196 168H184L190 138Z" fill="#8C144E" />
    {/* Center Pink Mosque Dome */}
    <Path
      d="M190 166C125 204 60 236 52 302C50 315 54 330 54 330H326C326 330 330 315 328 302C320 236 255 204 190 166Z"
      fill="url(#pinkDome)"
    />

    {/* Bottom Golden Curves */}
    <Path d="M0 288L128 330H0V288Z" fill="url(#goldBase)" />
    <Path d="M380 288L252 330H380V288Z" fill="url(#goldBase)" />
  </Svg>
);

export const MandalaCornerWatermark: React.FC<{ size?: number; color?: string }> = ({
  size = 90,
  color = 'rgba(35, 166, 158, 0.08)',
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
    <Circle cx="50" cy="50" r="32" stroke={color} strokeWidth="1" />
    <Circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1" />
    <Circle cx="50" cy="50" r="8" stroke={color} strokeWidth="1" />
    <Line x1="50" y1="6" x2="50" y2="94" stroke={color} strokeWidth="0.8" />
    <Line x1="6" y1="50" x2="94" y2="50" stroke={color} strokeWidth="0.8" />
    <Line x1="18" y1="18" x2="82" y2="82" stroke={color} strokeWidth="0.8" />
    <Line x1="82" y1="18" x2="18" y2="82" stroke={color} strokeWidth="0.8" />
  </Svg>
);
