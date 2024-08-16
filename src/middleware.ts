import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, req) => {
    const url = req.nextUrl.pathname;

    /**
     * If the user is not logged in protect it from dashboard page
     */
    if (!isPublicRoute(req) && url.startsWith("/dashboard")) {
        auth().protect();
    }

});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
