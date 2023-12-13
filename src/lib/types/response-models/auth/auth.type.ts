export interface AuthUser {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    accountType: string;
    role: string;
    benefitsQualifiedFor: any[];
    isInfluencer: boolean;
    refCode: string;
    referees: any[];
    resetPasswordExpires: Date;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isDeleted: boolean;
    accountStatus: string;
    signUpMedium: string;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordToken: string;
}
