import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TDashboardAnalyticData } from "../schema/analytics.schema";




export const getDashboardAnalytics = async (userId: string): Promise<{
    data: TDashboardAnalyticData | null;
    message: string;
}> => {
    try {
        const cookieStore = cookies();
        const authToken = cookieStore.get("auth-token")?.value;
        const stream = cookieStore.get("stream")?.value;

        if (!stream || stream === undefined || stream === null) {
            redirect('/login/stream')
            return { data: null, message: "Stream not found!" };
        }

        if (!authToken || authToken === undefined || authToken === null) {
            return { data: null, message: "User not logged in!" };
        }


        const response = await fetch(`${process.env.BACKEND}/analytics/get-dashboard-analytics/${userId}`, {
            method: "GET",
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                "stream": stream,
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
        return { data: null, message: "Some Error Occured while fetching all tests!" };
    }
};

