import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import AppHeader from '../components/AppHeader';

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

const TAB_BAR_HEIGHT = 60;
const TAB_ICON_SIZE = 30;
const TAB_SLOT_SIZE = 40;

function GoldTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 16);

  return (
    <View style={[tabStyles.tabBarWrap, { bottom: bottomOffset }]}>
      <LinearGradient
        colors={[colors.goldGradientStart, colors.goldGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tabStyles.tabBarGradient}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const base = ICONS[route.name] || 'ellipse';
          const iconName = focused ? base : `${base}-outline`;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tabStyles.tabItem}
            >
              <View style={tabStyles.iconSlot}>
                {focused ? (
                  <View style={tabStyles.activeIcon}>
                    <Ionicons name={iconName} size={TAB_ICON_SIZE} color={colors.goldDeep} />
                  </View>
                ) : (
                  <Ionicons
                    name={iconName}
                    size={TAB_ICON_SIZE}
                    color={colors.ivory}
                    style={tabStyles.inactiveIcon}
                  />
                )}
              </View>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
}

function Tabs() {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 16);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader />
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          tabBar={(props) => <GoldTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            sceneContainerStyle: { paddingBottom: TAB_BAR_HEIGHT + bottomOffset + 12 },
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="Sell" component={SellScreen} />
          <Tab.Screen name="Saved" component={WishlistScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  tabBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: '3%',
    shadowColor: colors.goldDeep,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 12,
  },
  tabBarGradient: {
    width: '100%',
    maxWidth: 420,
    minHeight: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_HEIGHT / 2,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_SLOT_SIZE,
  },
  iconSlot: {
    width: TAB_SLOT_SIZE,
    height: TAB_SLOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    width: TAB_SLOT_SIZE,
    height: TAB_SLOT_SIZE,
    borderRadius: TAB_SLOT_SIZE / 2,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  inactiveIcon: {
    opacity: 0.9,
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
