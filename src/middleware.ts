import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin", "/signup"]);

export default clerkMiddleware((auth, req) => {
    const url = req.nextUrl.pathname;

    if (!isPublicRoute(req) && url.startsWith("/dashboard")) {
        auth().protect();
    }

    if (auth() && (url.startsWith("/signin") || url.startsWith("/signup"))) {
        return NextResponse.redirect("/");
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};