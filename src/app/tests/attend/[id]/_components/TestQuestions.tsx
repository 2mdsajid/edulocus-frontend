'use client'

import { TQuestion } from '@/app/tests/_components/schema';
import ReusableLInk from '@/components/ReusableLink';
import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { categorizeQuestionsBySubject } from '@/lib/utils';
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
import { TBaseUser } from '@/lib/auth/schema';

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

    const TIME_PER_QUESTION = 54000
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
    const [subjectWiseGraphData, setSubjectSubjectWiseGraphData] = useState<TypeSubjectWiseBarGraphData>()
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
            name: subject,
            Total: subject_wise_score[subject].total || 0,
            Correct: subject_wise_score[subject].correct || 0,
            Incorrect: subject_wise_score[subject].incorrect || 0,
            Unattempt: subject_wise_score[subject].total - (subject_wise_score[subject].correct + subject_wise_score[subject].incorrect)
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

                        {chapterwisescore &&
                            <div className='space-y-3'>
                                <TestChapterwiseScoreTable
                                    data={chapterwisescore}
                                />
                            </div>
                        }

                        <div className='space-y-3'>
                            <p>Did you like the test ? Share with your firends !</p>
                            <TestShareLinks
                                url={props.sharableTestUrl}
                                slug={props.id}
                            />
                        </div>

                        <div className=" max-w-4xl">
                            <p className='text-sm'>Please give us a short feedback <ReusableLInk link='/contact'>here</ReusableLInk> to improve this website. Thank you!</p>
                        </div>

                    </div>
                </TestAnalysisAndAnswersSwitch>
                :
                <div className='w-full'>
                    <div className='fixed top-28 right-5 flex flex-col p-2 bg-accent3 dark:bg-dark-accent3 rounded-md border'>
                        {timeout &&
                            <TestTimer2
                                expiryTimestamp={timeout}
                                onExpire={checkAns}
                                onTick={useSetCurrentCountdown}
                                className='bg-accent3 dark:bg-dark-accent3 m-0 p-0 text-black dark:text-white hover:bg-accent3 dark:hover:bg-dark-accent3'
                            />}
                        <Button className='w-fit bg-accent3 dark:bg-dark-accent3 m-0 p-0 text-black dark:text-white hover:bg-accent3 dark:hover:bg-dark-accent3'>Attempt : {questionsAttempt.length}/{uquestions.length}</Button>
                        <Dialog>
                            {!issubmitclicked &&
                                <DialogTrigger ref={submitref} className="">
                                    <div className='w-full mx-auto px-2 py-1 rounded-md font-semibold text-center bg-black text-white dark:bg-white dark:text-black'>Submit</div>
                                </DialogTrigger>}
                            <DialogContent className=''>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{questionsAttempt.length} / {uquestions.length}</CardTitle>
                                        <CardDescription>Questions Attempt</CardDescription>
                                    </CardHeader>
                                </Card>
                                {(uquestions.length - questionsAttempt.length > 0) && <p>You still have <span className='text-xl font-semibold'>{uquestions.length - questionsAttempt.length}</span> questions left to attempt</p>}
                                <SubmitButton onClick={submitForm} initialstate='Submit' loadingstate='Submitting' isLoadingState={issubmitclicked}></SubmitButton>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <form className='w-full ' onSubmit={checkAns} action="" method="POST">
                        <p className='text-2xl font-bold my-5 text-center'>Questions</p>
                        <div className=''>
                            {/* Chceck if more than one subjects */}
                            {SUBJECTS.length > 1 &&
                                <div className='flex w-full justify-between overflow-x-auto sticky left-0
                                 top-16 bg-primary dark:bg-dark-primary mb-5'>
                                    {SUBJECTS.map((s, i) => {
                                        return (
                                            <a href={`#${s}`}
                                                className={`text-center flex-grow border border-black dark:border-white text-black dark:!text-white py-2 px-4 cursor-pointer ${selectedSubject === s && 'bg-blue-400'}`}
                                                key={i}
                                                onClick={() => {
                                                    setSelectedSubject(s)
                                                }}
                                            >{s}</a>
                                        )
                                    })}
                                </div>}
                            <div className="">
                                {SUBJECTS.map((s, i) => {
                                    return (
                                        <div key={s} id={s} className={`${s} subject pt-[6.1rem]`}>
                                            {/* <h2 className='text-2xl font-bold my-5 text-center'>{s}</h2> */}
                                            <div>
                                                {categorizedQuestions[s].map((question, index) => (
                                                    <div key={question.id}>
                                                        <TestQuestionRender
                                                            question={question}
                                                            index={index}
                                                            getInput={getInput}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </form>
                </div>}
        </div>
    )
}

export default TestQuestions




