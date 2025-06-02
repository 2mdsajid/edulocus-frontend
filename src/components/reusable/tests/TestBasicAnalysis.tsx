import { Check, CheckSquare, Clock, Star, Watch, X } from 'lucide-react';
import TestStatCard from '../../../app/tests/attend/[id]/_components/TestStatCard';
import { getRandomColor } from '@/lib/utils';
import { VariousScoresPieChart } from '@/components/charts/VariousScoresPieChart';

type Props = {
    total_timetaken: number
    total_questions: number
    questions_attempt: number
    corrrect_attempt: number
}

const TestBasicAnalysis = (props: Props) => {
    const { total_timetaken, questions_attempt, total_questions, corrrect_attempt } = props

    const unattempt_questions = total_questions - questions_attempt
    const incorrect_attempts = questions_attempt - corrrect_attempt

    const scoreParametersData = [
        { name: 'correct', value: corrrect_attempt, total: total_questions, fill: '#22c55e' },
        { name: 'incorrect', value: incorrect_attempts, total: total_questions, fill: '#ef4444' },
        { name: 'unattempt', value: unattempt_questions, total: total_questions, fill: '#6b7280' },
    ]


    return (
        <div className="w-full h-fit  flex flex-col gap-4 items-center justify-center">
            <div className="w-full max-w-3xl bg-primary rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {total_timetaken > 0
                        && <TestStatCard
                            icon={<Watch className="w-8 h-8 text-emerald-500" />}
                            value={`${Math.round(total_timetaken / 1000)} sec`}
                            label="Total Time Taken"
                            bgColor="bg-emerald-50"
                            borderColor="border-emerald-200"
                        />}
                    {total_timetaken > 0
                        && <TestStatCard
                            icon={<Clock className="w-8 h-8 text-blue-500" />}
                            value={`${Math.round((total_timetaken / questions_attempt) / 1000)} sec`}
                            label="Average Time Per Question"
                            bgColor="bg-blue-50"
                            borderColor="border-blue-200"
                        />}
                    <TestStatCard
                        icon={<CheckSquare className="w-8 h-8 text-indigo-500" />}
                        value={`${questions_attempt} / ${total_questions}`}
                        label="Total Questions Attempt"
                        bgColor="bg-indigo-50"
                        borderColor="border-indigo-200"
                    />
                    <TestStatCard
                        icon={<Check className="w-8 h-8 text-green-500" />}
                        value={`${corrrect_attempt}`}
                        label="Correct Attempt"
                        bgColor="bg-green-50"
                        borderColor="border-green-200"
                    />
                    <TestStatCard
                        icon={<X className="w-8 h-8 text-red-500" />}
                        value={`${questions_attempt - corrrect_attempt}`}
                        label="Incorrect Attempt"
                        bgColor="bg-red-50"
                        borderColor="border-red-200"
                    />
                    <TestStatCard
                        icon={<Star className="w-8 h-8 text-yellow-500" />}
                        value={`${corrrect_attempt - (questions_attempt - corrrect_attempt) * 0.25}`}
                        label="Total Score"
                        bgColor="bg-yellow-50"
                        borderColor="border-yellow-200"
                    />
                </div>
            </div>
            <div className="w-full">
                <VariousScoresPieChart data={scoreParametersData} />
            </div>
        </div>
    )
}

export default TestBasicAnalysis