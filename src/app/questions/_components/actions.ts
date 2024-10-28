import { TPGSyllabus } from "./schema";

export const getSyllabus = async (): Promise<{
    data: TPGSyllabus | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.BACKEND}/questions/get-syllabus`, {
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