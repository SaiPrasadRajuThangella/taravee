import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, INSTAGRAM_URL } from '../theme';
import { api, firstPhoto } from '../api';
import { GoldButton, SectionHeading, Loader, ErrorRetry } from '../components/ui';

const logo = require('../assets/images/Taravee-logo.png');
const CATEGORIES = ['Bridal Lehengas', 'Designer Sarees', 'Sharara Sets', 'Western Wear', 'Indo-Western', 'Accessories'];

export default function HomeScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    setError(false);
    return api
      .getListings()
      .then(setListings)
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader label="Loading treasures…" />;
  if (error) return <ErrorRetry onRetry={load} message="Couldn't reach Taravee Studio." />;

  const featured = listings.filter((l) => l.featured).slice(0, 6);
  const hero = featured[0] || listings[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl tintColor={colors.gold} refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
    >
      {/* header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={logo} style={styles.headerLogo} resizeMode="contain" />
        </View>
        <Pressable style={styles.igIcon} onPress={() => Linking.openURL(INSTAGRAM_URL)}>
          <Ionicons name="logo-instagram" size={24} color={colors.gold} />
        </Pressable>
      </View>

      {/* hero banner */}
      {hero ? (
        <Pressable style={styles.hero} onPress={() => navigation.navigate('ProductDetail', { id: hero._id, listing: hero })}>
          {firstPhoto(hero) ? <Image source={{ uri: firstPhoto(hero) }} style={styles.heroImg} /> : null}
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Once Loved.{'\n'}Forever Elegant.</Text>
            <Text style={[styles.muted, styles.heroSub]}>Authenticated pre-loved designer fashion</Text>
            <GoldButton title="Shop Collection" onPress={() => navigation.navigate('Shop')} style={styles.heroBtn} />
          </View>
        </Pressable>
      ) : (
        <View style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Once Loved.{'\n'}Forever Elegant.</Text>
            <Text style={[styles.muted, styles.heroSub]}>Authenticated pre-loved designer fashion</Text>
            <GoldButton title="Shop Collection" onPress={() => navigation.navigate('Shop')} style={styles.heroBtn} />
          </View>
        </View>
      )}

      {/* currently available */}
      <View style={styles.section}>
        <SectionHeading eyebrow="The Collection" title="Currently Available" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14 }}>
          {listings.slice(0, 8).map((l) => (
            <Pressable key={l._id} style={styles.hCard} onPress={() => navigation.navigate('ProductDetail', { id: l._id, listing: l })}>
              {firstPhoto(l) ? <Image source={{ uri: firstPhoto(l) }} style={styles.hCardImg} /> : <View style={[styles.hCardImg, styles.ph]} />}
              <Text style={styles.hCardBrand} numberOfLines={1}>{l.designer}</Text>
              <Text style={styles.hCardCat} numberOfLines={1}>{l.category}</Text>
            </Pressable>
          ))}
          {listings.length === 0 ? <Text style={styles.emptyListings}>No listings uploaded yet</Text> : null}
        </ScrollView>
      </View>

      {/* category pills */}
      <View style={styles.section}>
        <SectionHeading eyebrow="Browse" title="Categories" />
        <View style={styles.pills}>
          {CATEGORIES.map((c) => (
            <Pressable key={c} style={styles.pill} onPress={() => navigation.navigate('Shop')}>
              <Text style={styles.pillText}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* sustainability card */}
      <View style={styles.section}>
        <View style={styles.sustain}>
          <Text style={styles.sustainTitle}>Fashion That Gives Back 🌿</Text>
          <Text style={styles.sustainText}>
            Every pre-loved piece gives a designer outfit a second life — and the planet a better future.
          </Text>
        </View>
      </View>

      {/* instagram CTA */}
      <View style={styles.section}>
        <View style={styles.igCard}>
          <Ionicons name="logo-instagram" size={32} color={colors.gold} />
          <Text style={styles.igTitle}>Follow Our Journey</Text>
          <Text style={styles.muted}>New arrivals. Styling. Real stories.</Text>
          <GoldButton title="@taravee.studio" icon="logo-instagram" onPress={() => Linking.openURL(INSTAGRAM_URL)} style={styles.igButton} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 110 },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  brandRow: { alignItems: 'center', justifyContent: 'center' },
  headerLogo: { width: 72, height: 72 },
  igIcon: { position: 'absolute', right: 18 },
  hero: { height: 420, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.card },
  heroImg: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.55)' },
  heroText: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  heroBtn: { marginTop: 14, alignSelf: 'stretch', width: '100%' },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 32, color: colors.gold, lineHeight: 38 },
  heroSub: { marginTop: 8, textAlign: 'left' },
  section: { paddingHorizontal: 18, marginTop: 28 },
  hCard: { width: 150 },
  hCardImg: { width: 150, height: 190, borderRadius: 12, backgroundColor: colors.imagePlaceholder },
  ph: { alignItems: 'center', justifyContent: 'center' },
  hCardBrand: { color: colors.gold, fontFamily: fonts.heading, fontSize: 14, marginTop: 6 },
  hCardCat: { color: colors.muted, fontFamily: fonts.light, fontSize: 11 },
  muted: { color: colors.muted, fontFamily: fonts.light, textAlign: 'center' },
  emptyListings: { color: colors.muted, fontFamily: fonts.light, fontSize: 14, fontStyle: 'italic', paddingVertical: 8 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { borderWidth: 1, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 16, paddingVertical: 8 },
  pillText: { color: colors.text, fontFamily: fonts.body, fontSize: 13 },
  sustain: { borderWidth: 1, borderColor: 'rgba(143,175,143,0.5)', backgroundColor: 'rgba(143,175,143,0.08)', borderRadius: 14, padding: 20 },
  sustainTitle: { color: '#2D6A4F', fontFamily: fonts.semiBold, fontSize: 18, marginBottom: 8 },
  sustainText: { color: colors.text, fontFamily: fonts.body, lineHeight: 22 },
  igCard: { alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 24, gap: 4 },
  igTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.gold, marginTop: 8, textAlign: 'center', width: '100%' },
  igButton: { marginTop: 12, marginBottom: 8, alignSelf: 'stretch', width: '100%' },
});
