"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function JoinUsComponent() {
  return (
    <Card className="mx-auto my-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl mt-10 border-t-8 border-purple-500"> {/* Applied styling here */}
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-4 py-8 px-6">
          <div className="flex-shrink-0 flex items-center justify-center bg-color6/10 rounded-full p-4 shadow-sm">
            <UserPlus className="h-5 w-5 text-color6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
              Join Us
            </h3>
            <p className="text-base text-gray-500 font-medium">
              Unlock your personalized dashboard, save progress, and get exclusive updates.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-color6 to-color8 hover:from-color8 hover:to-color6 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200 text-base"
            size="lg"
          >
            <Link href="/login" className="flex items-center gap-2">
              <span>Get Started</span>
              <UserPlus className="h-5 w-5" />
              <span className="sr-only">Navigate to login</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}