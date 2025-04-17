'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ExternalLinkIcon, Loader2, Loader2Icon, MailOpen } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AtlasBackendApi } from "@/constants/atlas-backend-api"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from "react-hook-form"
import { SendPasswordReset } from "@/config/APIConfig"
import { useToast } from "@/hooks/use-toast"
import { FeaturedSlider } from "@/components/slides/FeaturedSlide"


export default function Component() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [formLoading, setFormLoading] = useState(false);
    const [otpIsSent, setOTPIsSent] = useState(false);
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [showPasswordForm, setShowPasswordChangeForm] = useState(false);
    const { toast } = useToast();

    const {
        register: registerResetPassword,
        handleSubmit: handleSubmitResetPassword,
        setValue: setResetPasswordValue,
        formState: { errors: errorsResetPassword, isSubmitting: isResetPasswordSubmitting },
        control: controlResetPassword,
    } = useForm();

    const slides = [
        { imageSrc: "/placeholder.svg?height=240&width=320", title: "Powerful Integrations", description: "Connect your favorite tools and automate your workflow with our easy-to-use platform." },
        { imageSrc: "/placeholder.svg?height=240&width=320", title: "Real-time Collaboration", description: "Work together with your team in real-time, making integration development faster and more efficient." },
    ]


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).email.value;
        setFormLoading(true);

        if (window) {
            localStorage.setItem('last_otp_email', email);
        }

        // Assuming you have a function to send OTP
        await sendOTP(email)
            .then(async (response: Response) => {
                const data = await response.json();
                if (data.success) {
                    console.log("OTP sent successfully");
                    setOTPIsSent(true);
                    // You can add more logic here, like redirecting the user or showing a success message
                } else {
                    console.error("Failed to send OTP");
                    toast({ description: data.message })
                    // Handle error, maybe show an error message to the user
                }
            })
            .catch(error => {
                console.error("Error sending OTP:", error);
                // Handle error, maybe show an error message to the user
            })
            .finally(() => {
                setFormLoading(false);
            })
    };

    const sendOTP = async (email: string) => {
        return await fetch(`${AtlasBackendApi}/otp/africa/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email_address: email,
                countryCode: "254",
            }),
        });

    }

    const handleOTPSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const otp = (event.target as HTMLFormElement).otp.value;
        setVerifyOTP(true);

        try {
            const response = await fetch(`${AtlasBackendApi}/otp/africa/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp,
                    email_address: localStorage.getItem('last_otp_email'),
                }),
            });

            const data = await response.json();
            console.log(data)
            if (data.isOTPCodeValid) {
                console.log("OTP verified successfully");
                setOTPIsSent(false);
                setShowPasswordChangeForm(true);
                // Add logic for successful OTP verification, like redirecting the user
            } else {
                console.error("Failed to verify OTP");
                toast({ description: data.message })
                // Handle error, maybe show an error message to the user
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            // Handle error, maybe show an error message to the user
        } finally {
            setVerifyOTP(false);
        }
    };

    const onSubmitResetPassword = async (data: any) => {
        // onsumbit ResetPassword logic
        const res = await SendPasswordReset({
            email: localStorage.getItem('last_otp_email') as string,
            newPassword: data.newPassword,
        });

        console.log(res)
        if (res?.status === 202) {
            console.log("Password reset successful");
            setShowPasswordChangeForm(false);
            toast({ description: "Password reset successful. redirecting to login" });
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } else {
            console.error("Failed to reset password");
            const errorData = res ? await res.json() : { message: "An error occurred while resetting the password" };
            toast({ description: errorData.message });
        }


    };

    return (
        <div className="flex h-screen bg-auth-bg bg-no-repeat bg-cover">
            <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl w-full">
                <div className="flex flex-col md:flex-row">
                    <div className="p-8 md:w-1/2">
                        <div className="flex items-center mb-8">
                            <Image src="/img/logo.png" width={200} height={100} alt="Atlas Blockchain Ltd" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Reset your Account Password</h2>

                        {otpIsSent && !showPasswordForm &&
                            <>
                                <p className="text-gray-600 mb-8">
                                    Enter the OTP Code sent to your Email.
                                </p>
                                <form onSubmit={handleOTPSubmit}>
                                    <div className="w-full flex justify-center py-4">
                                        <InputOTP maxLength={6} name="otp">
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} className="p-2 text-lg border-[#258C4E]" />
                                                <InputOTPSlot index={1} className="p-2 text-lg border-[#258C4E]" />
                                                <InputOTPSlot index={2} className="p-2 text-lg border-[#258C4E]" />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} className="p-2 text-lg border-[#258C4E]" />
                                                <InputOTPSlot index={4} className="p-2 text-lg border-[#258C4E]" />
                                                <InputOTPSlot index={5} className="p-2 text-lg border-[#258C4E]" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="flex items-center w-full bg-[#258C4E] hover:bg-[#258C4E]/80 flex items-center justify-center mt-4"
                                    >
                                        Verify
                                        {verifyOTP && (
                                            <Loader2Icon className="mx-1 animate-spin" />
                                        )}
                                    </Button>
                                </form>
                                <div className="flex items-center mt-10 space-x-4">
                                    <Button
                                        variant={'outline'}
                                        className="hover:border-red-600 font-medium py-2 px-4 rounded flex items-center"
                                        onClick={() => window.open('https://mail.google.com', '_blank')}
                                    >
                                        <MailOpen size={15} className="mx-1" />
                                        Open Gmail
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className="hover:border-blue-600 font-medium py-2 px-4 rounded flex justify-center items-center"
                                        onClick={() => window.open('https://outlook.live.com', '_blank')}
                                    >
                                        <MailOpen size={15} className="mx-1" />
                                        Open Outlook
                                    </Button>
                                </div>
                            </>
                        }{!otpIsSent && !showPasswordForm &&
                            <>
                                <p className="text-gray-600 mb-8">
                                    Please fill in the email you&apos;ve used to create your account and we&apos;ll send you a code
                                </p>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" placeholder="hello@semilfat.studio" />
                                    </div>
                                    <Button className="w-full bg-[#258C4E] hover:bg-[#258C4E]/80 flex items-center">
                                        Send OTP
                                        {formLoading && (
                                            <Loader2 className="mx-1 animate-spin" />
                                        )}
                                    </Button>
                                </form>
                            </>
                        }
                        {!otpIsSent && showPasswordForm &&
                            <>
                                <form
                                    className="flex flex-col justify-around"
                                    onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
                                >
                                    <label
                                        htmlFor="otpcode"
                                        className="text-black font-semibold mb-2"
                                    >
                                        Enter New Password
                                    </label>
                                    <input
                                        {...registerResetPassword("newPassword", {
                                            required: " This is required ",
                                        })}
                                        id=""
                                        type="text"
                                        placeholder="New Password"
                                        className="my-2 flex justify-around border border-gray-300 bg-white rounded-md py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                                    />

                                    <label
                                        htmlFor="otpcode"
                                        className="text-black font-semibold mb-2"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        {...registerResetPassword("confirmPassword", {
                                            required: " This is required ",
                                        })}
                                        id=""
                                        type="text"
                                        placeholder="Confirm Password"
                                        className="my-2 flex justify-around border border-gray-300 bg-white rounded-md py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                                    />
                                    <button
                                        type="submit"
                                        className="mt-2 bg-[#258C4E] text-white font-semibold rounded-lg p-3 flex justify-center items-center"
                                    >
                                        Reset Password
                                        {isResetPasswordSubmitting &&
                                            <Loader2 className="mx-1 animate-spin" />
                                        }
                                    </button>
                                </form>
                            </>
                        }
                        <p className="mt-10 text-center">
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
}