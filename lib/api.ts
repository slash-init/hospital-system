// API client utilities
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') {
    return {
      'Content-Type': 'application/json',
    };
  }
  
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiError(response.status, error.error || 'Request failed');
  }

  // Handle empty response bodies
  const text = await response.text();
  if (!text) {
    return {} as T;
  }
  
  return JSON.parse(text);
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (data: { name: string; email: string; password: string; role: string }) =>
    fetchApi<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Patients API
export const patientsApi = {
  getAll: () => fetchApi<any[]>('/api/patients'),
  getMe: () => fetchApi<any>('/api/patients?me=true'),
  create: (data: { age: number; gender: string; phone: string }) =>
    fetchApi<any>('/api/patients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Doctors API
export const doctorsApi = {
  getAll: () => fetchApi<any[]>('/api/doctors'),
  create: (data: { specialization: string; department: string }) =>
    fetchApi<any>('/api/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => fetchApi<any[]>('/api/appointments'),
  getMyPatientAppointments: () => fetchApi<any[]>('/api/appointments?me=patient'),
  getMyDoctorAppointments: (date?: string) => 
    fetchApi<any[]>(`/api/appointments?me=doctor${date ? `&date=${encodeURIComponent(date)}` : ''}`),
  create: (data: { date: string; doctorId: string }) =>
    fetchApi<any>('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (data: { id: string; status: string }) =>
    fetchApi<any>('/api/appointments', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
