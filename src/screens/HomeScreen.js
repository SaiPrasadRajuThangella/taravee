import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, shadow, radius, INSTAGRAM_URL } from '../theme';
import { api, firstPhoto } from '../api';
import { GoldButton, SectionHeading, Loader, ErrorRetry } from '../components/ui';

const CATEGORY_NAMES = [
  'Bridal Lehengas',
  'Designer Sarees',
  'Sharara Sets',
  'Western Wear',
  'Indo-Western',
  'Accessories',
];

function buildCategories(listings) {
  return CATEGORY_NAMES.map((name) => {
    const inCat = listings.filter((l) => l.category === name);
    const count = inCat.length;
    return {
      name,
      count: count > 0 ? `${count}+` : '0',
      img: count > 0 ? firstPhoto(inCat[0]) : null,
    };
  });
}

function CategoryCard({ item, width, aspectRatio, onPress, large }) {
  return (
    <Pressable onPress={onPress} style={{ width }}>
      <View style={[styles.catCard, { aspectRatio }, shadow.card]}>
        {item.img ? (
          <Image source={{ uri: item.img }} style={styles.catImg} />
        ) : (
          <View style={[styles.catImg, styles.catPlaceholder]} />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(28,26,22,0.4)', 'rgba(28,26,22,0.95)']}
          locations={[0.4, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.catText}>
          <Text style={[styles.catName, large && styles.catNameLg]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.catCount}>{item.count} PIECES</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
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

  const categories = useMemo(() => buildCategories(listings), [listings]);
  const scrollCardWidth = width * 0.62;
  const gridCardWidth = (width - 40 - 12) / 2;

  if (loading) return <Loader label="Loading treasures…" />;
  if (error) return <ErrorRetry onRetry={load} message="Couldn't reach Taravee Studio." />;

  const featured = listings.filter((l) => l.featured);
  const hero = featured[0] || listings[0];
  const heroImg = hero ? firstPhoto(hero) : null;

  const goShop = () => navigation.navigate('Shop');
  const goSell = () => navigation.navigate('Sell');
  const goProduct = (listing) =>
    navigation.navigate('ProductDetail', { id: listing._id, listing });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          tintColor={colors.gold}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            load();
          }}
        />
      }
    >
      {/* Hero */}
      <Pressable
        style={[styles.hero, shadow.soft]}
        onPress={() => (hero ? goProduct(hero) : goShop())}
      >
        {heroImg ? (
          <Image source={{ uri: heroImg }} style={styles.heroImg} />
        ) : (
          <View style={[styles.heroImg, styles.heroPlaceholder]} />
        )}
        <LinearGradient
          colors={['rgba(28,26,22,0.15)', 'rgba(28,26,22,0.35)', 'rgba(28,26,22,0.92)']}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.heroBadge}>
          <View style={styles.glassPill}>
            <Ionicons name="sparkles" size={12} color={colors.goldDeep} />
            <Text style={styles.heroBadgeText}>AUTHENTICATED · INDIA'S FIRST</Text>
          </View>
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroEyebrow}>THE HOUSE OF</Text>
          <Text style={styles.heroTitle}>
            Once Loved.{'\n'}
            <Text style={styles.heroTitleGold}>Forever Elegant.</Text>
          </Text>
          <Text style={styles.heroDesc}>
            A curated atelier of authenticated pre-loved designer fashion.
          </Text>
          <View style={styles.heroActions}>
            <GoldButton
              title="Shop Collection"
              icon="arrow-forward"
              onPress={goShop}
              style={styles.heroBtnPrimary}
              labelStyle={styles.cinzelBtn}
            />
            <Pressable style={styles.glassBtn} onPress={goSell}>
              <Text style={[styles.glassBtnText, styles.cinzelBtn]}>SELL YOURS</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>

      {/* Trust strip */}
      <View style={styles.trustRow}>
        {[
          { icon: 'shield-checkmark', k: '100%', v: 'Verified' },
          { icon: 'sparkles', k: '24h', v: 'Listing' },
          { icon: 'leaf', k: 'Zero', v: 'No Fees' },
        ].map(({ icon, k, v }) => (
          <View key={v} style={styles.trustCard}>
            <Ionicons name={icon} size={16} color={colors.goldDeep} />
            <Text style={styles.trustKey}>{k}</Text>
            <Text style={styles.trustVal}>{v.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      {/* Currently Available */}
      <View style={styles.section}>
        <SectionHeading
          eyebrow="The Collection"
          title="Currently Available"
          action={
            <Pressable onPress={goShop} style={styles.viewAll} hitSlop={8}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
              <Ionicons name="arrow-forward" size={12} color={colors.goldDeep} />
            </Pressable>
          }
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScrollView}
          contentContainerStyle={styles.hScroll}
          decelerationRate="fast"
          snapToInterval={scrollCardWidth + 16}
        >
          {categories.slice(0, 4).map((c) => (
            <CategoryCard
              key={c.name}
              item={c}
              width={scrollCardWidth}
              aspectRatio={3 / 4}
              large
              onPress={goShop}
            />
          ))}
        </ScrollView>
        <Text style={styles.hint}>New treasures arrive every week ✦</Text>
      </View>

      {/* Browse Categories */}
      <View style={styles.section}>
        <SectionHeading eyebrow="Browse" title="Categories" />
        <View style={styles.catGrid}>
          {categories.map((c) => (
            <CategoryCard
              key={c.name}
              item={c}
              width={gridCardWidth}
              aspectRatio={4 / 5}
              onPress={goShop}
            />
          ))}
        </View>
      </View>

      {/* Our Promise */}
      <View style={[styles.section, styles.promiseCard, shadow.card]}>
        <LinearGradient
          colors={[colors.mint, colors.ivory, '#F5EDE0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={[styles.eyebrowGreen, styles.promiseEyebrow]}>OUR PROMISE</Text>
        <Text style={styles.promiseTitle}>
          Fashion That Gives Back <Text>🌿</Text>
        </Text>
        <Text style={styles.promiseBody}>
          Every pre-loved piece gives a designer outfit a second story — and the planet a better
          future. Sustainable luxury, beautifully reimagined.
        </Text>
      </View>

      {/* Instagram */}
      <View style={[styles.section, styles.igCard, shadow.card]}>
        <View style={styles.igIconCircle}>
          <Ionicons name="logo-instagram" size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.igTitle}>Follow Our Journey</Text>
        <Text style={styles.igSub}>New arrivals. Styling. Real stories.</Text>
        <GoldButton
          title="@TARAVEE.STUDIO"
          icon="logo-instagram"
          onPress={() => Linking.openURL(INSTAGRAM_URL)}
          style={styles.igCta}
          labelStyle={styles.cinzelBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120, gap: 40 },

  hero: {
    borderRadius: radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    aspectRatio: 3 / 4,
  },
  heroImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroPlaceholder: { backgroundColor: colors.imagePlaceholder },
  heroBadge: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  glassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: 'rgba(251,249,245,0.82)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroBadgeText: {
    fontFamily: fonts.display,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    paddingBottom: 28,
  },
  heroEyebrow: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 4,
    color: colors.goldLight,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 44,
    lineHeight: 46,
    color: colors.ivory,
    marginTop: 8,
  },
  heroTitleGold: { color: colors.gold },
  heroDesc: {
    fontFamily: fonts.light,
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(251,249,245,0.85)',
    marginTop: 10,
    maxWidth: 260,
  },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20 },
  heroBtnPrimary: { paddingHorizontal: 18, paddingVertical: 12, minHeight: 44 },
  glassBtn: {
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'rgba(251,249,245,0.82)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  glassBtnText: {
    fontSize: 11,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  cinzelBtn: {
    fontFamily: fonts.display,
    letterSpacing: 1.5,
  },

  trustRow: { flexDirection: 'row', gap: 10 },
  trustCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 96,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(251,249,245,0.82)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  trustKey: {
    fontFamily: fonts.headingBold,
    fontSize: 26,
    color: colors.gold,
    lineHeight: 28,
    marginTop: 6,
  },
  trustVal: {
    fontFamily: fonts.bold,
    fontSize: 8,
    letterSpacing: 2,
    color: colors.goldDeep,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  section: {},
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 4 },
  viewAllText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.goldDeep,
    textTransform: 'uppercase',
  },
  hScrollView: { marginHorizontal: -20 },
  hScroll: { gap: 16 },
  hint: {
    fontFamily: fonts.light,
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
  },

  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  catCard: {
    borderRadius: radius.cardSm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.imagePlaceholder,
  },
  catImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  catPlaceholder: { backgroundColor: colors.imagePlaceholder },
  catText: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12 },
  catName: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.ivory,
    lineHeight: 22,
  },
  catNameLg: { fontSize: 22 },
  catCount: {
    fontFamily: fonts.bold,
    fontSize: 9,
    letterSpacing: 2,
    color: colors.goldLight,
    marginTop: 2,
    textTransform: 'uppercase',
  },

  promiseCard: {
    borderRadius: radius.card,
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  promiseEyebrow: { marginBottom: 4 },
  eyebrowGreen: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 4,
    color: colors.forest,
    textTransform: 'uppercase',
  },
  promiseTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 30,
    lineHeight: 34,
    color: colors.forest,
  },
  promiseBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(26,26,26,0.8)',
    marginTop: 12,
  },

  igCard: {
    alignItems: 'center',
    borderRadius: radius.card,
    padding: 24,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.border,
  },
  igIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  igTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    color: colors.gold,
    marginTop: 12,
    textAlign: 'center',
  },
  igSub: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
    textAlign: 'center',
  },
  igCta: { marginTop: 20, alignSelf: 'stretch', width: '100%' },
});
