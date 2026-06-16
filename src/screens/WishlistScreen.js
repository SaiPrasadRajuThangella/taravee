import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import { GoldButton, Loader, SectionHeading } from '../components/ui';
import { loadWishlist, useWishlist } from '../store/wishlist';

function EmptyWishlist({ onDiscover }) {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.iconCluster}>
        <View style={styles.glowRing3} />
        <View style={styles.glowRing2} />
        <View style={styles.glowRing1} />
        <Ionicons name="heart-outline" size={40} color={colors.goldDeep} />
        <Ionicons
          name="sparkles"
          size={20}
          color={colors.gold}
          style={styles.sparkle}
        />
      </View>

      <Text style={styles.emptyEyebrow}>YOUR WISHLIST</Text>
      <Text style={styles.emptyTitle}>No saved pieces yet</Text>
      <Text style={styles.emptyText}>
        Tap the heart on any piece you love and it'll wait for you here — beautifully kept.
      </Text>
      <GoldButton
        title="Discover Pieces"
        onPress={onDiscover}
        style={styles.discoverBtn}
        labelStyle={styles.discoverBtnLabel}
      />
    </View>
  );
}

export default function WishlistScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 40 - 12) / 2;
  const { ids } = useWishlist();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    loadWishlist().then(async (saved) => {
      if (!saved.length) {
        setItems([]);
        setLoading(false);
        return;
      }
      try {
        const all = await api.getListings();
        setItems(all.filter((l) => saved.includes(l._id)));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useFocusEffect(useCallback(() => load(), [load, ids.length]));

  const goShop = () => navigation.navigate('Shop');

  if (loading) return <Loader label="Loading your wishlist…" />;

  if (!items.length) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.emptyScroll}
        showsVerticalScrollIndicator={false}
      >
        <EmptyWishlist onDiscover={goShop} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i._id)}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <SectionHeading eyebrow="Your Wishlist" title="Saved Pieces" />
        }
        renderItem={({ item }) => (
          <ProductCard
            listing={item}
            width={cardWidth}
            onPress={(l) => navigation.navigate('ProductDetail', { id: l._id, listing: l })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  emptyScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minHeight: 480,
  },
  iconCluster: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  glowRing3: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: 'rgba(201, 168, 76, 0.05)',
  },
  glowRing2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(201, 168, 76, 0.08)',
  },
  glowRing1: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(201, 168, 76, 0.12)',
  },
  sparkle: {
    position: 'absolute',
    top: 30,
    right: 42,
  },
  emptyEyebrow: {
    fontFamily: fonts.display,
    fontSize: 10,
    letterSpacing: 4,
    color: colors.goldDeep,
    marginTop: 32,
    textTransform: 'uppercase',
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 38,
    lineHeight: 42,
    color: colors.gold,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 280,
  },
  discoverBtn: {
    marginTop: 28,
    alignSelf: 'center',
    minWidth: 220,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoverBtnLabel: {
    fontFamily: fonts.display,
    letterSpacing: 1.5,
    textAlign: 'center',
    width: '100%',
  },

  listContent: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  gridRow: { gap: 12 },
});
