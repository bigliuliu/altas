"use client"

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/authForm';
import { LoginFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import Image from "next/image"
import Link from "next/link"
import { FeaturedSlider } from '@/components/slides/FeaturedSlide';

const LoginPage = () => {
    const router = useRouter();
    const { handleOTPRequest } = useAuth();

    const handleSubmit = useCallback(async (data: LoginFormData) => {
        const success = await handleOTPRequest(data.phoneNumber);
        if (success) {
            sessionStorage.setItem('authData', JSON.stringify(data));
            router.push('/verify-otp');
        }
    }, [handleOTPRequest, router]);


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="p-8 md:w-1/2">
                        <div className="flex items-center mb-8">
                            <Image src="/img/logo.png" width={200} height={100} alt="Atlas Blockchain Ltd" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Log in</h2>
                        <p className="text-gray-600 mb-8">
                            Welcome back! please put your login credentials below to start using the app
                        </p>
                        <AuthForm type="login" onSubmit={handleSubmit} />
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-[#258C4E] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    <FeaturedSlider />
                </div>
            </div>
        </div>
    )
};

export default LoginPage;