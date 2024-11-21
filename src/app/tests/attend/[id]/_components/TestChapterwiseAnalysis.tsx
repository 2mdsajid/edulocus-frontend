"use client"

import { CardDescription, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { subjectWiseChapterScore } from '../methods'
import { TSubjectWiseChapterScores } from '../schema'
import { ChaptersAccuracyGraph } from './ChaptersAccuracyGraph'
import { CustomBadge } from './CustomBadge'
import { SubjectScoreBreakdownGraph } from './SubjectScoreBreakdownGraph'

type Props = {
    data: TSubjectWiseChapterScores
}



export default function TestChapterwiseAnalysis({ data }: Props) {
    const eachSubjectData = subjectWiseChapterScore(data)
    const [selectedSubject, setSelectedSubject] = useState(eachSubjectData[0]?.name || '')

    const currentSubject = eachSubjectData.find(subject => subject.name === selectedSubject)

    return (
        <div className="w-full mx-auto overflow-x-auto bg-primary p-3 rounded-md shadow-md">
            <div className='space-y-1 py-3'>
                <CardTitle className="text-black">Individual Subjects</CardTitle>
                <CardDescription className="text-black">More insight to individual subjects</CardDescription>
            </div>

            <div className="flex flex-wrap gap-2 my-4">
                {eachSubjectData.sort().map((subject) => (
                    <CustomBadge
                        key={subject.name}
                        isSelected={selectedSubject === subject.name}
                        onClick={() => setSelectedSubject(subject.name)}
                    >
                        {subject.name.replace('_', ' ').toUpperCase()}
                    </CustomBadge>
                ))}
            </div>

            {currentSubject && (
                <div className="pt-3 flex flex-col gap-4">
                    <SubjectScoreBreakdownGraph
                        data={currentSubject}
                    />
                    <ChaptersAccuracyGraph
                        data={currentSubject.chapterAccuracies}
                    />
                </div>
            )}
        </div>
    )
}