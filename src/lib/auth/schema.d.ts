export type TUserRole = "USER" | "ADMIN" | "SUPERADMIN" | "MODERATOR" | "SAJID";
export type User = {
    googleId: string;
    name: string;
    id: string;
    email: string;
    password: string;
    image: string | null;
    role: TUserRole;
    key: string;
    ip: string | null;
    isCompleted: boolean;
    isSubscribed: boolean;
    tokensUsed: string[];
    institution: string | null;
    createdAt: Date;
}

export type TBaseUser = Omit<User,
    'password' |
    'isCompleted' |
    'ip' |
    'key' |
    'tokensUsed' |
    'institution' |
    'createdAt'
>

export type TSignUpUser = Omit<User,
    'id' |
    'googleId' |
    'image' |
    'isCompleted' |
    'ip' |
    'key' |
    'tokensUsed' |
    'institution' |
    'createdAt' |
    'role'
>

export type TLogInUser = {
    email: string;
    password: string
}

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