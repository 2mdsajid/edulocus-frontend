import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const SubjectBadgeSkeleton = () => (
  <Skeleton className="h-8 w-24 rounded-full" />
)

const ChapterCardSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-8 w-full" />
    </CardContent>
  </Card>
)

const ChapterListSkeleton = () => (
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
    {[...Array(6)].map((_, index) => (
      <ChapterCardSkeleton key={index} />
    ))}
  </div>
)

const ChapterwiseMainPageSkeleton = () => {
  return (
    <div className='w-full p-6'>
      <div className="flex flex-wrap gap-2 mb-6">
        {[...Array(5)].map((_, index) => (
          <SubjectBadgeSkeleton key={index} />
        ))}
      </div>

      <Skeleton className="h-8 w-64 mb-4" />
      
      <div className="relative mb-6 max-w-lg">
        <Skeleton className="h-10 w-full" />
      </div>

      <ChapterListSkeleton />
    </div>
  )
}

export default ChapterwiseMainPageSkeleton