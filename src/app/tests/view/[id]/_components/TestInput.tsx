'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { generateRandomName } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
    testid: string;
    token?: string
}

const TestInput = (props: Props) => {
    const { testid, token } = props
    const router = useRouter()
    const [username, setUsername] = useState('')

    const generateUsername = () => {
        const username = generateRandomName()
        setUsername(username)
    }

    const startTest = () => {

        if (!username) {
            return toast({
                variant: "destructive",
                title: "Warning",
                description: "Please specify a username",
            })
        }
        router.push(`/tests/attend/${testid}/?username=${username}&t=${token}`)
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex gap-2">
                <Input autoFocus={false} className='' placeholder='Your Name' value={username || ''}
                    onChange={(e) => {
                        setUsername(e.currentTarget.value);
                    }}
                />
                <Button className='w-max ' onClick={generateUsername}>Random</Button>
            </div>
            <Button onClick={startTest}>Start Test</Button>
        </div>
    )
}

export default TestInput