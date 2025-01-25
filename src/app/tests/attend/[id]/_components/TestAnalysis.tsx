import React from 'react'
import TestBasicAnalysis from './TestBasicAnalysis'
import { SubjectwiseAccuracy } from './SubjectwiseAccuracy'
import TestChapterwiseScoreTable from './TestChapterwiseAnalysis'
import FeedbackComponent from './FeedbackComponent'
import ContributeCardComponent from './ContributeCardComponent'
import { TSubjectWiseChapterScores } from '../schema'
import JoinUsComponent from './JoinUsComponent'

type Props = {
    totalQuestions: number
    correctAttempt: number
    questionsAttempt: number
    totalTimeTaken: number
    subjectWiseChapterScore: TSubjectWiseChapterScores
    authToken?: string
}

const TestAnalysis = (props: Props) => {
    const { totalQuestions,
        correctAttempt,
        questionsAttempt,
        totalTimeTaken,
        subjectWiseChapterScore: chapterwisescore,
        authToken
    } = props
    console.log("🚀 ~ TestAnalysis ~ authToken:", authToken)

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

            {/* ask users to login when they are not logged in */}
            {(!authToken
                || authToken === ''
                || authToken === undefined
                || authToken === 'undefined') && 
                <div className=" w-full">
                    <JoinUsComponent />
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