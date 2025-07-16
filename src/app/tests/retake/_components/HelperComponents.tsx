// A component to render the score as a circular progress bar
export const ScoreCircle = ({ score, totalQuestions }: { score: number; totalQuestions: number }) => {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const circumference = 2 * Math.PI * 28; // 2 * pi * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let progressColor = 'text-green-500';
    if (percentage < 75) progressColor = 'text-yellow-500';
    if (percentage < 40) progressColor = 'text-red-500';

    return (
        <div className="relative flex items-center justify-center h-24 w-24">
            <svg className="transform -rotate-90 h-full w-full">
                <circle
                    className="text-gray-200"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="48"
                    cy="48"
                />
                <circle
                    className={`${progressColor} transition-all duration-1000 ease-out`}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="48"
                    cy="48"
                />
            </svg>
            <span className={`absolute text-xl font-bold ${progressColor}`}>{percentage}%</span>
        </div>
    );
};