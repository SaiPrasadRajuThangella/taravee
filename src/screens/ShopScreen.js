import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import { Loader, ErrorRetry } from '../components/ui';

const PAGE = 8;

export default function ShopScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 18 * 2 - 14) / 2;

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [filters, setFilters] = useState({ categories: [], conditions: [] });
  const [visible, setVisible] = useState(PAGE);

  const load = useCallback(() => {
    setError(false);
    return api
      .getListings()
      .then(setAll)
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    load();
    api.getFilters().then(setFilters).catch(() => {});
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return all.filter((l) => {
      if (category && l.category !== category) return false;
      if (condition && l.condition !== condition) return false;
      if (term) {
        const hay = `${l.designer} ${l.title} ${l.category} ${l.primaryColour}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [all, search, category, condition]);

  const data = filtered.slice(0, visible);

  if (loading) return <Loader label="Loading collection…" />;
  if (error) return <ErrorRetry onRetry={load} />;

  const Chip = ({ label, active, onPress }) => (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && { color: colors.gold }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 14, paddingHorizontal: 18 }}
        contentContainerStyle={{ gap: 14, paddingTop: 16, paddingBottom: 30 }}
        refreshControl={<RefreshControl tintColor={colors.gold} refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        onEndReached={() => setVisible((v) => Math.min(v + PAGE, filtered.length))}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <Text style={styles.title}>Discover Treasures 👑</Text>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={16} color={colors.gold} />
              <TextInput
                placeholder="Search brand, category, colour…"
                placeholderTextColor={colors.muted}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Category</Text>
            </View>
            <View style={styles.chipRow}>
              <Chip label="All" active={!category} onPress={() => setCategory('')} />
              {filters.categories.map((c) => (
                <Chip key={c} label={c} active={category === c} onPress={() => setCategory(category === c ? '' : c)} />
              ))}
            </View>
            {filters.conditions.length ? (
              <>
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Condition</Text>
                </View>
                <View style={styles.chipRow}>
                  <Chip label="Any" active={!condition} onPress={() => setCondition('')} />
                  {filters.conditions.map((c) => (
                    <Chip key={c} label={c} active={condition === c} onPress={() => setCondition(condition === c ? '' : c)} />
                  ))}
                </View>
              </>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            listing={item}
            width={cardWidth}
            onPress={(l) => navigation.navigate('ProductDetail', { id: l._id, listing: l })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {all.length === 0 ? 'No listings uploaded yet' : 'No pieces match just yet 🌸'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerArea: { padding: 18, gap: 12 },
  title: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.gold },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 50,
    paddingHorizontal: 14,
    backgroundColor: colors.card,
  },
  searchInput: { flex: 1, color: colors.text, fontFamily: fonts.body, paddingVertical: 10 },
  filterRow: { marginTop: 4 },
  filterLabel: { color: colors.gold, fontFamily: fonts.semiBold, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 50, paddingHorizontal: 14, paddingVertical: 6 },
  chipActive: { borderColor: colors.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  chipText: { color: colors.muted, fontFamily: fonts.body, fontSize: 12 },
  empty: { color: colors.muted, fontFamily: fonts.light, textAlign: 'center', marginTop: 40 },
});
