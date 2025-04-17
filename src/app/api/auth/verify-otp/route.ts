import { NextResponse } from 'next/server';
import { z } from 'zod';

const verifyOTPSchema = z.object({
    otp: z.string().length(6),
    phoneNumber: z.string(),
    type: z.enum(['login', 'register']),
    password: z.string().min(6),
    name: z.string().optional(),
    entity: z.enum(['individual', 'company', 'organization']).optional(),
    promo_code: z.string().optional(),
    inviter: z.string().nullable().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = verifyOTPSchema.parse(body);

        // Verify OTP with your service
        const isValid = await verifyOTPWithService(validatedData.otp, validatedData.phoneNumber);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid OTP' },
                { status: 400 }
            );
        }

        if (validatedData.type === 'register') {
            // Handle registration
            // Create user account, etc.
            return NextResponse.json({
                redirectUrl: '/dashboard',
                message: 'Registration successful'
            });
        } else {
            // Handle login
            // Create session, etc.
            return NextResponse.json({
                redirectUrl: '/dashboard',
                message: 'Login successful'
            });
        }

    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { error: 'Verification failed' },
            { status: 500 }
        );
    }
}

async function verifyOTPWithService(otp: string, phoneNumber: string) {
    // Implement your OTP verification logic here
    return true; // Replace with actual verification
}