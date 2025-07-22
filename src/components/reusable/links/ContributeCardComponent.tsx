"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Send, Facebook, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

// Define the props for the component
type Props = {
  isSubscribed?: boolean
  authToken?: string
}


export default function CommunityAndMembershipCard({ isSubscribed, authToken }: Props) {
  const showJoinUs = !authToken || authToken === '' || authToken === 'undefined'
  return (
    <Card className="mx-auto my-10 w-full max-w-4xl overflow-hidden rounded-2xl border-t-8 border-purple-500 bg-white p-8 shadow-2xl">
      <CardContent className="p-0">

        {/* join user section */}
        {!authToken && (
          <>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <UserPlus className="h-8 w-8" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                  Join Us
                </h3>
                <p className="text-base font-medium text-gray-500">
                  Unlock your dashboard, save progress & many more.
                </p>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 text-base font-bold text-white shadow-lg transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 rounded-full"
                size="lg"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <span>Get Started</span>
                  <UserPlus className="h-5 w-5" />
                  <span className="sr-only">Navigate to login</span>
                </Link>
              </Button>
              <div className="my-8 border-t border-gray-200"></div>
            </div>
          </>
        )}


        {/* --- Community Section --- */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Send className="h-8 w-8" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              Join Edulocus Community
            </h3>
            <p className="text-base font-medium text-gray-600">
              Fresh features. 24×7 mentorship and Many more.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <Button asChild className="bg-[#0088cc] px-6 py-2 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#0077b3] rounded-full">
              <Link href="https://t.me/edulocus_tg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                <span>Telegram</span>
              </Link>
            </Button>
            <Button asChild className="bg-[#1877F2] px-6 py-2 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#166bda] rounded-full">
              <Link href="https://www.facebook.com/groups/1196549385578355/?ref=share&mibextid=NSMWBT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* --- Premium Upsell Section (conditional) --- */}
        {!isSubscribed && (
          <>
            <div className="my-8 border-t border-gray-200"></div>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                  <Star className="h-8 w-8" />
                </div>
              </div>
              {/* Text & Features */}
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800">
                  Ready to Go A Step Ahead?
                </h4>
                <p className="mt-1 text-base text-gray-600">
                  Unlock all tests, remove question limits, access advanced AI features, and more.
                </p>
              </div>
              {/* Action Button */}
              <div className="w-full sm:w-auto">
                <Button asChild className="group w-full bg-amber-500 px-6 py-2 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-amber-600 rounded-full">
                  <Link href="/membership" className="flex items-center gap-2">
                    <span>Explore Membership</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
