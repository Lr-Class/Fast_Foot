import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Lock, Store } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials against a backend
    if (username === 'admin' && password === 'admin') {
      setAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
            
            <Link
              to="/"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Store className="w-4 h-4" />
              Back to Store
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
