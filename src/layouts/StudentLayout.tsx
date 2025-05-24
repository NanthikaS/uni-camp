import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { Student } from '../types';

const StudentLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;

  const navLinks = [
    { name: 'Dashboard', path: '/student' },
    { name: 'Enrolled Courses', path: '/student/enrolled-courses' },
    { name: 'Available Courses', path: '/student/available-courses' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar role="student" links={navLinks} />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;