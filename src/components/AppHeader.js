import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, INSTAGRAM_URL } from '../theme';

export const APP_HEADER_HEIGHT = 84;

export default function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.brandBlock}>
        <Image
          source={require('../assets/images/Taravee-logo.png')}
          style={styles.brandLogo}
          resizeMode="contain"
          accessibilityLabel="Taravée"
        />
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
  brandLogo: {
    width: 168,
    height: 86,
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
