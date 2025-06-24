import React from 'react';
import axios from 'axios';

const ExpenseList = ({ expenses, setExpenses, setEditingExpense }) => {
  const deleteExp = async id => {
    await axios.delete(`/api/expenses/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') }
    });
    setExpenses(expenses.filter(e => e._id !== id));
  };

  return (
    <div
      className="
        overflow-y-auto max-h-[60vh]
        bg-surface/20 dark:bg-surface-dark/20
        backdrop-blur-xl
        border border-surface/30 dark:border-surface-dark/30
        rounded-3xl shadow-lg
        p-6
        space-y-4
      "
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Your Expenses
      </h3>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No expenses yet.
        </p>
      ) : (
        expenses.map(exp => (
          <div
            key={exp._id}
            className="
              flex justify-between items-center p-4
              bg-surface/15 dark:bg-surface-dark/15
              backdrop-blur-md
              border border-surface/20 dark:border-surface-dark/20
              rounded-2xl
              hover:shadow-2xl
              transform hover:-translate-y-1 hover:scale-105
              transition-all duration-200
            "
          >
            <div
              onClick={() => setEditingExpense(exp)}
              className="cursor-pointer"
            >
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                {exp.title}
              </h4>
              <p className="text-sm opacity-80 text-gray-600 dark:text-gray-400">
                {exp.category} • {new Date(exp.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                ₹{exp.amount}
              </span>
              <button
                onClick={() => deleteExp(exp._id)}
                className="
                  p-2 rounded-full
                  hover:shadow-lg hover:shadow-red-400/50
                  transition-shadow
                "
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
