'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [name, setName] = React.useState('');
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [verifying, setVerifying] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!name || !emailAddress || !password) {
            return toast.warning("Please fill in all fields");
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });

            setVerifying(true);

            await signUp.update({
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1],
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));

            switch (err.errors[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        if (!code) {
            return toast.warning("Verification code is required");
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push('/auth-callback');
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                toast.error("Invalid verification code");
            }
        } catch (err: any) {
            console.error('Error:', JSON.stringify(err, null, 2));
            toast.error("An error occurred. Please try again");
        }
    };

    return verifying ? (
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-start hc gap-y-6">
            <div className="text-start w-full">
                <h1 className="text-2xl font-bold">
                    Please check your email
                </h1>
                <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a verification code to {emailAddress}
                </p>
            </div>
            <form onSubmit={handleVerify} className="w-full max-w-sm text-start">
                <Label htmlFor="code">
                    Verification code
                </Label>
                <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e)}
                    className="pt-2"
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <Button size="sm" type="submit" className="w-full mt-4">
                    Verify
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                    Didn&apos;t receive the code? {" "}
                    <Button size="sm" variant="link">
                        Resend
                    </Button>
                </p>
            </form>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center hc gap-y-6">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="space-y-2">
                    <Label htmlFor="name">
                        Full name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
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
                    <Button size="sm" type="submit" className="w-full">
                        Continue
                    </Button>
                </div>
                <div className="mt-4 flex">
                    <p className="text-sm text-muted-foreground text-center w-full">
                        Already a member? <Link href="/sign-in" className="text-foreground">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};