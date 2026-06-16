// Taravee Studio mobile design system
export const colors = {
  bg: '#F7F4EE',
  ivory: '#FBF9F5',
  card: '#F8F6F2',
  gold: '#C9A84C',
  goldDeep: '#8B7340',
  // Web .btn-gold — linear-gradient(135deg, oklch(0.78 0.13 82), oklch(0.62 0.12 75))
  goldGradientStart: '#D3A84E',
  goldGradientEnd: '#A88738',
  goldSoft: '#F0E6D0',
  goldLight: '#E8D5A3',
  text: '#1A1A1A',
  muted: '#666666',
  border: 'rgba(201,168,76,0.3)',
  borderStrong: 'rgba(201,168,76,0.7)',
  imagePlaceholder: '#EDE9E3',
  overlayDark: 'rgba(28,26,22,0.92)',
  mint: '#E8F0E8',
  forest: '#2D5A40',
};

export const radius = {
  card: 32,
  cardSm: 24,
  button: 50,
};

export const shadow = {
  soft: {
    shadowColor: '#8B7340',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 25,
    elevation: 8,
  },
  card: {
    shadowColor: '#8B7340',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 4,
  },
};

export const fonts = {
  // Eyebrows, labels, buttons — Cinzel
  display: 'Cinzel-Regular',
  displayMedium: 'Cinzel-Medium',
  // Gold display text — Tangerine
  heading: 'Tangerine-Regular',
  headingBold: 'Tangerine-Bold',
  // Body copy — Plus Jakarta Sans
  light: 'PlusJakartaSans-Light',
  body: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
};

export const INSTAGRAM_URL = 'https://instagram.com/taravee.studio';
export const INSTAGRAM_DM = 'https://ig.me/m/taravee.studio';

export function instagramDmLink(pieceName) {
  const text = `Hi! I'm interested in the ${
    pieceName || 'piece'
  } listed on Taravee Studio. Could you share the price? 🌸`;
  return `${INSTAGRAM_DM}?text=${encodeURIComponent(text)}`;
}

export const SHARE_MESSAGE =
  'Check out this beautiful piece on Taravee Studio! Once Loved. Forever Elegant. instagram.com/taravee.studio';
