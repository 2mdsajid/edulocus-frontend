
import { TAnswer } from '@/lib/schema/questions.schema';
import { TQuestionForRevisionWithUserAnswer } from '@/lib/schema/tests.schema';
import { CheckCircle, ChevronDown, Loader2, XCircle } from 'lucide-react';

export const groupQuestionsBySubject = (questions: TQuestionForRevisionWithUserAnswer[]) => {
    return questions.reduce((acc, q) => {
        const subject = q.subject || 'Uncategorized';
        if (!acc[subject]) {
            acc[subject] = [];
        }
        acc[subject].push(q);
        return acc;
    }, {} as Record<string, TQuestionForRevisionWithUserAnswer[]>);
};


export const QuestionCard = ({
    question,
    isSelected,
    isExpanded,
    onSelect,
    onToggleExpand,
    isUnattempted = false
}: {
    question: TQuestionForRevisionWithUserAnswer;
    isSelected: boolean;
    isExpanded: boolean;
    onSelect: (id: string) => void;
    onToggleExpand: (id: string) => void;
    isUnattempted?: boolean;
}) => {
    const { id, userAnswer, answer, options, explanation, images } = question;

    const getOptionStyle = (optionKey: TAnswer) => {
        const baseStyle = "flex items-start p-3 pl-4 mt-2 space-x-3 transition-all duration-200 border rounded-lg";
        if (isUnattempted) {
             if (optionKey === answer) return `${baseStyle} bg-blue-50 border-blue-300 text-blue-800`;
             return `${baseStyle} bg-gray-50 border-gray-200`;
        }
        if (optionKey === answer) return `${baseStyle} bg-green-50 border-green-300 text-green-800`;
        if (optionKey === userAnswer) return `${baseStyle} bg-red-50 border-red-300 text-red-800`;
        return `${baseStyle} bg-gray-50 border-gray-200`;
    };

    return (
        <div className="mb-4 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-start p-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(id)}
                    className="w-5 h-5 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <div className="flex-1 ml-4">
                    <p className="font-medium text-gray-800">{question.question}</p>
                    {images?.qn && <img src={images.qn} alt="Question" className="mt-2 rounded-lg max-w-sm"/>}
                    <button onClick={() => onToggleExpand(id)} className="flex items-center mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        {isExpanded ? 'Collapse' : 'Click to Expand'}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="px-6 pb-5 bg-gray-50/70">
                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700">Options:</h4>
                        {options && (Object.keys(options) as TAnswer[]).map(key => (
                            <div key={key} className={getOptionStyle(key)}>
                                <div className="flex-shrink-0 w-6 h-6 mt-px font-bold text-center">
                                    {key.toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p>{options[key]}</p>
                                     {images?.[key] && <img src={images[key]} alt={`Option ${key}`} className="mt-2 rounded-lg max-w-xs"/>}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-200">
                         {!isUnattempted && (
                            <div className="flex items-center p-3 text-red-800 bg-red-100 rounded-lg">
                                <XCircle className="w-5 h-5 mr-3"/>
                                <strong>Your Answer:</strong>&nbsp;({userAnswer.toUpperCase()}) {options?.[userAnswer as TAnswer]}
                            </div>
                         )}
                         <div className="flex items-center p-3 mt-2 text-green-800 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 mr-3"/>
                            <strong>Correct Answer:</strong>&nbsp;({answer.toUpperCase()}) {options?.[answer]}
                        </div>
                    </div>

                    {explanation && (
                        <div className="pt-4 mt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-700">Explanation:</h4>
                            <p className="mt-1 text-gray-600">{explanation}</p>
                             {images?.exp && <img src={images.exp} alt="Explanation" className="mt-2 rounded-lg max-w-sm"/>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export const PracticeFooter = ({ selectedCount, isLoading, onStartPractice }: { selectedCount: number, isLoading: boolean, onStartPractice: () => void }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
            <div className="container flex items-center justify-between max-w-6xl mx-auto">
                <p className="font-semibold text-gray-800">
                    <span className="text-2xl text-indigo-600">{selectedCount}</span> Questions Selected
                </p>
                <button
                    onClick={onStartPractice}
                    disabled={selectedCount === 0 || isLoading}
                    className="inline-flex items-center px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creating Test...
                        </>
                    ) : (
                        'Start Practice'
                    )}
                </button>
            </div>
        </div>
    );
};
