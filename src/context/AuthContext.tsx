import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Student, Faculty, Admin } from '../types';
import { mockStudents, mockFaculty, mockAdmin } from '../data/mockData';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AuthContextType {
  currentUser: User | Student | Faculty | Admin | null;
  login: (email: string, password: string) => Promise<{ role: string; userId: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User | Student | Faculty | Admin>) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => ({ role: '', userId: '' }),
  logout: () => {},
  isAuthenticated: false,
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | Student | Faculty | Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string) => {
    try {
      const { data: credentials, error } = await supabase
        .from('credentials')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !credentials) {
        throw new Error('Invalid credentials');
      }

      // In a real app, you would verify the password hash here
      if (credentials.password !== password) {
        throw new Error('Invalid credentials');
      }

      let user: User | Student | Faculty | Admin | null = null;

      if (credentials.role === 'student') {
        user = mockStudents.find(s => s.id === credentials.user_id) || mockStudents[0];
      } else if (credentials.role === 'faculty') {
        user = mockFaculty.find(f => f.id === credentials.user_id) || mockFaculty[0];
      } else if (credentials.role === 'admin') {
        user = mockAdmin;
      }

      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        return { role: credentials.role, userId: credentials.user_id };
      }

      throw new Error('User not found');
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User | Student | Faculty | Admin>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};