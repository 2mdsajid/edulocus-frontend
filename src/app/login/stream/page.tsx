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

    if(user.isCompleted) {
        await setUserStream(user.stream)
        redirect('/dashboard')
    }

    const { data: streams, message: streamsMessage } = await getAllStreams()
    if (!streams || streams.length === 0) {
        return <ErrorPage errorMessage="No streams found" />
    }


    return (
        <div className='min-h-screen bg-background flex flex-col items-center justify-center p-8 py-12'>
            <h1 className='text-2xl font-bold mb-5'>Select A Stream</h1>
            <div className='flex gap-4'>
                {streams?.map((stream) => (
                    <SetUserStreamButton key={stream} stream={stream} />
                ))}
            </div>
        </div>
    )
}

export default page