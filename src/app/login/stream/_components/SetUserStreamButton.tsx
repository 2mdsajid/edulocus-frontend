'use client'

import { Button } from '@/components/ui/button'
import { setUserStream } from '@/lib/actions/stream.actions'
import { setStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions'
import { TStream } from '@/lib/schema/users.schema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { STREAM_DETAILS } from '@/lib/data'

type Props = {
    stream: TStream // "PG" | "UG"
    ru:string
}


const SetUserStreamButton = (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await setUserStream(props.stream as TStream);

            if (props.ru) {
                router.push(props.ru); // Redirect back to the original page
            } else {
                router.push(`/tests`); // Fallback if no redirectBack URL is found
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Button        
            onClick={handleClick}
            disabled={isLoading}
            className="p-6 md:p-12 text-lg md:text-2xl gap-3 bg-white dark:bg-white text-accent dark:text-accent font-semibold tracking-wider shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white hover:translate-y-[-2px] flex flex-col items-center"
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Loading...
                </div>
            ) : (
                <>
                    <div className="text-center">{STREAM_DETAILS[props.stream.toLowerCase() as "pg" | "ug"].title}</div>
                    <div className="text-sm text-gray-500 text-center">{STREAM_DETAILS[props.stream.toLowerCase() as "pg" | "ug"].desc}</div>
                </>
            )}
        </Button>
    )
}

export default SetUserStreamButton