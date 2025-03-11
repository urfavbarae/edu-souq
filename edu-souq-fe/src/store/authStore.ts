import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  tokens: number;
  bio?: string;
  profilePicture?: string;
  language?: string;
  darkMode?: boolean;
  twoFactorAuth?: boolean;
  notifications?: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (userData) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  })),
}));