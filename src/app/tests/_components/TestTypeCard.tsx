import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { TTypeOfTestsAndDescription } from "./schema"


const TestTypeCard = ({ type, description, icon: Icon }: TTypeOfTestsAndDescription) => {
  return (
    <Link href={`/tests/${type.toLowerCase().replace(/_/g, '')}`} className="block">
      <Card className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-purple-900 overflow-hidden border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600">
        <div className="flex items-center p-6">
          <div className="flex-shrink-0 w-16 h-16 mr-6 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors duration-300">
            <Icon className="text-purple-600 dark:text-purple-300 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-200 group-hover:text-purple-500 dark:group-hover:text-purple-100 transition-colors duration-300">
              {type.replace(/_/g, ' ')}
            </CardTitle>
            <CardDescription className="text-sm text-black dark:text-purple-300 mt-2 group-hover:text-gray-500 dark:group-hover:text-purple-200 transition-colors duration-300">
              {description}
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </Link>
  )
}

export default TestTypeCard