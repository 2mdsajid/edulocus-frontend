import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const TestCardSkeleton = () => (
    <Card className="hover:shadow-lg transition-all duration-300 border-color3 bg-primary">
        <CardHeader className="space-y-1">
            <div className="flex items-start justify-start">
                <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-6 w-1/3" />
        </CardContent>
    </Card>
)

const TestListSkeleton = () => {
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Available Tests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 sm:p-4 bg-bg1 gap-3">
                {[...Array(8)].map((_, index) => (
                    <TestCardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}

export default TestListSkeleton