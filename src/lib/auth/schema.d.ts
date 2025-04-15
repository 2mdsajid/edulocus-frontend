
export type TJWT = TBaseUser

export interface LuciaSession {
	id: string;
	expiresAt: Date;
	userId: string;
}

export type TLuciaGoogleAuth = {
    id?: string
    googleId: string
    email: string;
    name?: string;
    image?: string 
}

export type LuciaSessionValidationResult = { session: LuciaSession; user: TBaseUser } | { session: null; user: null };