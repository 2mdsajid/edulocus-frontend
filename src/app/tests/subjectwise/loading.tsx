import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

const SubjectCardSkeleton = () => {
  return (
    <Card className="p-6 bg-primary dark:bg-purple-900 shadow-lg rounded-lg transition-all hover:shadow-xl hover:scale-105">
      <CardHeader className="flex items-center space-x-2 p-0">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

const SubjectsListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <SubjectCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default SubjectsListSkeleton