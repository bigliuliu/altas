"use client"
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/components/auth/authForm';
import { LoginFormData, RegisterFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { FeaturedSlider } from '@/components/slides/FeaturedSlide';

const RegisterPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inviterCode = searchParams.get('invite');
    const { handleOTPRequest } = useAuth();

    const handleSubmit = useCallback(async (data: RegisterFormData | LoginFormData) => {
        if (window) {
            localStorage.setItem('otpEmail', data.email as string);
        }
        const success = await handleOTPRequest(data.phoneNumber);
        if (success) {
            sessionStorage.setItem('authData', JSON.stringify(data));
            router.push('/verify-otp');
        }
    }, [handleOTPRequest, router]);
    


    // return (
    //     <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400">
    //         <div className="container mx-auto px-4 py-16">
    //             <div className="max-w-md mx-auto text-center text-white mb-8">
    //                 <h1 className="text-4xl font-bold mb-4">Create an Atlas Account</h1>
    //                 <p className="text-lg">
    //                     First blockchain powered land titles registry By Kenyans for Kenya!
    //                 </p>
    //             </div>

    //             <AuthForm
    //                 type="register"
    //                 onSubmit={handleSubmit}
    //                 inviterCode={inviterCode}
    //             />
    //         </div>
    //     </div>
    // );
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="p-8 md:w-1/2">
                        <div className="flex items-center mb-8">
                            <Image src="/img/logo.png" width={150} height={100} alt="Atlas Blockchain Ltd" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Create account</h2>
                        <p className="text-gray-600 mb-8">
                            Get access to exclusive features by creating an account
                        </p>
                        <AuthForm
                            type="register"
                            onSubmit={handleSubmit}
                            inviterCode={inviterCode}
                        />
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#258C4E] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <FeaturedSlider />
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;