import React from 'react'
import ChapterWiseStartButton from './ChapterWiseStartButton'

type Props = {
    chapter: string
    count: number
    selectedSubject: string
}

const ChapterCard = (props: Props) => {
    return (
        <div className="p-4 bg-accent3 shadow rounded-md">
            <h2 className="text-lg font-bold capitalize">{props.chapter}</h2>
            <p className="text-md"> {props.count} Questions</p>
            <ChapterWiseStartButton
                subject={props.selectedSubject}
                chapter={props.chapter}
            />
        </div>
    )
}

export default ChapterCard