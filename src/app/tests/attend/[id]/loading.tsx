import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const TestDetailsSkeleton = () => (
  <div className="w-full flex justify-center items-center bg-primary">
    <div className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow border overflow-hidden">
      <div className="p-6 sm:p-8">
        <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
        
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="w-9 h-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const TestQuestionsSkeleton = () => (
  <div className="w-full">
    {/* Fixed Progress Panel */}
    <div className="fixed top-28 right-5 flex flex-col p-4 bg-white dark:bg-gray-900 rounded-md border shadow-lg space-y-2">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>

    {/* Questions Form */}
    <div className="w-full space-y-6">
      <Skeleton className="h-12 w-48 mx-auto my-8" />

      {/* Subject Tabs */}
      <div className="sticky top-16 left-0 z-10 bg-accent3 border dark:bg-gray-900 py-3 px-2 mb-8 shadow-lg rounded-md">
        <div className="flex space-x-2 overflow-x-auto">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-32 flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-10">
        {[...Array(2)].map((_, subjectIndex) => (
          <div key={subjectIndex} className="space-y-6">
            <Skeleton className="h-8 w-48 mb-12" />
            {[...Array(3)].map((_, questionIndex) => (
              <Card key={questionIndex} className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(4)].map((_, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TestPageSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <TestDetailsSkeleton />
      <TestQuestionsSkeleton />
    </div>
  )
}

export default TestPageSkeleton