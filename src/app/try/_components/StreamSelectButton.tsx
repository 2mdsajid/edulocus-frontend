'use client'

import { Button } from '@/components/ui/button'
import { setStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions'
import { useRouter, useSearchParams } from 'next/navigation' // Import useSearchParams
import React from 'react'
import { STREAM_DETAILS } from '@/lib/data'
import { TStream } from '@/lib/schema/users.schema'

type Props = {
    stream: TStream
    ru: string
}

const StreamSelectButton = (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            try {
                await setStreamCookieForUnauthenticatedUser(props.stream);

                if (props.ru) {
                    router.push(props.ru); // Redirect back to the original page
                } else {
                    router.push(`/tests`); // Fallback if no redirectBack URL is found
                }
            } catch (error) {
                console.error("An error occurred:", error);
                // Optionally, display an error message to the user
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            className="w-fit h-fit p-6 md:p-12 text-lg md:text-2xl gap-3 bg-white dark:bg-white text-accent dark:text-accent font-semibold tracking-wider shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white hover:translate-y-[-2px] flex flex-col items-center"
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Loading...
                </div>
            ) : (
                <div className='flex flex-col items-center gap-2 h-full'>
                    <div className="text-center">{STREAM_DETAILS[props.stream].title}</div>
                    <div className="text-sm text-gray-500 text-center">{STREAM_DETAILS[props.stream].desc}</div>
                </div>
            )}
        </Button>
    )
}

export default StreamSelectButton