import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, UserCog } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role: 'student' | 'faculty' | 'admin') => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-center">University Portal System</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to University Portal</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access your personalized dashboard by selecting your role below
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Student Card */}
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer border border-gray-200 hover:border-blue-500"
            onClick={() => handleRoleSelect('student')}
          >
            <div className="p-8 flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Portal</h3>
              <p className="text-gray-600 text-center">
                Access your courses, assignments, and track your academic progress
              </p>
            </div>
            <div className="bg-blue-600 py-3 text-center">
              <span className="text-white font-medium">Enter as Student</span>
            </div>
          </div>

          {/* Faculty Card */}
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer border border-gray-200 hover:border-green-500"
            onClick={() => handleRoleSelect('faculty')}
          >
            <div className="p-8 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Faculty Portal</h3>
              <p className="text-gray-600 text-center">
                Manage your courses, track student performance, and record attendance
              </p>
            </div>
            <div className="bg-green-600 py-3 text-center">
              <span className="text-white font-medium">Enter as Faculty</span>
            </div>
          </div>

          {/* Admin Card */}
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer border border-gray-200 hover:border-purple-500"
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="p-8 flex flex-col items-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserCog className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Portal</h3>
              <p className="text-gray-600 text-center">
                Manage faculty, students, courses, and oversee the entire system
              </p>
            </div>
            <div className="bg-purple-600 py-3 text-center">
              <span className="text-white font-medium">Enter as Admin</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">© 2025 University Portal System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;