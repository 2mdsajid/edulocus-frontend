import React from 'react'
import TestBasicAnalysis from './TestBasicAnalysis'
import { SubjectwiseAccuracy } from './SubjectwiseAccuracy'
import TestChapterwiseScoreTable from './TestChapterwiseAnalysis'
import FeedbackComponent from './FeedbackComponent'
import ContributeCardComponent from './ContributeCardComponent'
import { TSubjectWiseChapterScores } from '../schema'

type Props = {
    totalQuestions: number
    correctAttempt: number
    questionsAttempt: number
    totalTimeTaken: number
    subjectWiseChapterScore: TSubjectWiseChapterScores
}

const TestAnalysis = (props: Props) => {
    const { totalQuestions,
        correctAttempt,
        questionsAttempt,
        totalTimeTaken,
        subjectWiseChapterScore: chapterwisescore
    } = props

    return (
        <div className='w-full space-y-5'>
            <div className='space-y-3'>
                <TestBasicAnalysis
                    total_questions={totalQuestions}
                    corrrect_attempt={correctAttempt}
                    questions_attempt={questionsAttempt}
                    total_timetaken={totalTimeTaken}
                />
            </div>

            <div>
                {chapterwisescore
                    && <SubjectwiseAccuracy
                        data={chapterwisescore}
                    />}
            </div>


            {chapterwisescore &&
                <div className='space-y-3'>
                    <TestChapterwiseScoreTable
                        data={chapterwisescore}
                    />
                </div>
            }

            <div className=" w-full">
                <FeedbackComponent />
            </div>

            <div className=" w-full">
                <ContributeCardComponent />
            </div>

        </div>
    )
}

export default TestAnalysis