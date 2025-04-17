"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { OTPInput } from '@/components/auth/otpInput';
import { useOTPVerification } from '@/hooks/useOTPVerification';
import { AuthFormData } from '@/types/auth';
import { Loader2 } from 'lucide-react';
import { SignInUser, SignUpUser } from '@/config/APIConfig';
import { getSession, useSession } from 'next-auth/react';
import { useAppContext } from '@/context/AppContext';
import { useToast } from "@/hooks/use-toast"
import { AtlasBackendApi } from "@/constants/atlas-backend-api"
import { FeaturedSlider } from "@/components/slides/FeaturedSlide"

const VerifyOTPPage = () => {
    const router = useRouter();
    const [authData, setAuthData] = useState<AuthFormData | null>(null);
    const [verifying, setVerifying] = useState(false);
    const { setUser } = useAppContext();
    // const [otpEmail, setOtpEmail] = useState('')
    const { data: session, status } = useSession();
    const [cachedEmail, setCachedEmail] = useState(localStorage.getItem('otpEmail') || '')


    const { toast } = useToast();


    // Get stored auth data on mount
    useEffect(() => {
        const storedData = sessionStorage.getItem('authData');
        if (!storedData) {
            router.replace('/login');
            return;
        }
        setAuthData(JSON.parse(storedData));
    }, [router]);

    const {
        isLoading,
        error,
        timeLeft,
        canResend,
        resendOTP,
        setError
    } = useOTPVerification(authData?.phoneNumber || '');

    const handleOTPComplete = useCallback(async (otp: string) => {
        if (!authData) return;

        try {
            setVerifying(true);
            setError(null);

            // Verify OTP and handle login/registration
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    otp,
                    type: authData.name ? 'register' : 'login',
                    ...(authData.name && { name: authData.name as string }),
                    ...authData,
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid OTP');
            }
            // save session
            let res: any;
            let userRole: any;
            if (authData.name) {
                res = await SignUpUser({
                    phoneNumber: authData.phoneNumber,
                    fullName: authData.name,
                    password: authData.password,
                    role: 'public',
                    entity: authData.entity as string,
                    email: cachedEmail,
                    inviter: authData.inviter as string,
                    promo_code: authData.promo_code as string
                });
            } else {
                res = await SignInUser({
                    phoneNumber: authData.phoneNumber,
                    password: authData.password,
                });
            }
            console.log('RESPONSE', res)
            if (res?.url) {
                const updatedSession: any = await getSession();
                setUser(updatedSession);
                userRole = updatedSession?.user?.userdata?.role;
                console.log("user role session", userRole);
                console.log("user status session", status);
                console.log("user access session", session?.user?.accesstokens);
                toast({ description: "OTP verified successfully. Redirecting..." });
            }

            // Clear stored auth data
            sessionStorage.removeItem('authData');

            // Redirect based on response
            const redirectUrl = userRole === 'admin' ? '/admin' : '/public';
            router.replace(redirectUrl);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed');
        } finally {
            setVerifying(false);
        }
    }, [authData, router, setError, cachedEmail, session?.user?.accesstokens, setUser, status, toast]);

    if (!authData) {
        return null; // or loading spinner
    }

    // return (
    //     <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-400">
    //         <div className="container mx-auto px-4 py-16">
    //             <div className="max-w-md mx-auto">
    //                 <div className="bg-white rounded-lg p-8 shadow-lg text-center">
    //                     <h1 className="text-2xl font-bold mb-6">Verify Your Phone Number</h1>

    //                     <p className="text-gray-600 mb-8">
    //                         Enter the 6-digit code sent to{' '}
    //                         <span className="font-semibold">{authData.phoneNumber}</span>
    //                     </p>

    //                     {error && (
    //                         <div className="mb-6 p-3 bg-red-50 text-red-500 rounded-lg">
    //                             {error}
    //                         </div>
    //                     )}

    //                     <OTPInput onComplete={handleOTPComplete} />

    //                     <div className="mt-8">
    //                         {verifying ? (
    //                             <div className="flex items-center justify-center text-green-600">
    //                                 <Loader2 className="animate-spin mr-2" />
    //                                 Verifying...
    //                             </div>
    //                         ) : (
    //                             <div className="text-gray-600">
    //                                 {canResend ? (
    //                                     <button
    //                                         onClick={resendOTP}
    //                                         disabled={isLoading}
    //                                         className="text-green-600 hover:text-green-700 font-medium focus:outline-none"
    //                                     >
    //                                         {isLoading ? (
    //                                             <span className="flex items-center">
    //                                                 <Loader2 className="animate-spin mr-2" />
    //                                                 Sending...
    //                                             </span>
    //                                         ) : (
    //                                             'Resend Code'
    //                                         )}
    //                                     </button>
    //                                 ) : (
    //                                     <p>
    //                                         Resend code in{' '}
    //                                         <span className="font-medium">{timeLeft}s</span>
    //                                     </p>
    //                                 )}
    //                             </div>
    //                         )}
    //                     </div>

    //                     <button
    //                         onClick={() => router.push('/login')}
    //                         className="mt-6 text-gray-500 hover:text-gray-700 focus:outline-none"
    //                     >
    //                         Back to Login
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div className="flex h-screen bg-gray-100 bg-auth-bg bg-no-repeat bg-cover">
            <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="p-8 md:w-1/2">
                        <div className="flex items-center mb-8">
                            <Image src="/img/logo.png" width={200} height={100} alt="Atlas Blockchain Ltd" />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Verify Your Phone Number / Email</h2>
                        <p className="text-gray-600 mb-8">
                            Enter the 6-digit code sent to{' '}
                            <span className="font-semibold">{authData.phoneNumber}</span>
                        </p>
                        {error && (
                            <div className="mb-6 p-3 bg-red-50 text-red-500 rounded-lg">
                                {error}
                            </div>
                        )}

                        <OTPInput onComplete={handleOTPComplete} />

                        <div className="my-10">
                            {verifying ? (
                                <div className="flex items-center justify-center text-green-600">
                                    <Loader2 className="animate-spin mr-2" />
                                    Verifying...
                                </div>
                            ) : (
                                <div className="text-gray-600 text-center">
                                    {canResend ? (
                                        <>
                                            <button
                                                onClick={resendOTP}
                                                disabled={isLoading}
                                                className="text-green-600 hover:text-green-700 font-medium focus:outline-none"
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center">
                                                        <Loader2 className="animate-spin mr-2" />
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    'Resend Code'
                                                )}
                                            </button>
                                            <h1 className="text-center mt-4">Send OTP to Email</h1>
                                            <form
                                                className="flex items-center justify-center mt-4 md:w-9/12 mx-auto"
                                                onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    const email = (e.target as HTMLFormElement).email.value;
                                                    try {
                                                        const response = await fetch(`${AtlasBackendApi}/otp/africa/send-otp`, {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                email_address: email,
                                                                countryCode: "254",
                                                            }),
                                                        });
                                                        if (!response.ok) {
                                                            throw new Error('Failed to send OTP');
                                                        }
                                                        if (window) {
                                                            localStorage.setItem('otpEmail', email);
                                                        }
                                                        console.log('OTP sent successfully');
                                                        (e.target as HTMLFormElement).reset();
                                                        toast({ description: 'OTP sent successfully to your email.' });
                                                    } catch (error) {
                                                        console.error('Error sending OTP:', error);
                                                    }
                                                }}
                                            >
                                                <Input
                                                    name="email"
                                                    value={cachedEmail}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="rounded-none"
                                                    onChange={(e) => setCachedEmail(e.target.value)}
                                                />
                                                <Button type="submit" className="rounded-none px-2 py-[6px]">Send OTP</Button>
                                            </form>
                                        </>
                                    ) : (
                                        <p>
                                            Resend code in{' '}
                                            <span className="font-medium">{timeLeft}s</span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <p className="mt-8 text-center">
                            <Link href="/login" className="text-[#258C4E] hover:underline">
                                Back to login
                            </Link>
                        </p>
                    </div>
                    <FeaturedSlider />
                </div>
            </div>
        </div>
    )
};

export default VerifyOTPPage;