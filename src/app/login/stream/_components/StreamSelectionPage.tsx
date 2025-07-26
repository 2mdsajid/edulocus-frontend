'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TStream } from '@/lib/schema/users.schema'
import { setUserStream } from '@/lib/actions/stream.actions'
import { STREAM_DETAILS } from '@/lib/data' // Your data import
import { Button } from '@/components/ui/button'
import StreamSelectionCard from './StreamSelectionCard'

// Data can be kept in the same file or imported as you were doing
// const STREAM_DETAILS = { ... } 

type Props = {
    ru: string // The redirect URL
}

const StreamSelectionPage = ({ ru }: Props) => {
    const router = useRouter();
    const [selectedStream, setSelectedStream] = useState<TStream | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = async () => {
        if (!selectedStream) return; // Do nothing if no stream is selected

        setIsLoading(true);
        try {
            await setUserStream(selectedStream);

            if (ru) {
                router.push(ru); // Redirect back to the original page
            } else {
                router.push(`/tests`); // Fallback if no redirectBack URL is found
            }
        } catch (error) {
            console.error("Failed to set user stream:", error);
            // Optionally, show an error message to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>

            {/* Selection Cards */}
            <div className="flex flex-col md:flex-row items-center gap-8">
                <StreamSelectionCard
                    title={STREAM_DETAILS.UG.title}
                    description={STREAM_DETAILS.UG.desc}
                    stream="UG"
                    isSelected={selectedStream === 'UG'}
                    onSelect={setSelectedStream}
                />
                <StreamSelectionCard
                    title={STREAM_DETAILS.PG.title}
                    description={STREAM_DETAILS.PG.desc}
                    stream="PG"
                    isSelected={selectedStream === 'PG'}
                    onSelect={setSelectedStream}
                />
            </div>

            {/* Confirmation Button */}
            <div className="mt-12 w-full max-w-xs">
                <Button
                    onClick={handleProceed}
                    disabled={!selectedStream || isLoading}
                    className="w-full p-6 text-xl font-semibold tracking-wide transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                    size="lg"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        'Confirm and Proceed'
                    )}
                </Button>
            </div>
        </div>
    )
}

export default StreamSelectionPage;