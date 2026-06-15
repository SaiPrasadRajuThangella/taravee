# Taravee Studio — Mobile App

Cross-platform React Native (Expo) app for Taravee Studio. Dark royal-luxury theme,
gold accents, connected to the same MySQL-backed API as the web app.

## Run

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a simulator.

## API connection

The app talks to the Node/MySQL server. Set the base URL in [src/config.js](src/config.js)
or via the `EXPO_PUBLIC_API_URL` env var:

- iOS simulator: `http://localhost:5000/api`
- Android emulator: `http://10.0.2.2:5000/api`
- Physical device: `http://<your-computer-LAN-ip>:5000/api`

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.20:5000/api npx expo start
```

## Screens

Splash → Bottom tabs (Home · Shop · Sell · Saved · About) with a Product Detail,
Price Request and multi-step Submission Form in the stack.

- **Home** — hero banner, currently-available scroller, category pills, sustainability + Instagram cards
- **Shop** — search, category/condition filter chips, 2-column grid, pull-to-refresh, infinite scroll
- **Product Detail** — swipeable gallery, authentication & condition badges, measurements accordion, share sheet, wishlist, Request Price
- **Price Request** — name / Instagram / size / message → saves to MySQL → success screen + Instagram DM deep link
- **Sell** — how-it-works + Submit Your Piece
- **Submission Form** — multi-step with photo & video pickers and a progress bar
- **Saved** — wishlist stored locally with AsyncStorage
- **About** — brand story, promise, Instagram link, version

Every price enquiry and DM links to `https://ig.me/m/taravee.studio`.
