import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, INSTAGRAM_URL } from '../theme';

export const APP_HEADER_HEIGHT = 84;

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.brandBlock}>
        <Text style={styles.logo}>Taravée</Text>
        <View style={styles.taglineBlock}>
          <Text style={styles.tagline}>ONCE LOVED · FOREVER ELEGANT</Text>
          <View style={styles.taglineRule} />
        </View>
      </View>
      <Pressable
        style={styles.igBtn}
        onPress={() => Linking.openURL(INSTAGRAM_URL)}
        hitSlop={8}
        accessibilityLabel="Open Instagram"
      >
        <Ionicons name="logo-instagram" size={18} color={colors.goldDeep} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: APP_HEADER_HEIGHT,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  brandBlock: { alignItems: 'center' },
  logo: {
    fontFamily: fonts.headingBold,
    fontSize: 44,
    color: colors.goldGradientStart,
    lineHeight: 48,
  },
  taglineBlock: {
    alignItems: 'center',
    marginTop: 2,
  },
  tagline: {
    fontFamily: fonts.displayMedium,
    fontSize: 9,
    letterSpacing: 3,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  taglineRule: {
    width: 52,
    height: 1,
    marginTop: 4,
    backgroundColor: colors.gold,
    opacity: 0.75,
    borderRadius: 1,
  },
  igBtn: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.ivory,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
