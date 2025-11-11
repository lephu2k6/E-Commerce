const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

let authToken = localStorage.getItem('token') || '';

export function setToken(token) {
  authToken = token || '';
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) throw new Error((data && data.message) || 'Request failed');
  return data;
}

export const api = {
  // Auth
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) }),
  login: async (payload) => {
    const data = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    if (data?.token) setToken(data.token);
    return data;
  },

  // Products
  getProducts: () => request('/product'),
  getProduct: (id) => request(`/product/${id}`),

  // Orders
  createOrder: (items) => request('/order', { method: 'POST', body: JSON.stringify({ items }) }),
};

export function getToken() {
  return authToken;
}







