import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'
import { startChapterWiseTest } from './actions'
import { useRouter } from 'next/navigation'

type Props = {
    subject: string
    chapter: string
}

const ChapterWiseStartButton = (props: Props) => {

    const router = useRouter()

    const [isBtnClicked, setIsbtnClicked] = useState(false)

    const startTest = async () => {
        setIsbtnClicked(true)
        const { data: testId, message } = await startChapterWiseTest(props.subject, props.chapter, 'CHAPTER_WISE')
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
        <Button onClick={startTest}>{
            isBtnClicked
                ? '...'
                : 'Start A Test'
        }
        </Button>
    )
}

export default ChapterWiseStartButton