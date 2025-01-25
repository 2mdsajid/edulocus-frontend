'use server'
// actions/createCustomTest.ts
import { cookies } from "next/headers";
import { TCreateCustomTestData } from "./schema";

export const createCustomTest = async (
  data: TCreateCustomTestData
): Promise<{ data: string | null; message: string }> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/tests/create-custom-tests?limit=${data.limit}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({
          name: data.name,
          slug: data.slug,
        }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      return { data: null, message };
    }

    const { data: responseData, message } = await response.json();
    return { data: responseData, message };
  } catch (error) {
    console.error("Error creating custom test:", error);
    return { data: null, message: "An unexpected error occurred while creating custom test." };
  }
};