import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const url = req.nextUrl;

    // Redirect authenticated users on public routes to their organization page
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org';

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    // Redirect non-authenticated users trying to access non-public routes to sign in
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Redirect authenticated users with an orgId away from the org selection page
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
