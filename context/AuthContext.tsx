import { createContext } from 'react';
import { User } from '../Models/User';

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (changes: Partial<Pick<User, 'name' | 'avatarUrl'>>) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
