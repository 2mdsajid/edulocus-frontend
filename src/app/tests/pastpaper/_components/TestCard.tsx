import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TBaseCustomTest } from "@/lib/schema/tests.schema"
import { BookOpen, Calendar, HelpCircle, LockIcon } from 'lucide-react'
import Link from 'next/link'


type Props = {}

const TestCard = ({ id, name, date, questions, pastPaper }: TBaseCustomTest) => {

  const testName = name || `${pastPaper?.affiliation}-${pastPaper?.year}`
  return (
    <Card className={`flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${pastPaper?.isUnlocked
        ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
        : 'bg-white dark:bg-gray-100'
      } border-gray-200 dark:border-gray-700`}>
      <CardHeader className={`${pastPaper?.isUnlocked
          ? 'bg-gray-200 dark:bg-gray-700'
          : 'bg-gray-100 dark:bg-gray-200'
        } py-4`}>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {testName}
        </CardTitle>
        <CardDescription className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <div className="flex items-center mb-2 text-gray-800 dark:text-gray-200">
          <HelpCircle className="w-4 h-4 mr-2" />
          <span>{questions.length} Questions</span>
        </div>
      </CardContent>
      <CardFooter className={`${pastPaper?.isUnlocked
          ? 'bg-gray-100 dark:bg-gray-800'
          : 'bg-gray-50 dark:bg-gray-300'
        }`}>
        {pastPaper?.isUnlocked ? (
          <Link href={`/tests/view/${id}`} passHref className="w-full">
            <Button className="w-full bg-gray-700 hover:bg-gray-800 font-bold text-white transition-colors duration-300">
              Start Test
            </Button>
          </Link>
        ) : (
          <Link href="/membership" passHref className="w-full">
            <Button
              className="w-full bg-gray-300 dark:bg-gray-400 font-bold text-gray-600 dark:text-gray-700"
              disabled
            >
              <LockIcon className="w-4 h-4 mr-2" />
              Unlock Test
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

export default TestCard