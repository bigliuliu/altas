export interface BaseAuthFormData {
    phoneNumber: string;
    password: string;
    name?: string;
    entity?: 'individual' | 'company' | 'organization';
    promo_code?: string;
    inviter?: string | null;
    email?: string;
}

export interface LoginFormData extends BaseAuthFormData { }

export interface RegisterFormData extends BaseAuthFormData {
    name: string;
    entity: 'individual' | 'company' | 'organization';
    promo_code?: string;
    inviter?: string | null;
    email?: string;
}

export type AuthFormData = RegisterFormData | LoginFormData;


export interface TokenPayload {
    accesstokens: string;
    userdata?: {
        role?: string;
    };
}

export interface OTPResponse {
    status: number;
    message: string;
}

export interface OTPVerificationData {
    otp: string;
    phoneNumber: string;
    type: 'login' | 'register';
}
