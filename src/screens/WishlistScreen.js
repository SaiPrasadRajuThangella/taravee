import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import { Loader } from '../components/ui';
import { loadWishlist, useWishlist } from '../store/wishlist';

export default function WishlistScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 18 * 2 - 14) / 2;
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

  if (loading) return <Loader />;

  if (!items.length) {
    return (
      <View style={styles.empty}>
        <Ionicons name="heart-outline" size={48} color={colors.gold} />
        <Text style={styles.emptyTitle}>No saved pieces yet</Text>
        <Text style={styles.emptyText}>Tap the heart on any piece you love and it'll wait for you here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Saved Pieces 💛</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i._id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 14, paddingHorizontal: 18 }}
        contentContainerStyle={{ gap: 14, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <ProductCard listing={item} width={cardWidth} onPress={(l) => navigation.navigate('ProductDetail', { id: l._id, listing: l })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.gold, padding: 18 },
  empty: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 30, gap: 10 },
  emptyTitle: { fontFamily: fonts.semiBold, fontSize: 18, color: colors.text },
  emptyText: { color: colors.muted, fontFamily: fonts.light, textAlign: 'center', lineHeight: 20 },
});
