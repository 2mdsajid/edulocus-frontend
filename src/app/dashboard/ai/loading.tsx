import { Skeleton } from '@/components/ui/skeleton';

const PerformanceAnalysisSkeleton = () => {
  return (
    <div className='w-full min-h-screen bg-color1 mx-auto space-y-5 pt-24 pb-16 px-4 md:px-10 lg:px-20 xl:px-32'>
      {/* Title */}
      <Skeleton className="h-8 w-3/4 rounded-lg" />

      {/* Weak Areas Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      </div>

      {/* Overall Subject Performance */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      </div>

      {/* Strong Areas Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      </div>

      {/* Actionable Suggestions Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysisSkeleton;