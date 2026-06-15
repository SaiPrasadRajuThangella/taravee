import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { GoldButton, SectionHeading } from '../components/ui';

const STEPS = [
  { icon: 'camera-outline', title: 'Share Photos & Video', text: 'Click clear photos and a short video of your piece from home.' },
  { icon: 'shield-checkmark-outline', title: 'We Verify Remotely', text: 'Our team reviews everything online. No visits. No one touches your piece.' },
  { icon: 'star-outline', title: 'We List It Beautifully', text: 'Your piece goes live on Taravee Studio — authentic and gorgeous.' },
  { icon: 'heart-outline', title: 'Right Buyer Finds It', text: 'An interested buyer discovers your piece and confirms their purchase.' },
  { icon: 'checkmark-circle-outline', title: 'Zero Cost To You', text: 'We charge only the buyer. Never you. Not before, not during. Ever.' },
];

const ACCEPTED = ['Bridal Lehengas', 'Designer Sarees', 'Sharara & Salwar Sets', 'Western Designer Wear', 'Indo-Western', 'Luxury Accessories'];

export default function SellScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.hero}>Your Designer Piece Deserves A Second Story 🌸</Text>
      <Text style={styles.heroSub}>Zero risk. Zero cost to you. Just share photos — we handle everything.</Text>

      <GoldButton title="Submit Your Piece" icon="add-circle-outline" onPress={() => navigation.navigate('SubmissionForm')} style={styles.ctaBtn} />

      <View style={{ marginTop: 34 }}>
        <SectionHeading eyebrow="The Journey" title="How Selling Works" />
        {STEPS.map((s, i) => (
          <View key={s.title} style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name={s.icon} size={26} color={colors.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepTitle}>{i + 1}. {s.title}</Text>
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 28 }}>
        <SectionHeading eyebrow="What We Accept" title="We Take Quality" />
        <View style={styles.pills}>
          {ACCEPTED.map((a) => (
            <View key={a} style={styles.pill}>
              <Ionicons name="checkmark" size={14} color={colors.gold} />
              <Text style={styles.pillText}>{a}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.quoteBox}>
        <Text style={styles.quote}>If it's designer. If it's quality. If it's been loved once — we take it. 💛</Text>
      </View>

      <GoldButton title="Submit Your Piece" onPress={() => navigation.navigate('SubmissionForm')} style={[styles.ctaBtn, { marginTop: 26 }]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { padding: 18, paddingBottom: 110 },
  ctaBtn: { alignSelf: 'stretch', width: '100%', marginTop: 20 },
  hero: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.gold, lineHeight: 32 },
  heroSub: { color: colors.text, fontFamily: fonts.light, fontStyle: 'italic', marginTop: 10, lineHeight: 22 },
  step: { flexDirection: 'row', gap: 14, marginBottom: 18 },
  stepIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  stepTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  stepText: { color: colors.muted, fontFamily: fonts.light, marginTop: 4, lineHeight: 20 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 14, paddingVertical: 8 },
  pillText: { color: colors.text, fontFamily: fonts.body, fontSize: 13 },
  quoteBox: { marginTop: 26, borderWidth: 1, borderColor: colors.gold, borderRadius: 14, padding: 22, backgroundColor: colors.card },
  quote: { color: colors.goldLight, fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 18, textAlign: 'center', lineHeight: 26 },
});
