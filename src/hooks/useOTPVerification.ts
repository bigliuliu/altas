import { useState, useCallback, useEffect } from 'react';
import { SendAfricaOTP } from '@/config/APIConfig';

const RESEND_TIMEOUT = 10; // 10 seconds timeout

export const useOTPVerification = (phoneNumber: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const resendOTP = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await SendAfricaOTP({ phoneNumber });

            if (response && response.status === 200) {
                setTimeLeft(RESEND_TIMEOUT);
                setCanResend(false);
            } else {
                throw new Error('Failed to send OTP');
            }
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [phoneNumber]);

    return {
        isLoading,
        error,
        timeLeft,
        canResend,
        resendOTP,
        setError,
    };
};
