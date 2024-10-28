
import React from 'react'
import SubjectWiseStartButton from './SubjectWiseStartButton'

type Props = {
    subject: string
    count: number
}

const SubjectCard = (props: Props) => {
    return (
        <div className="p-4 bg-accent3 shadow-md rounded-md">
            <h2 className="text-lg font-bold">{props.subject}</h2>
            <p className="text-md">Total Questions: {props.count}</p>
            <SubjectWiseStartButton subject={props.subject} />
        </div>
    )
}

export default SubjectCard