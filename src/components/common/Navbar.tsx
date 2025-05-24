import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  role: 'student' | 'faculty' | 'admin';
  links: { name: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ role, links }) => {
  const { currentUser, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigateToProfile = () => {
    if (role === 'student') {
      navigate('/student/profile');
    } else if (role === 'faculty') {
      navigate('/faculty/profile');
    } else if (role === 'admin') {
      // Admin doesn't have a profile page according to requirements
      return;
    }
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={`/${role}`} className="flex-shrink-0">
              <h1 className="text-white text-xl font-semibold">
                {role.charAt(0).toUpperCase() + role.slice(1)} Portal
              </h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center max-w-xs bg-blue-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  {currentUser?.profilePicture ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <span className="ml-2 text-white hidden lg:block">
                    {currentUser?.name}
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 text-white" />
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    {role !== 'admin' && (
                      <button
                        onClick={navigateToProfile}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="bg-blue-600 p-1 rounded-full text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            >
              {currentUser?.profilePicture ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isProfileOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {role !== 'admin' && (
              <button
                onClick={navigateToProfile}
                className="w-full text-left text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;