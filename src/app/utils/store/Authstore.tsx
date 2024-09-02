import { create } from 'zustand';



export interface User {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
}

export interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<StoreState>((set) => {
  // Retrieve user from local storage on initialization
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;


  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    setUser: (user: User | null) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
      set({ user, isAuthenticated: !!user });
    },
    login: (user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      set({ user: null, isAuthenticated: false });
    },
  };
});

export default useAuthStore;
