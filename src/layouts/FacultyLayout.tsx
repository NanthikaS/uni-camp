import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { Faculty } from '../types';

const FacultyLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;

  const navLinks = [
    { name: 'Dashboard', path: '/faculty' },
    { name: 'Courses', path: '/faculty/courses' },
    { name: 'Students', path: '/faculty/students' },
    { name: 'Attendance', path: '/faculty/attendance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar role="faculty" links={navLinks} />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default FacultyLayout;