import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-primary font-header font-bold text-xl">
                Emergency Planner
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden flex justify-end items-center sm:ml-6 sm:flex sm:space-x-8">
              {user ? (
                <>
                  <Link
                    to="/my-plans"
                    className="text-gray-700 hover:text-primary px-3 py-2 font-medium"
                  >
                    My Plans
                  </Link>
                  <Link
                    to="/my-recommendations"
                    className="text-gray-700 hover:text-primary px-3 py-2 font-medium"
                  >
                    My Recommendations
                  </Link>
                </>
              ) : (
                <Link
                  to="/recommendations"
                  className="text-gray-700 hover:text-primary px-3 py-2 font-medium"
                >
                  Recommendations
                </Link>
              )}
            </div>
          </div>

          {/* Auth section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative ml-3 flex items-center space-x-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary"
                >
                  <span>👤</span>
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-primary px-3 py-2 font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link
                  to="/my-plans"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                >
                  My Plans
                </Link>
                <Link
                  to="/my-recommendations"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                >
                  My Recommendations
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/recommendations"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                >
                  Recommendations
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 