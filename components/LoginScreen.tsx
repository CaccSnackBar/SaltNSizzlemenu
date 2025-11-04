import React, { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e8e2] flex flex-col justify-center items-center p-4">
        <div className="text-center mb-8">
            <h1 className="font-brand text-5xl md:text-7xl text-gray-800 tracking-wider">SALT & SIZZLE</h1>
            <p className="mt-2 text-xl text-gray-700">Admin Login</p>
        </div>
        <div className="w-full max-w-sm bg-white/50 p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        required
                        autoFocus
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-[#e0e8e2]"
                    >
                        Enter Admin Mode
                    </button>
                </div>
            </form>
             <div className="mt-6 text-center">
                <a 
                    href={window.location.pathname}
                    className="font-medium text-sm text-gray-600 hover:text-gray-800"
                >
                    ← Go back to public menu
                </a>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;
