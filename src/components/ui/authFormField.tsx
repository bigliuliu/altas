import React from 'react';
import { useFormContext } from 'react-hook-form';

interface AuthFormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export const AuthFormField: React.FC<AuthFormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col items-start space-y-1">
      <label htmlFor={name} className="text-gray-600 font-semibold">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
