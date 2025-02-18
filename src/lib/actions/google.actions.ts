'use server'

import { cookies } from "next/headers";



export const askGemini = async (): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }

        
        const response = await fetch(`${process.env.BACKEND}/google/ask-gemini`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
        });


        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching ai data!" };
    }
};