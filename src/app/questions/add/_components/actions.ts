'use server'

import { cookies } from "next/headers";
import { TAddQuestion } from "./schema";


export const addQuestions = async (questions: TAddQuestion[], apiEndPoint: string): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;
        if (!authToken || authToken === undefined || authToken === null) {
          return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/questions/${apiEndPoint}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            body: JSON.stringify({
                questions
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log("🚀 ~ addQuestions ~ error:", error)
        return { data: null, message: "Some Error Occured while adding the questions!" };
    }
};


