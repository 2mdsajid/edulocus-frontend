'use server'

import { cookies } from "next/headers";
import { TStream } from "../schema/users.schema";

export const setStreamCookieForUnauthenticatedUser = async (stream: TStream) => {
    const cookieStore = await cookies()
    cookieStore.set('stream', stream, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
    })
}

export const getStreamCookieForUnauthenticatedUser = async () => { 
    const cookieStore = await cookies()
    return cookieStore.get('stream')?.value || null
}