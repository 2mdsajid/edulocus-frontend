import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

const TestMetadataSkeleton = () => (
  <Card className="w-full md:w-[40%] bg-primary dark:bg-dark-primary border p-8 rounded-lg shadow h-fit">
    <Skeleton className="w-full h-48 rounded-md mb-4" />
    <div className="text-center mb-5">
      <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
    <Skeleton className="w-full h-10 rounded-md" />
  </Card>
)

const LeaderboardSkeleton = () => (
  <Card className="w-full md:w-[60%] bg-primary h-fit p-4 rounded-lg shadow border">
    <div className="flex items-center space-x-2 mb-4">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="space-y-2">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  </Card>
)

const TestDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row flex-grow gap-5 bg-bg1">
      <TestMetadataSkeleton />
      <LeaderboardSkeleton />
    </div>
  )
}

export default TestDetailsSkeleton