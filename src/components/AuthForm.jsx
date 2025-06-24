import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const toggle = () => {
    setError('');
    setIsLogin(!isLogin);
  };

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(endpoint, form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div
        className="
          w-full max-w-md p-8
          bg-surface/20 dark:bg-surface-dark/20
          backdrop-blur-xl
          border border-surface/30 dark:border-surface-dark/30
          rounded-3xl shadow-2xl
        "
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
              w-full p-2 rounded
              bg-surface/30 dark:bg-surface-dark/30
              backdrop-blur-xs
              border border-surface/20 dark:border-surface-dark/20
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              hover:shadow-md transition-shadow
            "
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full p-2 rounded
              bg-surface/30 dark:bg-surface-dark/30
              backdrop-blur-xs
              border border-surface/20 dark:border-surface-dark/20
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              hover:shadow-md transition-shadow
            "
          />

          <button
            type="submit"
            className="
              w-full p-2 rounded
              bg-gradient-to-r from-primary to-secondary
              text-white font-semibold
              hover:shadow-xl transition-all
            "
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : 'Already have one?'}{' '}
          <button onClick={toggle} className="text-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
