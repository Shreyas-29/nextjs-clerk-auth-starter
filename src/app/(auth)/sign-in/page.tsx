'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
    
    const router = useRouter();

    const { isLoaded, signIn, setActive } = useSignIn();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!emailAddress || !password) {
            return toast.warning("Please fill in all fields");
        }

        setIsLoading(true);

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
                redirectUrl: "/auth-callback"
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push('/auth-callback');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
                toast.error("Invalid email or password");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            switch (err.errors[0]?.code) {
                case 'form_identifier_not_found':
                    toast.error("This email is not registered. Please sign up first.");
                    break;
                case 'form_password_incorrect':
                    toast.error("Incorrect password. Please try again.");
                    break;
                case 'too_many_attempts':
                    toast.error("Too many attempts. Please try again later.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center hc gap-y-6">
            <h1 className="text-2xl font-bold">Sign in</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email address
                    </label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isLoading}
                            className="absolute top-1 right-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?
                                <EyeOff className="w-4 h-4" /> :
                                <Eye className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                </div>
                <div className="mt-4">
                    <Button size="lg" type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) :"Sign In"}
                    </Button>
                </div>
                <div className="mt-4 flex">
                    <p className="text-sm text-muted-foreground text-center w-full">
                        Don&apos;t have an account? <Link href="/sign-up" className="text-foreground">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}