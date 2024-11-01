
import React from 'react'
import SubjectWiseStartButton from './SubjectWiseStartButton'
import { Book, HelpCircle } from 'lucide-react'

type Props = {
    subject: string
    count: number
}

const SubjectCard = (props: Props) => {
    return (
        <div className="p-6 bg-primary dark:bg-purple-900 text-black shadow-lg rounded-lg transition-all hover:shadow-xl hover:scale-105">
            <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-purple-600 dark:text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold tracking-wide capitalize ">{props.subject.replace(/_/g,' ')}</h2>
            </div>
            <div className="flex items-center mb-4">
                <HelpCircle className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" />
                <p className="text-md text-gray-600">Total Questions: {props.count}</p>
            </div>
            <SubjectWiseStartButton subject={props.subject} />
        </div>
    )
}

export default SubjectCard