'use client'

import { TQuestion } from '@/app/tests/_components/schema';
import { MultipleBarDiagram } from '@/components/reusable/MultipleBarDiagram';
import ReusableLInk from '@/components/reusable/ReusableLink';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TBaseUser } from '@/lib/auth/schema';
import { categorizeQuestionsBySubject } from '@/lib/utils';
import { CheckCircle, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { sendTestAnalytic, sendUserScore } from './actions';
import { TCreateTestAnalytic, TCreateTestQuestionAnswer, TSaveUserScore, TypeSubjectWiseBarGraphData, TypeSubjectWiseScores, TypeTypeSubjectWiseChapterScores } from './schema';
import TestAnalysisAndAnswersSwitch from './TestAnalysisAndAnswersSwitch';
import TestBasicAnalysis from './TestBasicAnalysis';
import TestChapterwiseScoreTable from './TestChapterwiseScoreTable';
import TestQuestionRender from './TestQuestionRender';
import TestShareLinks from './TestShareLinks';
import TestTimer2 from './TestTimer2';
import SubmitButton from '@/components/reusable/SubmitButton';
import FeedbackComponent from './FeedbackComponent';
import ContributeCardComponent from './ContributeCardComponent';

type Props = {
    id: string;
    questions: TQuestion[],
    testName: string;
    userid: string
    username: string;
    sharableTestUrl: string
    user: TBaseUser | null
}

const TestQuestions = (props: Props) => {
    const router = useRouter()

    const submitref = useRef<HTMLButtonElement | null>(null)

    const TIME_PER_QUESTION = 540000
    const NEGATIVEMARK = 0.25

    const { id: testid, user } = props

    const [timeout, setTimeout] = useState(0)
    const [currentcountdown, setCurrentCountdown] = useState(0)
    const [counttop, setCountTop] = useState(0)

    const [uquestions, setUquestions] = useState<TQuestion[]>([])
    const [categorizedQuestions, setCategorizedQuestions] = useState(categorizeQuestionsBySubject(props.questions));
    const SUBJECTS = Object.keys(categorizedQuestions)

    const [currentindex, setCurrentIndex] = useState(0)
    const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0])

    // questions parameters -- time, ans bla bla bla bla bla bla bla bla bla
    const [questionsAttempt, setQuesitionsAttempt] = useState<string[]>([])
    const [incorrectAttempt, setIncorrectAttempt] = useState<string[]>([])
    const [correctAttempt, setCorrectAttempt] = useState<string[]>([])
    const [subjectWiseGraphData, setSubjectSubjectWiseGraphData] = useState<TypeSubjectWiseBarGraphData[]>([])
    const [chapterwisescore, setChapterwiseScore] = useState<TypeTypeSubjectWiseChapterScores>()
    const [totalTimeTaken, setTotalTimeTaken] = useState(0)

    // states for submitting tests
    const [istestsubmitted, setIsTestSubmitted] = useState(false)
    const [issubmitclicked, setIsSubmitClicked] = useState(false)
    const [isAnswerReady, setIsAnswerReady] = useState(false)


    const useSetCurrentCountdown = (countdown: number) => {
        setCurrentCountdown(countdown)
    }

    const submitForm = async () => {
        setIsSubmitClicked(true);

        let total_timetaken = 0;
        let correct_questions_ids = [] as string[]
        let incorrect_questions_ids = [] as string[]
        let subject_wise_score = {} as TypeSubjectWiseScores
        let subject_wise_chapter_scores = {} as TypeTypeSubjectWiseChapterScores

        // to store teh analytics for premium users
        let test_analytic = {} as TCreateTestAnalytic
        let questions_ids_and_answers = [] as TCreateTestQuestionAnswer[]


        // MOSY IMPORTANT PART --- ITERATE OVER QUESTIONS 
        uquestions.forEach((question) => {

            // pushing for storing last seven days scores
            questions_ids_and_answers.push({
                questionId: question.id,
                userAnswer: question.uans || '',
            })

            if (!subject_wise_score[question.subject]) subject_wise_score[question.subject] = {
                total: 0,
                correct: 0,
                incorrect: 0,
            }
            total_timetaken += question?.timetaken || 0;

            // Initialize the structure if not present
            if (!subject_wise_chapter_scores[question.subject]) subject_wise_chapter_scores[question.subject] = {};
            if (!subject_wise_chapter_scores[question.subject][question.chapter]) {
                subject_wise_chapter_scores[question.subject][question.chapter] = {
                    total: 0,
                    correct: 0,
                    incorrect: 0,
                    unattempt: 0,
                };
            }

            // Update total count
            subject_wise_chapter_scores[question.subject][question.chapter].total++;
            subject_wise_score[question.subject]['total']++
            if (!question.uans) return subject_wise_chapter_scores[question.subject][question.chapter].unattempt++;


            // Check if the answer is correct or incorrect
            if (question.answer.toLowerCase() === question.uans) {
                correct_questions_ids.push(question.id);
                subject_wise_chapter_scores[question.subject][question.chapter].correct++;
                subject_wise_score[question.subject]['correct']++
            } else {
                incorrect_questions_ids.push(question.id);
                subject_wise_chapter_scores[question.subject][question.chapter].incorrect++;
                subject_wise_score[question.subject]['incorrect']++
            }
        });

        const subjectwise_graph_data = Object.keys(subject_wise_score).map((subject) => ({
            subject: subject,
            total: subject_wise_score[subject].total || 0,
            correct: subject_wise_score[subject].correct || 0,
            incorrect: subject_wise_score[subject].incorrect || 0,
            unattempt: subject_wise_score[subject].total - (subject_wise_score[subject].correct + subject_wise_score[subject].incorrect),
        }));

        setChapterwiseScore(subject_wise_chapter_scores)
        setSubjectSubjectWiseGraphData(subjectwise_graph_data)
        setTotalTimeTaken(total_timetaken)
        setCorrectAttempt(correct_questions_ids)
        setIncorrectAttempt(incorrect_questions_ids)

        /*  storing analytics and history information after calculations */
        const correct_attempts = correctAttempt.length
        const questions_attempts = questionsAttempt.length
        let score = correct_questions_ids.length - (questionsAttempt.length - correct_questions_ids.length) * NEGATIVEMARK
        setIsTestSubmitted(true)
        window.scrollTo(0, 0);


        // chapters wise score
        const chapter_scores: { [key: string]: { t: number; c: number } } = {};
        for (const subject in subject_wise_chapter_scores) {
            for (const chapter in subject_wise_chapter_scores[subject]) {
                const chapterData = subject_wise_chapter_scores[subject][chapter];
                const total = chapterData.total;
                const correct = chapterData.correct;

                if (!chapter_scores[chapter]) {
                    chapter_scores[chapter] = { t: 0, c: 0 }
                }
                chapter_scores[chapter].t = total
                chapter_scores[chapter].c = correct
            }
        }

        // to store the score for leaderboard
        const userScore: TSaveUserScore = {
            customTestId: props.id,
            username: props.username,
            totalScore: score
        }

        const {
            data: saveUserScoreResponseData,
            message: saveUserScoreMessage
        } = await sendUserScore(userScore)
        // comment out later on --- debugging only
        // if (!saveUserScoreResponseData || saveUserScoreResponseData === undefined) {
        //     toast({
        //         variant: 'destructive',
        //         description: saveUserScoreMessage
        //     })
        // }
        // toast({
        //     variant: 'success',
        //     description: saveUserScoreMessage
        // })


        // test analytics for storing for premium users
        if (user && user !== null && user.isSubscribed) {
            test_analytic = {
                customTestId: testid,
                questionsWithAnswers: questions_ids_and_answers,
                userId: user.id,
            }
            const {
                data: sendTestAnalyticResponseData,
                message: sendTestAnalyticResponseMessage
            } = await sendTestAnalytic(test_analytic)
            // comment out later on--- debugging only
            // if (!sendTestAnalyticResponseData) {
            //     toast({
            //         variant: 'destructive',
            //         description: sendTestAnalyticResponseMessage
            //     })
            // }
            // toast({
            //     variant: 'success',
            //     description: sendTestAnalyticResponseMessage
            // })
        }

        setIsAnswerReady(true)

    };

    const checkAns = async () => {
        if (submitref.current) {
            submitref.current.click()
        }
        await submitForm();
    };

    const getInput = (value: string, id: string) => {
        if (issubmitclicked) return
        const timetaken = counttop - currentcountdown
        const index = uquestions.findIndex(q => q.id === id)
        uquestions[index].timetaken = timetaken
        setCountTop(currentcountdown)
        uquestions[index].uans = value.toLowerCase()
        if (!questionsAttempt.includes(id)) {
            setQuesitionsAttempt([...questionsAttempt, id])
        }
    }

    // THIS WILL HIGHLIGHT THE CURRENT SUBJECT WHEN SUBJECT WISE TEST IS GOING ON
    useEffect(() => {
        const handleScroll = () => {
            const subjects = document.querySelectorAll('.subject'); // Adjust the class selector accordingly
            let subjectInView = '';
            subjects.forEach((subject) => {
                const rect = subject.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    subjectInView = subject.id;
                }
            })
            setSelectedSubject(subjectInView);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // THIS WILL SET INITIAL QUESTIONS TO A NEW VARIABLE TO RENDER AND ADD ANSWERS -- UANS
    useEffect(() => {
        setUquestions(props.questions)
        setTimeout(TIME_PER_QUESTION * props.questions.length)
        setCountTop(TIME_PER_QUESTION * props.questions.length)
    }, [])

    return (
        <div className='w-full'>
            {istestsubmitted
                ?
                <TestAnalysisAndAnswersSwitch questions={uquestions}>
                    <div className='w-full space-y-5'>
                        <div className='space-y-3'>
                            <TestBasicAnalysis
                                total_questions={uquestions.length}
                                corrrect_attempt={correctAttempt.length}
                                questions_attempt={questionsAttempt.length}
                                total_timetaken={totalTimeTaken}
                            />
                        </div>

                        <div>
                            <MultipleBarDiagram
                                chartTitle="Subject Wise Scores"
                                chartDescription="Chart showing subject wise scores"
                                xAxisKey="subject"
                                dataKeys={['correct', 'incorrect', 'total', 'unattempt']}
                                chartData={subjectWiseGraphData}
                                footerDescription="Showing total visitors for the last 6 months"
                                trendingUpText="Trending up by 5.2% this month"
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
                                        label: "unattempt",
                                        color: "hsl(var(--chart-4))",
                                    },

                                }}
                            />
                        </div>



                        {chapterwisescore &&
                            <div className='space-y-3'>
                                <TestChapterwiseScoreTable
                                    data={chapterwisescore}
                                />
                            </div>
                        }

                        {/* <div className='space-y-3'>
                            <p>Did you like the test ? Share with your firends !</p>
                            <TestShareLinks
                                url={props.sharableTestUrl}
                                slug={props.id}
                            />
                        </div> */}

                        <div className=" w-full">
                            <FeedbackComponent />
                        </div>

                        <div className=" w-full">
                            <ContributeCardComponent />
                        </div>

                    </div>
                </TestAnalysisAndAnswersSwitch>
                :
                <div className='w-full'>
                    <div className="fixed top-28 right-5 flex flex-col p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg space-y-2">
                        {timeout && (
                            <TestTimer2
                                expiryTimestamp={timeout}
                                onExpire={checkAns}
                                onTick={useSetCurrentCountdown}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                            />
                        )}

                        <div className="flex items-center justify-center gap-5 bg-purple-100 rounded-lg p-2">
                            <span className="flex gap-1 font-semibold text-purple-800"><CheckCircle className="w-6 h-6 text-purple-600" />Attempted:</span>
                            <span className='font-semibold text-purple-800'>{questionsAttempt.length}/{uquestions.length}</span>
                        </div>


                        <Dialog>
                            {!issubmitclicked && (
                                <DialogTrigger ref={submitref} className="w-full">
                                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2">
                                        <Send className="w-5 h-5" />
                                        <span>Submit</span>
                                    </button>
                                </DialogTrigger>
                            )}

                            <DialogContent className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <Card className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100">
                                            {questionsAttempt.length} / {uquestions.length}
                                        </CardTitle>
                                        <CardDescription className="text-center text-gray-500 dark:text-gray-400">
                                            Questions Attempted
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                {uquestions.length - questionsAttempt.length > 0 && (
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4 text-center">
                                        You still have{" "}
                                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                                            {uquestions.length - questionsAttempt.length}
                                        </span>{" "}
                                        questions left to attempt.
                                    </p>
                                )}

                                <SubmitButton
                                    onClick={submitForm}
                                    initialstate="Submit"
                                    loadingstate="Submitting"
                                    isLoadingState={issubmitclicked}
                                    className="w-full mt-4 bg-purple-500 dark:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-purple-600 dark:hover:bg-purple-600 transition"
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <form className="w-full space-y-6" onSubmit={checkAns} action="" method="POST">
                        <p className="text-3xl font-bold my-8 text-center text-gray-800 dark:text-gray-100">Questions</p>

                        <div className="w-full">
                            {/* Check if more than one subject */}
                            {SUBJECTS.length > 1 && (
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
                            )}

                            {/* Questions section */}
                            <div className="space-y-10">
                                {SUBJECTS.map((s, i) => (
                                    <div key={s} id={s} className={`${s} subject`}>
                                        <h2 className='py-12 text-2xl font-bold'>{s}</h2>
                                        <div className="space-y-6">
                                            {categorizedQuestions[s].map((question, index) => (
                                                <div key={question.id} className="transition-all">
                                                    <TestQuestionRender
                                                        question={question}
                                                        index={index}
                                                        getInput={getInput}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default TestQuestions




