import { useState, useCallback } from 'react';
import { SendAfricaOTP } from '@/config/APIConfig';
import { AuthFormData } from '@/types/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOTPRequest = useCallback(async (phoneNumber: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await SendAfricaOTP({ phoneNumber });
            if (res && res.status === 200) {
                return true;
            } else {
                setError('Failed to send OTP. Please try again.');
                return false;
            }
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { isLoading, error, handleOTPRequest, clearError };
};