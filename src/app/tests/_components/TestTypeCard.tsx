import Link from "next/link"
import { TTypeOfTestsAndDescription } from "./schema"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LockIcon, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const TestTypeCard = ({ type, description, icon: Icon, isAvailable }: TTypeOfTestsAndDescription) => {
  return (
    <Link href={`/tests/${type.toLowerCase().replace(/_/g, '')}`} className="block">
      <Card className={`overflow-hidden ${isAvailable ? 'bg-primary' : 'bg-gray-100'}`}>
        <CardHeader className="-mb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Icon className="w-6 h-6 text-purple-600" />
            {type.replace(/_/g, ' ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">{description}</p>
          {isAvailable ? (
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <PlayCircle className="w-6 h-6" /> Start
            </Button>
          ) : (
            <div className="space-y-2">
              <Link href="/membership" passHref>
                <Button variant="outline" className="w-full">
                  <LockIcon className="w-6 h-6 text-gray-400" />
                  Start
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default TestTypeCard