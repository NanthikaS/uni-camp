import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Student, Faculty, Admin } from '../types';
import { mockStudents, mockFaculty, mockAdmin } from '../data/mockData';

interface AuthContextType {
  currentUser: User | Student | Faculty | Admin | null;
  login: (role: 'student' | 'faculty' | 'admin', userId?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User | Student | Faculty | Admin>) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | Student | Faculty | Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (role: 'student' | 'faculty' | 'admin', userId?: string) => {
    let user: User | Student | Faculty | Admin | null = null;

    // For demo purposes, select the first user of the specified role
    if (role === 'student') {
      user = userId ? mockStudents.find(s => s.id === userId) || mockStudents[0] : mockStudents[0];
    } else if (role === 'faculty') {
      user = userId ? mockFaculty.find(f => f.id === userId) || mockFaculty[0] : mockFaculty[0];
    } else if (role === 'admin') {
      user = mockAdmin;
    }

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
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