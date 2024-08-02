// "use client";

import getAuthStatus from "@/actions/get-auth-status";
import { db } from "@/lib/db";
import { useAuth, useUser } from '@clerk/nextjs';
import { currentUser } from "@clerk/nextjs/server";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from 'next/navigation';

const AuthCallbackPage = async () => {

    // const { isLoaded, user } = useUser();
    
    // const { isSignedIn } = useAuth();

    // const router = useRouter();

    // const { data, isLoading } = useQuery({
    //     queryKey: ["auth-callback"],
    //     queryFn: async () => await getAuthStatus(),
    //     retry: true,
    //     retryDelay: 500,
    // });

    // if (data?.success) {
    //     router.push("/dashboard");
    // }

    const user = await currentUser();
    
    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        return redirect("/sign-in");
    }

    const dbUser = await db.user.findFirst({
        where: {
            clerkId: user.id,
        },
    });

    if (!dbUser) {
        await db.user.create({
            data: {
                id: user.id,
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });

        return redirect("/dashboard");
    } else {
        return redirect("/");
    }

    // return (
    //     <div className="flex items-center justify-center flex-col relative hc">
    //         <div className="absolute inset-0 flex flex-col items-center justify-center">
    //             <div className="loader w-8 h-8"></div>
    //             <p className="text-lg font-medium text-center mt-3">
    //                 Verifying your account...
    //             </p>
    //         </div>
    //     </div>
    // )
};

export default AuthCallbackPage;
