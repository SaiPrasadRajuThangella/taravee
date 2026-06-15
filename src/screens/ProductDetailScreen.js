import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, SHARE_MESSAGE } from '../theme';
import { api, mediaUrl } from '../api';
import { GoldButton, Loader, Badge } from '../components/ui';
import { useWishlist } from '../store/wishlist';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { id, listing: initial } = route.params || {};
  const [listing, setListing] = useState(initial || null);
  const [loading, setLoading] = useState(!initial);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showMeasure, setShowMeasure] = useState(false);
  const { has, toggle } = useWishlist();

  useEffect(() => {
    if (id) api.getListing(id).then(setListing).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading || !listing) return <Loader />;

  const photos = (listing.photos || []).map((p) => mediaUrl(p.url)).filter(Boolean);
  const saved = has(listing._id);
  const sold = listing.status === 'sold';
  const measurements = listing.measurements || {};
  const measureEntries = Object.entries(measurements).filter(([, v]) => v);

  const onShare = () =>
    Share.share({ message: `${listing.designer} — ${listing.title}\n\n${SHARE_MESSAGE}` });

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* gallery */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setPhotoIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
          >
            {photos.length ? (
              photos.map((uri, i) => <Image key={i} source={{ uri }} style={styles.galleryImg} resizeMode="cover" />)
            ) : (
              <View style={[styles.galleryImg, styles.ph]}>
                <Text style={styles.phText}>Taravée</Text>
              </View>
            )}
          </ScrollView>

          <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Pressable style={styles.heart} onPress={() => toggle(listing._id)} hitSlop={10}>
            <Ionicons name={saved ? 'heart' : 'heart-outline'} size={22} color={saved ? colors.gold : '#fff'} />
          </Pressable>

          {photos.length > 1 ? (
            <View style={styles.dots}>
              {photos.map((_, i) => (
                <View key={i} style={[styles.dot, i === photoIndex && { backgroundColor: colors.gold }]} />
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          <Text style={styles.designer}>{listing.designer}</Text>
          <Text style={styles.title}>{listing.title}</Text>

          <View style={styles.badges}>
            <View style={styles.authBadge}>
              <Ionicons name="shield-checkmark" size={13} color={colors.gold} />
              <Text style={styles.authText}>Authenticated</Text>
            </View>
            {listing.condition ? <Badge label={listing.condition} filled /> : null}
            {listing.primaryColour ? <Badge label={listing.primaryColour} /> : null}
          </View>

          {/* measurements accordion */}
          {measureEntries.length || listing.size ? (
            <Pressable style={styles.accordion} onPress={() => setShowMeasure((s) => !s)}>
              <View style={styles.accordionHead}>
                <Text style={styles.accordionTitle}>Measurements</Text>
                <Ionicons name={showMeasure ? 'chevron-up' : 'chevron-down'} size={18} color={colors.gold} />
              </View>
              {showMeasure ? (
                <View style={{ marginTop: 10, gap: 6 }}>
                  {listing.size ? <Text style={styles.measureRow}>Size: {listing.size}</Text> : null}
                  {measureEntries.map(([k, v]) => (
                    <Text key={k} style={styles.measureRow}>
                      {k}: {String(v)}
                    </Text>
                  ))}
                </View>
              ) : null}
            </Pressable>
          ) : null}

          {listing.description ? (
            <View style={{ marginTop: 18 }}>
              <Text style={styles.sectionLabel}>Description</Text>
              <Text style={styles.desc}>{listing.description}</Text>
            </View>
          ) : null}

          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Price on Enquiry</Text>
            <Text style={styles.priceSub}>Request the price & details — we reply on Instagram within 24h 💛</Text>
          </View>
        </View>
      </ScrollView>

      {/* sticky action bar */}
      <View style={styles.actionBar}>
        <Pressable style={styles.shareBtn} onPress={onShare}>
          <Ionicons name="share-social-outline" size={22} color={colors.gold} />
        </Pressable>
        <GoldButton
          title={sold ? 'Found Its Home 🤍' : 'Request Price 💛'}
          disabled={sold}
          onPress={() => navigation.navigate('PriceRequest', { listing })}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  galleryImg: { width, height: width * 1.25, backgroundColor: colors.imagePlaceholder },
  ph: { alignItems: 'center', justifyContent: 'center' },
  phText: { color: colors.gold, fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 40 },
  back: { position: 'absolute', top: 44, left: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 6 },
  heart: { position: 'absolute', top: 44, right: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 6 },
  dots: { position: 'absolute', bottom: 14, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' },
  body: { padding: 18 },
  designer: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.gold },
  title: { color: colors.text, fontFamily: fonts.body, fontSize: 15, marginTop: 4 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, alignItems: 'center' },
  authBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  authText: { color: colors.gold, fontFamily: fonts.medium, fontSize: 11 },
  accordion: { marginTop: 22, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14 },
  accordionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accordionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  measureRow: { color: colors.muted, fontFamily: fonts.light, fontSize: 13, textTransform: 'capitalize' },
  sectionLabel: { color: colors.gold, fontFamily: fonts.semiBold, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  desc: { color: colors.text, fontFamily: fonts.body, lineHeight: 22 },
  priceBox: { marginTop: 22, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 18, backgroundColor: colors.card },
  priceLabel: { fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 20, color: colors.goldLight },
  priceSub: { color: colors.muted, fontFamily: fonts.light, marginTop: 6, lineHeight: 20 },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  shareBtn: { borderWidth: 1.5, borderColor: colors.gold, borderRadius: 50, padding: 12 },
});
