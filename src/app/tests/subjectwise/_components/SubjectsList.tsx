import React from 'react'
import { TTotalQuestionsPerSubject } from './schema'
import SubjectCard from './SubjectCard'

type Props = {
    data: TTotalQuestionsPerSubject[]
}

const SubjectsList = (props: Props) => {
    const { data } = props
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((subjectData) => (
                <SubjectCard key={subjectData.subject} {...subjectData} />
            ))}
        </div>
    )
}

export default SubjectsList