import { generateSessionToken, createSession, setSessionTokenCookie, setAuthTokenCookie, setStreamCookie } from "@/lib/auth/lucia-sessions";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";

import type { OAuth2Tokens } from "arctic";
import { google } from "@/lib/auth/lucia-auth";
import { getUserFromGoogleId } from "@/lib/auth/lucia-sessions";
import { generateAuthToken } from "@/lib/auth/auth";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const cookieStore = await cookies();
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

	// Remove the cookies immediately after retrieving them for security
	// cookieStore.delete("google_oauth_state");
	// cookieStore.delete("google_code_verifier"); 


	// Extract CSRF state and redirect URL from the 'state' parameter
	let csrfState: string | null = null;
	let redirectTo: string = "/dashboard"; // Default redirect URL
	if (state && state.includes(":")) {
		const parts = state.split(":");
		csrfState = parts[0];
		try {
			// Decode the redirect URL part
			redirectTo = decodeURIComponent(parts[1] || "");
			// Basic validation to ensure it's a relative path or a valid absolute path
			if (!redirectTo.startsWith("/") && !redirectTo.startsWith("http://edulocusweb.com")) {
				redirectTo = "/dashboard"; // Fallback if redirect URL is invalid
			}
		} catch (error) {
			console.error("Error decoding redirect URL from state:", error);
			redirectTo = "/dashboard"; // Fallback on decoding error
		}
	} else {
		csrfState = state; // If no ':' is found, it's just the CSRF state
	}



	if (code === null || state === null || storedState === null || codeVerifier === null) {
		// Log details for debugging to understand which condition failed
		console.error("OAuth Callback Error: Invalid parameters or state mismatch", {
			code: code === null ? "null" : "present",
			csrfState: csrfState === null ? "null" : "present",
			storedState: storedState === null ? "null" : "present",
			codeVerifier: codeVerifier === null ? "null" : "present",
			stateMismatch: csrfState !== storedState // true if mismatch
		});
		return new Response(null, {
			status: 400,
			headers: {
                "Location": "/login?error=auth_failed" // Redirect to login with error
            }
		});
	}


	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 402,
			headers: {
                "Location": "/login?error=invalid_code"
            }
		});
	}

	const claims = decodeIdToken(tokens.idToken()) as any
	const googleUserId = claims.sub;
	const username = claims.name;
	const email = claims.email;
	const image = claims.picture;


	// TODO: Replace this with your own DB query.
	const { data: existingUser, message } = await getUserFromGoogleId({
		googleId: googleUserId,
		email: email,
		name: username,
		image: image
	});


	if (existingUser === null) {
		console.log(existingUser)
		return new Response(null, {
			status: 404,
			headers: {
                "Location": "/login?error=user_not_found" // Redirect to login with specific error
            }

		});
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, existingUser.id);
	await setSessionTokenCookie(sessionToken, session.expiresAt);

	// check if the authToken is valid or null
	const authToken = await generateAuthToken(existingUser);
	if (authToken === null) {
		return new Response(null, {
			status: 302,
			headers: {
                "Location": "/login?error=auth_token_failed"
            }
		});
	}

	await setAuthTokenCookie(authToken, session.expiresAt);

	  // If the user hasn't completed their profile, redirect them to the stream selection page
	  if (!existingUser.isCompleted) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/login/stream" // Path to complete user profile (e.g., select stream)
            }
        });
    }

	 // If everything is successful and the user is completed, redirect to the 'redirectTo' URL
	 await setStreamCookie(existingUser.stream, new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)); // Assuming stream exists
	 return new Response(null, {
		 status: 302,
		 headers: {
			 Location: redirectTo // Redirect to the URL passed in 'ru'
		 }
	 });


	// TODO: Replace this with your own DB query.
	// const user = await getUserFromGoogleId(googleUserId);
	// if (user === null) {
	// 	return new Response(null, {
	// 		status: 500
	// 	});
	// }

	// const sessionToken = generateSessionToken();
	// const session = await createSession(sessionToken, user.id);
	// await setSessionTokenCookie(sessionToken, session.expiresAt);
	// return new Response(null, {
	// 	status: 302,
	// 	headers: {
	// 		Location: "/"
	// 	}
	// });
}
