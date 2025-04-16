import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { cache } from "react";
import { TBaseUser } from "@/lib/schema/users.schema";
import { LuciaSession, LuciaSessionValidationResult, TLuciaGoogleAuth } from "@/lib/auth/schema";

//  make this function -- send a request to backend server to get the user data with that payload 
export async function getUserFromGoogleId(userData:TLuciaGoogleAuth): Promise<{
	data: TBaseUser | null;
	message: string;
}> {
	try {
		const response = await fetch(
			`${process.env.BACKEND}/users/lucia-google-auth`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);

		if (!response.ok) {
			return {data:null, message:"Invalid Response"}
		}

		const {data, message} = await response.json();
		return {data, message}

	} catch (error) {
		return {data:null, message:"Some Error occurred while processing request data"}
	}
}

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
	cookies().set("session", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}
export function setAuthTokenCookie(token: string, expiresAt: Date): void {
	cookies().set("auth-token", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}

export function setStreamCookie(stream: string, expiresAt: Date): void {
	cookies().set("stream", stream, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt
	});
}


export function deleteSessionTokenCookie(): void {
	cookies().set("session", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export function deleteAuthTokenCookie(): void {
	cookies().set("auth-token", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export function deleteStreamCookie(): void {
	cookies().set("stream", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0
	});
}

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

export function createSession(token: string, userId: string): LuciaSession {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: LuciaSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	// db.execute("INSERT INTO session (id, user_id, expires_at) VALUES (?, ?, ?)", [
	// 	session.id,
	// 	session.userId,
	// 	Math.floor(session.expiresAt.getTime() / 1000)
	// ]);
	return session;
}

// --------------------------NOT IMPLEMENTED--------------------------------
//  --------------------------- NOT LINKED WITH THE DATABSE
export function validateSessionToken(token: string): LuciaSessionValidationResult | null {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	// 	const row = db.queryOne(
	// 		`
	// SELECT session.id, session.user_id, session.expires_at, user.id, user.google_id, user.email, user.name, user.picture FROM session
	// INNER JOIN user ON session.user_id = user.id
	// WHERE session.id = ?
	// `,
	// 		[sessionId]
	// 	);

	// 	if (row === null) {
	// 		return { session: null, user: null };
	// 	}
	// 	const session: Session = {
	// 		id: row.string(0),
	// 		userId: row.number(1),
	// 		expiresAt: new Date(row.number(2) * 1000)
	// 	};
	// 	const user: any = {
	// 		id: row.number(3),
	// 		googleId: row.string(4),
	// 		email: row.string(5),
	// 		name: row.string(6),
	// 		picture: row.string(7)
	// 	};
	// 	if (Date.now() >= session.expiresAt.getTime()) {
	// 		db.execute("DELETE FROM session WHERE id = ?", [session.id]);
	// 		return { session: null, user: null };
	// 	}
	// 	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
	// 		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
	// 		db.execute("UPDATE session SET expires_at = ? WHERE session.id = ?", [
	// 			Math.floor(session.expiresAt.getTime() / 1000),
	// 			session.id
	// 		]);
	// 	}
	// return { session, user }
	return null
}


export const getCurrentSession = cache((): LuciaSessionValidationResult | null => {
	const token = cookies().get("session")?.value ?? null;
	if (token === null) {
		return { session: null, user: null };
	}
	const result = validateSessionToken(token);
	return result;
});

export function invalidateSession(sessionId: string): void {
	// db.execute("DELETE FROM session WHERE id = ?", [sessionId]);
}

export function invalidateUserSessions(userId: number): void {
	// db.execute("DELETE FROM session WHERE user_id =?", [userId]);
	// db.execute("DELETE FROM session WHERE user_id = ?", [userId]);
}

