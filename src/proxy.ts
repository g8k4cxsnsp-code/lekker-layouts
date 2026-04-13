import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on all routes except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|images/|downloads/|api/).*)",
  ],
};
