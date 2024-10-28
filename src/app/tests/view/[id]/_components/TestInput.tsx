'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { generateRandomName } from '@/lib/utils'
import { Play, Shuffle } from 'lucide-react'
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
                <button onClick={generateUsername} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Random
                </button>
            </div>
            <button onClick={startTest} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Start Test
            </button>
        </div>
    )
}

export default TestInput