"use client";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!}
        >
            <div>{children}</div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthWrapper;
