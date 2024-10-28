'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { startSubjectWiseTest } from './actions'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
    subject: string
}

const SubjectWiseStartButton = (props: Props) => {

    const router = useRouter()

    const [isBtnClicked, setIsbtnClicked] = useState(false)

    const startTest = async () => {
        setIsbtnClicked(true)
        const { data: testId, message } = await startSubjectWiseTest(props.subject,'SUBJECT_WISE')
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
        className=''
        >{
            isBtnClicked
                ? '...'
                : 'Start A Test'
        }
        </Button>)
}

export default SubjectWiseStartButton