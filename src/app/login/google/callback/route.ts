import { generateSessionToken, createSession, setSessionTokenCookie, setAuthTokenCookie } from "@/lib/auth/lucia-sessions";
import { cookies } from "next/headers";
import { decodeIdToken } from "arctic";

import type { OAuth2Tokens } from "arctic";
import { google } from "@/lib/auth/lucia-auth";
import {  getUserFromGoogleId } from "@/lib/auth/lucia-sessions";
import { generateAuthToken } from "@/lib/auth/auth";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const cookieStore = await cookies();
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 401
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 402
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
		return new Response(null, {
			status: 500
		});
	}
	
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, existingUser.id);
	await setSessionTokenCookie(sessionToken, session.expiresAt);

	const authToken = await generateAuthToken(existingUser);
	// check if the authToken is valid or null
	if (authToken === null) {
		return new Response(null, {
			status: 500
		});
	}
	await setAuthTokenCookie(authToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
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
