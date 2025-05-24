import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { Admin } from '../types';

const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const admin = currentUser as Admin;

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Faculty', path: '/admin/faculty' },
    { name: 'Students', path: '/admin/students' },
    { name: 'Courses', path: '/admin/courses' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar role="admin" links={navLinks} />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;