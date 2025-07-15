export type TStream = "PG" | "UG" 

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
    stream: TStream;
    isCompleted: boolean;
    isSubscribed: boolean;
    tokensUsed: string[];
    institution: string | null;
    createdAt: Date;
}

export type TBaseUser = Omit<User,
    'password' |
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


type Feedback = {
    name: string;
    id: string;
    email: string;
    image?: string;
    createdAt: Date;
    message: string;
}

export type TCreateUserFeedback = Omit<Feedback, 'id' | 'createdAt'>


type SubscriptionRequest = {
    name: string;
    id: string;
    email: string;
    createdAt: Date;
    phone: string;
    stream:TStream;
}

export type TCreateSubscriptionRequest = Omit<SubscriptionRequest, 'id' | 'createdAt'>


export type TRecentTestInDashboardData = {
    id: string
    name: string
    date: string
    totalQuestions: number
    score: number
}

export type TScoreParametersData = {
    name: string;
    value: number;
    total: number;
}

export type TDailyTestProgressChartData = {
    date: string;
    score: number;
}

export type TSubjectwiseScoresChartData = {
    subject: string;
    score: number;
    total: number;
    fill: string;
}

export type TGroupDataInDashboard = {
    id:string
    name: string
}


import {z} from 'zod'

export const ChapterwiseRegistrationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string().optional().nullable(),
});

export type TChapterwiseRegistration = z.infer<typeof ChapterwiseRegistrationSchema>;
