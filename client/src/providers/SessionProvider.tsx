'use client';

import React from "react";
import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
    children: React.ReactNode;
}

export default function NextAuthSessionProvider({ children }: SessionProviderProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}