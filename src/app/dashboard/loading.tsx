import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardCardSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-5 w-20" />
    </CardContent>
  </Card>
)

const ChartSkeleton = () => (
  <Skeleton className="w-full h-80" />
)

const RecentTestCardSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
)

export default function Loading() {
  return (
    <div className='w-full bg-color1 mx-auto space-y-5 pt-24 pb-16 px-4 md:px-10 lg:px-20 xl:px-32'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[...Array(4)].map((_, i) => (
          <DashboardCardSkeleton key={i} />
        ))}
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full">
          <ChartSkeleton />
        </div>
        <div className="w-full">
          <ChartSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='w-full'>
          <ChartSkeleton />
        </div>
        <div className="w-full">
          <ChartSkeleton />
        </div>
      </div>

      <div className='w-full'>
        <Skeleton className="h-8 w-48 mb-4" /> {/* "Recent Tests" title skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <RecentTestCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}