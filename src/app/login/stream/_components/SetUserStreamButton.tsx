'use client'

import { Button } from '@/components/ui/button'
import { setUserStream } from '@/lib/actions/stream.actions'
import { setStreamCookieForUnauthenticatedUser } from '@/lib/actions/try.actions'
import { TStream } from '@/lib/schema/users.schema'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    stream: TStream // cee-ug or cee-pg
}


const SetUserStreamButton = (props: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await setUserStream(props.stream as TStream);
            router.push(`/tests`);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Button        
            onClick={handleClick}
            disabled={isLoading}
            className="p-12 text-2xl gap-3 bg-white dark:bg-white text-accent dark:text-accent font-semibold tracking-wider shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white hover:translate-y-[-2px]"
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Loading...
                </div>
            ) : (
                props.stream.toUpperCase().replace(/-/g, ' ')
            )}
        </Button>
    )
}

export default SetUserStreamButton