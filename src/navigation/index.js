import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import SellScreen from '../screens/SellScreen';
import WishlistScreen from '../screens/WishlistScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import PriceRequestScreen from '../screens/PriceRequestScreen';
import SubmissionFormScreen from '../screens/SubmissionFormScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
  Home: 'home',
  Shop: 'bag-handle',
  Sell: 'camera',
  Saved: 'heart',
  About: 'information-circle',
};

const headerOptions = {
  headerStyle: { backgroundColor: colors.bg },
  headerTintColor: colors.gold,
  headerTitleStyle: { fontFamily: fonts.heading, color: colors.gold },
  contentStyle: { backgroundColor: colors.bg },
};

const TAB_BAR_HEIGHT = 64;

function Tabs() {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 16);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.bg,
        sceneContainerStyle: { paddingBottom: TAB_BAR_HEIGHT + bottomOffset + 12 },
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: bottomOffset,
          height: TAB_BAR_HEIGHT,
          borderRadius: TAB_BAR_HEIGHT / 2,
          backgroundColor: colors.gold,
          borderTopWidth: 0,
          borderWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: { paddingVertical: 8 },
        tabBarIcon: ({ size, focused }) => {
          const base = ICONS[route.name] || 'ellipse';
          const name = focused ? base : `${base}-outline`;
          if (focused) {
            return (
              <View style={tabStyles.activeIcon}>
                <Ionicons name={name} size={size} color={colors.gold} />
              </View>
            );
          }
          return <Ionicons name={name} size={size} color={colors.bg} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Sell" component={SellScreen} />
      <Tab.Screen name="Saved" component={WishlistScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  activeIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={headerOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PriceRequest" component={PriceRequestScreen} options={{ title: 'Request Price' }} />
      <Stack.Screen name="SubmissionForm" component={SubmissionFormScreen} options={{ title: 'Submit Your Piece' }} />
    </Stack.Navigator>
  );
}
