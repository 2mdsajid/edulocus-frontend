'use server'

import { cookies } from "next/headers";
import { TTotalQuestionsPerSubjectAndChapter } from "./schema";
import { TTypeOfTest } from "../../_components/schema";

export const getTotalQuestionsPerSubjectAndChapter = async (): Promise<{
    data: TTotalQuestionsPerSubjectAndChapter | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject-and-chapter`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }
        
        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const startChapterWiseTest = async (subject: string, chapter: string, type:TTypeOfTest): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies()
        const authToken = cookieStore.get('auth-token')?.value

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests-by-users?subject=${subject}&chapter=${chapter}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken
            },
            body: JSON.stringify({
                name: `${chapter} of ${subject} test`,
                type: type
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};