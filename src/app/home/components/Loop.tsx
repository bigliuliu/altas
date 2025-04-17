import { AtlasBackendApi } from '@/constants/atlas-backend-api';
import { LoaderIcon } from 'lucide-react';
import React, { useState } from 'react';

const Loop = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${AtlasBackendApi}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thanks for subscribing!');
        setFormData({ name: '', email: '' });
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-4xl font-bold text-green-600 text-center mb-2">
        Stay in the loop
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Sign up to our monthly newsletter to receive updates
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isLoading ? (
              <LoaderIcon className='mx-1 animate-spin' />
            ) : (
              <svg
                className="w-6 h-6 text-green-600 hover:text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {message && (
        <p className={`mt-4 text-center ${message.includes('error') || message.includes('failed')
          ? 'text-red-600'
          : 'text-green-600'
          }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loop;