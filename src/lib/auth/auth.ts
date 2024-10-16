"use server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TBaseUser, TJWT, TLogInUser, TSignUpUser } from "./schema";
import { ShadcnToast } from "../global";



export const getUserSession = async (): Promise<{
  data: TBaseUser | null;
  message: string;
}> => {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken || authToken === undefined || authToken === null) {
      return { data: null, message: "User not logged in!" };
    }

    const response = await fetch(`${process.env.BACKEND}/users/get-user-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    console.log("🚀 ~ getUserSession ~ error:", error)
    return { data: null, message: "Some Error Occured while getting user session!" };
  }
};

export const logOut = async () => {
  const cookieStore = cookies();
  cookieStore.delete("auth-token");
  redirect("/login");
};

export const deAuthToken = async (token: string): Promise<TJWT | null> => {
  try {
    const secretkey = process.env.SECRET_KEY_FOR_AUTH as string;
    const data = await jwt.verify(token, secretkey) as TBaseUser;
    return data;
  } catch (error: any) {
    return null;
  }
};


export const handleLogIn = async (
  userData: TLogInUser
): Promise<ShadcnToast> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const { data: authToken, message: authMessage } = await response.json();
    if (!authToken) {
      return { state: "destructive", message: authMessage };
    }

    const data = await deAuthToken(authToken);
    if (!data || !data.email || !data.role || !data.id || !data.name) {
      return { state: "destructive", message: 'Malformed Token' }
    }

    // setting auth token for authentication in cookie
    cookies().set({
      name: "auth-token",
      value: authToken,
      httpOnly: true,
      path: "/",
    });

    return { state: "success", message: authMessage };

  } catch (error) {
    return {
      message: "Some Error occurred",
      state: "destructive",
    };
  }
};

export const handleSignUp = async (
  userData: TSignUpUser,
): Promise<ShadcnToast> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const { data: authToken, message: authMessage } = await response.json();
    if (!authToken) {
      return { state: "destructive", message: authMessage };
    }

    const data = await deAuthToken(authToken);
    if (!data || !data.email || !data.role || !data.id || !data.name) {
      return { state: "destructive", message: 'Malformed Token' }
    }


    // setting auth token for authentication in cookie
    cookies().set({
      name: "auth-token",
      value: authToken,
      httpOnly: true,
      path: "/",
    });

    return { state: "success", message: authMessage };
  } catch (error) {
    return {
      state: "destructive",
      message: "Some Error Occured While Signin up!",
    };
  }
};

// declare module "next-auth" {
//     interface Session extends DefaultSession {
//         user?: {
//             id: string;
//         } & DefaultSession["user"];
//     }
// }

// const prisma = new PrismaClient()
// export const authOptions: NextAuthOptions = {
//     pages: {
//         signIn: '/signIn',
//     },
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//                 const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
//                 if (user) {
//                     return user
//                 } else {
//                     return null
//                 }
//             }
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     callbacks: {
//         async session({ session, user }: any) {
//             const { id } = user
//             return session = {
//                 ...session,
//                 user: {
//                     ...session.user,
//                     id: id,
//                 }
//             }
//         },
//     },
// }
