import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({
  token,
  expenses,
  setExpenses,
  editingExpense,
  setEditingExpense
}) => {
  const blank = { title: '', amount: '', category: '', type: 'Need', date: '' };
  const [form, setForm] = useState(blank);

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        type: editingExpense.type,
        date: new Date(editingExpense.date).toISOString().substr(0, 10)
      });
    } else {
      setForm(blank);
    }
  }, [editingExpense]);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingExpense) {
      const res = await axios.put(
        `/api/expenses/${editingExpense._id}`,
        form,
        { headers: { 'x-auth-token': token } }
      );
      setExpenses(expenses.map(x => (x._id === res.data._id ? res.data : x)));
      setEditingExpense(null);
    } else {
      const res = await axios.post('/api/expenses', form, {
        headers: { 'x-auth-token': token }
      });
      setExpenses([...expenses, res.data]);
    }
    setForm(blank);
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setForm(blank);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col space-y-4
        bg-surface/20 dark:bg-surface-dark/20
        backdrop-blur-xl
        border border-surface/30 dark:border-surface-dark/30
        rounded-3xl shadow-lg
        p-6
      "
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {editingExpense ? 'Edit Expense' : 'Add Expense'}
      </h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
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
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
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
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
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

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="
          w-full p-2 rounded
          bg-surface/30 dark:bg-surface-dark/30
          backdrop-blur-xs
          border border-surface/20 dark:border-surface-dark/20
          text-gray-900 dark:text-gray-100
        "
      >
        <option>Need</option>
        <option>Want</option>
      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="
          w-full p-2 rounded
          bg-surface/30 dark:bg-surface-dark/30
          backdrop-blur-xs
          border border-surface/20 dark:border-surface-dark/20
          text-gray-900 dark:text-gray-100
        "
      />

      <div className="flex space-x-4">
        <button
          type="submit"
          className="
            flex-1 p-2 rounded
            bg-gradient-to-r from-primary to-secondary
            text-white font-semibold
            hover:shadow-xl transition-all
          "
        >
          {editingExpense ? 'Update' : 'Add'}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            className="
              flex-1 p-2 rounded
              bg-red-500 text-white
              hover:bg-red-600 transition-colors
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
