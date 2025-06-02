import { SubjectwiseAccuracy } from '@/components/reusable/tests/SubjectwiseAccuracy'
import TestChapterwiseScoreTable from '@/components/reusable/tests/TestChapterwiseAnalysis'
import { TSubjectWiseChapterScores } from '@/lib/schema/tests.schema'
import TestBasicScoresComparison from './TestBasicScoresComparison'

type Props = {
    totalQuestions: number
    correctAttempt: number
    questionsAttempt: number
    totalTimeTaken: number
    newCorrectAttempt: number
    newQuestionsAttempt: number
    newTotalTimeTaken: number
    subjectWiseChapterScore: TSubjectWiseChapterScores
    authToken?: string
}

const ReTestAnalysis = (props: Props) => {
    const { totalQuestions,
        correctAttempt,
        questionsAttempt,
        totalTimeTaken,
        newCorrectAttempt,
        newQuestionsAttempt,
        newTotalTimeTaken,
        subjectWiseChapterScore: chapterwisescore,
    } = props

    return (
        <div className='w-full space-y-10'>

            <TestBasicScoresComparison
                total_questions={totalQuestions}
                corrrect_attempt={correctAttempt}
                questions_attempt={questionsAttempt}
                total_timetaken={totalTimeTaken}
                new_total_questions={totalQuestions}
                new_corrrect_attempt={newCorrectAttempt}
                new_questions_attempt={newQuestionsAttempt}
                new_total_timetaken={newTotalTimeTaken}
            />

            {chapterwisescore &&
                <TestChapterwiseScoreTable
                    data={chapterwisescore}
                />
            }

        </div>
    )
}

export default ReTestAnalysis