'use client'

import ContributeCardComponent from '@/components/reusable/links/ContributeCardComponent';
import FeedbackComponent from '@/components/reusable/links/FeedbackComponent';
import JoinTelegramComponent from '@/components/reusable/links/JoinTelegramComponent';
import JoinUsComponent from '@/components/reusable/links/JoinUsComponent';
import SubmitButton from '@/components/reusable/SubmitButton';
import TestBasicAnalysis from '@/components/reusable/tests/TestBasicAnalysis';
import TestQuestionRender from '@/components/reusable/tests/TestQuestionRender';
import TestTimer2 from '@/components/reusable/tests/TestTimer2';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendTestAnalytic, sendUserScore } from '@/lib/actions/tests.actions';
import { TCreateTestAnalytic, TCreateTestQuestionAnswer, TQuestion, TSaveUserScore, TSubjectWiseChapterScores } from '@/lib/schema/tests.schema';
import { TBaseUser } from '@/lib/schema/users.schema';
import { categorizeQuestionsBySubject } from '@/lib/utils';
import { CheckCircle, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import TestAnalysis from './TestAnalysis';
import TestQuestoinsAndAnswersViewer from './TestQuestoinsAndAnswersViewer';


type Props = {
    id: string;
    questions: TQuestion[],
    testName: string;
    userid: string
    username: string;
    sharableTestUrl: string
    user: TBaseUser | null
    authToken?: string
}

const TestMain = (props: Props) => {
    const router = useRouter()

    const submitref = useRef<HTMLButtonElement | null>(null)

    const {authToken} = props

    const TIME_PER_QUESTION = 54000
    const NEGATIVEMARK = 0.25

    const { id: testid, user } = props

    const [timeout, setTimeout] = useState(0)
    const [currentcountdown, setCurrentCountdown] = useState(0)
    const [counttop, setCountTop] = useState(0)

    const [uquestions, setUquestions] = useState<TQuestion[]>([])
    // const [userAnswer, setUserAnswer] = useState<TUserAns>({})
    const [userAnswer, setUserAnswer] = useState<Map<string, { uans: string; timetaken: number }>>(new Map());


    const [categorizedQuestions, setCategorizedQuestions] = useState(categorizeQuestionsBySubject(props.questions));
    const SUBJECTS = Object.keys(categorizedQuestions)

    // const [currentindex, setCurrentIndex] = useState(0)
    // const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0])

    // questions parameters -- time, ans bla bla bla bla bla bla bla bla bla
    const [questionsAttempt, setQuesitionsAttempt] = useState<string[]>([])
    const [correctAttempt, setCorrectAttempt] = useState<string[]>([])
    const [subjectWiseChapterScore, setSubjectWiseChapterScore] = useState<TSubjectWiseChapterScores>({})
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
        let subject_wise_chapter_scores = {} as TSubjectWiseChapterScores

        // to store teh analytics for premium users
        let test_analytic = {} as TCreateTestAnalytic
        let questions_ids_and_answers = [] as TCreateTestQuestionAnswer[]


        // MOSY IMPORTANT PART --- ITERATE OVER QUESTIONS 
        const mergedQuestions = uquestions.map((question) => {
            // Use .get() to retrieve the user answer data from the Map
            const userAnsData = userAnswer.get(question.id) || { uans: '', timetaken: 0 };

            // Append the user answer and timetaken to the question object
            return {
                ...question,
                uans: userAnsData.uans,
                timetaken: userAnsData.timetaken,
            };
        });

        // UPDATING THE ORIGINAL QUESTOIONS WITH USER ANSWERS, TIMETAKEN
        setUquestions(mergedQuestions)

        mergedQuestions.forEach((question) => {
            questions_ids_and_answers.push({
                questionId: question.id,
                userAnswer: question.uans || '',
            });


            total_timetaken += question.timetaken;

            // Initialize chapter-specific scores if not already done
            if (!subject_wise_chapter_scores[question.subject]) {
                subject_wise_chapter_scores[question.subject] = {};
            }
            if (!subject_wise_chapter_scores[question.subject][question.chapter]) {
                subject_wise_chapter_scores[question.subject][question.chapter] = {
                    total: 0,
                    correct: 0,
                    incorrect: 0,
                    unattempt: 0,
                };
            }

            // Update total counts
            subject_wise_chapter_scores[question.subject][question.chapter].total++;

            if (!question.uans) {
                return subject_wise_chapter_scores[question.subject][question.chapter].unattempt++;
            }

            // Check if the answer is correct or incorrect
            if (question.answer.toLowerCase() === question.uans.toLowerCase()) {
                correct_questions_ids.push(question.id);
                subject_wise_chapter_scores[question.subject][question.chapter].correct++;
            } else {
                incorrect_questions_ids.push(question.id);
                subject_wise_chapter_scores[question.subject][question.chapter].incorrect++;
            }
        });

        setSubjectWiseChapterScore(subject_wise_chapter_scores)
        setTotalTimeTaken(total_timetaken)
        setCorrectAttempt(correct_questions_ids)

        /*  storing analytics and history information after calculations */
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


        // test analytics for storing for all users -- premium previousle
        if (user && user !== null && user.id) {
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

    // THIS WILL TRIGGER TEH SUBMIT WHEN TIME ENDS
    const checkAns = async () => {
        if (submitref.current) {
            submitref.current.click()
        }
        await submitForm();
    };

    // THIS FUNCTION WILL STORE THE USER ANSWER, TIME IN AN OBJECT WITH THE QUESTIONS ID -- TO ITERATE LATER

    const getInput = (value: string, id: string) => {
        if (issubmitclicked) return;
        const timetaken = counttop - currentcountdown;

        setUserAnswer((prevUserAnswer) => {
            const newUserAnswer = new Map(prevUserAnswer);
            newUserAnswer.set(id, { uans: value.toLowerCase(), timetaken: timetaken || 0 });
            return newUserAnswer;
        });

        setCountTop(currentcountdown);

        if (!questionsAttempt.includes(id)) {
            setQuesitionsAttempt([...questionsAttempt, id]);
        }
    };


    // THIS WILL HIGHLIGHT THE CURRENT SUBJECT WHEN SUBJECT WISE TEST IS GOING ON
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const subjects = document.querySelectorAll('.subject'); // Adjust the class selector accordingly
    //         let subjectInView = '';
    //         subjects.forEach((subject) => {
    //             const rect = subject.getBoundingClientRect();
    //             if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    //                 subjectInView = subject.id;
    //             }
    //         })
    //         setSelectedSubject(subjectInView);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


    // THIS WILL SET INITIAL QUESTIONS TO A NEW VARIABLE TO RENDER AND ADD ANSWERS -- UANS
    useEffect(() => {
        setUquestions(props.questions)
        setTimeout(TIME_PER_QUESTION * props.questions.length)
        setCountTop(TIME_PER_QUESTION * props.questions.length)
        // checkAns()
    }, [])

    return (
        <div className='w-full'>
            {istestsubmitted
                // AFTER SUBMITTING THE ANSWERS
                ? <Tabs defaultValue="analysis" className="w-full my-5">
                    <TabsList className='bg-none bg-primary dark:bg-dark-primary mb-3 sticky top-16 z-100'>
                        <TabsTrigger className='text-xl font-semibold' value="analysis">Analysis</TabsTrigger>
                        <TabsTrigger className='text-xl font-semibold' value="ai-analysis">AI Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="analysis" className='w-full space-y-5'>
                        <TestBasicAnalysis
                            total_questions={uquestions.length}
                            corrrect_attempt={correctAttempt.length}
                            questions_attempt={questionsAttempt.length}
                            total_timetaken={totalTimeTaken}
                        />

                        <TestQuestoinsAndAnswersViewer
                            testName={props.testName}
                            questions={uquestions}
                        />

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


                        {/* <div className=" w-full">
                            <FeedbackComponent />
                        </div>

                        <div className=" w-full">
                            <ContributeCardComponent />
                        </div> */}

                    </TabsContent>

                    {/* to view the answers */}
                    <TabsContent value="ai-analysis" className='w-full'>
                        <TestAnalysis
                            totalQuestions={uquestions.length}
                            correctAttempt={correctAttempt.length}
                            questionsAttempt={questionsAttempt.length}
                            totalTimeTaken={totalTimeTaken}
                            subjectWiseChapterScore={subjectWiseChapterScore}
                            authToken={props.authToken}
                        />
                    </TabsContent>
                </Tabs>



                // BEFORE SUBMITTING THE ANSWERS
                : <div className='w-full'>

                    {/* timer dialog */}
                    <div className="fixed top-16 right-0 flex flex-col p-1 sm:p-3 md:p-4 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg space-y-1 md:space-y-2">
                        {timeout && (
                            <TestTimer2
                                expiryTimestamp={timeout}
                                onExpire={checkAns}
                                onTick={useSetCurrentCountdown}
                                className="w-fit bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white font-bold rounded-lg py-1 px-2 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                            />
                        )}

                        <div className="flex items-center md:justify-between gap-2 w-full bg-purple-100 rounded-lg py-1 px-2 text-sm md:text-lg">
                            <span className="flex items-center gap-1 font-semibold text-purple-800">
                                <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                                Attempted:
                            </span>
                            <span className='font-semibold text-purple-800'>{questionsAttempt.length}/{uquestions.length}</span>
                        </div>

                        {/* submit button and its dialog with info */}
                        <Dialog>
                            {!issubmitclicked && (
                                <DialogTrigger ref={submitref} className="w-full">
                                    <button className="w-full text-sm md:text-lg bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 py-1 px-2">
                                        <Send className="w-4 h-4 md:w-6 md:h-6" />
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

                    {/* remaining part of the page */}
                    <form className="w-full space-y-10" onSubmit={checkAns} action="" method="POST">
                        {SUBJECTS.map((s, i) => (
                            <div key={s} id={s} className={`${s} subject`}>
                                <h2 className='text-3xl font-bold my-8 text-center text-gray-800 dark:text-gray-100 capitalize'>{s.replace(/_/g, ' ')}</h2>
                                <div className="space-y-6">
                                    {categorizedQuestions[s].map((question, index) => (
                                        <TestQuestionRender
                                            key={question.id}
                                            question={question}
                                            index={index}
                                            getInput={getInput}
                                            user={props.user}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </form>
                </div>}
        </div>
    )
}

export default TestMain




