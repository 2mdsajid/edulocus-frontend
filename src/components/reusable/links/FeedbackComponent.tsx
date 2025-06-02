import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function FeedbackComponent() {
  return (
    <Card className="max-w-4xl mx-auto my-8 bg-primary">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <MessageSquare className="hidden sm:block h-8 w-8 md:h-10 md:w-10 text-gray-700" />
          <div className="space-y-2 flex-grow">
            <h3 className="text-xl font-semibold leading-none tracking-tight text-gray-800">We value your feedback!</h3>
            <p className="text-sm text-muted-foreground">
              we are adding more resources and making this website more user friendly. Help us improve this website by sharing your thoughts.
            </p>
          </div>
          <Button asChild className="bg-color7 hover:bg-color5 font-bold">
            <Link href="/feedback">
              Give Feedback
              <span className="sr-only">Navigate to feedback form</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}