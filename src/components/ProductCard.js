import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fonts } from '../theme';
import { firstPhoto } from '../api';
import { useWishlist } from '../store/wishlist';

export default function ProductCard({ listing, onPress, width }) {
  const { has, toggle } = useWishlist();
  const saved = has(listing._id);
  const photo = firstPhoto(listing);
  const sold = listing.status === 'sold';

  return (
    <Pressable onPress={() => onPress(listing)} style={[styles.card, width ? { width } : null]}>
      <View style={styles.imageWrap}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>Taravée</Text>
          </View>
        )}
        {sold ? (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>Found Its Home 🤍</Text>
          </View>
        ) : null}
        <Pressable onPress={() => toggle(listing._id)} style={styles.heart} hitSlop={8}>
          <Ionicons name={saved ? 'heart' : 'heart-outline'} size={18} color={saved ? colors.gold : '#fff'} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.designer} numberOfLines={1}>
          {listing.designer}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {listing.title}
        </Text>
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{listing.category}</Text>
          </View>
        </View>
        <Text style={styles.price}>Price on enquiry</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageWrap: { aspectRatio: 4 / 5, backgroundColor: colors.imagePlaceholder },
  image: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: colors.gold, fontFamily: fonts.heading, fontStyle: 'italic', fontSize: 22 },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
  soldBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  soldText: { color: '#fff', fontFamily: fonts.semiBold, fontSize: 10 },
  body: { padding: 10, gap: 3 },
  designer: { color: colors.gold, fontFamily: fonts.heading, fontSize: 15 },
  title: { color: colors.muted, fontFamily: fonts.light, fontSize: 12 },
  row: { flexDirection: 'row', marginTop: 4 },
  badge: {
    backgroundColor: colors.bg,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: colors.gold, fontFamily: fonts.medium, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  price: { color: colors.goldLight, fontFamily: fonts.light, fontStyle: 'italic', fontSize: 12, marginTop: 4 },
});
