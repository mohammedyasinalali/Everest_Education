import { API_URL } from '../constants';

export const authService = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data as { token: string; admin: { id: number; email: string; role: string; permissions: string | null; languages: string | null } };
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  getToken: () => localStorage.getItem('adminToken'),

  isAuthenticated: () => !!localStorage.getItem('adminToken'),

  saveSession: (token: string, admin: { id: number; email: string; role: string; permissions: string | null; languages: string | null }) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(admin));
  },

  getCurrentAdmin: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },
};

const authHeaders = () => ({
  Authorization: `Bearer ${authService.getToken()}`,
});

// ─── Admins (RBAC) ────────────────────────────────────────────────────────────
export const adminService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/admins`, { headers: authHeaders() });
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_URL}/admins`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to create admin');
    return result;
  },
  update: async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update admin');
    return result;
  },
  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to delete admin');
    return result;
  },
};

// ─── Blogs ────────────────────────────────────────────────────────────────────
export const blogService = {
  getAll: async (page = 1, limit = 20) => {
    const res = await fetch(`${API_URL}/blogs?page=${page}&limit=${limit}`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, { headers: authHeaders() });
    return res.json();
  },

  create: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create blog');
    return data;
  },

  update: async (id: number, formData: FormData) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update blog');
    return data;
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete blog');
    return data;
  },
};

// ─── Universities ─────────────────────────────────────────────────────────────
export const universityService = {
  getAll: async (page = 1, limit = 20) => {
    const res = await fetch(`${API_URL}/universities?page=${page}&limit=${limit}`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/universities/${id}`, { headers: authHeaders() });
    return res.json();
  },

  create: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/universities`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create university');
    return data;
  },

  update: async (id: number, formData: FormData) => {
    const res = await fetch(`${API_URL}/universities/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update university');
    return data;
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/universities/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete university');
    return data;
  },
};

// ─── Requests ─────────────────────────────────────────────────────────────
export const requestService = {
  getAll: async (page = 1, limit = 20, status?: string, language?: string) => {
    let url = `${API_URL}/requests?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (language) url += `&language=${language}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.json();
  },

  updateStatus: async (id: number, status: string) => {
    const res = await fetch(`${API_URL}/requests/${id}/status`, {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update request status');
    return data;
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete request');
    return data;
  },
};

// ─── Specialties ─────────────────────────────────────────────────────────
export const specialtyService = {
  getAll: async (page = 1, limit = 20, category?: string, locale?: string) => {
    let url = `${API_URL}/specialties/admin/list?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (locale) url += `&locale=${locale}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/specialties/admin/${id}`, { headers: authHeaders() });
    return res.json();
  },

  create: async (specialtyData: any, imageFile?: File) => {
    const formData = new FormData();
    Object.keys(specialtyData).forEach(key => {
      if (specialtyData[key] !== undefined && specialtyData[key] !== null) {
        formData.append(key, String(specialtyData[key]));
      }
    });
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/specialties`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create specialty');
    return data;
  },

  update: async (id: number, specialtyData: any, imageFile?: File) => {
    const formData = new FormData();
    Object.keys(specialtyData).forEach(key => {
      if (specialtyData[key] !== undefined && specialtyData[key] !== null) {
        formData.append(key, String(specialtyData[key]));
      }
    });
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_URL}/specialties/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update specialty');
    return data;
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/specialties/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete specialty');
    return data;
  },
};
