import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, INSTAGRAM_URL } from '../theme';
import { GoldButton, SectionHeading } from '../components/ui';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.logo}>Taravée</Text>
      <Text style={styles.tagline}>Once Loved. Forever Elegant.</Text>

      <View style={styles.block}>
        <SectionHeading eyebrow="Our Story" title="Pre-Loved, Perfectly Elegant" />
        <Text style={styles.body}>
          Taravee Studio is India's premium destination for authenticated pre-loved designer fashion.
          We give beautiful designer pieces a second story — verified, honest and adored.
        </Text>
      </View>

      <View style={styles.block}>
        <SectionHeading eyebrow="For Sellers" title="Turn Your Closet Into Cash" />
        <Text style={styles.body}>
          Share photos of your designer piece — we verify it, list it beautifully and find the right
          buyer. You're never charged. Ever.
        </Text>
      </View>

      <View style={styles.block}>
        <SectionHeading eyebrow="For Buyers" title="Designer Dreams, Smarter Prices" />
        <Text style={styles.body}>
          Every piece is personally authenticated before it goes live. Request a price and our team
          replies on Instagram with all the details within 24 hours.
        </Text>
      </View>

      <View style={styles.block}>
        <SectionHeading eyebrow="Our Promise" title="Fashion That Gives Back 🌿" />
        <Text style={styles.body}>
          Every pre-loved piece you sell or buy gives a designer outfit a second life — and the planet
          a better future. Sustainable luxury starts here.
        </Text>
      </View>

      <GoldButton title="Follow @taravee.studio" icon="logo-instagram" onPress={() => Linking.openURL(INSTAGRAM_URL)} style={styles.followBtn} />

      <Text style={styles.version}>Taravee Studio · v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { padding: 20, paddingBottom: 110 },
  logo: { fontFamily: fonts.headingBold, fontSize: 44, color: colors.gold, textAlign: 'center' },
  tagline: { color: colors.goldLight, fontFamily: fonts.light, fontStyle: 'italic', textAlign: 'center', letterSpacing: 2, marginTop: 6 },
  block: { marginTop: 28 },
  body: { color: colors.text, fontFamily: fonts.body, lineHeight: 23 },
  followBtn: { marginTop: 14, alignSelf: 'stretch', width: '100%' },
  version: { color: colors.muted, fontFamily: fonts.light, textAlign: 'center', marginTop: 30, marginBottom: 16, fontSize: 12 },
});
