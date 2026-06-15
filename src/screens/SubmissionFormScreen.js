import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts, INSTAGRAM_URL } from '../theme';
import { api } from '../api';
import { GoldButton } from '../components/ui';

const STEPS = ['Seller', 'Piece', 'Condition', 'Photos'];

export default function SubmissionFormScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    city: '',
    instagramHandle: '',
    category: '',
    designer: '',
    primaryColour: '',
    timesWorn: '',
    originalPrice: '',
    expectedPrice: '',
  });
  // photos keyed by field name expected by the server
  const [photos, setPhotos] = useState({ photo_front: null, photo_back: null, photo_detail: null });
  const [video, setVideo] = useState(null);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const pick = async (key, video = false) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: video ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled && res.assets && res.assets[0]) {
      const asset = res.assets[0];
      if (video) setVideo(asset);
      else setPhotos((p) => ({ ...p, [key]: asset }));
    }
  };

  const next = () => {
    setError('');
    if (step === 0 && (!form.fullName || !form.city)) return setError('Name and city are required');
    if (step === 1 && (!form.category || !form.designer || !form.primaryColour))
      return setError('Category, designer and colour are required');
    if (step === 2 && (!form.originalPrice || !form.expectedPrice))
      return setError('Original and expected price are required');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    setError('');
    if (!photos.photo_front || !photos.photo_back || !photos.photo_detail) {
      return setError('Front, back and detail photos are required');
    }
    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      // server requires these — default sensible values
      fd.append('preferredContact', 'instagram');
      Object.entries(photos).forEach(([key, asset]) => {
        if (asset) {
          fd.append(key, {
            uri: asset.uri,
            name: asset.fileName || `${key}.jpg`,
            type: 'image/jpeg',
          });
        }
      });
      if (video) {
        fd.append('video', { uri: video.uri, name: video.fileName || 'video.mp4', type: 'video/mp4' });
      }
      await api.submitPiece(fd);
      setDone(true);
    } catch (e) {
      setError('Could not submit. Please try again or DM us on Instagram.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center', padding: 28 }]}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={48} color="#000" />
        </View>
        <Text style={styles.successTitle}>Your piece is in good hands 🌸</Text>
        <Text style={styles.successText}>
          We'll review your piece and reach out on Instagram within 24–48 hours 💛
        </Text>
        <GoldButton title="Follow us on Instagram" icon="logo-instagram" onPress={() => Linking.openURL(INSTAGRAM_URL)} style={{ marginTop: 22, alignSelf: 'stretch' }} />
        <Text style={styles.close} onPress={() => navigation.popToTop()}>Done</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* progress bar + step indicators */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((step + 1) / STEPS.length) * 100}%` }]} />
        </View>
        <View style={styles.stepRow}>
          {STEPS.map((s, i) => (
            <Text key={s} style={[styles.stepLabel, i <= step && { color: colors.gold }]}>
              {s}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {step === 0 && (
          <>
            <Field label="Full Name *" value={form.fullName} onChangeText={set('fullName')} />
            <Field label="City *" value={form.city} onChangeText={set('city')} />
            <Field label="Instagram Handle" value={form.instagramHandle} onChangeText={set('instagramHandle')} autoCapitalize="none" placeholder="@username" />
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Category *" value={form.category} onChangeText={set('category')} placeholder="e.g. Bridal Lehenga" />
            <Field label="Designer / Brand *" value={form.designer} onChangeText={set('designer')} placeholder="e.g. Sabyasachi" />
            <Field label="Primary Colour *" value={form.primaryColour} onChangeText={set('primaryColour')} placeholder="e.g. Red" />
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Times Worn" value={form.timesWorn} onChangeText={set('timesWorn')} placeholder="e.g. once" />
            <Field label="Original Price (₹) *" value={form.originalPrice} onChangeText={set('originalPrice')} keyboardType="numeric" />
            <Field label="Expected Price (₹) *" value={form.expectedPrice} onChangeText={set('expectedPrice')} keyboardType="numeric" />
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.label}>Photos * (front, back, detail)</Text>
            <View style={styles.photoRow}>
              {['photo_front', 'photo_back', 'photo_detail'].map((key) => (
                <Pressable key={key} style={styles.photoSlot} onPress={() => pick(key)}>
                  {photos[key] ? (
                    <Image source={{ uri: photos[key].uri }} style={styles.photoImg} />
                  ) : (
                    <Ionicons name="camera-outline" size={26} color={colors.gold} />
                  )}
                  <Text style={styles.photoLabel}>{key.replace('photo_', '')}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.videoBtn} onPress={() => pick('video', true)}>
              <Ionicons name={video ? 'checkmark-circle' : 'videocam-outline'} size={20} color={colors.gold} />
              <Text style={styles.videoText}>{video ? 'Video selected' : 'Add a short video (optional)'}</Text>
            </Pressable>
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.nav}>
          {step > 0 ? <GoldButton title="Back" outline onPress={() => setStep((s) => s - 1)} style={{ flex: 1 }} /> : null}
          {step < STEPS.length - 1 ? (
            <GoldButton title="Next" onPress={next} style={{ flex: 1 }} />
          ) : (
            <GoldButton title={busy ? 'Submitting…' : 'Submit Piece'} disabled={busy} onPress={submit} style={{ flex: 1 }} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.muted} style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  progressWrap: { padding: 18, paddingBottom: 6 },
  progressTrack: { height: 4, backgroundColor: colors.card, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: colors.gold },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  stepLabel: { color: colors.muted, fontFamily: fonts.light, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  label: { color: colors.text, fontFamily: fonts.medium, fontSize: 13, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.card, color: colors.text, fontFamily: fonts.body, paddingHorizontal: 14, paddingVertical: 12 },
  photoRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  photoSlot: { flex: 1, aspectRatio: 0.8, borderWidth: 1, borderColor: colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, overflow: 'hidden' },
  photoImg: { ...StyleSheet.absoluteFillObject },
  photoLabel: { color: colors.muted, fontFamily: fonts.light, fontSize: 10, marginTop: 4, textTransform: 'capitalize' },
  videoBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 14 },
  videoText: { color: colors.text, fontFamily: fonts.body },
  error: { color: '#f87171', fontFamily: fonts.body, marginTop: 14 },
  nav: { flexDirection: 'row', gap: 12, marginTop: 24 },
  checkCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.gold, marginTop: 20, textAlign: 'center' },
  successText: { color: colors.text, fontFamily: fonts.body, textAlign: 'center', lineHeight: 22, marginTop: 12 },
  close: { color: colors.muted, fontFamily: fonts.light, marginTop: 22, fontSize: 15 },
});
