import React from 'react';
import TestBasicAnalysis from '@/components/reusable/tests/TestBasicAnalysis'; // Adjust the import path as needed
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'; // Added Minus icon for no change
import { isInRectangle } from 'recharts/types/shape/Rectangle';

type Props = {
    total_timetaken: number;
    total_questions: number;
    questions_attempt: number;
    corrrect_attempt: number;
    new_total_timetaken: number;
    new_total_questions: number;
    new_questions_attempt: number;
    new_corrrect_attempt: number;
}

const StatComparison: React.FC<{ label: string; past: number; current: number; unit?: string; isTime?: boolean; isIncorrect?: boolean }> = ({ label, past, current, unit = '', isTime = false, isIncorrect = false }) => {
    const difference = current - past;
    let isImproved: boolean;
    let isDeclined: boolean;

    // For time, lower is better (improved)
    if (isTime || isIncorrect) {
        isImproved = difference < 0; // Less time taken is an improvement
        isDeclined = difference > 0; // More time taken is a decline
    } else {
        isImproved = difference > 0; // Higher value is an improvement
        isDeclined = difference < 0; // Lower value is a decline
    }

    const textColorClass = isImproved ? 'text-green-600' : isDeclined ? 'text-red-600' : 'text-gray-600';
    const icon = isImproved ? <TrendingUp className="inline w-5 h-5 text-green-500 mr-1" /> : isDeclined ? <TrendingDown className="inline w-5 h-5 text-red-500 mr-1" /> : <Minus className="inline w-5 h-5 text-gray-500 mr-1" />;
    const feedbackText = isImproved ? 'Improved!' : isDeclined ? 'Needs work.' : '';

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700 font-medium text-lg mb-1 md:mb-0">{label}:</span>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-1 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">Past: <span className="font-semibold">{past}{unit}</span></span>
                    <span className="text-gray-500 text-sm"> | </span>
                    <span className={`font-bold text-base ${textColorClass}`}>
                        Current: {current}{unit}
                    </span>
                </div>
                <div className="flex items-center">
                    {icon}
                    <span className={`text-sm font-medium ${textColorClass}`}>
                        {difference !== 0 ? `${difference > 0 ? '+' : ''}${difference}${unit}` : 'No change'} {feedbackText}
                    </span>
                </div>
            </div>
        </div>
    );
};

const TestBasicScoresComparison = (props: Props) => {
    const {
        total_timetaken,
        total_questions,
        questions_attempt,
        corrrect_attempt,
        new_total_timetaken,
        new_total_questions,
        new_questions_attempt,
        new_corrrect_attempt,
    } = props;

    // Calculate past and new scores for comparison
    const pastIncorrectAttempts = questions_attempt - corrrect_attempt;
    const pastScore = corrrect_attempt - (pastIncorrectAttempts * 0.25);
    // Ensure average time calculation handles division by zero
    const pastAvgTimePerQuestion = questions_attempt > 0 ? Math.round((total_timetaken / questions_attempt) / 1000) : 0;

    const newIncorrectAttempts = new_questions_attempt - new_corrrect_attempt;
    const newScore = new_corrrect_attempt - (newIncorrectAttempts * 0.25);
    // Ensure average time calculation handles division by zero
    const newAvgTimePerQuestion = new_questions_attempt > 0 ? Math.round((new_total_timetaken / new_questions_attempt) / 1000) : 0;

    return (
        <div className="w-full h-fit flex flex-col gap-10 items-center justify-center ">


            <div className="grid grid-cols-1  gap-12 w-full max-w-6xl ">
                {/* New Test Scores */}
                <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6 border-b-4 border-emerald-400 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 w-full text-center">Latest Performance</h2>
                    <TestBasicAnalysis
                        total_timetaken={new_total_timetaken}
                        total_questions={new_total_questions}
                        questions_attempt={new_questions_attempt}
                        corrrect_attempt={new_corrrect_attempt}
                    />
                </div>

                {/* Past Test Scores */}
                <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-6 border-b-4 border-blue-400 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 w-full text-center">Previous Performance</h2>
                    <TestBasicAnalysis
                        total_timetaken={total_timetaken}
                        total_questions={total_questions}
                        questions_attempt={questions_attempt}
                        corrrect_attempt={corrrect_attempt}
                    />
                </div>
            </div>


            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 mt-10 border-t-8 border-purple-500">
                <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center animate-pulse">
                    Your Performance Progress 
                </h2>

                <div className="space-y-4">
                    <StatComparison
                        label="Total Questions Attempted"
                        past={questions_attempt}
                        current={new_questions_attempt}
                    />
                    <StatComparison
                        label="Correct Attempts"
                        past={corrrect_attempt}
                        current={new_corrrect_attempt}
                    />
                    <StatComparison
                        label="Incorrect Attempts"
                        past={pastIncorrectAttempts}
                        current={newIncorrectAttempts}
                        isIncorrect={true}
                    />
                    {/* <StatComparison
                        label="Total Time Taken"
                        past={Math.round(total_timetaken / 1000)}
                        current={Math.round(new_total_timetaken / 1000)}
                        unit=" sec"
                        isTime={true} // Indicate that this is a time metric
                    />
                    <StatComparison
                        label="Average Time Per Question"
                        past={pastAvgTimePerQuestion}
                        current={newAvgTimePerQuestion}
                        unit=" sec"
                        isTime={true} // Indicate that this is a time metric
                    /> */}
                    <StatComparison
                        label="Overall Score"
                        past={Math.round(pastScore * 100) / 100}
                        current={Math.round(newScore * 100) / 100}
                    />
                </div>

            </div>
        </div>
    );
}

export default TestBasicScoresComparison;