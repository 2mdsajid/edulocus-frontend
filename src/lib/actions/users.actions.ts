'use server'

import { TBaseUser, TChapterwiseRegistration, TCreateSubscriptionRequest, TCreateUserFeedback } from "@/lib/schema/users.schema";
import { cookies } from "next/headers";



export const getAllUsers = async (): Promise<{
    data: TBaseUser[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/get-all-users`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        return { data: null, message: "Some Error Occured while updating the membership request!" };
    }
};

export const createUserFeedback = async (formData: TCreateUserFeedback): Promise<{
    data: string | null;
    message: string;
}> => {
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

export const getUserFeedbacks = async (): Promise<{
    data: string[] | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/get-user-feedbacks`, {
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
        return { data: null, message: "Some Error Occured while fetching user feedbacks!" };
    }
};

export const deleteUserFeedback = async (id: string): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/delete-user-feedback/${id}`, {
            method: "DELETE",
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
        return { data: null, message: "Some Error Occured while deleting user feedback!" };
    }
};



export const createSubscriptionRequest = async (formData: TCreateSubscriptionRequest): Promise<{
    data: string | null;
    message: string;
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/create-subscription-request`, {
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
        return { data: null, message: "Some Error Occured while creating the membership request!" };
    }
};



export const setSubscription = async (id: string): Promise<{
    data: TBaseUser | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;


        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/set-user-subscription/${id}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message }
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        // console.log(error)
        return { data: null, message: "Some Error Occured while updating the membership request!" };
    }
};






export const registerForChapterwiseTest = async (regData: TChapterwiseRegistration): Promise<{ data: string | null; message: string }> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/register-chapterwise-test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regData),
        });

        if (!response.ok) {
            const { data, message } = await response.json();
            return { data: null, message };
        }

        const { data, message } = await response.json();
        return { data, message };
    } catch (error) {
        console.error("Error registering for chapterwise test:", error);
        return { data: null, message: "Failed to register for chapterwise test." };
    }
};
