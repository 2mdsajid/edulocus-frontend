import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Send } from "lucide-react"

const JoinTelegramComponent = () => {
  return (
    <Card className="mx-auto my-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 mt-10 border-t-8 border-purple-500"> {/* Applied the new styling here */}
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-4 ">
          <div className="flex-shrink-0 flex items-center justify-center bg-color8/10 rounded-full p-4 shadow-sm">
            <Send className="h-5 w-5 text-color8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
              Join Our Telegram Channel!
            </h3>
            <p className="text-base text-gray-500 font-medium">
              Get instant notice to daily quizzes, exam updates, and other resources. Never miss important announcements.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-color8 to-color6 hover:from-color6 hover:to-color8 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200 text-base"
            size="lg"
          >
            <Link href="https://t.me/edulocus_tg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>Join Channel</span>
              <Send className="h-5 w-5" />
              <span className="sr-only">Join Telegram Channel</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default JoinTelegramComponent