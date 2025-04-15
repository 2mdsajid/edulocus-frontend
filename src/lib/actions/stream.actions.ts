'use server'

import { cookies } from "next/headers";
import { TStream } from "@/lib/schema/users.schema";
export const getAllStreams = async (): Promise<{
    data: TStream[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/users/get-all-streams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "cache": "no-store",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return { data: null, message: data.message };
        }
        return data;
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching streams!" };
    }
} 

export const setUserStream = async (stream: TStream): Promise<{
    data: TStream | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.BACKEND}/users/set-user-stream`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
            body: JSON.stringify({ stream }),
        });


        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        if (!data) {
            return { data: null, message: "Some Error Occured while setting stream!" };
        }

        cookieStore.set('stream', data, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
        })


        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while setting stream!" };
    }
} 