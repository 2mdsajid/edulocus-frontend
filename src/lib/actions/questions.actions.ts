'use server'

import { TAddQuestion, TAiQUestionUpdate, TBaseOption, TCreatePastTestData, TPGSyllabus, TStreamHierarchy, TTotalQuestionsPerSubject } from "@/lib/schema/questions.schema";
import { cookies } from "next/headers";
import { TBaseQuestion, TQuestion, TReportQuestion, TTotalQuestionsPerSubjectAndChapter } from "../schema/tests.schema";
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
        const authToken = cookieStore.get("auth-token")?.value;

        if (!stream) {
            return { data: null, message: "Stream Not Specified" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject-and-chapter?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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
        const authToken = cookieStore.get("auth-token")?.value;


        if (!stream) {
            return { data: null, message: "Stream Not Specified" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-total-questions-per-subject?stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};


export const getQuestionsBySubject = async (subject: string, stream:TStream): Promise<{
    data: TQuestion[] | null;
    message: string;
}> => {
    try {

        const cookieStore = cookies();
        const stream = cookieStore.get("stream")?.value;
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken) {
            return { data: null, message: "User not logged in!" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-full-questions-by-subject?subject=${subject}&stream=${stream}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        
        const { data, message } = await response.json();
        console.log(data)
        return { data, message };

    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occured while fetching questions by subject!" };
    }
};



export const reportQuestion = async (questionId: string, description: string): Promise<{
    data: string | null;
    message: string;
}> => {
    try {

        const response = await fetch(`${process.env.BACKEND}/questions/report-question/${questionId}`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while reporting the question!" };
    }
}


export const getSubjects = async (stream: TStream): Promise<{
    data: string[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-subjects?stream=${stream}`, {
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
        return { data: null, message: "Some Error Occured while fetching subjects!" };
    }
};


export const getChaptersBySubject = async (stream: TStream, subject: string): Promise<{
    data: string[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-chapters-by-subject?stream=${stream}&subject=${subject}`, {
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
        return { data: null, message: "Some Error Occured while fetching chapters!" };
    }
};



export const addSingleQuestion = async (questionData: Omit<TQuestion, 'id'>): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return { data: null, message: "Authentication token not found!" };
        }
        const response = await fetch(`${process.env.BACKEND}/questions/add-single-question`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(questionData)
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while adding the question!" };
    }
};


export const getReportedQuestions = async (): Promise<{
    data: TReportQuestion[] | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return { data: null, message: "Authentication token not found!" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/get-reported-questions`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while fetching reported questions!" };
    }
};



//update question
export const updateQuestionAction = async (questionData: TAiQUestionUpdate): Promise<{
    data: TAiQUestionUpdate | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return { data: null, message: "Authentication token not found!" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/update-question`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(questionData)
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while updating the question!" };
    }
};



export const updateQuestionByAI = async (questionData: TAiQUestionUpdate): Promise<{
    data: TAiQUestionUpdate | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return { data: null, message: "Authentication token not found!" };
        }

        const response = await fetch(`${process.env.BACKEND}/google/gemini-question-update`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(questionData)
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.log(error)
        return { data: null, message: "Some Error Occurred while updating the question with AI!" };
    }
};


// remove questions
export const removeReportedQuestion = async (questionId: string): Promise<{
    data: boolean | null;
    message: string;
}> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return { data: null, message: "Authentication token not found!" };
        }

        const response = await fetch(`${process.env.BACKEND}/questions/remove-reported-question/${questionId}`, {
            method: "DELETE",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message };
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occurred while removing the reported question!" };
    }
};

