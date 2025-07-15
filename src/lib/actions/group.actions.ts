'use server'


import { cookies } from "next/headers";
import { TGroupBase, TGroupByUser, TGroupCreate, TGroupDetail, TMember } from "@/lib/schema/groups.schema"; // Adjust the path to your schema file

export const createGroupAction = async (
  createGroupData: TGroupCreate,
): Promise<{
  data: string | null;
  message: string;
}> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/groups/create-group`, {
      method: "POST",
      cache: "no-store", // Ensures fresh data, no caching
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(createGroupData), // Send the group creation data
    });

    if (!response.ok) {
      const { data, message } = await response.json();
      return { data: null, message };
    }

    const { data, message } = await response.json();
    return { data, message };
  } catch (error) {
    console.error("Error creating group:", error);
    return { data: null, message: "Some Error Occurred while creating the group!" };
  }
};



export const getAllGroupsByUser = async (userId:string): Promise<{
    data: TMember[] | null; // Adjust based on your backend response if creatorName is sent
    message: string;
}> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/groups/get-group-by-user/${userId}`, {
      method: "GET",
      cache: "no-store", // Ensures fresh data
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });

    if (!response.ok) {
      const { data, message } = await response.json();
      return { data: null, message };
    }

    const { data, message } = await response.json();
    return { data, message };
  } catch (error) {
    console.error("Error fetching groups by moderator:", error);
    return { data: null, message: "Failed to fetch groups. Please try again." };
  }
};


export const getGroupById = async (groupId: string): Promise<{
    data: TGroupDetail | null;
    message: string;
}> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/groups/get-group-by-id/${groupId}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    });

    if (!response.ok) {
      const { data, message } = await response.json();
      return { data: null, message };
    }

    const { data, message } = await response.json();
    return { data, message };
  } catch (error) {
    console.error("Error fetching group by id:", error);
    return { data: null, message: "Failed to fetch group. Please try again." };
  }
};


export const removeGroupMember = async (groupId: string, userId: string): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { success: false, message: "User not logged in!" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/groups/remove-group-member/${groupId}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      return { success: false, message };
    }

    const { message } = await response.json();
    return { success: true, message };
  } catch (error) {
    console.error("Error removing group member:", error);
    return { 
      success: false, 
      message: "Failed to remove member. Please try again." 
    };
  }
};


export const addGroupMemberAction = async (
  groupId: string,
  email: string
): Promise<{ data: any; message: string }> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/groups/add-member/${groupId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      return { data: null, message };
    }

    const { data, message } = await response.json();
    return { data, message };
  } catch (error) {
    console.error("Error adding group member:", error);
    return { 
      data: null, 
      message: "Failed to add member. Please try again." 
    };
  }
};



export const deleteCustomTestAction = async (
  testId: string
): Promise<{ data: any; message: string }> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/tests/delete-custom-test/${testId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      return { data: null, message };
    }

    const { data, message } = await response.json();
    return { data, message };
  } catch (error) {
    console.error("Error deleting custom test:", error);
    return { 
      data: null, 
      message: "Failed to delete test. Please try again." 
    };
  }
};
