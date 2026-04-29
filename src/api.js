const API_URL = 'http://localhost:3001/api';

function getToken() {
  return localStorage.getItem('aisystems_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// Auth
export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),

  // Contact
  sendContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),

  // Orders
  placeOrder: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getOrders: () => request('/orders'),

  // Newsletter
  subscribe: (email) => request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),

  // Chat
  sendChat: (message) => request('/chat', { method: 'POST', body: JSON.stringify({ message }) }),
  getChatHistory: () => request('/chat/history'),

  // Dashboard
  getDashboard: () => request('/dashboard'),

  // Admin
  getAdminUsers: () => request('/admin/users'),
  getAdminContacts: () => request('/contacts'),
};
