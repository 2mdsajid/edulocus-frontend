'use server'

import { cookies } from "next/headers";
import { TQuestion } from "../schema/tests.schema";



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


export const getGeminiExplanation = async (questionData:TQuestion): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const { question, options, uans } = questionData
        // console.log("🚀 ~ getGeminiExplanation ~ questionData:", questionData)
        
        const response = await fetch(`${process.env.BACKEND}/google/get-gemini-explanation`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, options, correctAnswer: uans }),
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