import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryButtonSkeleton() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-32 sm:h-40 flex flex-col items-center justify-center p-4 rounded-xl"
          >
            <Skeleton className="w-5 h-5 mb-2 rounded-full" />
            <Skeleton className="h-6 w-3/4" />
          </Skeleton>
        ))}
      </div>
    </div>
  )
}