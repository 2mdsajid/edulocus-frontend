{/* <MultipleBarDiagram
chartTitle={`Breakdown of ${currentSubject.name}`}
chartDescription={`Chart showing breakdown score for ${currentSubject.name}`}
xAxisKey='label'
dataKeys={['correct', 'incorrect', 'unattempt', 'total']}
chartData={[{
    label: 'Scores',
    correct: currentSubject.correct,
    incorrect: currentSubject.incorrect,
    total: currentSubject.total,
    unattempt: currentSubject.unattempt
}]}
config={{
    correct: {
        label: "Correct",
        color: "hsl(var(--chart-1))",
    },
    incorrect: {
        label: "Incorrect",
        color: "hsl(var(--chart-2))",
    },
    total: {
        label: "Total",
        color: "hsl(var(--chart-3))",
    },
    unattempt: {
        label: "Unattempted",
        color: "hsl(var(--chart-4))",
    },
}}
/> */}



                            {/* Check if more than one subject for subject navigation*/}
                            {/* {SUBJECTS.length > 1 && (
                                <div className="flex w-full justify-between items-center overflow-x-auto sticky top-16 left-0 z-10 bg-accent3 border dark:bg-gray-900 py-3 px-2 mb-8 shadow-lg rounded-md">
                                    {SUBJECTS.map((s, i) => (
                                        <a
                                            href={`#${s}`}
                                            className={`flex-grow text-center text-lg py-1 px-3 rounded-md cursor-pointer mx-1 font-semibold transition-all duration-200 border-2 
              ${selectedSubject === s
                                                    ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600'
                                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600'
                                                }`}
                                            key={i}
                                            onClick={() => {
                                                setSelectedSubject(s);
                                            }}
                                        >
                                            {s}
                                        </a>
                                    ))}
                                </div>
                            )} */}