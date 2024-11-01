'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { startSubjectWiseTest } from './actions'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Loader2, PlayCircle } from 'lucide-react'

type Props = {
    subject: string
}

const SubjectWiseStartButton = (props: Props) => {

    const router = useRouter()

    const [isBtnClicked, setIsbtnClicked] = useState(false)

    const startTest = async () => {
        setIsbtnClicked(true)
        const { data: testId, message } = await startSubjectWiseTest(props.subject, 'SUBJECT_WISE')
        if (!testId || testId === null) {
            setIsbtnClicked(false)
            return toast({
                variant: 'destructive',
                title: 'Warning',
                description: message
            })
        }
        setIsbtnClicked(false)
        return router.push(`/tests/attend/${testId}`)
    }

    return (
        <Button 
            onClick={startTest}
            className="w-full bg-color7 hover:bg-color8 font-semibold text-white"
            disabled={isBtnClicked}
        >
            {isBtnClicked ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {isBtnClicked ? 'Starting...' : 'Start A Test'}
        </Button>
    )
}

export default SubjectWiseStartButton