import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function JoinUsComponent() {
  return (
    <Card className="max-w-4xl mx-auto my-8 bg-primary">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <UserPlus className="hidden sm:block h-8 w-8 md:h-10 md:w-10 text-gray-700" />
          <div className="space-y-2 flex-grow">
            <h3 className="text-xl font-semibold leading-none tracking-tight text-gray-800">Join Us Today!</h3>
            <p className="text-sm text-muted-foreground">
              Sign up to access personalized resources, save your progress, and stay updated with the latest features on our platform.
            </p>
          </div>
          <Button asChild className="bg-color6 hover:bg-color8 font-bold">
            <Link href="/login">
              Join Now
              <span className="sr-only">Navigate to login</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
