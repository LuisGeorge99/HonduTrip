// Services/authService.ts
// Consume el backend real (Node/Express) de HondurTrip para
// registro, login y perfil. Reemplaza el mock que usaban otras ramas.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './apiConfig';
import type { User } from '../Models/User';

const TOKEN_KEY = 'hondutrip_token';

interface AuthResponse {
  token: string;
  user: User;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || 'Ocurrió un error inesperado. Intenta de nuevo.');
  }

  return data as T;
}

export async function register(name: string, email: string, password: string): Promise<User> {
  const data = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  await AsyncStorage.setItem(TOKEN_KEY, data.token);
  return data.user;
}

export async function login(email: string, password: string): Promise<User> {
  const data = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await AsyncStorage.setItem(TOKEN_KEY, data.token);
  return data.user;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const data = await request<{ user: User }>('/auth/me');
    return data.user;
  } catch {
    // Token inválido o expirado: limpiamos la sesión guardada.
    await AsyncStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export async function updateProfile(changes: Partial<Pick<User, 'name' | 'avatarUrl'>>): Promise<User> {
  const data = await request<{ user: User }>('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(changes),
  });
  return data.user;
}
