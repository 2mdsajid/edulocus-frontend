import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {}

const TestTypeCardSkeleton = () => (
    <Card className="overflow-hidden">
        <CardHeader className="-mb-2">
            <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-full" />
        </CardContent>
    </Card>
)

const loading = (props: Props) => {
    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                {/* Available Tests Section Skeleton */}
                <div className="mb-12">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <TestTypeCardSkeleton key={index} />
                        ))}
                    </div>
                </div>

                {/* Upcoming Tests Section Skeleton */}
                <div>
                    <div className="mb-4">
                        <Skeleton className="h-8 w-56 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <TestTypeCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loading