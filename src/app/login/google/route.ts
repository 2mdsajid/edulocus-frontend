import { google } from "@/lib/auth/lucia-auth";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const urlParams = request.nextUrl.searchParams;
    const redirectTo = urlParams.get("ru");


	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile","email"]);

	if (redirectTo) {
        url.searchParams.set("state", `${state}:${encodeURIComponent(redirectTo)}`); // Combine state and redirect URL
    }
	
	const cookieStore = await cookies();
	cookieStore.set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});
	cookieStore.set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}