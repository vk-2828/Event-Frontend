import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 h-24 shadow-lg transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center h-full px-6">
        <Link to="/" className="text-3xl font-bold text-white">EventEase</Link>

        <div className="flex items-center space-x-6 text-xl">
          <Link to="/" className="text-white">Home</Link>
          {!user && <Link to="/signup" className="text-white">Signup</Link>}
          {!user && <Link to="/signin" className="text-white">Signin</Link>}
          {user?.role === 'organizer' && <Link to="/dashboard" className="text-white">Dashboard</Link>}
          {user && <button onClick={logout} className="bg-white text-purple-600 px-4 py-2 rounded-xl hover:bg-gray-200 transition">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;