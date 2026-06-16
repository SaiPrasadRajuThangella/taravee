import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, shadow, radius } from '../theme';
import { GoldButton, SectionHeading } from '../components/ui';

const STEPS = [
  {
    icon: 'camera-outline',
    title: 'Share Photos & Video',
    text: 'Click clear photos and a short video of your piece from home.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'We Verify Remotely',
    text: 'Our team reviews everything online. No visits. No one touches your piece.',
  },
  {
    icon: 'star-outline',
    title: 'We List It Beautifully',
    text: 'Your piece goes live on Taravée Studio — authentic and gorgeous.',
  },
  {
    icon: 'heart-outline',
    title: 'Right Buyer Finds It',
    text: 'An interested buyer discovers your piece and confirms their purchase.',
  },
  {
    icon: 'checkmark-circle-outline',
    title: 'Zero Cost To You',
    text: 'We charge only the buyer. Never you. Not before, not during. Ever.',
  },
];

const ACCEPTED = [
  'Bridal Lehengas',
  'Designer Sarees',
  'Sharara & Salwar Sets',
  'Western Designer Wear',
  'Indo-Western',
  'Luxury Accessories',
];

const cinzelBtn = { fontFamily: fonts.display, letterSpacing: 1.5 };

export default function SellScreen({ navigation }) {
  const goSubmit = () => navigation.navigate('SubmissionForm');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero card */}
      <View style={[styles.heroCard, shadow.soft]}>
        <LinearGradient
          colors={[colors.ivory, '#F5EBE4', '#F0DDD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroGlow} />
        <Text style={styles.heroEyebrow}>FOR SELLERS</Text>
        <Text style={styles.heroTitle}>
          Your Designer Piece Deserves A Second Story <Text>🌸</Text>
        </Text>
        <Text style={styles.heroBody}>
          Zero risk. Zero cost to you. Just share photos —{' '}
          <Text style={styles.heroEmphasis}>we handle everything.</Text>
        </Text>
        <GoldButton
          title="Submit Your Piece"
          icon="add-circle-outline"
          onPress={goSubmit}
          style={styles.heroCta}
          labelStyle={cinzelBtn}
        />
      </View>

      {/* How selling works */}
      <View style={styles.section}>
        <SectionHeading eyebrow="The Journey" title="How Selling Works" />
        <View style={styles.timeline}>
          <LinearGradient
            colors={[colors.gold, 'rgba(201,168,76,0.35)', 'transparent']}
            style={styles.timelineLine}
          />
          {STEPS.map((s, i) => (
            <View key={s.title} style={styles.step}>
              <View style={[styles.stepIconWrap, shadow.card]}>
                <Ionicons name={s.icon} size={22} color={colors.goldDeep} />
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{i + 1}</Text>
                </View>
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{s.title.toUpperCase()}</Text>
                <Text style={styles.stepText}>{s.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* What we accept */}
      <View style={styles.section}>
        <SectionHeading eyebrow="What We Accept" title="We Take Quality" />
        <View style={styles.pills}>
          {ACCEPTED.map((a) => (
            <View key={a} style={styles.pill}>
              <Ionicons name="checkmark" size={12} color={colors.goldDeep} />
              <Text style={styles.pillText}>{a}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            If it's designer. If it's quality. If it's been loved once — we take it.{' '}
            <Text style={styles.quoteEmoji}>💛</Text>
          </Text>
        </View>

        <GoldButton
          title="Submit Your Piece"
          onPress={goSubmit}
          style={styles.bottomCta}
          labelStyle={cinzelBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120, gap: 40 },

  heroCard: {
    borderRadius: radius.card,
    padding: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(240,200,190,0.45)',
  },
  heroEyebrow: {
    fontFamily: fonts.display,
    fontSize: 10,
    letterSpacing: 4,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 34,
    lineHeight: 38,
    color: colors.gold,
    marginTop: 8,
  },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(26,26,26,0.8)',
    marginTop: 16,
  },
  heroEmphasis: { fontFamily: fonts.body, fontStyle: 'italic' },
  heroCta: { marginTop: 24, alignSelf: 'stretch', width: '100%' },

  section: {},

  timeline: { position: 'relative', gap: 20, paddingLeft: 4 },
  timelineLine: {
    position: 'absolute',
    left: 27,
    top: 16,
    bottom: 16,
    width: 1,
  },
  step: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  stepIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    fontFamily: fonts.display,
    fontSize: 9,
    color: colors.ivory,
    includeFontPadding: false,
  },
  stepBody: { flex: 1, paddingTop: 6 },
  stepTitle: {
    fontFamily: fonts.display,
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.goldDeep,
  },
  stepText: {
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    marginTop: 6,
  },

  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.35)',
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.ivory,
  },
  pillText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.text,
  },

  quoteBox: {
    marginTop: 20,
    borderRadius: radius.cardSm,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
    backgroundColor: 'rgba(240,230,208,0.55)',
    padding: 20,
  },
  quote: {
    fontFamily: fonts.heading,
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 26,
    color: colors.goldDeep,
    textAlign: 'center',
  },
  quoteEmoji: { fontStyle: 'normal' },
  bottomCta: { marginTop: 20, alignSelf: 'stretch', width: '100%' },
});
