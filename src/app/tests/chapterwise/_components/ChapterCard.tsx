import React from 'react'
import ChapterWiseStartButton from './ChapterWiseStartButton'
import { BookOpen, HelpCircle } from 'lucide-react'

type Props = {
    chapter: string
    count: number
    selectedSubject: string
}

const ChapterCard = (props: Props) => {
    return (
        <div className="p-6 bg-primary dark:bg-purple-800 text-black shadow-md rounded-lg transition-all hover:shadow-lg hover:scale-105">
            <div className="flex items-center mb-1">
                <BookOpen className="w-5 h-5 text-gray-700 dark:text-purple-300 mr-2" />
                <h2 className="text-lg font-bold  capitalize text-gray-800">{props.chapter.replace(/_/g, ' ')}</h2>
            </div>
            <div className="flex items-center mb-4">
                <HelpCircle className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-2" />
                <p className="text-md text-gray-600">{props.count} Questions</p>
            </div>
            <ChapterWiseStartButton
                subject={props.selectedSubject}
                chapter={props.chapter}
            />
        </div>
    )
}

export default ChapterCard