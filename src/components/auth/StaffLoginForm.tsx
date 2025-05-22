'use client';

import { useState } from 'react';

export default function StaffLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'خطا در ورود کارمند');
      } else {
        setMessage(data.message || 'ورود کارمند موفقیت‌آمیز');
        // اینجا می‌توانید کارمند را به صفحه داشبورد یا مدیریت هدایت کنید
        console.log('Staff user logged in:', data.staffUser);
        setFormData({ email: '', password: '' }); // پاک کردن فرم
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">ورود کارکنان</h2>
      <div>
        <label htmlFor="staff-email" className="block text-sm font-medium text-gray-700">ایمیل:</label>
        <input
          type="email"
          id="staff-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="staff-password" className="block text-sm font-medium text-gray-700">رمز عبور:</label>
        <input
          type="password"
          id="staff-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'در حال ورود...' : 'ورود کارکنان'}
      </button>
      {message && <p className="mt-2 text-sm text-green-600 text-center">{message}</p>}
      {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
    </form>
  );
} 