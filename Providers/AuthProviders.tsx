import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ViewReact } from '../Models/ViewReact';
import { User } from '../Models/User';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../Services/authService';

export default function AuthProvider({ children }: ViewReact) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Al arrancar la app, revisa si ya había una sesión guardada (token)
  // y la valida contra el backend.
  useEffect(() => {
    (async () => {
      try {
        const current = await authService.getCurrentUser();
        setUser(current);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo iniciar sesión.';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo crear la cuenta.';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (changes: Partial<Pick<User, 'name' | 'avatarUrl'>>) => {
    setError(null);
    try {
      const updated = await authService.updateProfile(changes);
      setUser(updated);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo actualizar el perfil.';
      setError(message);
      throw new Error(message);
    }
  };

  // Mientras se valida la sesión guardada, mostramos un loader en vez de
  // parpadear a la pantalla de Welcome y luego saltar a Home.
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#1E5C8A" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext)!;
};
