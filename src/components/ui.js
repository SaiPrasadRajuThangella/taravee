import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fonts } from '../theme';

export function GoldButton({ title, onPress, outline = false, icon, style, disabled }) {
  const flatStyle = StyleSheet.flatten(style) || {};
  const isFullWidth =
    flatStyle.alignSelf === 'stretch' || flatStyle.width === '100%' || flatStyle.flex === 1;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        outline ? styles.btnOutline : styles.btnFilled,
        isFullWidth && styles.btnFull,
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <View style={styles.btnContent}>
        {icon ? (
          <Ionicons
            name={icon}
            size={16}
            color={outline ? colors.gold : '#FFFFFF'}
            style={styles.btnIcon}
          />
        ) : null}
        <Text
          style={[styles.btnText, { color: outline ? colors.gold : '#FFFFFF' }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export function Loader({ label }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.gold} size="large" />
      {label ? <Text style={styles.muted}>{label}</Text> : null}
    </View>
  );
}

export function ErrorRetry({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={40} color={colors.muted} />
      <Text style={[styles.muted, { marginVertical: 10, textAlign: 'center' }]}>
        {message || 'Something went wrong.'}
      </Text>
      {onRetry ? <GoldButton title="Try Again" outline icon="refresh" onPress={onRetry} /> : null}
    </View>
  );
}

export function OfflineBanner() {
  return (
    <View style={styles.offline}>
      <Ionicons name="wifi-outline" size={14} color="#000" />
      <Text style={styles.offlineText}>You're offline — showing what we have</Text>
    </View>
  );
}

export function SectionHeading({ eyebrow, title, light = true }) {
  return (
    <View style={{ marginBottom: 16 }}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text> : null}
      <Text style={[styles.heading, { color: light ? colors.gold : colors.text }]}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
}

export function Badge({ label, filled }) {
  return (
    <View style={[styles.badge, filled ? styles.badgeFilled : styles.badgeOutline]}>
      <Text style={[styles.badgeText, { color: filled ? '#000' : colors.gold }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.button,
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  btnFull: {
    alignSelf: 'stretch',
    width: '100%',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  btnIcon: { marginRight: 8, flexShrink: 0 },
  btnFilled: { backgroundColor: colors.gold },
  btnOutline: { borderWidth: 1.5, borderColor: colors.gold },
  btnText: {
    fontFamily: fonts.bold,
    letterSpacing: 0.3,
    fontSize: 13,
    textTransform: 'uppercase',
    flexShrink: 1,
    textAlign: 'center',
    includeFontPadding: false,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  muted: { color: colors.muted, marginTop: 8, fontFamily: fonts.light },
  offline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.gold,
    paddingVertical: 6,
  },
  offlineText: { color: '#000', fontSize: 12, fontFamily: fonts.semiBold },
  eyebrow: { color: colors.gold, fontSize: 11, letterSpacing: 3, fontFamily: fonts.bold, marginBottom: 6 },
  heading: { fontFamily: fonts.headingBold, fontSize: 26 },
  divider: { width: 48, height: 2, backgroundColor: colors.gold, marginTop: 10, borderRadius: 2 },
  badge: { borderRadius: radius.button, paddingHorizontal: 10, paddingVertical: 4 },
  badgeFilled: { backgroundColor: colors.gold },
  badgeOutline: { borderWidth: 1, borderColor: colors.border },
  badgeText: { fontSize: 11, fontFamily: fonts.semiBold },
});
