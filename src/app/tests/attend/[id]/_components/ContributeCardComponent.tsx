import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"


type Props = {}

const ContributeCardComponent = (props: Props) => {
  return (
    <Card className="max-w-4xl mx-auto my-8 bg-primary">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <Users className="h-12 w-12 text-color7" />
          <div className="space-y-2 flex-grow text-center md:text-left">
            <h3 className="text-xl font-semibold leading-none tracking-tight text-color7">Contribute to Our Growth!</h3>
            <p className="text-sm text-muted-foreground">
              Help us expand this platform by becoming a member. Enjoy extra benefits such as personal dashboard, re-take tests, and many more...
            </p>
          </div>
          <Button size="lg" asChild className='bg-color6 hover:bg-color8'>
            <Link href="/membership">
              Join Membership
              <span className="sr-only">Navigate to membership page</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContributeCardComponent