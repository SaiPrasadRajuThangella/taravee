import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, INSTAGRAM_URL, instagramDmLink } from '../theme';
import { api } from '../api';
import { GoldButton } from '../components/ui';

export default function PriceRequestScreen({ route, navigation }) {
  const { listing } = route.params || {};
  const [form, setForm] = useState({ buyerName: '', instagramHandle: '', sizePreference: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setError('');
    if (!form.buyerName.trim() || !form.instagramHandle.trim()) {
      setError('Please share your name and Instagram handle 🌸');
      return;
    }
    setBusy(true);
    try {
      await api.createEnquiry({
        listingId: listing && listing._id,
        buyerName: form.buyerName,
        instagramHandle: form.instagramHandle,
        sizePreference: form.sizePreference,
        message: form.message,
      });
      setDone(true);
    } catch {
      setError('Could not send. Please DM us on Instagram instead 🌸');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    const handle = form.instagramHandle.replace(/^@/, '') || 'yourusername';
    return (
      <View style={[styles.screen, styles.successWrap]}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color="#000" />
        </View>
        <Text style={styles.successTitle}>Request Sent! 🌸</Text>
        <Text style={styles.successText}>
          We've noted your interest in this beautiful piece. Our team will reach out to you on
          Instagram (@{handle}) with the price and all details within 24 hours 💛
        </Text>
        <GoldButton
          title="Follow us @taravee.studio"
          icon="logo-instagram"
          onPress={() => Linking.openURL(INSTAGRAM_URL)}
          style={{ alignSelf: 'stretch', marginTop: 24 }}
        />
        <Text style={[styles.muted, { marginTop: 18 }]}>Can't wait? DM us directly:</Text>
        <GoldButton
          title="DM us on Instagram"
          outline
          icon="paper-plane-outline"
          onPress={() => Linking.openURL(instagramDmLink(listing && `${listing.designer} — ${listing.title}`))}
          style={{ alignSelf: 'stretch', marginTop: 10 }}
        />
        <Text style={styles.close} onPress={() => navigation.popToTop()}>
          Close 🌸
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Interested in this piece? 🌸</Text>
        {listing ? (
          <Text style={styles.piece}>
            {listing.designer} — {listing.title}
          </Text>
        ) : null}

        <Field label="Your Name *" value={form.buyerName} onChangeText={set('buyerName')} placeholder="Your full name" />
        <Field label="Your Instagram Handle *" value={form.instagramHandle} onChangeText={set('instagramHandle')} placeholder="@username" autoCapitalize="none" />
        <Field label="Your Size / Measurements" value={form.sizePreference} onChangeText={set('sizePreference')} placeholder="Optional — helps us check the fit" />
        <Field label="Any specific questions?" value={form.message} onChangeText={set('message')} placeholder="Optional" multiline />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <GoldButton title={busy ? 'Sending…' : 'Send Request 💛'} disabled={busy} onPress={submit} style={{ marginTop: 18 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, multiline, ...props }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, multiline && { height: 90, textAlignVertical: 'top' }]}
        multiline={multiline}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.gold },
  piece: { color: colors.muted, fontFamily: fonts.light, marginTop: 6 },
  label: { color: colors.text, fontFamily: fonts.medium, fontSize: 13, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.card, color: colors.text, fontFamily: fonts.body, paddingHorizontal: 14, paddingVertical: 12 },
  error: { color: '#f87171', fontFamily: fonts.body, marginTop: 12 },
  muted: { color: colors.muted, fontFamily: fonts.light },
  successWrap: { alignItems: 'center', justifyContent: 'center', padding: 28 },
  checkCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.gold, marginTop: 20 },
  successText: { color: colors.text, fontFamily: fonts.body, textAlign: 'center', lineHeight: 22, marginTop: 12 },
  close: { color: colors.muted, fontFamily: fonts.light, marginTop: 24, fontSize: 15 },
});
