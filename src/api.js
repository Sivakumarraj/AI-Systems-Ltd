let BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
if (!BASE_URL.endsWith('/api')) {
  BASE_URL = BASE_URL.replace(/\/$/, '') + '/api';
}
const API_URL = BASE_URL;

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

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  } else {
    // If not JSON, it might be an HTML error page (like a 404 or Render error)
    if (!res.ok) {
       throw new Error(`Critical Error: The server returned an HTML page instead of JSON. This usually means your VITE_API_URL is incorrect or the backend is offline. (Status: ${res.status})`);
    }
    const text = await res.text();
    throw new Error('Server returned non-JSON response');
  }
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
