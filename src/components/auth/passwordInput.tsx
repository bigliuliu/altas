import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  register: any;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ register, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        {...register}
        className="w-full px-4 py-2 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <Eye className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
