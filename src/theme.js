// Taravee Studio mobile design system
export const colors = {
  bg: '#FFFFFF',
  card: '#F8F6F2',
  gold: '#C9A84C',
  goldLight: '#E8D5A3',
  text: '#1A1A1A',
  muted: '#666666',
  border: 'rgba(201,168,76,0.3)',
  borderStrong: 'rgba(201,168,76,0.7)',
  imagePlaceholder: '#EDE9E3',
};

export const radius = {
  card: 12,
  button: 50,
};

export const fonts = {
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
