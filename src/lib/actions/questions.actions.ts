'use server'

import { TAddQuestion, TCreatePastTestData, TPGSyllabus, TStreamHierarchy, TTotalQuestionsPerSubject } from "@/lib/schema/questions.schema";
import { cookies } from "next/headers";
import { TTotalQuestionsPerSubjectAndChapter } from "../schema/tests.schema";
import { TStream } from "../schema/users.schema";

export const getSyllabus = async (stream: TStream): Promise<{
    data: TSyllabus | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-syllabus?stream=${stream}`, {
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
        return { data: null, message: "Some Error Occured while fetching the syllabus!" };
    }
};


export const getStreamsHierarchy = async (): Promise<{
    data: TStreamHierarchy[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-stream-hierarchy`, {
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
        return { data: null, message: "Some Error Occured while fetching the streams hierarchy!" };
    }
};


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


export const createPastTest = async (createPastTestData: TCreatePastTestData): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;
        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }

        const {
            affiliation,
            year,
            stream,
            category,
            questions
        } = createPastTestData

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/tests/create-past-tests`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            body: JSON.stringify({
                affiliation,
                year,
                stream,
                category,
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
        return { data: null, message: "Some Error Occured while creating past test!" };
    }
};


export const getTotalQuestionsPerSubjectAndChapter = async (): Promise<{
    data: TTotalQuestionsPerSubjectAndChapter | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const stream = cookieStore.get("stream")?.value;

        if (!stream) {
            return { data: null, message: "Stream Not Specified" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject-and-chapter?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream
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



export const getTotalQuestionsPerSubject = async (): Promise<{
    data: TTotalQuestionsPerSubject[] | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const stream = cookieStore.get("stream")?.value;

        if (!stream) {
            return { data: null, message: "Stream Not Specified" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream
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
