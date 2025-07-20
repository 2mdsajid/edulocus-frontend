import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Send, Facebook } from "lucide-react"

// A simple SVG icon for Telegram as an alternative or for styling consistency
const TelegramIcon = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-1.37.2-1.64l16.43-6.1c.88-.32 1.62.24 1.38 1.43l-2.55 12.05c-.26 1.23-1.04 1.54-2.04 1.01l-4.98-3.69-2.32 2.23c-.25.24-.46.45-.82.45z" />
  </svg>
);


const JoinCommunityComponent = () => {
  return (
    <Card className="mx-auto my-10 w-full max-w-5xl overflow-hidden rounded-2xl border-t-8 border-purple-500 bg-white p-8 shadow-2xl mt-10">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Text Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              Connect with Our Community
            </h3>
            <p className="text-lg text-gray-600 font-medium">
              Stay ahead of the curve! Join us for instant updates on new tests, exclusive features, 24/7 mentorship, and so much more. Your journey to success starts here!
            </p>
          </div>

          {/* Social Media Buttons Section */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto">
            {/* Telegram Button */}
            <Button
              asChild
              className="w-full bg-[#26A5E4] hover:bg-[#2295cc] text-white font-bold px-6 py-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-base"
              size="lg"
            >
              <Link href="https://t.me/edulocus_tg" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                <TelegramIcon className="h-6 w-6" />
                <span>Join on Telegram</span>
              </Link>
            </Button>
            
            {/* Facebook Button */}
            <Button
              asChild
              className="w-full bg-[#1877F2] hover:bg-[#166bda] text-white font-bold px-6 py-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-base"
              size="lg"
            >
              <Link href="https://www.facebook.com/groups/1196549385578355/?ref=share&mibextid=NSMWBT" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                <Facebook className="h-6 w-6" />
                <span>Join Facebook Group</span>
              </Link>
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default JoinCommunityComponent;
