// API base URL. For local development against the Node server:
//  - iOS simulator:      http://localhost:5000/api
//  - Android emulator:   http://10.0.2.2:5000/api
//  - Physical device:    http://<your-computer-LAN-ip>:5000/api
// Override here or via the EXPO_PUBLIC_API_URL env var.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://13.207.107.167:5000/api';

// Uploaded media are served from the server root (without the /api suffix)
export const MEDIA_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');
