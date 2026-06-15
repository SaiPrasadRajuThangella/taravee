import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View, Easing } from 'react-native';
import { colors, fonts } from '../theme';

const logo = require('../assets/images/Taravee-logo.png');

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    const t = setTimeout(() => navigation.replace('Main'), 2500);
    return () => clearTimeout(t);
  }, [navigation, opacity, scale, shimmer]);

  const shimmerOpacity = shimmer.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.4, 1, 0.4] });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <Animated.View style={{ opacity: shimmerOpacity }}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Once Loved. Forever Elegant.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 320, height: 140 },
  divider: { width: 60, height: 1.5, backgroundColor: colors.gold, marginVertical: 16 },
  tagline: { color: colors.goldLight, fontFamily: fonts.light, fontStyle: 'italic', letterSpacing: 3, fontSize: 13 },
});
