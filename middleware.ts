import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const url = req.nextUrl;

    // If the user is authenticated and on a public route
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org';

      // If the user has an organization ID, redirect to the organization page
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    // If the user is not authenticated and trying to access a non-public route
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is authenticated and has an orgId but is on the wrong page
    if (auth.userId && auth.orgId && req.nextUrl.pathname === "/select-org") {
      const orgSelection = new URL(`/organization/${auth.orgId}`, req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
