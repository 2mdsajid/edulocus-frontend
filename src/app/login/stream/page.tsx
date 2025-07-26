import { getUserSession } from '@/lib/auth/auth'
import { getAllStreams, setUserStream } from '@/lib/actions/stream.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import ErrorPage from '@/components/reusable/ErrorPage'
import SetUserStreamButton from './_components/StreamSelectionPage'
import StreamSelectionPage from './_components/StreamSelectionPage'

type Props = {
    searchParams: {
        ru: string
    }
}

const page = async (props: Props) => {

    const redirectUrl = props.searchParams.ru || '/dashboard'

    const { data: user, message: authMessage } = await getUserSession()
    if (!user || !user.googleId || !user.id) {
        redirect(`/login?ru=${redirectUrl}`)
    }

    if (user.isCompleted) {
        await setUserStream(user.stream)
        redirect(redirectUrl)
    }

    const { data: streams, message: streamsMessage } = await getAllStreams()
    if (!streams || streams.length === 0) {
        return <ErrorPage errorMessage="No streams found" />
    }


    return (
        <div className='min-h-screen bg-background flex flex-col items-center justify-center p-8 py-12'>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                    What are you preparing for?
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                    Select your stream to personalize your experience.
                </p>
            </div>            
            <div className='flex gap-4'>
                <StreamSelectionPage ru={redirectUrl} />
            </div>
        </div>
    )
}

export default page