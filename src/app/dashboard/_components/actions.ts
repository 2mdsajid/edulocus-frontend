import { cookies } from "next/headers";
import { TDashboardAnalyticData } from "./schema";

export const getDashboardAnalytics = async (userId: string): Promise<{
    data: TDashboardAnalyticData | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }
        const response = await fetch(`${process.env.BACKEND}/tests/get-dashboard-analytics/${userId}`, {
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