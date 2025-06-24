import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import DarkModeToggle from './components/DarkModeToggle';
import AuthForm from './components/AuthForm';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [greeting, setGreeting] = useState('');

  // Fetch user’s expenses
  useEffect(() => {
    if (token) {
      axios
        .get('/api/expenses', { headers: { 'x-auth-token': token } })
        .then(res => setExpenses(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
  }, [token]);

  // Time‐based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let greet = 'Hello';
    if (hour < 12) greet = 'Good morning';
    else if (hour < 17) greet = 'Good afternoon';
    else if (hour < 21) greet = 'Good evening';
    else greet = 'Good night';
    setGreeting(greet);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return <AuthForm setToken={setToken} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-transparent flex flex-col items-center py-10 px-4"
      >
        <DarkModeToggle />

        <div
          className="
            w-full max-w-4xl
            bg-surface/20 dark:bg-surface-dark/20
            backdrop-blur-xl
            border border-surface/30 dark:border-surface-dark/30
            rounded-3xl shadow-2xl
            py-8 px-6
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1
              className="
                text-4xl font-semibold
                bg-clip-text text-transparent
                bg-gradient-to-r from-primary to-secondary
                leading-snug
                filter drop-shadow-lg
              "
            >
              {greeting}! 👋
            </h1>
            <button
              onClick={handleLogout}
              className="
                px-4 py-2 bg-red-500 text-white rounded-lg
                hover:bg-red-600 transition-colors shadow-md hover:shadow-lg
              "
            >
              Logout
            </button>
          </div>

          {/* Subtitle */}
          <h2 className="text-lg opacity-80 mb-8 text-gray-800 dark:text-gray-200">
            Let’s make your money work for you 💸
          </h2>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpenseForm
              token={token}
              expenses={expenses}
              setExpenses={setExpenses}
              editingExpense={editingExpense}
              setEditingExpense={setEditingExpense}
            />
            <ExpenseList
              expenses={expenses}
              setExpenses={setExpenses}
              setEditingExpense={setEditingExpense}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
