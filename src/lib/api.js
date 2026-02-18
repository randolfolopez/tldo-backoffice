const API_URL = import.meta.env.VITE_API_URL || 'https://api.tramiteslegales.do';

class ApiClient {
  constructor() {
    this.baseUrl = API_URL;
  }

  getToken() {
    return localStorage.getItem('tldo_token');
  }

  setToken(token) {
    localStorage.setItem('tldo_token', token);
  }

  clearToken() {
    localStorage.removeItem('tldo_token');
    localStorage.removeItem('tldo_user');
  }

  async request(path, options = {}) {
    const token = this.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}${path}`, { ...options, headers });

    if (res.status === 401) {
      this.clearToken();
      window.location.href = '/login';
      throw new Error('Sesión expirada');
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Error del servidor' }));
      throw new Error(err.error || `Error ${res.status}`);
    }

    return res.json();
  }

  get(path, params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(`${path}${qs ? '?' + qs : ''}`);
  }

  post(path, body) {
    return this.request(path, { method: 'POST', body: JSON.stringify(body) });
  }

  put(path, body) {
    return this.request(path, { method: 'PUT', body: JSON.stringify(body) });
  }

  del(path) {
    return this.request(path, { method: 'DELETE' });
  }

  // Auth
  async login(email, password) {
    const data = await this.post('/api/auth/login', { email, password });
    this.setToken(data.token);
    localStorage.setItem('tldo_user', JSON.stringify(data.user));
    return data;
  }

  logout() {
    this.clearToken();
    window.location.href = '/login';
  }

  getUser() {
    try { return JSON.parse(localStorage.getItem('tldo_user')); } catch { return null; }
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Dashboard
  getDashboard() { return this.get('/api/dashboard'); }

  // Orders
  getOrders(params) { return this.get('/api/orders', params); }
  getOrder(id) { return this.get(`/api/orders/${id}`); }
  createOrder(data) { return this.post('/api/orders', data); }
  updateOrder(id, data) { return this.put(`/api/orders/${id}`, data); }
  deleteOrder(id) { return this.del(`/api/orders/${id}`); }

  // Clients
  getClients(params) { return this.get('/api/clients', params); }
  getClient(id) { return this.get(`/api/clients/${id}`); }
  createClient(data) { return this.post('/api/clients', data); }
  updateClient(id, data) { return this.put(`/api/clients/${id}`, data); }
  addClientComm(id, data) { return this.post(`/api/clients/${id}/communications`, data); }
  addClientNote(id, data) { return this.post(`/api/clients/${id}/notes`, data); }

  // Leads
  getLeads(params) { return this.get('/api/leads', params); }
  getLead(id) { return this.get(`/api/leads/${id}`); }
  createLead(data) { return this.post('/api/leads', data); }
  updateLead(id, data) { return this.put(`/api/leads/${id}`, data); }
  convertLead(id) { return this.post(`/api/leads/${id}/convert`); }
  deleteLead(id) { return this.del(`/api/leads/${id}`); }

  // Catalog
  getCategories() { return this.get('/api/catalog/categories'); }
  getServices(params) { return this.get('/api/catalog/services', params); }
  createService(data) { return this.post('/api/catalog/services', data); }
  updateService(id, data) { return this.put(`/api/catalog/services/${id}`, data); }
  createCategory(data) { return this.post('/api/catalog/categories', data); }

  // Invoices
  getInvoices(params) { return this.get('/api/invoices', params); }
  getInvoice(id) { return this.get(`/api/invoices/${id}`); }
  createInvoice(data) { return this.post('/api/invoices', data); }
  payInvoice(id, data) { return this.post(`/api/invoices/${id}/pay`, data); }

  // Subscriptions
  getSubscriptions(params) { return this.get('/api/subscriptions', params); }
  createSubscription(data) { return this.post('/api/subscriptions', data); }
  updateSubscription(id, data) { return this.put(`/api/subscriptions/${id}`, data); }

  // Partners
  getPartners() { return this.get('/api/partners'); }
  createPartner(data) { return this.post('/api/partners', data); }
  updatePartner(id, data) { return this.put(`/api/partners/${id}`, data); }

  // Team
  getTeam() { return this.get('/api/team'); }
  createUser(data) { return this.post('/api/team', data); }
  updateUser(id, data) { return this.put(`/api/team/${id}`, data); }

  // Portal Messages
  getOrderMessages(orderId) { return this.get(`/api/orders/${orderId}/messages`); }
  sendOrderMessage(orderId, data) { return this.post(`/api/orders/${orderId}/messages`, data); }

  // Settings
  getSettings() { return this.get('/api/settings'); }
  updateSetting(key, value) { return this.put(`/api/settings/${key}`, { value }); }
}

const api = new ApiClient();
export default api;
