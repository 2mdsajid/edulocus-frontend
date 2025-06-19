import React from 'react'
import TestBasicAnalysis from '@/components/reusable/tests/TestBasicAnalysis'
import { SubjectwiseAccuracy } from '@/components/reusable/tests/SubjectwiseAccuracy'
import TestChapterwiseScoreTable from '@/components/reusable/tests/TestChapterwiseAnalysis'
import FeedbackComponent from '@/components/reusable/links/FeedbackComponent'
import ContributeCardComponent from '@/components/reusable/links/ContributeCardComponent'
import { TSubjectWiseChapterScores } from '@/lib/schema/tests.schema'
import JoinUsComponent from '@/components/reusable/links/JoinUsComponent'
import JoinTelegramComponent from '@/components/reusable/links/JoinTelegramComponent'

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
            {/* <div className='space-y-3'>
                <TestBasicAnalysis
                    total_questions={totalQuestions}
                    corrrect_attempt={correctAttempt}
                    questions_attempt={questionsAttempt}
                    total_timetaken={totalTimeTaken}
                />
            </div> */}

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

           

        </div>
    )
}

export default TestAnalysis