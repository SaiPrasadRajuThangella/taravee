import axios from 'axios';
import { API_BASE_URL, MEDIA_BASE_URL } from './config';

const client = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });

// Resolve a possibly-relative uploaded media url to an absolute one
export function mediaUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return `${MEDIA_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function firstPhoto(listing) {
  const p = listing && listing.photos && listing.photos[0];
  return p ? mediaUrl(p.url) : null;
}

export const api = {
  getListings: (params = {}) =>
    client.get('/listings', { params }).then((r) => (Array.isArray(r.data) ? r.data : [])),
  getListing: (id) => client.get(`/listings/${id}`).then((r) => r.data),
  getFilters: () => client.get('/listings/filters').then((r) => r.data),

  // buyer "Request Price" enquiry
  createEnquiry: (payload) => client.post('/enquiries', payload).then((r) => r.data),

  // seller submission (multipart form data)
  submitPiece: (formData) =>
    client
      .post('/submissions', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data),
};

export default api;
