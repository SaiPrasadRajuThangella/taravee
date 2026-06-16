import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow, INSTAGRAM_URL } from '../theme';
import { GoldButton } from '../components/ui';

const SECTIONS = [
  {
    eyebrow: 'Our Story',
    title: 'Pre-Loved,\nPerfectly Elegant',
    body:
      "Taravee Studio is India's premium destination for authenticated pre-loved designer fashion. We give beautiful designer pieces a second story — verified, honest and adored.",
    icon: 'heart-outline',
  },
  {
    eyebrow: 'For Sellers',
    title: 'Turn Your Closet\nInto Cash',
    body:
      "Share photos of your designer piece — we verify it, list it beautifully and find the right buyer. You're never charged. Ever.",
    icon: 'shield-checkmark-outline',
  },
  {
    eyebrow: 'For Buyers',
    title: 'Designer Dreams,\nSmarter Prices',
    body:
      'Every piece is personally authenticated before it goes live. Request a price and our team replies on Instagram with all the details within 24 hours.',
    icon: 'heart-outline',
  },
  {
    eyebrow: 'Our Promise',
    title: 'Fashion That Gives\nBack 🌿',
    body:
      'Every pre-loved piece you sell or buy gives a designer outfit a second life — and the planet a better future. Sustainable luxury starts here.',
    icon: 'leaf-outline',
  },
];

const cinzelBtn = { fontFamily: fonts.display, letterSpacing: 1.5 };

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>

      {SECTIONS.map((section) => (
        <View key={section.eyebrow} style={[styles.card, shadow.card]}>
          <View style={styles.cardIcon}>
            <Ionicons name={section.icon} size={18} color={colors.goldDeep} />
          </View>
          <Text style={styles.eyebrow}>{section.eyebrow.toUpperCase()}</Text>
          <Text style={styles.title}>{section.title}</Text>
          <View style={styles.rule} />
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}

      <View style={styles.brandBlock}>
        <Image
          source={require('../assets/images/Taravee-logo.png')}
          style={styles.brandLogoImage}
          resizeMode="contain"
        />
      </View>
      <GoldButton
        title="Follow @taravee.studio"
        icon="logo-instagram"
        labelStyle={cinzelBtn}
        onPress={() => Linking.openURL(INSTAGRAM_URL)}
        style={styles.followBtn}
      />

      <Text style={styles.version}>TARAVÉE STUDIO · V1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120, gap: 16 },

  brandBlock: { alignItems: 'center', marginBottom: 8 },
  brandLogoImage: {
    width: 200,
    height: 88,
  },
  brandLogo: {
    fontFamily: fonts.headingBold,
    fontSize: 56,
    color: colors.gold,
    lineHeight: 56,
  },
  brandTagline: {
    marginTop: 2,
    fontFamily: fonts.display,
    color: colors.goldDeep,
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  brandRule: {
    width: 130,
    height: 1,
    marginTop: 12,
    backgroundColor: colors.gold,
    opacity: 0.65,
  },

  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.22)',
    backgroundColor: colors.ivory,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  cardIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(201,168,76,0.15)',
  },
  eyebrow: {
    fontFamily: fonts.display,
    fontSize: 11,
    letterSpacing: 5,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    marginRight: 46,
    fontFamily: fonts.headingBold,
    fontSize: 40,
    lineHeight: 40,
    color: colors.gold,
  },
  rule: {
    width: 72,
    height: 1,
    marginTop: 8,
    backgroundColor: colors.gold,
    opacity: 0.7,
  },
  body: {
    marginTop: 16,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 24,
  },

  followBtn: { marginTop: 26, alignSelf: 'stretch', width: '100%' },
  version: {
    color: colors.goldDeep,
    fontFamily: fonts.display,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
});
