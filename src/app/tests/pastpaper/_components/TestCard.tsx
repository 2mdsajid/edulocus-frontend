import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { TBaseCustomTest } from '../../_components/schema'
type Props = {}

const TestCard = ({ id, name, date, questions, pastPaper }: TBaseCustomTest) => {
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-700">
            <CardHeader className="bg-color3 dark:bg-color9">
                <CardTitle className="text-lg font-bold text-color9 dark:text-color2">{name}</CardTitle>
                <CardDescription className="flex items-center mt-1 text-color7 dark:text-color4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(date).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                <div className="flex items-center mb-2 text-color8 dark:text-color3">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    <span>{questions.length} Questions</span>
                </div>
                {pastPaper && (
                    <div className="flex items-center mb-2 text-color8 dark:text-color3">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span>Year: {pastPaper.year}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="bg-color2 dark:bg-color9 p-4">
                <Link href={`/tests/view/${id}`} passHref className="w-full">
                    <Button className="w-full bg-color7 hover:bg-color8 text-white transition-colors duration-300">
                        Start Test
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default TestCard