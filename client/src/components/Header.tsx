import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaPlus, FaPalette, FaStar } from 'react-icons/fa';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                <FaPalette className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <FaStar className="text-white text-xs" />
              </div>
            </div>
            <div>
              <span className="font-black text-3xl text-blue-600">PortfolioGen</span>
              <div className="text-xs text-gray-500 font-medium">Create. Inspire. Connect.</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-600 shadow-lg' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <FaHome className="text-lg" />
              <span>Templates</span>
            </Link>
            
            <Link
              to="/professionals"
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                isActive('/professionals') 
                  ? 'bg-blue-100 text-blue-600 shadow-lg' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              <FaUsers className="text-lg" />
              <span>Professionals</span>
            </Link>
            
            <Link
              to="/form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-3"
            >
              <FaPlus className="text-lg" />
              <span>Create Portfolio</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 