// services/authService.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

let currentUser: User | null = null;

export async function register(name: string, email: string, password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 800));
  currentUser = { id: `U-${Date.now()}`, name, email };
  return currentUser;
}

export async function login(email: string, password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 800));
  if (!email || !password) throw new Error('Correo y contraseña son obligatorios.');
  currentUser = { id: 'U-1', name: 'Viajero HonduTrip', email };
  return currentUser;
}

export async function logout(): Promise<void> {
  currentUser = null;
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  if (!currentUser) throw new Error('No hay sesión activa.');
  currentUser = { ...currentUser, ...data };
  return currentUser;
}
