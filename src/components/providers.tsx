"use client";

import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
};

export default Providers
