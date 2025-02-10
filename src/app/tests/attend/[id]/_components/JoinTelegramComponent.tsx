import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const JoinTelegramComponent = () => {
  return (
    <Card className="max-w-4xl mx-auto my-8 bg-primary">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="hidden sm:block h-8 w-8 md:h-10 md:w-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.73 3.73L2.77 10.5c-1.34.48-1.34 2.31 0 2.79l4.82 1.73 1.73 4.82c.48 1.34 2.31 1.34 2.79 0l6.77-18.96c.48-1.34-.89-2.71-2.23-2.23z"/>
          </svg>
          <div className="space-y-2 flex-grow">
            <h3 className="text-xl font-semibold leading-none tracking-tight text-gray-800">Join Our Telegram Channel!</h3>
            <p className="text-sm text-muted-foreground">
              Stay connected with our vibrant community! Get instant notice to daily quizzes, exam updates, and other resources. Never miss important announcements.
            </p>
          </div>
          <Button asChild className="bg-color8 hover:bg-color6 font-bold">
            <Link href="https://t.me/edulocus_tg" target="_blank" rel="noopener noreferrer">
              Join Channel
              <span className="sr-only">Join Telegram Channel</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JoinTelegramComponent