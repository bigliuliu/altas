import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormField } from '../ui/authFormField';
import { PasswordInput } from './passwordInput';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, registerSchema } from '@/utils/validation';
import { LoginFormData, RegisterFormData } from '@/types/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AuthFormProps {
    type: 'login' | 'register';
    onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
    inviterCode?: string | null;
}

export const AuthForm: React.FC<AuthFormProps> = React.memo(({ type, onSubmit, inviterCode }) => {
    const { isLoading, error, clearError } = useAuth();

    const methods = useForm<LoginFormData | RegisterFormData>({
        resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
        defaultValues: type === 'login'
            ? {
                phoneNumber: '',
                password: '',
            }
            : {
                phoneNumber: '',
                password: '',
                name: '',
                email: '',
                entity: 'individual' as const,
                promo_code: '',
                inviter: inviterCode || null,
            },
    });

    const handleSubmit = useCallback(async (data: LoginFormData | RegisterFormData) => {
        clearError();
        await onSubmit(data);
    }, [clearError, onSubmit]);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="w-full max-w-md space-y-6 bg-white"
            >
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg">{error}</div>
                )}

                {type === 'register' && (
                    <>
                        <Select
                            required
                            {...methods.register('entity')}
                        >
                            <SelectTrigger className="w-full rounded-none">
                                <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="company">Company</SelectItem>
                            </SelectContent>
                        </Select>
                        <AuthFormField
                            name="name"
                            label="Full Name"
                            required
                        />
                    </>
                )}

                <AuthFormField
                    name="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    required
                />

                <div className="space-y-2">
                    <label className="text-gray-600 font-semibold">Password</label>
                    <PasswordInput
                        register={methods.register('password')}
                        error={methods.formState.errors.password?.message as string}
                    />
                </div>

                {type === 'login' && (
                    <>
                        <div className="flex justify-end">
                            <Link href="/password-recovery" className="text-sm text-[#258C4E] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                    </>
                )}

                {type === 'register' && (
                    <>
                        <AuthFormField
                            name="email"
                            label="Email Address"
                            required
                            type="email"
                        />
                        <AuthFormField
                            name="promo_code"
                            label="Promo Code"
                            placeholder="Optional"
                        />
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-sm bg-green-600 text-white font-medium
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
            focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2" />
                            {type === 'login' ? 'Signing in...' : 'Creating account...'}
                        </div>
                    ) : (
                        type === 'login' ? 'Sign In' : 'Create Account'
                    )}
                </button>
            </form>
        </FormProvider>
    );
});

AuthForm.displayName = 'AuthForm';