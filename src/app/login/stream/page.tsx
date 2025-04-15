import { getUserSession } from '@/lib/auth/auth'
import { getAllStreams, setUserStream } from '@/lib/actions/stream.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import ErrorPage from '@/components/reusable/ErrorPage'
import SetUserStreamButton from './_components/SetUserStreamButton'

type Props = {}

const page = async (props: Props) => {

    const { data: user, message: authMessage } = await getUserSession()
    if (!user || !user.googleId || !user.id) {
        redirect('/login')
    }

    const stream = user?.stream

    const { data: streams, message: streamsMessage } = await getAllStreams()
    if (!streams || streams.length === 0) {
        return <ErrorPage errorMessage="No streams found" />
    }


    if (stream && streams.includes(stream)) {
        redirect('/dashboard')
    }


    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-8 py-12'>
            <h1 className='text-2xl font-bold'>Select Stream</h1>
            <div className='flex flex-col gap-4'>
                {streams?.map((stream) => (
                    <SetUserStreamButton key={stream} stream={stream} />
                ))}
            </div>
        </div>
    )
}

export default page