import {  TCreateUserFeedback } from "./schema";

export const createUserFeedback = async (formData: TCreateUserFeedback): Promise<{
    data: string | null;
    message: string;
}> => {
    console.log("🚀 ~ createUserFeedback ~ formData:", formData)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/create-user-feedback`, {
            method: "POST",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData
            })
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while creating the !" };
    }
};