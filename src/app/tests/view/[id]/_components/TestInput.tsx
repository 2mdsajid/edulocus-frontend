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
    // loadingstate
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
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
            <Button
                onClick={startTest}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Test
                    </>
                )}
            </Button>
        </div>
    )
}

export default TestInput