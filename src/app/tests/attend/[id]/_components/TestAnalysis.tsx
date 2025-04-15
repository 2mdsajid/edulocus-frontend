import React from 'react'
import TestBasicAnalysis from './TestBasicAnalysis'
import { SubjectwiseAccuracy } from './SubjectwiseAccuracy'
import TestChapterwiseScoreTable from './TestChapterwiseAnalysis'
import FeedbackComponent from './FeedbackComponent'
import ContributeCardComponent from './ContributeCardComponent'
import { TSubjectWiseChapterScores } from '@/lib/schema/tests.schema'
import JoinUsComponent from './JoinUsComponent'
import JoinTelegramComponent from './JoinTelegramComponent'

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

            <div className="flex flex-col gap-4">
                {chapterwisescore && Object.keys(chapterwisescore).length > 5 ? (
                    // Split subjects into two groups if more than 5 subjects
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SubjectwiseAccuracy 
                            data={Object.fromEntries(
                                Object.entries(chapterwisescore)
                                    .slice(0, Math.ceil(Object.keys(chapterwisescore).length / 2))
                            )}
                        />
                        <SubjectwiseAccuracy
                            data={Object.fromEntries(
                                Object.entries(chapterwisescore)
                                    .slice(Math.ceil(Object.keys(chapterwisescore).length / 2))
                            )}
                        />
                    </div>
                ) : (
                    // Show single graph if 5 or fewer subjects
                    <SubjectwiseAccuracy
                        data={chapterwisescore}
                    />
                )}
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
                <JoinTelegramComponent />
            </div>


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